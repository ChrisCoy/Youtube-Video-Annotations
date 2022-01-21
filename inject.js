// document.getElementById("newAnnotation").addEventListener("click", () => {
//   // console.log("Popup DOM fully loaded and parsed");

//   function modifyDOM() {
//     //You can play with your DOM here or check URL against your regex

//     return document.body.innerHTML;
//   }

//   //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
//   chrome.tabs.executeScript(
//     {
//       code: "(" + modifyDOM + ")();", //argument here is a string but function.toString() returns function's code
//     },
//     (results) => {
//       //Here we have just the innerHTML and not DOM structure
//       // console.log("Popup script:");
//       // console.log(results[0]);
//     }
//   );
// });

document.addEventListener("DOMContentLoaded", function () {
  // Get button by ID
  var button = document.getElementById("newAnnotation");
  button.onclick = injectScript;
});

async function injectScript() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["scripts/script.js"],
  });
  window.close();
}
