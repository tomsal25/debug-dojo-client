import { css } from "@emotion/react";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import Button from "@mui/material/Button";
import GlobalStyles from "@mui/material/GlobalStyles";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import { API_DATA, getApiData } from "./utils/getApiData";

const Card = styled("div")`
  width: 90vw;
  height: 90vh;
  background: skyblue;
  overflow-y: scroll;
`;

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
  "& pre": {
    background: "lightgray",
    marginLeft: "1em",
    whiteSpace: "pre",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export function App() {
  const [count, setCount] = useState(1);
  const [data, setData] = useState<readonly API_DATA[]>([]);
  const [connect, setConnect] = useState(false);
  const [codeExpanded, setCodeExpanded] = useState<string | false>(false);
  const [testExpanded, setTestExpanded] = useState(false);

  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, newExpanded: boolean) => {
      setCodeExpanded(newExpanded ? panel : false);
      setTestExpanded(!newExpanded && false);
    };

  return (
    <>
      <GlobalStyles
        styles={{
          "*": {
            padding: "0",
            margin: "0",
          },
          body: {
            width: "100vw",
            height: "100vh",
          },
          "body, #app": {
            display: "flex",
            placeItems: "center",
            justifyContent: "center",
          },
        }}
      />
      <Card>
        <Button
          variant="contained"
          disabled={connect}
          onClick={() => {
            setConnect(true);
            getApiData(count)
              .then(dt => {
                setData([...data, ...dt]);
                setCount(count => count + 1);
                // console.table(dt);
              })
              .catch(err => {
                if (import.meta.env.DEV) {
                  console.log(err);
                }
              })
              .finally(() => {
                setConnect(false);
              });
          }}
        >
          {count}
        </Button>

        <div>
          {data.map((dt, i) => (
            <Accordion
              expanded={codeExpanded === `panel${i}`}
              onChange={handleChange(`panel${i}`)}
              key={i}
              css={css`
                margin-bottom: 2em;
              `}
            >
              <AccordionSummary>
                {dt.id}: {dt.description}
              </AccordionSummary>
              <AccordionDetails>
                <pre
                  css={css`
                    margin-bottom: 1em;
                  `}
                >
                  <code>{dt.code}</code>
                </pre>
                <Accordion
                  expanded={testExpanded}
                  onChange={(_, expanded) =>
                    setTestExpanded(!!codeExpanded && expanded)
                  }
                >
                  <AccordionSummary>test</AccordionSummary>
                  <AccordionDetails
                    css={css`
                      margin: 1em;
                    `}
                  >
                    <pre>
                      <code>{dt.test}</code>
                    </pre>
                  </AccordionDetails>
                </Accordion>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </Card>
    </>
  );
}
