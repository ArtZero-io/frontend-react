import "./quill.bubble.css";

import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./CustomToolbar";
import { Stack, Text } from "@chakra-ui/react";

export const Editor = ({
  editorContent,
  handleChange,
  isRequired,
  name,
  isDisabled,
  index,
  mode,
}) => {
  const [state, setState] = useState({ value: null });

  const handleOnChange = (value) => {
    setState({ value });
    handleChange(value, index);
  };

  useEffect(() => {
    if (mode === "EDIT") {
      setState({ value: editorContent });
    }
  }, [editorContent, mode]);

  return (
    <div className="text-editor">
      <EditorToolbar />
      <Stack pb="6px" pl="4px">
        <Text as="span" fontSize="lg">
          Milestone description{" "}
          <Text as="span" fontSize="lg" color="#fc8181">
            {isRequired && "*"}
          </Text>
        </Text>
      </Stack>

      <ReactQuill
        readOnly={isDisabled}
        theme="bubble"
        value={state.value}
        onChange={handleOnChange}
        placeholder="Your milestone description here"
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default Editor;
