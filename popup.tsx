// src/popup/index.tsx
import React, { useEffect, useState } from "react"

import "./style.css"

import GithubPrContent from "~components/GithubPrContent"
import Header from "~components/header"
import LoadingOverlay from "~components/LoadingOverlay"
import NotPrPageWarning from "~components/NotPrPageWarning"
import { ThemeProvider } from "~components/ThemeContext"
import axiosInstance from "~lib/axios-instance"
import {
  fetchCommitMessagesFromPage,
  fetchUsernameFromPage,
  fillPrForm
} from "~lib/helpers"

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
      const username = await fetchUsernameFromPage()

      if (commitMessages.length > 0) {
        await generateTitleDescription(commitMessages, currentUrl, username)
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

  const generateTitleDescription = async (
    commitMessages: string[],
    currentUrl: string,
    username: string | undefined
  ): Promise<void> => {
    try {
      const response = await axiosInstance.post(
        `https://prgpt-api.onrender.com/api/pr/generate-title-description`,
        JSON.stringify({ commits: commitMessages, currentUrl, username })
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
