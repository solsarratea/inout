// popup.js

document.getElementById("replaceButton").addEventListener("click", () => {
  const findText = document.getElementById("findInput").value;
  const replaceText = document.getElementById("replaceInput").value;

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "replace", find: findText, replace: replaceText });
  });
});

