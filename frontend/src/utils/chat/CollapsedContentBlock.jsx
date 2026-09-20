const CollapsedContentBlock = ({content , onRemove , onExpand})=>{
    const lineCount = content.split("\n").length


    return (
         <div className="mb-2 rounded-xl border border-[#C9A96A]/15 bg-[#1B1D23] p-3 text-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-zinc-200 font-medium">
             Pasted content
          </p>

          <p className="text-xs text-zinc-500">
            {lineCount} lines
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onExpand}
            className="text-xs text-[#C9A96A] hover:text-[#DEC28B]"
          >
            Expand
          </button>

          <button
            type="button"
            onClick={onRemove}
            className="text-xs text-zinc-500 hover:text-red-400"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
    )
}
export default CollapsedContentBlock;