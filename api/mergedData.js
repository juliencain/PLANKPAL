import { getSingleCompany, getCompanyPlanks } from './companyData';
// import { getSinglePlank } from './plankData';

// const viewPlankDetails = (plankFirebaseKey) => new Promise((resolve, reject) => {
//   getSinglePlank(plankFirebaseKey)
//     .then((plankObj) => {
//       getSingleCompany(plankObj.company_id)
//         .then((companyObj) => {
//           resolve({ companyObj, ...plankObj });
//         });
//     }).catch((error) => reject(error));
// });

const viewCompanyDetails = (companyFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleCompany(companyFirebaseKey), getCompanyPlanks(companyFirebaseKey)])
    .then(([companyObj, companyPlanksArray]) => {
      resolve({ ...companyObj, planks: companyPlanksArray });
    }).catch((error) => reject(error));
});

// eslint-disable-next-line import/prefer-default-export
// export { viewPlankDetails, viewCompanyDetails };
