import React from "react";
import ContentLoader from "react-content-loader";

const TimesLoader = (props) => (
  <ContentLoader
    speed={2}
    width={590}
    height={180}
    viewBox="0 0 590 180"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="4" y="19" rx="7" ry="7" width="100" height="37" />
    <rect x="4" y="65" rx="7" ry="7" width="100" height="37" />
    <rect x="4" y="111" rx="7" ry="7" width="100" height="37" />
    <rect x="121" y="20" rx="7" ry="7" width="100" height="37" />
    <rect x="121" y="66" rx="7" ry="7" width="100" height="37" />
    <rect x="121" y="112" rx="7" ry="7" width="100" height="37" />
    <rect x="236" y="22" rx="7" ry="7" width="100" height="37" />
    <rect x="236" y="68" rx="7" ry="7" width="100" height="37" />
    <rect x="236" y="114" rx="7" ry="7" width="100" height="37" />
    <rect x="353" y="23" rx="7" ry="7" width="100" height="37" />
    <rect x="353" y="69" rx="7" ry="7" width="100" height="37" />
    <rect x="353" y="115" rx="7" ry="7" width="100" height="37" />
    <rect x="470" y="24" rx="7" ry="7" width="100" height="37" />
    <rect x="470" y="70" rx="7" ry="7" width="100" height="37" />
    <rect x="470" y="116" rx="7" ry="7" width="100" height="37" />
  </ContentLoader>
);

export default TimesLoader;
