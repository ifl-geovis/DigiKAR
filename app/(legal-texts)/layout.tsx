import { ReactNode } from "react";

export default function legalTextLayout({ children }: { children: ReactNode }) {
  return (
    <article className="flex justify-center">
      <div className="prose max-w-prose">{children}</div>
    </article>
  );
}
