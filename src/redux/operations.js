import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://65b7fcae46324d531d55d1f8.mockapi.io';

export const fetchContacts = createAsyncThunk(
  'contact/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
