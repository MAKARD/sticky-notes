import React from "react";

import { Button } from "@/ui/Button";
import { PlusIcon } from '@heroicons/react/24/solid'
import { useStickyNotes } from "../../stores";

import { colors } from "./colors";

export const CreateStickyNote: React.FC = () => {
    const { createNote, items } = useStickyNotes()

    const onClick = () => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        createNote({
            text: '',
            size: {
                width: 100,
                height: 100,
            },
            color: randomColor,
            position: {
                x: 50,
                y: 50
            },
            zIndex: items.length + 1
        })
    }

    return (
        <Button variant='outlined' onClick={onClick}>
            <PlusIcon className="size-6 text-red-500" />
        </Button>
    )
}