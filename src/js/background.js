import "../css/popup.css";
//import Form from "./devpage/greeting_component.jsx";
import GATracker from "./background/gaTracker_component.jsx";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from "react";
import { render } from "react-dom";
import { Dictionary } from './dictionary.js'
import { Track } from './track.js'
import { Action } from './action.js'
import { Node } from './node.js'

console.log('on dev page.js')

const MaterialForm = () => (
  <MuiThemeProvider>
    <GATracker />
  </MuiThemeProvider>
);

render(
  <MaterialForm/>,
  window.document.getElementById("app-container")
);

/*chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.clickInfo)
      sendResponse({status: "clickInfo Recieved"});
  });
*/

