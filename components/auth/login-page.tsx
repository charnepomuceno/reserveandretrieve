'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function LoginPage() {
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

    setTimeout(() => {
      const success = login(email, password);
      if (success) {
        router.push('/dashboard');
      } else {
        setError('Invalid email or password. Please try again.');
      }
      setIsLoading(false);
    }, 500);
  };

  const handleDemoLogin = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ADNU%20RSRV%20LOGO-0I6tjNPHdPLbP5OBIMBwE2ZR97ya88.png"
              alt="OSA Reserve & Retrieve"
              className="h-24 mx-auto"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">OSA</h1>
          <p className="text-gray-600 text-sm mt-1">Reserve & Retrieve</p>
        </div>

        {/* Login Card */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Error Alert */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                  className="border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                  className="border-gray-300"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-10"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="border-t pt-6">
              <p className="text-sm font-medium text-gray-700 mb-3">Demo Accounts (ADNU)</p>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  onClick={() => handleDemoLogin('osa@adnu.edu.ph', 'admin123')}
                  className="w-full justify-start text-left h-auto py-2 px-3 border-purple-200 hover:bg-purple-50"
                  disabled={isLoading}
                >
                  <div className="flex flex-col">
                    <span className="font-semibold text-purple-900">Admin</span>
                    <span className="text-xs text-purple-700">osa@adnu.edu.ph</span>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => handleDemoLogin('tactics_org@adnu.edu.ph', 'officer123')}
                  className="w-full justify-start text-left h-auto py-2 px-3 border-blue-200 hover:bg-blue-50"
                  disabled={isLoading}
                >
                  <div className="flex flex-col">
                    <span className="font-semibold text-blue-900">TACTICS Organization</span>
                    <span className="text-xs text-blue-700">tactics_org@adnu.edu.ph</span>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => handleDemoLogin('osa@adnu.edu.ph', 'staff123')}
                  className="w-full justify-start text-left h-auto py-2 px-3 border-green-200 hover:bg-green-50"
                  disabled={isLoading}
                >
                  <div className="flex flex-col">
                    <span className="font-semibold text-green-900">OSA Staff</span>
                    <span className="text-xs text-green-700">osa@adnu.edu.ph</span>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => handleDemoLogin('student@adnu.edu.ph', 'student123')}
                  className="w-full justify-start text-left h-auto py-2 px-3 border-red-200 hover:bg-red-50"
                  disabled={isLoading}
                >
                  <div className="flex flex-col">
                    <span className="font-semibold text-red-900">Student</span>
                    <span className="text-xs text-red-700">student@adnu.edu.ph</span>
                  </div>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-gray-600 mt-6">
          This is a demo application. Use demo credentials to login.
        </p>
      </div>
    </div>
  );
}
