import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CheckCircle } from 'lucide-react' // Optional: add Lucide for icon

const Success = () => {
  const location = useLocation()

  return (
    <div className='min-h-screen flex items-center justify-center bg-blue-50 px-4'>
      <div className='w-full max-w-md bg-white shadow-xl rounded-2xl p-6 flex flex-col items-center text-center space-y-5'>
        
        <CheckCircle className="text-green-500 w-16 h-16 animate-pulse" />
        
        <h2 className='text-2xl font-semibold text-green-700'>
          {Boolean(location?.state?.text) ? location?.state?.text : "Payment"} Successful!
        </h2>

        <p className='text-gray-600 text-sm'>
          Thank you for your purchase. We’ll process your order shortly.
        </p>

        <Link
          to="/"
          className="mt-4 inline-block px-6 py-2 text-sm font-medium border border-green-700 text-green-700 rounded hover:bg-green-700 hover:text-white transition-all duration-200"
        >
          Go To Home
        </Link>
      </div>
    </div>
  )
}

export default Success
