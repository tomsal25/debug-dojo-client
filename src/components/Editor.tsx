import _Editor, { EditorProps } from "@monaco-editor/react";
import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";

export const Editor = (props: EditorProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        my: 1,
        p: 1,
        border: "0.1rem outset",
        borderRadius: 3.5,
        borderColor: theme => theme.palette.primary.main,
      }}
    >
      <_Editor
        defaultLanguage="javascript"
        loading={null}
        theme={theme.palette.mode == "light" ? "light" : "vs-dark"}
        {...props}
        options={{
          lineNumbers: "off",
          folding: false,
          glyphMargin: false,
          lineDecorationsWidth: 0,
          minimap: { enabled: false },
          ...props.options,
        }}
      />{" "}
    </Box>
  );
};
