import $ from 'jquery'
import domtoimage from 'dom-to-image';

// import jQuery from 'jquery'

'use strict'

window.onhashchange = sendCurrentPage;



// STORAGE LISTENER
chrome.storage.onChanged.addListener(function (changes, namespace) {
  if (changes.dictionary) {
   paintTracks(changes.dictionary.newValue)
  }
})

function sendToBackground (object) {
  console.log(object)
  chrome.extension.sendMessage(object, function (response) {})
}

// Handler request from background page
chrome.extension.onMessage.addListener(function (message, sender) {
  console.log('In content Script Message Recieved is ' + JSON.stringify(message))
  if (typeof message == 'boolean') nodeHighlighter(message)
  if (message.dictionary && localStorage.getItem('clickodatToggle')=='ON') paintTracks(message.dictionary)
  if(message == 'giveMePageDawg') {sendCurrentPage(); checkIfOn()}
  if(message.indexOf && message.indexOf('measure form ::') > -1) formHighlighter(message.split('::')[1].trim())
  if(message.indexOf('SCROLL::') > -1) goToNode(message.split('::').pop().trim())
  if(message.indexOf('Toggle :: ') > -1){ try{turnMeOn(message.split('::')[1].trim())}catch(e){console.log(e)}}
  chrome.extension.sendMessage('My URL is' + window.location.origin)
})

