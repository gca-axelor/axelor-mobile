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
import {Increment} from '../../src/components/molecules';

storiesOf('ui/molecules/Increment', module)
  .addDecorator(story => <View style={styles.decorator}>{story()}</View>)
  .add(
    'default',
    args => {
      return <Increment {...args} value="" onValueChange={() => {}} />;
    },
    {
      argTypes: {
        value: {
          control: {
            type: 'text',
          },
        },
        decimalSpacer: {
          control: {
            type: 'text',
          },
        },
        thousandSpacer: {
          control: {
            type: 'text',
          },
        },
        style: {
          control: {
            type: 'object',
          },
          defaultValue: {},
        },
        inputStyle: {
          control: {
            type: 'object',
          },
          defaultValue: {},
        },
        readonly: {
          control: {
            type: 'boolean',
          },
          defaultValue: false,
        },
        defaultFormatting: {
          control: {
            type: 'boolean',
          },
          defaultValue: true,
        },
        stepSize: {
          control: {
            type: 'number',
          },
          defaultValue: 1,
        },
        minValue: {
          control: {
            type: 'number',
          },
          defaultValue: 0,
        },
        maxValue: {
          control: {
            type: 'number',
          },
          defaultValue: null,
        },
        isBigButton: {
          control: {
            type: 'boolean',
          },
          defaultValue: false,
        },
        scale: {
          control: {
            type: 'number',
          },
          defaultValue: null,
        },
      },
    },
  );

const styles = StyleSheet.create({
  decorator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
