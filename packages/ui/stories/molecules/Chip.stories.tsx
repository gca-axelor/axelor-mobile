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
import {View, StyleSheet} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {Chip} from '../../src/components/molecules';
import {lightTheme} from '../../src/theme';

storiesOf('ui/molecules/Chip', module).add(
  'Default',
  args => {
    return (
      <View style={styles.container}>
        <Chip
          title="Press me"
          selected={false}
          onPress={console.log}
          selectedColor={lightTheme.colors.primaryColor}
          {...args}
        />
      </View>
    );
  },
  {
    argTypes: {
      title: {
        control: {
          type: 'text',
        },
        defaultValue: 'Chip Title',
      },
      selected: {
        control: {
          type: 'boolean',
        },
        defaultValue: false,
      },
      selectedColor: {
        options: Object.keys(lightTheme.colors),
        mapping: lightTheme.colors,
        control: {
          type: 'select',
          labels: {
            primary: 'Primary',
            caution: 'Caution',
          },
        },
      },
      onPress: {
        action: 'onPress',
      },
      width: {
        control: {
          type: 'range',
          min: 100,
          max: 500,
          step: 10,
        },
        defaultValue: 200,
      },
      marginHorizontal: {
        control: {
          type: 'range',
          min: 0,
          max: 50,
          step: 2,
        },
        defaultValue: 12,
      },
    },
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
