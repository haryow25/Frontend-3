import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const ResetPassword = ({ props }) => {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [errorNewPassword, setErrorNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
  const [errorDoesntMatch, setErrorDoesntMatch] = useState('');

  const changeNewPassword = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    if (!value) {
      setErrorNewPassword('New Password cannot be empty');
    } else {
      setErrorNewPassword('');
    }
  };

  const changeConfirmPassword = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (!value) {
      setErrorConfirmPassword('Confirm password cannot be empty');
    } else {
      setErrorConfirmPassword('');
    }

    if (newPassword !== value) {
      setErrorDoesntMatch("Password doesn't match");
    } else if (newPassword === value) {
      toast.success('The password is matched');
      setErrorDoesntMatch('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        newPassword,
        token: router.query.token,
      };
      const result = await axios.put(`${apiUrl}/resetPassword`, data);
      if (result) {
        setNewPassword('');
        setConfirmPassword('');
        toast.success(result.data.message);
        setTimeout(() => {
          router.push('/login');
        }, 5500);
      }
    } catch (error) {
      console.log(error.reposne);
    }
  };

  return (
    <div className="auth-background">
      <div className="container container-fluid">
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form className="shadow-lg reset" onSubmit={handleSubmit}>
              <h1 className="mb-3" style={{ textAlign: 'center' }}>
                Reset Password
              </h1>
              {errorDoesntMatch && (
                <p className="text-danger">{errorDoesntMatch}</p>
              )}
              <div className="form-group">
                <label htmlFor="password_field">New Password</label>
                {errorNewPassword && (
                  <p className="text-danger">{errorNewPassword}</p>
                )}
                <input
                  type="password"
                  id="password_field"
                  className="form-control"
                  name="password"
                  value={newPassword}
                  placeholder="Enter a new password..."
                  onChange={changeNewPassword}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password_field">Confirm Password</label>
                {errorConfirmPassword && (
                  <p className="text-danger">{errorConfirmPassword}</p>
                )}
                <input
                  type="password"
                  id="password_field"
                  className="form-control"
                  name="password"
                  value={confirmPassword}
                  placeholder="Enter a confirm password..."
                  onChange={changeConfirmPassword}
                />
              </div>

              <button
                id="login_button"
                className="btn btn-block py-3"
                style={{ marginBottom: '10px' }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
