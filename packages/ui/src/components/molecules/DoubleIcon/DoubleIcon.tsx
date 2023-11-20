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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon} from '../../atoms';

const predefinedPositions = {
  left: {left: -10},
  top: {top: -10},
  right: {right: -10},
  bottom: {bottom: -10},
  'bottom-right': {bottom: -10, right: -10},
  'bottom-left': {bottom: -7, left: -10},
  'top-left': {top: -10, left: -10},
  'top-right': {top: -10, right: -10},
};

interface BottomIconConfig {
  name: string;
  color?: string;
  size?: number;
  touchable?: boolean;
  onPress?: () => void;
  FontAwesome5?: boolean;
}

interface TopIconConfig {
  name: string;
  color?: string;
  size?: number;
  touchable?: boolean;
  onPress?: () => void;
  FontAwesome5?: boolean;
}

interface DoubleIconProps {
  topIconConfig: TopIconConfig;
  bottomIconConfig: BottomIconConfig;
  color?: string;
  size?: number;
  predefinedPosition?: keyof typeof predefinedPositions;
  topIconPosition?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
}

const DoubleIcon = ({
  topIconConfig,
  bottomIconConfig,
  topIconPosition = {},
  size = 18,
  predefinedPosition,
}: DoubleIconProps) => {
  const topIconStyle = predefinedPositions[predefinedPosition];
  return (
    <View style={styles.container}>
      <Icon
        {...bottomIconConfig}
        size={bottomIconConfig?.size != null ? bottomIconConfig?.size : size}
      />
      <View style={[styles.topIcon, topIconStyle, topIconPosition]}>
        <Icon
          {...topIconConfig}
          size={topIconConfig?.size != null ? topIconConfig?.size : size * 0.6}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  topIcon: {
    position: 'absolute',
  },
});

export default DoubleIcon;
