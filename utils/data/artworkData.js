import { clientCredentials } from '../client';

const getArtworks = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/artworks`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getArtworksByArtist = (artistId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/artworks?artist=${artistId}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleArtwork = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/artworks/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createArtwork = (artwork) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/artworks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(artwork),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const updateArtwork = (id, postBody) => new Promise((resolve) => {
  fetch(`${clientCredentials.databaseURL}/artworks/${id}`, {
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
      console.error('Error updating artwork:', error);
      if (error.response) {
        console.error('Error response:', error.response);
      }
    });
});

const deleteArtwork = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/artworks/${id}`, {
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
  getArtworks,
  getArtworksByArtist,
  getSingleArtwork,
  createArtwork,
  updateArtwork,
  deleteArtwork,
};
