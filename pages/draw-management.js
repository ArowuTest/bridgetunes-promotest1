// pages/draw-management.js
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
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [day, setDay] = useState('');
  const [selectedDigits, setSelectedDigits] = useState([]);
  const [drawStage, setDrawStage] = useState('idle'); // idle, drawing, complete
  const [winningNumber, setWinningNumber] = useState('');
  const [prizeAmount, setPrizeAmount] = useState(0);
  const [winners, setWinners] = useState([]);
  const [msisdnData, setMsisdnData] = useState([]);
  
  // Generate years for dropdown (current year and 2 years before/after)
  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i);
  
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
  
  // Fetch MSISDN data on component mount
  useEffect(() => {
    const fetchMsisdnData = async () => {
      try {
        const response = await fetch('/data/msisdn_data.json');
        const data = await response.json();
        setMsisdnData(data);
      } catch (error) {
        console.error('Error fetching MSISDN data:', error);
        // Fallback data if fetch fails
        setMsisdnData([
          { msisdn: '08012345678', topupAmount: 500, date: '2023-09-01' },
          { msisdn: '08023456789', topupAmount: 1000, date: '2023-09-01' },
          { msisdn: '08034567890', topupAmount: 200, date: '2023-09-02' },
          { msisdn: '08045678901', topupAmount: 300, date: '2023-09-02' },
          { msisdn: '08056789012', topupAmount: 500, date: '2023-09-03' },
          { msisdn: '08067890123', topupAmount: 1000, date: '2023-09-03' },
          { msisdn: '08078901234', topupAmount: 200, date: '2023-09-04' },
          { msisdn: '08089012345', topupAmount: 300, date: '2023-09-04' },
          { msisdn: '08090123456', topupAmount: 500, date: '2023-09-05' },
          { msisdn: '08001234567', topupAmount: 1000, date: '2023-09-05' }
        ]);
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
    
    // Format the selected date
    const formattedDate = formatDate(year, month, day);
    
    // Filter MSISDNs based on selected date and digits
    const eligibleMsisdns = msisdnData.filter(item => {
      // Match date
      if (item.date !== formattedDate) return false;
      
      // Match last digit if specific digits are selected
      const lastDigit = item.msisdn.slice(-1);
      return selectedDigits.includes(lastDigit);
    });
    
    // Simulate API call to get winners
    setTimeout(() => {
      if (eligibleMsisdns.length > 0) {
        // Select a random winner from eligible MSISDNs
        const winnerIndex = Math.floor(Math.random() * eligibleMsisdns.length);
        const mainWinner = eligibleMsisdns[winnerIndex];
        
        // Set the winning number and prize
        setWinningNumber(mainWinner.msisdn);
        setPrizeAmount(mainWinner.topupAmount * 10); // Prize is 10x the topup amount
        
        // Generate winners list (including the main winner and some random ones)
        const winnersList = [
          { 
            msisdn: mainWinner.msisdn, 
            prize: mainWinner.topupAmount * 10, 
            date: formattedDate 
          }
        ];
        
        // Add some additional winners with smaller prizes
        const additionalWinners = eligibleMsisdns
          .filter((_, index) => index !== winnerIndex) // Exclude main winner
          .slice(0, 4); // Take up to 4 additional winners
        
        additionalWinners.forEach(winner => {
          winnersList.push({
            msisdn: winner.msisdn,
            prize: winner.topupAmount * 2, // Smaller prize for additional winners
            date: formattedDate
          });
        });
        
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
            
            <ButtonContainer>
              <StyledButton 
                onClick={executeDraw}
                disabled={drawStage === 'drawing' || !day || selectedDigits.length === 0}
              >
                {drawStage === 'drawing' ? 'Drawing...' : 'Execute Draw'}
              </StyledButton>
            </ButtonContainer>
          </DrawControls>
          
          <DrawAnimation 
            stage={drawStage} 
            winningNumber={winningNumber} 
            prizeAmount={prizeAmount} 
          />
          
          {drawStage === 'complete' && winners.length > 0 && (
            <ResultsSection>
              <h2>Draw Results</h2>
              <WinnersList>
                <h3>Winners</h3>
                <WinnersTable>
                  <thead>
                    <tr>
                      <th>Phone Number</th>
                      <th>Prize Amount</th>
                      <th>Draw Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {winners.map((winner, index) => (
                      <tr key={index}>
                        <td>{winner.msisdn}</td>
                        <td>₦{winner.prize.toLocaleString()}</td>
                        <td>{winner.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </WinnersTable>
              </WinnersList>
            </ResultsSection>
          )}
        </DrawSection>
      </PageContainer>
      <Footer />
    </>
  );
};

export default DrawManagement;

