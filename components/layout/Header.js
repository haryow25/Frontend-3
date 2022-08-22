import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser } from '../../redux/actions/userActions';
import Link from 'next/link';

const Header = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.load);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const logoutHandler = () => {
    localStorage.clear();
    location.reload();
  };

  return (
    <div>
      <nav className="navbar row justify-content-center sticky-top">
        <div className="container">
          <div className="col-3 p-0">
            <div className="navbar-brand">
              <Link href="/">
                <img
                  style={{ cursor: 'pointer' }}
                  src="/img/goplay.png"
                  alt="Binar"
                  height="60px"
                />
              </Link>
              &nbsp; &nbsp;
              <Link href="/" className="navbrand">
                THE MOST FAVORITE GAME
              </Link>
            </div>
          </div>

          <Link href="/home">
            <a className="btn nav-links">HOME</a>
          </Link>
          <Link href="/game">
            <a className="btn nav-links">SEE MORE GAMES</a>
          </Link>
          <Link href="/">
            <a className="btn nav-links">NEWSLETTER</a>
          </Link>
          <Link href="/">
            <a className="btn nav-links">CONTACT</a>
          </Link>

          <div className="col-3 mt-3 mt-md-0 text-center">
            {user ? (
              <div className="ml-4 dropdown d-line">
                <a
                  className="btn dropdown-toggle mr-4"
                  id="dropDownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span>
                    {user && user.first_name} {user && user.last_name}
                  </span>
                </a>

                <div
                  className="dropdown-menu"
                  aria-labelledby="dropDownMenuButton"
                >
                  <Link href="/me/profile">
                    <a className="dropdown-item">Profile</a>
                  </Link>
                  <Link href="/">
                    <a className="dropdown-item" onClick={logoutHandler}>
                      Logout
                    </a>
                  </Link>
                </div>
              </div>
            ) : (
              loading && (
                <Link href="/login">
                  <a className="btn px-4 text-white login-header-btn float-right login-btn">
                    Login
                  </a>
                </Link>
              )
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
