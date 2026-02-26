import React from "react";

import { Button } from "@/ui/Button";
import { PlusIcon } from '@heroicons/react/24/solid'
import { useStickyNotes } from "../../stores";

export const CreateStickyNote: React.FC = () => {
    const { createNote } = useStickyNotes()

    const onClick = () => {
        createNote({
            text: '',
            size: {
                width: 100,
                height: 100,
            },
            color: '#FFD700',
            position: {
                x: 50,
                y: 50
            }
        })
    }

    return (
        <Button variant='outlined' onClick={onClick}>
            <PlusIcon className="size-6 text-red-500" />
        </Button>
    )
}