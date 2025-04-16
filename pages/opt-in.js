import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import OptInForm from '../components/OptInForm';
import OptInService from '../services/OptInService';

export default function OptInPage() {
  const [recentOptIns, setRecentOptIns] = useState([]);
  
  // Load opt-in data using the OptInService
  useEffect(() => {
    const loadRecentOptIns = async () => {
      const recent = await OptInService.getRecentOptIns(5);
      setRecentOptIns(recent);
    };
    
    loadRecentOptIns();
  }, []);
  
  // Handle successful opt-in
  const handleOptInSuccess = async (newOptIn) => {
    // Refresh the recent opt-ins list
    const recent = await OptInService.getRecentOptIns(5);
    setRecentOptIns(recent);
  };
  
  // Format MSISDN for display (mask middle digits)
  const formatMsisdn = (msisdn) => {
    if (!msisdn) return '';
    return `${msisdn.substring(0, 3)}****${msisdn.substring(msisdn.length - 2)}`;
  };

  return (
    <div className="min-h-screen bg-mtn-light">
      <head>
        <title>Opt-In | MyNumba Don Win | Bridgetunes</title>
        <meta name="description" content="Join the MyNumba Don Win promotion by Bridgetunes" />
        <link rel="icon" href="/favicon.ico" />
      </head>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Join MyNumba Don Win</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Why Join?</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 bg-mtn-yellow rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-black font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-bold">Daily Cash Prizes</h3>
                    <p className="text-gray-600">Win up to ₦100,000 in daily draws Monday through Friday</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 bg-mtn-yellow rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-black font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-bold">Weekly Mega Prizes</h3>
                    <p className="text-gray-600">Participate in Saturday mega draws with a grand prize of ₦1,000,000</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 bg-mtn-yellow rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-black font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-bold">Simple Participation</h3>
                    <p className="text-gray-600">Just opt-in once and recharge your MTN line daily to qualify</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 bg-mtn-yellow rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-black font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-bold">More Recharges, More Chances</h3>
                    <p className="text-gray-600">Higher recharge amounts give you more points and better chances to win</p>
                  </div>
                </li>
              </ul>
              <div className="mt-4 text-sm text-gray-600 italic">
                A Bridgetunes promotion in partnership with MTN Nigeria
              </div>
            </div>
            
            {recentOptIns.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Recent Participants</h2>
                <div className="space-y-3">
                  {recentOptIns.map((optIn, index) => (
                    <div key={index} className="flex items-center bg-gray-50 p-3 rounded-lg">
                      <div className="h-10 w-10 bg-mtn-yellow rounded-full flex items-center justify-center mr-3">
                        <span className="text-black font-bold">{optIn.msisdn.slice(-1)}</span>
                      </div>
                      <div>
                        <p className="font-medium">{formatMsisdn(optIn.msisdn)}</p>
                        <p className="text-xs text-gray-500">Joined on {optIn.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div>
            <OptInForm onOptInSuccess={handleOptInSuccess} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
