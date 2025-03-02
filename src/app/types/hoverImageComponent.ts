export interface CursorPosition {
    x: number;
    y: number;
}

export interface HoverImageProps {
    srcs: string[];
    alt?: string;
}

export interface HoverTriggerProps {
    children: React.ReactNode;
    className?: string;
}

export interface HoverContextType {
    position: CursorPosition;
    isHovering: boolean;
    setIsHovering: (state: boolean) => void;
}
