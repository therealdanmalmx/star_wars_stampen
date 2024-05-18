export const getFilmTitleSlug = (title: string) => {
    return title.toLowerCase().replace(/ /g, "-");
  };