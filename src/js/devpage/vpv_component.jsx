import React from "react";
import TextField from 'material-ui/TextField';
import {Card, CardHeader} from 'material-ui/Card';
import MapsMyLocation from 'material-ui/svg-icons/maps/my-location';
import RaisedButton from 'material-ui/RaisedButton';

function VPVForm(props){
  const form = (
		<Card containerStyle={{'margin': '0px 10px 0px 10px'}}>
			<CardHeader
				title="Pageview settings"
				subtitle="Define your funnel!"
				avatar={<MapsMyLocation/>}
				style={{'marginBottom': '0px', 'height': '35px'}}
			/>
			<TextField value={props.category} type="text" name="category" title="Page" floatingLabelText="Page" onChange={props.handleChange}/>
			<TextField value={props.action} type="text" name="action" title="Location" floatingLabelText="Location" onChange={props.handleChange}/>
			<RaisedButton style={{'margin': '0px 5px 7px 0px'}} label="Save" primary={true} id="btnSave" onClick={props.saveEvent} />{' '}
			<RaisedButton label="Delete" secondary={true} id="btnDelete" onClick={props.deleteEvent} />
		</Card>
  );
  return(
    <div>
      {form}
    </div>
	);
}

export default VPVForm;