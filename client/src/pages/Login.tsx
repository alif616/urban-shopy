import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginUser, clearAuthError } from '../store/slices/authSlice';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { toast } from '../components/common/Toaster';
import { validateLoginForm, hasErrors, ValidationErrors } from '../utils/validators';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoading, error } = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const from = (location.state as { from?: string } | undefined)?.from || '/account';

  useEffect(() => { if (user) navigate(from, { replace: true }); }, [user, navigate, from]);
  useEffect(() => { if (error) { toast(error, 'error'); dispatch(clearAuthError()); } }, [error, dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateLoginForm(email, password);
    setErrors(validation);
    if (hasErrors(validation)) return;
    const result = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(result)) {
      toast('Welcome back, ' + result.payload.user.name + '!', 'success');
      navigate(from, { replace: true });
    }
  };
  const handleDemoFill = () => { setEmail('demo@urbanshopy.com'); setPassword('password123'); };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto px-4 py-20">
      <div className="text-center mb-8">
        <span className="label-eyebrow">Account</span>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 mt-1 mb-2">Welcome Back</h1>
        <p className="text-xs text-zinc-500">Sign in to access your orders and saved wishlist.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-3xl border border-zinc-200/80">
        <Input label="Email Address" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} leftIcon={<Mail className="w-4 h-4" />} placeholder="you@example.com" />
        <Input label="Password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} leftIcon={<Lock className="w-4 h-4" />} placeholder="password" />
        <Button type="submit" fullWidth isLoading={isLoading} className="mt-2">Sign In</Button>
        <div className="pt-2 text-center">
          <button type="button" onClick={handleDemoFill} className="text-xs text-zinc-400 hover:text-zinc-900 underline cursor-pointer">Auto-fill Demo Credentials</button>
        </div>
      </form>
      <div className="mt-6 text-center text-xs text-zinc-500">Don't have an account? <Link to="/register" className="font-bold text-zinc-900 underline hover:text-zinc-700">Register now</Link></div>
    </motion.div>
  );
};
export default Login;
