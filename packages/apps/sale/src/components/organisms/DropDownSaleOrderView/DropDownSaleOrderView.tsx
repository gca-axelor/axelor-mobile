/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React, {useCallback, useEffect, useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  isEmpty,
  useNavigation,
  useSelector,
  useTranslator,
  getLastItem,
  useTypes,
  useDispatch,
  useIsFocused,
} from '@axelor/aos-mobile-core';
import {SaleOrderCard} from '../../atoms';
import {fetchSaleOrder} from '../../../features/saleOrderSlice';

const DropDownSaleOrderView = ({customer}) => {
  const I18n = useTranslator();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const Colors = useThemeColor();
  const isFocused = useIsFocused();

  const {SaleOrder} = useTypes();

  const {saleOrderList} = useSelector(state => state.sale_saleOrder);

  useEffect(() => {
    if (isFocused) {
      dispatch((fetchSaleOrder as any)({customerId: customer?.id}));
    }
  }, [customer, dispatch, isFocused]);

  const _saleOderList = useMemo(() => {
    return saleOrderList.filter(
      saleOrder =>
        saleOrder?.statusSelect === SaleOrder?.statusSelect.Confirmed ||
        saleOrder?.statusSelect === SaleOrder?.statusSelect.Completed,
    );
  }, [
    SaleOrder?.statusSelect.Completed,
    SaleOrder?.statusSelect.Confirmed,
    saleOrderList,
  ]);

  const quotationList = useMemo(() => {
    return saleOrderList.filter(
      saleOrder =>
        saleOrder?.statusSelect === SaleOrder?.statusSelect.Draft ||
        saleOrder?.statusSelect === SaleOrder?.statusSelect.Finalized,
    );
  }, [
    SaleOrder?.statusSelect.Draft,
    SaleOrder?.statusSelect.Finalized,
    saleOrderList,
  ]);

  const lastOrderList = useMemo(() => {
    return getLastItem(_saleOderList, 'creationDate');
  }, [_saleOderList]);

  const lasQuotationList = useMemo(() => {
    return getLastItem(quotationList, 'creationDate');
  }, [quotationList]);

  const SeeMoreIcon = useCallback(
    screen => {
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(screen, {customer: customer});
          }}
          activeOpacity={0.9}>
          <View style={styles.iconContainer}>
            <Text style={styles.txtDetails}>{I18n.t('Base_ViewAll')}</Text>
            <Icon
              name="chevron-right"
              color={Colors.secondaryColor.background_light}
              size={20}
            />
          </View>
        </TouchableOpacity>
      );
    },
    [Colors.secondaryColor.background_light, I18n, customer, navigation],
  );

  if (isEmpty(lastOrderList) && isEmpty(lasQuotationList)) {
    return (
      <View>
        <Text>{I18n.t('Sale_NoOrderSaleorQutotation')}</Text>
      </View>
    );
  }

  return (
    <View>
      {!isEmpty(lasQuotationList) && lasQuotationList != null && (
        <>
          <Text>{I18n.t('Sale_LastQuotation')}</Text>
          <SaleOrderCard
            statusSelect={lasQuotationList.statusSelect}
            sequence={lasQuotationList.saleOrderSeq}
            orderBeingEdited={lasQuotationList.orderBeingEdited}
            externalReference={lasQuotationList.externalReference}
            clientPartnerName={lasQuotationList.clientPartner?.fullName}
            companyName={lasQuotationList.company?.name}
            tradingName={lasQuotationList.tradingName?.name}
            orderDate={lasQuotationList.orderDate}
            WTPrice={lasQuotationList.exTaxTotal}
            ATIPrice={lasQuotationList.inTaxTotal}
            currencySymbol={lasQuotationList.currency?.symbol}
            deliveryState={lasQuotationList.deliveryState}
            invoicingState={lasQuotationList.invoicingState}
            onPress={() =>
              navigation.navigate('SaleOrderDetailsScreen', {
                saleOrderId: lasQuotationList.id,
              })
            }
          />
          {SeeMoreIcon('SaleQuotationsScreen')}
        </>
      )}
      {!isEmpty(lastOrderList) && lastOrderList != null && (
        <>
          <Text>{I18n.t('Sale_LastOrder')}</Text>
          <SaleOrderCard
            statusSelect={lastOrderList.statusSelect}
            sequence={lastOrderList.saleOrderSeq}
            orderBeingEdited={lastOrderList.orderBeingEdited}
            externalReference={lastOrderList.externalReference}
            clientPartnerName={lastOrderList.clientPartner?.fullName}
            companyName={lastOrderList.company?.name}
            tradingName={lastOrderList.tradingName?.name}
            orderDate={lastOrderList.orderDate}
            WTPrice={lastOrderList.exTaxTotal}
            ATIPrice={lastOrderList.inTaxTotal}
            currencySymbol={lastOrderList.currency?.symbol}
            deliveryState={lastOrderList.deliveryState}
            invoicingState={lastOrderList.invoicingState}
            onPress={() =>
              navigation.navigate('SaleOrderDetailsScreen', {
                saleOrderId: lastOrderList.id,
              })
            }
          />
          {SeeMoreIcon('SaleOrdersScreen')}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignContent: 'center',
    marginBottom: 2,
    elevation: 3,
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 0},
  },
  txtDetails: {
    fontSize: 14,
    marginHorizontal: 15,
  },
});

export default DropDownSaleOrderView;
