const React = require('react');
const ReactDOMServer = require('react-dom/server');
const beautifyHTML = require('js-beautify').html;
const assign = require('object-assign');
const _escaperegexp = require('lodash.escaperegexp');
const { StaticRouter } = require('react-router-dom/server');

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

            // Menggunakan React.createElement alih-alih JSX untuk StaticRouter dan komponen utama
            const appMarkup = ReactDOMServer.renderToString(
                React.createElement(
                    StaticRouter,
                    { location: options.initialPath || '/' },
                    React.createElement(component, {
                        initialPath: options.initialPath,
                        initialData: options.initialData,
                        RouterComponent: StaticRouter,
                    })
                )
            );

            markup = `
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <title>${options.initialData.title || 'App'}</title>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
              </head>
              <body>
                <div id="root">${appMarkup}</div>
                <script>
                  window.__INITIAL_PROPS__ = ${JSON.stringify({
                initialPath: options.initialPath,
                initialData: options.initialData,
            })};
                </script>
                <script src="/bundle.min.js" defer></script>
              </body>
            </html>
          `;
        } catch (e) {
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
