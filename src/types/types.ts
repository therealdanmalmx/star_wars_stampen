
  export type Movie = {
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
    characters: Character[];
    character: string;
    planets: [],
    starships: [],
    vehicles: [],
    species: [],
    created: string,
    edited: string,
  };

export type FilmsContextTypes = {
  films: Movies;
  charactersFromFilm: Character[];
  loading: boolean;
  getCharactersForMovie: (character: Movie) => void;
};

export type FilmContextTypes = {
  film: Movie;
  loading: boolean;
  getSingleFilm: () => void;

};

export type FilmProp = {
  children: React.ReactNode;
}
export type Movies = Movie[];

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
    films: Movie[],
    species: [],
    vehicles: [],
    starships: [],
    created: string,
    edited: string,
    url: string
  };
