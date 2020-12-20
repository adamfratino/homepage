import styled from 'styled-components';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faCodepen, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-regular-svg-icons';

const LinkGroup = () => (
  <StyledLinkGroup>
    <li>
      <a href="//github.com/adamfratino" target="_blank" rel="nofollow">
        <Icon icon={faGithub} />
        <span>Github</span>
      </a>
    </li>
    <li>
      <a href="//codepen.io/adamfratino" target="_blank" rel="nofollow">
        <Icon icon={faCodepen} />
        <span>CodePen</span>
      </a>
    </li>
    <li>
      <a href="//cargocollective.com/adamfratino" target="_blank" rel="nofollow">
        <Icon icon={faBolt} />
        <span>Cargo</span>
      </a>
    </li>
    <li>
      <a href="/resume.pdf" target="_blank">
        <Icon icon={faFile} />
        <span>Resume</span>
      </a>
    </li>
  </StyledLinkGroup>
);

export default LinkGroup;

const StyledLinkGroup = styled.ul`
  border-top: 2px solid black;
  display: flex;
  font-family: 'Lato', sans-serif;
  font-size: 12px;
  justify-content: center;
  letter-spacing: 0.05em;
  width: 100%;

  @media (max-width: 700px) {
    flex-direction: column;
  }

  li {
    flex: 1;
    font-weight: 700;
    text-transform: uppercase;
    padding: 16px 16px 8px;

    @media (max-width: 700px) {
      background: gold;
      border: 2px solid black;
      border-top: none;
      padding-bottom: 16px;

      &:not(:first-of-type) {
        border-top: 2px solid black;
      }
    }
    
    &:not(:last-of-type) {
      border-right: 2px solid black;
      margin-bottom: 8px;
    }

    a {
      align-items: center;
      color: black;
      display: flex;
      height: 24px;
      justify-content: center;
      text-decoration: none;

      @media (max-width: 700px) {
        &:active {
          background: transparent;
        }

        &:hover {
          svg,
          span {
            transform: none;
          }
        }
      }

      &:hover {
        svg {
          transform: scale(1.25);
        }

        span {
          background-color: gold;
          transform: translate3d(4px, 0, 0);
        }
      }

      svg,
      span {
        transition: all 100ms ease;
      }

      svg {
        height: 100%;
        margin-right: 8px;
      }
    }
  }
`;
