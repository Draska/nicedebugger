import React from "react";
import $ from 'jquery'
import axios from "axios"
import { DigoWrapperStyled, ClickoformStyled, PublishFormStyled } from './styled.js'
import RaisedButton from 'material-ui/RaisedButton';
import CloudUpload from 'material-ui/svg-icons/file/cloud-upload';
import CloudDownload from 'material-ui/svg-icons/file/cloud-download';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import Chip from 'material-ui/Chip';
import { orange300, purpleA100, greenA700, teal300, teal800 } from 'material-ui/styles/colors';
import Checkbox from 'material-ui/Checkbox';
import AutoComplete from 'material-ui/AutoComplete';
import TrackList from './trackList_component.jsx';
import {Tabs, Tab} from 'material-ui/Tabs';


export default class GATracker extends React.Component {
  constructor(props) {
    super(props);
    this.port = chrome.extension.connect({
      name: "Sample Communication" 
    });
    this.state = {};
    //bind methods here
  }

  // CHROME STORAGE LISTENER FOR LAST CLICKED ELEMENT
  componentDidMount() {
    var _this = this
    var toggle = true

    chrome.extension.onConnect.addListener(function (port) {
      port.onMessage.addListener(function (message) {
        console.log(message)
        chrome.tabs.query({'active': true
        }, function (tabs) {
          for (var tab in tabs) {
            chrome.tabs.sendMessage(tabs[tab].id, message);
          }
        });
      });
      chrome.extension.onMessage.addListener(function (msg, sender) {
        if(msg.clickInfo) {
          //do smt 
        }
        if(msg.pageInfo) {
           
        }       
        port.postMessage(msg);
      });
    });
  };


   render() {
    return (<div></div>);
  }
}

