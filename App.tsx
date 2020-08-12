import styled from "styled-components";
import React from "react";
import {
  StaticContext,
  WorkType,
  EducationType,
  LanguageType,
} from "./staticContext";

const Background = styled.div({
  "@media only screen": {
    background: "#ececec",
    minHeight: "100vh",
    padding: "8rem 0",
    "> div": {
      width: "210mm",
      minHeight: "297mm",
      background: "white",
      margin: "auto",
      boxShadow: "0px 3px 8px -1px rgba(0,0,0,0.41)",
      padding: "0.4in",
      paddingBottom: "0.56in",
    },
  },
});

export const App = () => {
  const staticData = React.useContext(StaticContext);

  return (
    <Background className="subpixel-antialiased">
      <div>
        <h1 className="text-2xl text-center">Francesco Zanini</h1>
        <h2>Work Experience</h2>
        {staticData.work.map((v, i) => (
          <WorkEntry work={v} key={`$entry-${i}`} />
        ))}
        <h2>Freelance Experience</h2>
        {staticData.freelance.map((v, i) => (
          <WorkEntry work={v} key={`$entry-${i}`} />
        ))}
        <h2>Education and Academic Projects</h2>
        {staticData.education.map((v, i) => (
          <EducationEntry education={v} key={`$entry-${i}`} />
        ))}
        <h2>Languages</h2>
        {staticData.languages.map((v, i) => (
          <LanguageEntry language={v} key={`$entry-${i}`} />
        ))}
        <h2>Interests</h2>
        {staticData.interests.map((v, i) => (
          <div key={`$entry-${i}`} className="text-xs">
            {v}
          </div>
        ))}
      </div>
    </Background>
  );
};

const WorkEntry = ({ work }: { work: WorkType }) => (
  <>
    <h3 className="text-sm font-semibold">
      {work.role} ({work.period})
    </h3>
    <h4 className="text-xs font-semibold">
      {work.workplace}, {work.location}
    </h4>
    <ul className="list-disc list-outside ml-5 text-xs">
      {work.highlights.map((v, i) => (
        <li key={`$entry-${i}`}>{v}</li>
      ))}
    </ul>
  </>
);

const EducationEntry = ({ education }: { education: EducationType }) => (
  <>
    <h3 className="text-sm font-semibold">{education.course}</h3>
    <h4 className="text-xs font-semibold">{education.university}</h4>
    <ul className="list-disc list-outside ml-5 text-xs">
      {education.projects.map((v, i) => (
        <li key={`$entry-${i}`}>{v}</li>
      ))}
    </ul>
  </>
);

const LanguageEntry = ({ language }: { language: LanguageType }) => (
  <div className="text-xs">
    {language.name}: {language.level}
  </div>
);
