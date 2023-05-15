import { css } from "@emotion/react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "../components/Accordion";
import { API_DATA, getList } from "../utils/getApiData";
import * as HrefList from "./HrefList";

export default function List() {
  const [count, setCount] = useState(1);
  const [data, setData] = useState<readonly API_DATA[]>([]);
  const [connect, setConnect] = useState(false);

  return (
    <Container sx={{ my: 2 }}>
      <Button href={HrefList.home} variant="contained" sx={{ mr: 1 }}>
        Home
      </Button>
      <Button
        variant="contained"
        disabled={connect}
        onClick={() => {
          setConnect(true);
          getList(count)
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

      <>
        {data.map((dt, i) => (
          <DataItem key={i} dt={dt} />
        ))}
      </>
    </Container>
  );
}

function DataItem({ dt }: { dt: API_DATA }) {
  const [codeExpanded, setCodeExpanded] = useState<boolean>(false);

  const handleExpand = () => {
    setCodeExpanded(!codeExpanded);
  };

  return (
    <Accordion expanded={codeExpanded} onChange={handleExpand}>
      <AccordionSummary>
        {dt.id}: {dt.summary}
      </AccordionSummary>
      <AccordionDetails>
        <pre
          css={css`
            margin-bottom: 1em;
          `}
        >
          <code>{dt.code}</code>
        </pre>
        <NewFunction_1 codeExpanded={codeExpanded} dt={dt} />
      </AccordionDetails>
    </Accordion>
  );
}

function NewFunction_1({
  codeExpanded,
  dt,
}: {
  codeExpanded: boolean;
  dt: API_DATA;
}) {
  const [testExpanded, setTestExpanded] = useState(false);

  useEffect(() => {
    if (!codeExpanded) {
      setTestExpanded(false);
    }
  }, [codeExpanded]);

  return (
    <Accordion
      expanded={testExpanded}
      onChange={() => setTestExpanded(codeExpanded && !testExpanded)}
    >
      <AccordionSummary>test</AccordionSummary>
      <AccordionDetails>
        <pre>
          <code>{dt.test}</code>
        </pre>
      </AccordionDetails>
    </Accordion>
  );
}
