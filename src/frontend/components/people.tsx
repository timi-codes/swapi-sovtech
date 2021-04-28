import { useGetPeople } from 'hooks/use-get-people';
import styled from 'styled-components';
import Person from './person';
import Pagination from 'components/pagination';
import Search from 'components/search';

const PeopleListStyle = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1.5rem;
`;

const People = ({ page }) => {
    const { data, error, loading } = useGetPeople({})

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const { getPeople } = data;

    const handleSearchChange = (e) => {
        
    }

    return (
        <div>
            <Search value="" onSearchChange={handleSearchChange}/>
            <Pagination count={getPeople.page.total} page={page}/>
            <PeopleListStyle>
                {
                    getPeople.data.map((person) => <Person data={person}/>)
                }
            </PeopleListStyle>
            <Pagination count={getPeople.page.total} page={page}/>
        </div>
    )
};

export default People