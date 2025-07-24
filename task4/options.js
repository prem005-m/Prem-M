// options.js
document.getElementById("save").addEventListener("click", () => {
  const domain = document.getElementById("domain").value;
  const type = document.getElementById("type").value;

  chrome.storage.sync.get("categories", (data) => {
    const categories = data.categories || {};
    categories[domain] = type;
    chrome.storage.sync.set({ categories });
    alert("Saved!");
  });
});
