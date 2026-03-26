export interface TextWrapperProps {
    textContent: string;
    link?: string;
}

export interface ParagraphProps extends TextWrapperProps {
    bold?: boolean;
}