import {Node} from './node.js'
import {Action} from './action.js'
export class Track {
  constructor (selector, action, regEx) {
    if (arguments.length == 3) {
      this.node = selector 
      this.action = action
      this.regEx = regEx
    }
    if (arguments.length == 1) {
      this.node = new Node(arguments[0].node.selector) 
      this.action = new Action(arguments[0].action)
      this.regEx = arguments[0].regEx
    }
  }

  getSelector () {
    return this.node
  }

  getAction () {
    return this.action
  }

  getRegEx () {
    return this.regEx
  }

  toString () {
    this.node.toString() + '\n' + '\t' + this.action.toString()
  }
}