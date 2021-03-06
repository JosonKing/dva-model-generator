'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.default = modelExtend;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const fs = require('fs');
// const path = require('path');
// const targetContent = {};
// fs.readFile(path.join(__dirname, '../../data/source.js'), 'utf8', (err, data) => {
//   if (err) throw err;
//   let exportDefalut = JSON.stringify(data);
//   exportDefalut = JSON.parse(exportDefalut);
//   targetContent.
//   fs.writeFile('../../data/target.js', exportDefalut, 'utf8', (err) => {
//       if (err) throw err;
//       console.log('success done');
//   })
// })

var check = function check(origin, cache, count) {
  if (process.env.NODE_ENV !== 'production') {
    for (var key in origin) {
      if (cache.indexOf(key) === -1) {
        cache.push(key);
      } else {
        count[key] ? count[key]++ : count[key] = 1;
      }
    }
  }
};

var log = function log(model, constitute, count) {
  if (process.env.NODE_ENV !== 'production') {
    var logCount = 0;
    for (var key in count) {
      if (!logCount) {
        console.warn('Please note that some of the attributes are inherited in the ' + model.namespace + ' / ' + constitute + ':');
      }
      logCount++;
      console.warn('  -> ' + key + ' be overwritten ' + count[key] + ' time(s).');
    }
  }
};

function modelExtend() {
  var base = { state: {}, subscriptions: {}, effects: {}, reducers: {} };
  var stateCache = [];
  var stateCount = {};
  var subscriptionsCache = [];
  var subscriptionsCount = {};
  var effectsCache = [];
  var effectsCount = {};
  var reducersCache = [];
  var reducersCount = {};

  for (var _len = arguments.length, models = Array(_len), _key = 0; _key < _len; _key++) {
    models[_key] = arguments[_key];
  }

  var model = models.reduce(function (acc, extend) {
    acc.namespace = extend.namespace;
    if ((0, _typeof3.default)(extend.state) === 'object' && !Array.isArray(extend.state)) {
      check(extend.state, stateCache, stateCount);
      (0, _assign2.default)(acc.state, extend.state);
    } else if ('state' in extend) {
      acc.state = extend.state;
    }
    check(extend.subscriptions, subscriptionsCache, subscriptionsCount);
    (0, _assign2.default)(acc.subscriptions, extend.subscriptions);
    check(extend.effects, effectsCache, effectsCount);
    (0, _assign2.default)(acc.effects, extend.effects);
    check(extend.reducers, reducersCache, reducersCount);
    (0, _assign2.default)(acc.reducers, extend.reducers);
    return acc;
  }, base);

  log(model, 'state', stateCount);
  log(model, 'subscriptions', subscriptionsCount);
  log(model, 'effects', effectsCount);
  log(model, 'reducers', reducersCount);
  return model;
};