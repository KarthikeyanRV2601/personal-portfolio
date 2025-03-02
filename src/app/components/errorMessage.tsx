import { ErrorMessageProps } from "../types";

export const ErrorMessage = (props: ErrorMessageProps) => {
    const { message } = props;
    return (
        <div className="pw-error-message">
            <p className="pw-error-message-text">
                {message}
            </p>
        </div>
    )
}