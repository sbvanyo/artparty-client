import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { registerUser } from '../utils/auth'; // Update with path to registerUser

function RegisterForm({ user, updateUser }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    img: '',
    uid: user.uid,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData).then(() => updateUser(user.uid));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>hi!</Form.Label>
        <Form.Control name="name" required placeholder="Enter your name" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />

        <Form.Control name="email" required placeholder="Enter your email" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />

        <Form.Control name="img" required placeholder="Enter your user profile picutre url" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />

      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;
