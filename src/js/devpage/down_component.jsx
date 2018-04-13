import React from "react";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CloudDownload from 'material-ui/svg-icons/file/cloud-download';
import AllInclusive from 'material-ui/svg-icons/places/all-inclusive';
import GolfCourse from 'material-ui/svg-icons/places/golf-course';
import Block from 'material-ui/svg-icons/content/block';
import { teal800, red400 } from 'material-ui/styles/colors';
import {Card, CardHeader} from 'material-ui/Card';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';


export function DownJSON(props){
  const form = (
    <Card containerStyle={{'margin': '0px 10px 0px 10px'}}>
    <CardHeader
        title="Download JSON"
        subtitle="Upload to GTM didn't work huh?"
        avatar={<AllInclusive/>}
        /*style={{'height': '0px'}}*/
    />  
      <RadioButtonGroup name="downjson" defaultSelected="full_gtm" onChange={props.onChange}>
          <RadioButton
            value="full_gtm"
            label="I don't wanna worry.(Download full workspace)"
          />
          <RadioButton
            value="just_dic"
            label="I do things my way!(Download event dictionary only)"
          />
      </RadioButtonGroup>
    	<RaisedButton style={{'marginTop': '14px', 'marginBottom': '7px', 'width': '180px'}} label="Download" backgroundColor={teal800} labelColor="#fff" id="btnUpload" onClick={props.onClick} icon={<CloudDownload />} />      
    </Card>
  );
  return(
  	<div>
    	{form}
		</div>
  );
}

// description 'which GTM and which Analytics.'