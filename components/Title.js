import styled from 'styled-components';

const titleColorLight = `gold`;
const titleColorPrimary = `tomato`;
const titleColorDark = `#333`;
const hoverDistance = `0.25rem`;

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
  font-size: 96px;
  font-weight: 900;
  position: relative;

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
    transform: translate(${hoverDistance}, ${hoverDistance});
  }

  &::after {
    color: ${titleColorLight};
    transform: translate(-${hoverDistance}, -${hoverDistance});
  }
`;

export default Title;
