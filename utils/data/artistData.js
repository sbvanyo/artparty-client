import { clientCredentials } from '../client';

const getArtists = (uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/artists?uid=${uid}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleArtist = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/artists/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createArtist = (artist) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/artists`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(artist),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateArtist = (id, postBody) => new Promise((resolve) => {
  fetch(`${clientCredentials.databaseURL}/artists/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postBody),
  })
    .then((response) => {
      if (response.ok && response.status !== 204) {
        return response.json();
      }
      return null;
    })
    .then((data) => resolve(data))
    .catch((error) => {
      console.error('Error updating artist:', error);
      if (error.response) {
        console.error('Error response:', error.response);
      }
    });
});

const deleteArtist = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/artists/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.ok && response.status !== 204) {
        return response.json();
      } if (response.ok) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    })
    .then((data) => resolve((data)))
    .catch(reject);
});

// eslint-disable-next-line import/prefer-default-export
export {
  getArtists,
  getSingleArtist,
  createArtist,
  updateArtist,
  deleteArtist,
};
