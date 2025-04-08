import React, {useEffect, useRef, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {Colors} from '@/constants/Colors';
import AnalogClockTimer from '@/components/AnalogClockTimer';

dayjs.extend(duration);

export type IClockComponentProps = {};

const ClockComponent: React.FC<IClockComponentProps> = ({}) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number | undefined>(0);

  const startTimeRef = useRef<number>();
  const intrvalRef = useRef();

  useEffect(() => {
    console.log({
      elapsedTime,
      startTime,
      isRunning,
      startTimeRef: startTimeRef.current,
    });
  }, [elapsedTime, startTime, isRunning]);

  const handleToggle = () => {
    let interval;
    setIsRunning((prev) => (prev = !prev));

    if (isRunning) {
      console.log('Ending timer');

      setIsRunning(false);
      clearInterval(intrvalRef.current);
    } else {
      console.log('Starting timer');
      const now = Date.now();
      startTimeRef.current = now;
      setStartTime(now);
      intrvalRef.current = setInterval(() => {
        if (startTimeRef.current) {
          setElapsedTime(Date.now() - startTimeRef.current);
        }
      }, 1000);
    }
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <TouchableOpacity onPress={handleToggle}>
        <AnalogClockTimer elapsed={elapsedTime} />
      </TouchableOpacity>
    </View>
  );
};

export {ClockComponent};
