import { setup } from "goober";
import { h, render } from "preact";

import { App } from "./app.tsx";

setup(h);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
render(<App />, document.getElementById("app")!);
