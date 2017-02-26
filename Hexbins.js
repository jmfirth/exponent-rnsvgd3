import Exponent from 'exponent';
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { range } from 'd3-array';
import { hexbin as d3hexbin } from 'd3-hexbin';
import { randomNormal } from 'd3-random';
import { scaleLinear } from 'd3-scale';
import { interpolateLab } from 'd3-interpolate';
import Svg, { Path, G } from 'react-native-svg';

const width = 420;
const height = 600;
const deltaTheta = 0.3;
const n = 1200;
const k = 20;

let i = -1;
let theta = 0;
let randomX = randomNormal(width / 2, 80);
let randomY = randomNormal(height / 2, 80);
let points = range(n).map(function() { return [randomX(), randomY()]; });

const color = scaleLinear()
  .domain([0, 20])
  .range(["rgba(0, 0, 0, 0)", "steelblue"])
  .interpolate(interpolateLab);

const hexbin = d3hexbin().radius(15);

export default class Hexbins extends Component {
  state = {
    width,
    height,
    points
  };

  componentDidMount() {
    this.handle = window.setInterval(() => { this.updateHexbins(); }, 20);
  }

  componentWillUnmount() {
    window.clearInterval(this.handle);
  }

  updateHexbins() {
    theta += deltaTheta;
    randomX = randomNormal(width / 2 + 80 * Math.cos(theta), 80),
    randomY = randomNormal(height / 2 + 80 * Math.sin(theta), 80);

    for (let j = 0; j < k; ++j) {
      i = (i + 1) % n;
      points[i][0] = randomX();
      points[i][1] = randomY();
    }

    this.setState({ points });
  }

  render() {
    const hexagons = hexbin(this.state.points).map((point, key) => (
      <Path
        d={hexbin.hexagon(14.5)}
        x={point.x}
        y={point.y}
        fill={color(point.length)}
        key={key}
      />
    ));

    return (
      <View
        style={{ flex: 1 }}
        onLayout={({ nativeEvent: { layout: { width, height } } }) => this.setState({ width, height })}
      >
        <Svg width={this.state.width} height={this.state.height}>
          <G>
            {hexagons}
          </G>
        </Svg>
      </View>
    );
  }
}
