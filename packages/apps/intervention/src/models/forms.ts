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

import {FormConfigs} from '@axelor/aos-mobile-core';
import {ClientProspectSearchBar} from '../components';

export const intervention_formsRegister: FormConfigs = {
  intervention_equipment: {
    modelName: 'com.axelor.apps.intervention.db.Equipment',
    fields: {
      partner: {
        titleKey: 'Intervention_Customer',
        type: 'object',
        widget: 'custom',
        required: true,
        customComponent: ClientProspectSearchBar,
        options: {
          showTitle: true,
        },
      },
    },
  },
};
