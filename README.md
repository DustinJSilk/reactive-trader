# Automatic Gekko trader
This bot will access the Gekko api and manage the strategies automatically - only using the best strategies and settings for maximum profit.

At every first interval it will search for better settings with the current config and at every second interval it will test all strategies again.

You will also be able to run it in backtest mode to see how it does.

Before beginning it will pull the latest candles and find the best strategy to run.

## THIS APP IS STILL IN ACTIVE DEVELOPMENT AND NOT YET FINISHED

## Install

Run these 3 commands from your Gekko repository:

- $ cd [Gekko repository]
- $ git clone https://github.com/DustinJSilk/reactive-trader
- $ cd ./reactive-trader
- $ npm install
- $ cp ./sample-config.js ./config.js

## Running

This app will run in place of Gekko and on top of it. Make sure to shutdown any other trading instances first.

Setup config.js to your liking.

$ npm run reactive-trading

## Roadmap

The basic future:

- ~~Setup and installation~~
- ~~Add importing~~
- ~~Create backtesting class for individual strategies~~
- ~~Properly run a single strategy~~
- Create strategy finder class using a genetic algorithm
- Setup config updating intervals
- Add a UI layer to see running stats
- Add proper logging
- Begin paper trading
- Setup backtesting for the whole bot.
- Begin live trading

Deadline: End of the week
