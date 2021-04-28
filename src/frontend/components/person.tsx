import styled from 'styled-components';


const Container = styled.div`
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
    padding: 1.5rem 1rem;
    margin-top: 2rem;
    background-color: white;
`;

const Title = styled.h1`
    font-size: 18px;
    margin: 0;
    margin-bottom: 8px;
    color: #b26c10;
`;

const SubTitle = styled.h1`
    font-size: 14px;
    margin: 0;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    color: #b26c10;
    opacity: 0.6;
`;


const Row = styled.h2`
    font-size: 14px;
    font-weight: semi-bold;
    margin: 0;
    padding: 2px 0;
    span {
        font-weight: normal;
        margin-left: 10px;
    }
`;

const HomeWorldList = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1.5rem;
`;



const Person = ({ data }) => {

    const gender = {
        male: "M",
        female: "F",
        "n/a": "N/A"
    }

    return (
        <Container>
            <Title>{data.name} - {gender[data.gender]}</Title>
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

export default Person;