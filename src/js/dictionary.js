import {Page} from './page.js'
import jQuery from 'jquery'
import $ from 'jquery'
export class Dictionary { // dictionary or pages
    constructor (arg) {
      this.extendJquery()
      if (arg instanceof Array) // parameter was omitted in call
        this.pages = arg
      else if (arg){ // parameter was omitted in call    
        this.pages = arg.pages.map(function (page) {
          return new Page(page) // ?
        })
      }
      else this.pages = []
   }
   
   addProperties(ua, gtm, acc, page) {
     this.ua = ua
     this.GTM = gtm
     this.account = acc
     //this.getPage(page).addPageRegEx(reg)
   }
   /*
   addRegEx(page, regEx) {
    this.getPage(page).addPageRegEx(regEx)
   }
   */

   addPage (page) {
     if(this.getPage(page)) return;
     this.pages.push(page)
   }
 
   getPages () {
     return this.pages
   }
 
   getPage (page) {
     return this.pages.filter(function (p, index) {
       return p.getPageKey() == page.getPageKey()
     }).pop()
   }
   
   getCurrentPage (page) {
      return this.getPage(page)
   }
 
   getAction(selector, page){
    if(!this.getCurrentPage(page)) return undefined 
    else return this.getCurrentPage(page).getAction(selector)
   }
 
   getTrack(node){ // hay que buscar por pagina tambien
     var tracksList = this.pages.map(function(page){
       return page.tracks
     })
     var res
     tracksList.forEach(function(tracks){
       var tmp = tracks.filter(function(track){
         return $(track.node.selector).filter(function(i,n){
           n == node[0]
         })
       })//.pop()
       if(tmp)
        res = tmp
     })
     if(res != undefined && res.length > 1){  // RETURN THE MOST SPECIFIC ONE
       var sorted = res.sort((a,b) => { return b.node.selector.length - a.node.selector.length})
       res = sorted.pop()
  
     }
     return res
   }
   dictAddTrack(track, page){
     var currentPage = this.getPage(page)
     if(currentPage) currentPage.addTrack(track)
     else{
      this.addPage(page)
      this.getPage(page).addTrack(track)
     } 
   }
 
   toString () {
     return this.pages.map(function (page) {
       return pages.toString()
     }).toString()
   }

   deleteTrack (track, page) {
     this.getPage(page).killTrack(track)
   }
   ///*
   extendJquery(){
     // TODO STRIP THIS SELECTOR
jQuery.fn.extend({
    getPath: function () {
        var path = "",
            node = this,
            _this = this;
        while (node.length) {
            var realNode = node[0],
                name = realNode.localName,
                id, classNameStr, currentNodeSelector;
            if (!name) {
                break;
            }
            currentNodeSelector = name.toLowerCase();
            id = realNode.id;
            if (!!id) {
                currentNodeSelector = currentNodeSelector + "#" + id;
            }
            classNameStr = realNode.className;
            if (!!classNameStr) {
                classNameStr = classNameStr.trim()
                currentNodeSelector = currentNodeSelector + "." + classNameStr.split(/[\s\n]+/).join('.');
            }
            node = node.parent();
            path = ">" + currentNodeSelector + path;
        }
        // FIX TO GET THE SELECTOR OF ONLY ONE NODE - WARNING : THIS SELECTOR WILL NOT GENERALIZE EVER
        var index = $(path.substr(1)).map(function(index, n){
            if( n ==  _this[0]){
                return true
            }
            return false
        }).toArray().indexOf(true)
        return path.substr(1) + ':eq('+ index +')';
    }
});
   }//*/
 }