import 'babel-polyfill';

const EventType = {
  CLICK: 'click'
}

class App {
  constructor() {
    this.socket = io();
  }

  addEventListeners() {
    this.socket.on('ui-update', () => window.location.reload());
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
