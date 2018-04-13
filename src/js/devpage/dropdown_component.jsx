import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

function Dropdown(props) {
  const drop = (
    <DropDownMenu value={props.value} onChange={props.onChange}>
      <MenuItem value={1} primaryText="Clicks"/>
      <MenuItem value={6} primaryText="VirtualPageView"/>
      <MenuItem value={2} primaryText="Forms"/>
      <MenuItem value={3} primaryText="Visibility"/>
      <MenuItem disabled primaryText="----------------------------"/>
      <MenuItem value={5} primaryText="Publish"/>
      <MenuItem value={7} primaryText="Download"/>
    </DropDownMenu>
  );
  return (
    <div>
      {drop}
    </div>
  );
}

export default Dropdown;