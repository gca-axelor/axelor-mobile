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

import {ObjectFields, schemaContructor} from '@axelor/aos-mobile-core';

export const intervention_modelAPI: ObjectFields = {
  intervention_intervention: schemaContructor.object({
    statusSelect: schemaContructor.number(),
    deliveredPartner: schemaContructor.subObject().concat(
      schemaContructor.object({
        fullName: schemaContructor.string(),
        picture: schemaContructor.subObject(),
      }),
    ),
    sequence: schemaContructor.string(),
    planifStartDateTime: schemaContructor.string(),
    interventionType: schemaContructor.subObject().concat(
      schemaContructor.object({
        name: schemaContructor.string(),
      }),
    ),
    address: schemaContructor.subObject().concat(
      schemaContructor.object({
        fullName: schemaContructor.string(),
      }),
    ),
    assignedTo: schemaContructor.subObject(),
    contact: schemaContructor.subObject().concat(
      schemaContructor.object({
        mobilePhone: schemaContructor.string(),
        fixedPhone: schemaContructor.string(),
      }),
    ),
    intervention_equipment: schemaContructor.object({
      sequence: schemaContructor.string(),
      name: schemaContructor.string(),
      code: schemaContructor.string(),
      inService: schemaContructor.boolean(),
      equipmentFamily: schemaContructor.subObject(),
    }),
  }),
};
