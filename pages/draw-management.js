// pages/draw-management.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DrawAnimation from '../components/DrawAnimation';
import Button from '../components/Button'; // Import the new Button component

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
  width: 120px; // Much smaller size
  height: 120px; // Much smaller size
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
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto 2rem;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: row;
    align-items: flex-end;
  }
`;

const FormGroup = styled.div`
  flex: 1;
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    margin-top: 0;
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
  const [drawDate, setDrawDate] = useState('');
  const [lastDigit, setLastDigit] = useState('all');
  const [drawStage, setDrawStage] = useState('idle'); // idle, drawing, complete
  const [winningNumber, setWinningNumber] = useState('');
  const [prizeAmount, setPrizeAmount] = useState(0);
  const [winners, setWinners] = useState([]);
  
  // Available dates for the dropdown
  const availableDates = [
    '2023-09-01', '2023-09-02', '2023-09-03', '2023-09-04', '2023-09-05'
  ];
  
  // Last digit options
  const digitOptions = [
    { value: 'all', label: 'All Numbers' },
    { value: '0', label: 'Ending with 0' },
    { value: '1', label: 'Ending with 1' },
    { value: '2', label: 'Ending with 2' },
    { value: '3', label: 'Ending with 3' },
    { value: '4', label: 'Ending with 4' },
    { value: '5', label: 'Ending with 5' },
    { value: '6', label: 'Ending with 6' },
    { value: '7', label: 'Ending with 7' },
    { value: '8', label: 'Ending with 8' },
    { value: '9', label: 'Ending with 9' }
  ];
  
  // Execute draw function
  const executeDraw = () => {
    if (!drawDate) {
      alert('Please select a draw date');
      return;
    }
    
    setDrawStage('drawing');
    
    // Simulate API call to get winners
    setTimeout(() => {
      // Generate a random winning number
      const randomNumber = Math.floor(10000000000 + Math.random() * 90000000000).toString();
      const randomPrize = Math.floor(10000 + Math.random() * 990000);
      
      setWinningNumber(randomNumber);
      setPrizeAmount(randomPrize);
      
      // Generate some sample winners
      const sampleWinners = [
        { msisdn: randomNumber, prize: randomPrize, date: drawDate },
        { msisdn: Math.floor(10000000000 + Math.random() * 90000000000).toString(), prize: 5000, date: drawDate },
        { msisdn: Math.floor(10000000000 + Math.random() * 90000000000).toString(), prize: 2000, date: drawDate },
        { msisdn: Math.floor(10000000000 + Math.random() * 90000000000).toString(), prize: 1000, date: drawDate },
        { msisdn: Math.floor(10000000000 + Math.random() * 90000000000).toString(), prize: 500, date: drawDate }
      ];
      
      setWinners(sampleWinners);
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
            <FormGroup>
              <Label htmlFor="drawDate">Draw Date</Label>
              <Select 
                id="drawDate" 
                value={drawDate} 
                onChange={(e) => setDrawDate(e.target.value)}
              >
                <option value="">Select a date</option>
                {availableDates.map(date => (
                  <option key={date} value={date}>{date}</option>
                ))}
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="lastDigit">Last Digit</Label>
              <Select 
                id="lastDigit" 
                value={lastDigit} 
                onChange={(e) => setLastDigit(e.target.value)}
              >
                {digitOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </Select>
            </FormGroup>
            
            <ButtonContainer>
              <Button 
                variant="primary" 
                onClick={executeDraw}
                disabled={drawStage === 'drawing'}
              >
                {drawStage === 'drawing' ? 'Drawing...' : 'Execute Draw'}
              </Button>
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

