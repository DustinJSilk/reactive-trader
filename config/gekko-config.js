// Everything is explained here:
// @link https://gekko.wizb.it/docs/commandline/plugins.html

var config = {};

config.debug = false;
config.silent = true;

config.tradingAdvisor = {
  enabled: false,
  candleSize: 1,
  historySize: 3,
  adapter: 'sqlite'
};

config.DEMA = {
  short: 10,
  long: 21,
  thresholds: {
    down: -0.025,
    up: 0.025
  }
};

config.MACD = {
  short: 10,
  long: 21,
  signal: 9,
  thresholds: {
    down: -0.025,
    up: 0.025,
    persistence: 1
  }
};

config.Supertrend = {
  atrEma: 7, bandFactor: 3
};

config.gannswing = {
  stoploss: {
    enabled: false,
    trailing: false,
    percent: 5
  },
  vixperiod: 20,
  swingperiod: 250
};

config.PPO = {
  short: 12,
  long: 26,
  signal: 9,
  thresholds: {
    down: -0.025,
    up: 0.025,
    persistence: 2
  }
};

config.varPPO = {
  momentum: 'TSI',
  thresholds: {
    weightLow: 120,
    weightHigh: -120,
    persistence: 0
  }
};

config.RSI = {
  interval: 14,
  thresholds: {
    low: 30,
    high: 70,
    persistence: 1
  }
};

config.TSI = {
  short: 13,
  long: 25,
  thresholds: {
    low: -25,
    high: 25,
    persistence: 1
  }
};

config.UO = {
  first: {weight: 4, period: 7},
  second: {weight: 2, period: 14},
  third: {weight: 1, period: 28},
  thresholds: {
    low: 30,
    high: 70,
    persistence: 1
  }
};

config.CCI = {
    constant: 0.015,
    history: 90,
    thresholds: {
        up: 100,
        down: -100,
        persistence: 0
    }
};

config.StochRSI = {
  interval: 3,
  thresholds: {
    low: 20,
    high: 80,
    persistence: 3
  }
};

config['talib-macd'] = {
  parameters: {
    optInFastPeriod: 10,
    optInSlowPeriod: 21,
    optInSignalPeriod: 9
  },
  thresholds: {
    down: -0.025,
    up: 0.025,
  }
}

config.paperTrader = {
  enabled: true,
  reportInCurrency: true,
  simulationBalance: {
    asset: 1,
    currency: 100,
  },
  feeMaker: 0.15,
  feeTaker: 0.25,
  feeUsing: 'maker',
  slippage: 0.05,
}

config.performanceAnalyzer = {
  enabled: true,
  riskFreeReturn: 5
}

config.trader = {
  enabled: false,
  key: '',
  secret: '',
  username: '',
  passphrase: ''
}

config.adviceLogger = {
  enabled: false,
  muteSoft: true
}

config.pushover = {
  enabled: false,
  sendPushoverOnStart: false,
  muteSoft: true,
  tag: '[GEKKO]',
  key: '',
  user: ''
}

config.mailer = {
  enabled: false,
  sendMailOnStart: true,
  email: '',
  muteSoft: true,
  password: '',
  tag: '[GEKKO] ',
  server: 'smtp.gmail.com',
  smtpauth: true,
  user: '',
  from: '',
  to: '',
  ssl: true,
  port: '',
}

config.pushbullet = {
  enabled: false,
  sendMessageOnStart: true,
  muteSoft: true,
  key: 'xxx',
  email: 'jon_snow@westeros.org',
  tag: '[GEKKO]'
};

config.ircbot = {
  enabled: false,
  emitUpdates: false,
  muteSoft: true,
  channel: '#your-channel',
  server: 'irc.freenode.net',
  botName: 'gekkobot'
}

config.telegrambot = {
  enabled: false,
  emitUpdates: false,
  token: 'YOUR_TELEGRAM_BOT_TOKEN',
  botName: 'gekkobot'
}

config.twitter = {
  enabled: false,
  sendMessageOnStart: false,
  muteSoft: false,
  tag: '[GEKKO]',
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
};

config.xmppbot = {
  enabled: false,
  emitUpdates: false,
  client_id: 'jabber_id',
  client_pwd: 'jabber_pw',
  client_host: 'jabber_server',
  client_port: 5222,
  status_msg: 'I\'m online',
  receiver: 'jabber_id_for_updates'
}

config.campfire = {
  enabled: false,
  emitUpdates: false,
  nickname: 'Gordon',
  roomId: null,
  apiKey: '',
  account: ''
}

config.redisBeacon = {
  enabled: false,
  port: 6379,
  host: '127.0.0.1',
  channelPrefix: '',
  broadcast: [
    'candle'
  ]
}

config.slack = {
  enabled: false,
  token: '',
  sendMessageOnStart: true,
  muteSoft: true,
  channel: ''
}

config.ifttt = {
  enabled: false,
  eventName: 'gekko',
  makerKey: '',
  muteSoft: true,
  sendMessageOnStart: true
}

config.candleWriter = {
  enabled: true
}

config.adviceWriter = {
  enabled: false,
  muteSoft: true,
}

config.adapter = 'sqlite';

config.sqlite = {
  path: 'plugins/sqlite',
  dataDirectory: 'history',
  version: 0.1,
  journalMode: require('../../web/isWindows.js') ? 'DELETE' : 'WAL',
  dependencies: []
}

config.postgresql = {
  path: 'plugins/postgresql',
  version: 0.1,
  connectionString: 'postgres://user:pass@localhost:5432',
  database: null,
  schema: 'public',
  dependencies: [{
    module: 'pg',
    version: '6.1.0'
  }]
}

config.mongodb = {
  path: 'plugins/mongodb',
  version: 0.1,
  connectionString: 'mongodb://127.0.0.1:27017/gekko',
  dependencies: [{
    module: 'mongojs',
    version: '2.4.0'
  }]
}

config.backtest = {
  daterange: 'scan',
  batchSize: 50
}

config.importer = {
  daterange: {
    from: "2017-11-01 00:00:00"
  }
}

config['I understand that Gekko only automates MY OWN trading strategies'] = true;

module.exports = config;
