import {getFilmsByFilter} from '../utils.js';
import {FilterType} from '../const.js';

export default class Films {
  constructor() {
    this._films = [];
    this._activeFilterType = FilterType.ALL;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }

  getFilms() {
    return getFilmsByFilter(this._films, this._activeFilterType);
  }

  getFilmsAll() {
    return this._films;
  }

  setFilms(films) {
    this._films = Array.from(films);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  updateFilm(id, film) {
    const index = this._films.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._films = [].concat(this._films.slice(0, index), film, this._films.slice(index + 1));
    this._callHandlers(this._dataChangeHandlers);
    return true;
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  static adaptToClient(film) {
    const adaptedFilm = Object.assign(
        {},
        film,
        {
          filmInfo: Object.assign({}, film.film_info, {
            alternativeTitle: film.film_info.alternative_title,
            ageRating: film.film_info.age_rating,
            totalRating: film.film_info.total_rating,
            release: Object.assign({}, film.film_info.release, {
              date: film.film_info.release.date !== null ? new Date(film.film_info.release.date) : film.film_info.release.date,
              country: film.film_info.release.release_country,
            })
          }),
          userDetails: Object.assign({}, film.user_details, {
            isInWatchlist: film.user_details.watchlist,
            isAlreadyWatched: film.user_details.already_watched,
            isFavorite: film.user_details.favorite,
            watchingDate: film.user_details.watching_date !== null ? new Date(film.user_details.watching_date) : film.user_details.watching_date,
          }),
        }
    );

    delete adaptedFilm.film_info;
    delete adaptedFilm.filmInfo.alternative_title;
    delete adaptedFilm.filmInfo.age_rating;
    delete adaptedFilm.filmInfo.total_rating;
    delete adaptedFilm.filmInfo.release.release_country;
    delete adaptedFilm.user_details;
    delete adaptedFilm.userDetails.favorite;
    delete adaptedFilm.userDetails.watchlist;
    delete adaptedFilm.userDetails.already_watched;
    delete adaptedFilm.userDetails.watching_date;
    return adaptedFilm;
  }

  static adaptToServer(film) {
    const adaptedFilm = Object.assign(
        {},
        film,
        {
          "film_info": Object.assign({}, film.filmInfo, {
            "alternative_title": film.filmInfo.alternativeTitle,
            "age_rating": film.filmInfo.ageRating,
            "total_rating": film.filmInfo.totalRating,
            "release": Object.assign({}, film.filmInfo.release, {
              "date": film.filmInfo.release.date instanceof Date ? film.filmInfo.release.date.toISOString() : null,
              "release_country": film.filmInfo.release.country,
            })
          }),
          "user_details": Object.assign({}, film.userDetails, {
            "watchlist": film.userDetails.isInWatchlist,
            "already_watched": film.userDetails.isAlreadyWatched,
            "favorite": film.userDetails.isFavorite,
            "watching_date": film.userDetails.watchingDate instanceof Date ? film.userDetails.watchingDate.toISOString() : null,
          }),
        }
    );
    delete adaptedFilm.filmInfo;
    delete adaptedFilm.film_info.alternativeTitle;
    delete adaptedFilm.film_info.ageRating;
    delete adaptedFilm.film_info.totalRating;
    delete adaptedFilm.film_info.release.country;
    delete adaptedFilm.userDetails;
    delete adaptedFilm.user_details.isAlreadyWatched;
    delete adaptedFilm.user_details.isInWatchlist;
    delete adaptedFilm.user_details.isFavorite;
    delete adaptedFilm.user_details.watchingDate;
    return adaptedFilm;
  }
}
