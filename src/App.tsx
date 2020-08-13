import styled from "styled-components";
import React from "react";
import {
  StaticContext,
  WorkType,
  EducationType,
  LanguageType,
} from "./staticContext";

const showPageMarker = false;
const pagePaddingBottom = "0.56in";
const pagePadding = "0.4in";
const pageSizes = ["210mm", "297mm"];

const Background = styled.div({
  "@media only screen": {
    background: "#ececec",
    minHeight: "100vh",
    padding: `${pagePadding} 0`,
  },
});

const Paper = styled.main({
  "@media only screen": {
    background: "white",
    margin: "auto",
    boxShadow: "0px 3px 8px -1px rgba(0,0,0,0.41)",
  },
  width: pageSizes[0],
  [showPageMarker ? "minHeight" : "height"]: pageSizes[1],
  padding: pagePadding,
  paddingBottom: pagePaddingBottom,
  pageBreakInside: "avoid",
  position: showPageMarker ? "relative" : "static",
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

const SectionTitle = (
  props: JSX.IntrinsicElements["h2"] & { spacing?: "big" }
) => (
  <h2
    className={`${props.spacing === "big" ? "mb-4 mt-6" : "mb-2"} text-2xl`}
    {...props}
  />
);

export const App = () => {
  const staticData = React.useContext(StaticContext);

  return (
    <Background className="subpixel-antialiased">
      <Paper>
        {showPageMarker && <Marker />}
        <div className="grid grid-cols-3 gap-6">
          <div>
            <ProfileImage className="my-8 mx-auto rounded-full w-32" />
            <h1 className="font-semibold text-2xl text-center mb-10">
              Francesco Zanini
            </h1>
            <SectionTitle spacing="big">Skills</SectionTitle>
            <div className="flex flex-wrap">
              {staticData.skills.map((v, i) => (
                <div
                  className="bg-orange-200 mb-1 mr-2 px-1"
                  key={`$entry-${i}`}
                >
                  {v}
                </div>
              ))}
            </div>
            <SectionTitle spacing="big">Interests</SectionTitle>
            <ul>
              {staticData.interests.map((v, i) => (
                <li className="my-2" key={`$entry-${i}`}>
                  {v}
                </li>
              ))}
            </ul>
            <SectionTitle spacing="big">Languages</SectionTitle>
            <div className="flex flex-wrap">
              {staticData.languages.map((v, i) => (
                <LanguageEntry language={v} key={`$entry-${i}`} />
              ))}
            </div>
            <SectionTitle spacing="big">Contacts</SectionTitle>
            <div>
              <a
                className="flex items-center py-2"
                href="https://www.linkedin.com/in/francesco-zanini/"
              >
                <img
                  className="mr-3 w-6"
                  src="/icons/linkedin.svg"
                  alt="LinkedIn Profile"
                />
                <pre>francesco-zanini</pre>
              </a>
            </div>
            <div>
              <a
                className="flex items-center py-2"
                href="https://github.com/zaninime"
              >
                <img
                  className="mr-3 w-6"
                  src="/icons/github.svg"
                  alt="GitHub Profile"
                />
                <pre>zaninime</pre>
              </a>
            </div>
            <div className="items-center py-2 onlyprint-flex">
              <img
                className="mr-3 w-6"
                src="/icons/cv.svg"
                alt="This Curriculum Vitae"
              />
              <pre>francesco.zanini.me/cv/</pre>
            </div>
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
      </Paper>
      <footer className="mt-8 noprint text-center text-gray-700 text-sm">
        <div>
          Copyright &copy; {new Date().getFullYear()} Francesco Zanini. All
          rights reserved.
        </div>
        <div>
          Source code available on{" "}
          <a
            className="underline"
            href="https://github.com/zaninime/curriculum-vitae"
          >
            GitHub
          </a>
          .
        </div>
      </footer>
    </Background>
  );
};

const ProfileImage = (props: JSX.IntrinsicElements["img"]) => (
  <img {...props} src="me.jpeg" alt="Francesco Zanini" />
);

const WorkEntry = ({ work }: { work: WorkType }) => (
  <>
    <div className="flex items-end">
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">{work.role}</h3>
        <h4 className="italic">{work.workplace}</h4>
      </div>
      <div className="text-right text-gray-700">
        {work.location}
        <br />
        {work.period}
      </div>
    </div>
    <ul className="list-disc list-outside mt-1 ml-5 mb-2">
      {work.highlights.map((v, i) => (
        <li key={`$entry-${i}`}>{v}</li>
      ))}
    </ul>
  </>
);

const EducationEntry = ({ education }: { education: EducationType }) => (
  <>
    <h3 className="text-sm font-semibold">{education.course}</h3>
    <h4 className="font-semibold">{education.university}</h4>
    <ul className="list-disc list-outside mt-1 ml-5 mb-2">
      {education.projects.map((v, i) => (
        <li key={`$entry-${i}`}>{v}</li>
      ))}
    </ul>
  </>
);

const proficiencyToBg: Record<string, string> = {
  proficient: "green-400",
  native: "blue-400",
  basic: "gray-300",
};

const LanguageEntry = ({ language }: { language: LanguageType }) => (
  <div
    className={`mr-2 mb-2 px-2 bg-${
      proficiencyToBg[language.level.toLowerCase()]
    }`}
  >
    {language.name}: {language.level}
  </div>
);
