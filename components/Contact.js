import styled from 'styled-components';

const Contact = ({ children }) => (
  <ContactContainer>
    <StyledContact>{children}</StyledContact>
  </ContactContainer>
);

export default Contact;

const ContactContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const StyledContact = styled.p`
  font-family: 'Lato', sans-serif;
  line-height: 1.6;
  padding: 0 16px 32px;
  max-width: 625px;
  display: inline-block;
  width: 100%;

  @media (max-width: 700px) {
    font-size: 14px;
    padding: 32px 0;
  }

  a {
    color: black;
    font-weight: 600;
    text-decoration: underline;

    &:hover {
      background-color: gold;
    }
  }

  .wave {
    margin-left: 8px;
  }
`;
