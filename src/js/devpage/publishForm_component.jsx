import React from "react";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CloudUpload from 'material-ui/svg-icons/file/cloud-upload';
import AllInclusive from 'material-ui/svg-icons/places/all-inclusive';
import GolfCourse from 'material-ui/svg-icons/places/golf-course';
import Block from 'material-ui/svg-icons/content/block';
import { teal800, red400 } from 'material-ui/styles/colors';
import {Card, CardHeader} from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';

export function PublishForm(props){
  const form = (
  	<Card containerStyle={{'margin': '0px 10px 10px 10px'}}>
      <CardHeader
        title="Upload Info"
        subtitle="Publish to GTM. Be careful!"
        avatar={<GolfCourse/>}
        style={{'marginBottom': '0px', 'height': '35px'}}
      />
    	<TextField value={props.analytics} errorText={props.errText1} type="text" name="analytics" hintText="ua-XXXXXXX-XX" floatingLabelText="Analytics Property" onChange={props.handleChange}/><br />
      <TextField value={props.gtm} errorText={props.errText2} type="text" name="gtm" hintText="GTM-5KW8P" floatingLabelText="GTM Container" onChange={props.handleChange}/><br />
      <TextField style={{'marginBottom': '20px'}} value={props.account} errorText={props.errText3} type="text" name="account" hintText="digodat" floatingLabelText="GTM Account Name" onChange={props.handleChange}/><br />
    </Card>
  );
  return(
  	<div>
    	{form}
		</div>
  );
}

export function PublishButtons(props){
  const form = (
  	<div style={{'margin': '25px 30px 0px 50px'}}>
    	<RaisedButton style={{'marginBottom': '7px', 'width': '180px'}} label="Upload to GTM" backgroundColor={teal800} labelColor="#fff" id="btnUpload" onClick={props.uploadDictionary} icon={<CloudUpload />} />
      <RaisedButton disabled={true} style={{'marginBottom': '7px', 'width': '180px'}} label="Publish GTM" backgroundColor={red400} labelColor="#fff" id="btnPub" onClick={props.publishDictionary} icon={<Block />} />
      <Toggle label="Auto Fill Test Mode" labelPosition="right" onToggle={props.onToggle}/>
    </div>
  );
  return(
  	<div>
    	{form}
		</div>
  );
}

// description 'which GTM and which Analytics.'