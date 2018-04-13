import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack, greenA700} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

function GtmItem(props){
    const items = props.gtm.map((gtm, index) =>
        <ListItem
            key={index}
            leftAvatar={<Avatar src="/img/google-tag-manager.png" />}
            primaryText={'GTM-' + gtm}
            hoverColor={greenA700}
            onClick={()=>{props.onClick(gtm)}}
        />
    ); 
    return(
        <div>
            {items}
        </div>
        );
}

function GTMList (props) {
    console.log('GTM LIST')
    console.log(props)
    const listItems = ( 
    <List>
        <Subheader>{'Current GTM'}</Subheader>
        <GtmItem gtm={props.gtmList} onClick={props.onClick}/>
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

export default GTMList