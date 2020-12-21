import styled from 'styled-components';

const TextBand = ({ children }) => (
  <StyledTextBand>{ children }</StyledTextBand>
);

export default TextBand;

const StyledTextBand = styled.h2`
  background-color: gold;
  border-bottom: 2px solid black;
  border-top: 2px solid black;
  clip-path: polygon(0% 0%, 100% 0%, 98% 50%, 100% 100%, 0% 100%, 2% 50%);
  display: inline;
  font-family: 'Lato', sans-serif;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.02em;
  padding: 16px 0;
  text-align: center;
  text-transform: uppercase;
  width: 100%;

  @media (min-width: 700px) {
    align-items: flex-end;
    display: flex;
    justify-content: center;
  }

  .large:first-of-type {
    display: block;
  }

  .large:last-of-type {
    font-size: 12px;

    @media (min-width: 700px) {
      font-size: 18px;
    }
  }
  
  .small {
    font-size: 12px;
    text-transform: none;
    margin: 0 0.35em;
    text-align: center;

    @media (min-width: 700px) {
      font-size: 75%;
    }
  }
`;
