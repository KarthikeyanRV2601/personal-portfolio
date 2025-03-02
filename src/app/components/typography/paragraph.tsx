import { ParagraphProps } from "@/app/types"

export const Paragraph = (props: ParagraphProps) => {
    const { textContent, bold } = props;
    return (
        <p className={`pw-typo-paragraph ${bold ? 'pw-typo-bold' : ''}`}>
            {textContent}
        </p>
    )
}