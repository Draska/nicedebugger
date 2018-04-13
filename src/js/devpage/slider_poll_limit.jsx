import React from 'react';
import Slider from 'material-ui/Slider';

/**
 * By default, the slider is continuous.
 * The `step` property causes the slider to move in discrete increments.
 */
const SliderHits = (props) => (
  <Slider step={1} value={5} min={0} max={10} onChange={props.onChange}/>
);

export default SliderHits;