export class Action {
    constructor (category, action, label, type, text, repe, payload) {
      if (arguments.length == 1) {
        this.category = arguments[0].category
        this.action = arguments[0].action
        this.label = arguments[0].label
        this.type = arguments[0].type
        this.text = arguments[0].text
        this.repe = arguments[0].repe
        this.payload = arguments[0].payload
      }else {
        this.category = category
        this.action = action
        this.label = label
        this.type = type
        this.text = text
        this.repe = repe
        this.payload = payload
      }
    }
    toString () {
      return this.category + '\n' + this.action + '\n' + this.label + '\n' + this.type + '\n' + this.text
    }
  }