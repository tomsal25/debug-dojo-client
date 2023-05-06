import { css, styled } from "goober";
import { createGlobalStyles } from "goober/global";
import { useState } from "preact/hooks";
import { API_DATA, getApiData } from "./utils/getApiData";

const GlobalStyles = createGlobalStyles`
  * {
    padding: 0;
    margin: 0;
  }
  body {
    width: 100vw;
    height: 100vh;
  }
  body, #app {
    display: flex;
    place-items: center;
    justify-content: center;
  }
`;

const card = css`
  width: 90vw;
  height: 90vh;
  background: skyblue;
  overflow-y: scroll;
`;

const UpdateButton = styled("button")`
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: black;
  color: white;
  cursor: pointer;

  &:disabled {
    background-color: gray;
  }
`;

export function App() {
  const [count, setCount] = useState(1);
  const [data, setData] = useState<readonly API_DATA[]>([]);
  const [connect, setConnect] = useState(false);

  return (
    <>
      <GlobalStyles />
      <div className={card}>
        <UpdateButton
          disabled={connect}
          onClick={() => {
            setConnect(true);
            getApiData(count)
              .then(dt => {
                setData([...data, ...dt]);
                setCount(count => count + 1);
                console.table(dt);
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
        </UpdateButton>

        <div>
          {data.map((dt, i) => (
            <p
              key={i}
              className={css`
                margin-bottom: 2em;
              `}
            >
              <details
                className={css`
                  & pre {
                    background: lightgray;
                    margin-left: 1em;
                    white-space: pre;
                  }
                `}
              >
                <summary>
                  {dt.id}: {dt.description}
                  <pre>
                    <code>{dt.code}</code>
                  </pre>
                </summary>
                <details
                  className={css`
                    margin: 1em;
                  `}
                >
                  <summary>test</summary>
                  <pre>
                    <code>{dt.test}</code>
                  </pre>
                </details>
              </details>
            </p>
          ))}
        </div>
      </div>
    </>
  );
}
