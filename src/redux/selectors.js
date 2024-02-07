import { createSelector } from '@reduxjs/toolkit';

export const selectContacts = state => state.account.contacts.items;
export const selectFilter = state => state.account.filter;

export const selectVisiblContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toUpperCase().includes(filter.toUpperCase())
    );
  }
);
