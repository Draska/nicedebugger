import React from "react";
import $ from 'jquery'
import { Node } from '../node.js'
import { Action } from '../action.js'
import { Track } from '../track.js'
import { Page } from '../page.js'
import { Dictionary } from '../dictionary.js'
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
import EventForm from './eventForm_component.jsx'
import PublishForm from './publishForm_component.jsx'
import {Tabs, Tab} from 'material-ui/Tabs';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';
import TouchApp from 'material-ui/svg-icons/action/touch-app';
import LineWeight from 'material-ui/svg-icons/action/line-weight';
import Status from './status_component'
import GTMList from './gtmList_component'
import SliderExampleStep from './slider_poll_limit'

const API_URL = 'https://vast-island-75093.herokuapp.com'
//const API_URL = 'https://localhost:3000/dictionary'

export default class GATracker extends React.Component {
  constructor(props) {
    super(props);
    var dict = new Dictionary();
    this.port = chrome.extension.connect({
      name: "Sample Communication" 
    });
    this.publish = false
    /*
    this.eventHistory = {
      categories: [],
      actions: [],
      labels: [],
      ua: [],
      gtm: [],
      account: []
    }
    */
    this.state = {
      node: { selector: 'No Item Selected' },
      page: '',
      nodeText: '',
      eventRegEx: '',
      category: '',
      action: '',
      label: '',
      virtualPage: '',
      dictionary: dict,
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
      visibilityRepetition: 5
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
    //this.makeEventHistory = this.makeEventHistory.bind(this)
    this.publishDictionary = this.publishDictionary.bind(this)
    this.showListData = this.showListData.bind(this)
    this.formMeasure = this.formMeasure.bind(this)
    this.autoGtmField = this.autoGtmField.bind(this)
  }

  // CHROME STORAGE LISTENER FOR LAST CLICKED ELEMENT
  componentDidMount() {
    var _this = this
    var toggle = true

    _this.loadDictionary() 
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
          _this.setState({
              'node': new Node(msg.clickInfo.node.selector),
              'page': new Page(msg.clickInfo.page),
              'nodeText': msg.clickInfo.nodeText
            },_this.showData) 
        }
        if(msg.pageInfo) {
          _this.setState({
              'page': new Page(msg.pageInfo.currentPage),
              'pageGtm': msg.pageInfo.gtms
            },_this.showData) 
        }       
        port.postMessage(msg);
      });
    });
  };


  showData() {
    console.log(this.state.node)
    var dictionary = this.state.dictionary
    var event = dictionary.getAction(this.state.node.selector, this.state.page)
    if (!event) this.setState({ 'action': '', 'label': '', 'category': '' })
    else this.setState({ 'action': event.action, 'label': event.label, 'category': event.category }) 

  }

  //  INPUT FIELDS HANDLER
  handleChange(event) {
    if(event.target.name == 'analytics') this.setState({'errText1': ''})
    if(event.target.name == 'gtm') this.setState({'errText2': ''})
    if(event.target.name == 'account') this.setState({'errText3': ''})
    var p = event.target.value //event.target.value
    this.setState({ [event.target.name]: event.target.value }); // event.target.value
  }

  // SAVE EVENT CLICK HANDLER
  saveEvent() {
    var dictionary = this.state.dictionary
    var nameKey = this.state.page.origin // hash this and make it uniqueID, use it to control unique dictionaries per page on DB
    var gtm = this.state.gtm
    var ua = this.state.analytics
    var account = this.state.account
    var isRegEx = this.state.isRegEx
    var action = this.getAction()
    var track = new Track(this.state.node, action)
    dictionary.addPage(this.state.page)//this.state.page
    dictionary.dictAddTrack(track, this.state.page)
    dictionary.addProperties(ua, gtm, account, this.state.page)// keep up with gtm info, maybe inside page instead of dictionary?
    dictionary.addRegEx(this.state.page, this.state.pageRegEx)
    this.setState({ 'dictionary': dictionary })
    chrome.storage.local.set({ dictionary: dictionary }, function () {
    })
    console.log('Sending dictionary to server')
    console.log(dictionary)
    axios.post(API_URL+'/dictionary', {
      dictionary: dictionary, name: nameKey
    })
      .then(function () { console.log('Saved to DigoServer') })
  }

  //  RETURNS ACTION FROM COMPONENT STATE
  getAction() {
    return new Action(
      this.state.category,
      this.state.action,
      this.state.label,
      this.state.type,
      this.state.selectorText,
      this.state.visibilityRepetition
    )
  }
  
  highlight(event, isInputChecked){
    this.port.postMessage(isInputChecked);
  }

  formMeasure(event, isInputChecked){
    var mssg
    if(isInputChecked) mssg = 'measure form :: 1'
    else mssg = 'measure form :: 0'
    this.port.postMessage(mssg);
  }

  checkForDictionary(res) {
    console.log(res)
    if(res.data.length != 0 && res.data[0].dictionary) return true
    else return false
  }

  makeEventHistory(dictionary){
    var _this = this
    var pages = dictionary.getPages()
    var tracks = pages.reduce(function(acum, page){
      return acum = acum.concat(page.getAllTracks())
  },[])
    tracks.forEach(function(track) {
      _this.eventHistory.categories.push(track.action.category)
      _this.eventHistory.actions.push(track.action.action)
      _this.eventHistory.labels.push(track.action.label)
    });
    this.eventHistory.ua.push(dictionary.ua)
    this.eventHistory.gtm.push(dictionary.gtm)
    this.eventHistory.account.push(this.account)
  }
  //  LOADS DICTIONARY FROM SERVER - TODO: CHECK LOCAL STORAGE MAYBE 
  loadDictionary() {
    console.log('Loading dictionary')
    let _this = this
    axios.get(API_URL+'/dictionary')
      .then(function (response) {
        var dictionary
        if (_this.checkForDictionary(response)) {
          dictionary = new Dictionary(response.data[0].dictionary)
          console.log('dictionary loaded from server')
        }
        else {
          dictionary = new Dictionary()
          console.log('no dictionary found, creating en dictionary')          
        }
        _this.makeEventHistory(dictionary)
        _this.setState({ 'dictionary': dictionary })
        console.log('SET DICTIONARY STATE')
        console.log(dictionary)
        chrome.storage.local.set({ dictionary: dictionary }, function () {
        })
        _this.port.postMessage({dictionary: _this.state.dictionary});            
      })
      .catch(function (e) {
        console.error('500 - Could not GET dictionary')
        console.log(e)
      })
  }
  
  // VALIDATE A REQUIRED FIELD
  validate(ua,gtm,account) {
    if (ua == '') {
      this.setState({ errText1: "This Field is required." })
      if (gtm == '') {
        this.setState({ errText2: "This Field is required." })
        if (account == '') {
          this.setState({ errText3: "This Field is required." })
          return false
        }
        return false
      }
      return false
    }
    return true
  }
  // UPLOADS DICTIONARY TO SERVER AND CREATES WORKSPACE ON GTM
  uploadDictionary() {
    debugger
    console.log('Begun Uploading dictionary')
    console.log(this)
    console.log(this.publish)
    var dictionary = this.state.dictionary,
      nameKey = this.state.page.origin,
      gtm = this.state.gtm,
      ua = this.state.analytics,
      account = this.state.account,
      isRegEx = this.state.regExMatch;
    // validation
    if(!this.validate(ua,gtm,account)) return
    // end validation
    dictionary.addProperties(ua, gtm, account, this.state.page)
    dictionary.addRegEx(this.state.page, this.state.pageRegEx)
    this.setState({dictionary: dictionary})
    let _this = this
    chrome.storage.local.set({ dictionary: dictionary }, function () {
    })
    console.log('POSTing DICTIONARY')
    console.log(dictionary)
    axios.post(API_URL+'/dictionary', {
      dictionary: dictionary, name: nameKey
    })
      .then(function (response) {
        console.log('SUCCESS')
        chrome.identity.getProfileUserInfo(function (userInfo) {
          if(_this.publish) var newURL = API_URL+"/gtm-api/publish/" + userInfo.email;
          else var newURL = API_URL+"/gtm-api/" + userInfo.email;
          chrome.tabs.create({ url: newURL });
        });
      })
      .catch(function (e) {
        console.error('500 - Could not POST dictionary')
        console.log(e)
      })
  }
  
  // DOES WHAT IT SAYS
  publishDictionary() {
    this.publish = true
    alert('You are about to publish, are you sure?')
    alert('Are you sure you\'re not going to ruin everything?') //material-ui tiene modales
    this.uploadDictionary()
  }

  // DELETES ENTRY
  deleteEvent() {
    var dictionary = this.state.dictionary
    var action = this.getAction()
    var selector = new Node(this.state.node.selector)
    var page = this.state.page
    var track = new Track(selector, action)
    dictionary.deleteTrack(track, page)
    chrome.storage.local.set({ dictionary: dictionary }, function () {
    })
    console.log('SAVED DICTIONARY :: Entry Deleted')
    var nameKey = page.origin
    axios.post(API_URL+'/dictionary', {
      dictionary: dictionary, name: nameKey
    })
      .then(function () { console.log('Saved to DigoServer') })
  }
  showListData(track) {
    console.log('showListData!')
    console.log(track)
    var selector = new Node(track.node.selector)
    this.setState({ 'action': track.action.action, 'label': track.action.label, 'category': track.action.category, 'node': selector }) 
  }

  autoGtmField(gtm) {
    this.setState({gtm: 'GTM-'+gtm})
  }
  // TODO: GET BETTER UI - meter un onActive en cada tab para levantar el nombre
  render() {
    return (<div></div>
      /*<div>
      <DigoWrapperStyled>
        <Tabs tabItemContainerStyle={{height: '30px'}} value={this.state.type} onChange={(value)=>{console.log('TABS');console.log(value);this.setState({type:value})}}>
        <Tab
         /* icon={<TouchApp style={{size: '10px'}}/>}
          label="Clicks"
          value='click'
          style={{'textAlign': 'center'}}
        >
        <DigoWrapperStyled>
        <ClickoformStyled>         
          <EventForm
            selector={this.state.node.selector}
            hostName={this.state.page.hostName}
            pathName={this.state.page.pathName}
            hash={this.state.page.hash}
            pageRegEx={this.state.pageRegEx}
            devMode={this.state.devMode} 
            category={this.state.category} 
            action={this.state.action} 
            label={this.state.label} 
            handleChange={this.handleChange}
            saveEvent={this.saveEvent}
            deleteEvent={this.deleteEvent}
          />
          <div>
            
          </div>
        </ClickoformStyled>
        <TrackList dictionary={this.state.dictionary} onClick={this.showListData}	type={this.state.type} page={this.state.page}></TrackList> 
        <ClickoformStyled>
          <div>
          <Toggle label="Developer Mode" labelPosition="right" onToggle={(e, b) => { this.setState({ devMode: b }) }} /><Toggle label="Highlight" labelPosition="right" onToggle={ this.highlight } />
            </div>
        </ClickoformStyled>
        </DigoWrapperStyled>
        </Tab>
        <Tab
          icon={<LineWeight/>}
          label="Forms"
          value="form"
        >
        <DigoWrapperStyled>
        <ClickoformStyled>         
          <Status
            selector={this.state.node.selector}
            hostName={this.state.page.hostName}
            pathName={this.state.page.pathName}
            hash={this.state.page.hash}
            pageRegEx={this.state.pageRegEx}
            devMode={this.state.devMode} 
            category={this.state.category} 
            action={this.state.action} 
            label={this.state.label} 
            handleChange={this.handleChange}
            saveEvent={this.saveEvent}
            deleteEvent={this.deleteEvent}
          />
          <div>
            
          </div>
        </ClickoformStyled>
        {'         '}
        <TrackList dictionary={this.state.dictionary} onClick={this.showListData}	type={this.state.type} page={this.state.page}/> 
        <ClickoformStyled>
          <div>
          <Toggle label="Developer Mode" labelPosition="right" onToggle={(e, b) => { this.setState({ devMode: b }) }} />
          <Toggle label="Highlight" labelPosition="right" onToggle={ this.highlight } />
          <Toggle label="Form Measure Hint" labelPosition="right" onToggle={ this.formMeasure } />
            </div>
        </ClickoformStyled>
        </DigoWrapperStyled>
        </Tab>
        <Tab
          icon={<MapsPersonPin />}
          label="Upload"
          value="upload"
        >
        <DigoWrapperStyled>          
        <ClickoformStyled>
          <PublishForm
            handleChange={this.handleChange}
            publishDictionary={this.publishDictionary}
            analytics={this.state.analytics}
            gtm={this.state.gtm}
            account={this.state.account}
            errText1={this.state.errText1}
            errText2={this.state.errText2}
            errText3={this.state.errText3}
            uploadDictionary={this.uploadDictionary}
          />
          <div>
            
          </div>
        </ClickoformStyled>
        {'         '}
        <GTMList gtmList={this.state.pageGtm} onClick={this.autoGtmField}/>
        <ClickoformStyled>
        <Toggle 
          label="Auto Fill Test Mode" 
          labelPosition="right" 
          onToggle={(e, b) => {
            if(b) this.setState({ analytics: 'UA-1234567-8', gtm:'GTM-WBWNTJP', account:'digodat' })
            else this.setState({ analytics: '', gtm:'', account:'' }) 
            }
          }
        />
        </ClickoformStyled>
        </DigoWrapperStyled>
        </Tab>
        <Tab
          icon={<LineWeight/>}
          label="Visibility"
          value="visibility"
        >
        <DigoWrapperStyled>
        <ClickoformStyled>         
          <EventForm
            selector={this.state.node.selector}
            hostName={this.state.page.hostName}
            pathName={this.state.page.pathName}
            hash={this.state.page.hash}
            pageRegEx={this.state.pageRegEx}
            devMode={this.state.devMode} 
            category={this.state.category} 
            action={this.state.action} 
            label={this.state.label} 
            handleChange={this.handleChange}
            saveEvent={this.saveEvent}
            deleteEvent={this.deleteEvent}
          />
          <div>
            
          </div>
        </ClickoformStyled>
        {'         '}
        <TrackList dictionary={this.state.dictionary} onClick={this.showListData}	type={this.state.type} page={this.state.page}/> 
        <ClickoformStyled>
          <div>
          <Toggle label="Developer Mode" labelPosition="right" onToggle={(e, b) => { this.setState({ devMode: b }) }} />
          <Toggle label="Highlight" labelPosition="right" onToggle={ this.highlight } />
          <br/>
          <div>
          <span>{'Send ' + this.state.visibilityRepetition + ' hits'}</span>
          <SliderExampleStep onChange={(event, newValue)=>{this.setState({visibilityRepetition: newValue})}}/>
          </div>
          </div>
        </ClickoformStyled>
        </DigoWrapperStyled>
        </Tab>
        </Tabs>
      </DigoWrapperStyled>
         
        </div> */         
    );
  }
}

