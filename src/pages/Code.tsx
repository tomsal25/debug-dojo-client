import Editor from "@monaco-editor/react";
import { useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Fade from "@mui/material/Fade";
import { editor } from "monaco-editor";
import { useEffect, useRef, useState } from "react";
import { API_DATA, API_DATA_ERROR_STATUS, getCode } from "../utils/getApiData";
import * as HrefList from "./HrefList";

const testCode = (sourceCode: string, testCode: string) => {
  const resultList = testCode.split("\n").map(e => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-implied-eval
      const result = new Function(sourceCode + ";return " + e)() as boolean;
      return result;
    } catch (err) {
      return false;
    }
  });
  console.log(resultList);
  resultList.every(isPassed => isPassed);
  return resultList;
};

export default function Code() {
  const [text, setText] = useState<API_DATA>({
    id: -1,
    code: "",
    test: "",
    summary: "",
  });
  const [result, setResult] = useState("init");
  const [apiLoaded, setApiLoaded] = useState(false);
  const [editorLoaded, setEditorLoaded] = useState(false);

  const editorRef = useRef<editor.IStandaloneCodeEditor>();

  const theme = useTheme();

  useEffect(() => {
    const abortController = new AbortController();
    getCode(1, abortController.signal)
      .then(res => {
        console.log(res);
        setText(res);
        setApiLoaded(true);
      })
      .catch(err => {
        // ignore aborted fetch
        if (err == API_DATA_ERROR_STATUS.ABORT) return;
        if (import.meta.env.DEV) {
          console.log(err);
        }
      });
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <Container sx={{ my: 2 }}>
      <Button href={HrefList.home} variant="contained" sx={{ mr: 1 }}>
        Home
      </Button>
      <Fade in={apiLoaded && editorLoaded}>
        <Button
          onClick={() => {
            const userCode = editorRef.current?.getValue();
            if (!userCode) return;
            const res = testCode(userCode, text.test);
            setResult(res.every(flag => flag) ? "Passed!" : "Failed...");
            console.log(userCode);
          }}
        >
          test!
        </Button>
      </Fade>
      <div>{result}</div>
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
      <div>{text.summary}</div>
    </Container>
  );
}
