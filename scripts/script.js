if (!window.location.href.startsWith("https://www.youtube.com/")) {
  alert("YOUTUBE NOTES EXTENSION ERROR\n\n" + "You must be on a youtube video page!");

  throw new Error("you must be on a youtube video page!");
} else {
  if (!window.location.href.startsWith("https://www.youtube.com/watch?")) {
    alert("YOUTUBE NOTES EXTENSION ERROR\n\n" + "Maximize the video!");
    throw new Error("Maximize the video!");
  }
}
var screenState = "";

var isOpen = false;

if (!!document.querySelectorAll("video").length) {
  screenState = "NEW_ANNOTATION";
  btnAction();
} else {
  alert("NO VIDEOS FOUND");
}

function closeWindow() {
  document.getElementsByClassName("black-back-screen")[0].remove();
  document.getElementById("extension-content").remove();
  document.querySelectorAll("video")[0].play();
}

function convertTime(value) {
  const sec = parseInt(value, 10);
  let hours = Math.floor(sec / 3600);
  let minutes = Math.floor((sec - hours * 3600) / 60);
  let seconds = sec - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  return hours > 0 ? hours + ":" + minutes + ":" + seconds : minutes + ":" + seconds;
}

function addAnnotation(annotation) {
  if (annotation.resume != "") {
    let items = localStorage.getItem("@Annotation-extension");

    if (!items) {
      items = [];
    } else {
      items = JSON.parse(items);
    }
    items.push(annotation);
    localStorage.setItem("@Annotation-extension", JSON.stringify(items));

    document.getElementById("text-input").value = "";
  } else {
    alert("Cannot create a empty annotation!");
  }
}

function editAnnotation(annotation, old) {
  if (annotation.resume != "") {
    let items = localStorage.getItem("@Annotation-extension");

    if (!items) {
      items = [];
    } else {
      items = JSON.parse(items);
    }

    items.map((x) => {
      if (
        x.url === old.url &&
        x.time === old.time &&
        x.resume.substring(0, 30) === old.resume.substring(0, 30)
      ) {
        x.resume = annotation.resume;
        return x;
      }
      return x;
    });

    localStorage.setItem("@Annotation-extension", JSON.stringify(items));

    document.getElementById("text-input").value = "";

    screenState = "LIST_ANNOTATION";
    btnAction();
  } else {
    alert("Cannot create a empty note!");
  }
}

function removeItem(div, annot) {
  div.remove();
  let items = localStorage.getItem("@Annotation-extension");
  items = JSON.parse(items);

  items = items.filter((x) => {
    if (x.url !== annot.url) {
      return true;
    }
    if (x.time === annot.time && x.resume === annot.resume) {
      return false;
    }

    return true;
  });

  localStorage.setItem("@Annotation-extension", JSON.stringify(items));

  if (!document.querySelector(".list-item")) {
    const noAnnotations = document.createElement("div");
    noAnnotations.className = "no-annotations";
    noAnnotations.innerText = "THERE IS NO NOTES...";
    document.getElementById("main-content").appendChild(noAnnotations);
  }
}

