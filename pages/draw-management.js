import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.mtnLight};
`;

const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
`;

const HeaderDecoration = styled.div`
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, ${props => props.theme.colors.mtnYellow}, ${props => props.theme.colors.mtnYellow}80);
  border-radius: 50%;
  z-index: -1;
  opacity: 0.7;
`;

const PageTitle = styled.h1`
  font-size: 2.8rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.bridgetunesDark};
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(to right, ${props => props.theme.colors.mtnYellow}, ${props => props.theme.colors.bridgetunesBlue});
    border-radius: 2px;
  }
`;

const PageDescription = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.gray600};
  max-width: 700px;
  margin: 1.5rem auto 0;
  line-height: 1.6;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid ${props => props.theme.colors.gray100};
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
    transform: translateY(-5px);
  }
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.bridgetunesDark};
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid ${props => props.theme.colors.gray200};
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.75rem;
    color: ${props => props.theme.colors.mtnYellow};
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.gray700};
  margin-bottom: 0.5rem;
  letter-spacing: 0.5px;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid ${props => props.theme.colors.gray300};
  border-radius: 8px;
  font-size: 1rem;
  background-color: white;
  transition: all 0.2s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23555' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E") ;
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.5rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.bridgetunesBlue};
    box-shadow: 0 0 0 3px rgba(0, 86, 179, 0.15);
  }
`;

const DateSelectionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.75rem;
`;

const DigitSelectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.75rem;
  margin-top: 1rem;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

const DigitCheckbox = styled.div`
  position: relative;
`;

const DigitInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  
  &:checked + label {
    background-color: ${props => props.theme.colors.mtnYellow};
    color: ${props => props.theme.colors.mtnBlack};
    font-weight: ${props => props.theme.fontWeights.bold};
    border-color: ${props => props.theme.colors.mtnYellow};
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  &:focus + label {
    box-shadow: 0 0 0 3px rgba(255, 204, 0, 0.3);
  }
`;

const DigitLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
  height: 48px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${props => props.recommended ? props.theme.colors.yellow50 : 'white'};
  border: 2px solid ${props => props.recommended ? props.theme.colors.yellow200 : props.theme.colors.gray300};
  
  ${props => props.recommended && `
    font-weight: ${props.theme.fontWeights.medium};
    color: ${props.theme.colors.yellow800};
  `}
  
  &:hover {
    background-color: ${props => props.recommended ? props.theme.colors.yellow100 : props.theme.colors.gray100};
    transform: translateY(-2px);
  }
`;

const AllDigitsButton = styled.button`
  grid-column: span 2;
  background-color: ${props => props.theme.colors.gray100};
  color: ${props => props.theme.colors.gray800};
  border: 2px solid ${props => props.theme.colors.gray300};
  border-radius: 8px;
  padding: 0.75rem;
  font-weight: ${props => props.theme.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.gray200};
    transform: translateY(-2px);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
  }
`;

const PrizeStructureGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-top: 1.5rem;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const PrizeCard = styled.div`
  background-color: ${props => props.theme.colors.gray50};
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid ${props => props.theme.colors.gray200};
`;

const PrizeCardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.bridgetunesDark};
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${props => props.theme.colors.gray200};
`;

const PrizeList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const PrizeItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid ${props => props.theme.colors.gray100};
  
  &:last-child {
    border-bottom: none;
  }
`;

const PrizeName = styled.span`
  font-weight: ${props => props.theme.fontWeights.medium};
`;

const PrizeValue = styled.span`
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.green600};
`;

const DrawDetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-top: 1.5rem;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const DetailItem = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid ${props => props.theme.colors.gray200};
  display: flex;
  flex-direction: column;
`;

const DetailLabel = styled.span`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.gray600};
  margin-bottom: 0.5rem;
`;

const DetailValue = styled.span`
  font-size: 1.125rem;
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.bridgetunesDark};
`;

const TotalPrizeValue = styled(DetailValue)`
  color: ${props => props.theme.colors.green600};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const Button = styled.button`
  background: linear-gradient(to right, ${props => props.theme.colors.bridgetunesBlue}, ${props => props.theme.colors.bridgetunesLightBlue});
  color: white;
  font-weight: ${props => props.theme.fontWeights.semibold};
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 50px;
  font-size: 1.125rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 86, 179, 0.2);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 86, 179, 0.25);
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  &:disabled {
    background: linear-gradient(to right, #a0a0a0, #c0c0c0);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ResultsSection = styled.div`
  margin-top: 3rem;
