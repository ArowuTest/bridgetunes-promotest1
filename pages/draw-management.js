import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DrawAnimation from '../components/DrawAnimation';

// Styled components for the page
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

// This will properly size the shield logo
const ShieldLogo = styled.div`
  width: 120px;
  height: 120px;
  margin: 0 auto 1.5rem;
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

const PageTitle = styled.h1`
  font-size: ${props => props.theme.fontSizes['3xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.bridgetunesDark};
  margin-bottom: 1rem;
`;

const PageDescription = styled.p`
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.gray600};
  max-width: 800px;
  margin: 0 auto 2rem;
`;

const DrawSection = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.radii.lg};
  box-shadow: ${props => props.theme.shadows.md};
  padding: 2rem;
  margin-bottom: 2rem;
`;

const DrawControls = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  max-width: 800px;
  margin: 0 auto 2rem;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.gray700};
  margin-bottom: 0.5rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid ${props => props.theme.colors.gray300};
  border-radius: ${props => props.theme.radii.md};
  font-size: ${props => props.theme.fontSizes.md};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.bridgetunesBlue};
    box-shadow: 0 0 0 3px rgba(0, 86, 179, 0.1);
  }
`;

const DateSelectionContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const CheckboxGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: ${props => props.theme.fontSizes.sm};
  cursor: pointer;
  
  ${props => props.recommended && `
    font-weight: ${props.theme.fontWeights.semibold};
    color: ${props.theme.colors.bridgetunesBlue};
  `}
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  grid-column: 1 / -1;
`;

// Styled button instead of importing Button component
const StyledButton = styled.button`
  background-color: ${props => props.theme.colors.bridgetunesBlue};
  color: ${props => props.theme.colors.white};
  font-weight: ${props => props.theme.fontWeights.semibold};
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: ${props => props.theme.radii.md};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.default};
  
  &:hover {
    background-color: ${props => props.theme.colors.bridgetunesLightBlue};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ResultsSection = styled.div`
  margin-top: 2rem;
`;

const WinnersList = styled.div`
  margin-top: 2rem;
  background-color: ${props => props.theme.colors.gray100};
  border-radius: ${props => props.theme.radii.lg};
  padding: 1.5rem;
`;

const WinnersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid ${props => props.theme.colors.gray300};
  }
  
  th {
    font-weight: ${props => props.theme.fontWeights.semibold};
    color: ${props => props.theme.colors.gray700};
  }
  
  tr:last-child td {
    border-bottom: none;
  }
`;

