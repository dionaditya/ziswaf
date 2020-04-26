export interface createEmployeeInterface {
    toFormData(): FormData;
}

export interface updateEmployeeInterface {
    toFormData(): FormData;
}

export interface deleteEmployeeInterface {
    toJson(): string;
}