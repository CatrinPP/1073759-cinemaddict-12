import PageController from './controllers/page.js';
import ProfileComponent from './components/profile.js';
import FilterController from './controllers/filter.js';
import SortComponent from './components/sort.js';
import FooterStatistics from './components/footer-statistics.js';
import FilmsComponent from './components/films.js';
import FilmsModel from './models/films.js';
import {RenderPosition} from './const.js';
import {getWatchedFilmsCount, render} from './utils.js';
import Api from "./api.js";

const AUTHORIZATION = `Basic Sh2sddd34Sfcl1sa2j`;
const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict`;

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);
const filmsComponent = new FilmsComponent();
const sortComponent = new SortComponent();
const api = new Api(END_POINT, AUTHORIZATION);
const filmsModel = new FilmsModel();
const pageController = new PageController(filmsComponent, sortComponent, filmsModel, api);
const filterController = new FilterController(mainElement, filmsModel);

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(films);
    const wathedFilmsCount = getWatchedFilmsCount(films);
    render(footerElement, new FooterStatistics(films.length), RenderPosition.BEFOREEND);
    render(headerElement, new ProfileComponent(wathedFilmsCount), RenderPosition.BEFOREEND);
    render(mainElement, sortComponent, RenderPosition.BEFOREEND);
    render(mainElement, filmsComponent, RenderPosition.BEFOREEND);
    pageController.render();
    filterController.render();
  })
  .catch(() => {
    filmsModel.setFilms([]);
  });

