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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Alert, Icon, LabelText} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {CustomerSearchBar} from '../../organisms';
import {updateCart} from '../../../features/cartSlice';
import {CompanyPicker} from '../../templates';

interface CartHeaderProps {
  style?: any;
}

const CartHeader = ({style}: CartHeaderProps) => {
  const dispatch = useDispatch();
  const I18n = useTranslator();

  const {activeCart} = useSelector((state: any) => state.sale_cart);
  const {userId} = useSelector((state: any) => state.auth);
  const {user} = useSelector((state: any) => state.user);

  const [popupIsVisible, setPopupIsVisible] = useState(false);
  const [company, setCompany] = useState();

  useEffect(() => {
    setCompany(activeCart?.company);
  }, [activeCart?.company]);

  const isMultipleCompany = useMemo(() => {
    return user?.companySet?.length > 1;
  }, [user?.companySet]);

  const handleChangeCustomer = useCallback(
    newCustomer => {
      dispatch(
        (updateCart as any)({
          newCompanyId: activeCart?.company?.id,
          partnerId: newCustomer?.id,
          cartId: activeCart?.id,
          cartVersion: activeCart?.version,
          userId,
        }),
      );
    },
    [
      activeCart?.company?.id,
      activeCart?.id,
      activeCart?.version,
      dispatch,
      userId,
    ],
  );

  const handleChangeCompany = useCallback(
    newCompany => {
      dispatch(
        (updateCart as any)({
          partnerId: activeCart?.partner?.id,
          newCompanyId: newCompany?.id,
          cartId: activeCart?.id,
          cartVersion: activeCart?.version,
          userId,
        }),
      );
    },
    [
      activeCart?.id,
      activeCart?.partner?.id,
      activeCart?.version,
      dispatch,
      userId,
    ],
  );

  return (
    <View style={style}>
      <View style={styles.row}>
        <LabelText
          style={styles.label}
          iconName="building"
          size={16}
          title={activeCart?.company?.name}
        />
        {isMultipleCompany && (
          <Icon
            size={16}
            name="pencil-fill"
            touchable
            onPress={() => {
              setPopupIsVisible(true);
            }}
          />
        )}
      </View>
      <CustomerSearchBar
        onChange={handleChangeCustomer}
        defaultValue={activeCart?.partner}
        companyId={activeCart?.company?.id}
      />
      <Alert
        title={I18n.t('User_Company')}
        visible={popupIsVisible}
        translator={I18n.t}
        confirmButtonConfig={{
          onPress: () => {
            handleChangeCompany(company);
            setPopupIsVisible(false);
          },
        }}
        cancelButtonConfig={{
          onPress: () => {
            setPopupIsVisible(false);
          },
        }}>
        <CompanyPicker setCompany={setCompany} company={company} />
      </Alert>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginLeft: 24,
    marginRight: 5,
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CartHeader;
