import React from 'react';
import { NextSeo } from 'next-seo';

interface Props {
  title?: string;
  description?: string;
  image?: string;
}

const Seo: React.FC<Props> = ({ description = ``, title, image = `` }) => {
  const metaTitle = title || 'Karma';
  const metaDescription =
    description || 'KARMA is a social network designed for those who create the value, to actually earn it. ';

  return (
    <NextSeo
      title={metaTitle}
      description={metaDescription}
      additionalMetaTags={[
        {
          property: 'og:url',
          content: 'https://web-karma.now.sh/',
        },
        {
          property: 'og:image',
          content: image,
        },
        {
          property: 'og:image:ulr',
          content: image,
        },
        {
          property: 'og:image:secure_url',
          content: image,
        },
      ]}
      twitter={{
        site: 'https://web-karma.now.sh/',
        cardType: 'summary',
      }}
    />
  );
};

export default Seo;
