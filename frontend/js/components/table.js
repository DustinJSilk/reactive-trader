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

  populate(data) {
    const searchId = data.searchId;
    const strategy = data.strategy;

    data.population.forEach(test => {
      const fitnessTemplate = `
        <tr>
          <td>${strategy}</td>
          <td>${test.fitness.trades}</td>
          <td>${test.fitness.market}</td>
          <td>${test.fitness.profit}</td>
          <td>${test.fitness.relativeProfit}</td>
          <td>${test.fitness.relativeYearlyProfit}</td>
        </tr>`;

      this.fitnessTableBody.innerHTML += fitnessTemplate;
    });

    this.sortable.refresh();
  }
}
