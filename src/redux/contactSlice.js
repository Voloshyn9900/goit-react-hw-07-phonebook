import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import shortid from 'shortid';
import { addContact, deleteContact, fetchContacts } from './operations';
// import { useDispatch } from 'react-redux';

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
        console.log(state.contacts.items);
        console.log(action.payload);
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.payload;
      })
      .addCase(addContact.pending, state => {
        state.contacts.isLoading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        console.log(action.payload);
        state.contacts.items.push(action.payload);
        state.contacts.isLoading = false;
        state.contacts.error = null;
      })
      .addCase(addContact.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.payload;
      })
      .addCase(deleteContact.pending, state => {
        state.contacts.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.isLoading = true;
        state.contacts.items = state.contacts.items.filter(contact => {
          return contact.id !== action.payload.id;
        });
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.payload;
      });
  },

  reducers: {
    changeFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

export const contactReducer = contactSlice.reducer;
export const { changeFilter } = contactSlice.actions;

const persistConfig = {
  key: 'contacts',
  storage,
  whitelist: ['filter'],
  // можно добавить name: 'contacts' Slice,
  // blacklist: [''],
};

export const persistedReducer = persistReducer(persistConfig, contactReducer);
