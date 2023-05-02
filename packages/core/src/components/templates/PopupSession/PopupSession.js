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
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Icon, PopUp, useThemeColor} from '@axelor/aos-mobile-ui';
import useTranslator from '../../../i18n/hooks/use-translator';
import {PasswordInput, UrlInput, UsernameInput} from '../../organisms';
import {useDispatch, useSelector} from 'react-redux';
import {
  useScanActivator,
  useScannerDeviceActivator,
} from '../../../hooks/use-scan-activator';
import {useScannerSelector} from '../../../features/scannerSlice';
import {login} from '../../../features/authSlice';
import {ErrorText, LoginButton} from '../../molecules';

const urlScanKey = 'login_url';

const PopupSession = ({
  popupIsOpen,
  setPopupIsOpen,
  showUrlInput,
  error,
  sessionActive,
}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {loading} = useSelector(state => state.auth);
  const {enable: onScanPress} = useScanActivator(urlScanKey);
  const {enable: enableScanner} = useScannerDeviceActivator(urlScanKey);
  const {isEnabled, scanKey} = useScannerSelector();

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const [url, setUrl] = useState(sessionActive?.url);
  const [username, setUsername] = useState(sessionActive?.username);
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (sessionActive != null) {
      setUrl(sessionActive.url);
      setUsername(sessionActive.username);
      setPassword('');
    }
  }, [sessionActive]);

  const onPressLogin = useCallback(() => {
    dispatch(login({url, username, password}));
  }, [dispatch, password, url, username]);

  return (
    <PopUp
      visible={popupIsOpen}
      title={I18n.t('Auth_Create_Session')}
      style={styles.popup}>
      <View style={styles.popupContainer}>
        <Icon
          name="times"
          size={20}
          touchable={true}
          onPress={() => setPopupIsOpen(false)}
          style={styles.closeIcon}
        />
        <View>{error && <ErrorText message={error.message} />}</View>

        {showUrlInput && (
          <UrlInput
            value={url}
            onChange={setUrl}
            readOnly={loading}
            onScanPress={onScanPress}
            onSelection={enableScanner}
            scanIconColor={
              isEnabled && scanKey === urlScanKey
                ? Colors.primaryColor.background
                : Colors.secondaryColor_dark.background
            }
            style={styles.input}
          />
        )}
        <UsernameInput
          value={username}
          onChange={setUsername}
          readOnly={loading}
          showScanIcon={!showUrlInput}
          onScanPress={onScanPress}
          onSelection={enableScanner}
          scanIconColor={
            isEnabled && scanKey === urlScanKey
              ? Colors.primaryColor.background
              : Colors.secondaryColor_dark.background
          }
          style={styles.input}
        />
        <PasswordInput
          value={password}
          onChange={setPassword}
          readOnly={loading}
          style={styles.input}
        />
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <LoginButton onPress={onPressLogin} disabled={loading} />
        )}
      </View>
    </PopUp>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    popupContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
    },
    closeIcon: {
      position: 'absolute',
      right: '-10%',
      top: '-10%',
    },
    popup: {
      width: '90%',
    },
    input: {width: '100%'},
  });

export default PopupSession;
