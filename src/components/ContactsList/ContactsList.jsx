function ContactList({ contacts, onClick }) {
  return (
    <ul>
      {contacts.map(({ name, id, number }) => {
        return (
          <li key={id}>
            <p>
              {name}: {number}
            </p>
            <button id={id} type="button" onClick={onClick}>
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
}
export default ContactList;
