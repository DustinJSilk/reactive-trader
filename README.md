
# Automatic Gekko trader
This bot will access the Gekko api and manage the strategies automatically - only using the best strategies and settings for maximum profit.

At every first interval it will search for better settings with the current config and at every second interval it will test all strategies again.

You will also be able to run it in backtest mode to see how it does.

Before beginning it will pull the latest candles and find the best strategy to run.

## THIS APP IS STILL IN ACTIVE DEVELOPMENT AND NOT YET FINISHED OR READY TO ROLL

## Prerequisites

This bot assumes that you already have Gekko setup to run. Meaning if you ran the Gekko command line AND / OR frontend server for importing, backtesting, paper trading or live trading - everything will work. Thats because this bot simply hooks into an already functioning Gekko.

Make sure you have the latest Node.js installed. And also make sure Gekko is running with a decent database. (See below for postgres information. However, you should follow Gekkos setup instructions.)

## Install

Run these 3 commands from your Gekko repository:
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

```
$ npm run trade
```

## Frontend

```
$ node index.js --run --ui
```

This will run the bot and the UI. Hit `http://localhost:8080` [or with the port set in your config file] and you will see the results of the test in a sortable table.

This feature is still very basic and just spits out test results as they come.

## Database

I had problems with SQLite. Switch to postgres or mongodb.

### Setup postgresql

First make sure you install and start Postgresql. Then in your Gekko folder:

Install the Postgres dependency.

```
$ npm install pg
```

In your Gekko config set:
```
config.adapter = 'postgresql'
config.tradingAdvisor.adapter = 'postgresql'
```

Set the connection string to your postgres user name / password combo:

```
postgres://user:password@localhost:5432
```

Now you need to create a database. If you have a GUI like pgAdmin 4 just right
click on databases and hit create. Otherwise run a postgresql terminal and run
something like this:

```
CREATE DATABASE gekko
    WITH
    OWNER = YOUR_USER_NAME
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;
```

Now in your gekko config, set 'database' under postgresql to 'gekko'. (or the
name your used above.)


## Thresholds problem

Some strategies (~MACD) use threshold values that can vary a lot from coin to coin.
Some coins might need values between 0.05 and -0.05 while others will need them between 0.00000005 and -0.00000005.
This makes finding the correct Min and Max values time consuming and expensive.
These thresholds are linked to the individual markets currency value (I think).

Rather use the PPO strategy since I've been informed that it is MACD but with percentages.

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

Deadline: End of ~~the~~ next week
