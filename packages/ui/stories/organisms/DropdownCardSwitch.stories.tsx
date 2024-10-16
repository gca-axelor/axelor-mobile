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
import {Text} from '../../src/components/atoms';
import {DropdownCardSwitch} from '../../src/components/organisms';

const dropdownItems = [
  {
    key: 1,
    title: 'Dropdown 1',
    childrenComp: <Text>Dropdown 1 Content</Text>,
  },
  {
    key: 2,
    title: 'Dropdown 2',
    childrenComp: <Text>Dropdown 2 Content</Text>,
  },
];

storiesOf('ui/organisms/DropdownCardSwitch', module)
  .addDecorator(story => <View style={styles.container}>{story()}</View>)
  .add(
    'default',
    args => <DropdownCardSwitch dropdownItems={dropdownItems} {...args} />,
    {
      argTypes: {
        style: {
          control: {
            type: 'object',
          },
          defaultValue: {
            marginHorizontal: 20,
          },
        },
        styleTitle: {
          control: {
            type: 'object',
          },
          defaultValue: {
            marginHorizontal: 20,
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
    marginLeft: '15%',
  },
});
