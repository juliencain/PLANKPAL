/* eslint-disable no-console */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePlank } from '../../api/plankData';
import { getSingleCompany } from '../../api/companyData'; // Make sure to import this function

export default function ViewPlank() {
  const [plankDetails, setPlankDetails] = useState({});
  const [companyName, setCompanyName] = useState(''); // State for company name
  const [fetchError, setFetchError] = useState(null);
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    if (firebaseKey) {
      getSinglePlank(firebaseKey)
        .then((data) => {
          console.log('Fetched Plank Details:', data);
          setPlankDetails(data);

          // Fetch company name based on company_id from plank details
          if (data.company_id) {
            return getSingleCompany(data.company_id);
          }
          throw new Error('Company ID not found in plank details.');
        })
        .then((companyData) => {
          setCompanyName(companyData.name || 'Unknown Company'); // Use the company name
        })
        .catch((error) => {
          console.error('Error fetching plank details:', error);
          setFetchError('Error fetching plank details.');
        });
    }
  }, [firebaseKey]);

  if (fetchError) {
    return <div>{fetchError}</div>;
  }

  const {
    image, title, shape, size,
  } = plankDetails;

  // Log values before rendering
  console.log('Plank details - Title:', title);
  console.log('Plank details - Company:', companyName);
  console.log('Plank details - Image:', image);
  console.log('Plank details - Shape:', shape);
  console.log('Plank details - Size:', size);

  // const deleteThisPlank = () => {
  //   if (window.confirm(`Are you sure you want to delete ${title}?`)) {
  //     deletePlank(firebaseKey)
  //       .then(() => {
  //         router.push('/planks');
  //       })
  //       .catch((deleteError) => {
  //         console.error('Error deleting plank:', deleteError);
  //         setFetchError('Error deleting plank.');
  //       });
  //   }
  // };

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={image} alt={title} style={{ width: '300px' }} />
      </div>
      <div className="text-black ms-5 details">
        <h5>
          {title} by {companyName || 'Unknown Company'}
        </h5>
        <p>Shape: {shape || 'N/A'}</p>
        <p>Size: {size || 'N/A'}</p>
      </div>
    </div>
  );
}
