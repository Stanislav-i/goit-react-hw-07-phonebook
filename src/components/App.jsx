import React, { useEffect} from 'react';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { Blocks } from 'react-loader-spinner';

import { useSelector, useDispatch } from 'react-redux';
import { setFilterValue } from 'redux/filterSlice';
import { fetchContactsThunk, addContactThunk } from 'redux/contactsSlice';

export const App = () => {
  const contacts = useSelector(state => state.contacts.data);
  const isLoading = useSelector(state => state.contacts.isLoading);
  const errorMessage = useSelector(state => state.contacts.error)
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const nameInputId = nanoid();
  const numberInputId = nanoid();
  const searchInputId = nanoid();

  useEffect(() => {
    dispatch(fetchContactsThunk());
  }, [dispatch]);

  const handleFilterChange = e => {
    const userQuery = e.target.value;
    dispatch(setFilterValue(userQuery));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.elements.name.value;
    const number = form.elements.number.value;
    const lastContactIndex = contacts.length - 1;
    const lastContactId = Number(contacts[lastContactIndex].id);
    const contactId = String(lastContactId + 1);
    if (
      contacts.some(
        contact => contact.name.toLocaleLowerCase() === name.toLocaleLowerCase()
      )
    ) {
      alert(`${name} is already in contacts`);
    } else {
      dispatch(addContactThunk({ id: contactId, name: name, number: number }));
    }
    form.reset();
  };

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
      <ContactForm
        onSubmit={handleSubmit}
        nameInputId={nameInputId}
        numberInputId={numberInputId}
      />

      <h2>Contacts</h2>

      <Filter id={searchInputId} value={filter} onChange={handleFilterChange} />

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
        <p>Sorry, something went wrong! Error: { errorMessage}</p>
      )}

      <ContactList />
    </div>
  );
};
