import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
// import { useAuth } from '../utils/context/authContext';
// import { createGame, getGameTypes, updateGame } from '../../utils/data/gameData';
import { getArtists } from '../utils/data/artistData';
import { createArtwork, updateArtwork } from '../utils/data/artworkData';
import { getTags } from '../utils/data/tagData';

const initialState = {
  id: null,
  title: '',
  img: '',
  medium: '',
  description: '',
  date: '',
  age: '',
  featured: false,
};

// initialArtwork is a prop passed in from artworks/edit/[id].js, used for updating
// eslint-disable-next-line react/prop-types
const ArtworkForm = ({ initialArtwork, user }) => {
  const router = useRouter();
  // const user = useAuth();
  const [artists, setArtists] = useState([]);
  const [formInput, setFormInput] = useState(initialState);
  const [tags, setTags] = useState([]); // For storing fetched tags
  const [selectedTags, setSelectedTags] = useState([]); // For storing selected tags

  useEffect(() => {
    getArtists().then(setArtists);
    getTags().then(setTags);

    if (initialArtwork) {
      const formattedArtwork = {
        ...initialArtwork,
        artist: initialArtwork.artist,
      };
      setFormInput(formattedArtwork);

      if (initialArtwork.tags && Array.isArray(initialArtwork.tags)) {
        // eslint-disable-next-line react/prop-types
        const tagIds = initialArtwork.tags.map((tag) => tag.id);
        setSelectedTags(tagIds);
      } else {
        setSelectedTags([]);
      }
    }
  }, [initialArtwork]);

  // useEffect(() => {
  //   if (initialArtwork) {
  //     setFormInput({
  //       id: initialArtwork.id,
  //       title: initialArtwork.title,
  //       img: initialArtwork.img,
  //       medium: initialArtwork.medium,
  //       description: initialArtwork.description,
  //       date: initialArtwork.date,
  //       age: initialArtwork.age,
  //       featured: initialArtwork.featured,
  //     });
  //   }
  // }, [initialArtwork]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTagChange = (tagId) => {
    if (selectedTags.includes(tagId)) {
      // Remove the tag from the array if it is already included
      setSelectedTags(selectedTags.filter((id) => id !== tagId));
    } else {
      // Add the tag to the array if it is not included
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const artwork = {
      ...formInput,
      // eslint-disable-next-line react/prop-types
      user: user.id,
      tags: selectedTags,
    };
    console.warn(artwork);

    // Send POST request to your API
    if (initialArtwork && initialArtwork.id) {
      artwork.id = initialArtwork.id;
      updateArtwork(artwork.id, artwork).then(() => router.push(`/artworks/${artwork.id}`));
    } else {
      createArtwork(artwork).then((data) => {
        if (data && data.id) {
          router.push(`/artworks/${data.id}`);
        } else {
          console.error('Artwork creation failed');
        }
      });
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
            required
            className="form-control"
            value={formInput.img}
            onChange={handleChange}
          />
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

        {/* <Form.Group className="mb-3">
          <Form.Label>Featured?</Form.Label>
          <Form.Control
            name="featured"
            required
            className="form-control"
            value={formInput.featured}
            onChange={handleChange}
          />
        </Form.Group> */}

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
                onChange={() => handleTagChange(tag.id)}
                checked={selectedTags.includes(tag.id)}
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
    tags: PropTypes.shape({
      label: PropTypes.string,
    }),
    user: PropTypes.shape({
      id: PropTypes.number,
    }),
    artist: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
};

ArtworkForm.defaultProps = {
  initialArtwork: initialState,
};

export default ArtworkForm;
