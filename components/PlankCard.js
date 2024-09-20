import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deletePlank } from '../api/plankData';
import { getSingleCompany } from '../api/companyData'; // Import the function to fetch company data

function PlankCard({ plankObj, onUpdate }) {
  const [companyName, setCompanyName] = useState('');

  useEffect(() => {
    const fetchCompanyName = async () => {
      try {
        const companyData = await getSingleCompany(plankObj.company_id);
        setCompanyName(companyData.name); // Assuming companyData has a name property
      } catch (error) {
        console.error('Error fetching company data:', error);
      }
    };

    if (plankObj.company_id) {
      fetchCompanyName();
    }
  }, [plankObj.company_id]);

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
          <strong>Company:</strong> {companyName || 'Loading...'}<br />
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
    company_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PlankCard;
