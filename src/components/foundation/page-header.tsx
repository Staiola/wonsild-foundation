import type { ReactNode } from "react";
import { EditorialHeading } from "./layout";

export function PageHeader({ title, description, actions, eyebrow }: { title: string; description?: string; actions?: ReactNode; eyebrow?: string }) {
  return (
    <div className="ef-page-header">
      <div>
        {eyebrow && <p className="ef-eyebrow">{eyebrow}</p>}
        <EditorialHeading level={1} size="page">{title}</EditorialHeading>
        {description && <p className="ef-page-description">{description}</p>}
      </div>
      {actions && <div className="ef-cluster">{actions}</div>}
    </div>
  );
}
