/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  useThemeColor,
  PopUp,
  Button,
  LabelText,
  Picker,
} from '@axelor/aos-mobile-ui';
import {useTranslator, useSelector} from '@axelor/aos-mobile-core';

interface ExpenseAddPopupProps {
  style?: any;
  visible: boolean;
  setAddPopuîsVisible: (isVisible: boolean) => void;
}
const ExpenseAddPopup = ({
  style,
  visible,
  setAddPopuîsVisible,
}: ExpenseAddPopupProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const [expenseSelected, setExpenseSelected] = useState(null);

  const {expenseDraftList} = useSelector((state: any) => state.expense);

  return (
    <PopUp style={[styles.popup, style]} visible={visible}>
      <View style={styles.container}>
        <View>
          <Picker
            listItems={expenseDraftList}
            onValueChange={setExpenseSelected}
            labelField="fullName"
            valueField="id"
            title={I18n.t('Hr_Expense')}
          />
        </View>
        <View style={styles.labelText}>
          <TouchableOpacity onPress={() => console.log('addExpense')}>
            <LabelText
              iconName="plus"
              color={Colors.primaryColor.background}
              title={I18n.t('Hr_NewExpense')}
              size={16}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title={I18n.t('Base_Cancel')}
            color={Colors.secondaryColor}
            style={styles.button}
            onPress={() => setAddPopuîsVisible(false)}
          />
          <Button
            title={I18n.t('Base_Add')}
            style={styles.button}
            onPress={() => console.log(expenseSelected)}
          />
        </View>
      </View>
    </PopUp>
  );
};
const styles = StyleSheet.create({
  popup: {
    width: '95%',
  },
  container: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
  },
  labelText: {
    alignSelf: 'flex-start',
    marginVertical: 5,
  },
  button: {
    width: '35%',
  },
});

export default ExpenseAddPopup;
