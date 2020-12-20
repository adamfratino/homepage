import styled from 'styled-components';

const Main = styled.main`
  align-content: center;
  font-family: 'Lato', sans-serif;
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100vw;

  @media (max-width: 700px) {
    height: auto;
  }
`;

export default Main;
