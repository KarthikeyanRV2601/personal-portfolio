export interface ContactFormTextInputFieldProps {
    label: string;
    value: string;
    handleValueChange: (a: any) => void
    expandable?: boolean;
    validError?: string;
    required?: boolean;
}

export interface ContactFormDropdownFieldProps {
    label: string;
    value: string;
    handleValueChange: (a: any) => void
    dropdownData: DropDownData;
    required?: boolean;
}

export interface DropDownData {
    data: IdValuePair[]
}

export interface IdValuePair {
    id: string;
    value: string;
}

export interface ContactPageData {
    name: IdValuePair;
    email: IdValuePair;
    interest: IdValuePair;
    projectTime: IdValuePair;
    message: IdValuePair;
}

export enum ContactFormFieldType {
    NAME = 'NAME',
    EMAIL = 'EMAIL',
    INTEREST = 'INTEREST',
    TIME = 'TIME',
    MESSAGE = 'MESSAGE'
}

export interface ContactFormValidationResponse {
    valid: boolean;
    errors: Record<string, string>
}