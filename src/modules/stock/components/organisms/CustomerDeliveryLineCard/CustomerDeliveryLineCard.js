import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, Icon, Text} from '@/components/atoms';
import {Badge, LabelText} from '@/components/molecules';
import StockMove from '@/modules/stock/types/stock-move';
import {checkNullString} from '@/modules/stock/utils/strings';
import {ColorHook} from '@/themeStore';

const CustomerDeliveryLineCard = ({
  style,
  productName,
  askedQty,
  pickedQty,
  locker,
  availability,
  trackingNumber,
  onPress,
}) => {
  const Colors = ColorHook();
  const borderStyle = useMemo(() => {
    if (parseFloat(pickedQty) === 0) {
      return null;
    } else if (parseFloat(askedQty) === parseFloat(pickedQty)) {
      return getStyles(Colors.primaryColor);
    } else {
      return getStyles(Colors.cautionColor);
    }
  }, [askedQty, pickedQty, Colors]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, borderStyle, style]}>
        <View style={styles.leftContainer}>
          <Text style={styles.txtImportant}>{productName}</Text>
          {availability != null && (
            <Badge
              style={styles.badgeContainer}
              color={
                StockMove.getAvailabilityColor(availability, Colors)
                  .backgroundColor
              }
              title={availability}
            />
          )}
          <LabelText
            title="Asked quantity :"
            value={parseFloat(askedQty).toFixed(2)}
          />
          <LabelText
            title="Picked quantity :"
            value={parseFloat(pickedQty).toFixed(2)}
          />
          {checkNullString(locker) === false && (
            <LabelText
              title="Locker :"
              value={locker}
              iconName="map-marker-alt"
            />
          )}
          {trackingNumber != null && (
            <LabelText
              title="Tracking number :"
              value={trackingNumber?.trackingNumberSeq}
              iconName="qrcode"
              FontAwesome5={false}
            />
          )}
        </View>
        <Icon
          name="chevron-right"
          color={Colors.secondaryColor_light}
          size={20}
        />
      </Card>
    </TouchableOpacity>
  );
};

const getStyles = color =>
  StyleSheet.create({
    borderWidth: 1.5,
    borderColor: color,
  });

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: '2%',
    paddingRight: 8,
  },
  leftContainer: {
    width: '90%',
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: '1%',
  },
  txtImportant: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rightContainer: {
    width: '30%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  badgeContainer: {
    marginLeft: 10,
  },
});

export default CustomerDeliveryLineCard;
