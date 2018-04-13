import React from "react";
import $ from 'jquery';
import { Node } from '../node.js';
import { Action } from '../action.js';
import { Track } from '../track.js';
import { Page } from '../page.js';
import { Dictionary } from '../dictionary.js';
import axios from "axios";
import { MainComponent, SubComponent, PublishFormStyled, PageAndSelector } from './style_components.js';
import RaisedButton from 'material-ui/RaisedButton';
import CloudUpload from 'material-ui/svg-icons/file/cloud-upload';
import CloudDownload from 'material-ui/svg-icons/file/cloud-download';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import Chip from 'material-ui/Chip';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {lightBlue300, orange300, purpleA100, greenA700, teal300, teal800, lightGreenA700 } from 'material-ui/styles/colors';
import Checkbox from 'material-ui/Checkbox';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import AutoComplete from 'material-ui/AutoComplete';
import TrackList from './trackList_component.jsx';
import VPVForm from './vpv_component.jsx';
import EventForm from './eventForm_component.jsx';
import SelectorForm from './selectorForm_component.jsx';
import {PublishForm, PublishButtons} from './publishForm_component.jsx';
import Dropdown from './dropdown_component.jsx';
import {Tabs, Tab} from 'material-ui/Tabs';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';
import TouchApp from 'material-ui/svg-icons/action/touch-app';
import LineWeight from 'material-ui/svg-icons/action/line-weight';
import GTMList from './gtmList_component';
import SliderHits from './slider_poll_limit';
import OptionForm from './optionCard_component';
import IconButton from 'material-ui/IconButton';
import PowerSettings from 'material-ui/svg-icons/action/power-settings-new';
import EcommercePayload from './ecommerce_component.jsx'
import { DownJSON } from "./down_component.jsx";
var fileDownload = require('js-file-download'); // download function
import { full_gtm } from './full_workspace.js'
//const GTM_API_URL = 'https://vast-island-75093.herokuapp.com/gtm-api/'
//const API_URL = 'https://vast-island-75093.herokuapp.com/gatracking/'
const GTM_API_URL = 'https://clickoapi.appspot.com/gtm-api/'
const API_URL = 'https://clickoapi.appspot.com/gatracking/'
//const API_URL = 'http://localhost:3000/gatracking/'
//const GTM_API_URL = 'http://localhost:3000/gtm-api/'

export default class GATracker extends React.Component {
  constructor(props) {
    super(props);
    this.port = chrome.extension.connect({
      name: "Sample Communication" 
    });
    this.previousPage = undefined
    this.publish = false
    this.state = {
      node: { selector: 'No Item Selected' },
      nodeImg: undefined,
      page: new Page(),
      nodeText: '',
      eventRegEx: '',
      category: '',
      action: '',
      label: '',
      virtualPage: '',
      dictionary: new Dictionary(),
      analytics: '',
      gtm: '',
      account: '',
      errText1: '',
      errText2: '',
      errText3: '',
      devMode: false,
      //isRegEx: false,
      highlight: false,
      type: 'click',
      pageGtm: [],
      visibilityRepetition: 5,
      value: 1,
      checked: false,
      turnedOn: true,
      payload: { eeName:'', eeId: '', eePos: '', eeBrand: '', eeVariant: '', eeList: '' },
      isEcommerce: false,
      eeChecked: '',
      downloadType: 'full_gtm'
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveEvent = this.saveEvent.bind(this);
    this.loadDictionary = this.loadDictionary.bind(this);
    this.uploadDictionary = this.uploadDictionary.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.showData = this.showData.bind(this);
    this.highlight = this.highlight.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this)
    this.validate = this.validate.bind(this);
    this.publishDictionary = this.publishDictionary.bind(this)
    this.showListData = this.showListData.bind(this)
    this.formMeasure = this.formMeasure.bind(this)
    this.autoGtmField = this.autoGtmField.bind(this)
    this.updatePageOnTabChange = this.updatePageOnTabChange.bind(this)
    this.contentScriptListener = this.contentScriptListener.bind(this)
    this.dropdownController = this.dropdownController.bind(this);
    this.updateCheck = this.updateCheck.bind(this)
    this.turnMeOn = this.turnMeOn.bind(this)
    this.toggleEcommerce = this.toggleEcommerce.bind(this)
    this.handleEEChange = this.handleEEChange.bind(this)
    this.handleEERadioButtons = this.handleEERadioButtons.bind(this)
    this.handleDownChange = this.handleDownChange.bind(this)
    this.downloadJSON = this.downloadJSON.bind(this)
  }