function createSvgElement(type, size, color) {
  const iconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  iconSvg.setAttributeNS("", "height", String(size));
  iconSvg.setAttributeNS("", "width", String(size));
  iconSvg.setAttributeNS("", "viewBox", "0 0 24 24");
  iconSvg.setAttributeNS("", "fill", !!color ? color : "#FFFFFF");

  const iconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  const iconPath2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  const iconPath3 = document.createElementNS("http://www.w3.org/2000/svg", "path");

  switch (type) {
    case "CLOSE_ICON":
      iconPath.setAttributeNS(
        "",
        "d",
        "M23.707.293h0a1,1,0,0,0-1.414,0L12,10.586,1.707.293a1,1,0,0,0-1.414,0h0a1,1,0,0,0,0,1.414L10.586,12,.293,22.293a1,1,0,0,0,0,1.414h0a1,1,0,0,0,1.414,0L12,13.414,22.293,23.707a1,1,0,0,0,1.414,0h0a1,1,0,0,0,0-1.414L13.414,12,23.707,1.707A1,1,0,0,0,23.707.293Z"
      );
      iconSvg.appendChild(iconPath);
      break;
    case "PENCIL_ICON":
      iconPath.setAttributeNS(
        "",
        "d",
        "M18.656.93,6.464,13.122A4.966,4.966,0,0,0,5,16.657V18a1,1,0,0,0,1,1H7.343a4.966,4.966,0,0,0,3.535-1.464L23.07,5.344a3.125,3.125,0,0,0,0-4.414A3.194,3.194,0,0,0,18.656.93Zm3,3L9.464,16.122A3.02,3.02,0,0,1,7.343,17H7v-.343a3.02,3.02,0,0,1,.878-2.121L20.07,2.344a1.148,1.148,0,0,1,1.586,0A1.123,1.123,0,0,1,21.656,3.93Z"
      );
      iconPath2.setAttributeNS(
        "",
        "d",
        "M23,8.979a1,1,0,0,0-1,1V15H18a3,3,0,0,0-3,3v4H5a3,3,0,0,1-3-3V5A3,3,0,0,1,5,2h9.042a1,1,0,0,0,0-2H5A5.006,5.006,0,0,0,0,5V19a5.006,5.006,0,0,0,5,5H16.343a4.968,4.968,0,0,0,3.536-1.464l2.656-2.658A4.968,4.968,0,0,0,24,16.343V9.979A1,1,0,0,0,23,8.979ZM18.465,21.122a2.975,2.975,0,0,1-1.465.8V18a1,1,0,0,1,1-1h3.925a3.016,3.016,0,0,1-.8,1.464Z"
      );
      iconSvg.appendChild(iconPath);
      iconSvg.appendChild(iconPath2);
      break;
    case "LIST_ICON":
      iconSvg.setAttributeNS("", "viewBox", "158.238 285.231 165.492 149.987");
      iconPath.setAttributeNS(
        "",
        "d",
        "M 323.73 298.254 C 323.73 294.104 320.367 290.741 316.217 290.741 L 241.088 290.741 C 235.305 290.741 231.69 297.001 234.582 302.01 C 235.924 304.335 238.404 305.767 241.088 305.767 L 316.217 305.767 C 320.367 305.767 323.73 302.403 323.73 298.254 Z M 323.73 358.357 C 323.73 354.208 320.367 350.844 316.217 350.844 L 241.088 350.844 C 235.305 350.844 231.69 357.105 234.582 362.113 C 235.924 364.438 238.404 365.87 241.088 365.87 L 316.217 365.87 C 320.367 365.87 323.73 362.506 323.73 358.357 Z M 323.73 418.46 C 323.73 414.311 320.367 410.947 316.217 410.947 L 241.088 410.947 C 235.305 410.947 231.69 417.208 234.582 422.217 C 235.924 424.541 238.404 425.973 241.088 425.973 L 316.217 425.973 C 320.367 425.973 323.73 422.61 323.73 418.46 Z M 164.426 290.182 C 162.151 292.141 161.387 293.889 160.446 296.794 C 159.692 299.122 160.036 301.305 160.446 303.328 C 160.839 305.263 161.272 306.989 162.752 308.709 C 164.682 310.949 166.459 313.372 169.364 314.312 C 171.692 315.067 176.68 315.461 178.703 315.05 C 180.639 314.658 184.285 313.044 186.004 311.563 C 188.244 309.634 189.485 306.232 190.426 303.328 C 191.18 300.999 190.836 298.816 190.426 296.794 C 190.033 294.858 189.447 293.1 188.119 291.413 C 186.54 289.405 183.642 286.89 181.009 285.84 C 178.44 284.815 174.736 285.319 172.258 285.662 C 170.071 285.964 166.528 288.372 164.426 290.182 Z"
      );
      iconPath2.setAttributeNS(
        "",
        "d",
        "M 172.237 344.224 C 174.834 343.818 178.426 344.065 180.947 345.016 C 183.336 345.917 185.53 347.674 187.084 349.569 C 188.621 351.444 189.741 354.052 190.251 356.3 C 190.731 358.408 190.91 360.377 190.251 362.635 C 189.448 365.387 186.899 369.581 184.906 371.543 C 183.324 373.103 181.736 373.773 179.759 374.315 C 177.571 374.915 174.793 375.374 172.237 374.711 C 169.33 373.957 165.357 371.565 163.328 369.366 C 161.553 367.442 160.672 364.883 160.161 362.635 C 159.681 360.527 159.475 358.582 160.161 356.3 C 161.013 353.462 163.648 349.01 165.902 346.995 C 167.778 345.318 169.872 344.593 172.237 344.224 Z M 170.653 404.802 C 173.251 404.396 176.842 404.643 179.363 405.594 C 181.752 406.495 183.991 408.423 185.5 410.147 C 186.857 411.696 187.73 413.317 188.272 415.294 C 188.872 417.482 189.331 420.261 188.668 422.817 C 187.914 425.723 185.315 429.762 183.323 431.725 C 181.74 433.285 180.152 433.955 178.176 434.497 C 175.988 435.096 173.209 435.555 170.653 434.893 C 167.746 434.139 163.707 431.54 161.744 429.548 C 160.185 427.965 159.515 426.377 158.973 424.4 C 158.373 422.213 157.885 419.461 158.577 416.878 C 159.38 413.879 162.064 409.588 164.318 407.573 C 166.194 405.896 168.288 405.171 170.653 404.802 Z"
      );
      iconSvg.appendChild(iconPath);
      iconSvg.appendChild(iconPath2);
      break;
    case "TRASH_ICON":
      iconPath.setAttributeNS(
        "",
        "d",
        "M21,4H17.9A5.009,5.009,0,0,0,13,0H11A5.009,5.009,0,0,0,6.1,4H3A1,1,0,0,0,3,6H4V19a5.006,5.006,0,0,0,5,5h6a5.006,5.006,0,0,0,5-5V6h1a1,1,0,0,0,0-2ZM11,2h2a3.006,3.006,0,0,1,2.829,2H8.171A3.006,3.006,0,0,1,11,2Zm7,17a3,3,0,0,1-3,3H9a3,3,0,0,1-3-3V6H18Z"
      );
      iconPath2.setAttributeNS(
        "",
        "d",
        "M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18Z"
      );
      iconPath3.setAttributeNS(
        "",
        "d",
        "M14,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z"
      );
      iconSvg.appendChild(iconPath);
      iconSvg.appendChild(iconPath2);
      iconSvg.appendChild(iconPath3);
      break;
    case "CLOCK_ICON":
      iconPath.setAttributeNS(
        "",
        "d",
        "M21,4H17.9A5.009,5.009,0,0,0,13,0H11A5.009,5.009,0,0,0,6.1,4H3A1,1,0,0,0,3,6H4V19a5.006,5.006,0,0,0,5,5h6a5.006,5.006,0,0,0,5-5V6h1a1,1,0,0,0,0-2ZM11,2h2a3.006,3.006,0,0,1,2.829,2H8.171A3.006,3.006,0,0,1,11,2Zm7,17a3,3,0,0,1-3,3H9a3,3,0,0,1-3-3V6H18Z"
      );
      iconPath2.setAttributeNS(
        "",
        "d",
        "M12,6a1,1,0,0,0-1,1v4.325L7.629,13.437a1,1,0,0,0,1.062,1.7l3.84-2.4A1,1,0,0,0,13,11.879V7A1,1,0,0,0,12,6Z"
      );
      iconSvg.appendChild(iconPath);
      iconSvg.appendChild(iconPath2);
      break;
  }
  return iconSvg;
}

