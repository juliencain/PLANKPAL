/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { getPlanks } from '../api/plankData';
import { useAuth } from '../utils/context/authContext';
import PlankCard from '../components/PlankCard';

function SantacruzPlanks() {
  const [santacruzPlanks, setSantacruzPlanks] = useState([]);
  const { user } = useAuth();

  function filter(planks) {
    return planks.filter((plank) => plank.company === 'Santa Cruz'); // Ensure 'baker' is the correct value
  }

  const getAllThePlanks = () => {
    if (user && user.uid) {
      getPlanks(user.uid)
        .then((allPlanks) => {
          const filtered = filter(allPlanks);
          setSantacruzPlanks(filtered);
        })
        .catch((error) => console.error('Failed to fetch planks:', error));
    }
  };

  useEffect(() => {
    getAllThePlanks();
  }, [user.uid]); // Run when user.uid changes

  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap">
        {santacruzPlanks.length > 0 ? (
          santacruzPlanks.map((plank) => (
            <PlankCard key={plank.firebaseKey} plankObj={plank} onUpdate={getAllThePlanks} />
          ))
        ) : (
          <p>No planks available</p>
        )}
      </div>
    </div>
  );
}

export default SantacruzPlanks;