  componentDidMount() {

    this.contentScriptListener()
    this.updatePageOnTabChange()
  };

  contentScriptListener(){
    var _this = this
    this.port.onMessage.addListener(function (msg) {

      console.log(msg);
      if(msg.clickInfo) {
        _this.setState({
          'page': new Page(msg.clickInfo.page),
          'nodeText': msg.clickInfo.nodeText
        });
        if (msg.clickInfo.type == "ecommerce"){
          var payload = Object.assign({}, _this.state.payload);
          payload[_this.state.eeChecked]  = new Node(msg.clickInfo.node).selector;
          _this.setState({
            'payload' : payload                       
          });
        } else {
          _this.setState({
            'node': new Node(msg.clickInfo.node) //new Node(msg.clickInfo.node.selector)
          }, _this.showData);
        }

      }
      if(msg.pageInfo) {
        _this.setState((prevState, props) => { 
          console.log(prevState.page.hostName)
          console.log(_this.state.page.hostName)
          if(msg.pageInfo.hostName != prevState.page.hostName ){ 
            _this.loadDictionary(msg.pageInfo.currentPage.hostName) 
            console.log('HOSTNAME IS' + msg.pageInfo.currentPage.hostName)
          }
          return {
            'page': new Page(msg.pageInfo.currentPage),
            'pageGtm': msg.pageInfo.gtms
          };
        },_this.showData) 
      }
      if(msg.nodeImage) {
        _this.setState({
            'nodeImg': msg.nodeImage.img
          }) 
      }
      if(msg.turnOn) {
        _this.setState({turnedOn: msg.turnOn == 'ON' ? true : false})
      }
    });
  }

  updatePageOnTabChange(){
    var _this = this
    _this.port.postMessage('giveMePageDawg');      
    chrome.tabs.onActivated.addListener(function(tabId, changeInfo, tab){
      _this.port.postMessage('giveMePageDawg');      
    })
  }

  showData() {
    var dictionary = this.state.dictionary;
    var page = dictionary.getPage(this.state.page);
    console.log('/// Dictionary ///');
    console.log(dictionary);
    var track;
    if ((this.state.node.selector))
      track = page.getTrack(this.state.node.selector);
    //console.log('after get trackk k'); // getTrack tiene que tomar regEx
    if (track /*&& track.length > 0*/){
      var event = track.action;
      this.setState({ 'action': event.action, 'label': event.label, 'category': event.category, 'eventRegEx': track.regEx }) 
    } else {
      this.setState({ 'action': '', 'label': '', 'category': '', 'eventRegEx': ''})
      if (this.state.value == 6) this.setState({ 'label': 'false'});
        
    }
  }

  //  INPUT FIELDS HANDLER
  handleChange(event) {
    if(event.target.name == 'analytics') this.setState({'errText1': ''})
    if(event.target.name == 'gtm') this.setState({'errText2': ''})
    if(event.target.name == 'account') this.setState({'errText3': ''})
    if(event.target.name == 'selector') this.setState({'node': {selector: event.target.value}})
    var p = event.target.value //event.target.value
    this.setState({ [event.target.name]: event.target.value }); // event.target.value
  }

