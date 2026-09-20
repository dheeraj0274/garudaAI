// export const parseResponse = (text) => {
//   const regex = /```(\w+)?\n([\s\S]*?)```/g;

//   let parts = [];
//   let lastIndex = 0;
//   let match;

//   while ((match = regex.exec(text)) !== null) {
//     if (match.index > lastIndex) {
//       parts.push({
//         type: "text",
//         content: text.slice(lastIndex, match.index),
//       });
//     }

//     parts.push({
//       type: "code",
//       language: match[1] || "plaintext",
//       content: match[2],
//     });

//     lastIndex = regex.lastIndex;
//   }

//   if (lastIndex < text.length) {
//     parts.push({
//       type: "text",
//       content: text.slice(lastIndex),
//     });
//   }

//   return parts;
// };
export const parseResponse = (text) => {
  if (!text) return [];

  const fenceOpen = /```([a-zA-Z0-9_+-]*)[^\S\n]*\n?/g;
  const parts = [];
  let lastIndex = 0;
  let match;
  let id = 0;

  const pushText = (content) => {
    if (content) parts.push({ id: id++, type: "text", content });
  };

  while ((match = fenceOpen.exec(text)) !== null) {
    const fenceStart = match.index;
    const contentStart = fenceOpen.lastIndex;
    const language = (match[1] || "").trim().toLowerCase() || "plaintext";

    pushText(text.slice(lastIndex, fenceStart));

    const closeIdx = text.indexOf("```", contentStart);

    if (closeIdx === -1) {
     
      parts.push({
        id: id++,
        type: "code",
        language,
        content: text.slice(contentStart),
        incomplete: true,
      });
      lastIndex = text.length;
      break;
    }

    const raw = text.slice(contentStart, closeIdx);
    parts.push({
      id: id++,
      type: "code",
      language,
      content: raw.replace(/\n$/, ""), 
      incomplete: false,
    });

    lastIndex = closeIdx + 3;
    fenceOpen.lastIndex = lastIndex;
  }

  pushText(text.slice(lastIndex));

  return parts;
};