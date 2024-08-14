// DTOs.ts : Dtos pour les données

export interface createUserDto {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

export interface loginUserDto {
    email: string;
    password: string;
}