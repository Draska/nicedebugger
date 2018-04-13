import React from "react";
import TextField from 'material-ui/TextField';
import Public from 'material-ui/svg-icons/social/public';
import {Card, CardHeader} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

function EcommercePayload(props){
  const form = (
		<Card containerStyle={{'margin': '0px 10px 0px 10px', 'width' : '250px', 'height': '415px'}}>
      <CardHeader
        title="Payload"
        subtitle="Define your payload!"
        avatar={<Public/>}
        style={{'height': '15px'}}
      />
      
        <div style={{'height': '60px', 'display':'flex', 'flexDirection':'row', 'marginTop':'10px'}}>
        <RadioButtonGroup name="ecommerceParams" onChange={props.onRadioChange}>
        <RadioButton value="eeName" style={{'marginLeft': '0px', 'marginTop': '35px', 'marginBottom':'0px', 'marginRight':'0px', 'width':'40px'}}/> 
        <RadioButton value="eeId" style={{'marginLeft': '0px', 'marginTop': '35px', 'marginBottom':'0px', 'marginRight':'0px', 'width':'40px', 'color': 'black'}}/>
        <RadioButton value="eeBrand" style={{'height': '10px', 'marginLeft': '0px', 'marginTop': '35px', 'width':'40px'}}/> 
        <RadioButton value="eeVariant" style={{'marginLeft': '0px', 'marginTop': '35px', 'width':'40px'}}/>
        <RadioButton value="eePos" style={{'marginLeft': '0px', 'marginTop': '35px', 'width':'40px'}}/>
        <RadioButton value="eeList" style={{'marginLeft': '0px', 'marginTop': '35px', 'width':'40px'}}/>
        </RadioButtonGroup>
          <TextField value={props.payload.eeName} type="text" name="eeName" title="Name" floatingLabelText="Name" 
                    onChange={props.onChange} style={{'width':'200px'}}/>
        </div>
        <div style={{'height': '60px', 'display':'flex', 'flexDirection':'row'}}><TextField value={props.payload.eeId} type="text" name="eeId" title="Id" floatingLabelText="Id" onChange={props.onChange} style={{'marginLeft': '40px', 'width':'200px'}}/></div>
        <div style={{'height': '60px', 'display':'flex', 'flexDirection':'row'}}><TextField value={props.payload.eeBrand} type="text" name="eeBrand" title="Brand" floatingLabelText="Brand" onChange={props.onChange} style={{'marginLeft': '40px', 'width':'200px'}}/></div>
        <div style={{'height': '60px', 'display':'flex', 'flexDirection':'row'}}><TextField value={props.payload.eeVariant} type="text" name="eeVariant" title="Variant" floatingLabelText="Variant" onChange={props.onChange} style={{'marginLeft': '40px', 'width':'200px'}}/></div>
        <div style={{'height': '60px', 'display':'flex', 'flexDirection':'row'}}><TextField value={props.payload.eePos} type="text" name="eePos" title="Pos" floatingLabelText="Pos" onChange={props.onChange} style={{'marginLeft': '40px', 'width':'200px'}}/></div>
        <div style={{'height': '60px', 'display':'flex', 'flexDirection':'row'}}><TextField value={props.payload.eeList} type="text" name="eeList" title="List" floatingLabelText="List" onChange={props.onChange} style={{'marginLeft': '40px', 'width':'200px'}}/></div>
		 
    </Card>
  );


  return(
    <div>
      {form}
    </div>
	);
}

export default EcommercePayload;