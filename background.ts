chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "open-prgpt",
    title: "Generate PR with PrGPT",
    contexts: ["all"]
  })
})

chrome.contextMenus.onClicked.addListener(() => {
  chrome.action.openPopup()
})
