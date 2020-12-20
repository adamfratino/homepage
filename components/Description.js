import styled from 'styled-components';

const Description = ({ children }) => (
  <DescriptionContainer>
    <StyledDescription>{children}</StyledDescription>
  </DescriptionContainer>
);

export default Description;

const DescriptionContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const StyledDescription = styled.p`
  font-family: 'Lato', sans-serif;
  line-height: 1.6;
  padding: 16px;
  max-width: 625px;
  display: inline-block;
  width: 100%;

  strong {
    font-weight: 600;
  }
`;
