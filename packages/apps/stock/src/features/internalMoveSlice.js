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

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {checkNullString, handlerApiCall} from '@axelor/aos-mobile-core';
import {
  fetchInternalMove as _fetchInternalMove,
  searchInternalMoveFilter,
  createInternalStockMove,
  realizeInternalMove as _realizeInternalMove,
  modifyInternalMoveNotes,
} from '../api/internal-move-api';

export const searchInternalMoves = createAsyncThunk(
  'internalMove/searchInternalMoves',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchInternalMoveFilter,
      data,
      action: 'filter internal moves',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchInternalMove = createAsyncThunk(
  'internalMove/fetchInternalMove',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchInternalMove,
      data,
      action: 'fetch internal moves',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const createInternalMove = createAsyncThunk(
  'internalMove/createInternalMove',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: createInternalStockMove,
      data,
      action: 'create internal move',
      getState,
      responseOptions: {showToast: true, isArrayResponse: false},
    }).then(res => {
      if (checkNullString(data.notes)) {
        return res;
      }

      return handlerApiCall({
        fetchFunction: modifyInternalMoveNotes,
        data: {
          internalMoveId: res,
          notes: data.notes,
          version: res.version,
        },
        action: 'modify internal move notes',
        getState,
        responseOptions: {showToast: false},
      });
    });
  },
);

export const realizeInternalMove = createAsyncThunk(
  'internalMove/realizeInternalMove',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _realizeInternalMove,
      data,
      action: 'realize internal move',
      getState,
      responseOptions: {showToast: true},
    });
  },
);

const initialState = {
  loadingInternalMove: false,
  moreLoading: false,
  isListEnd: false,
  internalMoveList: [],
  internalMove: null,
};

const internalMoveSlice = createSlice({
  name: 'internalMove',
  initialState,
  extraReducers: builder => {
    builder.addCase(searchInternalMoves.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loadingInternalMove = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(searchInternalMoves.fulfilled, (state, action) => {
      state.loadingInternalMove = false;
      state.moreLoading = false;
      if (action.meta.arg.page === 0) {
        state.internalMoveList = action.payload;
        state.isListEnd = false;
      } else {
        if (action.payload != null) {
          state.isListEnd = false;
          state.internalMoveList = [
            ...state.internalMoveList,
            ...action.payload,
          ];
        } else {
          state.isListEnd = true;
        }
      }
    });
    builder.addCase(fetchInternalMove.pending, state => {
      state.loadingInternalMove = true;
    });
    builder.addCase(fetchInternalMove.fulfilled, (state, action) => {
      state.loadingInternalMove = false;
      state.internalMove = action.payload;
    });
  },
});

export const internalMoveReducer = internalMoveSlice.reducer;
