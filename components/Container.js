import styled from 'styled-components';

const Container = styled.section`
  display: inline-flex;
  filter: blur(${props => props.isLoaded ? 0 : `200px`});
  flex-direction: column;
  justify-content: center;
  opacity: ${props => props.isLoaded ? 1 : 0};
  padding: 24px;
  transition: all 750ms ease;
  transition-delay: 200ms;
`;

export default Container;
