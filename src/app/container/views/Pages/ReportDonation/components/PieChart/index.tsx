import React from 'react';
import { number, shape, arrayOf, string } from 'prop-types';
import { VictoryPie, VictoryLabel } from 'victory';
import formatNumber from '@/app/infrastructures/misc/formatNumber';

const PieChart = (props) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${props.width} ${props.height}`}
      style={{ overflow: 'visible', position: 'relative', zIndex: 97 }}
    >
      <VictoryLabel
        textAnchor="middle"
        verticalAnchor="middle"
        x={props.width / 2}
        y={props.height / 2}
        dy={-32}
        text={props.label[0]}
        style={props.labelProps.style[0]}
      />
      <VictoryLabel
        textAnchor="middle"
        verticalAnchor="middle"
        x={props.width / 2}
        y={props.height / 2}
        dy={-12}
        text={formatNumber(props.label[1])}
        style={props.labelProps.style[1]}
      />
      <VictoryLabel
        textAnchor="middle"
        verticalAnchor="middle"
        x={props.width / 2}
        y={props.height / 2}
        dy={12}
        text={props.label[2]}
        style={props.labelProps.style[2]}
      />
      <VictoryLabel
        textAnchor="middle"
        verticalAnchor="middle"
        x={props.width / 2}
        y={props.height / 2}
        dy={30}
        text={new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(props.label[3])}
        style={props.labelProps.style[3]}
      />
      <VictoryPie
        standalone={false}
        width={props.width}
        height={props.height}
        innerRadius={props['innerRadius']}
        data={props.data}
        {...props.pieProps}
      />
    </svg>
  );
};

export default PieChart;
PieChart.propTypes = {
  data: arrayOf(shape({})),
  height: number,
  innerRadius: number,
  label: arrayOf(string),
  labelProps: shape({}),
  pieProps: shape({}),
  width: number,
};

PieChart.defaultProps = {
  width: 300,
  height: 300,
};
