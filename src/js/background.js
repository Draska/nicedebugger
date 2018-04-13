import "../css/popup.css";
//import Form from "./devpage/greeting_component.jsx";
import GATracker from "./background/gaTracker_component.jsx";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from "react";
import { render } from "react-dom";

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

