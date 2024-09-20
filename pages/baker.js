import { useEffect, useState } from 'react';
import { getPlanks } from '../api/plankData';
import { useAuth } from '../utils/context/authContext';
import PlankCard from '../components/PlankCard';

function BakerPlanks() {
  const [bakerPlanks, setBakerPlanks] = useState([]);
  const { user } = useAuth();
  const targetCompanyId = '-MiBsfuTafbEQsd7eAULxV'; // Set your desired company_id here

  function filter(planks) {
    return planks.filter((plank) => plank.company_id === targetCompanyId); // Filter by company_id
  }

  const getAllThePlanks = () => {
    if (user && user.uid) {
      getPlanks(user.uid)
        .then((allPlanks) => {
          const filtered = filter(allPlanks);
          setBakerPlanks(filtered);
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
        {bakerPlanks.length > 0 ? (
          bakerPlanks.map((plank) => (
            <PlankCard key={plank.firebaseKey} plankObj={plank} onUpdate={getAllThePlanks} />
          ))
        ) : (
          <p>No planks available</p>
        )}
      </div>
    </div>
  );
}

export default BakerPlanks;
