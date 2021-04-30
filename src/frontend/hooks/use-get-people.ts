import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { PageFilter, PersonResponseData, PageFilterVariables} from '@types'

export const GET_PEOPLE_QUERY = gql`
query GetPeople($filter: PageFilter) {
  getPeople(filter: $filter) {
    data {
      name
      height
      mass
      gender
      home_world {
        name
        terrain
        population
        orbital_period
        rotation_period
        diameter
        climate
        gravity
        surface_water
      }
    }
    page{
      total
      next
      previous
    }
  }
}
`

export const useGetPeople = (options) => useQuery<PersonResponseData, PageFilterVariables>(GET_PEOPLE_QUERY, options);

export const useFilters = () => {
  const [onSearch, { data, refetch, loading }] = useLazyQuery(GET_PEOPLE_QUERY, {
    onError: (err) => console.log(err),
    fetchPolicy: 'network-only',
  });

  const setFilters = ({ name, page }: PageFilter) => {
    onSearch({
        variables: {
            filter: {
                name,
                page
            }
      },
    });
  };

  return {
    isSearching: loading,
    searchResult: data,
    refetch,
    setFilters,
  };
};