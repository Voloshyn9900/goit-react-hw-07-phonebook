import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import shortid from 'shortid';
import { fetchContacts } from './operations';
import { useDispatch } from 'react-redux';

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: {
      items: [],
      isLoading: false,
      error: null,
    },
    filter: '',
  },

  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.contacts.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = null;
        state.contacts.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.payload;
      });
  },

  reducers: {
    changeFilter(state, action) {
      state.filter = action.payload;
    },

    deleteContactById(state, action) {
      state.contacts.items = state.contacts.items.filter(
        contact => contact.items.id !== action.payload
      );
    },
  },

  // reducers: {
  //   // addContacts: {
  //   //   prepare({ name, number }) {
  //   //     return {
  //   //       payload: {
  //   //         name: name,
  //   //         number: number,
  //   //         id: shortid.generate(),
  //   //       },
  //   //     };
  //   //   },
  //   //   reducer(state, action) {
  //   //     state.contacts.items.push(action.payload);
  //   //   },
  //   // },

  //   fetchingInProgress(state) {
  //     state.contacts.isLoading = true;
  //   },

  //   fetchingSuccess(state, action) {
  //     state.contacts.isLoading = false;
  //     state.contacts.error = null;
  //     state.contacts.items = action.payload;
  //   },

  //   fetchingError(state, action) {
  //     state.contacts.isLoading = false;
  //     state.contacts.error = action.payload;
  //   },

  //   changeFilter(state, action) {
  //     state.filter = action.payload;
  //   },

  //   deleteContactById(state, action) {
  //     state.contacts.items = state.contacts.items.filter(
  //       contact => contact.id !== action.payload
  //     );
  //   },
  // },
});

export const contactReducer = contactSlice.reducer;
export const {
  // fetchingInProgress,
  // fetchingSuccess,
  // fetchingError,
  changeFilter,
  deleteContactById,
} = contactSlice.actions;

const persistConfig = {
  key: 'contacts',
  storage,
  whitelist: ['filter'],
  // можно добавить name: 'contacts' Slice,
  // blacklist: [''],
};

export const persistedReducer = persistReducer(persistConfig, contactReducer);