  handleEEChange(event) {
    let newPayload = Object.assign({}, this.state.payload);
    newPayload[event.target.name] = event.target.value;                        //updating value
    this.setState({'payload': newPayload});   
  }

  handleEERadioButtons(event, value){
    this.setState({'eeChecked' : value});
  }

  // SAVE EVENT CLICK HANDLER
  saveEvent() { //a
    var dictionary = this.state.dictionary
    var nameKey = this.state.page.hostName
    var gtm = this.state.gtm
    var ua = this.state.analytics
    var account = this.state.account
    var action = this.getAction()
    var track = new Track(this.state.node, action, this.state.eventRegEx)
    dictionary.addPage(this.state.page)//this.state.page
    dictionary.dictAddTrack(track, this.state.page)
    dictionary.addProperties(ua, gtm, account, this.state.page)
    //dictionary.addRegEx(this.state.page, this.state.pageRegEx)
    this.setState({ 'dictionary': dictionary })
    chrome.storage.local.set({ dictionary: dictionary }, function () {
    })
    console.log('Sending dictionary to server')
    axios.put(API_URL + nameKey, {
      dictionary: dictionary, 
      host: nameKey
    })
      .then(function () { console.log('Saved to DigoServer') })
  }

  //  RETURNS ACTION FROM COMPONENT STATE
  getAction() {
    if(this.state.isEcommerce){
      return new Action(
        this.state.category,
        this.state.action,
        this.state.label,
        this.state.type,
        this.state.nodeText,
        this.state.visibilityRepetition,
        this.state.payload
      )
    } else {
      return new Action(
        this.state.category,
        this.state.action,
        this.state.label,
        this.state.type,
        this.state.nodeText,
        this.state.visibilityRepetition,
        {}
      )
    }
    
  }
  
  highlight(event, isInputChecked){
    this.port.postMessage(isInputChecked);
  }

  formMeasure(event, isInputChecked){
    var mssg = isInputChecked ? 'measure form :: 1' : 'measure form :: 0'
    this.port.postMessage(mssg);
  }

  checkForDictionary(res) {
    if(res.data && res.data.length != 0 && res.data.dictionary) return true
    else return false
  }

  loadDictionary(hostName) {
    console.log(hostName)
    let _this = this
    axios.get(API_URL + hostName)
      .then(function (response) {
        console.log(response)
        var dictionary
        if (_this.checkForDictionary(response)) {
          dictionary = new Dictionary(response.data.dictionary)
          console.log('dictionary loaded from server')
        }else {
          console.log('no dictionary found, creating NEW dictionary')          
          dictionary = new Dictionary()
          console.log(hostName)
          axios.post(API_URL, {
            dictionary: dictionary,
            host: hostName
          });
        }
        _this.setState({ 'dictionary': dictionary })
        _this.saveDictionaryToChromeStorage(dictionary)
        _this.port.postMessage({dictionary: _this.state.dictionary});            
      })
      .catch(function (e) {
        console.error(e)
      })
  }

  saveDictionaryToChromeStorage(dictionary){
    chrome.storage.local.set({ dictionary: dictionary }, function () {
    })
  }

  // TODO use array for errors this is hideous
  validate(ua,gtm,account) { 
    if (ua == '') this.setState({ errText1: "This Field is required." })
    if (gtm == '') this.setState({ errText2: "This Field is required." })
    if (account == '') this.setState({ errText3: "This Field is required." })
    return true
  }

