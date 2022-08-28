import Head from 'next/head'
import styled from 'styled-components'

const Columns = () => (
  <>
    <Head>
      <title>Adam Fratino : storybook-addon-responsive-columns example</title>
      <meta
        name="description"
        content="User interface engineer with a background in graphic design."
      />
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css"
        integrity="sha512-NmLkDIU1C/C88wi324HBc+S2kLhi08PN5GDeUVVVC/BVt/9Izdsc9SVeVfA1UZbY3sHUlDSyRXhCzHfr6hmPPw=="
        crossOrigin="anonymous"
      />
    </Head>

    <Container>
      <Grid columns={12} />
      <Grid columns={11} />
      <Grid columns={10} />
      <Grid columns={9} />
      <Grid columns={8} />
      <Grid columns={7} />
      <Grid columns={6} />
      <Grid columns={5} />
      <Grid columns={4} />
      <Grid columns={3} />
      <Grid columns={2} />
    </Container>
  </>
)

export default Columns

const Grid = ({ columns }) => (
  <StyledGrid>
    {Array.from({ length: columns }).map((_, i) => (
      <GridItem key={i} />
    ))}
  </StyledGrid>
)

const Container = styled.div`
  background-color: #222;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (min-width: 1024px) {
    padding-inline: 24px;
  }
`

const StyledGrid = styled.div`
  width: 100%;
  max-width: 1224px;
  background: gold;
  display: flex;
  gap: 0 8px;
  padding: 24px;

  &:first-of-type {
    padding-top: 48px;
  }

  &:last-of-type {
    padding-bottom: 48px;
  }

  @media (min-width: 768px) {
    gap: 0 16px;
  }

  @media (min-width: 1024px) {
    gap: 0 24px;
  }
`

const GridItem = styled.div`
  flex: 1;
  height: 100px;
  background-color: tomato;
  border-radius: 8px;
`
