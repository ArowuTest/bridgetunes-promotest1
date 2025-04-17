import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DrawAnimation from '../components/DrawAnimation';

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
  const [jackpotRollover, setJackpotRollover] = useState(false);

  // Prize structure based on the Excel file
  const prizeStructure = {
    daily: {
      jackpot: 1000000,
      second: 350000,
      third: 150000,
      consolation1: 75000,
      consolation2: 75000
    },
    saturday: {
      jackpot: 3000000,
      second: 1000000,
      third: 500000,
      consolation1: 100000,
      consolation2: 100000
    }
  };

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
    
    // Filter participants based on selected digits
    // Note: We include all numbers regardless of opt-in status for the draw
    // but will check opt-in status when determining valid winners
    setTimeout(() => {
      // Get last digit of each MSISDN
      const filtered = msisdnData.filter(participant => {
        const lastDigit = participant.msisdn.slice(-1);
        return selectedDigits.includes(lastDigit);
      });
      
      // Add lastDigit property to each participant for easier filtering
      const participantsWithLastDigit = filtered.map(participant => ({
        ...participant,
        lastDigit: participant.msisdn.slice(-1),
        // Add points based on topup amount (for weighted selection)
        points: participant.topupAmount || 100
      }));
      
      setEligibleParticipants(participantsWithLastDigit.slice(0, Math.min(participantsWithLastDigit.length, 1000))); // Limit to 1000 for performance
      setIsLoading(false);
    }, 1000);
  };

  // Handle animation completion for each prize category
  const handleAnimationComplete = (winningNumber) => {
    console.log(`Animation complete with number: ${winningNumber}`);
    
    // Move to next animation stage based on current stage
    if (animationStage === 'jackpot') {
      setAnimationStage('second');
    } else if (animationStage === 'second') {
      setAnimationStage('third');
    } else if (animationStage === 'third') {
      setAnimationStage('consolation');
    } else if (animationStage === 'consolation') {
      setAnimationStage('complete');
      
      // Finalize draw results
      setIsDrawInProgress(false);
    }
  };

  // Execute draw with animation sequence
  const executeDraw = () => {
    setIsDrawInProgress(true);
    setDrawResults(null);
    setJackpotRollover(false);
    
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
        
        // Check if jackpot winner has opted in
        if (winners.jackpot) {
          // Add opt-in status and validity to the winner object
          winners.jackpot.validWinner = winners.jackpot.optInStatus === true;
          
          // Set jackpot rollover flag if winner is not valid
          if (!winners.jackpot.validWinner) {
            setJackpotRollover(true);
          }
        }
        
        // Remove winner from pool
        const jackpotIndex = participants.findIndex(p => p.msisdn === winners.jackpot.msisdn);
        participants.splice(jackpotIndex, 1);
      }
      
      // Select 2nd prize winner
      if (participants.length > 0) {
        winners.second = selectWinner(participants);
        
        // Check if 2nd prize winner has opted in
        if (winners.second) {
          // Add opt-in status and validity to the winner object
          winners.second.validWinner = winners.second.optInStatus === true;
        }
        
        // Remove winner from pool
        const secondIndex = participants.findIndex(p => p.msisdn === winners.second.msisdn);
        participants.splice(secondIndex, 1);
      }
      
      // Select 3rd prize winner
      if (participants.length > 0) {
        winners.third = selectWinner(participants);
        
        // Check if 3rd prize winner has opted in
        if (winners.third) {
          // Add opt-in status and validity to the winner object
          winners.third.validWinner = winners.third.optInStatus === true;
        }
        
        // Remove winner from pool
        const thirdIndex = participants.findIndex(p => p.msisdn === winners.third.msisdn);
        participants.splice(thirdIndex, 1);
      }
      
      // Select consolation prize winners
      const consolationCount = selectedDay === 'saturday' ? 20 : 10;
      for (let i = 0; i < consolationCount && participants.length > 0; i++) {
        const winner = selectWinner(participants);
        
        // Check if consolation winner has opted in
        if (winner) {
          // Add opt-in status and validity to the winner object
          winner.validWinner = winner.optInStatus === true;
        }
        
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

  // Format currency for display
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Get current prize structure based on selected day
  const getCurrentPrizeStructure = () => {
    return selectedDay === 'saturday' ? prizeStructure.saturday : prizeStructure.daily;
  };

  return (
    <div className="min-h-screen bg-bridgetunes-light">
      <head>
        <title>Draw Management | MyNumba Don Win | Bridgetunes</title>
        <meta name="description" content="Manage draws for MyNumba Don Win promotion by Bridgetunes" />
        <link rel="icon" href="/favicon.ico" />
      </head>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-bridgetunes-dark">Draw Management</h1>
        
        {/* Draw Configuration */}
        <div className="card p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-bridgetunes-blue">Configure Draw</h2>
          
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
                  className="text-sm bg-bridgetunes-dark text-white py-1 px-3 rounded hover:bg-gray-800 transition-colors"
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
          
          {/* Prize Structure */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3 text-bridgetunes-blue">Prize Structure</h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-bridgetunes-dark mb-2">
                    {selectedDay === 'saturday' ? 'Saturday Mega Prizes' : 'Daily Prizes'}
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Jackpot (1st Prize):</span>
                      <span className="font-bold text-green-600">
                        {formatCurrency(getCurrentPrizeStructure().jackpot)}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>2nd Prize:</span>
                      <span className="font-bold text-green-600">
                        {formatCurrency(getCurrentPrizeStructure().second)}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>3rd Prize:</span>
                      <span className="font-bold text-green-600">
                        {formatCurrency(getCurrentPrizeStructure().third)}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Consolation Prize #1:</span>
                      <span className="font-bold text-green-600">
                        {formatCurrency(getCurrentPrizeStructure().consolation1)}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Consolation Prize #2:</span>
                      <span className="font-bold text-green-600">
                        {formatCurrency(getCurrentPrizeStructure().consolation2)}
                      </span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-bridgetunes-dark mb-2">Draw Details</h4>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Day:</span>
                      <span className="font-medium">{selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Eligible Numbers:</span>
                      <span className="font-medium">Ending with {selectedDigits.join(', ')}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Total Prize Pool:</span>
                      <span className="font-bold text-green-600">
                        {formatCurrency(
                          getCurrentPrizeStructure().jackpot +
                          getCurrentPrizeStructure().second +
                          getCurrentPrizeStructure().third +
                          getCurrentPrizeStructure().consolation1 +
                          getCurrentPrizeStructure().consolation2
                        )}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-600 text-center">
                Managed by Bridgetunes in partnership with MTN Nigeria
              </p>
            </div>
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
          <div className="card p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-center text-bridgetunes-blue">Draw in Progress</h2>
            
            <div className="flex flex-col items-center justify-center">
              {/* Notary Verification Banner */}
              <div className="bg-blue-100 text-bridgetunes-blue px-4 py-2 rounded-full mb-6 flex items-center">
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
                  Numbers ending with: {selectedDigits.join(', ') }
                </p>
              </div>
              
              {/* Draw Animations */}
              <div className="w-full max-w-3xl mx-auto">
                {/* Render the appropriate animation based on current stage */}
                {animationStage === 'jackpot' && (
                  <DrawAnimation 
                    prizeCategory="jackpot" 
                    isVisible={true} 
                    onComplete={handleAnimationComplete} 
                  />
                )}
                
                {animationStage === 'second' && (
                  <DrawAnimation 
                    prizeCategory="second" 
                    isVisible={true} 
                    onComplete={handleAnimationComplete} 
                  />
                )}
                
                {animationStage === 'third' && (
                  <DrawAnimation 
                    prizeCategory="third" 
                    isVisible={true} 
                    onComplete={handleAnimationComplete} 
                  />
                )}
                
                {animationStage === 'consolation' && (
                  <DrawAnimation 
                    prizeCategory="consolation" 
                    isVisible={true} 
                    onComplete={handleAnimationComplete} 
                  />
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Eligible Participants */}
        {eligibleParticipants.length > 0 && !isDrawInProgress && (
          <div className="card p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-bridgetunes-blue">Eligible Participants</h2>
            <div className="mb-4">
              <p className="text-lg">
                <span className="font-bold">{eligibleParticipants.length}</span> participants eligible for this draw
              </p>
            </div>
            
            <div className="table-container">
              <table className="table">
                <thead className="table-header">
                  <tr>
                    <th>ID</th>
                    <th>MSISDN</th>
                    <th>Last Digit</th>
                    <th>Topup Amount</th>
                    <th>Opt-In Status</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {eligibleParticipants.slice(0, 10).map((participant, index) => (
                    <tr key={index}>
                      <td className="font-medium text-gray-900">{index + 1}</td>
                      <td>{formatMsisdn(participant.msisdn)}</td>
                      <td>{participant.lastDigit}</td>
                      <td>₦{participant.topupAmount ? participant.topupAmount.toLocaleString() : '0'}</td>
                      <td>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          participant.optInStatus ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {participant.optInStatus ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td>{participant.points}</td>
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
          <div className="card p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-center text-bridgetunes-blue">Draw Results</h2>
            
            {jackpotRollover && (
              <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm">
                      <strong>Jackpot Rollover:</strong> The jackpot winner has not opted in to the promotion. 
                      The jackpot prize will roll over to the next draw.
                    </p>
                  </div>
                </div>
              </div>
            ) }
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Main Winners */}
              <div className="space-y-6">
                {/* Jackpot Winner */}
                {drawResults.jackpot && (
                  <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 p-4 rounded-lg border-2 border-yellow-400">
                    <h3 className="text-xl font-bold mb-2 text-center">
                      {selectedDay === 'saturday' ? 'Grand Prize Winner' : 'Jackpot Winner'}
                    </h3>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold">{formatMsisdn(drawResults.jackpot.msisdn)}</p>
                        <p className="text-sm text-gray-600">Points: {drawResults.jackpot.points}</p>
                        <div className="mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            drawResults.jackpot.optInStatus ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            Opt-In: {drawResults.jackpot.optInStatus ? 'Yes' : 'No'}
                          </span>
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                            drawResults.jackpot.validWinner ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {drawResults.jackpot.validWinner ? 'Valid Winner' : 'Invalid - Jackpot Rolls Over'}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-xl">
                          {formatCurrency(getCurrentPrizeStructure().jackpot)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Second Prize Winner */}
                {drawResults.second && (
                  <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-lg border-2 border-gray-400">
                    <h3 className="text-xl font-bold mb-2 text-center">2nd Prize Winner</h3>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold">{formatMsisdn(drawResults.second.msisdn)}</p>
                        <p className="text-sm text-gray-600">Points: {drawResults.second.points}</p>
                        <div className="mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            drawResults.second.optInStatus ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            Opt-In: {drawResults.second.optInStatus ? 'Yes' : 'No'}
                          </span>
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                            drawResults.second.validWinner ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {drawResults.second.validWinner ? 'Valid Winner' : 'Invalid'}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-xl">
                          {formatCurrency(getCurrentPrizeStructure().second)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Third Prize Winner */}
                {drawResults.third && (
                  <div className="bg-gradient-to-r from-amber-100 to-amber-200 p-4 rounded-lg border-2 border-amber-400">
                    <h3 className="text-xl font-bold mb-2 text-center">3rd Prize Winner</h3>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold">{formatMsisdn(drawResults.third.msisdn)}</p>
                        <p className="text-sm text-gray-600">Points: {drawResults.third.points}</p>
                        <div className="mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            drawResults.third.optInStatus ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            Opt-In: {drawResults.third.optInStatus ? 'Yes' : 'No'}
                          </span>
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                            drawResults.third.validWinner ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {drawResults.third.validWinner ? 'Valid Winner' : 'Invalid'}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-xl">
                          {formatCurrency(getCurrentPrizeStructure().third)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Consolation Winners */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-bridgetunes-blue">Consolation Prize Winners</h3>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MSISDN</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opt-In</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Prize</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {drawResults.consolation.map((winner, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 whitespace-nowrap text-sm">{formatMsisdn(winner.msisdn)}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm">{winner.points}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              winner.optInStatus ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {winner.optInStatus ? 'Yes' : 'No'}
                            </span>
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              winner.validWinner ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {winner.validWinner ? 'Valid' : 'Invalid'}
                            </span>
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-right font-medium">
                            {formatCurrency(index < 1 ? getCurrentPrizeStructure().consolation1 : getCurrentPrizeStructure().consolation2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <button 
                className="btn-primary"
                onClick={() => {
                  setDrawResults(null);
                  setAnimationStage('none');
                }}
              >
                Start New Draw
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
