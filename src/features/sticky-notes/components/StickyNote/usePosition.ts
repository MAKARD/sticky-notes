import React, { useEffect, useEffectEvent } from "react";

interface Position {
  x: number;
  y: number
}

interface Params {
  onCommitChange: (position: Position) => void
  onChange: (position: Position) => void
  initialPosition: Position
}

export const usePosition = ({ onCommitChange, initialPosition, onChange }: Params) => {
  const [localPosition, setLocalPosition] = React.useState(initialPosition);
  const [startPosition, setStartPosition] = React.useState<Position | null>(null);

  const onMouseDown = (event: React.MouseEvent) => {
    setStartPosition({ x: event.clientX, y: event.clientY });
  };

  const onMouseMove = useEffectEvent((moveEvent: MouseEvent) => {
    if (!startPosition) return;

    const dx = moveEvent.clientX - startPosition.x;
    const dy = moveEvent.clientY - startPosition.y;

    setLocalPosition(prev => {
      const nextPosition = {
        x: prev.x + dx,
        y: prev.y + dy,
      }

      onChange(nextPosition)

      return nextPosition
    });

    setStartPosition({ x: moveEvent.clientX, y: moveEvent.clientY });
  });

  const onMouseUp = useEffectEvent(() => {
    if (!startPosition) return;

    if (localPosition.x === initialPosition.x && localPosition.y === initialPosition.y) return

    onCommitChange(localPosition);
    setStartPosition(null);
  });

  useEffect(() => {
    if (startPosition) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [startPosition]);

  return { onMouseDown, currentPosition: localPosition };
};