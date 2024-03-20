import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import toast, { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/auth.js';
require('dotenv').config();

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BlockTrace',
  description: 'trace your Blocks',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
    <html lang="en" className='bg-white'>
      
      <body className={inter.className}>
      <Toaster
  position="top-center"
  reverseOrder={false}
   />
        {children}</body>
     
    </html>
    </AuthProvider>
  )
}
