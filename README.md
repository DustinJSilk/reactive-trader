# Automatic Gekko trader
This bot will access the Gekko api and manages the strategies, using only the best strategies and config for maximum profit.

Because this app does constant backtesting and updating - you wont be able to do any backtesting with it yourself. Instead you can run the paper trader to see how it performs live.

Before beginning it pulls the latest trade history, finds the best strategy to run, and then only begins trading.

## THIS APP IS STILL IN ACTIVE DEVELOPMENT AND NOT YET FINISHED

## Install

Run these 3 commands from your Gekko repository:

- $ cd [Gekko repository]
- $ git submodule init
- $ git submodule add https://github.com/DustinJSilk/reactive-trader
- $ cd ./reactive-trader
- $ npm install
- $ cp ./sample-config.js ./config.js

## Running

This app will run in place of Gekko and on top of it. Make sure to shutdown any other trading instances first.

Setup config.js to your liking.

## Roadmap

The basic future:

- ~~Setup and installation~~
- ~~Add importing~~
- Create backtesting class
- Create strategy finder class using a genetic algorithm
- Begin paper trading
- Begin live trading

Deadline: End of the week
