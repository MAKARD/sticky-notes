import { useEffect } from "react"
import { useStickyNotes } from "../../stores"
import { StickyNote } from "../StickyNote/StickyNote.component"

export const StickyNotesBoard: React.FC = () => {
    const {items, fetchNotes} = useStickyNotes()

    useEffect(() => {
        fetchNotes()
    }, [])

    return (
        <div>
            {items.map((stickyNote) => (
                <StickyNote stickyNote={stickyNote} key={stickyNote.id} />
            ))}
        </div>
    )
}