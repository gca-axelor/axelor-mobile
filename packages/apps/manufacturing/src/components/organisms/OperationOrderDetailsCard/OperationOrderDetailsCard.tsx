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

import React, {useMemo} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {
  Badge,
  Card,
  Icon,
  Text,
  LabelText,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {formatDuration, useTranslator} from '@axelor/aos-mobile-core';
import OperationOrder from '../../../types/operation-order';

interface OperationOrderCardProps {
  style?: any;
  status: number;
  manufOrder: string;
  operationName: string;
  workcenter?: string;
  machine?: string;
  plannedStartDate?: string;
  plannedEndDate?: string;
  realStartDate?: string;
  realEndDate?: string;
  plannedDuration?: string;
  priority: number;
  onPress: (any?: any) => void;
}

const OperationOrderDetailsCard = ({
  style,
  status,
  manufOrder,
  operationName,
  workcenter,
  machine,
  plannedStartDate,
  plannedEndDate,
  realStartDate,
  realEndDate,
  plannedDuration,
  priority,
  onPress,
}: OperationOrderCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const borderStyle = useMemo(() => {
    return getStyles(OperationOrder.getStatusColor(status, Colors).background)
      ?.border;
  }, [Colors, status]);

  const [startDate, endDate] = OperationOrder.getDates(
    status,
    plannedStartDate,
    plannedEndDate,
    realStartDate,
    realEndDate,
    I18n,
  );

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, borderStyle, style]}>
        <View style={styles.textContainer}>
          <Text style={styles.txtImportant}>{manufOrder}</Text>
          <Text style={styles.txtDetails}>{operationName}</Text>
          <LabelText
            iconName="pallet"
            title={workcenter + ' ' + (machine ? `- ${machine}` : '')}
          />
          {startDate && (
            <Text
              style={
                styles.txtDetails
              }>{`${startDate.title} ${startDate.value}`}</Text>
          )}
          {status !== OperationOrder.status.InProgress &&
            status !== OperationOrder.status.StandBy &&
            endDate && (
              <Text
                style={
                  styles.txtDetails
                }>{`${endDate.title} ${endDate.value}`}</Text>
            )}
          {(status === OperationOrder.status.InProgress ||
            status === OperationOrder.status.StandBy) && (
            <LabelText
              iconName="stopwatch"
              title={`${
                plannedDuration ? formatDuration(plannedDuration) : ''
              }`}
            />
          )}
        </View>
        <View style={styles.rightContainer}>
          {priority == null ? null : (
            <Badge
              color={Colors.priorityColor}
              title={priority.toString()}
              style={styles.badge}
            />
          )}
          <Icon
            name="chevron-right"
            color={Colors.secondaryColor.background_light}
            size={20}
          />
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const getStyles = color =>
  StyleSheet.create({
    border: {borderLeftWidth: 7, borderLeftColor: color},
  });

const styles = StyleSheet.create({
  rightContainer: {
    width: '10%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
  },
  textContainer: {
    width: '90%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginRight: 5,
  },
  txtImportant: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  txtDetails: {
    fontSize: 14,
    justifyContent: 'center',
  },
  badge: {
    borderRadius: 50,
    width: 35,
    height: 35,
    marginBottom: 10,
  },
});

export default OperationOrderDetailsCard;
