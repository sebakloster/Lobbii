import React from "react";
import ContentLoader from "react-content-loader";

const MisHorariosLoader = (props) => (
  <ContentLoader
    speed={2}
    width={590}
    height={280}
    viewBox="0 0 590 280"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="183" y="43" rx="8" ry="8" width="88" height="35" />
    <rect x="301" y="45" rx="8" ry="8" width="86" height="35" />
    <circle cx="71" cy="152" r="29" />
    <circle cx="143" cy="152" r="29" />
    <circle cx="214" cy="152" r="29" />
    <circle cx="284" cy="153" r="29" />
    <circle cx="354" cy="154" r="29" />
    <circle cx="426" cy="155" r="29" />
    <circle cx="496" cy="154" r="29" />
    <rect x="101" y="224" rx="0" ry="0" width="361" height="37" />
  </ContentLoader>
);

export default MisHorariosLoader;
