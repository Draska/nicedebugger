import React from "react";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CloudUpload from 'material-ui/svg-icons/file/cloud-upload';
import Block from 'material-ui/svg-icons/content/block';
import { teal800, red400 } from 'material-ui/styles/colors';

function PublishForm(props){
    const form = (
        <div>
            <TextField value={props.analytics} errorText={props.errText1} type="text" name="analytics" hintText="ua-XXXXXXX-XX" floatingLabelText="Analyti Property" onChange={props.handleChange}/><br />
            <TextField value={props.gtm} errorText={props.errText2} type="text" name="gtm" hintText="GTM-5KW8P" floatingLabelText="GTM Container" onChange={props.handleChange}/><br />
            <TextField value={props.account} errorText={props.errText3} type="text" name="account" hintText="digodat" floatingLabelText="GTM Account Name" onChange={props.handleChange}/><br />
            <RaisedButton label="Upload to GTM" backgroundColor={teal800} labelColor="#fff" id="btnUpload" onClick={props.uploadDictionary} icon={<CloudUpload />} />
            <RaisedButton disabled={true} label="Publish GTM" backgroundColor={red400} labelColor="#fff" id="btnPub" onClick={props.publishDictionary} icon={<Block />} />
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

export default PublishForm;