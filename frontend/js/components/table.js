import Tablesort from './tablesort';

const Selector = {
  FITNESS_TABLE: '#fitness-table',
  FITNESS_BODY: '#fitness-table tbody'
};

export default class Table {
  constructor() {
    this.fitnessTable = document.querySelector(Selector.FITNESS_TABLE);
    this.fitnessTableBody = document.querySelector(Selector.FITNESS_BODY);

    this.sortable = new Tablesort(this.fitnessTable, {
      descending: true
    });
  }

  populate(slug, data) {
    data.forEach(test => {
      const fitnessTemplate = `
        <tr>
          <td>${test.fitness.trades}</td>
          <td>${test.fitness.market}</td>
          <td>${test.fitness.profit}</td>
          <td>${test.fitness.relativeYearlyProfit}</td>
        </tr>`;

      this.fitnessTableBody.innerHTML += fitnessTemplate;
    });

    this.sortable.refresh();
  }
}
