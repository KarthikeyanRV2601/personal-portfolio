export interface ErrorMessageProps {
    message: string;
    severity?: ErrorSeverity; 
}

export enum ErrorSeverity {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    CRITICAL = 'CRITICAL'
}