import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { registerUser, clearAuthError } from '../store/slices/authSlice';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { toast } from '../components/common/Toaster';
import { validateRegisterForm, hasErrors, ValidationErrors } from '../utils/validators';

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isLoading, error } = useAppSelector((state) => state.auth);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});

  useEffect(() => { if (user) navigate('/account', { replace: true }); }, [user, navigate]);
  useEffect(() => { if (error) { toast(error, 'error'); dispatch(clearAuthError()); } }, [error, dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateRegisterForm(name, email, password, confirmPassword);
    setErrors(validation);
    if (hasErrors(validation)) return;
    const result = await dispatch(registerUser({ name, email, password }));
    if (registerUser.fulfilled.match(result)) {
      toast('Account created successfully!', 'success');
      navigate('/account', { replace: true });
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto px-4 py-20">
      <div className="text-center mb-8">
        <span className="label-eyebrow">Join Us</span>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 mt-1 mb-2">Create Account</h1>
        <p className="text-xs text-zinc-500">Join Urban Shopy for member benefits and faster checkout.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-3xl border border-zinc-200/80">
        <Input label="Full Name" type="text" required value={name} onChange={(e) => setName(e.target.value)} error={errors.name} leftIcon={<User className="w-4 h-4" />} placeholder="Jane Doe" />
        <Input label="Email Address" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} leftIcon={<Mail className="w-4 h-4" />} placeholder="you@example.com" />
        <Input label="Password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} leftIcon={<Lock className="w-4 h-4" />} placeholder="At least 6 characters" hint="Minimum 6 characters" />
        <Input label="Confirm Password" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} error={errors.confirmPassword} leftIcon={<Lock className="w-4 h-4" />} placeholder="Repeat your password" />
        <Button type="submit" fullWidth isLoading={isLoading} className="mt-2">Create Account</Button>
      </form>
      <div className="mt-6 text-center text-xs text-zinc-500">Already registered? <Link to="/login" className="font-bold text-zinc-900 underline hover:text-zinc-700">Sign in</Link></div>
    </motion.div>
  );
};
export default Register;
