import { LinkProps } from "next/link";

export type HeaderProps = {
  title: React.ReactNode;
  description?: React.ReactNode;
  backHref?: LinkProps["href"];
};
