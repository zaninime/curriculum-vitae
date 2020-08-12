import styled from "styled-components";
import React from "react";
import {
  StaticContext,
  WorkType,
  EducationType,
  LanguageType,
} from "./staticContext";

const showPageMarker = true;
const pagePaddingBottom = "0.56in";
const pageSizes = ["210mm", "297mm"];

const Background = styled.div({
  "@media only screen": {
    background: "#ececec",
    minHeight: "100vh",
    padding: "8rem 0",
    "> div": {
      width: pageSizes[0],
      minHeight: pageSizes[1],
      background: "white",
      margin: "auto",
      boxShadow: "0px 3px 8px -1px rgba(0,0,0,0.41)",
      padding: "0.4in",
      paddingBottom: pagePaddingBottom,
    },
  },
});

const Marker = styled.div({
  position: "absolute",
  height: "1px",
  width: "100%",
  top: "0",
  left: "0",
  transform: `translateY(calc(${pageSizes[1]} - ${pagePaddingBottom}))`,
  background: "red",
});

const SectionTitle = (props: JSX.IntrinsicElements["h2"]) => (
  <h2 className="my-2" {...props} />
);

export const App = () => {
  const staticData = React.useContext(StaticContext);

  return (
    <Background className="subpixel-antialiased">
      <div style={showPageMarker ? { position: "relative" } : {}}>
        {showPageMarker && <Marker />}
        <h1 className="text-2xl text-center">Francesco Zanini</h1>
        <div className="grid grid-cols-3">
          <div>
            <ProfileImage className="mb-8 mx-auto rounded-full w-32" />
            <SectionTitle>Soft-Skills</SectionTitle>
            <div>TODO!</div>
            <SectionTitle>Interests</SectionTitle>
            {staticData.interests.map((v, i) => (
              <div key={`$entry-${i}`} className="text-xs">
                {v}
              </div>
            ))}
            <SectionTitle>Languages</SectionTitle>
            <div className="flex flex-wrap">
              {staticData.languages.map((v, i) => (
                <LanguageEntry language={v} key={`$entry-${i}`} />
              ))}
            </div>
            <SectionTitle>Contacts</SectionTitle>
            <div>TODO!</div>
          </div>
          <div className="col-span-2">
            <SectionTitle>Work Experience</SectionTitle>
            {staticData.work.map((v, i) => (
              <WorkEntry work={v} key={`$entry-${i}`} />
            ))}
            <SectionTitle>Freelance Experience</SectionTitle>
            {staticData.freelance.map((v, i) => (
              <WorkEntry work={v} key={`$entry-${i}`} />
            ))}
            <SectionTitle>Education and Academic Projects</SectionTitle>
            {staticData.education.map((v, i) => (
              <EducationEntry education={v} key={`$entry-${i}`} />
            ))}
          </div>
        </div>
      </div>
    </Background>
  );
};

const ProfileImage = (props: JSX.IntrinsicElements["img"]) => (
  <img
    {...props}
    src="https://media-exp1.licdn.com/dms/image/C4D03AQEo9AQeKA1mJA/profile-displayphoto-shrink_200_200/0?e=1602720000&v=beta&t=bKNaQJzqXMPoGrAB0Pgvhv9Trj58vJleGiYurxPR3vU"
  />
);

const WorkEntry = ({ work }: { work: WorkType }) => (
  <>
    <div className="flex items-end">
      <h3 className="text-sm font-semibold flex-grow">
        {work.role} / {work.period}
      </h3>
      <h4 className="text-xs text-right font-semibold">
        {work.workplace}
        <br />
        {work.location}
      </h4>
    </div>
    <ul className="list-disc list-outside mt-1 ml-5 mb-2 text-xs">
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
    <ul className="list-disc list-outside mt-1 ml-5 mb-2 text-xs">
      {education.projects.map((v, i) => (
        <li key={`$entry-${i}`}>{v}</li>
      ))}
    </ul>
  </>
);

const proficiencyToBg: Record<string, string> = {
  proficient: "green-500",
  native: "blue-400",
  basic: "gray-300",
};

const LanguageEntry = ({ language }: { language: LanguageType }) => (
  <div
    className={`text-xs mr-2 mb-2 px-2 py-1 rounded text-xs bg-${
      proficiencyToBg[language.level.toLowerCase()]
    }`}
  >
    {language.name}: {language.level}
  </div>
);
