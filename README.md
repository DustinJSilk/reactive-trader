
# Automatic Gekko trader
This bot accesses the Gekko api and manages trading and updating strategies so that you don't have to.

Using a Genetic Algorithm it will only use the best strategy and settings for maximum profit.

At every interval it will search for better settings and then switch over to them.

You will also be able to run it in backtest mode to see how it does.

## THIS APP IS STILL IN ACTIVE DEVELOPMENT AND NOT YET FINISHED OR READY TO ROLL

## Prerequisites

Reactive Trader assumes that you already have Gekko setup to run. Meaning if you run the Gekko command line or frontend server for importing, backtesting, paper trading, and live trading - everything will work. Thats because this bot is nondestructive.

If you can't run Gekko as is, you won't be able to run Reactive Trader.

## Install

```
$ cd [Gekko repository]
$ git clone https://github.com/DustinJSilk/reactive-trader
$ cd ./reactive-trader
$ npm install
$ cp ./config/sample-config.js ./config/config.js
```

## Running

This app will run in place of Gekko and on top of it. Make sure to shutdown any other trading instances first.

Make sure you configure ./config/config.js and ./config/strategies.js first.

```
$ node index.js --help
```

Run through the terminal:
```
$ node index.js --run
```

Run with the frontend UI:
```
$ node index.js --run --ui
```

The frontend feature is still very basic and just spits out test results as they come.

## Database

I had problems with SQLite. Switch to postgres or mongodb. You will need to follow Gekkos setup instructions as thats out of the scope of this app.

## Roadmap

The basic future:

- ~~Setup and installation~~
- ~~Add importing~~
- ~~Create backtesting class for individual strategies~~
- ~~Properly run a single strategy~~
- ~~Create strategy finder class using a genetic algorithm~~
- ~~Add mutation to the genetic algorithm~~
- ~~Setup strategy updating intervals~~
- Setup backtesting for the whole bot. (Kinda done, but its not 100% accurate)
- Fine tune the Genetic Algorithm
- Store previous test results and config to be mutated with new test entities.
- Stop depending on genetic-js. Write the foundation for the Genetic Algorithm myself.
- Don't import data that already exists when running large backtests
- Fine tune the strategy updating loops
- Log and display trading results / stats
- Add proper logging
- Begin paper trading
- Add a UI layer to see running stats
- Begin live trading
- Find a way to to switch strategies without rebooting OR without messing up the end of the current / start of the next trading period
- Run a Genetic algorithm on this app to find the ultimate perfect settings.
- Profit.


## Help a brother out

Submit issues, pull requests, and feature requests. I can't do it all alone. (Well I can, but it'll be a bit slower and probably suck a little)

I can build a bot better than I can build a strategy. I still haven't gone live. If you've got a killer strat and wanna say thanks [hit me up](mailto:dustinjsilk@gmail.com?Subject=Reactive%20Trader%20|%20Thanks%20I%20love%20you%20man).

Otherwise theres always the classic btc tip.

I hope we can all get rich and retire young together.

1CztvpiViGx56AQszcNdMNgDt2knzReAT
