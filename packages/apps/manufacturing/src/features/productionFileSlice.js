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
import {handlerApiCall} from '@axelor/aos-mobile-core';
import {searchProductionFile} from '../api/production-file-api';

export const fetchProductionFile = createAsyncThunk(
  'productionFile/fetchProductionFile',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchProductionFile,
      data: data,
      action: 'Manufacturing_Fetch_Production_File',
      getState: getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loading: false,
  moreLoading: false,
  isListEnd: false,
  productionFileList: [],
};

const productionFileSlice = createSlice({
  name: 'productionFile',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchProductionFile.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loading = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(fetchProductionFile.fulfilled, (state, action) => {
      state.loading = false;
      state.moreLoading = false;
      if (action.meta.arg.page === 0 || action.meta.arg.page == null) {
        state.productionFileList = action.payload;
        state.isListEnd = false;
      } else {
        if (action.payload != null) {
          state.isListEnd = false;
          state.productionFileList = [
            ...state.productionFileList,
            ...action.payload,
          ];
        } else {
          state.isListEnd = true;
        }
      }
    });
  },
});

export const productionFileReducer = productionFileSlice.reducer;
