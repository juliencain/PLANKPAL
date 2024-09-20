/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getPlanks } from '../api/plankData';
import { useAuth } from '../utils/context/authContext';
import PlankCard from '../components/PlankCard';
// eslint-disable-next-line import/no-unresolved
import SkateCompanyNavBar from '../components/skateCompaniesNavBar';

function Home() {
  const [planks, setPlanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useAuth();

  const getAllThePlanks = async () => {
    setLoading(true);
    try {
      const data = await getPlanks(user.uid);
      setPlanks(data);
    } catch (err) {
      console.error('Error fetching planks:', err);
      setError('Failed to load planks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.uid) {
      getAllThePlanks();
    }
  }, [user?.uid]);

  return (
    <>
      <SkateCompanyNavBar /> {/* Include the SkateCompanyNavBar here */}
      <div className="text-center my-4">
        <Link href="/new" passHref>
          <Button>Add A Plank</Button>
        </Link>
        <div className="d-flex flex-wrap">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            planks.length > 0 ? (
              planks.map((plank) => (
                <PlankCard key={plank.firebaseKey} plankObj={plank} onUpdate={getAllThePlanks} />
              ))
            ) : (
              <p>No planks available.</p>
            )
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
