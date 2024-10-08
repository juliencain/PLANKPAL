import { clientCredentials } from '../utils/client';
import { getSingleCompany } from './companyData';

const endpoint = clientCredentials.databaseURL;

// Fetch planks by uid
const getPlanks = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/planks.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => {
      console.error('Error fetching planks:', error);
      reject(error);
    });
});

const getSinglePlank = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/planks/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(data);
      } else {
        reject(new Error('No data found for the given firebaseKey.'));
      }
    })
    .catch((error) => {
      console.error('Error fetching single plank:', error);
      reject(error);
    });
});

const viewPlankDetails = async (firebaseKey) => {
  try {
    const plankObj = await getSinglePlank(firebaseKey);
    if (plankObj.company_id) {
      const companyObj = await getSingleCompany(plankObj.company_id); // Fetch company data
      return { ...plankObj, companyObj }; // Combine plank and company data
    }
    return { ...plankObj, companyObj: null }; // Handle missing company
  } catch (error) {
    console.error('Error fetching plank details:', error);
    throw error;
  }
};

const deletePlank = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/planks/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => {
      console.error('Error deleting plank:', error);
      reject(error);
    });
});

// Create a new plank
const createPlank = (payload) => new Promise((resolve, reject) => {
  const payloadWithUid = { ...payload }; // Add uid to payload

  fetch(`${endpoint}/planks.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payloadWithUid),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => {
      console.error('Error creating plank:', error);
      reject(error);
    });
});

// Update an existing plank
const updatePlank = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/planks/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => {
      console.error('Error updating plank:', error);
      reject(error);
    });
});
const getPlanksByCompany = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/planks.json?orderBy="company_id"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
  getPlanks,
  viewPlankDetails,
  createPlank,
  deletePlank,
  getSinglePlank,
  updatePlank,
  getPlanksByCompany,
};
