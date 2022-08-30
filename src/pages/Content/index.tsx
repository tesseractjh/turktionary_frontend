import InnerContainer from '@components/common/InnerContainer';
import styled from '@emotion/styled';
import pxToRem from '@utils/pxToRem';
import { Route, Routes } from 'react-router-dom';
import Dictionary from './Dictionary';

const Container = styled.section`
  padding: ${pxToRem(80, 0)};
`;

function Content() {
  return (
    <Container>
      <InnerContainer>
        <Routes>
          <Route path="/" element={<Dictionary type="ALL" />} />
          <Route path="/turkish" element={<Dictionary type="TR" />} />
          <Route path="/azerbaijani" element={<Dictionary type="AZ" />} />
          <Route path="/uzbek" element={<Dictionary type="UZ" />} />
          <Route path="/kazakh" element={<Dictionary type="KZ" />} />
          <Route path="/turkmen" element={<Dictionary type="TM" />} />
          <Route path="/kyrgyz" element={<Dictionary type="KG" />} />
          <Route path="/*" element={<div>Not Found</div>} />
        </Routes>
      </InnerContainer>
    </Container>
  );
}

export default Content;
