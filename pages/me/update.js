import React from 'react';

import UpdateProfile from '../../components/user/UpdateProfile';
import Layout from '../../components/layout/Layout';
import withAuth from '../../HOC/withAuth';

const UpdateProfilePage = () => {
  return (
    <Layout title="Update Profile">
      <UpdateProfile />
    </Layout>
  );
};

export default withAuth(UpdateProfilePage);
