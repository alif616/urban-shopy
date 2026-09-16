import { MIN_PASSWORD_LENGTH } from '../config/constants';

export const isValidEmail = (email: string): boolean =>
  !!email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export const isValidPhone = (phone: string): boolean => {
  if (!phone) return false;
  const d = phone.replace(/\D/g, '');
  return d.length >= 7 && d.length <= 15;
};

export const isValidPassword = (password: string): boolean =>
  typeof password === 'string' && password.length >= MIN_PASSWORD_LENGTH;

export const isNonEmpty = (value: string): boolean =>
  typeof value === 'string' && value.trim().length > 0;

export interface ValidationErrors { [field: string]: string; }

export const validateLoginForm = (email: string, password: string): ValidationErrors => {
  const errors: ValidationErrors = {};
  if (!isValidEmail(email)) errors.email = 'Please enter a valid email address.';
  if (!isValidPassword(password)) errors.password = 'Password must be at least ' + MIN_PASSWORD_LENGTH + ' characters.';
  return errors;
};

export const validateRegisterForm = (name: string, email: string, password: string, confirmPassword?: string): ValidationErrors => {
  const errors: ValidationErrors = {};
  if (!isNonEmpty(name)) errors.name = 'Please enter your full name.';
  if (!isValidEmail(email)) errors.email = 'Please enter a valid email address.';
  if (!isValidPassword(password)) errors.password = 'Password must be at least ' + MIN_PASSWORD_LENGTH + ' characters.';
  if (confirmPassword !== undefined && password !== confirmPassword) errors.confirmPassword = 'Passwords do not match.';
  return errors;
};

export const validateCheckoutForm = (form: {
  fullName: string; email: string; phone: string; address: string;
  city: string; postalCode: string; country: string;
}): ValidationErrors => {
  const e: ValidationErrors = {};
  if (!isNonEmpty(form.fullName)) e.fullName = 'Full name is required.';
  if (!isValidEmail(form.email)) e.email = 'A valid email is required.';
  if (!isValidPhone(form.phone)) e.phone = 'A valid phone number is required.';
  if (!isNonEmpty(form.address)) e.address = 'Street address is required.';
  if (!isNonEmpty(form.city)) e.city = 'City is required.';
  if (!isNonEmpty(form.postalCode)) e.postalCode = 'Postal code is required.';
  if (!isNonEmpty(form.country)) e.country = 'Country is required.';
  return e;
};

export const hasErrors = (errors: ValidationErrors): boolean => Object.keys(errors).length > 0;
