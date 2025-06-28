/**
 * @TODO - NOT IMPLEMENTED
 * 
 * A class to allow the easy parsing of Acumatica HTTPS Errors
 */
export class AcumaticaError extends Error {
    /** The Error Message */
    readonly message: string;

    /** The Stack Trace */
    readonly trace;

    /** The Error Code */
    readonly code: string;

    /** The Response Object */
    readonly response;
}