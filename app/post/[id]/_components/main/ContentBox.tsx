import React from "react";

const ContentBox = ({ content }: { content: string }) => {
  return (
    <div className="w-full px-2">
      <h2 className="text-2xl">본문</h2>
      <div className="py-5">
        <p dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export default ContentBox;
