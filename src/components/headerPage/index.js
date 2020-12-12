import React from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { isUserAuthenticated, deleteCookie } from '../../utils/cookie';

const Header = () => {
  const listMenu = ['home', 'profile', 'contact', 'infoCorona'];
  const logoutClicked = () => {
    swal({
      title: 'Apakah anda ingin keluar?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willLogout) => {
      if (willLogout) {
        deleteCookie('userData');
        deleteCookie('token');
        window.location.replace('/');
      }
    });
  };
  const menuUserAuthenticated = () => {
    console.log(isUserAuthenticated());
    if (isUserAuthenticated()) {
      return (
        <>
          <Link to="/product">
            <div className="menu">product</div>
          </Link>
          <div
            className="menu"
            style={{ cursor: 'pointer', color: 'white' }}
            onClick={() => {
              logoutClicked();
            }}
          >
            logout
          </div>
        </>
      );
    }
    return '';
  };
  return (
    <div className="header">
      {listMenu.map((name) => {
        return (
          <Link to={`/${name}`} key={name}>
            <div className="menu">{name}</div>
          </Link>
        );
      })}
      {menuUserAuthenticated()}
    </div>
  );
};
export default Header;
