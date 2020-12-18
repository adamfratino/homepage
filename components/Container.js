import styled from 'styled-components';

const Container = styled.section`
  display: inline-flex;
  filter: blur(200px);
  flex-direction: column;
  height: 100vh;
  transition-delay: 200ms;
  justify-content: center;
  opacity: 0;
  padding: 24px;
  transition: all 200ms linear;

  &.is-loaded {
    filter: blur(0);
    opacity: 1;
  }
`;

export default Container;
