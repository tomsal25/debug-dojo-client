import { forwardRef } from "react";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

// from https://mui.com/material-ui/guides/routing/
export const LinkBehavior = forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (Material UI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});
