var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;

var _articles = {};

/**
 * Create a Article item.
 * @param  {string} text The content of the Article
 */

function create (text) {
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);

  _articles[id] = {
    id: id,
    title: "Title",
    text: text
  };
}

/**
 * Update an Article item.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function update(id, updates) {
  _todos[id] = assign({}, _todos[id], updates);
}

function updateAll (updates) {
  for (var id in _articles) {
    update(id, updates);
  }
}

function destroy(id) {
  delete _articles[id];
}
