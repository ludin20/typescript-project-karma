import React from 'react';
import Helmet from 'react-helmet';

import { APP_URL } from '../../common/config';

interface Props {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

const SEO: React.FC<Props> = ({ description = '', url, title, image }) => {
  const metaTitle = title || 'Karma';
  const metaDescription =
    description || 'KARMA is a social network designed for those who create the value, to actually earn it. ';

  return (
    <Helmet
      title={metaTitle}
      meta={[
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: `https://${APP_URL}${url}` },
        { property: 'og:title', content: metaTitle },
        { property: 'og:description', content: metaDescription },
        { property: 'og:image', content: image || `https://${APP_URL}/logo.png` },
        { property: 'og:image:url', content: image || `https://${APP_URL}/logo.png` },
        { property: 'og:image:secure_url', content: image || `https://${APP_URL}/logo.png` },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:domain', content: APP_URL },
      ]}
    />
  );
};

export default SEO;
