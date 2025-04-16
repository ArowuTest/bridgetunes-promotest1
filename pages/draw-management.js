import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function DrawManagement() {
  const [selectedDay, setSelectedDay] = useState('monday');
  const [selectedDigits, setSelectedDigits] = useState(['0', '1']);
  const [availableDigits, setAvailableDigits] = useState(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
  const [isDrawInProgress, setIsDrawInProgress] = useState(false);
  const [drawResults, setDrawResults] = useState(null);
  const [eligibleParticipants, setEligibleParticipants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [animationStage, setAnimationStage] = useState('none'); // none, jackpot, second, third, consolation
  const [msisdnData, setMsisdnData] = useState([]);

  // Default day-digit mapping
  const dayDigitMap = {
    monday: ['0', '1'],
    tuesday: ['2', '3'],
    wednesday: ['4', '5'],
    thursday: ['6', '7'],
    friday: ['8', '9'],
    saturday: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] // All digits for Saturday
  };

  // Load MSISDN data
  useEffect(() => {
    fetch('/data/msisdn_data.json')
      .then(response => response.json())
      .then(data => {
        setMsisdnData(data);
        console.log(`Loaded ${data.length} MSISDN records`);
      })
      .catch(error => {
        console.error('Error loading MSISDN data:', error);
      });
  }, []);

  // Handle day selection
  useEffect(() => {
    if (selectedDay === 'saturday') {
      // Saturday includes all numbers
      setSelectedDigits(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
    } else {
      // Set default digits for the selected day
      setSelectedDigits(dayDigitMap[selectedDay]);
    }
  }, [selectedDay]);

  // Toggle digit selection
  const toggleDigit = (digit) => {
    if (selectedDigits.includes(digit)) {
      // Don't allow deselecting if it would result in no digits selected
      if (selectedDigits.length > 1) {
        setSelectedDigits(selectedDigits.filter(d => d !== digit));
      }
    } else {
      setSelectedDigits([...selectedDigits, digit]);
    }
  };

  // Select all digits
  const selectAllDigits = () => {
    setSelectedDigits(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
  };

  // Clear all digits and select default for the day
  const resetToDefault = () => {
    setSelectedDigits(dayDigitMap[selectedDay]);
  };

  // Fetch eligible participants from loaded data
  const fetchEligibleParticipants = () => {
    setIsLoading(true);
    
    // Filter participants based on selected digits and opt-in status
    setTimeout(() => {
      const filtered = msisdnData.filter(participant => 
        participant.optIn && selectedDigits.includes(participant.lastDigit)
      );
      
      setEligibleParticipants(filtered.slice(0, Math.min(filtered.length, 1000))); // Limit to 1000 for performance
      setIsLoading(false);
    }, 1000);
  };

  // Handle animation completion for each prize category
  const handleAnimationComplete = (category, winningNumber) => {
    console.log(`${category} animation complete with number: ${winningNumber}`);
    
    // Move to next animation stage
    if (category === 'jackpot') {
      setAnimationStage('second');
    } else if (category === 'second') {
      setAnimationStage('third');
    } else if (category === 'third') {
      setAnimationStage('consolation');
    } else if (category === 'consolation') {
      setAnimationStage('complete');
      
      // Finalize draw results
      setIsDrawInProgress(false);
    }
  };

  // Execute draw with animation sequence
  const executeDraw = () => {
    setIsDrawInProgress(true);
    setDrawResults(null);
    
    // Start animation sequence
    setAnimationStage('jackpot');
    
    // Prepare winners object (will be populated during animations)
    const winners = {
      jackpot: null,
      second: null,
      third: null,
      consolation: []
    };
    
    // The actual winner selection will happen after animations
    setTimeout(() => {
      // Select winners based on points (weighted random selection)
      const participants = [...eligibleParticipants];
      
      // Helper function for weighted random selection
      const selectWinner = (participants) => {
        if (participants.length === 0) return null;
        
        // Calculate total points
        const totalPoints = participants.reduce((sum, p) => sum + p.points, 0);
        
        // Generate random point value
        const randomPoint = Math.random() * totalPoints;
        
        // Find participant at that point
        let pointSum = 0;
        for (const participant of participants) {
          pointSum += participant.points;
          if (randomPoint <= pointSum) {
            return participant;
          }
        }
        
        // Fallback to last participant (shouldn't happen)
        return participants[participants.length - 1];
      };
      
      // Select jackpot winner
      if (participants.length > 0) {
        winners.jackpot = selectWinner(participants);
        // Remove winner from pool
        const jackpotIndex = participants.findIndex(p => p.msisdn === winners.jackpot.msisdn);
        participants.splice(jackpotIndex, 1);
      }
      
      // Select 2nd prize winner
      if (participants.length > 0) {
        winners.second = selectWinner(participants);
        // Remove winner from pool
        const secondIndex = participants.findIndex(p => p.msisdn === winners.second.msisdn);
        participants.splice(secondIndex, 1);
      }
      
      // Select 3rd prize winner
      if (participants.length > 0) {
        winners.third = selectWinner(participants);
        // Remove winner from pool
        const thirdIndex = participants.findIndex(p => p.msisdn === winners.third.msisdn);
        participants.splice(thirdIndex, 1);
      }
      
      // Select consolation prize winners
      const consolationCount = selectedDay === 'saturday' ? 20 : 10;
      for (let i = 0; i < consolationCount && participants.length > 0; i++) {
        const winner = selectWinner(participants);
        winners.consolation.push(winner);
        // Remove winner from pool
        const winnerIndex = participants.findIndex(p => p.msisdn === winner.msisdn);
        participants.splice(winnerIndex, 1);
      }
      
      // Store results for display after animations complete
      setDrawResults(winners);
    }, 1000);
  };

  // Format MSISDN for display (mask middle digits)
  const formatMsisdn = (msisdn) => {
    if (!msisdn) return '';
    return `${msisdn.substring(0, 5)}****${msisdn.substring(msisdn.length - 2)}`;
  };

  return (
    <div className="min-h-screen bg-mtn-light">
      <head>
        <title>Draw Management | MyNumba Don Win | Bridgetunes</title>
        <meta name="description" content="Manage draws for MyNumba Don Win promotion by Bridgetunes" />
        <link rel="icon" href="/favicon.ico" />
      </head>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Draw Management</h1>
        
        {/* Draw Configuration */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Configure Draw</h2>
          
          {/* Day Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Day</label>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
              {Object.keys(dayDigitMap).map((day) => (
                <button
                  key={day}
                  className={`py-2 px-4 rounded-md transition-colors ${
                    selectedDay === day 
                      ? 'bg-mtn-yellow text-mtn-black font-bold' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                  }`}
                  onClick={() => setSelectedDay(day)}
                >
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          {/* Digit Selection */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Select Ending Digits</label>
              <div className="space-x-2">
                <button 
                  className="text-sm bg-mtn-black text-white py-1 px-3 rounded hover:bg-gray-800 transition-colors"
                  onClick={selectAllDigits}
                >
                  Select All
                </button>
                <button 
                  className="text-sm bg-gray-500 text-white py-1 px-3 rounded hover:bg-gray-600 transition-colors"
                  onClick={resetToDefault}
                >
                  Reset to Default
                </button>
              </div>
            </div>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {availableDigits.map((digit) => (
                <button
                  key={digit}
                  className={`py-3 px-4 rounded-md text-lg font-bold transition-colors ${
                    selectedDigits.includes(digit) 
                      ? 'bg-mtn-yellow text-mtn-black' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                  }`}
                  onClick={() => toggleDigit(digit)}
                >
                  {digit}
                </button>
              ))}
            </div>
          </div>
          
          {/* Summary */}
          <div className="bg-gray-100 rounded-md p-4 mb-6">
            <h3 className="font-bold mb-2">Draw Summary</h3>
            <p>
              <span className="font-medium">Day:</span> {selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)}
            </p>
            <p>
              <span className="font-medium">Eligible Numbers:</span> Ending with {selectedDigits.join(', ')}
            </p>
            <p>
              <span className="font-medium">Prize Categories:</span> {selectedDay === 'saturday' ? 'Weekly Mega Prizes' : 'Daily Prizes'}
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Managed by Bridgetunes in partnership with MTN Nigeria
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              className="btn-secondary flex-1"
              onClick={fetchEligibleParticipants}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Fetch Eligible Participants'}
            </button>
            <button 
              className="btn-primary flex-1"
              onClick={executeDraw}
              disabled={isDrawInProgress || eligibleParticipants.length === 0}
            >
              {isDrawInProgress ? 'Drawing...' : 'Execute Draw'}
            </button>
          </div>
        </div>
        
        {/* Draw Animation Section */}
        {isDrawInProgress && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Draw in Progress</h2>
            
            <div className="flex flex-col items-center justify-center">
              {/* Notary Verification Banner */}
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-6 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Bridgetunes Notary Verified Draw Process</span>
              </div>
              
              {/* Participant Pool Info */}
              <div className="mb-6 text-center">
                <p className="text-gray-600">
                  Drawing from pool of <span className="font-bold">{eligibleParticipants.length}</span> eligible participants
                </p>
                <p className="text-sm text-gray-500">
                  Numbers ending with: {selectedDigits.join(', ')}
                </p>
              </div>
              
              {/* Draw Animations */}
              <div className="w-full max-w-3xl mx-auto">
                {/* Animation components would be rendered here */}
                <div className="text-center py-8">
                  <div className="inline-block animate-spin-slow h-32 w-32 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 border-8 border-yellow-400 mb-4"></div>
                  <h3 className="text-xl font-bold">Selecting Winners...</h3>
                  <p className="text-gray-600">The draw is in progress</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Eligible Participants */}
        {eligibleParticipants.length > 0 && !isDrawInProgress && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Eligible Participants</h2>
            <div className="mb-4">
              <p className="text-lg">
                <span className="font-bold">{eligibleParticipants.length}</span> participants eligible for this draw
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MSISDN</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Digit</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topup Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {eligibleParticipants.slice(0, 10).map((participant, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatMsisdn(participant.msisdn)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{participant.lastDigit}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₦{participant.topupAmount.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{participant.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {eligibleParticipants.length > 10 && (
              <div className="mt-4 text-center text-sm text-gray-500">
                Showing 10 of {eligibleParticipants.length} participants
              </div>
            )}
          </div>
        )}
        
        {/* Draw Results */}
        {drawResults && animationStage === 'complete' && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 animate-draw">
            <h2 className="text-2xl font-bold mb-4">Draw Results</h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3 text-mtn-black">
                {selectedDay === 'saturday' ? 'Weekly Mega Draw' : 'Daily Draw'} - {selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Jackpot Winner */}
                <div className="bg-mtn-yellow rounded-lg p-4 shadow-md">
                  <h4 className="text-lg font-bold mb-2">
                    {selectedDay === 'saturday' ? 'Grand Prize - ₦1,000,000' : 'Jackpot - ₦100,000'}
                  </h4>
                  {drawResults.jackpot ? (
                    <div>
                      <p className="text-xl font-bold">{formatMsisdn(drawResults.jackpot.msisdn)}</p>
                      <p className="text-sm">Topup: ₦{drawResults.jackpot.topupAmount.toLocaleString()}</p>
                      <p className="text-sm">Points: {drawResults.jackpot.points}</p>
                    </div>
                  ) : (
                    <p>No eligible winner</p>
                  )}
                </div>
                
                {/* 2nd Prize Winner */}
                <div className="bg-gray-100 rounded-lg p-4 shadow-md">
                  <h4 className="text-lg font-bold mb-2">
                    {selectedDay === 'saturday' ? '2nd Prize - ₦500,000' : '2nd Prize - ₦50,000'}
                  </h4>
                  {drawResults.second ? (
                    <div>
                      <p className="text-xl font-bold">{formatMsisdn(drawResults.second.msisdn)}</p>
                      <p className="text-sm">Topup: ₦{drawResults.second.topupAmount.toLocaleString()}</p>
                      <p className="text-sm">Points: {drawResults.second.points}</p>
                    </div>
                  ) : (
                    <p>No eligible winner</p>
                  )}
                </div>
                
                {/* 3rd Prize Winner */}
                <div className="bg-gray-100 rounded-lg p-4 shadow-md">
                  <h4 className="text-lg font-bold mb-2">
                    {selectedDay === 'saturday' ? '3rd Prize - ₦250,000' : '3rd Prize - ₦25,000'}
                  </h4>
                  {drawResults.third ? (
                    <div>
                      <p className="text-xl font-bold">{formatMsisdn(drawResults.third.msisdn)}</p>
                      <p className="text-sm">Topup: ₦{drawResults.third.topupAmount.toLocaleString()}</p>
                      <p className="text-sm">Points: {drawResults.third.points}</p>
                    </div>
                  ) : (
                    <p>No eligible winner</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Consolation Prize Winners */}
            <div>
              <h3 className="text-xl font-bold mb-3">
                Consolation Prizes ({selectedDay === 'saturday' ? '₦10,000 each' : '₦5,000 each'})
              </h3>
              
              {drawResults.consolation.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {drawResults.consolation.map((winner, index) => (
                    <div key={index} className="bg-gray-50 rounded p-3 shadow-sm">
                      <p className="font-bold">{formatMsisdn(winner.msisdn)}</p>
                      <p className="text-xs">Topup: ₦{winner.topupAmount.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No consolation prize winners</p>
              )}
            </div>
            
            {/* Actions */}
            <div className="mt-6 flex justify-end">
              <button className="btn-primary">Save Results</button>
            </div>
            
            <div className="mt-4 text-center text-sm text-gray-600">
              Draw conducted by Bridgetunes for the MyNumba Don Win promotion
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
