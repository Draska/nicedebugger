import "../css/popup.css";
//import Form from "./devpage/greeting_component.jsx";
import GATracker from "./devpage/GATracker_component.jsx";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from "react";
import { render } from "react-dom";
import {Dictionary} from './dictionary.js'
import {Track} from './track.js'
import {Action} from './action.js'
import {Node} from './node.js'

console.log('on dev page.js')
// Create a connection to the background page
var backgroundPageConnection = chrome.runtime.connect({
  name: "panel"
});

backgroundPageConnection.postMessage({
  name: 'init',
  tabId: chrome.devtools.inspectedWindow.tabId
});

const MaterialForm = () => (
  <MuiThemeProvider>
    <div>
      <GATracker />
    </div>
  </MuiThemeProvider>
);

render(
  <MaterialForm/>,
  window.document.getElementById("app-container")
);


