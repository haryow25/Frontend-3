import React from 'react';

import DetailsProfile from '../../components/user/DetailsProfile';
import Layout from '../../components/layout/Layout';
import withAuth from '../../HOC/withAuth';

const DetailsProfilePage = () => {
  return (
    <Layout title="Profile Details">
      <DetailsProfile />
    </Layout>
  );
};

export default withAuth(DetailsProfilePage);
