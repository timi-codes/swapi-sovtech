export interface Person {
    name: string
    height: string
    mass: string
    gender: string
    home_world: HomeWorld
}

export interface Page {
    total: number
    next: string
    previous: string
}

export interface PersonResponse {
    data: [Person]
    page: Page
}
export interface PageFilter {
  name: string
  page: number
}


export interface PersonResponseData {
    getPeople: PersonResponse
}

export interface PageFilterData {
    filter: PageFilter
}
export interface PageFilterVariables {
    variables: PageFilterData
}
    
    
export interface HomeWorld {
    name: string
    rotation_period: string
    orbital_period: string
    diameter: string
    climate: string
    gravity: string
    terrain: string
    surface_water: string
    population: string
}
    
    
    
