import React from 'react'

interface Params {
    targetElementId: string
}

export const useOverlapping = ({ targetElementId }: Params) => {
    const elementRef = React.useRef<HTMLDivElement>(null)
    const isOverlappingRef = React.useRef(false)

    const checkOverlapping = () => {
        const overlappingZone = document.getElementById(targetElementId);
        if (!overlappingZone || !elementRef.current) return;

        const elementRet = elementRef.current.getBoundingClientRect();
        const zoneRect = overlappingZone.getBoundingClientRect();

        const isOverlapping =
            elementRet.right > zoneRect.left &&
            elementRet.left < zoneRect.right &&
            elementRet.bottom > zoneRect.top &&
            elementRet.top < zoneRect.bottom;

        if (isOverlapping) {
            elementRef.current.style.transform = "scale(0.5)";
            elementRef.current.style.opacity = '0.5'
        } else {
            elementRef.current.style.transform = ''
            elementRef.current.style.opacity = ''
        }

        isOverlappingRef.current = isOverlapping
    };

    return {
        checkOverlapping,
        elementRef,
        isOverlapping: isOverlappingRef.current,
    }
}