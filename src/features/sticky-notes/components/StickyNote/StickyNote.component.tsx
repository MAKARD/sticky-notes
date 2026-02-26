import React from "react";

import { StickyNote as StickyNoteModel } from "@/domain/models/StickyNote.model";
import { useStickyNotes } from "../../stores";
import { usePosition } from "./usePosition";
import { useResize } from "./useResize";
import { useText } from "./useText";
import { useOverlapping } from "./useDelete";

interface Props {
    stickyNote: StickyNoteModel
}

export const StickyNote: React.FC<Props> = ({ stickyNote }) => {
    const { changeNoteById, deleteNoteById } = useStickyNotes();
    const OverlappingToDeleteZone = useOverlapping({
        targetElementId: 'sticky-notes-delete-zone'
    })

    const Text = useText({
        initialText: stickyNote.text,
        onCommitChanges: (text) => {
            changeNoteById(stickyNote.id, { text })
        }
    })

    const Position = usePosition({
        initialPosition: stickyNote.position,
        onChange: () => {
            OverlappingToDeleteZone.checkOverlapping()
        },
        onCommitChange: (position) => {
            if (OverlappingToDeleteZone.isOverlapping) {
                deleteNoteById(stickyNote.id)

                return
            }

            changeNoteById(stickyNote.id, { position })
        }
    })

    const Size = useResize({
        initialSize: stickyNote.size,
        onCommitChange: (size) => {
            changeNoteById(stickyNote.id, { size })
        }
    })

    return (
        <div
            ref={OverlappingToDeleteZone.elementRef}
            onMouseDown={Position.onMouseDown}
            className="
        absolute 
        rounded-lg 
        shadow-lg 
        p-2 
        text-sm 
        select-text 
        transition-transform 
        hover:scale-[1.02] 
        hover:shadow-xl
        cursor-move
        overflow-hidden
      "
            style={{
                left: Position.currentPosition.x,
                top: Position.currentPosition.y,
                width: Size.currentSize.width,
                height: Size.currentSize.height,
                backgroundColor: stickyNote.color,
            }}
        >
            <textarea
                className="w-full h-full resize-none bg-transparent outline-none break-words"
                value={Text.value}
                onChange={Text.onTextChange}
                onBlur={Text.onBlur}
            />

            <div
                onMouseDown={Size.onMouseDown}
                className="
          absolute 
          bottom-1 
          right-1 
          w-4 
          h-4 
          bg-black/20 
          rounded-sm 
          cursor-se-resize
        "
            />
        </div>
    );
};