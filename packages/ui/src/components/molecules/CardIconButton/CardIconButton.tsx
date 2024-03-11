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

import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Card, Icon} from '../../atoms';

interface CardIconButtonProps {
  style?: any;
  iconName: string;
  iconColor: string;
  onPress: (any) => void;
  onLongPress?: (any) => void;
}

const CardIconButton = ({
  style,
  iconName,
  iconColor,
  onPress = () => {},
  onLongPress = () => {},
}: CardIconButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onLongPress={onLongPress}
      onPress={onPress}
      activeOpacity={0.9}>
      <Card style={styles.cardContainer}>
        <Icon size={20} name={iconName} color={iconColor} />
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 2,
  },
  cardContainer: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingRight: 10,
    paddingVertical: 10,
  },
});

export default CardIconButton;
