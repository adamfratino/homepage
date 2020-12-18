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
  padding-bottom: 4px;
`;

const StyledTitle = styled.h1`
  color: ${titleColorDark};
  font-family: 'Lato', serif;
  font-size: 96px;
  position: relative;

  &::before,
  &::after {
    content: "${props => props.text}";
    bottom: 0;
    font-size: 100%;
    left: 0;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: all 150ms ease;
    z-index: -1;
  }

  &::before {
    color: ${titleColorPrimary};
  }

  &::after {
    color: ${titleColorLight};
    
  }

  &.is-active {
    &::before,
    &::after {
      opacity: 1;
    }

    &::before {
      transform: translate(${hoverDistance}, ${hoverDistance});
    }

    &::after {
      transform: translate(-${hoverDistance}, -${hoverDistance});
    }
  }
`;

export default Title;
