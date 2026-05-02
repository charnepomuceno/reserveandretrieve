'use client';

import { useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      // Auto-login as student for development
      const success = login('student@adnu.edu.ph', 'student123');
      if (success) {
        router.push('/dashboard');
      }
    } else {
      router.push('/dashboard');
    }
  }, [login, isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Logging in...</p>
      </div>
    </div>
  );
}
