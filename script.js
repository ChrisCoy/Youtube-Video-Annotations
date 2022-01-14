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

// window.addEventListener("load", function () {
//   alert("carregou :D");
// });
let divContent;
let divContentInterval;
let vid;
let divTextArea;
let txtArea;
let url;

function Save() {
  localStorage.setItem(url, String(txtArea.value));
  console.log(txtArea.value);
  divTextArea.remove();
}

function btnAction() {
  if (!document.getElementById("textWindow")) {
    url = window.location.href.split("=")[1].split("&")[0];
    vid = document.querySelector(".video-stream.html5-main-video");
    vid.pause();

    divTextArea = document.createElement("div");
    divTextArea.id = "divTextArea";

    let btnSave = document.createElement("button");
    btnSave.id = "btnSave";
    btnSave.onclick = Save;
    btnSave.innerText = "Salvar";

    let btnCancel = document.createElement("button");
    btnCancel.id = "btnCancel";
    btnCancel.onclick = () => divTextArea.remove();
    btnCancel.innerText = "Fechar";

    txtArea = document.createElement("textarea");
    txtArea.id = "textWindow";
    txtArea.value = localStorage.getItem(url);

    divTextArea.append(txtArea);
    divTextArea.append(btnSave);
    divTextArea.append(btnCancel);

    divContent.append(divTextArea);
    console.log(txtArea);
  }
}

function loadDiv() {
  divContent = document.querySelector(".style-scope ytd-video-primary-info-renderer #info");
  if (divContent) {
    let btn = document.createElement("button");
    btn.innerText = "Adicionar Nota";
    btn.onclick = btnAction;
    divContent.appendChild(btn);
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
