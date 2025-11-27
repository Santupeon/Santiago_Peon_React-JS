import React from 'react';
import { Helmet } from 'react-helmet-async';

const PageTitle = ({ title }) => {
  const defaultTitle = 'Tienda VR';
  const pageTitle = title ? `${title} - ${defaultTitle}` : defaultTitle;

  return (
    <Helmet>
      <title>{pageTitle}</title>
    </Helmet>
  );
};

export default PageTitle;