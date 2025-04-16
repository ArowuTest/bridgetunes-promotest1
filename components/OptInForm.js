import React, { useState, useEffect } from 'react';
import OptInService from '../services/OptInService';

const OptInForm = ({ onOptInSuccess }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const validatePhoneNumber = (number) => {
    // Basic validation for Nigerian phone numbers
    const regex = /^(0|234)[7-9][0-1][0-9]{8}$/;
    return regex.test(number);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate phone number
    if (!validatePhoneNumber(phoneNumber)) {
      setError('Please enter a valid Nigerian phone number');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Format the phone number to match our data format
      const formattedNumber = phoneNumber.startsWith('0') 
        ? phoneNumber.substring(1) // Remove leading 0
        : phoneNumber.startsWith('234') 
          ? phoneNumber.substring(3) // Remove 234 country code
          : phoneNumber;
      
      // Create new opt-in record
      const newOptIn = {
        msisdn: formattedNumber,
        topupAmount: 0, // No topup yet
        optIn: true,
        date: new Date().toISOString().split('T')[0],
        commission: 0,
        points: 0,
        lastDigit: formattedNumber.slice(-1)
      };
      
      // Use the OptInService to add the new opt-in
      const result = await OptInService.addOptIn(newOptIn);
      
      if (result.success) {
        // Show success message
        setSuccess(true);
        setPhoneNumber('');
        setName('');
        
        // Notify parent component
        if (onOptInSuccess) {
          onOptInSuccess(newOptIn);
        }
      } else {
        setError('Failed to register. Please try again.');
      }
      
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Opt-in error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Join the Promotion</h2>
      
      {success ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <p className="font-bold">Success!</p>
          <p>You have successfully opted in to the MyNumba Don Win promotion. Start recharging your MTN line to qualify for draws!</p>
          <button 
            className="mt-4 btn-primary w-full"
            onClick={() => setSuccess(false)}
          >
            Register Another Number
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field w-full"
              placeholder="Enter your full name"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number (MTN)
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="input-field w-full"
              placeholder="e.g., 08012345678"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter your MTN number in format: 080XXXXXXXX or 234XXXXXXXXX
            </p>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 text-mtn-yellow focus:ring-mtn-yellow border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the terms and conditions
              </label>
            </div>
          </div>
          
          <button
            type="submit"
            className="btn-primary w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Opt-In to Win'}
          </button>
          
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>You can also register by:</p>
            <ul className="mt-2 space-y-1">
              <li>Sending "JOIN" to 5050</li>
              <li>Dialing *123*1# and selecting option 1</li>
              <li>Using the MyMTN app</li>
            </ul>
          </div>
        </form>
      )}
    </div>
  );
};

export default OptInForm;
