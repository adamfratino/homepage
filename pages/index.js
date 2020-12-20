import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Contact, Container, Description, LinkGroup, Main, TextBand, Title } from '../components';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
`;

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => setIsLoaded(true), []);

  return (
    <>
      <Head>
        <title>Adam Fratino : UI Engineer</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;600;900&family=Martel:wght@900&display=swap" rel="stylesheet" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css"
          integrity="sha512-NmLkDIU1C/C88wi324HBc+S2kLhi08PN5GDeUVVVC/BVt/9Izdsc9SVeVfA1UZbY3sHUlDSyRXhCzHfr6hmPPw=="
          crossOrigin="anonymous"
        />
      </Head>

      <GlobalStyle />

      <Main>
        <Container isLoaded={isLoaded}>
          <Title text="adam fratino" className="is-active" />
          <TextBand>
            <span className="large">User Interface Engineer</span>
            <span className="small">with a background in</span>
            <span className="large">Graphic Design</span>
          </TextBand>
          <Description>
            I came to <strong>New York City</strong> to study <strong>graphic design</strong> at the <strong>School of Visual Arts</strong>.
            I stuck around to develop and maintain sites for clients like <strong>Samsung</strong> and <strong>Verizon</strong> at <strong>The Barbarian Group</strong> and <strong>Rokkan</strong>.
            Now I work at <strong>Peloton</strong> building <strong>UI components</strong> and <strong>design systems</strong>.
            In my free time I play <strong>shuffleboard</strong> in a league at <strong>Royal Palms</strong>.
          </Description>
          <Contact>
            If there's anything else you wanna know, <a href="mailto:hello@adamfratino.com">hit me up</a>!
            <span className="wave">👋</span>
          </Contact>
          <LinkGroup />
        </Container>
      </Main>
    </>
  )
};

export default Home;
