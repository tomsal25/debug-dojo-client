import Editor from "@monaco-editor/react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import Fade from "@mui/material/Fade";
import { editor } from "monaco-editor";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "../components/Accordion";
import { Loading } from "../components/Loading";
import { API_DATA, API_DATA_ERROR_STATUS, getCode } from "../utils/getApiData";
import { testCode } from "../utils/testCode";
import { isPositiveInteger } from "../utils/validator";
import * as HrefList from "./HrefList";
import NetworkError from "./NetworkError";
import NotFound from "./NotFound";

const CodeInfo = (props: { id: number; info: string }) => {
  const [testExpanded, setTestExpanded] = useState(false);

  return (
    <Accordion
      expanded={testExpanded}
      onChange={() => setTestExpanded(!testExpanded)}
      sx={{ mb: 1 }}
    >
      <AccordionSummary>{`ID: ${props.id}`}</AccordionSummary>
      <AccordionDetails>{`summary: ${props.info}`}</AccordionDetails>
    </Accordion>
  );
};

const Code = ({ rawData }: { rawData: API_DATA }) => {
  const [result, setResult] = useState("init");
  const [isEditorLoaded, setIsEditorLoaded] = useState(false);

  const editorRef = useRef<editor.IStandaloneCodeEditor>();

  const theme = useTheme();

  return (
    <Container sx={{ my: 2 }}>
      <Button href={HrefList.home} variant="contained" sx={{ mr: 1 }}>
        Home
      </Button>

      <Loading open={!isEditorLoaded} />

      <CodeInfo id={rawData.id} info={rawData.summary} />

      <Editor
        defaultLanguage="javascript"
        options={{
          lineNumbers: "off",
          folding: false,
          glyphMargin: false,
          lineDecorationsWidth: 0,
          minimap: { enabled: false },
        }}
        loading={null}
        height="50vh"
        theme={theme.palette.mode == "light" ? "light" : "vs-dark"}
        onMount={editor => {
          editorRef.current = editor;
          setIsEditorLoaded(true);
        }}
        value={rawData.code}
      />

      <Fade in={isEditorLoaded}>
        <Fab
          onClick={() => {
            const userCode = editorRef.current?.getValue();
            if (!userCode) return;
            setResult("testing");
            testCode(userCode, rawData.test)
              .then(res => {
                if (import.meta.env.DEV) {
                  console.log(res);
                }
                // TODO: consider how to display result
                setResult(
                  res.every(flag => flag.type == "code" && flag.flag)
                    ? "Passed!"
                    : new Date().toLocaleString() +
                        ": " +
                        res
                          .map(flag => {
                            if (flag.type == "code")
                              return flag.flag ? "o" : "x";
                            if (flag.type == "error") return flag.name;
                            return "timeout";
                          })
                          .join(", ")
                );
              })
              .catch(error => {
                if (import.meta.env.DEV) {
                  console.log(error);
                }
              });
          }}
          variant="extended"
          color="primary"
          sx={{
            position: "fixed",
            bottom: { xs: 30, md: 60 },
            right: { xs: 30, md: "10vw" },
            transform: { md: "scale(1.2)" },
          }}
        >
          <PlayArrowIcon />
          Run
        </Fab>
      </Fade>

      <br />
      <div>{result}</div>
    </Container>
  );
};

interface Init {
  type: 0;
}

interface NotFound {
  type: 1;
}

interface NetworkError {
  type: 2;
}

interface Normal {
  type: 3;
  data: API_DATA;
}

type Status = Init | NotFound | NetworkError | Normal;

export default function ValidateCode({ id }: { id?: number }) {
  const [status, setStatus] = useState<Status>({ type: 0 });

  const param = useParams();
  const _id = id ? `${id}` : param.id;

  useEffect(() => {
    if (!_id || !isPositiveInteger.test(_id)) {
      return setStatus({ type: 1 });
    }

    const abortController = new AbortController();
    const requestId = parseInt(_id, 10);

    getCode(requestId, abortController.signal)
      .then(data => setStatus({ type: 3, data: data }))
      .catch(error => {
        // ignore aborted fetch
        if (error == API_DATA_ERROR_STATUS.ABORT) return;
        if (error == API_DATA_ERROR_STATUS.OUT) return setStatus({ type: 1 });
        return setStatus({ type: 2 });
      });

    return () => {
      abortController.abort();
    };
  }, [_id]);

  if (status.type == 1) return <NotFound />;
  if (status.type == 2) return <NetworkError />;
  if (status.type == 3) return <Code rawData={status.data} />;
  return <Loading />;
}
