import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createAccessory, updateAccessory } from '../../api/accessoryData';

const initialState = {
  title: '',
  company: '',
  image: '',
  firebaseKey: '',
};

function AccessoryForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateAccessory(formInput).then(() => router.push('/accessories/'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createAccessory(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateAccessory(patchPayload).then(() => {
          router.push('/accessories/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Accessory</h2>

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
      <FloatingLabel controlId="floatingImage" label="Accessory Image" className="mb-3">
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
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Accessory</Button>
    </Form>
  );
}

AccessoryForm.propTypes = {
  obj: PropTypes.shape({
    title: PropTypes.string,
    company: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

AccessoryForm.defaultProps = {
  obj: initialState,
};

export default AccessoryForm;
