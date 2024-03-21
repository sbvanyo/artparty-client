// import { Button } from 'react-bootstrap';
// import { signOut } from '../utils/auth';
// import { useAuth } from '../utils/context/authContext';
import ArtistHome from './artists/artists';
import ArtworkHome from './artworks/artworks';

function Home() {
  // const { user } = useAuth();
  return (
    <>
      <div id="home-container">
        {/* <h3 id="greeting">Hello {user.name}!</h3> */}
        <div id="home-components-container">
          <div className="home-component">
            <ArtistHome />
          </div>
          <div className="home-component">
            <ArtworkHome />
          </div>

        </div>
      </div>
    </>
  );
}

export default Home;
