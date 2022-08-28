import styled from 'styled-components'

const Description = ({ children }) => <StyledDescription>{children}</StyledDescription>

export default Description

const StyledDescription = styled.p`
  font-family: 'Lato', sans-serif;
  font-size: 14px;
  line-height: 1.6;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 675px;

  @media (min-width: 700px) {
    font-size: initial;
    padding: 32px 16px 16px;
  }

  strong {
    font-weight: 600;
  }
`
