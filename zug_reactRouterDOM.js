const React = require('react');
const ReactDOMServer = require('react-dom/server');
const beautifyHTML = require('js-beautify').html;
const assign = require('object-assign');
const _escaperegexp = require('lodash.escaperegexp');

const DEFAULT_OPTIONS = {
    doctype: '<!DOCTYPE html>',
    beautify: false,
    transformViews: true,
    babel: {
        presets: [
            '@babel/preset-react',
            [
                '@babel/preset-env',
                {
                    targets: {
                        node: 'current',
                    },
                },
            ],
        ],
        plugins: ['@babel/transform-flow-strip-types'],
    },
};

function createEngine(engineOptions) {
    let registered = false;
    let moduleDetectRegEx;

    engineOptions = assign({}, DEFAULT_OPTIONS, engineOptions || {});

    function renderFile(filename, options, cb) {
        let markup = engineOptions.doctype;
        let component;

        if (!moduleDetectRegEx) {
            moduleDetectRegEx = new RegExp(
                [].concat(options.settings.views)
                    .map(viewPath => '^' + _escaperegexp(viewPath))
                    .join('|')
            );
        }

        if (engineOptions.transformViews && !registered) {
            require('@babel/register')(
                assign({ only: [].concat(options.settings.views) }, engineOptions.babel)
            );
            registered = true;
        }

        try {
            component = require(filename);
            component = component.default || component;

            // Tambahkan debugging untuk memeriksa tipe komponen
            console.log("Loaded component type:", typeof component);

            // Pastikan component adalah function atau class (komponen React yang valid)
            if (typeof component !== 'function' && typeof component !== 'object') {
                throw new Error("Invalid component type. Expected a React component.");
            }

            // Render komponen ke string dengan initialProps yang dikirim dari server
            const appMarkup = ReactDOMServer.renderToString(
                React.createElement(component, options)
            );

            // Bangun markup HTML untuk dikirim ke klien
            markup = `
            <html>
              <head>
                <title>${options.title || 'App'}</title>
              </head>
              <body>
                <div id="root">${appMarkup}</div>
                <script>
                  window.__INITIAL_PROPS__ = ${JSON.stringify(options)};
                </script>
                <script src="/bundle.min.js" type="module" defer></script>
              </body>
            </html>
          `;
        } catch (e) {
            console.error("Error rendering component:", e);
            return cb(e);
        } finally {
            if (options.settings.env === 'development') {
                Object.keys(require.cache).forEach(function (module) {
                    if (moduleDetectRegEx.test(require.cache[module].filename)) {
                        delete require.cache[module];
                    }
                });
            }
        }

        if (engineOptions.beautify) {
            markup = beautifyHTML(markup);
        }

        cb(null, markup);
    }

    return renderFile;
}

exports.createEngine = createEngine;