  uploadDictionary() {
    var dictionary = this.state.dictionary,
      nameKey = this.state.page.hostName,
      gtm = this.state.gtm,
      ua = this.state.analytics,
      account = this.state.account
      //isRegEx = this.state.regExMatch;
    if(!this.validate(ua,gtm,account)) return
    dictionary.addProperties(ua, gtm, account, this.state.page)
    //dictionary.addRegEx(this.state.page, this.state.pageRegEx)
    this.setState({dictionary: dictionary})
    let _this = this
    this.saveDictionaryToChromeStorage(dictionary)
    console.log('Posting dictionary to server')
    axios.put(API_URL + nameKey, {
      dictionary: dictionary, 
      host: nameKey, 
      uaTrackingId: ua,
      gtmAccount: account,
      gtmId: gtm
    })
      .then(function (response) {
        console.log('SUCCESS')
        chrome.identity.getProfileUserInfo(function (userInfo) {
          if(_this.publish) var newURL = GTM_API_URL +"/publish/" + userInfo.email;
          else var newURL = GTM_API_URL + userInfo.email + '?host=' + _this.state.page.hostName;
          chrome.tabs.create({ url: newURL });
        });
      })
      .catch(function (e) {
        console.error('500 - Could not POST dictionary')
        console.error(e)
      })
  }
  
  publishDictionary() {
    this.publish = true
    alert('You are about to publish, are you sure?')
    alert('Are you sure you\'re not going to ruin everything?') //material-ui tiene modales
    this.uploadDictionary()
  }

  deleteEvent() {
    var dictionary = this.state.dictionary
    var action = this.getAction()
    var selector = new Node(this.state.node.selector)
    var page = this.state.page
    var regEx = this.state.eventRegEx
    var track = new Track(selector, action, regEx)
    dictionary.deleteTrack(track, page)
    this.saveDictionaryToChromeStorage(dictionary)
    var nameKey = page.hostName
    axios.put(API_URL + nameKey, {
      dictionary: dictionary, 
      host: nameKey
    })
      .then(function () { console.log('Tracking deleted') })
      .catch(function (e) {
        console.error('Could not delete track')
        console.error(e)
      })
  }
  showListData(track) {
    var selector = new Node(track.node.selector)
    this.setState({ 'action': track.action.action, 'label': track.action.label, 'category': track.action.category, 'node': selector, 'eventRegEx': track.regEx})
    this.port.postMessage('SCROLL::'+selector.selector)
  }

  autoGtmField(gtm) {
    this.setState({gtm: 'GTM-'+gtm})
  }

  dropdownController(event, index, value){
    var type;
    switch(value){
      case 1: type = 'click'
        break;
      case 2: type = 'form'
        break;
      case 3: type = 'visibility'
        break;
      case 5: type = 'publish'
        break;
      case 6: type = 'virtualPageView'  
        this.setState({category:'', action:'', label:'false'})
        break;
      case 7: type = 'download'
        break;
    }
    this.setState({value:value, type:type});
  }

  updateCheck(event, checked) {
    console.log(this.state.node)
    this.setState({
        checked: checked
    })
  }
  turnMeOn(event) {
    var tog = this.state.turnedOn
    this.setState({
      turnedOn: !tog
    })
    this.port.postMessage(`Toggle :: ${!tog ? 'ON' : 'OFF'}`)
  }

  toggleEcommerce(event, isInputChecked) {
    var status = this.state.isEcommerce;
    this.setState({isEcommerce: !status, category:'Ecommerce'})
  }

  handleDownChange(event, value){
    this.setState({downloadType: value})
  }

  downloadJSON(){
    if(this.state.downloadType == 'full_gtm'){
      //download bunch of stuff
      var data = JSON.stringify(full_gtm)
      var dict = this.state.dictionary
      fileDownload(JSON.stringify(dict), "clickodatDictionary.json")
      fileDownload(data, "clickodatWorkspace.json")
    } else {
      var dict = this.state.dictionary
      fileDownload(JSON.stringify(dict), "clickodatDictionary.json")
    }
  }

