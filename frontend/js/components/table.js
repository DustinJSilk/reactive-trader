const FITNESS_TABLE = '#fitness-table tbody';


export default class Table {
  constructor() {
    this.fitnessTable = document.querySelector(FITNESS_TABLE);
  }

  populate(slug, data) {
    data.forEach(test => {
      const profit = Math.round(test.fitness.profit * 100) / 100;
      const market = Math.round(test.fitness.market * 100) / 100;
      const yearlyProfit = Math.round(test.fitness.yearlyProfit * 100) / 100;

      const fitnessTemplate = `
        <tr>
          <td>${test.fitness.startPrice}</td>
          <td>${test.fitness.endPrice}</td>
          <td>${profit}</td>
          <td>${market}</td>
          <td>${test.fitness.trades}</td>
          <td>${yearlyProfit}</td>
        </tr>`;

      this.fitnessTable.innerHTML += fitnessTemplate;
    });
  }
}
