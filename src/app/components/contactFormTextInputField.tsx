import { ContactFormTextInputFieldProps } from "../types"
import { ErrorMessage } from "./errorMessage";
import { Paragraph } from "./typography"

export const ContactFormTextInputField = (props: ContactFormTextInputFieldProps) => {
    const { label, value, handleValueChange, expandable, required, validError } = props;

    return (<div className="pw-contact-page-contact-form-text-input-field">
        <Paragraph textContent={label} />
        {
            !expandable ? <input className={`pw-contact-page-contact-form-text-input-field-input ${validError ? 'pw-error-applied' : ''}`} value={value} onChange={handleValueChange} required={required} placeholder={`Please enter ${label.toLowerCase()}`}/> :
                <textarea className={`pw-contact-page-contact-form-text-input-field-input ${validError ? 'pw-error-applied' : ''}`} value={value} onChange={handleValueChange} required={required}  placeholder={`Please enter ${label.toLowerCase()}`}/>
        }
        {
            validError && <ErrorMessage message={validError} />
        }
    </div>)
}