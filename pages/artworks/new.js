import ArtworkForm from '../../components/ArtworkForm';
import { useAuth } from '../../utils/context/authContext';

const NewArtwork = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2>Add New Artwork</h2>
      <ArtworkForm
        user={user}
      />
    </div>
  );
};

export default NewArtwork;
