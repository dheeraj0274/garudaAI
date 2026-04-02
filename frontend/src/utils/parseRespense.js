export const parseResponse = (text) => {
  const regex = /```(\w+)?\n([\s\S]*?)```/g;

  let parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        type: "text",
        content: text.slice(lastIndex, match.index),
      });
    }

    parts.push({
      type: "code",
      language: match[1] || "plaintext",
      content: match[2],
    });

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push({
      type: "text",
      content: text.slice(lastIndex),
    });
  }

  return parts;
};