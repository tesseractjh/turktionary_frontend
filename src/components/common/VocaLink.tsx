import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { Color } from '@emotion/react';
import pxToRem from '@utils/pxToRem';

interface VocaLinkProps {
  langId: string;
  headword: string;
  vocaOrder: number;
  backgroundColor?: keyof Color;
  hoverBackgroundColor?: keyof Color;
}

const Wrapper = styled.span<{
  backgroundColor?: keyof Color;
  hoverBackgroundColor?: keyof Color;
}>`
  padding: ${pxToRem(4, 6)};
  border-radius: ${pxToRem(4)};
  background-color: ${({ backgroundColor, theme }) =>
    theme.color[backgroundColor ?? 'BROWN_DARK']};
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.color.WHITE};

  & sup {
    font-size: ${({ theme }) => theme.fontSize.custom('xs', -2)};
    vertical-align: super;
  }

  &:hover {
    background-color: ${({ hoverBackgroundColor, theme }) =>
      theme.color[hoverBackgroundColor ?? 'BROWN']};
  }

  @media ${({ theme }) => theme.media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xs};

    & sup {
      font-size: ${({ theme }) => theme.fontSize.custom('xs', -4)};
    }
  }
`;

function VocaLink({
  langId,
  headword,
  vocaOrder,
  backgroundColor,
  hoverBackgroundColor
}: VocaLinkProps) {
  return (
    <Link to={`/${langId}/voca?word=${headword}&order=${vocaOrder}`}>
      <Wrapper
        backgroundColor={backgroundColor}
        hoverBackgroundColor={hoverBackgroundColor}
      >
        {headword}
        {vocaOrder > 1 ? <sup>{vocaOrder}</sup> : null}
      </Wrapper>
    </Link>
  );
}

export default VocaLink;
