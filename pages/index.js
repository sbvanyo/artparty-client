// import { Button } from 'react-bootstrap';
// import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import ArtistHome from './artists/artists';

function Home() {
  const { user } = useAuth();
  return (
    <>
      <div id="home-container">
        <div id="greeting">
          <h3>Hello {user.fbUser.displayName}!</h3>
        </div>
        <div id="home-components">
          <ArtistHome />
        </div>
      </div>
    </>
  );
}

export default Home;
