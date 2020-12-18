import styled from 'styled-components';

const Container = styled.section`
  align-items: center;
  display: inline-flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  padding: 24px;
  transition: all 250ms linear;
  transition-delay: 200ms;

  &.is-loaded {
    filter: blur(0);
    opacity: 1;
  }
`;

export default Container;
