import { parseResponse } from "../utils/parseRespense.js";
import { Copy } from "lucide-react";

const MessageRenderer = ({ text }) => {
  const parts = parseResponse(text);

  return (
    <div className="space-y-3">
      {parts.map((part, i) => {
        if (part.type === "text") {
          return (
            <p
              key={i}
              className="whitespace-pre-wrap text-sm leading-relaxed"
            >
              {part.content}
            </p>
          );
        }

        if (part.type === "code") {
          return (
            <div
              key={i}
              className="bg-[#0d1117] rounded-xl overflow-hidden group"
            >
             
              <div className="flex justify-between items-center px-3 py-1 bg-[#161b22] text-xs text-gray-400">
                <span>{part.language}</span>

                <button
                  onClick={() =>
                    navigator.clipboard.writeText(part.content)
                  }
                  className="opacity-70 hover:opacity-100"
                >
                  <Copy size={14} />
                </button>
              </div>

             
              <pre className="p-3 overflow-x-auto text-sm">
                <code>{part.content}</code>
              </pre>
            </div>
          );
        }
      })}
    </div>
  );
};

export default MessageRenderer;