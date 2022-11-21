import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  fetchMailMessages,
  fetchModelSubscribers,
  postMailMessageComment,
  realAllMailMessages,
  readMailMessage,
  subscribeRequest,
  unsubscribeRequest,
  countUnreadMessages,
} from '../api/mail-message-api';
import {handlerApiCall} from '../api/utils';

export const getMailMessages = createAsyncThunk(
  'mailMessages/getMailMessages',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: fetchMailMessages,
      data: data,
      action: 'fetch mail messages',
      getState: getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const sendMailMessageComment = createAsyncThunk(
  'mailMessages/sendMailMessageComment',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: postMailMessageComment,
      data: data,
      action: 'post mail message comment',
      getState: getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const getModelSubscribers = createAsyncThunk(
  'mailMessages/getModelSubscribers',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: fetchModelSubscribers,
      data: data,
      action: 'fetch model subscribers',
      getState: getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const modelSubscribeRequest = createAsyncThunk(
  'mailMessages/modelSubscribeRequest',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: subscribeRequest,
      data: data,
      action: 'model subscribe request',
      getState: getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const modelUnsubscribeRequest = createAsyncThunk(
  'mailMessages/modelUnsubscribeRequest',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: unsubscribeRequest,
      data: data,
      action: 'model unsubscribe request',
      getState: getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const countUnreadMailMessages = createAsyncThunk(
  'mailMessages/countUnreadMailMessages',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: countUnreadMessages,
      data: data,
      action: 'count unread mail messages',
      getState: getState,
      responseOptions: {isArrayResponse: true, returnTotal: true},
    });
  },
);

export const markMailMessageAsRead = createAsyncThunk(
  'mailMessages/markMailMessageAsRead',
  async function (data, {getState}) {
    const fetchMailMessageData = {model: data?.model, modelId: data?.modelId};
    return handlerApiCall({
      fetchFunction: readMailMessage,
      data: data,
      action: 'mark mail message as read',
      getState: getState,
      responseOptions: {returnTotal: true},
    }).then(result => {
      const unreadMessages = result;
      return handlerApiCall({
        fetchFunction: fetchMailMessages,
        data: {
          model: fetchMailMessageData.model,
          modelId: fetchMailMessageData.modelId,
          page: 0,
        },
        action: 'fetch mail messages',
        getState: getState,
        responseOptions: {isArrayResponse: true},
      }).then(mailMessages => ({
        unreadMessages: unreadMessages,
        mailMessagesList: mailMessages,
      }));
    });
  },
);

export const markAllMailMessageAsRead = createAsyncThunk(
  'mailMessages/markAllMailMessageAsRead',
  async function (data, {getState}) {
    const fetchMailMessageData = {model: data?.model, modelId: data?.modelId};
    return handlerApiCall({
      fetchFunction: realAllMailMessages,
      data: data,
      action: 'mark mail message as read',
      getState: getState,
      responseOptions: {returnTotal: true},
    }).then(result => {
      const unreadMessages = result;
      return handlerApiCall({
        fetchFunction: fetchMailMessages,
        data: {
          model: fetchMailMessageData.model,
          modelId: fetchMailMessageData.modelId,
          page: 0,
        },
        action: 'fetch mail messages',
        getState: getState,
        responseOptions: {isArrayResponse: true},
      }).then(mailMessages => ({
        unreadMessages: unreadMessages,
        mailMessagesList: mailMessages,
      }));
    });
  },
);

const initialState = {
  loading: false,
  loadingFollowers: false,
  moreLoading: false,
  isListEnd: false,
  mailMessagesList: [],
  modelFollowersList: [],
  reload: false,
  reloadFollowers: false,
  unreadMessages: 0,
};

const mailMessagesSlice = createSlice({
  name: 'mailMessages',
  initialState,
  extraReducers: builder => {
    builder.addCase(getMailMessages.pending, (state, action) => {
      state.reload = false;
      if (action.meta.arg.page === 0) {
        state.loading = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(getMailMessages.fulfilled, (state, action) => {
      state.loading = false;
      state.moreLoading = false;
      if (action.meta.arg.page === 0 || action.meta.arg.page == null) {
        state.mailMessagesList = action.payload;
        state.isListEnd = false;
      } else {
        if (action.payload != null) {
          state.isListEnd = false;
          state.mailMessagesList = [
            ...state.mailMessagesList,
            ...action.payload,
          ];
        } else {
          state.isListEnd = true;
        }
      }
    });
    builder.addCase(sendMailMessageComment.pending, (state, action) => {
      state.reload = false;
    });
    builder.addCase(sendMailMessageComment.fulfilled, (state, action) => {
      state.reload = true;
    });
    builder.addCase(getModelSubscribers.pending, (state, action) => {
      state.loadingFollowers = true;
      state.reloadFollowers = false;
    });
    builder.addCase(getModelSubscribers.fulfilled, (state, action) => {
      state.loadingFollowers = false;
      state.modelFollowersList = action.payload ? action.payload : [];
    });
    builder.addCase(modelSubscribeRequest.pending, (state, action) => {
      state.loadingFollowers = true;
    });
    builder.addCase(modelSubscribeRequest.fulfilled, (state, action) => {
      state.loadingFollowers = false;
      state.reloadFollowers = true;
    });
    builder.addCase(modelUnsubscribeRequest.pending, (state, action) => {
      state.loadingFollowers = true;
    });
    builder.addCase(modelUnsubscribeRequest.fulfilled, (state, action) => {
      state.loadingFollowers = false;
      state.reloadFollowers = true;
    });
    builder.addCase(countUnreadMailMessages.fulfilled, (state, action) => {
      state.unreadMessages = action.payload;
    });
    builder.addCase(markMailMessageAsRead.fulfilled, (state, action) => {
      state.loading = false;
      state.moreLoading = false;
      state.mailMessagesList = action.payload.mailMessagesList;
      state.isListEnd = false;
      state.unreadMessages = action.payload.unreadMessages;
    });
    builder.addCase(markAllMailMessageAsRead.fulfilled, (state, action) => {
      state.loading = false;
      state.moreLoading = false;
      state.mailMessagesList = action.payload.mailMessagesList;
      state.isListEnd = false;
      state.unreadMessages = action.payload.unreadMessages;
    });
  },
});

export const mailMessagesReducer = mailMessagesSlice.reducer;
