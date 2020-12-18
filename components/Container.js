import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    filter: blur(200px);
    opacity: 0;
  }
  100% {
    filter: blur(0);
    opacity: 1;
  }
`;

const Container = styled.section`
  animation-delay: 250ms;
  animation-duration: 250ms;
  animation-fill-mode: forwards; 
  animation-name: ${fadeIn};
  display: inline-flex;
  filter: blur(200px);
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  opacity: 0;
  padding: 24px;
  transition: all 200ms ease;
  transition-delay: 250ms;
`;

export default Container;
