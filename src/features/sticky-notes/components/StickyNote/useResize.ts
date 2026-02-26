import React, { useEffect, useEffectEvent } from "react";

interface Size {
    width: number
    height: number
}

interface Position {
    x: number;
    y: number
}


interface Params {
    initialSize: Size
    onCommitChange: (size: Size) => void
}

export const useResize = ({ initialSize, onCommitChange }: Params) => {
  const [localSize, setLocalSize] = React.useState(initialSize);
  const [startPosition, setStartPosition] = React.useState<Position | null>(null);

  const onMouseDown = (event: React.MouseEvent) => {
    event.stopPropagation();
    setStartPosition({ x: event.clientX, y: event.clientY });
  };

  const onMouseMove = useEffectEvent((moveEvent: MouseEvent) => {
    if (!startPosition) return;

    const dx = moveEvent.clientX - startPosition.x;
    const dy = moveEvent.clientY - startPosition.y;

    setLocalSize(prev => ({
      width: Math.max(50, prev.width + dx),
      height: Math.max(50, prev.height + dy),
    }));

    setStartPosition({ x: moveEvent.clientX, y: moveEvent.clientY });
  });

  const onMouseUp = useEffectEvent(() => {
    if (startPosition) {
      onCommitChange(localSize);
      setStartPosition(null);
    }
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

  return {
    onMouseDown,
    currentSize: localSize,
  };
};