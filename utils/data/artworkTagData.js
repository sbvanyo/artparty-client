import { clientCredentials } from '../client';

const getArtworkTags = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/artworktags`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleArtworkTag = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/artworktags/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const addArtworkTag = (artworkId, tagId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/artworks/${artworkId}/add_artwork_tag`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ tag: tagId }),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const removeArtworkTag = (artworkId, artworkTagId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/artworks/${artworkId}/remove_artwork_tag`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ artwork_tag: artworkTagId }),
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
  getArtworkTags,
  getSingleArtworkTag,
  addArtworkTag,
  removeArtworkTag,
};
