import React from "react";

import { CreateStickyNote, StickyNotesBoard } from "@/features/sticky-notes";

export const Board: React.FC = () => {
    return (
        <div>
            <CreateStickyNote />
            <StickyNotesBoard />
        </div>
    )
}
