import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Card, Icon, Text} from '@/components/atoms';

const CarrierCard = ({style, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, style]}>
        <Icon name="truck" />
        <Text style={styles.text}>CARRIER</Text>
        <Icon name="chevron-right" />
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  text: {
    marginHorizontal: '5%',
  },
});

export default CarrierCard;
