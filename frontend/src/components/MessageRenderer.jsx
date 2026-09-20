import { useState } from "react";
import { parseResponse } from "../utils/parseRespense.js";
import { Copy, Check } from "lucide-react";

const CodeBlock = ({ language, content, incomplete }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable — ignore */
    }
  };

  return (
    <div className="w-full max-w-full rounded-xl overflow-hidden border border-white/10 bg-[#0d1117] shadow-sm">
      <div className="flex justify-between items-center px-3.5 py-2 bg-[#161b22] border-b border-white/5 text-xs text-gray-400">
        <span className="font-mono tracking-wide">{language}</span>

        {incomplete ? (
          <span className="flex items-center gap-1.5 text-indigo-300">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            writing
          </span>
        ) : (
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2 py-1 rounded-md opacity-70 hover:opacity-100 hover:bg-white/5 transition-all duration-150"
          >
            {copied ? (
              <>
                <Check size={13} className="text-emerald-400" />
                <span className="text-emerald-400">copied</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>copy</span>
              </>
            )}
          </button>
        )}
      </div>

      <pre className="p-3.5 overflow-x-auto text-[13px] leading-relaxed">
        <code className="font-mono text-gray-200">{content}</code>
      </pre>
    </div>
  );
};

const renderInline = (text) => {
  // Split on inline code spans AND **bold** markdown, keeping the
  // delimiters so we know which regions to re-style below.
  const bits = text.split(/(`[^`\n]+`|\*\*[^*\n]+\*\*)/g);

  return bits.map((bit, i) => {
    if (bit.startsWith("`") && bit.endsWith("`") && bit.length > 1) {
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 mx-0.5 rounded-md bg-black/[0.06] dark:bg-white/10 font-mono text-[0.85em]"
        >
          {bit.slice(1, -1)}
        </code>
      );
    }

    if (bit.startsWith("**") && bit.endsWith("**") && bit.length > 3) {
      return (
        <strong key={i} className="font-semibold">
          {bit.slice(2, -2)}
        </strong>
      );
    }

    return <span key={i}>{bit}</span>;
  });
};

const MessageRenderer = ({ text }) => {
  const parts = parseResponse(text);

  return (
    <div className="space-y-3">
      {parts.map((part, i) => {
        const key = part.id ?? i;

        if (part.type === "text") {
          return (
            <p
              key={key}
              className="whitespace-pre-wrap text-sm leading-relaxed"
            >
              {renderInline(part.content)}
            </p>
          );
        }

        if (part.type === "code") {
          return (
            <CodeBlock
              key={key}
              language={part.language}
              content={part.content}
              incomplete={part.incomplete}
            />
          );
        }

        return null;
      })}
    </div>
  );
};

export default MessageRenderer;