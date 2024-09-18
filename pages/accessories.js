import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getAccessories } from '../api/accessoryData';
import { useAuth } from '../utils/context/authContext';
import AccessoryCard from '../components/AccessoryCard';

function Accessories() {
  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const getAllTheAccessories = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAccessories(user.uid); // Ensure user.uid is passed if needed
      setAccessories(data);
    } catch (err) {
      setError('Failed to load accessories');
    } finally {
      setLoading(false);
    }
  }, [user.uid]); // Adding user.uid to the dependency array

  useEffect(() => {
    if (user?.uid) {
      getAllTheAccessories();
    }
  }, [getAllTheAccessories]); // Adding getAllTheAccessories to the dependency array

  // Refactored rendering logic
  let content;

  if (loading) {
    content = <p>Loading...</p>;
  } else if (error) {
    content = <p>{error}</p>;
  } else if (accessories.length > 0) {
    content = accessories.map((accessory) => (
      <AccessoryCard key={accessory.firebaseKey} accessoryObj={accessory} onUpdate={getAllTheAccessories} />
    ));
  } else {
    content = <p>No accessories available.</p>;
  }

  return (
    <div className="text-center my-4">
      <Link href="/newAccessory" passHref>
        <Button>Add An Accessory</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {content}
      </div>
    </div>
  );
}

export default Accessories;
