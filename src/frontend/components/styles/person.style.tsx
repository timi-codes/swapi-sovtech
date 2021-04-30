import styled from 'styled-components';


export const Container = styled.div`
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
    padding: 1.5rem 1rem;
    margin-top: 2rem;
    background-color: white;
`;

export const Title = styled.h1`
    font-size: 18px;
    margin: 0;
    margin-bottom: 8px;
    color: #b26c10;
`;

export const SubTitle = styled.h1`
    font-size: 14px;
    margin: 0;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    color: #b26c10;
    opacity: 0.6;
`;


export const Row = styled.h2`
    font-size: 14px;
    font-weight: semi-bold;
    margin: 0;
    padding: 2px 0;
    span {
        font-weight: normal;
        margin-left: 10px;
    }
`;

export const HomeWorldList = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1.5rem;
`;