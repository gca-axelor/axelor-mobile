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
import {ToggleSwitch} from '../../src/components/molecules';

storiesOf('ui/molecules/ToggleSwitch', module).add(
  'Default',
  args => {
    return (
      <View style={styles.container}>
        <ToggleSwitch
          leftTitle=""
          rightTitle=""
          onSwitch={console.log}
          {...args}
        />
      </View>
    );
  },
  {
    argTypes: {
      leftTitle: {
        type: 'string',
        defaultValue: 'leftTitle',
        control: {type: 'text'},
      },
      rightTitle: {
        type: 'string',
        defaultValue: 'rightTitle',
        control: {type: 'text'},
      },
      styleContainer: {
        control: {
          type: 'object',
        },
        defaultValue: {
          marginHorizontal: 0,
        },
      },
      styleToogle: {
        control: {
          type: 'object',
        },
        defaultValue: {
          marginHorizontal: 0,
        },
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
