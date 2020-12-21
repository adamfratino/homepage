import styled from 'styled-components';

const Contact = ({ children }) => (
  <StyledContact>{children}</StyledContact>
);

export default Contact;

const StyledContact = styled.p`
  display: inline-block;
  font-family: 'Lato', sans-serif;
  font-size: 14px;
  line-height: 1.6;
  max-width: 625px;
  padding: 0 0 32px;
  width: 100%;

  @media (min-width: 700px) {
    font-size: initial;
    padding: 0 16px 32px;
  }

  a {
    color: black;
    font-weight: 600;
    text-decoration: underline;

    &:hover {
      background-color: gold;
    }
  }
`;
