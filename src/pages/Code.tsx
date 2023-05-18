import Editor from "@monaco-editor/react";
import { useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { editor } from "monaco-editor";
import { useEffect, useRef, useState } from "react";
import { API_DATA, getCode } from "../utils/getApiData";
import * as HrefList from "./HrefList";

export default function Code() {
  const [text, setText] = useState<API_DATA>();
  return (
    <Container sx={{ my: 2 }}>
      <Button href={HrefList.home} variant="contained" sx={{ mr: 1 }}>
        Home
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          getCode(5)
            .then(res => {
              console.log(res);
              setText(res);
            })
            .catch(err => {
              if (import.meta.env.DEV) {
                console.log(err);
              }
            });
        }}
      >
        Info
      </Button>
      <Editor
        height="60vh"
        defaultLanguage="javascript"
        options={{
          lineNumbers: "off",
          folding: false,
          glyphMargin: false,
          lineDecorationsWidth: 0,
          minimap: { enabled: false },
        }}
        theme={theme.palette.mode == "light" ? "light" : "vs-dark"}
        onMount={editor => {
          editorRef.current = editor;
          setEditorLoaded(true);
        }}
        value={text.code}
      />
      <br />
      <div>{text?.summary}</div>
    </Container>
  );
}