function btnAction(selectedAnnotation) {
  const url = window.location.href.split("=")[1].split("&")[0];
  const video = document.querySelectorAll("video")[0];
  if (!isOpen) {
    isOpen = true;
    video.pause();

    //creating the black screen that will be on the top of everything
    const blackBackScreen = document.createElement("div");
    blackBackScreen.className = "black-back-screen";
    blackBackScreen.onclick = closeWindow;
    document.getElementsByTagName("body")[0].appendChild(blackBackScreen);

    //extension content div
    const divExtensionContent = document.createElement("div");
    divExtensionContent.className = "extension-content";
    divExtensionContent.id = "extension-content";

    const mainContent = document.createElement("div");
    mainContent.className = "main-content";
    mainContent.id = "main-content";

    const sideNav = document.createElement("nav");
    sideNav.className = "side-nav";
    sideNav.id = "side-nav";

    const closeButtonDiv = document.createElement("div");
    closeButtonDiv.className = "close-button-div";
    closeButtonDiv.id = "close-button-div";
    closeButtonDiv.appendChild(createSvgElement("CLOSE_ICON", 35));
    closeButtonDiv.onclick = closeWindow;

    const newButtonDiv = document.createElement("div");
    newButtonDiv.className = "new-button-div";
    newButtonDiv.id = "new-button-div";
    newButtonDiv.onclick = () => {
      screenState = "NEW_ANNOTATION";
      btnAction();
    };
    newButtonDiv.appendChild(createSvgElement("PENCIL_ICON", 40));

    const listButtonDiv = document.createElement("div");
    listButtonDiv.className = "list-button-div";
    listButtonDiv.id = "list-button-div";
    listButtonDiv.onclick = () => {
      screenState = "LIST_ANNOTATION";
      btnAction();
    };
    listButtonDiv.appendChild(createSvgElement("LIST_ICON", 40)); //fazer o onclick desse botão

    sideNav.appendChild(closeButtonDiv);
    sideNav.appendChild(newButtonDiv);
    sideNav.appendChild(listButtonDiv);

    divExtensionContent.appendChild(mainContent);
    divExtensionContent.appendChild(sideNav);
    document.getElementsByTagName("body")[0].appendChild(divExtensionContent);
  }

  switch (screenState) {
    case "NEW_ANNOTATION":
      if (!document.getElementById("div-title-time")) {
        document.getElementById("main-content").innerHTML = "";
        const divTitleTime = document.createElement("div");
        divTitleTime.id = "div-title-time";
        divTitleTime.className = "div-title-time";

        const videoTitle = document.createElement("h1");
        videoTitle.innerText = document.querySelector(
          ".title.style-scope.ytd-video-primary-info-renderer"
        ).innerText;

        const videoTime = document.createElement("span");
        videoTime.innerText = convertTime(video.currentTime);

        divTitleTime.appendChild(videoTitle);
        divTitleTime.appendChild(videoTime);

        const divTextContent = document.createElement("div");
        divTextContent.id = "div-text-content";
        divTextContent.className = "div-text-content";

        const divAnnotationTextInput = document.createElement("div");
        divAnnotationTextInput.className = "div-text-input";
        const annotationTextInput = document.createElement("textarea");
        annotationTextInput.id = "text-input";
        annotationTextInput.className = "text-input";
        annotationTextInput.maxLength = "1000";

        annotationTextInput.addEventListener("focus", () => {
          divAnnotationTextInput.style = `
        border: 2px solid #3ea6ff;
        padding: 0px;
        `;
        });
        annotationTextInput.addEventListener("focusout", () => {
          divAnnotationTextInput.style = "";
        });
        divAnnotationTextInput.appendChild(annotationTextInput);

        const cancelButton = document.createElement("button");
        cancelButton.type = "button";
        cancelButton.id = "cancel-button";
        cancelButton.className = "cancel-button";
        cancelButton.onclick = closeWindow;
        cancelButton.innerText = "CANCEL";

        const saveButton = document.createElement("button");
        saveButton.type = "button";
        saveButton.id = "save-button";
        saveButton.onclick = () => {
          addAnnotation({
            url,
            title: videoTitle.innerText,
            time: video.currentTime,
            resume: annotationTextInput.value,
          });
        };
        saveButton.className = "save-button";
        saveButton.innerText = "SAVE";

        const divButtons = document.createElement("div");
        divButtons.className = "div-buttons";

        divButtons.appendChild(cancelButton);
        divButtons.appendChild(saveButton);

        divTextContent.appendChild(divAnnotationTextInput);
        divTextContent.appendChild(divButtons);

        const lineSeparator = document.createElement("div");
        lineSeparator.className = "line-separator";

        const mainContent = document.getElementById("main-content");
        mainContent.appendChild(divTitleTime);
        mainContent.appendChild(lineSeparator);
        mainContent.appendChild(divTextContent);

        document.getElementById("new-button-div").style = "background-color: #141414";
        document.getElementById("list-button-div").style = "";
      }
      break;
    case "LIST_ANNOTATION":
      if (!document.querySelector(".list-item")) {
        const mainContent = document.getElementById("main-content"); //nn precisa ter isso aqui, é só checar se já tem conteudo de lista na tela
        mainContent.innerHTML = "";

        let annotations = localStorage.getItem("@Annotation-extension");
        annotations = !!annotations ? JSON.parse(annotations) : null;

        if (annotations) {
          for (let annotationItem of annotations) {
            const container = document.createElement("div");
            container.className = "container-list";

            const containerLine = document.createElement("div");
            containerLine.className = "container-line";

            const divItem = document.createElement("div");
            divItem.className = "list-item";

            const divTimeTitleButtons = document.createElement("div");
            divTimeTitleButtons.className = "time-title-container";

            const time = document.createElement("span");
            time.className = "item-time";
            time.innerText = convertTime(annotationItem.time);

            const title = document.createElement("div");
            title.className = "item-title";
            title.innerText = annotationItem.title;
            title.onclick = () => {
              screenState = "VIEW_ANNOTATION";
              btnAction({
                url: annotationItem.url,
                title: annotationItem.title,
                time: annotationItem.time,
                resume: annotationItem.resume,
              });
            };

            const btnEdit = document.createElement("div"); //fazer o onclick
            btnEdit.id = "button-edit-icon";
            btnEdit.appendChild(createSvgElement("PENCIL_ICON", 25));
            btnEdit.onclick = () => {
              screenState = "EDIT_ANNOTATION";
              btnAction(annotationItem);
            };

            const btnRemove = document.createElement("div"); //fazer o onclick
            btnRemove.id = "button-remove-icon";
            btnRemove.appendChild(createSvgElement("TRASH_ICON", 25));
            btnRemove.onclick = () => removeItem(divItem, annotationItem);

            const resume = document.createElement("p");
            resume.className = "item-resume";
            resume.innerText = annotationItem.resume;
            divTimeTitleButtons.appendChild(time);
            divTimeTitleButtons.appendChild(title);
            divTimeTitleButtons.appendChild(btnEdit);
            divTimeTitleButtons.appendChild(btnRemove);
            //div.appendChild(title)      //buttonEdit
            //div.appendChild(title)      //buttonRemove
            container.appendChild(divTimeTitleButtons);
            container.appendChild(resume);
            containerLine.appendChild(container);
            divItem.appendChild(containerLine);

            mainContent.appendChild(divItem);
          }
        }

        document.getElementById("list-button-div").style = "background-color: #141414";
        document.getElementById("new-button-div").style = "";
      }

      if (!document.querySelector(".list-item")) {
        const noAnnotations = document.createElement("div");
        noAnnotations.className = "no-annotations";
        noAnnotations.innerText = "THERE IS NO NOTES...";
        document.getElementById("main-content").appendChild(noAnnotations);
      }
      break;
    case "VIEW_ANNOTATION":
      if (!document.getElementById("div-title-time-view")) {
        let items = localStorage.getItem("@Annotation-extension");

        if (!!items) {
          items = JSON.parse(items);
          if (Array.isArray(items)) {
            items = items.find((annot) => {
              return (
                annot.url === selectedAnnotation.url &&
                annot.time === selectedAnnotation.time &&
                annot.resume.substring(0, 30) === selectedAnnotation.resume.substring(0, 30)
              );
            });
          }
        }

        document.getElementById("main-content").innerHTML = "";
        const divTitleTime = document.createElement("div");
        divTitleTime.id = "div-title-time-view";
        divTitleTime.className = "div-title-time";

        const videoTitle = document.createElement("h1");
        videoTitle.innerText = "Viewing: " + items.title; //colocar valores

        const videoTime = document.createElement("span");
        videoTime.innerText = convertTime(items.time); //colocar valores

        divTitleTime.appendChild(videoTitle);
        divTitleTime.appendChild(videoTime);

        const divTextContent = document.createElement("div");
        divTextContent.id = "div-text-content";
        divTextContent.className = "div-text-content";

        const divAnnotationTextInput = document.createElement("div");
        divAnnotationTextInput.className = "div-text-input";
        const annotationTextInput = document.createElement("textarea");
        annotationTextInput.id = "text-input";
        annotationTextInput.className = "text-input";
        annotationTextInput.maxLength = "1000";
        annotationTextInput.innerText = items.resume;
        annotationTextInput.readOnly = true;

        divAnnotationTextInput.appendChild(annotationTextInput);

        const link = document.createElement("a");
        link.href = `https://youtu.be/${items.url}?t=${Math.floor(items.time)}`;
        link.target = "_top";

        const gotoButton = document.createElement("div");

        gotoButton.className = "save-button";
        gotoButton.innerText = "GO TO VIDEO";

        link.appendChild(gotoButton);

        const divButtons = document.createElement("div");
        divButtons.className = "div-buttons";

        divButtons.appendChild(link);

        divTextContent.appendChild(divAnnotationTextInput);
        divTextContent.appendChild(divButtons);

        const lineSeparator = document.createElement("div");
        lineSeparator.className = "line-separator";

        const mainContent = document.getElementById("main-content");
        mainContent.appendChild(divTitleTime);
        mainContent.appendChild(lineSeparator);
        mainContent.appendChild(divTextContent);

        document.getElementById("new-button-div").style = "";
        document.getElementById("list-button-div").style = "";
      }
      break;
    case "EDIT_ANNOTATION":
      if (!document.getElementById("div-title-time-edit")) {
        document.getElementById("main-content").innerHTML = "";
        const divTitleTime = document.createElement("div");
        divTitleTime.id = "div-title-time-edit";
        divTitleTime.className = "div-title-time";

        const videoTitle = document.createElement("h1");
        videoTitle.innerText = "Editing: " + selectedAnnotation.title;

        const videoTime = document.createElement("span");
        videoTime.innerText = convertTime(selectedAnnotation.time);

        divTitleTime.appendChild(videoTitle);
        divTitleTime.appendChild(videoTime);

        const divTextContent = document.createElement("div");
        divTextContent.id = "div-text-content";
        divTextContent.className = "div-text-content";

        const divAnnotationTextInput = document.createElement("div");
        divAnnotationTextInput.className = "div-text-input";
        const annotationTextInput = document.createElement("textarea");
        annotationTextInput.id = "text-input";
        annotationTextInput.className = "text-input";
        annotationTextInput.maxLength = "1000";
        annotationTextInput.value = selectedAnnotation.resume;

        annotationTextInput.addEventListener("focus", () => {
          divAnnotationTextInput.style = `
        border: 2px solid #3ea6ff;
        padding: 0px;
        `;
        });
        annotationTextInput.addEventListener("focusout", () => {
          divAnnotationTextInput.style = "";
        });
        divAnnotationTextInput.appendChild(annotationTextInput);

        const cancelButton = document.createElement("button");
        cancelButton.type = "button";
        cancelButton.id = "cancel-button";
        cancelButton.className = "cancel-button";
        cancelButton.onclick = () => {
          screenState = "LIST_ANNOTATION";
          btnAction();
        };
        cancelButton.innerText = "CANCEL";

        const saveButton = document.createElement("button");
        saveButton.type = "button";
        saveButton.id = "save-button";
        saveButton.onclick = () => {
          editAnnotation(
            {
              url,
              title: videoTitle.innerText,
              time: video.currentTime,
              resume: annotationTextInput.value,
            },
            selectedAnnotation
          );
        };
        saveButton.className = "save-button";
        saveButton.innerText = "SAVE";

        const divButtons = document.createElement("div");
        divButtons.className = "div-buttons";

        divButtons.appendChild(cancelButton);
        divButtons.appendChild(saveButton);

        divTextContent.appendChild(divAnnotationTextInput);
        divTextContent.appendChild(divButtons);

        const lineSeparator = document.createElement("div");
        lineSeparator.className = "line-separator";

        const mainContent = document.getElementById("main-content");
        mainContent.appendChild(divTitleTime);
        mainContent.appendChild(lineSeparator);
        mainContent.appendChild(divTextContent);

        document.getElementById("new-button-div").style = "background-color: #141414";
        document.getElementById("list-button-div").style = "";
      }
      break;
  }
}
