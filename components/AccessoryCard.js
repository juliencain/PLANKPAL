import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteAccessory } from '../api/accessoryData';

function AccessoryCard({ accessoryObj, onUpdate }) {
  const deleteThisAccessory = () => {
    if (window.confirm(`Delete ${accessoryObj.title}?`)) {
      deleteAccessory(accessoryObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={accessoryObj.image} alt={accessoryObj.title} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{accessoryObj.title}</Card.Title>
        <p className="card-text">
          <strong>Company:</strong> {accessoryObj.company}
        </p>
        <Link href={`/accessories/${accessoryObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/accessories/edit/${accessoryObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisAccessory} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

AccessoryCard.propTypes = {
  accessoryObj: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    company: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default AccessoryCard;
