import Box from "@mui/material/Box";
import Button, { ButtonProps } from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { SxProps, Theme } from "@mui/material/styles";
// import { SystemCssProperties } from "@mui/system/styleFunctionSx";
import { alpha, darken } from "@mui/material";
import { ReactNode } from "react";

export const LabeledButton = ({
  icon,
  label,
  color,
  ...props
}: {
  icon: ReactNode;
  label: string;
  // color?: SystemCssProperties<Theme>["backgroundColor"];
  color?: string;
} & Omit<ButtonProps, "color">) => {
  color ??= "#55e";

  const colorProperty: SxProps<Theme> = {
    color: theme => theme.palette.primary.contrastText,
    backgroundColor: color,
  };

  const colorPropertyOnDisabled: SxProps<Theme> = {
    backgroundColor: alpha(color, 0.3),
  };

  const colorPropertyOnHover: SxProps<Theme> = {
    backgroundColor: darken(color, 0.3),
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "&:hover>.MuiButtonBase-root": colorPropertyOnHover,
        ...props.sx,
      }}
    >
      <IconButton
        {...props}
        sx={{
          p: 1.5,
          borderRadius: "50%",
          "&.Mui-disabled": colorPropertyOnDisabled,
          ...colorProperty,
        }}
      >
        {icon}
      </IconButton>

      <Button
        {...props}
        sx={{
          mt: -0.2,
          px: 1,
          py: 0.2,
          borderRadius: 2,
          "&.Mui-disabled": colorPropertyOnDisabled,
          ...colorProperty,
        }}
      >
        {label}
      </Button>
    </Box>
  );
};
