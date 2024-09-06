"use client";
import React from 'react'
import AuthButton from './AuthButton';
import { loginWithCredentials } from '@/actions/auth';

const LoginForm = () => {
  return (
    <div className=''>
        <form className='w-full flex flex-col gap-4' action={loginWithCredentials}>
            <div>
                <label className='block text-sm font-medium text-gray-200' htmlFor='Email'>Email</label>
                <input type='email' placeholder='Email' name='email' id="email" className='mt-1 w-full px-4 py-2 h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700' />
            </div>
            <div>
                <label className='block text-sm font-medium text-gray-200' htmlFor='Email'>Şifreniz</label>
                <input type='password' placeholder='Şifreniz' name='password' id="password" className='mt-1 w-full px-4 py-2 h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700' />
            </div>
            <div className='mt-4'>
                <AuthButton />
            </div>
        </form>
    </div>
  )
}

export default LoginForm