import React from 'react';
import Svg, {Circle, Line, Text as SvgText} from 'react-native-svg';
import {View} from 'react-native';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {Colors} from '@/constants/Colors';

dayjs.extend(duration);

interface Props {
  size?: number;
  elapsed: number; // v milisekundách
  total?: number; // napr. 20 minút = 20 * 60 * 1000
}

const AnalogClockTimer: React.FC<Props> = ({
  size = 300,
  elapsed,
  total = 20 * 60 * 1000,
}) => {
  const center = size / 2;
  const radius = center - 16;

  const angle = (elapsed / total) * 360;
  const angleRad = (angle - 90) * (Math.PI / 180); // od 12h

  // ✅ Ručička mimo stredu (segment kruhu)
  const handInner = radius * 0.45; // za časom
  const handOuter = radius * 0.9; // po okraj

  const handInnerX = center + handInner * Math.cos(angleRad);
  const handInnerY = center + handInner * Math.sin(angleRad);
  const handOuterX = center + handOuter * Math.cos(angleRad);
  const handOuterY = center + handOuter * Math.sin(angleRad);

  // Tick čiarok
  const ticks = Array.from({length: 60});

  // Formátovaný čas
  const formatted = dayjs.duration(elapsed).format('HH:mm:ss');

  return (
    <View>
      <Svg width={size} height={size}>
        {/* Pozadie */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#2C2C2C"
          strokeWidth={6}
          fill="#1B1B1B"
        />

        {/* Tick značky */}
        {ticks.map((_, i) => {
          const tickAngle = (i * 6 - 90) * (Math.PI / 180);
          const outerX = center + radius * Math.cos(tickAngle);
          const outerY = center + radius * Math.sin(tickAngle);
          const innerX =
            center + (radius - (i % 5 === 0 ? 12 : 6)) * Math.cos(tickAngle);
          const innerY =
            center + (radius - (i % 5 === 0 ? 12 : 6)) * Math.sin(tickAngle);

          return (
            <Line
              key={i}
              x1={innerX}
              y1={innerY}
              x2={outerX}
              y2={outerY}
              stroke={i % 5 === 0 ? '#666' : '#3A3A3A'}
              strokeWidth={i % 5 === 0 ? 2.5 : 1}
            />
          );
        })}

        {/* ⏱ Ručička mimo stred */}
        <Line
          x1={handInnerX}
          y1={handInnerY}
          x2={handOuterX}
          y2={handOuterY}
          stroke={Colors.primary}
          strokeWidth={1}
          strokeLinecap="round"
        />

        {/* 🕒 Čas v strede */}
        <SvgText
          x={center}
          y={center + 10}
          fontSize={26}
          fontFamily="JBM"
          fill="#fff"
          textAnchor="middle"
        >
          {formatted}
        </SvgText>
        <SvgText
          x={center}
          y={center + 35}
          fontSize={15}
          fontFamily="JBM"
          opacity={0.5}
          fill={Colors.text}
          textAnchor="middle"
        >
          {elapsed ? 'Stop' : 'Start'}
        </SvgText>
      </Svg>
    </View>
  );
};

export default AnalogClockTimer;
