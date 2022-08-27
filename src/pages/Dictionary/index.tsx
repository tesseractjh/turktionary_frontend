import InnerContainer from '@components/common/InnerContainer';
import styled from '@emotion/styled';
import pxToRem from '@utils/pxToRem';
import { Route, Routes } from 'react-router-dom';
import DictContent from './DictContent';

const Container = styled.section`
  padding: ${pxToRem(80, 0)};
`;

function Dictionary() {
  return (
    <Container>
      <InnerContainer>
        <Routes>
          <Route path="/" element={<DictContent type="ALL" />} />
          <Route path="/turkish" element={<DictContent type="TR" />} />
          <Route path="/azerbaijani" element={<DictContent type="AZ" />} />
          <Route path="/uzbek" element={<DictContent type="UZ" />} />
          <Route path="/kazakh" element={<DictContent type="KZ" />} />
          <Route path="/turkmen" element={<DictContent type="TM" />} />
          <Route path="/kyrgyz" element={<DictContent type="KG" />} />
          <Route path="/*" element={<div>Not Found</div>} />
        </Routes>
      </InnerContainer>
    </Container>
  );
}

export default Dictionary;
