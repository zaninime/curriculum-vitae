import React from "react";
import ReactDOMServer from "react-dom/server";
import fse from "fs-extra";
import * as T from "fp-ts/Task";
import * as IO from "fp-ts/IO";
import {
  ServerStyleSheet,
  StyleSheetManager,
  createGlobalStyle,
} from "styled-components";
import { App } from "./App";

const GlobalStyles = createGlobalStyle`
html {
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: inherit;
}
`;

const render = (App: React.ComponentType): IO.IO<string> => () => {
  const renderAppWithStyles = () => {
    const sheet = new ServerStyleSheet();
    try {
      const app = ReactDOMServer.renderToStaticMarkup(
        <StyleSheetManager sheet={sheet.instance}>
          <>
            <GlobalStyles />
            <App />
          </>
        </StyleSheetManager>
      );

      return { app, styleElement: sheet.getStyleElement() };
    } catch (error) {
      throw error;
    } finally {
      sheet.seal();
    }
  };

  const { app, styleElement } = renderAppWithStyles();

  const shell = (
    <html>
      <head>
        <title>Francesco Zanini - Curriculum Vitae</title>
        <meta name="robots" content="noindex,follow" />
        <link
          href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
          rel="stylesheet"
        />
        {styleElement}
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: app }} />
      </body>
    </html>
  );

  return "<!doctype html>" + ReactDOMServer.renderToStaticMarkup(shell);
};

const main = () => {
  const makeDir: T.Task<void> = () => fse.mkdirp("dist/cv");

  const write = (content: string): T.Task<void> => () =>
    fse.writeFile("dist/cv/index.html", content);

  const app = T.apSecond(T.chain(write)(T.fromIO(render(App))))(makeDir);

  return app();
};

main();
