import { ContactFormDropdownFieldProps } from "../types";
import { Paragraph } from "./typography";

export const ContactFormDropdownField = (props: ContactFormDropdownFieldProps) => {
    const { label, value, dropdownData, handleValueChange, required } = props;

    return (<div className="pw-contact-page-contact-form-dropdown-field">
        <Paragraph textContent={label} />
        <select className="pw-contact-page-contact-form-dropdown-field-select" value={value} onChange={handleValueChange} required={required}>
            {
                dropdownData.data.map((data, index) => <option id={data.id} value={data.value} key={index} className="pw-contact-page-contact-form-dropdown-field-select-option">{data.value}</option>)
            }
        </select>
    </div>)
}