import styled from 'styled-components';

const InputContainer = styled.input`
    margin-top: 2rem;
    border-radius: 5px;
    border: none;
    height: 3rem;
    padding-left: 2rem;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
    background-color: white;
    width: 24rem;
`;


const Search = ({ value, onSearchChange }) => {
    return (
        <div>
            <InputContainer placeholder="Search by name" onChange={onSearchChange} value={ value}/>
        </div>
    )
}

export default Search;