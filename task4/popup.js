chrome.storage.local.get(null, (data) => {
  const report = document.getElementById('report');
  const entries = Object.entries(data);
  entries.sort((a, b) => b[1] - a[1]);
  report.innerHTML = entries.map(([site, time]) =>
    `<p>${site}: ${(time / 1000 / 60).toFixed(2)} mins</p>`
  ).join('');
});
