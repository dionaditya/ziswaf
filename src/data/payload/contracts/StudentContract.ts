export interface createStudentInterface {
    toFormData(): FormData;
}

export interface updateStudentInterface {
    toFormData(): FormData;
}
  
export interface deleteStudentInterface {
    toJson(): string;
}