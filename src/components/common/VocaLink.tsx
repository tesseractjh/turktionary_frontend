import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { Color } from '@emotion/react';
import { flex } from '@styles/minxin';
import pxToRem from '@utils/pxToRem';
import CircleXMarkIcon from '@assets/images/circle-xmark-regular.svg';

interface VocaLinkProps {
  langId: string;
  headword: string;
  vocaOrder: number;
  backgroundColor?: keyof Color;
  hoverBackgroundColor?: keyof Color;
  useDeleteButton?: boolean;
  handleDelete?: (voca: Model.Voca) => () => void;
}

const Container = styled.span`
  ${flex('normal', 'center', true)}
  height: ${pxToRem(30)};
`;

const Wrapper = styled.span<{
  backgroundColor?: keyof Color;
  hoverBackgroundColor?: keyof Color;
}>`
  ${flex('normal', 'center', true)}
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

const DeleteButton = styled.button`
  width: ${pxToRem(16)};
  height: ${pxToRem(16)};
  margin-left: ${pxToRem(8)};

  & svg {
    width: 100%;
    height: 100%;
    fill: ${({ theme }) => theme.color.WHITE};
  }
`;

function VocaLink({
  langId,
  headword,
  vocaOrder,
  backgroundColor,
  hoverBackgroundColor,
  useDeleteButton,
  handleDelete
}: VocaLinkProps) {
  return (
    <Container>
      <Wrapper
        backgroundColor={backgroundColor}
        hoverBackgroundColor={hoverBackgroundColor}
      >
        <Link to={`/${langId}/voca?word=${headword}&order=${vocaOrder}`}>
          {headword}
          {vocaOrder > 1 ? <sup>{vocaOrder}</sup> : null}
        </Link>
        {useDeleteButton ? (
          <DeleteButton
            type="button"
            onClick={handleDelete?.({
              lang_name: langId,
              headword,
              voca_order: vocaOrder
            } as Model.Voca)}
          >
            <CircleXMarkIcon />
          </DeleteButton>
        ) : null}
      </Wrapper>
    </Container>
  );
}

export default VocaLink;
