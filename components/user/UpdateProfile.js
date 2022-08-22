import React, { useState, useEffect } from 'react';
import { UPDATE_PROFILE_RESET } from '../../redux/constants/userConstants';
import router, { useRouter } from 'next/router';

import { toast } from 'react-toastify';
import ButtonLoader from '../layout/ButtonLoader';
import Loader from '../layout/Loader';
import {
  clearErrors,
  loadUser,
  updateUser,
} from '../../redux/actions/userActions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [updateData, setUpdateData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
    bio: '',
    locatio: '',
    social_media_url: '',
    password: '',
  });

  const {
    first_name,
    last_name,
    email,
    username,
    password,
    bio,
    location,
    social_media_url,
  } = updateData;

  const { user: loadedUser, loading } = useSelector((state) => state.load);

  const {
    error,
    isUpdated,
    loading: updateLoading,
  } = useSelector((state) => state.update);

  useEffect(() => {
    
    if (loadedUser) {
      setUpdateData({
        first_name: loadedUser.first_name ?? "-",
        last_name: loadedUser.last_name ?? "-",
        email: loadedUser.email ?? "-",
        username: loadedUser.username ?? "-",
        password: loadedUser.password ?? "-",
        bio: loadedUser.bio ?? "-",
        location: loadedUser.loacation ?? "-",
        social_media_url: loadedUser.social_media_url ?? "-",
      });
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success(isUpdated);
      setTimeout(() => {
        router.push('/me/profile');
      }, 5500);
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [dispatch, isUpdated, error, loadedUser]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = {
      first_name,
      last_name,
      email,
      username,
      password,
      bio,
      location,
      social_media_url,
    };

    dispatch(updateUser(userData));
  };

  const onChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="update-background">
          <div className="update-bg-image">
            <div className="container container-fluid">
              <div className="row wrapper">
                <div className="col-10 col-lg-5 update-form">
                  <form className="shadow-lg" onSubmit={submitHandler}>
                    <h1 className="mb-3">Update Profile</h1>

                    <div className="form-group">
                      <label htmlFor="name_field">First Name</label>
                      <input
                        type="text"
                        id="name_field"
                        className="form-control"
                        name="first_name"
                        value={first_name}
                        onChange={onChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="name_field">Last Name</label>
                      <input
                        type="text"
                        id="name_field"
                        className="form-control"
                        name="last_name"
                        value={last_name}
                        onChange={onChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email_field">Email</label>
                      <input
                        type="email"
                        id="email_field"
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={onChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="name_field">Username</label>
                      <input
                        type="text"
                        id="name_field"
                        className="form-control"
                        name="username"
                        value={username}
                        onChange={onChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="name_field">Bio</label>
                      <input
                        type="text"
                        id="name_field"
                        className="form-control"
                        name="bio"
                        value={bio}
                        onChange={onChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="name_field">Location</label>
                      <input
                        type="text"
                        id="name_field"
                        className="form-control"
                        name="location"
                        value={location}
                        onChange={onChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="name_field">Social Media</label>
                      <input
                        type="text"
                        id="name_field"
                        className="form-control"
                        name="social_media_url"
                        value={social_media_url}
                        onChange={onChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="password_field">Password</label>
                      <input
                        type="password"
                        id="password_field"
                        className="form-control"
                        name="password"
                        onChange={onChange}
                      />
                    </div>

                    <button
                      id="login_button"
                      type="submit"
                      className="btn btn-block py-3"
                      disabled={updateLoading ? true : false}
                    >
                      {updateLoading ? <ButtonLoader /> : 'UPDATE'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateProfile;
