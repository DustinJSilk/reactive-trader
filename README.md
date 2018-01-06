# Automatic Gekko trader
This bot will access the Gekko api and manage the strategies automatically - only using the best strategies and settings for maximum profit.

At every first interval it will search for better settings with the current config and at every second interval it will test all strategies again.

Because this app does constant backtesting and updating - you wont be able to do any backtesting with it yourself. Instead you can run it in paper trader mode to see how it performs live.

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
- Create backtesting class for individual strategies
- ~~Properly run a single strategy~~
- Create strategy finder class using a genetic algorithm
- Create Gekko plugin to switch strategies without shutting down the server first
- Add logging
- Begin paper trading
- Setup backtesting for the whole bot.
- Begin live trading

Deadline: End of the week
