import React from "react";

import { CreateStickyNote, StickyNotesBoard, StickyNoteDeleteZone } from "@/features/sticky-notes";

export const Board: React.FC = () => {
    return (
        <div>
            <StickyNoteDeleteZone />
            <CreateStickyNote />
            <StickyNotesBoard />
        </div>
    )
}
