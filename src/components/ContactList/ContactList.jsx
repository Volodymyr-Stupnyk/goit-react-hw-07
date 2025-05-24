import Contact from '../Contact/Contact';
import css from './ContactList.module.css';
import { useSelector } from 'react-redux';
import { selectError, selectFilteredContacts } from '../../redux/contactsSlice';

const ContactList = () => {
    const error = useSelector(selectError)
    const filteredContacts = useSelector(selectFilteredContacts)
    if (!filteredContacts.length && !error) 
        return <p> Add your first contact.</p>

    return (
        <ul className={css.list}>
            {filteredContacts?.map(contact => (
                <Contact
                    contact={contact}
                    key={contact.id}
                />
            ))}
        </ul>
    );
};


export default ContactList;