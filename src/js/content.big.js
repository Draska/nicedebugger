import { Page } from './page.js'
import { Dictionary } from './dictionary.js'
import { Track } from './track.js' // not working. //track is defined below
import { Action } from './action.js'
import { Node } from './node.js'
import $ from 'jquery'
import domtoimage from 'dom-to-image';

// import jQuery from 'jquery'

'use strict'

window.onhashchange = sendCurrentPage;

try{
  checkIfOn()
}catch(e){console.error(e)}


// ///////////////////////////////////////////// CLICKS ///////////////////////////////////////////
try{
  sendCurrentPage()
}catch(e){console.error(e)}

var pressedKey;

function startClickodat(){
/*  $(window).on('keypress', function (e) {
    pressedKey = e.which;
  }); */
  $(document).on('click.ohandler1', function (e) { 
    documentClickHandler(e); })
  $(document).on('contextmenu.ohandler2',function (e) { 
    documentClickHandler(e) 
  })
}
  
function turnMeOn(toggle){
  if(toggle == 'ON'){
    localStorage.setItem('clickodatToggle', 'ON');
    sendToBackground({turnOn: 'ON'})
    location.reload(true)
  } else {
    localStorage.setItem('clickodatToggle', 'OFF');
    sendToBackground({turnOn: 'OFF'})
    $(document).off('click.ohandler1')
    $(document).off('contextmenu.ohandler2')
    location.reload(true)
  }
}

function checkIfOn(){
  var start = localStorage.getItem('clickodatToggle')
  switch(start){
    case 'ON':
      sendToBackground({turnOn: 'ON'})
      localStorage.setItem('clickodatToggle', 'ON');
      startClickodat()
      break;
    case 'OFF':
      sendToBackground({turnOn: 'OFF'})
      localStorage.setItem('clickodatToggle', 'OFF');
      break;
    default:
      sendToBackground({turnOn: 'ON'})
      localStorage.setItem('clickodatToggle', 'ON');
      startClickodat()
      break;
  }
}

var multiSelector = []
var clearMulti = window.setTimeout(function(){multiSelector = []},8000)
var previouslyClickedElement
var previousCss
// /////////////////////////////////////////////////// DOCUMENT CLICK HANDLER ///////////////////////////////////////////
function documentClickHandler (e) {
  if (e.shiftKey || (e.shiftKey && e.ctrlKey)) {
    var target = $(e.target);
    document.getSelection().removeAllRanges();
    e.preventDefault()
    e.stopPropagation()
    e.stopImmediatePropagation()
    if (e.altKey){
      sendToBackground({clickInfo: {node: new Node(target), nodeText: target.text().trim(), type: 'ecommerce'}});
      if(previouslyClickedElement && !previouslyClickedElement.css('outline-color').includes("rgb(0, 128, 0)")) /// abominable
        previouslyClickedElement.css(previousCss);
      previousCss = {'outline-color': target.css('outline-color'), 'outline-style': target.css('outline-style')};      
      previouslyClickedElement = target;
      target.css({ 'outline-style': 'dashed','outline-width': 'light','outline-color': 'red'});
      window.setTimeout(function(){
        previouslyClickedElement.css(previousCss);
      }, 5000);
    return;
    }
    var category, action, label, target = $(e.target), isMultiSelect = false, selector = new Node($(e.target)), pagina = new Page()
    sendNodeImage(e.target)
    if(previouslyClickedElement && !previouslyClickedElement.css('outline-color').includes("rgb(0, 128, 0)")) /// abominable
      previouslyClickedElement.css(previousCss);
    previousCss = {'outline-color': target.css('outline-color'), 'outline-style': target.css('outline-style')}      
    previouslyClickedElement = target
    target.css({ 'outline-style': 'dashed','outline-width': 'light','outline-color': 'red'})    
    // GET LAST CLICK AND ITS PAGE
    if (!(e.shiftKey && e.ctrlKey)) {
      sendToBackground({clickInfo: {node: selector,page: pagina, nodeText: target.text().trim(), type: 'event'}})
    }else {
      handleMultipleSelection (selector, pagina)
      clearMulti = window.setTimeout(function(){
        var mergedSelector = selector.mergeSelectors(multiSelector)
        $(mergedSelector).css({ 
          border: '0',
          'border-radius': '25px'
        }) 
        multiSelector = []
        console.log('MultiSelector is empty')
      },8000)
      }
    return false
  }
}

