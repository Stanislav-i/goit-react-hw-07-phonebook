import css from './ContactList.module.css';
import { Contact } from './Contact';
import { useSelector } from 'react-redux';
import { selectContacts } from 'redux/contactsSlice';
import { selectFilter } from 'redux/filterSlice';

export const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

    const getFilteredContacts = () => {
      const normalizedFilter = filter.toLocaleLowerCase();
      return contacts?.filter(contact =>
        contact.name.toLocaleLowerCase().includes(normalizedFilter)
      );
  };
  
  return (
    <ul className={css.liststyle}>
      { contacts.length === 0 && <p>Ooops! We didn't find any contacts of yours!</p>}
      {contacts.length > 0 && getFilteredContacts().map(({ id, name, number }) => (
        <li key={id}>
          <Contact name={name} number={number} id={id} />
        </li>
      ))}
    </ul>
  );
};