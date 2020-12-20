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
`;

const StyledDescription = styled.p`
  font-family: 'Lato', sans-serif;
  line-height: 1.6;
  padding: 32px 16px 16px;
  max-width: 620px;
  display: inline-block;

  @media (max-width: 700px) {
    font-size: 14px;
    padding: 32px 0;
  }

  strong {
    font-weight: 600;
  }
`;
