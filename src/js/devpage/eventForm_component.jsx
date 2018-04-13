import React from "react";
import TextField from 'material-ui/TextField';
import Public from 'material-ui/svg-icons/social/public';
import {Card, CardHeader} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

function EventForm(props){
  const form = (
		<Card containerStyle={{'margin': '0px 10px 0px 10px'}}>
      <CardHeader
        title="Event"
        subtitle="Define your hit!"
        avatar={<Public/>}
        style={{'height': '0px'}}
      />
			<div style={{'height': '60px'}}><TextField value={props.category} type="text" name="category" title="Category" floatingLabelText="Category" onChange={props.handleChange}/></div>
			<div style={{'height': '60px'}}><TextField value={props.action} type="text" name="action" title="Action" floatingLabelText="Action" onChange={props.handleChange}/></div>
			<div style={{'height': '60px'}}><TextField value={props.label} type="text" name="label" title="Label" floatingLabelText="Label" onChange={props.handleChange}/></div>
			<RaisedButton style={{'margin': '15px 5px 7px 0px'}} label="Save" primary={true} id="btnSave" onClick={props.saveEvent} />{' '}
			<RaisedButton label="Delete" secondary={true} id="btnDelete" onClick={props.deleteEvent} />
		</Card>
  );
  return(
    <div>
      {form}
    </div>
	);
}

export default EventForm;