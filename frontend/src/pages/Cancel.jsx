import React from 'react'
import { Link } from 'react-router-dom'
import { XCircle } from 'lucide-react' // Optional icon

const Cancel = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-blue-50 px-4'>
      <div className='w-full max-w-md bg-white shadow-xl rounded-2xl p-6 flex flex-col items-center text-center space-y-5'>
        
        <XCircle className="text-red-500 w-16 h-16 animate-pulse" />

        <h2 className='text-2xl font-semibold text-red-700'>
          Order Cancelled
        </h2>

        <p className='text-gray-600 text-sm'>
          Your order has been cancelled. You can always try again.
        </p>

        <Link
          to="/"
          className="mt-4 inline-block px-6 py-2 text-sm font-medium border border-red-700 text-red-700 rounded hover:bg-red-700 hover:text-white transition-all duration-200"
        >
          Go To Home
        </Link>
      </div>
    </div>
  )
}

export default Cancel
