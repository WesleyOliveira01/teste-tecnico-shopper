export class ErrorHandler extends Error {
    private error_code: string;
    private error_description: string;
    private status_code: number;

    constructor(error_code: string, error_description: string, status_code: number = 500) {
        super(error_description);
        this.error_code = error_code;
        this.error_description = error_description;
        this.status_code = status_code;
    }
}
