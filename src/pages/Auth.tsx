import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { MapPin, Eye, EyeOff, ShieldCheck } from 'lucide-react';

function generateCaptcha() {
  const a = Math.floor(Math.random() * 20) + 1;
  const b = Math.floor(Math.random() * 20) + 1;
  return { question: `${a} + ${b} = ?`, answer: a + b };
}

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) navigate('/');
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate('/');
    });
  }, [navigate]);

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setCaptchaInput('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (parseInt(captchaInput) !== captcha.answer) {
      setError('Wrong CAPTCHA answer. Try again.');
      refreshCaptcha();
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage('Registration successful! Check your email to verify, then login.');
        setIsLogin(true);
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
      refreshCaptcha();
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <MapPin className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-extrabold text-foreground">TripTailor</h1>
          </div>
          <p className="text-muted-foreground">Plan your journey across India</p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 shadow-lg">
          <div className="flex mb-6 border-b border-border">
            <button
              onClick={() => { setIsLogin(true); setError(''); refreshCaptcha(); }}
              className={`flex-1 pb-3 text-sm font-medium border-b-2 transition-colors ${isLogin ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'}`}
            >
              Login
            </button>
            <button
              onClick={() => { setIsLogin(false); setError(''); refreshCaptcha(); }}
              className={`flex-1 pb-3 text-sm font-medium border-b-2 transition-colors ${!isLogin ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'}`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full py-3 px-4 rounded-lg border border-input bg-background text-foreground outline-none focus:ring-2 focus:ring-primary text-sm"
                placeholder="you@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full py-3 px-4 pr-10 rounded-lg border border-input bg-background text-foreground outline-none focus:ring-2 focus:ring-primary text-sm"
                  placeholder="Min 6 characters"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Confirm Password</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="w-full py-3 px-4 rounded-lg border border-input bg-background text-foreground outline-none focus:ring-2 focus:ring-primary text-sm"
                  placeholder="Repeat password"
                />
              </div>
            )}

            {/* CAPTCHA */}
            <div className="p-3 rounded-lg bg-muted/50 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Security Check</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-foreground bg-muted px-4 py-2 rounded-lg font-mono tracking-wider select-none">
                  {captcha.question}
                </span>
                <input
                  type="number"
                  required
                  value={captchaInput}
                  onChange={e => setCaptchaInput(e.target.value)}
                  className="flex-1 py-2 px-3 rounded-lg border border-input bg-background text-foreground outline-none focus:ring-2 focus:ring-primary text-sm"
                  placeholder="Answer"
                />
                <button type="button" onClick={refreshCaptcha} className="text-xs text-primary hover:underline">New</button>
              </div>
            </div>

            {error && <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">{error}</div>}
            {message && <div className="text-sm text-travel-green bg-travel-green/10 p-3 rounded-lg">{message}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {loading ? 'Please wait...' : isLogin ? 'Login' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
