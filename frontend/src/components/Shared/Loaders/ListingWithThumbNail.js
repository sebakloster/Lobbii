import React from "react";
import ContentLoader from "react-content-loader";

const ListingWithThumbnail = (props) => {
  return (
    <ContentLoader style={{ width: "100%", maxHeight: "6rem" }} {...props}>
      <rect x="103" y="12" rx="3" ry="3" width="123" height="5" />
      <circle cx="44" cy="42" r="38" />
      <rect x="105" y="48" rx="3" ry="3" width="171" height="4" />
    </ContentLoader>
  );
};

export default ListingWithThumbnail;
