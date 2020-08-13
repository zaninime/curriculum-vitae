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
import YAML from "yaml";
import { App } from "./App";
import { StaticContext, StaticContextType } from "./staticContext";
import { pipe } from "fp-ts/pipeable";

const GlobalStyles = createGlobalStyle`
html {
  box-sizing: border-box;
  font-size: 12px;
}

*, *:before, *:after {
  box-sizing: inherit;
}

.noprint {
  @media only print {
    display: none;
  }
}

.onlyprint-flex {
  display: none;
  @media only print {
    display: flex;
  }
}
`;

const render = (appElement: JSX.Element): IO.IO<string> => () => {
  const renderAppWithStyles = () => {
    const sheet = new ServerStyleSheet();
    try {
      const app = ReactDOMServer.renderToStaticMarkup(
        <StyleSheetManager sheet={sheet.instance}>
          <>
            <GlobalStyles />
            {appElement}
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
        <meta charSet="utf-8" />
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

const wrappedApp = (staticData: StaticContextType): JSX.Element => (
  <StaticContext.Provider value={staticData}>
    <App />
  </StaticContext.Provider>
);

const readStaticData: T.Task<any> = () =>
  fse.readFile("static.yaml", "utf8").then((str) => YAML.parse(str));

const writePage = (content: string): T.Task<void> => () =>
  fse.writeFile("dist/index.html", content);

const renderWrappedApp = pipe(
  readStaticData,
  T.chain((staticData) => T.fromIO(render(wrappedApp(staticData))))
);

const app = T.chain(writePage)(renderWrappedApp);

app().catch((err) => {
  console.error(err);
  process.exit(1);
});
