import React, { useMemo } from 'react';
import styled, { FlattenInterpolation, ThemeProps, DefaultTheme } from 'styled-components';

interface ContentProps {
  username?: boolean;
  hashtag?: boolean;
  css?: FlattenInterpolation<ThemeProps<DefaultTheme>>;
  font: { size: string; weight: string; color: string };
}
const Content = styled.span<ContentProps>`
  color: ${p => (p.username || p.hashtag ? p.theme.green : p.theme[p.font.color])};
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
                css={contentCss}
                font={font}
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
