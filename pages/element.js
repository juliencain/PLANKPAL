import { useEffect, useState } from 'react';
import { getPlanks } from '../api/plankData';
import { useAuth } from '../utils/context/authContext';
import PlankCard from '../components/PlankCard';

function ElementPlanks() {
  const [elementPlanks, setElementPlanks] = useState([]);
  const { user } = useAuth();

  function filter(planks) {
    return planks.filter((plank) => plank.company === 'Element'); // Ensure 'baker' is the correct value
  }

  const getAllThePlanks = () => {
    if (user && user.uid) {
      getPlanks(user.uid)
        .then((allPlanks) => {
          const filtered = filter(allPlanks);
          setElementPlanks(filtered);
        })
        .catch((error) => console.error('Failed to fetch planks:', error));
    }
  };

  useEffect(() => {
    getAllThePlanks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.uid]); // Run when user.uid changes

  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap">
        {elementPlanks.length > 0 ? (
          elementPlanks.map((plank) => (
            <PlankCard key={plank.firebaseKey} plankObj={plank} onUpdate={getAllThePlanks} />
          ))
        ) : (
          <p>No planks available</p>
        )}
      </div>
    </div>
  );
}

export default ElementPlanks;