`;

const AlertBox = styled.div`
  background-color: ${props => props.type === 'warning' ? props.theme.colors.yellow50 : props.theme.colors.green50};
  border-left: 4px solid ${props => props.type === 'warning' ? props.theme.colors.yellow500 : props.theme.colors.green500};
  color: ${props => props.type === 'warning' ? props.theme.colors.yellow800 : props.theme.colors.green800};
  padding: 1rem 1.5rem;
  margin-bottom: 2rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  
  svg {
    flex-shrink: 0;
    margin-right: 0.75rem;
  }
`;

const WinnersGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const JackpotWinnerCard = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.mtnBlack}, ${props => props.theme.colors.gray800});
  color: white;
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  grid-column: 1 / -1;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: -50px;
    right: -50px;
    width: 100px;
    height: 100px;
    background-color: rgba(255, 204, 0, 0.1);
    border-radius: 50%;
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: -30px;
    left: -30px;
    width: 80px;
    height: 80px;
    background-color: rgba(255, 204, 0, 0.1);
    border-radius: 50%;
  }
`;

const WinnerTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: ${props => props.theme.fontWeights.medium};
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.mtnYellow};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const WinnerNumber = styled.div`
  font-size: 2.5rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  margin-bottom: 1rem;
  letter-spacing: 1px;
`;

const WinnerPrize = styled.div`
  font-size: 1.5rem;
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.mtnYellow};
  display: inline-block;
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  background-color: rgba(255, 255, 255, 0.1);
  margin-bottom: 1rem;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.375rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: ${props => props.theme.fontWeights.medium};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0.25rem;
  
  ${props => props.variant === 'success' && `
    background-color: ${props.theme.colors.green100};
    color: ${props.theme.colors.green800};
  `}
  
  ${props => props.variant === 'error' && `
    background-color: ${props.theme.colors.red100};
    color: ${props.theme.colors.red800};
  `}
  
  ${props => props.variant === 'warning' && `
    background-color: ${props.theme.colors.yellow100};
    color: ${props.theme.colors.yellow800};
  `}
`;

const WinnerCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid ${props => props.theme.colors.gray100};
  display: flex;
  flex-direction: column;
`;

const WinnerCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${props => props.theme.colors.gray200};
`;

const WinnerCardTitle = styled.h4`
  font-size: 1.125rem;
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.bridgetunesDark};
  margin: 0;
`;

const WinnerCardPrize = styled.div`
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.green600};
`;

const WinnerCardBody = styled.div`
  flex: 1;
`;

const WinnerCardNumber = styled.div`
  font-size: 1.5rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.bridgetunesDark};
`;

const WinnerCardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid ${props => props.theme.colors.gray200};
`;

const WinnerCardDate = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.gray600};
`;

