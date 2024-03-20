import React from "react";

function ImagePreview({ url, setViewImage }) {
  return (
    <div className="darker-screen z3 flex center pointer" onClick={() => setViewImage(false)}>
      <img src={url} alt="daniel img..." className="image-modal" />
    </div>
  );
}

export default ImagePreview;