  render() {
    var main;
    var payloadFields;
    if(this.state.value == 5){
      main = <MainComponent><PublishForm
      handleChange={this.handleChange}
      analytics={this.state.analytics}
      gtm={this.state.gtm}
      account={this.state.account}
      errText1={this.state.errText1}
      errText2={this.state.errText2}
      errText3={this.state.errText3}
      /><PublishButtons
      uploadDictionary={this.uploadDictionary}
      publishDictionary={this.publishDictionary}
      onToggle={(e, b) => {
        if(b) this.setState({ analytics: 'UA-1234567-8', gtm:'GTM-WBWNTJP', account:'digodat' })
        else this.setState({ analytics: '', gtm:'', account:'' })}
      }/></MainComponent>
    }else if(this.state.value == 6){
      main = <VPVForm
      handleChange={this.handleChange}
      category={this.state.category}
      action={this.state.action}
      label={this.state.label}
      saveEvent={this.saveEvent}
      deleteEvent={this.deleteEvent}/>
    }else if(this.state.value == 7){
      main = <DownJSON onChange={this.handleDownChange} onClick={this.downloadJSON}/>
    }else{
      main = <EventForm
      category={this.state.category}
      action={this.state.action}
      label={this.state.label}
      handleChange={this.handleChange}
      saveEvent={this.saveEvent}
      deleteEvent={this.deleteEvent}/>
    }

    if(this.state.isEcommerce){
      payloadFields = <EcommercePayload
      payload={this.state.payload}
      onChange={this.handleEEChange}
      onRadioChange={this.handleEERadioButtons}
      />
    } else {
      payloadFields = null
    }

    return (
      <MainComponent>
        <MainComponent>
          <MainComponent>
            {main}
            {payloadFields}
            {this.state.value != 5 && this.state.value != 7 ? <MainComponent>
              <OptionForm
              value={this.state.value}
              visibilityRepetition={this.state.visibilityRepetition}
              sliderChange={(event, newValue)=>{this.setState({visibilityRepetition: newValue})}}
              handleChange={this.handleChange}
              eventRegEx={this.state.eventRegEx}
              onToggleForm={this.formMeasure}
              onToggleHigh={this.highlight}
              onToggleEE={this.toggleEcommerce}
              onToggleVPV={(e, b) => {
                if(b) this.setState({category:this.state.page.pathName, action:this.state.page.href})
                else this.setState({category:'', action:''})}}
              onToggleNonInteraction={(e, b) => {
                if(b) this.setState({label:'true'})
                else this.setState({label:'false'})}
              }/><SelectorForm
              selector={this.state.checked && this.state.node.selector != 'No Item Selected' ? this.state.node.makeSelector(this.state.node.selectorArray) : this.state.node.selector}
              page={JSON.stringify(this.state.page.href)}
              onCheck={this.updateCheck}
              checked={this.state.checked}
              handleChange={this.handleChange}/>
            </MainComponent> : null}
          </MainComponent>
          <SubComponent style={{'marginLeft': '15px', 'width': '200px'}}>
            <div>
              <Dropdown value={this.state.value} onChange={this.dropdownController} />
            </div>
            <SubComponent>
            {this.state.value != 5 && this.state.value != 7 ? <div style={{float:'right', width: '300px', height: '300px'}}>
            <h2>Selected node is:</h2>
            <p>{this.state.nodeText}</p>
            <img src={this.state.nodeImg} style={{'maxHeight': '100%', 'maxWidth': '200px'}}></img>
            </div> : null} 
            </SubComponent>
          </SubComponent>
        </MainComponent>
        <SubComponent style={{'marginRight': '10px', 'height': '200px', 'overflow': 'auto'}}>
          {this.state.value == 5 ? <GTMList gtmList={this.state.pageGtm} onClick={this.autoGtmField}/> : <TrackList dictionary={this.state.dictionary} onClick={this.showListData}	type={this.state.type} page={this.state.page}/>}
        </SubComponent>
        <SubComponent>
          <IconButton tooltip={'On/Off'} iconStyle={{color: `${this.state.turnedOn ? lightGreenA700 : 'red'}`}} onClick={this.turnMeOn}>
            <PowerSettings/>
          </IconButton>
        </SubComponent>
      </MainComponent>
    );
  }
}