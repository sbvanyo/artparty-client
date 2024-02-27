import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
// import { createGame, getGameTypes, updateGame } from '../../utils/data/gameData';
import { createArtist, updateArtist } from '../utils/data/artistData';

const initialState = {
  name: '',
  img: '',
  id: null,
};

// initialGame is a prop passed in from games/[id].js
const ArtistForm = ({ initialArtist }) => {
  const router = useRouter();
  const { user } = useAuth();
  // const [gameTypes, setGameTypes] = useState([]);
  const [formInput, setFormInput] = useState(initialState);

  // useEffect(() => {
  //   console.warn(initialGame);
  //   console.warn(currentGame);
  //   // TODO: Get the game types, then set the state
  //   getGameTypes().then(setGameTypes);

  //   if (initialGame) {
  //     const formattedGame = {
  //       ...initialGame,
  //       gameTypeId: initialGame.gameType,
  //     };
  //     setCurrentGame(formattedGame);
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [initialGame]);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const artist = {
      name: formInput.name,
      img: formInput.img,
      user: user.id,
    };

    // Send POST request to your API
    if (initialArtist && initialArtist.id) {
      artist.id = initialArtist.id;
      updateArtist(formInput.id, artist).then(() => router.push(`/artists/${artist.id}`));
    } else {
      createArtist(artist).then((data) => {
        if (data && data.id) {
          console.warn(data);
          router.push(`/artists/${data.id}`);
        } else {
          console.error('Artist creation failed');
        }
      });
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
      uid: PropTypes.string,
    }),
  }),
};

ArtistForm.defaultProps = {
  initialArtist: initialState,
};

// ArtistForm.propTypes = {
// user: PropTypes.shape({
//   uid: PropTypes.string.isRequired,
// }).isRequired,
//   initialGame: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     maker: PropTypes.string.isRequired,
//     numberOfPlayers: PropTypes.number.isRequired,
//     skillLevel: PropTypes.number.isRequired,
//     id: PropTypes.number.isRequired,
//     gameType: PropTypes.number.isRequired,
//   }).isRequired,
//   // onUpdate: PropTypes.func.isRequired,
// };

// GameForm.defaultProps = {
//   initialGame: initialState,
// };

export default ArtistForm;
