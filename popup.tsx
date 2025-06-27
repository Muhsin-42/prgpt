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
  fetchChangedFilesFromPage,
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
      const changedFiles = await fetchChangedFilesFromPage()

      if (commitMessages.length > 0) {
        await generateTitleDescription(
          commitMessages,
          currentUrl,
          username,
          changedFiles
        )
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

  // const generateTitleDescription = async (
  //   commitMessages: string[],
  //   currentUrl: string,
  //   username: string | undefined
  // ): Promise<void> => {
  //   try {
  //     const response = await axiosInstance.post(
  //       `https://prgpt-api.onrender.com/api/pr/generate-title-description`,
  //       JSON.stringify({ commits: commitMessages, currentUrl, username })
  //     )

  //     const responseData = await response.data
  //     console.log({ response: responseData })

  //     const rawJsonString = responseData?.data?.description
  //       ?.replace(/^```json\n/, "") // Remove opening ```
  //       ?.replace(/\n```$/, "") // Remove closing ```

  //     const parsedData = JSON.parse(rawJsonString ?? "")
  //     const markdown = parsedData?.description?.replace(/\\n/g, "\n") // Replace escaped newlines

  //     setPrDetails({
  //       title: responseData?.data?.title,
  //       description: markdown
  //     })

  //     fillPrForm(responseData?.data?.title, markdown)
  //   } catch (error) {
  //     console.error("Error generating title and description:", error)
  //     throw error
  //   }
  // }

  const generateTitleDescription = async (
    commitMessages: string[],
    currentUrl: string,
    username: string | undefined,
    changedFiles: string[]
  ): Promise<void> => {
    try {
      const response = await axiosInstance.post(
        `https://prgpt-api.onrender.com/api/pr/generate-title-description`,
        // `http://localhost:4001/api/pr/generate-title-description`,
        JSON.stringify({
          commits: commitMessages,
          currentUrl,
          username,
          changedFiles
        })
      )

      const responseData = response.data

      // Normalize the response - handles all possible formats
      const getCleanDescription = (desc: string): string => {
        if (!desc) return ""

        // Remove code block markers if present
        desc = desc.replace(/^```(json)?\n/, "").replace(/\n```$/, "")

        // Try to parse as JSON if it looks like JSON
        if (desc.trim().startsWith("{")) {
          try {
            const parsed = JSON.parse(desc)
            return parsed.description || desc
          } catch {}
        }

        return desc.replace(/\\n/g, "\n")
      }

      const title = responseData?.data?.title || "Feature Update"
      const description = getCleanDescription(responseData?.data?.description)

      setPrDetails({ title, description })
      fillPrForm(title, description)
    } catch (error) {
      console.error("Error generating title and description:", error)
      // Fallback to commit messages if API fails
      setPrDetails({
        title: "Feature Update",
        description: `Changes:\n${commitMessages.map((c) => `- ${c}`).join("\n")}`
      })
      fillPrForm(
        "Feature Update",
        `Changes:\n${commitMessages.map((c) => `- ${c}`).join("\n")}`
      )
    }
  }

  return (
    <ThemeProvider>
      <div className="relative h-full w-full bg-[#000000] ">
        <div className="app-container min-h-[400px] !z-10">
          <Header />

          <div className="">
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
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff33_1px,transparent_1px),linear-gradient(to_bottom,#ffffff33_1px,transparent_1px)] bg-[size:6rem_4rem] "></div>
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(45deg,_rgba(255,255,255,0)_41%,_rgba(12,2,40,1)_95%)]"></div>
      </div>
    </ThemeProvider>
  )
}

export default IndexPopup
