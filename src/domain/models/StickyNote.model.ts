export interface StickyNote {
    id: string
    size: {
        width: number;
        height: number;
    }
    text: string
    position: {
        x: number;
        y: number
    }
    color: string
    zIndex: number
}
