import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleAccessory } from '../../../api/accessoryData';
import AccessoryForm from '../../../components/forms/AccessoryForm';

export default function EditAccessory() {
  const [editItem, setEditItem] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    if (firebaseKey) {
      setLoading(true);
      getSingleAccessory(firebaseKey)
        .then((data) => {
          setEditItem(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }
  }, [firebaseKey]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <AccessoryForm obj={editItem} />;
}
