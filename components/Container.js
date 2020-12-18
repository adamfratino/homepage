import styled from 'styled-components';

const Container = styled.section`
  display: inline-flex;
  filter: blur(200px);
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  opacity: 0;
  padding: 24px;
  transition: all 200ms ease;
  transition-delay: 250ms;

  &.is-loaded {
    filter: blur(0);
    opacity: 1;
  }
`;

export default Container;
