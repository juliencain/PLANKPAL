import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getCompanies = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/companies.json`, {
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
    .catch(reject);
});

const getSingleCompany = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/companies/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getCompanyPlanks = (firebaseKey) => new Promise((resolve, reject) => {
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

const viewCompanyDetails = (companyFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleCompany(companyFirebaseKey), getCompanyPlanks(companyFirebaseKey)])
    .then(([companyObj, companyPlanksArray]) => {
      resolve({ ...companyObj, planks: companyPlanksArray });
    }).catch((error) => reject(error));
});

export {
  getCompanies,
  getSingleCompany,
  getCompanyPlanks,
  viewCompanyDetails,
};
