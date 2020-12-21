import styled from 'styled-components';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faCodepen, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-regular-svg-icons';

const LinkGroup = () => (
  <StyledLinkGroup>
    <li>
      <Link href="//github.com/adamfratino" target="_blank" rel="nofollow">
        <Icon icon={faGithub} />
        <span>Github</span>
      </Link>
    </li>
    <li>
      <Link href="//codepen.io/adamfratino" target="_blank" rel="nofollow">
        <Icon icon={faCodepen} />
        <span>CodePen</span>
      </Link>
    </li>
    <li>
      <Link href="//cargocollective.com/adamfratino" target="_blank" rel="nofollow">
        <Icon icon={faBolt} />
        <span>Cargo</span>
      </Link>
    </li>
    <li>
      <Link href="/resume.pdf" target="_blank">
        <Icon icon={faFile} />
        <span>Resume</span>
      </Link>
    </li>
  </StyledLinkGroup>
);

export default LinkGroup;

const StyledLinkGroup = styled.ul`
  display: flex;
  flex-direction: column;
  font-family: 'Lato', sans-serif;
  font-size: 12px;
  justify-content: center;
  letter-spacing: 0.05em;
  width: 100%;

  @media (min-width: 700px) {
    flex-direction: initial;
  }

  li {
    position: relative;

    @media (min-width: 700px) {
      flex: 1;
    }

    &:not(:last-of-type) {
      margin-bottom: 16px;

      @media (min-width: 700px) {
        margin-bottom: 0;
        margin-right: 16px;
      }
    }
  }
`;

const Link = styled.a`
  align-items: center;
  background-color: gold;
  border: 2px solid black;
  color: black;
  display: flex;
  font-weight: 700;
  height: 48px;
  justify-content: center;
  padding: 12px;
  text-decoration: none;
  text-transform: uppercase;

  &::after {
    background-color: black;
    bottom: 0;
    content: "";
    height: 100%;
    left: 0;
    position: absolute;
    transform: translate3d(4px, 4px, 0);
    width: 100%;
    z-index: -1;
  }

  &:hover {
    &::after {
      transform: translate3d(6px, 6px, 0);
    }
  }

  &:active {
    &::after {
      transform: translate3d(2px, 2px, 0);
    }
  }

  svg,
    span {
      transition: all 100ms linear;
    }

    svg {
      height: 100%;
      margin-right: 8px;
    }
  }
`;
