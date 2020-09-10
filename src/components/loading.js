import AbstractComponent from './abstract-component.js';

const createNoFilmsTemplate = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title">Loading...</h2>
    </section>`
  );
};

export default class NoFilms extends AbstractComponent {
  getTemplate() {
    return createNoFilmsTemplate();
  }
}
