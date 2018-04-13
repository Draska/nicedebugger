import React from "react";
import $ from 'jquery';

import axios from "axios";
import { MainComponent, SubComponent, PublishFormStyled, PageAndSelector } from './style_components.js';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {lightBlue300, orange300, purpleA100, greenA700, teal300, teal800, lightGreenA700 } from 'material-ui/styles/colors';
import Checkbox from 'material-ui/Checkbox';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';


export default class GATracker extends React.Component {
  constructor(props) {
    super(props);
    this.port = chrome.extension.connect({
      name: "Sample Communication" 
    });
    //this.previousPage = undefined
    this.state = {
      
    };
    // bind methods
    
  }

  componentDidMount() {};

  render() {
    var main;
    main = <Checkbox/>

    return (
      <MainComponent>
            {main}           
      </MainComponent>
    );
  }
}