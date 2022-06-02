import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import SongDetail from './components/SongDetail'
import Upload from "./components/Upload";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SongList from "./components/SongList";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

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
          <Route path="/song/:songId">
            <SongDetail />
          </Route>
          <Route path="/upload">
            <Upload />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;