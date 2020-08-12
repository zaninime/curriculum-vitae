import React from "react";
import ReactDOMServer from "react-dom/server";
import fse from "fs-extra";
import * as T from "fp-ts/Task";

const App = () => (
  <html>
    <head>
      <title>Francesco Zanini - Curriculum Vitae</title>
      <meta name="robots" content="noindex,follow" />
    </head>
    <body>hello</body>
  </html>
);

const main = () => {
  const makeDir: T.Task<void> = () => fse.mkdirp("dist/cv");

  const render = T.fromIO(
    () => "<!doctype html>" + ReactDOMServer.renderToStaticMarkup(<App />)
  );

  const write = (content: string): T.Task<void> => () =>
    fse.writeFile("dist/cv/index.html", content);

  const app = T.apSecond(T.chain(write)(render))(makeDir);

  return app();
};

main();
