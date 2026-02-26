import React from "react";

import { ArrowUpIcon } from "@heroicons/react/24/solid";


import { StickyNote as StickyNoteModel } from "@/domain/models/StickyNote.model";
import { useStickyNotes } from "../../stores";
import { usePosition } from "./usePosition";
import { useResize } from "./useResize";
import { useText } from "./useText";
import { useOverlapping } from "./useDelete";
import { useZIndex } from "./useZIndex";
import { Button } from "@/ui/Button";

interface Props {
    stickyNote: StickyNoteModel
}

export const StickyNote: React.FC<Props> = ({ stickyNote }) => {
    const { changeNoteById, deleteNoteById, items } = useStickyNotes();

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

    const ZIndex = useZIndex({
        initialZIndex: stickyNote.zIndex,
        onCommitChange: (zIndex) => {
            changeNoteById(stickyNote.id, { zIndex })
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
                zIndex: ZIndex.currentZIndex,
            }}
        >
            <textarea
                className="w-full h-full resize-none bg-transparent outline-none break-words"
                value={Text.value}
                onChange={Text.onTextChange}
                onBlur={Text.onBlur}
            />
            <Button
                onMouseDown={(e) => e.stopPropagation()}
                onClick={ZIndex.bringForward}
                variant="contained"
                className="absolute bottom-1 left-1 w-5 h-5"
            >
                <ArrowUpIcon className="w-5 h-5 color-gray-700" />
            </Button>
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