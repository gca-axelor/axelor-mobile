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

import React, {useMemo} from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import {BarChart as RNBarChart} from 'react-native-gifted-charts';
import {useThemeColor} from '../../../../theme';
import {Card, Text} from '../../../atoms';
import {checkNullString} from '../../../../utils';
import {Data} from '../dashboard.helper';
import {initBarData} from './chart.helper';

const MARGIN = 5;

interface IndicatorChartProps {
  style?: any;
  widthGraph?: any;
  datasets: Data[][];
  title?: string;
  hideCardBackground?: boolean;
}

const IndicatorChart = ({
  style,
  widthGraph = Dimensions.get('window').width * 0.6,
  datasets,
  title,
  hideCardBackground = false,
}: IndicatorChartProps) => {
  const Container = hideCardBackground ? View : Card;

  return (
    <Container
      style={[styles.container, {width: widthGraph - MARGIN * 2}, style]}>
      <Text>Test</Text>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth:
      Dimensions.get('window').width > 500
        ? Dimensions.get('window').width / 4 - MARGIN * 2
        : Dimensions.get('window').width / 2 - MARGIN * 2,
    margin: MARGIN,
    paddingHorizontal: 0,
    paddingRight: 5,
    paddingVertical: 10,
    overflow: 'hidden',
  },
  title: {
    alignSelf: 'center',
    textAlign: 'center',
  },
});

export default IndicatorChart;
