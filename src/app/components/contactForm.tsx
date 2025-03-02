"use client"
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import contactPageData from '../data/contactPage.json';
import { ContactFormFieldType, ContactFormValidationResponse, ContactPageData } from '../types';
import { ContactFormTextInputField } from './contactFormTextInputField';
import { ContactFormDropdownField } from './contactFormDropdownField';
import { Paragraph } from './typography';


export const ContactForm = () => {
    const { interestsDropDownData, projectTimeData } = contactPageData;
    const [status, setStatus] = useState("");
    const [validForm, setValidForm] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const initialData: ContactPageData = useMemo(() => ({
        name: {
            id: ContactFormFieldType.NAME,
            value: ''
        },
        email: {
            id: ContactFormFieldType.EMAIL,
            value: ''
        },
        interest: {
            id: ContactFormFieldType.INTEREST,
            value: interestsDropDownData.data[0].value
        },
        projectTime: {
            id: ContactFormFieldType.TIME,
            value: projectTimeData.data[0].value
        },
        message: {
            id: ContactFormFieldType.MESSAGE,
            value: ''
        }
    }), [interestsDropDownData.data, projectTimeData.data])
    const [contactData, setContactData] = useState<ContactPageData>({ ...initialData });


    const validateContactForm = useCallback((): ContactFormValidationResponse => {
        const errors: Record<string, string> = {};

        // Name Validation
        if (!contactData.name.value.trim()) {
            errors.name = "Name is required.";
        } else if (contactData.name.value.length < 2) {
            errors.name = "Name must be at least 2 characters.";
        }

        // Email Validation
        if (!contactData.email.value.trim()) {
            errors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactData.email.value)) {
            errors.email = "Invalid email format.";
        }

        // Interest Validation (Optional but shouldn't be empty)
        if (!contactData.interest.value.trim()) {
            errors.interest = "Please specify your interest.";
        }

        // Project Timeline Validation
        if (!contactData.projectTime.value.trim()) {
            errors.projectTime = "Project timeline is required.";
        }

        return {
            valid: Object.keys(errors).length === 0,
            errors,
        };
    }, [contactData]);

    const handleValueChange = useCallback((event: ChangeEvent<HTMLInputElement>, fieldType: ContactFormFieldType) => {
        const newChangeValue = event.target.value;
        const data = { ...contactData };
        switch (fieldType) {
            case ContactFormFieldType.NAME: {
                data.name.value = newChangeValue;
                break;
            }
            case ContactFormFieldType.EMAIL: {
                data.email.value = newChangeValue;
                break;
            }
            case ContactFormFieldType.INTEREST: {
                data.interest.value = newChangeValue;
                break;
            }
            case ContactFormFieldType.TIME: {
                data.projectTime.value = newChangeValue;
                break;
            }
            case ContactFormFieldType.MESSAGE: {
                data.message.value = newChangeValue;
                break;
            }
        }
        const validation = validateContactForm();
        setValidForm(validation.valid);
        setErrors(validation.errors);
        setContactData({ ...data })
    }, [contactData, validateContactForm]);

    const handleMailSend = useCallback(async (event: SubmitEvent) => {
        event.preventDefault();
        if (validForm) {
            setStatus("Sending...");
            const response = await fetch("/api/sendEmail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(contactData),
            });

            if (response.ok) {
                setStatus("Email sent successfully!");
                setContactData({ ...initialData });
            } else {
                setStatus("Failed to send email. Try again later.");
            }
        }
    }, [contactData, validForm, initialData]);

    return (<div className="pw-contact-page-contact-form">

        <form onSubmit={handleMailSend as any}>
            <div className="pw-contact-page-contact-form-row">
                <ContactFormTextInputField label='Your name' value={contactData.name.value} handleValueChange={(event) => handleValueChange(event, ContactFormFieldType.NAME)} validError={errors.name} required />
                <ContactFormTextInputField label='Your email' value={contactData.email.value} handleValueChange={(event) => handleValueChange(event, ContactFormFieldType.EMAIL)} validError={errors.email} required />
            </div>

            <div className="pw-contact-page-contact-form-row">
                <ContactFormDropdownField label='What are you interested' value={contactData.interest.value} handleValueChange={(event) => handleValueChange(event, ContactFormFieldType.INTEREST)} dropdownData={interestsDropDownData} required />
                <ContactFormDropdownField label='Project time' value={contactData.projectTime.value} handleValueChange={(event) => handleValueChange(event, ContactFormFieldType.TIME)} dropdownData={projectTimeData} required />
            </div>

            <div className="pw-contact-page-contact-form-row pw-contact-page-contact-form-message-box">
                <ContactFormTextInputField expandable label='Message' value={contactData.message.value} handleValueChange={(event) => handleValueChange(event, ContactFormFieldType.MESSAGE)} />
            </div>
            <div className="pw-pos-margin-top-regular" />
            <button disabled={!validForm} className={`pw-button ${!validForm ? 'pw-button-disabled' : ''}`} type="submit">
                Send now
            </button>
            <Paragraph textContent={status} />
        </form>
    </div>)
}