import React from "react";
import TextField from 'material-ui/TextField';
import {Card, CardHeader} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import SliderHits from './slider_poll_limit';
import Toggle from 'material-ui/Toggle';
import { purpleA100 } from 'material-ui/styles/colors';
import Settings from 'material-ui/svg-icons/action/settings';

function OptionForm(props){
  const form = (
		<Card containerStyle={{'margin': '0px 10px 0px 10px'}}>
			<CardHeader
				title="Settings"
				subtitle="Tips and Tweaks!"
				avatar={<Settings/>}
				style={{'height': '0px'}}
			/>     
			<TextField style={{'marginTop': '15px'}}
				name="eventRegEx"
				value={props.eventRegEx}
				floatingLabelText="Page RegEx"
				hintText="If empty, no RegEx matching."
				onChange={props.handleChange}
				underlineStyle={{ borderColor: purpleA100 }}
				style={{'marginTop': '0px'}}
			/>
			{props.value != 5 ? <Toggle label="Highlight" labelPosition="right" onToggle={props.onToggleHigh}/> : null}
			{props.value == 1 || props.value == 3 ? <Toggle label="Toggle Ecommerce" labelPosition="right" onToggle={props.onToggleEE}/> : null}
			{props.value == 2 ? <Toggle label="Form Measure Hint" labelPosition="right" onToggle={props.onToggleForm}/> : null}
			{props.value == 6 ? <Toggle label="Autocomplete page" labelPosition="right" onToggle={props.onToggleVPV}/> : null}
			{props.value == 6 ? <Toggle label="Non Interaction" labelPosition="right" onToggle={props.onToggleNonInteraction}/> : null}
			{props.value == 3 ? <div><span>{'Send ' + props.visibilityRepetition + ' hits'}</span>
			<SliderHits onChange={props.sliderChange}/></div> : null}
		</Card>
  );
  return(
  	<div style={{'marginLeft': '15px'}}>
      {form}
    </div>
	);
}

export default OptionForm;