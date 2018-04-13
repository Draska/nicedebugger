import React from 'react';
import Toggle from 'material-ui/Toggle';

export default class DigoToggle extends React.Component {
  constructor(props){
    super(props)
  }
  
//define on toggle
highlight(event, isInputChecked){
    var port = chrome.extension.connect({
      name: "Samle Communication" //Given a Name
    });
    //Posting message to background page
    port.postMessage(isInputChecked);
}

render(){
  return (
  <div>
    <Toggle
      label="Highlighter(not working)"
      labelPosition="right"
      onToggle={this.props.highlight}
      /*disabled={true}*/
    />
  </div>
);
} 
}
/*DigoToggle.propTypes = {
  onToggle: PropTypes.function
}*/