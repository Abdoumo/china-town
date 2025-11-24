import { RequestHandler } from "express";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
}

export const handleLogin: RequestHandler = (req, res) => {
  const { email, password } = req.body as LoginRequest;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    } as LoginResponse);
  }

  const validCredentials = [
    {
      email: process.env.LOGIN_EMAIL_1,
      password: process.env.LOGIN_PASSWORD_1,
    },
    {
      email: process.env.LOGIN_EMAIL_2,
      password: process.env.LOGIN_PASSWORD_2,
    },
    {
      email: process.env.LOGIN_EMAIL_3,
      password: process.env.LOGIN_PASSWORD_3,
    },
  ].filter((cred) => cred.email && cred.password);

  const isValid = validCredentials.some(
    (cred) => cred.email === email && cred.password === password
  );

  if (isValid) {
    return res.json({
      success: true,
      message: "Login successful",
    } as LoginResponse);
  }

  return res.status(401).json({
    success: false,
    message: "Invalid email or password",
  } as LoginResponse);
};
