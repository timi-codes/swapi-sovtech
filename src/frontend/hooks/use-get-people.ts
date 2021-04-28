import { useQuery, gql, useMutation, useLazyQuery } from '@apollo/client';

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

export const useGetPeople = (options) => useQuery(GET_PEOPLE_QUERY, options);

export const useFilters = () => {
  const [onSearch, { data, refetch, loading }] = useLazyQuery(GET_PEOPLE_QUERY, {
    onError: (err) => console.log(err),
    fetchPolicy: 'network-only',
  });

  const setFilters = ({ name, page }) => {
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