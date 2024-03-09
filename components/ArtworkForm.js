import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import 'firebase/storage';
import firebase from 'firebase/app';
import { useAuth } from '../utils/context/authContext';
import { getArtists } from '../utils/data/artistData';
import { createArtwork, updateArtwork } from '../utils/data/artworkData';
import { getTags } from '../utils/data/tagData';
import { addArtworkTag, removeArtworkTag } from '../utils/data/artworkTagData';

const initialState = {
  id: null,
  title: '',
  img: '',
  medium: '',
  description: '',
  date: '',
  age: 0,
  featured: false,
};

const ArtworkForm = ({ initialArtwork, closeModal }) => {
  const router = useRouter();
  const { user } = useAuth();
  const [artists, setArtists] = useState([]);
  const [formInput, setFormInput] = useState(initialState);
  const [tags, setTags] = useState([]);
  const [initialTags, setInitialTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');

  // fires when form loads, checks if this component has mounted (is created and inserted into DOM), and sets initial state for artists and tags with fetch calls if so
  useEffect(() => {
    let isMounted = true;
    getArtists().then((data) => { if (isMounted) setArtists(data); });
    getTags().then((data) => { if (isMounted) setTags(data); });
    console.warn(initialArtwork);

    // updating existing artwork - populates form with existing details, along with setting the dropdown input to the associated artist
    if (initialArtwork && initialArtwork.artist) {
      const formattedArtwork = {
        ...initialArtwork,
        artist: initialArtwork.artist.id,
      };
      setFormInput(formattedArtwork);
    }
    if (initialArtwork && initialArtwork.img) {
      const urlParts = initialArtwork.img.split('/');
      const name = urlParts[urlParts.length - 1]; // Extracts file name from end of URL

      setFileName(name);
    }
    // checks if artwork exists and if it has a tags array, then maps over each item in the array, destructuring each item to extract id (as artworkTagId) and further destructuring nested tag item(s) to extract its details, then constructs a new object (tagDetails) with this extracted info
    if (initialArtwork && initialArtwork.tags) {
      const tagDetails = initialArtwork.tags.map(({ id: artworkTagId, tag: { id: tagId, label } }) => ({
        artworkTagId,
        tagId,
        label,
      }));
      // both selectedTags and initialTags are set to the newly mapped tagDetails array - selectedTags tracks curent tag selection, and initialTags 'remembers' tags' original state when form was loaded
      setSelectedTags(tagDetails);
      setInitialTags(tagDetails);
    }

    return () => {
      isMounted = false;
    };
  }, [initialArtwork]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'img' && files.length > 0) {
      setFile(files[0]);
      setFileName(files[0].name);
    } else {
      let numValue = value;

      // If the field being changed is 'age', convert the value to a number
      if (name === 'age' && value !== '') {
        numValue = Number(value);
      }

      setFormInput((prevState) => ({
        ...prevState,
        [name]: numValue,
      }));
    }
  };

  const handleTagChange = (tagId, label) => {
    const isSelected = selectedTags.some(({ tagId: selectedTagId }) => selectedTagId === tagId);
    if (isSelected) {
      setSelectedTags(selectedTags.filter(({ tagId: selectedTagId }) => selectedTagId !== tagId));
    } else {
      setSelectedTags([...selectedTags, { tagId, label, artworkTagId: null }]);
    }
  };

  const manageTags = async (artworkId) => {
    const tagsToAdd = selectedTags.filter(({ artworkTagId }) => !artworkTagId).map(({ tagId }) => tagId);
    const tagsToRemove = initialTags.filter(({ artworkTagId }) => !selectedTags.some(({ artworkTagId: selectedArtworkTagId }) => artworkTagId === selectedArtworkTagId));

    const addPromises = tagsToAdd.map((tagId) => addArtworkTag(artworkId, tagId));
    const removePromises = tagsToRemove.map(({ artworkTagId }) => removeArtworkTag(artworkId, artworkTagId));

    try {
      await Promise.all([...addPromises, ...removePromises]);
      console.warn('Tags updated successfully');
    } catch (error) {
      console.error('Error updating tags:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let initialImg = formInput.img; // When updating, default to existing image if a new image is not selected for upload

    if (file) {
      const storage = firebase.storage();
      const storageRef = storage.ref(`images/${file.name}`);

      try {
        // Upload the file to Firebase Storage
        const snapshot = await storageRef.put(file);
        initialImg = await snapshot.ref.getDownloadURL(); // Get the URL of the uploaded file
      } catch (error) {
        console.error('Upload failed', error);
        return;
      }
    }

    // const userId = initialArtwork?.user?.id || null;

    // Artwork data structure for creation/update.
    const artworkData = {
      ...formInput,
      img: initialImg,
      user: user.id,
    };

    try {
      if (formInput.id) {
        // Updating existing artwork.
        await updateArtwork(artworkData.id, artworkData);
        await manageTags(artworkData.id); // Handle tag updates after the artwork update is successful.
        router.push(`/artworks/${artworkData.id}`).then(() => window.location.reload());
      } else {
        // Creating new artwork.
        const createdArtwork = await createArtwork(artworkData);
        if (createdArtwork && createdArtwork.id) {
          await manageTags(createdArtwork.id); // Handle tag updates after the artwork creation is successful.
          router.push(`/artworks/${createdArtwork.id}`);
        } else {
          throw new Error('Artwork creation failed');
        }
      }
      closeModal();
    } catch (error) {
      console.error('Error submitting artwork form:', error);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Artwork Title</Form.Label>
          <Form.Control
            name="title"
            required
            className="form-control"
            value={formInput.title}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Artwork Photo</Form.Label>
          <Form.Control
            name="img"
            required={!formInput.img} // Require file only if there's no existing image
            className="form-control"
            type="file"
            onChange={handleChange}
          />
          {fileName && <div className="mt-2">Initial file: {fileName}</div>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Medium</Form.Label>
          <Form.Control
            name="medium"
            required
            className="form-control"
            value={formInput.medium}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            required
            className="form-control"
            value={formInput.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Date Created</Form.Label>
          <Form.Control
            type="date"
            name="date"
            required
            className="form-control"
            value={formInput.date}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Age Created</Form.Label>
          <Form.Control
            name="age"
            required
            className="form-control"
            value={formInput.age}
            onChange={handleChange}
          />
        </Form.Group>

        {/* ARTIST SELECT  */}
        <FloatingLabel controlId="floatingSelect" label="artist" className="mb-3">
          <Form.Select
            aria-label="artist"
            name="artist"
            onChange={handleChange}
            className="mb-3"
            value={formInput.artist}
            required
          >
            <option value="">Select an Artist</option>
            {
              artists.map((artist) => (
                <option
                  key={artist.id}
                  value={artist.id}
                >
                  {artist.name}
                </option>
              ))
            }
          </Form.Select>
        </FloatingLabel>

        {/* TAGS */}
        <Form.Group className="mb-3">
          <Form.Label>Tags</Form.Label>
          <div>
            {tags.map((tag) => (
              <Form.Check
                key={tag.id}
                type="checkbox"
                id={`tag-${tag.id}`}
                label={tag.label}
                onChange={() => handleTagChange(tag.id, tag.label)}
                checked={selectedTags.some(({ tagId }) => tagId === tag.id)}
              />
            ))}
          </div>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

ArtworkForm.propTypes = {
  initialArtwork: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    img: PropTypes.string,
    medium: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
    age: PropTypes.number,
    featured: PropTypes.bool,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
      }),
    ),
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
    artist: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
  closeModal: PropTypes.func.isRequired,
};

ArtworkForm.defaultProps = {
  initialArtwork: initialState,
};

export default ArtworkForm;
