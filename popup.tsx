// src/popup/index.tsx
import React, { useEffect, useState } from "react"

import "./style.css"

import GithubPrContent from "~components/GithubPrContent"
import Header from "~components/header"
import LoadingOverlay from "~components/LoadingOverlay"
import NotPrPageWarning from "~components/NotPrPageWarning"
import { ThemeProvider } from "~components/ThemeContext"
import axiosInstance from "~lib/axios-instance"

interface PrDetails {
  title: string
  description: string
}

function IndexPopup(): JSX.Element {
  const [isPrPage, setIsPrPage] = useState<boolean>(false)
  const [currentUrl, setCurrentUrl] = useState<string>("")
  const [prDetails, setPrDetails] = useState<PrDetails>({
    title: "",
    description: ""
  })
  const [isGenerated, setIsGenerated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    checkCurrentTab()
  }, [])

  const checkCurrentTab = (): void => {
    chrome?.tabs?.query({ active: true, currentWindow: true }, (tabs) => {
      const url = tabs[0]?.url || ""
      setCurrentUrl(url)

      // Check if the current URL matches the GitHub PR pattern
      const isGithubPrUrl =
        /https:\/\/github\.com\/[\w-]+\/[\w-]+\/compare\/[\w-]+/.test(url)
      setIsPrPage(isGithubPrUrl)
    })
  }

  const generatePr = async (): Promise<void> => {
    setIsLoading(true)
    try {
      const commitMessages = await fetchCommitMessagesFromPage()
      if (commitMessages.length > 0) {
        await generateTitleDescription(commitMessages)
      } else {
        setPrDetails({
          title: "Could not generate title",
          description:
            "No commit messages found or unable to access page content."
        })
      }
    } catch (error) {
      console.error("Error generating PR:", error)
      setPrDetails({
        title: "Error generating PR",
        description: "An error occurred while generating the PR content."
      })
    } finally {
      setIsGenerated(true)
      setIsLoading(false)
    }
  }

  const fetchCommitMessagesFromPage = (): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tabId = tabs[0]?.id

        if (!tabId) {
          reject(new Error("Could not access the current tab."))
          return
        }

        chrome.scripting.executeScript(
          {
            target: { tabId: tabId },
            func: (): string[] => {
              try {
                // Find all commit list items
                const commitItems = document.querySelectorAll<HTMLElement>(
                  "#commits_bucket .js-commits-list-item"
                )
                const messages: string[] = []

                // Extract the commit message from each item
                commitItems.forEach((item) => {
                  const messageParagraph = item.querySelector<HTMLElement>(
                    ".js-details-container p"
                  )
                  if (messageParagraph) {
                    let message = messageParagraph.textContent?.trim() || ""
                    if (message) {
                      messages.push(message)
                    }
                  }
                })

                return messages
              } catch (error) {
                console.error("Error fetching commit messages:", error)
                return []
              }
            }
          },
          (results) => {
            if (results && results[0]?.result) {
              resolve(results[0].result as string[])
            } else {
              resolve([])
            }
          }
        )
      })
    })
  }

  const generateTitleDescription = async (
    commitMessages: string[]
  ): Promise<void> => {
    try {
      const response = await axiosInstance.post(
        `${process.env.PLASMO_PUBLIC_BACKEND_URL}/api/pr/generate-title-description`,
        JSON.stringify({ commits: commitMessages })
      )

      const responseData = await response.data
      console.log({ response: responseData })

      const rawJsonString = responseData?.data?.description
        .replace(/^```json\n/, "") // Remove opening ```
        .replace(/\n```$/, "") // Remove closing ```

      const parsedData = JSON.parse(rawJsonString)
      const markdown = parsedData.description.replace(/\\n/g, "\n") // Replace escaped newlines

      setPrDetails({
        title: responseData?.data?.title,
        description: markdown
      })

      fillPrForm(responseData?.data?.title, markdown)
    } catch (error) {
      console.error("Error generating title and description:", error)
      throw error
    }
  }

  const fillPrForm = (title: string, description: string): void => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0]?.id
      if (!tabId) return

      chrome.scripting.executeScript({
        target: { tabId },
        func: (title: string, description: string): void => {
          const titleInput = document.querySelector<HTMLInputElement>(
            "#pull_request_title"
          )
          const bodyTextarea =
            document.querySelector<HTMLTextAreaElement>("#pull_request_body")

          if (titleInput) titleInput.value = title
          if (bodyTextarea) bodyTextarea.value = description
        },
        args: [title, description]
      })
    })
  }

  return (
    <ThemeProvider>
      <div className="app-container min-h-[400px]">
        <Header />
        <div className="p-4">
          {!isPrPage ? (
            <NotPrPageWarning />
          ) : (
            <GithubPrContent
              isGenerated={isGenerated}
              isLoading={isLoading}
              prDetails={prDetails}
              onGenerate={generatePr}
            />
          )}
        </div>

        {isLoading && <LoadingOverlay />}
      </div>
    </ThemeProvider>
  )
}

export default IndexPopup
