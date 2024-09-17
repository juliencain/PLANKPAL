import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createPlank, updatePlank } from '../../api/plankData';

// Define initial state for the form fields
const initialState = {
  title: '',
  company: '',
  shape: '',
  size: '',
  image: '',
  firebaseKey: '',
};

// PlankForm component definition
function PlankForm({ obj }) {
  // Initialize state for form input with the initial state
  const [formInput, setFormInput] = useState(initialState);

  // Use Next.js router for page navigation
  const router = useRouter();

  // Get the current user from authentication context
  const { user } = useAuth();

  // Effect to update formInput if obj has a firebaseKey (for editing an existing plank)
  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj]);

  // Handle changes to form fields
  const handleChange = (e) => {
    const { name, value } = e.target; // Extract name and value from the event target
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value, // Update the specific field in the state
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior (page reload)

    if (obj.firebaseKey) {
      // If firebaseKey is present, update the existing plank
      updatePlank(formInput).then(() => router.push('/')); // Navigate to the home page after update
    } else {
      // If no firebaseKey, create a new plank
      const payload = { ...formInput, uid: user.uid }; // Add user ID to the payload
      createPlank(payload).then(({ name }) => {
        // Once created, update the plank with the returned firebaseKey
        const patchPayload = { firebaseKey: name };
        updatePlank(patchPayload).then(() => {
          router.push('/'); // Navigate to the home page after update
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Display a heading based on whether the form is for creating or updating */}
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Plank</h2>

      {/* TITLE INPUT */}
      <FloatingLabel controlId="floatingTitle" label="Title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter the title"
          name="title"
          value={formInput.title}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* COMPANY SELECT */}
      <Form.Group className="mb-3">
        <Form.Control as="select" value={formInput.company} name="company" onChange={handleChange}>
          <option disabled value="">Select Company...</option>
          <option value="Baker">Baker</option>
          <option value="Zero">Zero</option>
          <option value="Element">Element</option>
          <option value="Santa Cruz">Santa Cruz</option>
        </Form.Control>
      </Form.Group>

      {/* SHAPE INPUT */}
      <FloatingLabel controlId="floatingShape" label="Shape" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter the shape"
          name="shape"
          value={formInput.shape}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SIZE INPUT */}
      <FloatingLabel controlId="floatingSize" label="Size" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter the size"
          name="size"
          value={formInput.size}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT */}
      <FloatingLabel controlId="floatingImage" label="Plank Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Plank</Button>
    </Form>
  );
}

// Prop types validation for PlankForm component
PlankForm.propTypes = {
  obj: PropTypes.shape({
    title: PropTypes.string,
    company: PropTypes.string,
    shape: PropTypes.string,
    size: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

// Default props for PlankForm component
PlankForm.defaultProps = {
  obj: initialState,
};

export default PlankForm;
