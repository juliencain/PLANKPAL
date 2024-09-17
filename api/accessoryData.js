import { clientCredentials } from "../utils/client";

const endpoint = clientCredentials.databaseURL;


const getAccessories = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/accessories.json?`, {
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
      console.error('Error fetching accessories:', error);
       reject(error);
    });
});


const viewAccessoryDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleAccessory(firebaseKey)
    .then((accessoryObj) => {
      if (accessoryObj) {
        resolve({ 
          ...accessoryObj
        });
      } else {
        reject(new Error('No data found for the given firebaseKey.'));
      }
    })
    .catch((error) => {
      console.error('Error fetching accessory details:', error);
      reject(error);
    });
});


const deleteAccessory = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/accessories/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => {
      console.error('Error deleting accessory:', error);
      reject(error);
    });
});


const getSingleAccessory = (firebaseKey) => new Promise((resolve, reject) => {
    fetch(`${endpoint}/accessories/${firebaseKey}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => {
        console.error('Error fetching single accessory:', error);
        reject(error);
      });
  });
  


const createAccessory = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/accessories.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => {
      console.error('Error creating accessory:', error);
      reject(error);
    });
});


const updateAccessory = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/accessories/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => {
      console.error('Error updating accessory:', error);
      reject(error);
    });
});

export {
  getAccessories,
  viewAccessoryDetails,
  createAccessory,
  deleteAccessory,
  getSingleAccessory,
  updateAccessory,
};
