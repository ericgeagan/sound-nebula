import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import SongDetail from './components/SongDetail'
import Upload from "./components/Upload";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SongList from "./components/SongList";
import SongDetailEdit from "./components/SongDetailEdit";
import MusicPlayer from "./components/MusicPlayer";
import './index.css'
import Playlists from "./components/Playlists";
import PlaylistDetail from "./components/PlaylistDetail";
import { getComments, getSong } from "./store/song";
import { getPlaylistThunk } from "./store/playlist";
import { getPlaylistSongsThunk } from "./store/playlistSong";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      await dispatch(getSong()) // Should change this to getOneSong
      await dispatch(getPlaylistThunk())
      await dispatch(getPlaylistSongsThunk())
    })()
  }, [dispatch])

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <SongList />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/songs/:songId">
            <SongDetail />
          </Route>
          <Route path="/songs/:songId/edit">
            <SongDetailEdit />
          </Route>
          <Route path="/upload">
            <Upload />
          </Route>
          <Route exact path='/playlists'>
            <Playlists />
          </Route>
          <Route path ='/playlists/:playlistId'>
            <PlaylistDetail />
          </Route>
          <Route >
            <h1 className="notfound">404 Page Not Found.</h1>
          </Route>
        </Switch>
      )}
      <MusicPlayer />
      {/* <footer>
        <a href="https://www.flaticon.com/free-icons/nebula" title="nebula icons">Nebula icons created by Freepik - Flaticon</a>
      </footer> */}
    </>
  );
}

export default App;