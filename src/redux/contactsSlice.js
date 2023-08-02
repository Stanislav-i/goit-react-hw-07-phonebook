import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchContactsData, addContactData, deleteContactData } from 'Services/Api';

export const fetchContactsThunk = createAsyncThunk(
  'contacts/fetchContactsThunk',
  async (_, thunkApi) => { 
    try {
      const contactsListData = await fetchContactsData();
      return contactsListData;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
)

export const addContactThunk = createAsyncThunk(
  'contacts/addContactThunk',
  async (contactData, thunkApi) => {
    try {
      await addContactData(contactData);
      console.log(contactData)
      return contactData;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteContactThunk = createAsyncThunk(
  'contacts/deleteContactThunk',
  async (id, thunkApi) => {
    try {
      await deleteContactData(id);
      return id;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    // addContact: (state, action) => {
    //   state.data.push(action.payload);
    // },
    // deleteContact: (state, action) => {
      // const index = state.data.findIndex(
      //   contact => contact.id === action.payload
      // );
      // state.data.splice(index, 1);
    //   state.data.filter(contact => contact.id !== action.payload);
    // },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchContactsThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContactsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchContactsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // ======ADD TASK
      // .addCase(addContactThunk.pending, (state) => {

      // })
      .addCase(addContactThunk.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(addContactThunk.rejected, (state, action) => {
        state.error = action.payload;
      })
      // ======DELETE TASK
      // .addCase(addContactThunk.pending, (state) => {

      // })
      .addCase(deleteContactThunk.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          contact => contact.id === action.payload
        );
        state.data.splice(index, 1);
      })
      .addCase(deleteContactThunk.rejected, (state, action) => {
        state.error = action.payload;
      }),
});

export const {deleteContact } = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;