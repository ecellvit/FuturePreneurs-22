import React from "react";

import { ColorRing } from "react-loader-spinner";

const Loading = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <ColorRing
        visible={true}
        height="120"
        width="120"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#130AE6 ", "#236DCE", "#BC304B", "#BF3EC3", "#E69951"]}
      />
    </div>
  );
};

export default Loading;
