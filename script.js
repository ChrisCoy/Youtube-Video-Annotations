// window.onload = () => {
//   try {
//     if (document.getElementsByClassName("ytp-time-current")[0].innerText) {
//       document.getElementById("teste").innerText =
//         document.getElementsByClassName("ytp-time-current")[0].innerText;
//     }
//   } catch (error) {}
// };

// document.addEventListener("DOMContentLoaded", () => {
//   let currentTime = document.getElementsByClassName("ytp-time-current")[0];

//   if (currentTime) {
//     document.getElementById("teste").innerText = String(currentTime.innerText) || "teste";
//   } else {
//     document.getElementById("teste").innerText = "teste";
//   }
// });

let divContent; //div from youtube, theres will gotta something just when the page is full loaded
let divContentInterval;
const htmlBody = document.getElementsByTagName("body")[0];

let blackBackScreen;
let video;
let url;

let divExtensionContent;

function closeWindow() {
  blackBackScreen.remove();
  divExtensionContent.remove();
  console.log("TEST");
}

function Save() {
  localStorage.setItem(url, String(txtArea.value));
}

function btnAction() {
  url = window.location.href.split("=")[1].split("&")[0];
  video = document.querySelector(".video-stream.html5-main-video");
  video.pause();

  //creating the black screen that will be on the top of everything
  blackBackScreen = document.createElement("button");
  blackBackScreen.className = "black-back-screen";
  blackBackScreen.onclick = closeWindow;
  htmlBody.appendChild(blackBackScreen);

  //extension content div
  divExtensionContent = document.createElement("div");
  divExtensionContent.className = "extension-content";
  divExtensionContent.id = "extension-content";

  htmlBody.appendChild(divExtensionContent);
}

function loadDiv() {
  divContent = document.querySelector(".style-scope ytd-video-primary-info-renderer #info");
  if (divContent) {
    const iconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    iconSvg.setAttributeNS("", "height", "21");
    iconSvg.setAttributeNS("", "width", "20");
    iconSvg.setAttributeNS("", "viewBox", "0 0 24 24");
    iconSvg.setAttributeNS("", "fill", "#FFFFFF");

    const iconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    iconPath.setAttributeNS(
      "",
      "d",
      "m16 16a1 1 0 0 1 -1 1h-2v2a1 1 0 0 1 -2 0v-2h-2a1 1 0 0 1 0-2h2v-2a1 1 0 0 1 2 0v2h2a1 1 0 0 1 1 1zm6-5.515v8.515a5.006 5.006 0 0 1 -5 5h-10a5.006 5.006 0 0 1 -5-5v-14a5.006 5.006 0 0 1 5-5h4.515a6.958 6.958 0 0 1 4.95 2.05l3.484 3.486a6.951 6.951 0 0 1 2.051 4.949zm-6.949-7.021a5.01 5.01 0 0 0 -1.051-.78v4.316a1 1 0 0 0 1 1h4.316a4.983 4.983 0 0 0 -.781-1.05zm4.949 7.021c0-.165-.032-.323-.047-.485h-4.953a3 3 0 0 1 -3-3v-4.953c-.162-.015-.321-.047-.485-.047h-4.515a3 3 0 0 0 -3 3v14a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3z"
    );

    iconSvg.appendChild(iconPath);

    console.log(iconSvg);

    const divButton = document.createElement("div");
    divButton.onclick = btnAction;
    divButton.className = "button-menu";

    divButton.appendChild(iconSvg);

    const spanTextTitle = document.createElement("span");
    spanTextTitle.innerText = "NEW ANNOTATION";

    divButton.appendChild(spanTextTitle);
    divContent.appendChild(divButton);
    clearInterval(divContentInterval);
  }
}

if (!divContent) {
  divContentInterval = setInterval(loadDiv, 1000);
}

// do {
//   setTimeout(function () {
//     divContent = document.querySelector(".style-scope ytd-video-primary-info-renderer #info");
//     console.log(contador);
//   }, 5000);
//   contador = contador + 1;
// } while (divContent == undefined);

// try {
//   let button = document.createElement("button");
//   button.innerText = "Teste";

//   document
//     .querySelector(".style-scope ytd-video-primary-info-renderer #info")
//     .appendChild(button);
// } catch (error) {}

//document.getElementById("info").appendChild(button);

//document.querySelector(".style-scope ytd-video-primary-info-renderer #info").appendChild(document.createElement("button"))
