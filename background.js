// ===============================
// CONTEXT MENU SETUP
// ===============================
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "add-to-notes",
    title: "Add this page URL to Notes",
    contexts: ["page"]
  });
});


// ===============================
// CONTEXT MENU CLICK → SAVE TO NOTES
// ===============================
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "add-to-notes" && tab?.url) {
    chrome.storage.local.get(["notes"], (data) => {
      const existingNotes = data.notes || "";
      const updatedNotes = existingNotes + `\n${tab.url}`;

      chrome.storage.local.set({ notes: updatedNotes });
    });
  }
});


// ===============================
// KEYBOARD SHORTCUT → SAVE SESSION
// ===============================
chrome.commands.onCommand.addListener(async (command) => {
  if (command === "save-session") {
    const tabs = await chrome.tabs.query({ currentWindow: true });
    const urls = tabs.map((t) => t.url);

    const sessionName = `Session-${Date.now()}`;

    chrome.storage.local.get(["sessions"], (data) => {
      const sessions = data.sessions || {};
      sessions[sessionName] = urls;

      chrome.storage.local.set({ sessions });
    });
  }
});


// ===============================
// WEBSITE BLOCKER LOGIC
// ===============================
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Only run when page fully loaded
  if (changeInfo.status !== "complete" || !tab.url) return;

  const url = new URL(tab.url);
  const hostname = url.hostname;

  chrome.storage.sync.get(["blockedSites"], (data) => {
    const blockedSites = data.blockedSites || [];

    const isBlocked = blockedSites.some(site =>
      hostname.includes(site)
    );

    if (isBlocked) {
      chrome.tabs.update(tabId, {
        url: chrome.runtime.getURL("blocked.html")
      });
    }
  });
});
