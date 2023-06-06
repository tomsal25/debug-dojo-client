import CasinoIcon from "@mui/icons-material/Casino";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import HelpIcon from "@mui/icons-material/Help";
import HomeIcon from "@mui/icons-material/Home";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ReplayIcon from "@mui/icons-material/Replay";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { editor } from "monaco-editor";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "../components/Accordion";
import { Editor } from "../components/Editor";
import { LabeledButton } from "../components/LabeledButton";
import { Loading } from "../components/Loading";
import { API_DATA, API_DATA_ERROR_STATUS, getCode } from "../utils/getApiData";
import { testCode } from "../utils/testCode";
import { isPositiveInteger } from "../utils/validator";
import { canUseWorker } from "../utils/workerUtil";
import * as HrefList from "./HrefList";
import NetworkError from "./NetworkError";
import NotFound from "./NotFound";

const CodeInfo = ({ id, info }: { id: number; info: string }) => {
  const [testExpanded, setTestExpanded] = useState(false);

  return (
    <Accordion
      expanded={testExpanded}
      onChange={() => setTestExpanded(!testExpanded)}
      sx={{ mb: 1 }}
    >
      <AccordionSummary>{`ID: ${id}`}</AccordionSummary>
      <AccordionDetails>{`summary: ${info}`}</AccordionDetails>
    </Accordion>
  );
};

interface ResultInit {
  type: 0;
}

interface ResultTesting {
  type: 1;
}

interface ResultAnswer {
  type: 2;
  pass: boolean;
}

interface ResultError {
  type: 3;
}

type ResultData = ResultInit | ResultTesting | ResultAnswer | ResultError;

const ResultModal = ({
  result,
  retry,
}: {
  result: ResultData;
  retry: () => void;
}) => {
  const open = result.type != 0;
  const isTesting = result.type == 1;

  const ResultText = () => {
    if (result.type == 1) return <Typography>testing...</Typography>;
    if (result.type == 2)
      return (
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
          {result.pass ? (
            // on success
            <>
              <CheckCircleIcon color="success" />
              <Typography>passed!</Typography>
            </>
          ) : (
            // on failed
            <>
              <ErrorIcon color="error" />
              <Typography>failed!</Typography>
            </>
          )}
        </Box>
      );
    // on error
    if (result.type == 3)
      return <Typography>Something went wrong. Please retry.</Typography>;

    return <Typography sx={{ visibility: "hidden" }}>init</Typography>;
  };

  return (
    <Modal open={open}>
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 600,
            maxWidth: "95vw",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 3,
          }}
        >
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" component="h2">
              Result
            </Typography>
          </Box>

          <Box sx={{ mb: 2, textAlign: "center" }}>
            <ResultText />
          </Box>

          <Box
            sx={{
              display: "flex",
              mx: 1,
              justifyContent: "space-evenly",
              alignItems: "flex-end",
            }}
          >
            <LabeledButton
              icon={<ReplayIcon fontSize="large" />}
              label="Retry"
              color="#e55"
              disabled={isTesting}
              onClick={retry}
              sx={{ mr: 1 }}
            />
            <LabeledButton
              icon={<HomeIcon />}
              label="Home"
              disabled={isTesting}
              href={HrefList.home}
            />
            <LabeledButton
              icon={<CasinoIcon />}
              label="Random"
              disabled={isTesting}
              href={HrefList.random}
            />
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

const Code = ({ rawData }: { rawData: API_DATA }) => {
  const [result, setResult] = useState<ResultData>({ type: 0 });
  const [isEditorLoaded, setIsEditorLoaded] = useState(false);
  const [isUseWorker, setIsUseWorker] = useState(true);

  const editorRef = useRef<editor.IStandaloneCodeEditor>();

  const runCode = () => {
    const userCode = editorRef.current?.getValue();
    if (!userCode) return;

    setResult({ type: 1 });

    testCode(userCode, rawData.test, isUseWorker)
      .then(res => {
        if (import.meta.env.DEV) {
          console.log(res);
        }

        const displayDelay = 1000;
        setTimeout(() => {
          setResult({
            type: 2,
            pass: res.every(flag => flag.type == "code" && flag.flag),
          });
        }, displayDelay);
      })
      .catch(error => {
        if (import.meta.env.DEV) {
          console.log(error);
        }
        setResult({ type: 3 });
      });
  };

  return (
    <Container sx={{ my: 2 }}>
      <Loading open={!isEditorLoaded} />

      {/* safe mode check box */}
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "end" }}
      >
        <Switch
          value={canUseWorker && isUseWorker}
          onChange={event =>
            canUseWorker && setIsUseWorker(event.target.checked)
          }
          disabled={!canUseWorker}
          defaultChecked={canUseWorker}
        />

        <Typography sx={{ mr: 1 }}>Safe mode</Typography>

        <Tooltip
          title={
            <>
              {canUseWorker ? (
                ""
              ) : (
                <Typography
                  sx={{
                    p: 0.5,
                    fontSize: "1.1em",
                    color: "#e31",
                    background: "#eee",
                  }}
                >
                  !!! WARNING !!!
                  <br />
                  You can NOT use this feature because your browser does not
                  support Web Worker.
                </Typography>
              )}
              Safe Mode allows you to run your code safely.
              <br />* You can avoid infinite loops.
            </>
          }
          enterTouchDelay={0}
          leaveTouchDelay={5000}
          placement="bottom-start"
        >
          <HelpIcon />
        </Tooltip>
      </Box>

      {/* editor wrapper */}
      <Editor
        height="45vh"
        onMount={editor => {
          editorRef.current = editor;
          setIsEditorLoaded(true);
        }}
        value={rawData.code}
      />

      <CodeInfo id={rawData.id} info={rawData.summary} />

      {/* run button */}
      <Fade in={isEditorLoaded}>
        <Fab
          onClick={runCode}
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

      <ResultModal result={result} retry={() => setResult({ type: 0 })} />
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
