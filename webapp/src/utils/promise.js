var es6Promise = require('es6-promise').Promise;

window && (window.Promise = window.Promise || es6Promise);
