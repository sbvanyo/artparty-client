import { clientCredentials } from '../client';

const getTags = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/tags`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleTag = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/tags/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export { getTags, getSingleTag };
