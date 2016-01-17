var Dispatcher = require('../dispatcher/Dispatcher');
var RadioConstants = require('../constants/RadioConstants');
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');

var ActionTypes = RadioConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _user = {};

function _setUser(user) {
  _user = user;
}

var UserStore = _.extend({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  get: function() {
    return _user;
  },
});

Dispatcher.register(function(action) {

  switch(action.type) {

    case ActionTypes.USER_LOGIN_SUCCESS:
      _setUser(action.user);
      UserStore.emitChange();
      break;

    case ActionTypes.USER_LOGOUT:
      _setUser({});
      UserStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = UserStore;
