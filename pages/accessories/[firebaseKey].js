/* eslint-disable no-console */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// eslint-disable-next-line no-unused-vars
import { viewAccessoryDetails, deleteAccessory, getSingleAccessory } from '../../api/accessoryData';

export default function ViewAccessory() {
  const [accessoryDetails, setAccessoryDetails] = useState({});
  const [fetchError, setFetchError] = useState(null);
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleAccessory(firebaseKey).then(setAccessoryDetails);
    console.warn('accessoryDetails', accessoryDetails);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firebaseKey]);

  if (fetchError) {
    return <div>{fetchError}</div>;
  }

  // if (!accessoryDetails) {
  //   return <div>Loading...</div>;
  // }

  const { image, title, company } = accessoryDetails;

  // Log values before rendering
  console.log('Accessory details - Title:', title);
  console.log('Accessory details - Company:', company);
  console.log('Accessory details - Image:', image);

  // eslint-disable-next-line no-unused-vars
  const deleteThisAccessory = () => {
    if (window.confirm(`Are you sure you want to delete ${title}?`)) {
      deleteAccessory(firebaseKey)
        .then(() => {
          router.push('/accessories');
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
          <img src={accessoryDetails.image || '/default-image.jpg'} alt={title || 'No title available'} style={{ width: '300px' }} />
        </div>
        <div className="text-white ms-5 details">
          <h5>
            {accessoryDetails.title || 'No title available'} {accessoryDetails.company || 'No company information available'}
          </h5>
        </div>
      </div>
      <hr />
    </>
  );
}
