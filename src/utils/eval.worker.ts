import { CodeError, CodeJudge } from "./testCode";

const testFunction = (sourceCode: string) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    const result = new Function(sourceCode)() as boolean;
    return { type: "code", flag: result } as CodeJudge;
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