// Main component
const DrawManagement = () => {
  const [year, setYear] = useState(2025); // Default to 2025
  const [month, setMonth] = useState(4);  // Default to April
  const [day, setDay] = useState('');
  const [selectedDigits, setSelectedDigits] = useState([]);
  const [drawStage, setDrawStage] = useState('idle'); // idle, drawing, complete
  const [winningNumber, setWinningNumber] = useState('');
  const [prizeAmount, setPrizeAmount] = useState(0);
  const [winners, setWinners] = useState([]);
  const [msisdnData, setMsisdnData] = useState([]);
  const [jackpotRollover, setJackpotRollover] = useState(false);
  
  // Updated prize structure based on user specifications
  const prizeStructure = {
    daily: {
      jackpot: 1000000,
      second: 350000,
      third: 150000,
      consolation: 75000,
      consolationCount: 7
    },
    saturday: {
      jackpot: 3000000,
      second: 1000000,
      third: 500000,
      consolation: 100000,
      consolationCount: 7
    }
  };
  
  // Generate years for dropdown (current year and 2 years before/after)
  const years = [2023, 2024, 2025, 2026, 2027];
  
  // Generate months for dropdown
  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
  ];
  
  // Generate days for dropdown based on selected month and year
  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };
  
  const days = Array.from(
    { length: getDaysInMonth(year, month) }, 
    (_, i) => i + 1
  );
  
  // Day to digit mapping (recommended digits for each day)
  const dayDigitMapping = {
    'Monday': ['0', '1'],
    'Tuesday': ['2', '3'],
    'Wednesday': ['4', '5'],
    'Thursday': ['6', '7'],
    'Friday': ['8', '9'],
    'Saturday': ['0', '2', '4', '6', '8'],
    'Sunday': ['1', '3', '5', '7', '9']
  };
  
  // Get day of week from date
  const getDayOfWeek = (year, month, day) => {
    const date = new Date(year, month - 1, day);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  };
  
  // Format date as YYYY-MM-DD
  const formatDate = (year, month, day) => {
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };
  
  // Check if the selected day is a Saturday
  const isSaturday = () => {
    if (!day) return false;
    const dayOfWeek = getDayOfWeek(year, month, day);
    return dayOfWeek === 'Saturday';
  };
  
  // Get current prize structure based on selected day
  const getCurrentPrizeStructure = () => {
    return isSaturday() ? prizeStructure.saturday : prizeStructure.daily;
  };
  
  // Fetch MSISDN data on component mount
  useEffect(() => {
    const fetchMsisdnData = async () => {
      try {
        // First try to fetch from the public directory
        const response = await fetch('/data/msisdn_data.json');
        if (!response.ok) {
          throw new Error('Failed to fetch MSISDN data');
        }
        const data = await response.json();
        console.log('Loaded MSISDN data:', data.length, 'records');
        setMsisdnData(data);
      } catch (error) {
        console.error('Error fetching MSISDN data:', error);
        
        // If fetch fails, use hardcoded data that includes dates in 2025
        const fallbackData = [];
        
        // Generate 200 random MSISDNs with various dates in 2025
        for (let i = 0; i < 200; i++) {
          // Generate random MSISDN
          const prefix = '080';
          const randomDigits = Math.floor(10000000 + Math.random() * 90000000);
          const msisdn = prefix + randomDigits;
          
          // Generate random date in April 2025
          const day = Math.floor(1 + Math.random() * 15);
          const date = `2025-04-${String(day).padStart(2, '0')}`;
          
          // Generate random topup amount between 100 and 1000
          const topupAmount = Math.floor(100 + Math.random() * 900);
          
          // Random opt-in status (80% chance of being opted in)
          const optInStatus = Math.random() < 0.8;
          
          fallbackData.push({ msisdn, topupAmount, date, optInStatus });
        }
        
        // Add specific MSISDNs for April 8, 2025 with all ending digits
        for (let digit = 0; digit <= 9; digit++) {
          fallbackData.push({ 
            msisdn: `080123456${digit}`, 
            topupAmount: 500, 
            date: '2025-04-08',
            optInStatus: digit % 2 === 0 // Even digits are opted in
          });
        }
        
        // Add more MSISDNs for other April 2025 dates
        const aprilDates = [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15];
        aprilDates.forEach(day => {
          for (let digit = 0; digit <= 9; digit++) {
            fallbackData.push({
              msisdn: `0802${day}${digit}${digit}${digit}${digit}`,
              topupAmount: 300 + (day * 10),
              date: `2025-04-${String(day).padStart(2, '0')}`,
              optInStatus: Math.random() < 0.8 // 80% chance of being opted in
            });
          }
        });
        
        console.log('Using fallback MSISDN data:', fallbackData.length, 'records');
        setMsisdnData(fallbackData);
      }
    };
    
    fetchMsisdnData();
  }, []);
  
  // Reset selected digits when date changes
  useEffect(() => {
    setSelectedDigits([]);
  }, [year, month, day]);
  
  // Handle digit selection
  const handleDigitChange = (digit) => {
    if (selectedDigits.includes(digit)) {
      setSelectedDigits(selectedDigits.filter(d => d !== digit));
    } else {
      setSelectedDigits([...selectedDigits, digit]);
    }
  };
  
  // Handle "Select All" option
  const handleSelectAllDigits = () => {
    if (selectedDigits.length === 10) {
      // If all are selected, deselect all
      setSelectedDigits([]);
    } else {
      // Otherwise, select all
      setSelectedDigits(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
    }
  };
  
  // Get recommended digits for the selected day
  const getRecommendedDigits = () => {
    if (!day) return [];
    const dayOfWeek = getDayOfWeek(year, month, day);
    return dayDigitMapping[dayOfWeek] || [];
  };
  
  // Check if a digit is recommended for the selected day
  const isRecommendedDigit = (digit) => {
    return getRecommendedDigits().includes(digit);
  };
  
  // Execute draw function
  const executeDraw = () => {
    if (!day) {
      alert('Please select a complete date');
      return;
    }
    
    if (selectedDigits.length === 0) {
      alert('Please select at least one ending digit');
      return;
    }
    
    setDrawStage('drawing');
    setJackpotRollover(false);
    
    // Format the selected date
    const formattedDate = formatDate(year, month, day);
    console.log('Current MSISDN data:', msisdnData);
    console.log('Filtering MSISDNs for date:', formattedDate);
    console.log('Selected ending digits:', selectedDigits);
    console.log('Total MSISDNs available:', msisdnData.length);
    
    // Filter MSISDNs based on selected date and digits
    const eligibleMsisdns = msisdnData.filter(item => {
      // Match date
      const dateMatch = item.date === formattedDate;
      
      // Match last digit if specific digits are selected
      const lastDigit = item.msisdn.slice(-1);
      const digitMatch = selectedDigits.includes(lastDigit);
      
      return dateMatch && digitMatch;
    });
    
    console.log('Eligible MSISDNs found:', eligibleMsisdns.length);
    console.log('Eligible MSISDNs:', eligibleMsisdns);
    
    // Get current prize structure
    const currentPrizes = getCurrentPrizeStructure();
    
    // Simulate API call to get winners
    setTimeout(() => {
      if (eligibleMsisdns.length > 0) {
        // Select a random winner from eligible MSISDNs
        const winnerIndex = Math.floor(Math.random() * eligibleMsisdns.length);
        const mainWinner = eligibleMsisdns[winnerIndex];
        
        // Set the winning number and prize (using fixed prize amount)
        setWinningNumber(mainWinner.msisdn);
        setPrizeAmount(currentPrizes.jackpot);
        
        // Generate winners list (including the main winner and some random ones)
        const winnersList = [
          { 
            msisdn: mainWinner.msisdn, 
            prize: currentPrizes.jackpot, 
            date: formattedDate,
            optInStatus: mainWinner.optInStatus, // Include opt-in status
            validWinner: mainWinner.optInStatus, // Mark as valid only if opted in
            prizeCategory: 'jackpot'
          }
        ];
        
        // Check if jackpot winner has opted in
        if (!mainWinner.optInStatus) {
          setJackpotRollover(true);
        }
        
        // Remove the jackpot winner from the pool
        const remainingParticipants = eligibleMsisdns.filter((_, index) => index !== winnerIndex);
        
        // Select 2nd prize winner
        if (remainingParticipants.length > 0) {
          const secondWinnerIndex = Math.floor(Math.random() * remainingParticipants.length);
          const secondWinner = remainingParticipants[secondWinnerIndex];
          
          winnersList.push({
            msisdn: secondWinner.msisdn,
            prize: currentPrizes.second,
            date: formattedDate,
            optInStatus: secondWinner.optInStatus,
            validWinner: secondWinner.optInStatus,
            prizeCategory: 'second'
          });
          
          // Remove 2nd prize winner from pool
          remainingParticipants.splice(secondWinnerIndex, 1);
        }
        
        // Select 3rd prize winner
        if (remainingParticipants.length > 0) {
          const thirdWinnerIndex = Math.floor(Math.random() * remainingParticipants.length);
          const thirdWinner = remainingParticipants[thirdWinnerIndex];
          
          winnersList.push({
            msisdn: thirdWinner.msisdn,
            prize: currentPrizes.third,
            date: formattedDate,
            optInStatus: thirdWinner.optInStatus,
            validWinner: thirdWinner.optInStatus,
            prizeCategory: 'third'
          });
          
          // Remove 3rd prize winner from pool
          remainingParticipants.splice(thirdWinnerIndex, 1);
        }
        
        // Select consolation prize winners
        const consolationCount = Math.min(currentPrizes.consolationCount, remainingParticipants.length);
        
        for (let i = 0; i < consolationCount; i++) {
          if (remainingParticipants.length === 0) break;
          
          const consolationWinnerIndex = Math.floor(Math.random() * remainingParticipants.length);
          const consolationWinner = remainingParticipants[consolationWinnerIndex];
          
          winnersList.push({
            msisdn: consolationWinner.msisdn,
            prize: currentPrizes.consolation,
            date: formattedDate,
            optInStatus: consolationWinner.optInStatus,
            validWinner: consolationWinner.optInStatus,
            prizeCategory: 'consolation'
          });
          
          // Remove consolation winner from pool
          remainingParticipants.splice(consolationWinnerIndex, 1);
        }
        
        setWinners(winnersList);
      } else {
        // No eligible MSISDNs found
        alert('No eligible numbers found for the selected criteria');
        setDrawStage('idle');
        return;
      }
      
      setDrawStage('complete');
    }, 5000); // 5 seconds delay to simulate processing
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

  return (
    <>
      <Header />
      <PageContainer>
        <PageHeader>
          {/* Smaller shield logo */}
          <ShieldLogo>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
            </svg>
          </ShieldLogo>
          <PageTitle>Draw Management</PageTitle>
          <PageDescription>
            Select a date and last digit filter to execute a draw and determine winners.
          </PageDescription>
        </PageHeader>
        
        <DrawSection>
          <DrawControls>
            <div>
              <FormGroup>
                <Label>Draw Date</Label>
                <DateSelectionContainer>
                  <Select 
                    value={month} 
                    onChange={(e) => setMonth(parseInt(e.target.value))}
                  >
                    {months.map(m => (
                      <option key={m.value} value={m.value}>{m.label}</option>
                    ))}
                  </Select>
                  
                  <Select 
                    value={day} 
                    onChange={(e) => setDay(e.target.value)}
                  >
                    <option value="">Day</option>
                    {days.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </Select>
                  
                  <Select 
                    value={year} 
                    onChange={(e) => setYear(parseInt(e.target.value))}
                  >
                    {years.map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </Select>
                </DateSelectionContainer>
                
                {day && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#666' }}>
                    Selected: {formatDate(year, month, day)} ({getDayOfWeek(year, month, day)})
                    <br />
                    Recommended digits: {getRecommendedDigits().join(', ')}
                  </div>
                )}
              </FormGroup>
            </div>
            
            <div>
              <FormGroup>
                <Label>Last Digit Selection</Label>
                <CheckboxGroup>
                  <CheckboxLabel>
                    <Checkbox 
                      type="checkbox"
                      checked={selectedDigits.length === 10}
                      onChange={handleSelectAllDigits}
                      disabled={!day}
                    />
                    All
                  </CheckboxLabel>
                  
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(digit => {
                    const digitStr = digit.toString();
                    const recommended = isRecommendedDigit(digitStr);
                    
                    return (
                      <CheckboxLabel key={digit} recommended={recommended}>
                        <Checkbox 
                          type="checkbox"
                          value={digitStr}
                          checked={selectedDigits.includes(digitStr)}
                          onChange={() => handleDigitChange(digitStr)}
                          disabled={!day}
                        />
                        {digit}
                      </CheckboxLabel>
                    );
                  })}
                </CheckboxGroup>
              </FormGroup>
            </div>
          </DrawControls>
          
          {/* Prize Structure Display */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3 text-bridgetunes-blue">Prize Structure</h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-bridgetunes-dark mb-2">
                    {isSaturday() ? 'Saturday Mega Prizes' : 'Daily Prizes'}
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
                      <span>Consolation Prizes ({getCurrentPrizeStructure().consolationCount}):</span>
                      <span className="font-bold text-green-600">
                        {formatCurrency(getCurrentPrizeStructure().consolation)} each
                      </span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-bridgetunes-dark mb-2">Draw Details</h4>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Day:</span>
                      <span className="font-medium">{day ? getDayOfWeek(year, month, day) : 'Not selected'}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Eligible Numbers:</span>
                      <span className="font-medium">
                        {selectedDigits.length > 0 
                          ? `Ending with ${selectedDigits.join(', ')}` 
                          : 'None selected'}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Total Prize Pool:</span>
                      <span className="font-bold text-green-600">
                        {formatCurrency(
                          getCurrentPrizeStructure().jackpot +
                          getCurrentPrizeStructure().second +
                          getCurrentPrizeStructure().third +
                          (getCurrentPrizeStructure().consolation * getCurrentPrizeStructure().consolationCount)
                        )}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <ButtonContainer>
            <StyledButton 
              onClick={executeDraw}
              disabled={!day || selectedDigits.length === 0 || drawStage === 'drawing'}
            >
              {drawStage === 'drawing' ? 'Drawing...' : 'Execute Draw'}
            </StyledButton>
          </ButtonContainer>
        </DrawSection>
        
        {drawStage === 'drawing' && (
          <DrawSection>
            <PageHeader>
              <h2>Draw in Progress</h2>
              <p>Please wait while we select winners...</p>
            </PageHeader>
            
            {/* You can add a loading animation here */}
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎲</div>
              <p>Selecting from {msisdnData.length} eligible numbers</p>
            </div>
          </DrawSection>
        )}
        
        {drawStage === 'complete' && (
          <ResultsSection>
            <DrawSection>
              <PageHeader>
                <h2>Draw Results</h2>
                <p>The following winners have been selected:</p>
              </PageHeader>
              
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
              
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h3>Jackpot Winner</h3>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                  {winningNumber}
                </div>
                <div style={{ fontSize: '1.25rem', color: 'green', marginTop: '0.5rem' }}>
                  Prize: {formatCurrency(prizeAmount)}
                </div>
              </div>
              
              <WinnersList>
                <h3>All Winners</h3>
                <WinnersTable>
                  <thead>
                    <tr>
                      <th>Phone Number</th>
                      <th>Prize Amount</th>
                      <th>Draw Date</th>
                      <th>Opt-In Status</th>
                      <th>Valid Winner</th>
                    </tr>
                  </thead>
                  <tbody>
                    {winners.map((winner, index) => (
                      <tr key={index}>
                        <td>{winner.msisdn}</td>
                        <td>{formatCurrency(winner.prize)}</td>
                        <td>{winner.date}</td>
                        <td>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            winner.optInStatus ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {winner.optInStatus ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            winner.validWinner ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {winner.validWinner ? 'Valid' : (winner.prizeCategory === 'jackpot' ? 'Invalid - Jackpot Rolls Over' : 'Invalid')}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </WinnersTable>
              </WinnersList>
              
              <ButtonContainer>
                <StyledButton onClick={() => setDrawStage('idle')}>
                  Start New Draw
                </StyledButton>
              </ButtonContainer>
            </DrawSection>
          </ResultsSection>
        )}
      </PageContainer>
      <Footer />
    </>
  );
};

export default DrawManagement;


