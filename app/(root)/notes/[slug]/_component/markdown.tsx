import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MarkdownContent = ({ content }: { content: string }) => {
  return (
    <Markdown remarkPlugins={[[remarkGfm, { singleTilde: false }]]}>
      {content}
    </Markdown>
  );
};

export default MarkdownContent;
