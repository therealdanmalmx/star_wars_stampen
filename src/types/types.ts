export type Character = {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string
    birth_year: string,
    gender: string,
    homeworld: string,
    films: Film[],
    species: [],
    vehicles: [],
    starships: [],
    created: string,
    edited: string,
    url: string
  };

  export type Film = {
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
    characters: Character[];
    character: string;
    films: Film[];
    planets: [],
    starships: [],
    vehicles: [],
    species: [],
    created: string,
    edited: string,
    url: string
  };

  export type Films = Film[];

  export type FilmContextTypes = {
    films: Films;
    characters: Character[];
    loading: boolean;
    getCharacters: (character: Film) => void;
    filmTitle: string;
  };

  export type FilmProp = {
    children: React.ReactNode;
  }