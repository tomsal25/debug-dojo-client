import { css } from "@emotion/react";
import { PaletteMode } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import Toolbar from "@mui/material/Toolbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "./components/Accordion";
import { Header } from "./components/Header";
import { ColorModeContext } from "./stores/ColorModeContext";
import { API_DATA, getApiData } from "./utils/getApiData";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const App = () => {
  const [theme, setTheme] = useState<PaletteMode>("light");

  const colorModeChanger = {
    toggleColorMode: () => {
      setTheme(prevMode => (prevMode == "light" ? "dark" : "light"));
    },
  };

  return (
    <>
      <ColorModeContext.Provider value={colorModeChanger}>
        <ThemeProvider theme={theme == "light" ? lightTheme : darkTheme}>
          <CssBaseline />
          <GlobalStyles
            styles={{
              "*": {
                padding: "0",
                margin: "0",
              },
            }}
          />
          <Header />
          {/* for margin */}
          <Toolbar />
          <DataItemList />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
};

function DataItemList() {
  const [count, setCount] = useState(1);
  const [data, setData] = useState<readonly API_DATA[]>([]);
  const [connect, setConnect] = useState(false);

  return (
    <Container sx={{ my: 2 }}>
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
