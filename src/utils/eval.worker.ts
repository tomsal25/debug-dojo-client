import { CodeError, CodeJudge } from "./testCode";
import { HostMessage, WorkerMessage } from "./workerUtil";

const testFunction = (sourceCode: string, testCode: string) => {
  // TODO: find more strict way to test code
  const randomId = `${Math.random()}`;
  // remove trailing colon
  testCode = `(()=>{return ${testCode}})()`;
  const code = `${sourceCode};return[${testCode},"${randomId}"]`;

  try {
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    const result = new Function(code)() as unknown;

    // check if the origin id is equal to returned one
    if (
      Array.isArray(result) &&
      // expected return: [result: boolean, id: string]
      typeof result[0] === "boolean" &&
      randomId === result[1]
    ) {
      return { type: "code", flag: result[0] } as CodeJudge;
    } else {
      return {
        type: "error",
        name: "invalid input",
        message: "",
      } as CodeError;
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        type: "error",
        name: error.name,
        message: error.message,
      } as CodeError;
    } else {
      return {
        type: "error",
        name: "unknown",
        message: "eval function error",
      } as CodeError;
    }
  }
};

addEventListener("message", (message: MessageEvent<HostMessage>) => {
  const { code, test } = message.data;
  postMessage(testFunction(code, test) as WorkerMessage);
  close();
});
