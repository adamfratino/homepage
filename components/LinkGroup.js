import styled from 'styled-components';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faCodepen, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-regular-svg-icons';

const iconBase = 4;
const iconSize = "5x";

const LinkGroup = () => (
  <StyledLinkGroup>
    <li>
      <a href="//github.com/adamfratino" target="_blank" rel="nofollow">
        <Icon icon={faGithub} size={iconSize} />
      </a>
    </li>
    <li>
      <a href="//codepen.io/adamfratino" target="_blank" rel="nofollow">
        <Icon icon={faCodepen} size={iconSize} />
      </a>
    </li>
    <li>
      <a href="//cargocollective.com/adamfratino" target="_blank" rel="nofollow">
        <Icon icon={faBolt} size={iconSize} />
      </a>
    </li>
    <li>
      <a href="#">
        <Icon icon={faFile} size={iconSize} />
      </a>
    </li>
  </StyledLinkGroup>
);

export default LinkGroup;

const StyledLinkGroup = styled.ul`
  background: #fff391;
  border: 2px solid black;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: none;
  display: flex;
  font-family: 'Lato', sans-serif;
  font-size: 12px;
  justify-content: center;
  letter-spacing: 0.05em;
  padding: 16px 0;
  width: 100%;

  li {
    margin: 0 16px;
    text-transform: uppercase;

    a {
      color: black;
      display: block;
      font-size: ${iconBase}px;
      transition: all 100ms ease;

      &:hover {
        transform: scale(1.5);
      }
    }
  }
`;
