import React from "react";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { purpleA100, orange300 } from 'material-ui/styles/colors';
import Chip from 'material-ui/Chip';

function Status(props){
    const form = (
        <div>
            <Chip name="page" backgroundColor={purpleA100}>{JSON.stringify(props.hostName + props.pathName + props.hash)}</Chip>
            <TextField
                disabled={!props.devMode}
                name="eventRegEx"
                value={props.pageRegEx} /*user should not modify page with a string.*/
                floatingLabelText="Event RegEx"
                hintText="If empty, no RegEx matching."
                onChange={props.handleChange}
                underlineStyle={{ borderColor: purpleA100 }}
                multiLine={true}
                rows={1}
                rowsMax={4}
            />
            <TextField
                disabled={!props.devMode}
                name="selector"
                value={props.selector}
                floatingLabelText="jQuery Selector"
                onChange={props.handleChange}
                underlineStyle={{ borderColor: orange300 }}
                multiLine={true}
                rows={1}
                rowsMax={4}
            /> 
            <TextField 
                value={props.category} 
                type="text" 
                name="category" 
                title="Category" 
                floatingLabelText="Cateogory"
                hintText="Form Name" 
                onChange={props.handleChange} />
            <TextField 
                value={props.action} 
                type="text" 
                name="action" 
                title="Action" 
                floatingLabelText="Action" 
                hintText="Interaction :: ::complete"
                onChange={props.handleChange} />
            <TextField 
                value={props.label} 
                type="text" 
                name="label" 
                title="Label" 
                floatingLabelText="Label" 
                hintText="::id"
                onChange={props.handleChange}/><br></br>
            <RaisedButton label="Save" primary={true} id="btnSave" onClick={props.saveEvent} />{' '}
            <RaisedButton label="Delete" secondary={true} id="btnDelete" onClick={props.deleteEvent} />
        </div>
    );
    return(
    <div>
        <div>
          {form}
        </div>
    </div>
    );
}

export default Status;