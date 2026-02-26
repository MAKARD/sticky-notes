import React, { useEffect, useEffectEvent } from "react";

interface Position {
    x: number;
    y: number
}

interface Params {
    onCommitChange: (position: Position) => void
    initialPosition: Position
}

export const usePosition = ({ onCommitChange, initialPosition }: Params) => {
  const [localPosition, setLocalPosition] = React.useState(initialPosition);
  const [startPosition, setStartPosition] = React.useState<Position | null>(null);

  const onMouseDown = (event: React.MouseEvent) => {
    setStartPosition({ x: event.clientX, y: event.clientY });
  };

  const onMouseMove = useEffectEvent((moveEvent: MouseEvent) => {
    if (!startPosition) return;

    const dx = moveEvent.clientX - startPosition.x;
    const dy = moveEvent.clientY - startPosition.y;

    setLocalPosition(prev => ({
      x: prev.x + dx,
      y: prev.y + dy,
    }));

    setStartPosition({ x: moveEvent.clientX, y: moveEvent.clientY });
  });

  const onMouseUp = useEffectEvent(() => {
    if (!startPosition) return;

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