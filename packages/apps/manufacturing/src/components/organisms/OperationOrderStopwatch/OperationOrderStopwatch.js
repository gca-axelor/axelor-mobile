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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Label} from '@axelor/aos-mobile-ui';
import {
  useTranslator,
  Stopwatch,
  isEmpty,
  StopwatchType,
  useDispatch,
  useSelector,
} from '@axelor/aos-mobile-core';
import {OperationOrder} from '../../../types';
import {updateOperationOrder} from '../../../features/operationOrderSlice';
import {StyleSheet, View} from 'react-native';

const OperationOrderStopwatch = ({}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {operationOrder, updateMessage} = useSelector(
    state => state.operationOrder,
  );
  const {user} = useSelector(state => state.user);

  const [labelVisible, setLabelVisible] = useState(false);

  const {status: timerStatus, time} = useMemo(() => {
    if (!isEmpty(operationOrder)) {
      return OperationOrder.getTimerState(operationOrder, user?.id);
    }
    return {status: StopwatchType.status.Ready, time: 0};
  }, [operationOrder, user]);

  const updateStatus = useCallback(
    status => {
      dispatch(
        updateOperationOrder({
          operationOrderId: operationOrder?.id,
          version: operationOrder?.version,
          status,
        }),
      );
    },
    [dispatch, operationOrder],
  );

  useEffect(() => {
    setLabelVisible(updateMessage?.message != null);
  }, [updateMessage]);

  return (
    <View style={styles.container}>
      <Label
        style={styles.label}
        message={updateMessage?.message}
        type={updateMessage?.code !== 200 ? 'error' : 'info'}
        showClose={true}
        visible={labelVisible}
        onClose={() => setLabelVisible(false)}
      />
      <Stopwatch
        style={styles.timer}
        startTime={time}
        status={timerStatus}
        timerFormat={I18n.t('Stopwatch_TimerFormat')}
        onPlay={() => updateStatus(OperationOrder.status.InProgress)}
        onPause={() => updateStatus(OperationOrder.status.StandBy)}
        onStop={() => updateStatus(OperationOrder.status.Finished)}
        disableStop={
          timerStatus !== StopwatchType.status.InProgress &&
          timerStatus !== StopwatchType.status.Paused
        }
        hideCancel={true}
        useObjectStatus={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: '30%',
  },
  label: {
    width: '90%',
    marginLeft: 20,
  },
  timer: {
    marginVertical: 5,
  },
});

export default OperationOrderStopwatch;
