import { FunctionComponent } from 'react'
import Layout from '../../components/layout'
import { Container, Title, SubTitle, Row, HomeWorldList } from 'components/styles/person.style';
import { GET_PEOPLE_QUERY } from 'hooks/use-get-people'
import { initializeApollo } from "hooks/use-apollo";
import { Person } from '@types'

const PersonDetail : FunctionComponent<{data: Person}> = ({ data }) => {
  return (
    <Layout>
       <Container>
            <Title>{data.name}</Title>
            <Row>Gender:<span>{data.gender}</span></Row>
            <Row>Mass:<span>{data.mass}</span></Row>
            <Row>Height:<span>{data.height}</span></Row>
            <Row>Mass:<span>{data.mass}</span></Row>

            <SubTitle>Home World</SubTitle>
            <HomeWorldList>
                <Row>Name:<span>{data.home_world.name}</span></Row>
                <Row>Climate:<span>{data.home_world.climate}</span></Row>
                <Row>Diameter:<span>{data.home_world.diameter}</span></Row>
                <Row>Gravity:<span>{data.home_world.gravity}</span></Row>
                <Row>Orbital Period:<span>{data.home_world.orbital_period}</span></Row>
                <Row>Rotation Period:<span>{data.home_world.rotation_period}</span></Row>
                <Row>Population:<span>{data.home_world.population}</span></Row>
                <Row>Surface Water:<span>{data.home_world.surface_water}</span></Row>
            </HomeWorldList>
            <Row>Terrain:<span>{data.home_world.terrain}</span></Row>
        </Container>
    </Layout>

  )
}

export async function getServerSideProps(context) {
  const { query } = context;
  const client = initializeApollo(context);
  const { data } = await client.query({
    query: GET_PEOPLE_QUERY,
    variables: {
      filter: {
        name: query.name
      }
    }
  });
  
  return {
    props: {
      data: data.getPeople.data[0]
    }
  }
}

export default PersonDetail;