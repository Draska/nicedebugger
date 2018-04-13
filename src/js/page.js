import {Track} from './track.js'
export class Page {
    constructor (page) {
      if (page) {
        this.href = page.hostName + page.pathName + page.hash
        this.hostName = page.hostName
        this.pathName = page.pathName
        this.hash = page.hash
        this.origin = page.origin
     //   this.regEx = page.regEx
        this.tracks = page.tracks.map(function (track) {
          return new Track(track)
        })
      }else {
        this.href = window.location.href
        this.hostName = window.location.hostname
        this.pathName = window.location.pathname
        this.hash = window.location.hash
        this.origin = window.location.origin
      //  this.regEx = ''
        this.tracks = []
      }
    }
    /*
    addPageRegEx(reg){
      this.regEx = reg
    }
    */

    getPageKey () {
      return this.hostName + this.pathName + this.hash;
    }
  
    toString () {
      return this.getPageKey() + '\n' + '\t' + this.tracks.map(function (track) {
          track.toString() + '\n'
        }).toString()
    }
  
    addTrack (track) {
      var temp = this.getAllTracks().filter(function(t){
        return (track.node.selector == t.node.selector /*&& track.regEx == t.regEx */)
      })
      if(temp.length) temp[0].action = track.action
      else this.tracks.push(track)
    }
  
    killTrack (track) {
      this.tracks = this.getAllTracks().filter(function(t){
        return track.node.selector != t.node.selector || (track.node.selector == t.node.selector && track.regEx != t.regEx)
      })
    }

    getAllTracks () {
      return this.tracks
    }
  
    getTrack(selector){
      return this.getAllTracks().filter(function(t){
        return t.node.selector == selector
      }).pop()
    }
  
    getAction(selector){
      var track = this.getTrack(selector)
      return track ? track.action : undefined
    }
  }