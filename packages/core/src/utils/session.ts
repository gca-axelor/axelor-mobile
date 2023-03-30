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

import {storage, Storage} from '../storage/Storage';

interface Session {
  id: string;
  url: string;
  username: string;
  isActive: true;
}

class SessionStorage {
  private key: string;

  constructor(private localStorage: Storage) {
    this.key = 'users';
    this.recrypt();
  }

  addSession({data}: {data: Session[]}) {
    this.localStorage.setItem(this.key, data);
  }
  getSession(): Session[] {
    const item = this.localStorage.getItem(this.key);
    return item;
  }
  getAllKeys() {
    return this.localStorage.getAllKeys();
  }
  recrypt() {
    this.localStorage.recrypt(this.key);
  }
}

export const sessionStorage = new SessionStorage(storage);
