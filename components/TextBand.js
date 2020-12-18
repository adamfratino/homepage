import styled from 'styled-components';

const TextBand = ({ children }) => (
  <StyledTextBand>{ children }</StyledTextBand>
);

export default TextBand;

const StyledTextBand = styled.h2`
  align-items: center;
  background: gold;
  border: 2px solid black;
  border-top: none;
  border-top-width: 6px;
  display: flex;
  font-family: 'Lato', sans-serif;
  font-size: 18px;
  justify-content: center;
  letter-spacing: 0.05em;
  padding: 8px 0;
  text-transform: uppercase;
  width: 100%;
  
  span {
    font-size: 80%;
    text-transform: none;
    margin: 0 0.35em;
  }
`;
