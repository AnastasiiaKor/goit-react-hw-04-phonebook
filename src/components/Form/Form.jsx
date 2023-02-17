import { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

const INITIAL_STATE = {
  name: '',
  number: '',
};
class Form extends Component {
  state = {
    ...INITIAL_STATE,
  };
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };
  nameInputId = nanoid();

  numberInputId = nanoid();

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    const { props, state } = this;
    event.preventDefault();
    props.onSubmit(state);
    this.resetForm();
  };
  resetForm = () => {
    this.setState({ ...INITIAL_STATE });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor={this.nameInputId}>Name</label>
        <input
          onChange={this.handleInputChange}
          type="text"
          name="name"
          id={this.nameInputId}
          value={this.state.name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <label htmlFor={this.numberInputId}>Number</label>
        <input
          type="tel"
          name="number"
          id={this.numberInputId}
          value={this.state.number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={this.handleInputChange}
        />
        <button type="submit">Add contact</button>
      </form>
    );
  }
}
export default Form;
