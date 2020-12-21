import styled from 'styled-components';

const titleColorLight = `gold`;
const titleColorPrimary = `tomato`;
const titleColorDark = `#333`;
const hoverDistance = `0.25`;

const Title = ({ text, className }) => (
  <TitleContainer>
    <StyledTitle className={className} text={text}>{text}</StyledTitle>
  </TitleContainer>
);

const TitleContainer = styled.div`
  border-bottom: 2px solid black;
`;

const StyledTitle = styled.h1`
  color: ${titleColorDark};
  font-family: 'Martel', serif;
  font-size: 42px;
  font-weight: 900;
  letter-spacing: -2px;
  margin-bottom: 8px;
  position: relative;
  text-align: center;

  @media (min-width: 700px) {
    font-size: 96px;
  }

  &::before,
  &::after {
    content: "${props => props.text}";
    bottom: 0;
    font-size: 100%;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: all 150ms ease;
    z-index: -1;
  }

  &::before {
    color: ${titleColorPrimary};
    transform: translate(${hoverDistance * 0.75 + 'rem'}, ${hoverDistance * 0.75 + 'rem'});

    @media (min-width: 700px) {
      transform: translate(${hoverDistance + 'rem'}, ${hoverDistance + 'rem'});
    }
  }

  &::after {
    color: ${titleColorLight};
    transform: translate(-${hoverDistance * 0.75 + 'rem'}, -${hoverDistance * 0.75 + 'rem'});

    @media (min-width: 700px) {
      transform: translate(-${hoverDistance + 'rem'}, -${hoverDistance + 'rem'});
    }
  }
`;

export default Title;
