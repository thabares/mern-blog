import styled from 'styled-components';
import Header from '../components/Header';

const EmptyWrapper = styled.section`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #bf4f74;

  h5 {
    text-decoration: underline;
    font-weight: 800;
  }
`;

const PageNotFound = () => {
  return (
    <>
      <Header />
      <EmptyWrapper>
        <h5>404 Not found</h5>
      </EmptyWrapper>
    </>
  );
};
export default PageNotFound;
