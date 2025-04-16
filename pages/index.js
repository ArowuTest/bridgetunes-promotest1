import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import OptInForm from '../components/OptInForm';

export default function Home() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [winners, setWinners] = useState({
    daily: [],
    weekly: []
  });
  
  // Set next draw date (example: next Saturday at 8 PM)
  useEffect(() => {
    const calculateTimeLeft = () => {
      // Get current date
      const now = new Date();
      
      // Calculate next draw date (Saturday 8 PM)
      const nextDraw = new Date();
      nextDraw.setDate(nextDraw.getDate() + (6 - nextDraw.getDay()));
      nextDraw.setHours(20, 0, 0, 0);
      
      // If today is Saturday and it's past 8 PM, set to next Saturday
      if (now.getDay() === 6 && now.getHours() >= 20) {
        nextDraw.setDate(nextDraw.getDate() + 7);
      }
      
      // Calculate difference
      const difference = nextDraw - now;
      
      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };
    
    // Update countdown every second
    const timer = setInterval(calculateTimeLeft, 1000);
    
    // Initial calculation
    calculateTimeLeft();
    
    // Cleanup
    return () => clearInterval(timer);
  }, []);
  
  // Load sample winners
  useEffect(() => {
    // In a real implementation, this would be an API call
    // For the prototype, we'll use sample data
    const sampleWinners = {
      daily: [
        { msisdn: '0803******65', prize: '₦100,000', date: '15 Apr 2025' },
        { msisdn: '0805******22', prize: '₦50,000', date: '14 Apr 2025' },
        { msisdn: '0701******91', prize: '₦25,000', date: '13 Apr 2025' }
      ],
      weekly: [
        { msisdn: '0803******12', prize: '₦1,000,000', date: '12 Apr 2025' },
        { msisdn: '0805******78', prize: '₦500,000', date: '05 Apr 2025' },
        { msisdn: '0701******45', prize: '₦250,000', date: '29 Mar 2025' }
      ]
    };
    
    setWinners(sampleWinners);
  }, []);
  
  // Handle successful opt-in
  const handleOptInSuccess = (newOptIn) => {
    // In a real implementation, this would update the backend
    console.log('New opt-in:', newOptIn);
  };

  return (
    <div className="min-h-screen bg-mtn-light">
      <head>
        <title>MyNumba Don Win | A Bridgetunes Promotion with MTN Nigeria</title>
        <meta name="description" content="Join the MyNumba Don Win promotion by Bridgetunes and MTN Nigeria" />
        <link rel="icon" href="/favicon.ico" />
      </head>

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-mtn-black to-mtn-gray text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-mtn-yellow">MyNumba</span> Don Win
              </h1>
              <p className="text-xl mb-6">
                A Bridgetunes promotion in partnership with MTN Nigeria. Recharge your MTN line daily and win amazing cash prizes!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/opt-in" className="btn-primary">
                  Opt-In Now
                </a>
                <a href="#how-it-works" className="btn-secondary">
                  How It Works
                </a>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-mtn-black bg-opacity-50 rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Next Mega Draw</h2>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  <div className="bg-mtn-yellow text-mtn-black rounded-lg p-3 text-center">
                    <div className="text-3xl font-bold">{countdown.days}</div>
                    <div className="text-xs">Days</div>
                  </div>
                  <div className="bg-mtn-yellow text-mtn-black rounded-lg p-3 text-center">
                    <div className="text-3xl font-bold">{countdown.hours}</div>
                    <div className="text-xs">Hours</div>
                  </div>
                  <div className="bg-mtn-yellow text-mtn-black rounded-lg p-3 text-center">
                    <div className="text-3xl font-bold">{countdown.minutes}</div>
                    <div className="text-xs">Minutes</div>
                  </div>
                  <div className="bg-mtn-yellow text-mtn-black rounded-lg p-3 text-center">
                    <div className="text-3xl font-bold">{countdown.seconds}</div>
                    <div className="text-xs">Seconds</div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm mb-2">Grand Prize</p>
                  <p className="text-3xl font-bold text-mtn-yellow">₦1,000,000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prize Structure */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Prize Structure</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Daily Prizes */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-mtn-yellow text-mtn-black p-4">
                <h3 className="text-2xl font-bold text-center">Daily Prizes</h3>
                <p className="text-center">Monday to Friday</p>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex justify-between items-center border-b pb-2">
                    <span className="font-bold">Jackpot Winner</span>
                    <span className="text-xl font-bold">₦100,000</span>
                  </li>
                  <li className="flex justify-between items-center border-b pb-2">
                    <span className="font-bold">2nd Prize</span>
                    <span className="text-xl font-bold">₦50,000</span>
                  </li>
                  <li className="flex justify-between items-center border-b pb-2">
                    <span className="font-bold">3rd Prize</span>
                    <span className="text-xl font-bold">₦25,000</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-bold">Consolation Prizes (10)</span>
                    <span className="text-xl font-bold">₦5,000 each</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Weekly Prizes */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-mtn-black text-mtn-yellow p-4">
                <h3 className="text-2xl font-bold text-center">Weekly Mega Prizes</h3>
                <p className="text-center text-white">Every Saturday</p>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex justify-between items-center border-b pb-2">
                    <span className="font-bold">Grand Prize</span>
                    <span className="text-xl font-bold">₦1,000,000</span>
                  </li>
                  <li className="flex justify-between items-center border-b pb-2">
                    <span className="font-bold">2nd Prize</span>
                    <span className="text-xl font-bold">₦500,000</span>
                  </li>
                  <li className="flex justify-between items-center border-b pb-2">
                    <span className="font-bold">3rd Prize</span>
                    <span className="text-xl font-bold">₦250,000</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-bold">Consolation Prizes (20)</span>
                    <span className="text-xl font-bold">₦10,000 each</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="h-16 w-16 bg-mtn-yellow rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-bold mb-2">Opt-In</h3>
              <p className="text-gray-600">
                Register for the promotion through this website, by sending "JOIN" to 5050, or by dialing *123*1#
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="h-16 w-16 bg-mtn-yellow rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-bold mb-2">Recharge Daily</h3>
              <p className="text-gray-600">
                Recharge your MTN line daily to qualify for draws. Higher recharge amounts give you better chances to win!
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="h-16 w-16 bg-mtn-yellow rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-bold mb-2">Win Prizes</h3>
              <p className="text-gray-600">
                Participate in daily draws (Mon-Fri) and weekly mega draws (Sat) for a chance to win amazing cash prizes!
              </p>
            </div>
          </div>
          <div className="mt-12 text-center">
            <p className="text-lg mb-4">
              <span className="font-bold">Important:</span> Your phone number's last digit determines your draw days:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-3xl mx-auto">
              <div className="bg-white rounded-lg shadow-md p-3">
                <p className="font-bold">Monday</p>
                <p className="text-mtn-yellow text-xl font-bold">0, 1</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-3">
                <p className="font-bold">Tuesday</p>
                <p className="text-mtn-yellow text-xl font-bold">2, 3</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-3">
                <p className="font-bold">Wednesday</p>
                <p className="text-mtn-yellow text-xl font-bold">4, 5</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-3">
                <p className="font-bold">Thursday</p>
                <p className="text-mtn-yellow text-xl font-bold">6, 7</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-3">
                <p className="font-bold">Friday</p>
                <p className="text-mtn-yellow text-xl font-bold">8, 9</p>
              </div>
            </div>
            <p className="mt-4 text-lg">
              <span className="font-bold">Saturday Mega Draw:</span> All numbers are eligible!
            </p>
          </div>
        </div>
      </section>

      {/* Recent Winners */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Recent Winners</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Daily Winners */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-mtn-yellow text-mtn-black p-4">
                <h3 className="text-xl font-bold text-center">Daily Draw Winners</h3>
              </div>
              <div className="p-4">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="text-left py-2">Phone Number</th>
                      <th className="text-left py-2">Prize</th>
                      <th className="text-left py-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {winners.daily.map((winner, index) => (
                      <tr key={index} className="border-t">
                        <td className="py-2">{winner.msisdn}</td>
                        <td className="py-2">{winner.prize}</td>
                        <td className="py-2">{winner.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Weekly Winners */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-mtn-black text-mtn-yellow p-4">
                <h3 className="text-xl font-bold text-center">Weekly Mega Draw Winners</h3>
              </div>
              <div className="p-4">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="text-left py-2">Phone Number</th>
                      <th className="text-left py-2">Prize</th>
                      <th className="text-left py-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {winners.weekly.map((winner, index) => (
                      <tr key={index} className="border-t">
                        <td className="py-2">{winner.msisdn}</td>
                        <td className="py-2">{winner.prize}</td>
                        <td className="py-2">{winner.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Opt-In Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Join Now</h2>
          <div className="max-w-md mx-auto">
            <OptInForm onOptInSuccess={handleOptInSuccess} />
          </div>
        </div>
      </section>

      {/* About Bridgetunes */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">About Bridgetunes</h2>
          <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
            <p className="mb-4">
              Bridgetunes is a leading promotional campaign management company in Nigeria, specializing in creating engaging and rewarding experiences for customers across various sectors.
            </p>
            <p className="mb-4">
              The 'MyNumba Don Win' promotion is managed by Bridgetunes in partnership with MTN Nigeria, bringing exciting daily and weekly cash prizes to MTN subscribers across the country.
            </p>
            <p>
              With a focus on transparency, fairness, and customer satisfaction, Bridgetunes ensures that all draws are conducted under strict supervision and in compliance with regulatory requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
