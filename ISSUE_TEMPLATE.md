If you're submitting a feature request you can delete everything here and just describe the feature.

For issues, make sure you've checked these off before submitting the issue:

- [ ] You are running the latest version of Gekko and Reactive Trader
- [ ] You are running Gekko with Postgres or Mongodb and not SQLite

Gekko is setup and works when you test it:
- [ ] From Gekkos UI
- [ ] Straight through the command line

You've tested doing all of these with Gekkos UI **and** straight through the command line:
- [ ] Importing data
- [ ] Backtesting
- [ ] Paper and / or live trading


## The issue

Describe the issue here as best you can.


## Logs

If the bot crashed or threw an error, I'll need to see as much information as possible to try figure out where the point of failure might be.

You can find the log files for Reactive Trader inside the `reactive-trader/logs/` folder. Every new session will create 3 new log files: `xxx-error`, `xxx-info` and `xxx-status`. The `xxx` part, is the time stamp of when you started Reactive Trader. Add a link to the error, info, and status files for the session that had the error. The last session will have the largest timestamp.

**Make sure you remove any sensitive information like database passwords or someone will steal your shit**

You can upload and link to each file here: [https://gist.github.com/](https://gist.github.com/)

Error:

Info:

Status:
