import { FunctionComponent } from 'react'
import { Container, Title, SubTitle, Row, HomeWorldList } from 'components/styles/person.style';
import Link from 'next/link';
import { Person } from '@types'

const PersonComponent : FunctionComponent<{data: Person}> = ({ data }) => {

    const gender = {
        male: "M",
        female: "F",
        "n/a": "N/A"
    }

    return (
        <Container>
            <Title>
                <Link href={`/person/?name=${data.name}`}>
                    <a>{data.name} - {gender[data.gender]}
                    </a>
                </Link>
            </Title>
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
    )
}

export default PersonComponent;