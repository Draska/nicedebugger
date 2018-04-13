import React from "react";
import TextField from 'material-ui/TextField';
import {Card, CardHeader} from 'material-ui/Card';
import {orange300} from 'material-ui/styles/colors';
import Checkbox from 'material-ui/Checkbox';
import EventNote from 'material-ui/svg-icons/notification/event-note';

function SelectorForm(props){
  const form = (
		<Card containerStyle={{'margin': '0px 10px 0px 10px'}}>
		<CardHeader
      title="Element"
      subtitle="Just if you know!"
			avatar={<EventNote/>}
			style={{'height': '0px'}}
    />
		<TextField style={{'marginTop': '10px'}}
			name="selector"
			value={props.selector}
			floatingLabelText="jQuery Selector"
			onChange={props.handleChange}
			underlineStyle={{borderColor: orange300}}
			multiLine={true}
			rows={1}
			rowsMax={3}
		/>
		<Checkbox style={{'height':'30px'}} label="Get Full Path" checked={props.checked} onCheck={props.onCheck}/>
		</Card>
  );
  return(
    <div style={{'marginLeft': '15px'}}>
      {form}
    </div>
	);
}

export default SelectorForm;