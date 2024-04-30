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

import BuisnessProjectScreen from './BuisnessProjectScreen';
import ProjectScreen from './ProjectScreen';

export default {
  BuisnessProjectScreen: {
    title: 'project_buisnessProjects',
    component: BuisnessProjectScreen,
    options: {
      shadedHeader: false,
    },
  },
  ProjectScreen: {
    title: 'project_projects',
    component: ProjectScreen,
    options: {
      shadedHeader: false,
    },
  },
};

export {ProjectScreen};
