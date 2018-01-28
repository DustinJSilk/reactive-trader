import 'babel-polyfill';

import {EventType} from '../../components/strategyfinder';
import Table from './components/table';

class App {
  constructor() {
    this.socket = io();
    this.table = new Table();

    this.addEventListeners();
  }

  addEventListeners() {
    this.socket.on('ui-update', () => window.location.reload());

    this.socket.on(EventType.NEW_TEST_POPULATION, (slug, data) =>
      this.table.populate(slug, data));
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
