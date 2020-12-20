import styled from 'styled-components';

const TextBand = ({ children }) => (
  <StyledTextBand>{ children }</StyledTextBand>
);

export default TextBand;

const StyledTextBand = styled.h2`
  align-items: center;
  border-bottom: 2px solid black;
  border-top-width: 6px;
  display: flex;
  font-family: 'Lato', sans-serif;
  font-size: 18px;
  justify-content: center;
  letter-spacing: 0.05em;
  padding: 16px 0;
  text-transform: uppercase;
  width: 100%;

  @media (max-width: 700px) {
    display: inline;

    .large:first-of-type {
      display: block;
    }

    .large:last-of-type {
      font-size: 12px;
    }
  }
  
  .small {
    font-size: 75%;
    text-transform: none;
    margin: 0 0.35em;

    @media (max-width: 700px) {
      font-size: 12px;
      margin-left: 0;
      text-transform: uppercase;
    }
  }
`;
