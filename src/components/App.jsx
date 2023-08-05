import React, { useEffect } from 'react';
import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { Blocks } from 'react-loader-spinner';

import { useSelector, useDispatch } from 'react-redux';
import {
  fetchContactsThunk,
  selectError,
  selectIsLoading,
} from 'redux/contactsSlice';

export const App = () => {
  const isLoading = useSelector(selectIsLoading);
  const errorMessage = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContactsThunk());
  }, [dispatch]);

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '50px',
        color: 'biege',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm />

      <h2>Contacts</h2>

      <Filter />

      {isLoading && (
        <Blocks
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
        />
      )}

      {errorMessage && (
        <p>Sorry, something went wrong! Error: {errorMessage}</p>
      )}

      <ContactList />
    </div>
  );
};