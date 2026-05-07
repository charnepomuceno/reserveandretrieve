'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Please enter both email and password');
      setIsLoading(false);
      return;
    }

    const success = login(email, password);
    if (success) {
      router.push('/dashboard');
    } else {
      setError('Invalid email or password. Please check your credentials.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img 
            src="/adnu-rsrv-logo.png" 
            alt="Reserve and Retrieve Logo" 
            className="h-20 mx-auto mb-6"
          />
        </div>

        <Card className="shadow-lg">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl text-center">Login</CardTitle>
            <p className="text-sm text-gray-600 text-center">Sign in to access your dashboard</p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@adnu.edu.ph"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="border-gray-300"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="border-gray-300"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium h-10"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-8 pt-6 border-t">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">Demo Credentials</p>
              <div className="space-y-3 text-xs">
                <div className="bg-blue-50 p-3 rounded">
                  <p className="font-medium text-gray-900">Admin</p>
                  <p className="text-gray-600">osa@adnu.edu.ph / admin123</p>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <p className="font-medium text-gray-900">OSA Staff</p>
                  <p className="text-gray-600">osa@adnu.edu.ph / staff123</p>
                </div>
                <div className="bg-purple-50 p-3 rounded">
                  <p className="font-medium text-gray-900">Organization Officer</p>
                  <p className="text-gray-600">tactics_org@adnu.edu.ph / officer123</p>
                </div>
                <div className="bg-yellow-50 p-3 rounded">
                  <p className="font-medium text-gray-900">Student</p>
                  <p className="text-gray-600">student@adnu.edu.ph / student123</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <button
            onClick={() => router.push('/')}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
