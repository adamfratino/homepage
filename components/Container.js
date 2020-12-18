import styled from 'styled-components';

const Container = styled.section`
  display: inline-flex;
  filter: blur(${props => props.isLoaded ? 0 : `200px`});
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  opacity: ${props => props.isLoaded ? 1 : 0};
  padding: 24px;
  transition: all 250ms ease;
  transition-delay: 100ms;
`;

export default Container;
