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
- $ cp ./config/sample-config.js ./config/config.js

## Running

This app will run in place of Gekko and on top of it. Make sure to shutdown any other trading instances first.

Make sure you configure ./config/config.js and ./config/strategies.js first.

$ npm run reactive-trading


## Database

I had problems with SQLite. Switch to postgres or mongodb.

## Thresholds problem

Some strategies (~MACD) use threshold values that can vary a lot from coin to coin.
Some coins might need values between 0.05 and -0.05 while others will need them between 0.00000005 and -0.00000005.
This makes finding the correct Min and Max values time consuming. (Either manually with https://github.com/DustinJSilk/gekkoga-plus-ui or computationally which would require time and processing power).
These thresholds are linked to the individual markets currency value.
The solution would be to use a percentage Min / Max. This is in the road map.

## Roadmap

The basic future:

- ~~Setup and installation~~
- ~~Add importing~~
- ~~Create backtesting class for individual strategies~~
- ~~Properly run a single strategy~~
- ~~Create strategy finder class using a genetic algorithm~~
- ~~Add mutation to the genetic algorithm~~
- Setup strategy updating intervals
- Figure out the thresholds problem mentioned above
- Setup backtesting for the whole bot.
- Log and display trading results / stats
- Add proper logging
- Begin paper trading
- Add a UI layer to see running stats
- Begin live trading
- Run a Genetic algorithm on this app to find the ultimate perfect settings.
- Profit.

Deadline: End of ~~the~~ next week
