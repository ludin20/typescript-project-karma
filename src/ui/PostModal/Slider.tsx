import React from 'react';
import styled from 'styled-components';
import RCSlider from 'rc-slider';

import 'rc-slider/assets/index.css';

const Container = styled(RCSlider)`
  position: relative;

  .rc-slider-rail {
    background: #000;
  }

  .rc-slider-track,
  .rc-slider-handle {
    background: ${props => props.theme.green};
    border: none;
    box-shadow: none;
  }

  .rc-slider-handle {
    z-index: 8000;
  }

  &::after {
    content: '';
    width: 10px;
    height: 10px;
    background: #000;
    border-radius: 50%;

    position: absolute;
    z-index: 7000;
    top: 2px;
    right: -5px;
  }

  &::before {
    content: '';
    width: 10px;
    height: 10px;
    background: ${props => props.theme.green};
    border-radius: 50%;

    position: absolute;
    z-index: 7000;
    top: 2px;
    left: -5px;
  }
`;

interface Props {
  value: number;
  onChange(value: number): void;
}

const Slider: React.FC<Props> = ({ value, onChange }) => {
  return <Container min={5} max={1000} step={5} onChange={onChange} value={value} />;
};

export default Slider;
