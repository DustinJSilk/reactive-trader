import 'babel-polyfill';

import Table from './components/table';

const EventType = {
  NEW_TEST_POPULATION: 'new-test-population'
};

class App {
  constructor() {
    this.socket = io();
    this.table = new Table();

    this.addEventListeners();
  }

  addEventListeners() {
    this.socket.on(EventType.NEW_TEST_POPULATION, (data) =>
        this.table.populate(data));
  }

  async wait(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  post(url, data) {
    return new Promise(resolve => {
        const request = new XMLHttpRequest();
        request.open(`POST`, url, true);
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener(`load`, () => resolve());
        request.send(JSON.stringify(data));
      });
  }
}

const app = new App();
