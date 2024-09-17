import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePlank } from '../../../api/plankData';
import PlankForm from '../../../components/forms/PlankForm';

export default function EditPlank() {
  const [editItem, setEditItem] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    if (firebaseKey) {
      setLoading(true);
      getSinglePlank(firebaseKey)
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

  return <PlankForm obj={editItem} />;
}
