import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import 'firebase/storage';
import firebase from 'firebase/app';
import { useAuth } from '../utils/context/authContext';
import { createArtist, updateArtist } from '../utils/data/artistData';

const initialState = {
  name: '',
  img: '',
  id: null,
};

const ArtistForm = ({ initialArtist, closeModal }) => {
  const router = useRouter();
  const { user } = useAuth();
  const [formInput, setFormInput] = useState(initialState);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    if (initialArtist) {
      console.warn(initialArtist);
      const urlParts = initialArtist.img.split('/');
      const name = urlParts[urlParts.length - 1]; // Assuming the file name is the last part of the URL

      setFormInput({
        name: initialArtist.name,
        img: initialArtist.img,
        id: initialArtist.id,
      });

      setFileName(name); // Set extracted file name
    }
  }, [initialArtist]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'img' && files.length > 0) {
      setFile(files[0]);
      setFileName(files[0].name);
    } else {
      setFormInput((prevState) => ({
        ...prevState,
        [name]: value,
      }));
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

    const artist = {
      name: formInput.name,
      img: initialImg,
      user: user.id,
    };

    try {
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
      console.error('Failed to save Artist', error);
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
            required={!formInput.img} // Require file only if there's no existing image
            type="file"
            onChange={handleChange}
          />
          {fileName && <div className="mt-2">Initial file: {fileName}</div>}
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
    user: PropTypes.number,
    // user: PropTypes.shape({
    //   id: PropTypes.number,
    // }),
  }),
  closeModal: PropTypes.func.isRequired,
};

ArtistForm.defaultProps = {
  initialArtist: initialState,
};

export default ArtistForm;
