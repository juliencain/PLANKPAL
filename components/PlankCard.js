import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deletePlank } from '../api/plankData';

function PlankCard({ plankObj, onUpdate }) {
  const deleteThisPlank = () => {
    if (window.confirm(`Delete ${plankObj.title}?`)) {
      deletePlank(plankObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={plankObj.image} alt={plankObj.title} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{plankObj.title}</Card.Title>
        <p className="card-text">
          <strong>Shape:</strong> {plankObj.shape}<br />
          <strong>Size:</strong> {plankObj.size}<br />
          <strong>Company:</strong> {plankObj.company}
        </p>
        <Link href={`/planks/${plankObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/planks/edit/${plankObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisPlank} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

PlankCard.propTypes = {
  plankObj: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    shape: PropTypes.string,
    size: PropTypes.string,
    company: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PlankCard;
