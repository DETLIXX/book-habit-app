import {ClockComponent} from '@/components/ClockComponent';
import {HeaderTextComponent} from '@/components/HeaderTextComponent';
import {Colors} from '@/constants/Colors';
import React from 'react';
import {SafeAreaView} from 'react-native';

export type IndexProp = {};

const index: React.FC<IndexProp> = ({}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.background}}>
      <HeaderTextComponent />
      <ClockComponent />
    </SafeAreaView>
  );
};

export default index;
