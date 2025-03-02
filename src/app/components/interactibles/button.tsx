import { ButtonProps } from "@/app/types";
import { Paragraph } from "../typography";

export const Button = (props: ButtonProps) => {
    const {buttonLabel, buttonCallBack, className, disabled} = props;
    return(
        <button className={`pw-button ${className} ${disabled ? 'pw-button-disabled' : ''}`} onClickCapture={buttonCallBack} disabled={disabled}>
            <Paragraph textContent={buttonLabel} />
        </button>
    )
}