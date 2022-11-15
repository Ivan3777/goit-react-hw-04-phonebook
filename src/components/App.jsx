import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Johnny Depp', number: '459-12-56' },
      { id: 'id-2', name: 'Jared Leto', number: '443-89-12' },
      { id: 'id-3', name: 'Mila Kunis', number: '645-17-79' },
      { id: 'id-4', name: 'Robert Downey Jr', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contactList');

    if (contacts) {
      const parsedContacts = JSON.parse(contacts);
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    const prevStateContacts = prevState.contacts;
    const nextStayContacts = this.state.contacts;

    if (prevStateContacts !== nextStayContacts) {
      localStorage.setItem('contactList', JSON.stringify(nextStayContacts));
    }
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    const id = nanoid();
    const name = e.name;
    const number = e.number;
    const contactsLists = [...this.state.contacts];

    if (contactsLists.findIndex(contact => name === contact.name) !== -1) {
      alert(`${name} is already in contacts.`);
    } else {
      contactsLists.push({ name, id, number });
    }

    this.setState({ contacts: contactsLists });
  };

  handleDelete = e => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== e),
    }));
  };

  getFilteredContacts = () => {
    const filterContactsList = this.state.contacts.filter(contact => {
      return contact.name
        .toLowerCase()
        .includes(this.state.filter.toLowerCase());
    });

    return filterContactsList;
  };

  render() {
    const { filter } = this.state;

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
        <ContactForm handleSubmit={this.handleSubmit} />
        <h2> Contacts</h2>
        <div
          style={{
            boxShadow: '0px 0px 6px 5px rgba(128, 187, 236, 0.75)',
            borderRadius: '4px',
            padding: '20px',
          }}
        >
          <Filter filter={filter} handleChange={this.handleChange} />
          <ContactList
            contacts={this.getFilteredContacts()}
            handleDelete={this.handleDelete}
          />
        </div>
      </div>
    );
  }
}