const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;
  
  .spinner {
    width: 50px;
    height: 50px;
    border: 5px solid ${props => props.theme.colors.gray200};
    border-top: 5px solid ${props => props.theme.colors.bridgetunesBlue};
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.div`
  font-size: 1.125rem;
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.gray700};
`;

// Main component
export default function DrawManagement() {
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(4);
  const [day, setDay] = useState('');
  const [selectedDigits, setSelectedDigits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [drawStage, setDrawStage] = useState('idle'); // idle, loading, complete
  const [winners, setWinners] = useState([]);
  const [jackpotRollover, setJackpotRollover] = useState(false);
  const [msisdnData, setMsisdnData] = useState([]);
  
  // Updated prize structure based on user specifications
  const prizeStructure = {
    daily: {
      jackpot: 100000,
      second: 50000,
      third: 25000,
      consolation: 10000,
      consolationCount: 7
    },
    saturday: {
      jackpot: 1000000,
      second: 500000,
      third: 250000,
      consolation: 50000,
      consolationCount: 7
    }
  };
  
  // Generate years for dropdown
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
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Format MSISDN for display (mask middle digits)
  const formatMsisdn = (msisdn) => {
    if (!msisdn) return '';
    return `${msisdn.substring(0, 5)}****${msisdn.substring(msisdn.length - 2)}`;
  };
  
  // Calculate total prize pool
  const calculateTotalPrizePool = () => {
    const currentPrize = getCurrentPrizeStructure();
    return currentPrize.jackpot + 
           currentPrize.second + 
           currentPrize.third + 
           (currentPrize.consolation * currentPrize.consolationCount);
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
    if (day) {
      const dayOfWeek = getDayOfWeek(year, month, day);
      setSelectedDigits(dayDigitMapping[dayOfWeek] || []);
    } else {
      setSelectedDigits([]);
    }
  }, [year, month, day]);
  
  // Handle digit selection
  const handleDigitChange = (digit) => {
    if (selectedDigits.includes(digit)) {
      // Don't allow deselecting if it would result in no digits selected
      if (selectedDigits.length > 1) {
        setSelectedDigits(selectedDigits.filter(d => d !== digit));
      }
    } else {
      setSelectedDigits([...selectedDigits, digit]);
    }
  };
  
  // Handle "Select All" option
  const handleSelectAllDigits = () => {
    setSelectedDigits(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
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
    
    setIsLoading(true);
    setDrawStage('loading');
    setJackpotRollover(false);
    
    // Format the selected date
    const formattedDate = formatDate(year, month, day);
    
    // Filter MSISDNs based on selected date and digits
    const eligibleMsisdns = msisdnData.filter(item => {
      // Match date
      const dateMatch = item.date === formattedDate;
      
      // Match last digit if specific digits are selected
      const lastDigit = item.msisdn.slice(-1);
      const digitMatch = selectedDigits.includes(lastDigit);
      
      return dateMatch && digitMatch;
    });
    
    // Get current prize structure
    const currentPrizes = getCurrentPrizeStructure();
    
    // Simulate API call to get winners
    setTimeout(() => {
      if (eligibleMsisdns.length > 0) {
        // Select a random winner from eligible MSISDNs
        const winnerIndex = Math.floor(Math.random() * eligibleMsisdns.length);
        const mainWinner = eligibleMsisdns[winnerIndex];
        
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
        setIsLoading(false);
        return;
      }
      
      // Set draw stage to complete after a delay
      setTimeout(() => {
        setDrawStage('complete');
        setIsLoading(false);
      }, 1000);
    }, 2000);
  };
  
  return (
    <PageContainer>
      <Header />
      <MainContent>
        <PageHeader>
          <HeaderDecoration />
          <PageTitle>Draw Management</PageTitle>
          <PageDescription>
            Select a date and last digit filter to execute a draw and determine winners.
          </PageDescription>
        </PageHeader>
        
        <Card>
          <CardTitle>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14h-2V9h-2V7h4v10z"/>
            </svg>
            Draw Configuration
          </CardTitle>
          
          <FormGrid>
            <div>
              <FormGroup>
                <Label>Draw Date</Label>
                <DateSelectionGrid>
                  <Select 
                    value={month} 
                    onChange={(e)  => setMonth(parseInt(e.target.value))}
                  >
                    {months.map(m => (
                      <option key={m.value} value={m.value}>{m.label}</option>
                    ))}
                  </Select>
                  
                  <Select 
                    value={day} 
                    onChange={(e) => setDay(parseInt(e.target.value))}
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
                </DateSelectionGrid>
              </FormGroup>
              
              <FormGroup>
                <Label>Last Digit Selection</Label>
                <DigitSelectionGrid>
                  <AllDigitsButton 
                    onClick={handleSelectAllDigits}
                    disabled={!day}
                  >
                    Select All Digits
                  </AllDigitsButton>
                  
                  {['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].map(digit => {
                    const recommended = isRecommendedDigit(digit);
                    
                    return (
                      <DigitCheckbox key={digit}>
                        <DigitInput 
                          type="checkbox"
                          id={`digit-${digit}`}
                          checked={selectedDigits.includes(digit)}
                          onChange={() => handleDigitChange(digit)}
                          disabled={!day}
                        />
                        <DigitLabel 
                          htmlFor={`digit-${digit}`}
                          recommended={recommended}
                        >
                          {digit}
                        </DigitLabel>
                      </DigitCheckbox>
                    );
                  })}
                </DigitSelectionGrid>
              </FormGroup>
            </div>
            
            <div>
              <CardTitle>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM7 10.82C5.84 10.4 5 9.3 5 8V7h2v3.82zM12 16c-1.65 0-3-1.35-3-3V5h6v8c0 1.65-1.35 3-3 3zm7-8c0 1.3-.84 2.4-2 2.82V7h2v1z"/>
                </svg>
                Prize Structure
              </CardTitle>
              
              <PrizeStructureGrid>
                <PrizeCard>
                  <PrizeCardTitle>
                    {isSaturday()  ? 'Saturday Mega Prizes' : 'Daily Prizes'}
                  </PrizeCardTitle>
                  <PrizeList>
                    <PrizeItem>
                      <PrizeName>Jackpot (1st Prize)</PrizeName>
                      <PrizeValue>
                        {formatCurrency(getCurrentPrizeStructure().jackpot)}
                      </PrizeValue>
                    </PrizeItem>
                    <PrizeItem>
                      <PrizeName>2nd Prize</PrizeName>
                      <PrizeValue>
                        {formatCurrency(getCurrentPrizeStructure().second)}
                      </PrizeValue>
                    </PrizeItem>
                    <PrizeItem>
                      <PrizeName>3rd Prize</PrizeName>
                      <PrizeValue>
                        {formatCurrency(getCurrentPrizeStructure().third)}
                      </PrizeValue>
                    </PrizeItem>
                    <PrizeItem>
                      <PrizeName>Consolation Prizes</PrizeName>
                      <PrizeValue>
                        {getCurrentPrizeStructure().consolationCount} x {formatCurrency(getCurrentPrizeStructure().consolation)}
                      </PrizeValue>
                    </PrizeItem>
                  </PrizeList>
                </PrizeCard>
              </PrizeStructureGrid>
              
              {day && (
                <DrawDetailsGrid>
                  <DetailItem>
                    <DetailLabel>Day of Week</DetailLabel>
                    <DetailValue>{getDayOfWeek(year, month, day)}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Selected Digits</DetailLabel>
                    <DetailValue>{selectedDigits.join(', ') || 'None'}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Total Prize Pool</DetailLabel>
                    <TotalPrizeValue>{formatCurrency(calculateTotalPrizePool())}</TotalPrizeValue>
                  </DetailItem>
                </DrawDetailsGrid>
              )}
            </div>
          </FormGrid>
          
          <ButtonContainer>
            <Button 
              onClick={executeDraw}
              disabled={isLoading || !day || selectedDigits.length === 0}
            >
              {isLoading ? 'Processing...' : 'Execute Draw'}
            </Button>
          </ButtonContainer>
        </Card>
        
        {drawStage === 'loading' && (
          <Card>
            <LoadingSpinner>
              <div className="spinner"></div>
              <LoadingText>Drawing winners...</LoadingText>
            </LoadingSpinner>
          </Card>
        )}
        
        {drawStage === 'complete' && (
          <ResultsSection>
            {jackpotRollover && (
              <AlertBox type="warning">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                <div>
                  <strong>Jackpot Rollover:</strong> The jackpot winner has not opted in to the promotion. 
                  The jackpot prize will roll over to the next draw.
                </div>
              </AlertBox>
            ) }
            
            <Card>
              <CardTitle>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                </svg>
                Draw Results
              </CardTitle>
              
              <WinnersGrid>
                {winners.length > 0 && winners.find(w => w.prizeCategory === 'jackpot')  && (
                  <JackpotWinnerCard>
                    <WinnerTitle>Jackpot Winner</WinnerTitle>
                    <WinnerNumber>
                      {formatMsisdn(winners.find(w => w.prizeCategory === 'jackpot').msisdn)}
                    </WinnerNumber>
                    <WinnerPrize>
                      {formatCurrency(winners.find(w => w.prizeCategory === 'jackpot').prize)}
                    </WinnerPrize>
                    <div>
                      <StatusBadge variant={winners.find(w => w.prizeCategory === 'jackpot').optInStatus ? 'success' : 'error'}>
                        {winners.find(w => w.prizeCategory === 'jackpot').optInStatus ? 'Opted In' : 'Not Opted In'}
                      </StatusBadge>
                      <StatusBadge variant={winners.find(w => w.prizeCategory === 'jackpot').validWinner ? 'success' : 'error'}>
                        {winners.find(w => w.prizeCategory === 'jackpot').validWinner ? 'Valid Winner' : 'Invalid - Jackpot Rolls Over'}
                      </StatusBadge>
                    </div>
                  </JackpotWinnerCard>
                )}
                
                {winners.length > 0 && winners.find(w => w.prizeCategory === 'second') && (
                  <WinnerCard>
                    <WinnerCardHeader>
                      <WinnerCardTitle>2nd Prize Winner</WinnerCardTitle>
                      <WinnerCardPrize>
                        {formatCurrency(winners.find(w => w.prizeCategory === 'second').prize)}
                      </WinnerCardPrize>
                    </WinnerCardHeader>
                    <WinnerCardBody>
                      <WinnerCardNumber>
                        {formatMsisdn(winners.find(w => w.prizeCategory === 'second').msisdn)}
                      </WinnerCardNumber>
                      <div>
                        <StatusBadge variant={winners.find(w => w.prizeCategory === 'second').optInStatus ? 'success' : 'error'}>
                          {winners.find(w => w.prizeCategory === 'second').optInStatus ? 'Opted In' : 'Not Opted In'}
                        </StatusBadge>
                        <StatusBadge variant={winners.find(w => w.prizeCategory === 'second').validWinner ? 'success' : 'error'}>
                          {winners.find(w => w.prizeCategory === 'second').validWinner ? 'Valid Winner' : 'Invalid'}
                        </StatusBadge>
                      </div>
                    </WinnerCardBody>
                    <WinnerCardFooter>
                      <WinnerCardDate>
                        Draw Date: {winners.find(w => w.prizeCategory === 'second').date}
                      </WinnerCardDate>
                    </WinnerCardFooter>
                  </WinnerCard>
                )}
                
                {winners.length > 0 && winners.find(w => w.prizeCategory === 'third') && (
                  <WinnerCard>
                    <WinnerCardHeader>
                      <WinnerCardTitle>3rd Prize Winner</WinnerCardTitle>
                      <WinnerCardPrize>
                        {formatCurrency(winners.find(w => w.prizeCategory === 'third').prize)}
                      </WinnerCardPrize>
                    </WinnerCardHeader>
                    <WinnerCardBody>
                      <WinnerCardNumber>
                        {formatMsisdn(winners.find(w => w.prizeCategory === 'third').msisdn)}
                      </WinnerCardNumber>
                      <div>
                        <StatusBadge variant={winners.find(w => w.prizeCategory === 'third').optInStatus ? 'success' : 'error'}>
                          {winners.find(w => w.prizeCategory === 'third').optInStatus ? 'Opted In' : 'Not Opted In'}
                        </StatusBadge>
                        <StatusBadge variant={winners.find(w => w.prizeCategory === 'third').validWinner ? 'success' : 'error'}>
                          {winners.find(w => w.prizeCategory === 'third').validWinner ? 'Valid Winner' : 'Invalid'}
                        </StatusBadge>
                      </div>
                    </WinnerCardBody>
                    <WinnerCardFooter>
                      <WinnerCardDate>
                        Draw Date: {winners.find(w => w.prizeCategory === 'third').date}
                      </WinnerCardDate>
                    </WinnerCardFooter>
                  </WinnerCard>
                )}
                
                {winners.filter(w => w.prizeCategory === 'consolation').map((winner, index) => (
                  <WinnerCard key={index}>
                    <WinnerCardHeader>
                      <WinnerCardTitle>Consolation Winner #{index + 1}</WinnerCardTitle>
                      <WinnerCardPrize>
                        {formatCurrency(winner.prize)}
                      </WinnerCardPrize>
                    </WinnerCardHeader>
                    <WinnerCardBody>
                      <WinnerCardNumber>
                        {formatMsisdn(winner.msisdn)}
                      </WinnerCardNumber>
                      <div>
                        <StatusBadge variant={winner.optInStatus ? 'success' : 'error'}>
                          {winner.optInStatus ? 'Opted In' : 'Not Opted In'}
                        </StatusBadge>
                        <StatusBadge variant={winner.validWinner ? 'success' : 'error'}>
                          {winner.validWinner ? 'Valid Winner' : 'Invalid'}
                        </StatusBadge>
                      </div>
                    </WinnerCardBody>
                    <WinnerCardFooter>
                      <WinnerCardDate>
                        Draw Date: {winner.date}
                      </WinnerCardDate>
                    </WinnerCardFooter>
                  </WinnerCard>
                ))}
              </WinnersGrid>
            </Card>
          </ResultsSection>
        )}
      </MainContent>
      <Footer />
    </PageContainer>
  );
}
