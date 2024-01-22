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

import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, ProgressBar, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {useTranslator, useDispatch} from '@axelor/aos-mobile-core';
import {DateDisplay} from '../atoms';
import {ControlEntry} from '../../types';
import {searchControlEntrySampleApi} from '../../api';

interface ControlEntryCardProps {
  style?: any;
  onPress?: () => void;
  sampleCount?: number;
  entryDateTime?: string;
  statusSelect?: number;
  name?: string;
  controlEntryId?: number;
}
const ControlEntryCard = ({
  style,
  onPress,
  sampleCount,
  entryDateTime,
  statusSelect,
  name,
  controlEntryId,
}: ControlEntryCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const [controlEntrySampleList, setControlEntrySampleList] = useState([]);

  useEffect(() => {
    searchControlEntrySampleApi({controlEntryId: controlEntryId}).then(
      response => {
        setControlEntrySampleList(response?.data?.data);
      },
    );
  }, [controlEntryId, dispatch]);

  const numberSampledFilled = useMemo(() => {
    if (controlEntrySampleList != null && controlEntrySampleList?.length > 0) {
      let total = controlEntrySampleList?.length;
      let notControlled = 0;
      controlEntrySampleList?.forEach(sample => {
        if (sample?.resultSelect === ControlEntry?.sampleResult.NotControlled) {
          notControlled++;
        }
      });
      return 100 - (notControlled / total) * 100;
    }
    return 0;
  }, [controlEntrySampleList]);

  const borderStyle = useMemo(() => {
    return getStyles(
      ControlEntry.getStatusColor(statusSelect, Colors)?.background,
    )?.border;
  }, [Colors, statusSelect]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, borderStyle, style]}>
        <View style={styles.childrenContainer}>
          <Text style={styles.flex} writingType="title">
            {name}
          </Text>
          <DateDisplay date={entryDateTime} />
        </View>
        <View style={styles.childrenContainer}>
          <Text style={styles.flex}>{`${I18n.t(
            'Quality_Sample',
          )} : ${sampleCount}`}</Text>
          <ProgressBar
            style={styles.progressBar}
            value={numberSampledFilled}
            showPercent={false}
            height={15}
            styleTxt={styles.textProgressBar}
          />
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const getStyles = color =>
  StyleSheet.create({
    border: {
      borderLeftWidth: 7,
      borderLeftColor: color,
    },
  });

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginHorizontal: 12,
    marginVertical: 4,
    paddingHorizontal: 15,
    paddingRight: 15,
    paddingVertical: 10,
  },
  childrenContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  flex: {
    flex: 1,
  },
  progressBar: {
    borderRadius: 20,
    width: '40%',
  },
  textProgressBar: {
    display: 'none',
  },
});

export default ControlEntryCard;
