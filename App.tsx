import styled from "styled-components";
import React from "react";

const Background = styled.div({
  "@media only screen": {
    background: "lightgrey",
    minHeight: "100vh",
    padding: "8rem 0",
    "> div": {
      width: "210mm",
      height: "297mm",
      background: "white",
      margin: "auto",
      boxShadow: "0px 3px 8px -1px rgba(0,0,0,0.41)",
      padding: "0.4in",
      paddingBottom: "0.56in",
    },
  },
});

export const App = () => (
  <Background>
    <div>content</div>
  </Background>
);
