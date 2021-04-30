import styled from 'styled-components';
import { useCombobox, UseComboboxStateChange } from 'downshift'
import { useFilters } from 'hooks/use-get-people';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/router';

interface Person {
    name: string
    height: string
    mass: string
    gender: string
    homeworld: string
}

const InputContainer = styled.input`
    border-radius: 5px;
    border: none;
    height: 3rem;
    padding-left: 1.5rem;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
    background-color: white;
    width: 100%;
`;

const SearchContainer = styled.div`
    width: 22rem;
    margin 0 auto;
    margin-top: 2rem;
    display: flex;
    justify-content: center;
`;

const DropDown = styled.ul`
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
    background-color: white;
    margin: 0;
    position: absolute;
    width: 22rem;
    z-index: 9;
    padding: 0;
    margin-top: 3rem
`;

const DropDownItem = styled.li`
    list-style: none;
    font-size: 16px;
    padding: 0.5rem 0;
    color: #0070f3;
    cursor: pointer;
    border-bottom: 1px solid #F5F5F5;
    background: ${(props) => (props.highlighted ? '#f7f7f7' : 'white')};
    border-left: 10px solid
    ${(props) => (props.highlighted ? props.theme.lightgrey : 'white')};
`;


const Search = () => {
    const { isSearching, searchResult, setFilters }  = useFilters();
    const delaySearch = debounce(setFilters, 350);
    const result = searchResult?.getPeople.data || [];
    const router = useRouter();

    const {
    isOpen,
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items: result,
      onInputValueChange() {
        console.log("==>", inputValue)
        delaySearch({
            name: inputValue 
        });
    },
    onSelectedItemChange({ selectedItem }: UseComboboxStateChange<Person>) {
      router.push(`/person/?name=${selectedItem.name}`);
    },
    itemToString: (item: Person) => item?.name || '',
    });
    
    return (
        <SearchContainer {...getComboboxProps()}>
            <InputContainer {...getInputProps()} placeholder="Search by name"/>
            <DropDown {...getMenuProps()}>
                {isOpen
                    ? result.map((item, index) => (
                        <DropDownItem
                            {...getItemProps({ index, item })}
                            key={item.id}
                            highlighted={index === highlightedIndex}
                        >
                            {item.name}
                        </DropDownItem>
                    ))
                    : null
                }
                { isSearching && <p>Loading...</p>}
            </DropDown>
        </SearchContainer>
    )
}

export default Search;