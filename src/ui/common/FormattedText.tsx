import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import styled, { FlattenInterpolation, ThemeProps, DefaultTheme } from 'styled-components';

interface ContentProps {
  username?: boolean;
  hashtag?: boolean;
  haslink?: boolean;
  css?: FlattenInterpolation<ThemeProps<DefaultTheme>>;
  font: { size: string; weight: string; color: string };
}
const Content = styled.span<ContentProps>`
  color: ${p => (p.username || p.hashtag || p.haslink ? p.theme.green : p.theme[p.font.color])};
  cursor: ${p => (p.username || p.hashtag || p.haslink ? 'pointer' : 'auto')};
  font-size: ${p => p.font.size};
  font-weight: ${p => p.font.weight};
  ${p => p.css};
`;

interface FormattedTextProps {
  content: string;
  contentCss?: FlattenInterpolation<ThemeProps<DefaultTheme>>;
  font?: { size: string; weight: string; color: string };
  maxWidth?: string;
  withoutBr?: boolean;
}

const FormattedText: React.FC<FormattedTextProps> = ({
  content,
  contentCss,
  font = { size: '18px', weight: 'bold', color: 'gray' },
  maxWidth,
  withoutBr,
}) => {
  const contentArray = useMemo(() => {
    const paragraph = content.split('\n').filter(text => text && text);
    return paragraph.map(text => text.split(' ')).filter(text => text && text);
  }, [content]);
  const router = useRouter();

  const validURL = str => {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i',
    ); // fragment locator
    return !!pattern.test(str);
  };

  const handleClick = (text: string) => {
    if (text.startsWith('@')) {
      router.push('/profile/[username]/[tab]', `/profile/${text.slice(1, text.length)}/media`, { shallow: true });
    } else if (validURL(text)) {
      if (text.startsWith('http')) window.open(text, '_blank');
      else window.open('https://' + text, '_blank');
    }
  };

  return (
    <>
      {contentArray.map((paragraph, index) => (
        <React.Fragment key={String(index)}>
          <p style={{ maxWidth }}>
            {index > 0 && !withoutBr && <br />}
            {paragraph.map((text, index) => (
              <Content
                key={String(index)}
                username={text.startsWith('@')}
                hashtag={text.startsWith('#')}
                haslink={validURL(text)}
                css={contentCss}
                font={font}
                onClick={() => handleClick(text)}
              >
                {text}{' '}
              </Content>
            ))}
          </p>
        </React.Fragment>
      ))}
    </>
  );
};

export default FormattedText;
