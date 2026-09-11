import * as React from "react";

function classes(base: string, extra?: string) {
  return extra ? `${base} ${extra}` : base;
}

/** Wrap page content inside your app's existing main landmark. */
export function EditorialPage({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={classes("ef-page", className)} {...props} />;
}

type Gap = "label" | "related" | "group" | "region" | "section";
type StackProps = React.ComponentProps<"div"> & { gap?: Gap };

export function EditorialStack({ gap = "group", className, ...props }: StackProps) {
  return <div className={classes(`ef-stack ef-gap-${gap}`, className)} {...props} />;
}

export function EditorialCluster({ gap = "related", className, ...props }: StackProps) {
  return <div className={classes(`ef-cluster ef-gap-${gap}`, className)} {...props} />;
}

/** Auto-fit columns; stacks when a column cannot fit 18rem. */
export function EditorialGrid({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={classes("ef-grid", className)} {...props} />;
}

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: "group" | "page" | "display";
};

/** Heading level communicates structure; size only controls appearance. */
export function EditorialHeading({ level = 2, size = "group", className, ...props }: HeadingProps) {
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  return <Tag className={classes(`ef-heading ef-heading-${size}`, className)} {...props} />;
}
