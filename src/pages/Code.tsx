import Button from "@mui/material/Button";
import { useState } from "react";
import { API_DATA, getCode } from "../utils/getApiData";
import * as HrefList from "./HrefList";

export default function Code() {
  const [text, setText] = useState<API_DATA>();
  return (
    <>
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
      <div>{text?.code}</div>
      <br />
      <div>{text?.test}</div>
      <br />
      <div>{text?.summary}</div>
    </>
  );
}
