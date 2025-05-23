import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkEmoji from "remark-emoji";
import type { ReactNode } from "react";

export default function MarkdownRenderer({
  children,
  className,
  components,
}: {
  children: string;
  className?: string;
  components?: Parameters<typeof ReactMarkdown>[0]["components"];
}): ReactNode {
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkEmoji]}
        components={components}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