function sendNodeImage(node){
  domtoimage.toPng(node)
      .then(function (dataUrl) {
          sendToBackground({nodeImage: {img: dataUrl}})              
      })
      .catch(function (error) {
          console.error('oops, something went wrong!', error);
      });
}

function handleMultipleSelection (selector, pagina) {
  window.clearTimeout(clearMulti)
  multiSelector.push(selector)
  var mltSlctr = multiSelector.slice()
  //if (multiSelector.length >= 2) {
    var mergedSelector = selector.mergeSelectors(mltSlctr)
    $(mergedSelector).css({ 
      border: '2px solid red',
       'border-radius': '25px'
    })   
    mergedSelector = new Node(mergedSelector)
    sendToBackground({clickInfo: {node: mergedSelector,page: pagina, nodeText: 'Multi Selector Dynamic Text', type: 'event'}})
  //}
}

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

function sendCurrentPage(){
  var temp = scrapeGtm()
  console.log('in send page')
  console.log(temp)
  sendToBackground({pageInfo:{currentPage: new Page(), gtms: temp}})
}

function scrapeGtm(){
  var gtms = $('script').map(function(index, elm){ // es feo, podria tratar de hacer menos cosas, pero se estaba rompiendo...
    return $(elm).attr('src')
  }).filter(function(index, elm){
    return elm.indexOf('gtm') > -1
  }).map(function(index, elm){
    var temp = elm.split('GTM-').pop().split('&')[0]
    return temp
  }).filter(function(index, elm){
    return elm.indexOf('://') < 0
  }).toArray()
  return gtms
}

function paintTracks(dictionary){
  var trackLists = dictionary.pages.map(function (page) {
      return page.tracks
    })
    var trackList = trackLists.reduce(function (acum, trackList) {
      return acum.concat(trackList)
    }, [])
    trackList.forEach(function (track) {
      var selector = track.node.selector
      $(selector).css({ 'outline-style': 'dashed','outline-width': 'light','outline-color': 'green'})
    })
}

function formHighlighter(numStr) {
  var toggle = Number(numStr) // cast str to num
  toggle = Boolean(toggle) // make it boolean just for the lulz
  var i = 0
  var target = $($('input')[i])
  while(target.css('outline-color').includes("rgb(0, 128, 0)") || target.css('outline-color').includes("red")) { ++i;target = $($('input')[i]) }
  
  if(!target.css('outline-color').includes("rgb(0, 0, 255)")){ // abominable indeed
    previousCss = {'outline-color': target.css('outline-color'), 'outline-style': target.css('outline-style')}
  }
  console.log(previousCss)  
  if(toggle){
    $('input, select, textarea').css({
      'outline-style': 'dashed','outline-width': 'light','outline-color': 'blue'
    })
  } else {
    $('input, select, textarea').css(previousCss)
  }
}

function goToNode(selector){
  $('html, body').animate({
      scrollTop: $(selector).offset().top - visualViewport.height/2
  }, 2000);
  var shiftClick = jQuery.Event("contextmenu");
  shiftClick.shiftKey = true;
  $(selector).trigger(shiftClick)
}

function nodeHighlighter (boolean) {
  if (boolean) {
    $(document).on('mouseover.dat', function (e) {
      var me = $(e.target)
      var parents = me.parents()
      var clase = me.attr('class')
      var papaClase = me.parent().attr('class')
      // else{
      //var previousCss = {'outline-color': me.css('outline-color'), 'outline-style': me.css('outline-style')}
      //me.css({ 'outline-style': 'dashed','outline-width': 'light','outline-color': 'deeppink'})
      me.css({"border-color": "deeppink", 
        "border-width":"5px", 
        "border-style":"solid"
      });
      if (parents) parents.each(function (index, parent) {
          $(parent).css({'border-style': 'none'}) // border-style
        })
      me.mouseleave(function () {
        $(this).css({'border-style': 'none'})
      })
    })
  } else $(document).off('mouseover.dat')
}
