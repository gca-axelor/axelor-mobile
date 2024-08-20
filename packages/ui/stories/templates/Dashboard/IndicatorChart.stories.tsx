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
import type {StoryObj, Meta} from '@storybook/react';
import {IndicatorChart as Component} from '../../../src/components';
import {disabledControl} from '../../utils/control-type.helpers';

const multipleDatasets = [
  {
    title: 'Revenue',
    value: 150000,
    unit: '€',
    icon: 'dollar-sign',
    color: 'green',
  },
  {
    title: 'Expenses',
    value: 50000,
    unit: '€',
    icon: 'dollar-sign',
    color: 'red',
  },
  {
    title: 'Profit',
    value: 100000,
    unit: '€',
    icon: 'dollar-sign',
    color: 'blue',
  },
];

const singleDataset = [
  {
    title: 'Revenue',
    value: 150000,
    unit: '€',
    icon: 'dollar-sign',
    color: 'green',
  },
];

const meta: Meta<typeof Component> = {
  title: 'ui/templates/Dashboard/IndicatorChart',
  component: Component,
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Component>;

export const MultipleIndicators: Story = {
  args: {
    title: 'Financial Overview',
    widthGraph: undefined,
    hideCardBackground: false,
  },
  argTypes: {datasets: disabledControl},
  render: args => <Component datasets={multipleDatasets} {...args} />,
};

export const SingleIndicator: Story = {
  args: {
    title: 'Single Indicator',
    widthGraph: undefined,
    hideCardBackground: false,
  },
  argTypes: {datasets: disabledControl},
  render: args => <Component datasets={singleDataset} {...args} />,
};