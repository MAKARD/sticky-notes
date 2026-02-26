import React from 'react'
import { useStickyNotes } from '../../stores'

interface Params {
    initialZIndex: number
    onCommitChange: (zIndex: number) => void
}

export const useZIndex = ({initialZIndex, onCommitChange}: Params) => {
    const [localZIndex, setLocalZIndex] = React.useState(initialZIndex)
    const {items} = useStickyNotes()

    const bringForward = () => {
        const currentMaxZIndex = Math.max(...items.map(({zIndex}) => zIndex))

        if (localZIndex === currentMaxZIndex) return

        onCommitChange(currentMaxZIndex + 1)
        setLocalZIndex(currentMaxZIndex + 1)
    }

    return {
        bringForward,
        currentZIndex: localZIndex
    }
}