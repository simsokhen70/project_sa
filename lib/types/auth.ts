export interface AuthRequest{
    username: string;
    password: string;
}

export interface SignupRequest{
    fullname: string;
    phonenumber: string;
    email: string;
    password: string;
    // company_name: string;
    // business_type: string;
    // tax_id: string;
    // contact_phonenumber: string;
}

export interface SendOtpRequest{
    to: string;
}
export interface ResetPasswordRequest{
    session_id: string;
    password: string;
    phonenumber: string;
    otp_code: string;
}

export interface SendOptResponse{
    security_key: string;
    lifetime: number;
}

export interface VerifyOtpRequest{
    security_key: string;
    security_code: string;
    phonenumber: string;
}