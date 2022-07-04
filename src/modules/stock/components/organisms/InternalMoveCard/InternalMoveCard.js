import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, Icon, Text} from '@/components/atoms';
import {Badge} from '@/components/molecules';
import {formatDate} from '@/modules/stock/utils/formatters';
import StockMove from '@/modules/stock/types/stock-move';
import {ColorHook} from '@/themeStore';

const InternalMoveCard = ({
  style,
  name,
  status,
  availability,
  fromStockLocation,
  toStockLocation,
  origin,
  date,
  onPress,
}) => {
  const Colors = ColorHook();
  const borderStyle = useMemo(() => {
    return getStyles(StockMove.getStatusColor(status, Colors).borderColor);
  }, [Colors, status]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, borderStyle, style]}>
        <View style={styles.textContainer}>
          <Text style={styles.txtImportant}>{name}</Text>
          <Text style={styles.txtDetails}>{fromStockLocation}</Text>
          <Text style={styles.txtDetails}>{toStockLocation}</Text>
          {origin != null && (
            <View style={styles.origin}>
              <Icon name="tag" size={12} style={styles.icon} />
              <Text style={styles.txtDetails}>{origin}</Text>
            </View>
          )}
          {status === 'Draft' ? (
            <Text style={[styles.txtDetails, styles.date]}>
              Created on {formatDate(date, 'MM/DD/YYYY')}
            </Text>
          ) : status === 'Planned' ? (
            <Text style={[styles.txtDetails, styles.date]}>
              Planned for {formatDate(date, 'MM/DD/YYYY')}
            </Text>
          ) : (
            <Text style={styles.txtDetails}>
              Validated on {formatDate(date, 'MM/DD/YYYY')}
            </Text>
          )}
        </View>
        <View style={styles.rightContainer}>
          {availability == null || availability === '' ? null : (
            <Badge
              color={
                StockMove.getAvailabilityColor(availability, Colors)
                  .backgroundColor
              }
              title={availability}
            />
          )}
          <Icon
            name="chevron-right"
            color={Colors.secondaryColor_light}
            size={20}
          />
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const getStyles = color =>
  StyleSheet.create({
    borderLeftWidth: 7,
    borderLeftColor: color,
  });

const styles = StyleSheet.create({
  rightContainer: {
    width: '20%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
  },
  textContainer: {
    width: '80%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  txtImportant: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  txtDetails: {
    fontSize: 14,
  },
  creationDate: {
    fontStyle: 'italic',
  },
  origin: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 5,
  },
});

export default InternalMoveCard;
