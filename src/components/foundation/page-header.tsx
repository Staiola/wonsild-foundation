import type { ReactNode } from "react";
import { EditorialHeading } from "./layout";

export function PageHeader({ title, description, actions, eyebrow, level = 1 }: { title: string; description?: string; actions?: ReactNode; eyebrow?: string; level?: 1 | 2 | 3 | 4 | 5 | 6 }) {
  return (
    <div className="ef-page-header">
      <div>
        {eyebrow && <p className="ef-eyebrow">{eyebrow}</p>}
        <EditorialHeading level={level} size="page">{title}</EditorialHeading>
        {description && <p className="ef-page-description">{description}</p>}
      </div>
      {actions && <div className="ef-cluster">{actions}</div>}
    </div>
  );
}
