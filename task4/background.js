let activeTab = null;
let startTime = null;

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  if (activeTab && startTime) {
    const timeSpent = Date.now() - startTime;
    await saveTimeData(activeTab.url, timeSpent);
  }
  const tab = await chrome.tabs.get(activeInfo.tabId);
  activeTab = tab;
  startTime = Date.now();
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.status === 'complete') {
    activeTab = tab;
    startTime = Date.now();
  }
});

chrome.windows.onFocusChanged.addListener((windowId) => {
  if (windowId === chrome.windows.WINDOW_ID_NONE && activeTab && startTime) {
    saveTimeData(activeTab.url, Date.now() - startTime);
    startTime = null;
  }
});

async function saveTimeData(url, timeSpent) {
  const domain = new URL(url).hostname;
  const storage = await chrome.storage.local.get(domain);
  const total = (storage[domain] || 0) + timeSpent;
  await chrome.storage.local.set({ [domain]: total });
}
