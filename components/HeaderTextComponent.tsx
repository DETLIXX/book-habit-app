import {Colors} from '@/constants/Colors';
import React from 'react';
import {Text, View} from 'react-native';

export type IHeaderTextComponentProps = {};

const HeaderTextComponent: React.FC<IHeaderTextComponentProps> = ({}) => {
  return (
    <View style={{padding: 20, justifyContent: 'center'}}>
      <Text style={{fontSize: 24, color: Colors.text, fontFamily: 'JBM'}}>
        It's time to read
      </Text>
    </View>
  );
};

export {HeaderTextComponent};
