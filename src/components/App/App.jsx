import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from '../ContactForm';
import Filter from '../Filter';
import ContactList from '../ContactsList';
import { Wrapper } from './App.styled';
import Modal from 'components/Modal';
import { Button } from '../ContactForm/ContactForm.styled';

function App() {
  const [filter, setFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [contacts, setContacts] = useState(() => {
    if (JSON.parse(localStorage.getItem('contacts'))) {
      return JSON.parse(localStorage.getItem('contacts'));
    } else {
      return [];
    }
  });
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    const lowerCaseFilter = filter.toLowerCase();
    setFilteredContacts(
      contacts.filter(contact =>
        contact.name.toLowerCase().includes(lowerCaseFilter)
      )
    );
  }, [filter, contacts]);

  function toggleModal() {
    setShowModal(!showModal);
  }

  const filterChangeHandler = ({ target: { name, value } }) => {
    setFilter(value);
  };

  const formSubmitHandler = data => {
    if (contacts.find(contact => contact.name === data.name)) {
      alert(`${data.name} is alreary in contacts`);
      return;
    }
    const newContact = { id: nanoid(6), ...data };
    setContacts([...contacts, newContact]);
  };

  const deleteContactHandler = ({ target: { id } }) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <Wrapper>
      <h1>Phonebook</h1>
      <Button type="submit" onClick={toggleModal}>
        Add Contact
      </Button>
      {showModal && (
        <Modal onClose={toggleModal}>
          <ContactForm onSubmit={formSubmitHandler} closeModal={toggleModal} />
        </Modal>
      )}

      <h2>Contacts</h2>
      <Filter value={filter} onChange={filterChangeHandler} />
      <ContactList contacts={filteredContacts} onClick={deleteContactHandler} />
    </Wrapper>
  );
}

// class App extends Component {
//   state = {
//     contacts: JSON.parse(localStorage.getItem('contacts')) ?? [],
//     filter: '',
//     showModal: false,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//     if (
//       this.state.contacts.length > prevState.contacts.length &&
//       prevState.contacts.length !== 1
//     ) {
//       this.toggleModal();
//     }
//   }

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));
//   };

//   filterChangeHandler = ({ target: { name, value } }) => {
//     this.setState({ [name]: value });
//   };

//   formSubmitHandler = data => {
//     if (this.state.contacts.find(contact => contact.name === data.name)) {
//       alert(`${data.name} is alreary in contacts`);
//       return;
//     }
//     const newContact = { id: nanoid(6), ...data };
//     this.setState(({ contacts }) => ({ contacts: [...contacts, newContact] }));
//   };
//   deleteContactHandler = ({ target: { id } }) => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== id),
//     }));
//   };

//   render() {
//     const lowerCaseFilter = this.state.filter.toLowerCase();
//     const filteredContacts = this.state.contacts.filter(contact =>
//       contact.name.toLowerCase().includes(lowerCaseFilter)
//     );

//     return (
//       <Wrapper>
//         <h1>Phonebook</h1>
//         <Button type="submit" onClick={this.toggleModal}>
//           Add Contact
//         </Button>
//         {this.state.showModal && (
//           <Modal onClose={this.toggleModal}>
//             <ContactForm onSubmit={this.formSubmitHandler} />
//           </Modal>
//         )}

//         <h2>Contacts</h2>
//         <Filter value={this.state.filter} onChange={this.filterChangeHandler} />
//         <ContactList
//           contacts={filteredContacts}
//           onClick={this.deleteContactHandler}
//         />
//       </Wrapper>
//     );
//   }
// }
export default App;
