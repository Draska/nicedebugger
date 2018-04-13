import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { orange300, purpleA100, greenA700, teal300, teal800 } from 'material-ui/styles/colors';


const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);
// pass to menuItem onClick callback to deleteEvent. Need the selector.
// onClick on edit should simulate a shift click on corresponding element.

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Edit</MenuItem>
    <MenuItem>Delete</MenuItem>
  </IconMenu>
);

function Tracks(props){
    console.log('IN LIST TRACKS')
    console.log(props)
    const act = props.tracks.filter((t,i)=>{return t.action.type == props.type}).map((track, index) => 'Action: ' + track.action.action.replace('::text', track.action.text).replace('::complete','{ complete | empty }'))
    const lab = props.tracks.filter((t,i)=>{return t.action.type == props.type}).map((track, index) => 'Label: ' + track.action.label.replace('::text', track.action.text).replace('::id',track.node.selector.split('#').pop()))
    //'Label: ' + track.action.labelselector
    const trackItems = props.tracks.filter((t,i)=>{return t.action.type == props.type}).map((track, index) =>
        <ListItem
            key={index}
            leftAvatar={<Avatar src="/img/ga-icon.png" />}
            /**rightIconButton={rightIconMenu} */
            primaryText={'Category: ' + track.action.category}
            secondaryText={
                <p>
                <span style={{color: darkBlack}}>{act[index]}</span><br />
                {lab[index]}
                </p>
            }
            secondaryTextLines={2}
            hoverColor={greenA700}
            onClick={()=>{props.onClick(track)}}
        />
    ); 
    return(
        <div>
            {trackItems}
        </div>
        );
}
function TrackList(props){
    console.log('DEBUGGGGGG')
    console.log(props)
    const listItems = props.dictionary.pages.filter((p,i)=>{return p.getPageKey() == props.page.getPageKey()}).map((page, index) => 
        <List key = {index}>
            <Subheader>{page.getPageKey()}</Subheader>
            <Tracks tracks={page.tracks} onClick={props.onClick} type={props.type}/>
        </List>
    );
    return(
    <div>
        <div>
         {listItems}
        </div>
    </div>
    );
}

export default TrackList;