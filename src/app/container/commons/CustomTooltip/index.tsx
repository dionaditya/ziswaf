/* eslint-disable react/prop-types */
import React from 'react';
import { VictoryTooltip } from 'victory';
import { number } from 'prop-types';

const CustomTooltip = (props) => {
    const { x, y } = props;
  const mediaQuery = window.matchMedia('(max-width: 1370px)').matches;
  const yTransform = x > 200 ? (mediaQuery ? y + 60 : y) : y;
  const xTrasnform = x > 200 ? (mediaQuery ? x - 30 : x) : x;
  return (
    <g>
      <VictoryTooltip
        renderInPortal={false}
        y={yTransform}
        x={xTrasnform}
        {...props}
        style={{
          fill: 'white',
          fontSize: 11,
          fontFamily: 'roboto',
        }}
        flyoutStyle={{
          fill: '#373f51',
          height: 5,
        }}
        cornerRadius={2}
        pointerLength={5}
        text={text => {
          return text.datum ? text.datum.label : '-';
        }}
      />
    </g>
  );
};
CustomTooltip.defaultEvents = VictoryTooltip['defaultEvents'];

CustomTooltip.propTypes = {
  x: number,
  y: number,
};

export default CustomTooltip;
