import css from './ContactList.module.css';
import { Contact } from './Contact';
import { useSelector} from 'react-redux';

export const ContactList = () => {
  const contacts = useSelector(state => state.contacts.data);
  const filter = useSelector(state => state.filter);

    const getFilteredContacts = () => {
      const normalizedFilter = filter.toLocaleLowerCase();
      return contacts?.filter(contact =>
        contact.name.toLocaleLowerCase().includes(normalizedFilter)
      );
  };
  
  return (
    <ul className={css.liststyle}>
      {getFilteredContacts().map(({ id, name, number }) => (
        <li key={id}>
          <Contact name={name} number={number} id={id} />
        </li>
      ))}
    </ul>
  );
};