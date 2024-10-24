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

import {object, Schema} from 'yup';
import {Models, ObjectFields, SearchFields, SortFields} from '../../app/Module';
import {CriteriaField, CriteriaGroup} from '../Model';
import {checkNullString} from '../../utils/string';

class ObjectFieldsProvider {
  private objectFields: ObjectFields;
  private searchFields: SearchFields;
  private sortFields: SortFields;

  constructor() {
    this.objectFields = {};
    this.searchFields = {};
    this.sortFields = {};
  }

  init(models: Models) {
    this.objectFields = models.objectFields;
    this.searchFields = models.searchFields;
    this.sortFields = models.sortFields;
  }

  getObjectSchema(objectKey: string): Schema {
    const registeredObjects = Object.keys(this.objectFields);

    if (registeredObjects.includes(objectKey)) {
      return this.objectFields[objectKey];
    }

    return object({});
  }

  getObjectFields(objectKey: string): string[] {
    const objectSchema: any = this.getObjectSchema(objectKey);

    if (Object.keys(objectSchema)?.length > 0) {
      return objectSchema._nodes;
    }

    return [];
  }

  getSortFields(objectKey: string): string[] {
    const registeredObjects = Object.keys(this.sortFields);

    if (registeredObjects.includes(objectKey)) {
      return this.sortFields[objectKey];
    }

    return ['id'];
  }

  getSearchFields(objectKey: string): string[] {
    const registeredObjects = Object.keys(this.searchFields);

    if (registeredObjects.includes(objectKey)) {
      return this.searchFields[objectKey];
    }

    return [];
  }

  getSearchCriterias(objectKey: string, searchValue: string): CriteriaGroup {
    const searchFields: string[] = this.getSearchFields(objectKey);

    let criteria: CriteriaField[] = [];

    if (searchFields.length > 0 && !checkNullString(searchValue)) {
      criteria = searchFields.map(_searchField => ({
        fieldName: _searchField,
        operator: 'like',
        value: searchValue,
      }));
    }

    return {operator: 'or', criteria: criteria};
  }
}

export const objectFieldsProvider = new ObjectFieldsProvider();

export function getObjectFields(objectKey: string): string[] {
  return objectFieldsProvider.getObjectFields(objectKey);
}

export function getSortFields(objectKey: string): string[] {
  return objectFieldsProvider.getSortFields(objectKey);
}

export function getSearchCriterias(
  objectKey: string,
  searchValue: string,
): CriteriaGroup {
  return objectFieldsProvider.getSearchCriterias(objectKey, searchValue);
}
