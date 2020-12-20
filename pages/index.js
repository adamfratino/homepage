import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Container, LinkGroup, Main, TextBand, Title } from '../components';
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
        <link
          href="https://fonts.googleapis.com/css2?family=Bitter:wght@600&family=Lato:wght@900&display=swap"
          rel="stylesheet"
        />
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
            <span class="large">User Interface Engineer</span>
            <span class="small">with a background in</span>
            <span class="large">Graphic Design</span>
          </TextBand>
          <LinkGroup />
        </Container>
      </Main>
    </>
  )
};

export default Home;
