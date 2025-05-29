export const fetchCommitMessagesFromPage = (): Promise<string[]> => {
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

export const fetchUsernameFromPage = (): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0]?.id

      if (!tabId) {
        reject(new Error("Could not access the current tab."))
        return
      }

      chrome.scripting.executeScript(
        {
          target: { tabId },
          func: (): string | undefined => {
            try {
              const userButton =
                document.querySelector<HTMLElement>("[data-login]")
              return userButton?.getAttribute("data-login") || undefined
            } catch (error) {
              console.error("Error fetching username:", error)
              return undefined
            }
          }
        },
        (results) => {
          if (results && results[0]?.result) {
            resolve(results[0].result as string | undefined)
          } else {
            resolve(undefined)
          }
        }
      )
    })
  })
}

export const fillPrForm = (title: string, description: string): void => {
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
