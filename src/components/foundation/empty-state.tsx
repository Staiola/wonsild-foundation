"use client";

import { useId, type ReactNode } from 'react';
import { EditorialHeading, EditorialStack } from './layout';

/** Describes why a region is empty and offers the next useful action. */
export function EmptyState({ title, description, action, level = 2, size = "item", edge = "both" }: {
  size?: "item" | "group";
  edge?: "both" | "bottom" | "none";
  title: string;
  description: string;
  action?: ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}) {
  const headingId = useId();
  return <section className="ef-empty-state" data-edge={edge} aria-labelledby={headingId}>
    <EditorialStack gap="related">
      <EditorialHeading level={level} size={size} id={headingId}>{title}</EditorialHeading>
      <p className="ef-prose text-muted-foreground">{description}</p>
      {action && <div className="ef-cluster ef-empty-action">{action}</div>}
    </EditorialStack>
  </section>;
}
