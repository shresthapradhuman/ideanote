import React from "react";
import SimpleMDE, { SimpleMDEReactProps } from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const Editor = ({ value, onChange }: EditorProps) => {
  const anOptions = React.useMemo(() => {
    return {
      maxHeight: "300px",
      hideIcons: ["guide", "preview", "fullscreen", "side-by-side"],
      showIcons: ["strikethrough", "code", "table", "horizontal-rule"],
      spellChecker: false,
      status: false,
    } as SimpleMDEReactProps;
  }, []);
  return (
    <SimpleMDE
      options={anOptions}
      placeholder="eg: 'write your thoughts about NextJS middleware tutorial'"
      value={value}
      onChange={onChange}
    />
  );
};

export default Editor;
