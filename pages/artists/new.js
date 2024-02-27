import ArtistForm from '../../components/ArtistForm';
import { useAuth } from '../../utils/context/authContext';

const NewArtist = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2>Add New Artist</h2>
      <ArtistForm
        user={user}
      />
    </div>
  );
};

export default NewArtist;
