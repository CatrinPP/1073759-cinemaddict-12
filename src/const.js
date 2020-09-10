const ENTER_KEYCODE = 13;
const ESC_KEYCODE = 27;
const FILM_CARDS_COUNT = 20;
const FILM_CARDS_EXTRA_COUNT = 2;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;
const SHOWING_CARDS_COUNT_ON_START = 5;

const FilterType = {
  ALL: `All movies`,
  FAVORITES: `Favorites`,
  HISTORY: `History`,
  WATCHLIST: `Watchlist`,
};

const ProfileRating = {
  FAN: `Fan`,
  MOVIE_BUFF: `Movie Buff`,
  NOVICE: `Novice`,
};

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const SortType = {
  DATE: `date`,
  DEFAULT: `default`,
  RATING: `rating`,
};

export {
  FILM_CARDS_COUNT,
  FILM_CARDS_EXTRA_COUNT,
  FilterType,
  ENTER_KEYCODE,
  ESC_KEYCODE,
  ProfileRating,
  RenderPosition,
  SHOWING_CARDS_COUNT_BY_BUTTON,
  SHOWING_CARDS_COUNT_ON_START,
  SortType,
};
