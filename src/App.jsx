import ContactForm from './components/ContactForm/ContactForm';
import SearchBox from './components/SearchBox/SearchBox';
import ContactList from './components/ContactList/ContactList';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContact } from './redux/contactsOps';
import { selectError, selectLoading } from './redux/contactsSlice';

function App() {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchContact());
  }, [dispatch]);
  return (
    <div className='container'>
     <div className='phoneBook'>
        <h1>Phonebook</h1>
        <ContactForm />
        <SearchBox />
     </div>
      {loading && <p>Loading...</p>}
      {error && <p>Oops! Something went wrong. Please try again.</p>}
      <ContactList />
    </div>
  );
}

export default App;