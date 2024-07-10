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

export {
  fetchProjectStatus as fetchProjectStatusApi,
  fetchProjectById as fetchProjectByIdApi,
  previousProjectActivity as previousProjectActivityApi,
  searchProject as searchProjectApi,
  searchSubProject as searchSubProjectApi,
} from './project-api';
export {
  fetchProjectPriority as fetchProjectPriorityApi,
  fetchProjectTaskById as fetchProjectTaskByIdApi,
  fetchProjectTaskStatus as fetchProjectTaskStatusApi,
  searchProjectTask as searchProjectTaskApi,
} from './project-task-api';
export {fetchTimesheetLinesByTask as fetchTimesheetLinesByTaskApi} from './timesheet-lines-api';