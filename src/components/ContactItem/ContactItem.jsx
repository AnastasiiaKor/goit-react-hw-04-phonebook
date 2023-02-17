import PropTypes from 'prop-types';
function ContactItem({ name, number, id, onClick }) {
  return (
    <>
      <p>
        {name}: {number}
      </p>
      <button id={id} type="button" onClick={onClick}>
        Delete
      </button>
    </>
  );
}
ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};
export default ContactItem;
