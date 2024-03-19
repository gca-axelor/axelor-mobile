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

import React, {useMemo} from 'react';
import {Picker} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
import {Equipment} from '../../../types';

const TypePicker = ({
  title = 'Intervention_Type',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
}) => {
  const I18n = useTranslator();

  const equipmentTypeList = useMemo(() => Equipment.generateTypeList(), []);

  return (
    <Picker
      title={I18n.t(title)}
      defaultValue={defaultValue}
      listItems={equipmentTypeList}
      labelField="label"
      valueField="value"
      emptyValue={false}
      onValueChange={onChange}
      required={required}
      readonly={readonly}
    />
  );
};

export default TypePicker;