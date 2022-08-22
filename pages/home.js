import React from 'react';

import Home from '../components/Home';
import Layout from '../components/layout/Layout';
import withAuth from '../HOC/withAuth';

const HomePage = () => {
  return (
    <Layout title="Profile Details">
      <Home />
    </Layout>
  );
};

export default withAuth(HomePage);
