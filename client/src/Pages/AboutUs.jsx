import React from "react";

/**
 * AboutUs Component - Displays information about the math competition site.
 * @component
 * @returns {JSX.Element} AboutUs component
 */
const AboutUs = () => {
  return (
    <>
      <ul className="homePageSectionDesc">
        <li>We are a math competition site that will put your mathematical skills to the test.</li>
        <li>In this game, two players go head-to-head to see who can solve 10 math questions the fastest.</li>
        <li>The player who answers all questions first wins the round.</li>
        <li>There is also a single player mode for practicing.</li>
      </ul>
    </>
  );
};

export default AboutUs;
