const { JSDOM } = require('jsdom');
const Handlebars = require('handlebars');
const fs = require('fs');

const { window } = new JSDOM('<!DOCTYPE html><html lang="ru"><body><div id="app"></div></body></html>', {
  url: 'http://localhost:3000'
});

global.window = window;
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;
global.FormData = window.FormData;

require.extensions['.hbs'] = function (module, filename) {
  const content = fs.readFileSync(filename, 'utf-8');
  
  module.exports = Handlebars.compile(content);
}

require.extensions['.less'] = function () {
  module.exports = () => ({});
}
