import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li className='upload'>
        <NavLink className='navlink upload' to='/upload'>Upload</NavLink>
        <ProfileButton user={sessionUser} />
      </li>
    );
  } else {
    sessionLinks = (
      <li className='upload'>
        <LoginFormModal />
        <NavLink className='navlink signup' to="/signup">Sign Up</NavLink>
      </li>
    );
  }

  return (
    <ul className='navbar'>
      <li className='upload'>
        <img className='icon' src='/icons/nebula.png'></img>
        <NavLink className='navlink home' exact to="/">SoundNebula</NavLink>
      </li>
      <li>
      </li>
      <li></li>
      <li></li>
      <li className='upload'>
        <NavLink className='navlink' exact to='/playlists'>Playlists</NavLink>
      </li>
      {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;