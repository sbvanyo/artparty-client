import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { createArtist, updateArtist } from '../utils/data/artistData';

const initialState = {
  name: '',
  img: '',
  id: null,
};

// initialArtist is a prop passed in from artists/edit/[id].js, used for updating
const ArtistForm = ({ initialArtist, closeModal }) => {
  const router = useRouter();
  const { user } = useAuth();
  const [formInput, setFormInput] = useState(initialState);

  useEffect(() => {
    if (initialArtist) {
      setFormInput({
        name: initialArtist.name,
        img: initialArtist.img,
        id: initialArtist.id,
      });
    }
  }, [initialArtist]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const artist = {
        name: formInput.name,
        img: formInput.img,
        user: user.id,
      };

      if (formInput.id) { // Updating an existing artist
        await updateArtist(formInput.id, artist);
        router.push(`/artists/${formInput.id}`).then(() => router.reload(window.location.pathname));
      } else { // Creating a new artist
        const response = await createArtist(artist);
        if (response && response.id) {
          router.push(`/artists/${response.id}`);
        } else {
          throw new Error('Artist creation failed');
        }
      }

      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Artist Name</Form.Label>
          <Form.Control
            name="name"
            required
            value={formInput.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Artist Photo</Form.Label>
          <Form.Control
            name="img"
            required
            value={formInput.img}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

ArtistForm.propTypes = {
  initialArtist: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    img: PropTypes.string,
    user: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
  closeModal: PropTypes.func.isRequired,
};

ArtistForm.defaultProps = {
  initialArtist: initialState,
};

export default ArtistForm;
