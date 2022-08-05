import { Stack, Text } from "@chakra-ui/react";
import React from "react";
import ReactQuill from "react-quill";
import CustomToolbar, { modules, formats } from "./CustomToolbar";
import "./quill.bubble.css";

export const Editor = ({
  editorContent,
  handleChange,
  isRequired,
  name,
  isDisabled,
}) => {
  return (
    <Stack className="text-editor">
      <CustomToolbar />

      <Text as="span" fontSize="lg">
        Content{" "}
        <Text as="span" fontSize="lg" color="#fc8181">
          {isRequired && "*"}
        </Text>
      </Text>

      <ReactQuill
        name={name}
        theme="bubble"
        readOnly={isDisabled}
        modules={modules}
        formats={formats}
        value={editorContent}
        onChange={handleChange}
        placeholder="Your content here"
      />
    </Stack>
  );
};

export default Editor;
