import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Johnny Depp', number: '459-12-56' },
    { id: 'id-2', name: 'Jared Leto', number: '443-89-12' },
    { id: 'id-3', name: 'Mila Kunis', number: '645-17-79' },
    { id: 'id-4', name: 'Robert Downey Jr', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');
  // const [name, setName] = useState('');
  // const [number, setNumber] = useState('');

  // state = {
  // contacts: [
  //   { id: 'id-1', name: 'Johnny Depp', number: '459-12-56' },
  //   { id: 'id-2', name: 'Jared Leto', number: '443-89-12' },
  //   { id: 'id-3', name: 'Mila Kunis', number: '645-17-79' },
  //   { id: 'id-4', name: 'Robert Downey Jr', number: '227-91-26' },
  // ],
  //   filter: '',
  //   name: '',
  //   number: '',
  // };

  useEffect(() => {
    const contacts = localStorage.getItem('contactList');

    if (contacts) {
      const parsedContacts = JSON.parse(contacts);
      setContacts(parsedContacts);
    }
  }, [contacts]);

  useEffect(() => {
    const prevContacts = contacts;
    const nextContacts = contacts;

    if (prevContacts !== nextContacts) {
      localStorage.setItem('contactList', JSON.stringify(nextContacts));
    }
  });

  // componentDidMount() {
  //   const contacts = localStorage.getItem('contactList');

  //   if (contacts) {
  //     const parsedContacts = JSON.parse(contacts);
  //     this.setState({ contacts: parsedContacts });
  //   }
  // }

  // componentDidUpdate(_, prevState) {
  //   const prevStateContacts = prevState.contacts;
  //   const nextStayContacts = this.state.contacts;

  //   if (prevStateContacts !== nextStayContacts) {
  //     localStorage.setItem('contactList', JSON.stringify(nextStayContacts));
  //   }
  // }

  const handleChange = e => {
    const { value } = e.target;
    setFilter(value);
    // const { name, value } = e.target;
    // this.setState({ [name]: value });
    // switch (name) {
    //   case 'name':
    //     setName(value);
    //     break;
    //   case 'number':
    //     setNumber(value);
    //     break;
    //   default:
    //     return;
    // }
  };

  const handleSubmit = e => {
    const id = nanoid();
    const name = e.name;
    const number = e.number;
    const contactsLists = [...contacts];

    if (contactsLists.findIndex(contact => name === contact.name) !== -1) {
      alert(`${name} is already in contacts.`);
    } else {
      contactsLists.push({ name, id, number });
    }

    setContacts(contactsLists);
  };

  const handleDelete = e => {
    setContacts(contacts.filter(contact => contact.id !== e));
  };

  const getFilteredContacts = () => {
    const filterContactsList = contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });

    return filterContactsList;
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        color: '#010101',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm handleSubmit={handleSubmit} />
      <h2> Contacts</h2>
      <div
        style={{
          boxShadow: '0px 0px 6px 5px rgba(128, 187, 236, 0.75)',
          borderRadius: '4px',
          padding: '20px',
        }}
      >
        <Filter filter={filter} handleChange={handleChange} />
        <ContactList
          contacts={getFilteredContacts()}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};
