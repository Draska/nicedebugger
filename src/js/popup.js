import "../css/popup.css";
import Greeting from "./popup/greeting_component.jsx";
import React from "react";
import { render } from "react-dom";
chrome.tabs.create({url: chrome.extension.getURL('background.html')});

render(
  <Greeting/>,
  window.document.getElementById("app-container")
);
