import { Route, Routes, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { flex } from '@styles/minxin';
import pxToRem from '@utils/pxToRem';
import InnerContainer from '@components/common/InnerContainer';
import VocaCounter from './VocaCounter';
import POS from './POS';
import Vocabulary from './Vocabulary';
import Search from './Search';

interface DictionaryProps {
  type: DictionaryType;
}

const ContentContainer = styled.section`
  ${flex('center', 'stretch')};
  flex: 1;
  padding: ${pxToRem(10, 0)};
  background-color: ${({ theme }) => theme.color.GRAY_LIGHT};

  & > * {
    width: 100%;
  }

  @media ${({ theme }) => theme.media.mobile} {
    padding: 0;
  }
`;

function Dictionary({ type }: DictionaryProps) {
  const { pathname } = useLocation();

  return (
    <>
      <Search type={type} />
      <ContentContainer>
        <InnerContainer mobileNoPadding>
          <Routes>
            <Route index element={<VocaCounter pathname={pathname} />} />
            <Route path="pos/*" element={<POS />} />
            <Route path="voca/*" element={<Vocabulary />} />
          </Routes>
        </InnerContainer>
      </ContentContainer>
    </>
  );
}

export default Dictionary;
