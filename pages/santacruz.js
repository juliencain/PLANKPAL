import { useEffect, useState } from 'react';
import { getPlanks } from '../api/plankData';
import { useAuth } from '../utils/context/authContext';
import PlankCard from '../components/PlankCard';

function SantaCruzPlanks() {
  const [santaCruzPlanks, setSantaCruzPlanks] = useState([]);
  const { user } = useAuth();
  const targetCompanyId = '-HiBsfuTafbEQsd7eAULxV'; // Updated company_id

  function filter(planks) {
    return planks.filter((plank) => plank.company_id === targetCompanyId); // Filter by company_id
  }

  const getAllThePlanks = () => {
    if (user && user.uid) {
      getPlanks(user.uid)
        .then((allPlanks) => {
          const filtered = filter(allPlanks);
          setSantaCruzPlanks(filtered);
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
        {santaCruzPlanks.length > 0 ? (
          santaCruzPlanks.map((plank) => (
            <PlankCard key={plank.firebaseKey} plankObj={plank} onUpdate={getAllThePlanks} />
          ))
        ) : (
          <p>No planks available</p>
        )}
      </div>
    </div>
  );
}

export default SantaCruzPlanks;
