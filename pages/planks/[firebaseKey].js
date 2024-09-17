/* eslint-disable no-console */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { deletePlank, getSinglePlank } from '../../api/plankData';

export default function ViewPlank() {
  const [plankDetails, setPlankDetails] = useState({});
  const [fetchError, setFetchError] = useState(null);
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSinglePlank(firebaseKey).then(setPlankDetails);
    console.warn('plankDetails', plankDetails);
  }, [firebaseKey, plankDetails]);

  if (fetchError) {
    return <div>{fetchError}</div>;
  }

  // if (!accessoryDetails) {
  //   return <div>Loading...</div>;
  // }

  const {
    image, title, company, shape, size,
  } = plankDetails;

  // Log values before rendering
  console.log('Plank details - Title:', title);
  console.log('Plank details - Company:', company);
  console.log('Plank details - Image:', image);
  console.log('Plank details - Shape:', shape);
  console.log('Plank details - Size:', size);

  // eslint-disable-next-line no-unused-vars
  const deleteThisPlank = () => {
    if (window.confirm(`Are you sure you want to delete ${title}?`)) {
      deletePlank(firebaseKey)
        .then(() => {
          router.push('/planks');
        })
        .catch((deleteError) => {
          console.error('Error deleting accessory:', deleteError);
          setFetchError('Error deleting accessory.');
        });
    }
  };

  return (
    <>
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column">
          <img src={plankDetails.image || '/default-image.jpg'} alt={title || 'No title available'} style={{ width: '300px' }} />
        </div>
        <div className="text-white ms-5 details">
          <h5>
            {plankDetails.title || 'No title available'} {plankDetails.company || 'No company information available'}
            {plankDetails.shape || 'No shape available'} {plankDetails.size || 'No size information available'}
          </h5>
        </div>
      </div>
      <hr />
    </>
  );
}
