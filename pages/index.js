import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import OptInForm from '../components/OptInForm';

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.mtnLight};
`;

const HeroSection = styled.section`
  background: linear-gradient(to right, ${props => props.theme.colors.mtnBlack}, ${props => props.theme.colors.mtnGray});
  color: white;
  padding: 4rem 0;
`;

const SectionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: center;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const HeroContent = styled.div``;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  margin-bottom: 1rem;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 3rem;
  }
`;

const HeroHighlight = styled.span`
  color: ${props => props.theme.colors.mtnYellow};
`;

const HeroDescription = styled.p`
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const PrimaryButton = styled(Link)`
  display: inline-block;
  background-color: ${props => props.theme.colors.mtnYellow};
  color: ${props => props.theme.colors.mtnBlack};
  font-weight: ${props => props.theme.fontWeights.bold};
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #e6b800;
    transform: translateY(-2px);
  }
`;

const SecondaryButton = styled(Link)`
  display: inline-block;
  background-color: transparent;
  color: white;
  font-weight: ${props => props.theme.fontWeights.bold};
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  border: 2px solid white;
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
`;

const CountdownContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 0.75rem;
  padding: 2rem;
`;

const CountdownTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  margin-bottom: 1.5rem;
  text-align: center;
`;

const CountdownGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
`;

const CountdownItem = styled.div`
  text-align: center;
`;

const CountdownValue = styled.div`
  font-size: 2.5rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.mtnYellow};
  line-height: 1;
  margin-bottom: 0.5rem;
`;

const CountdownLabel = styled.div`
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const PrizeAmount = styled.div`
  text-align: center;
  margin-top: 1.5rem;
`;

const PrizeLabel = styled.div`
  font-size: 1rem;
  margin-bottom: 0.25rem;
`;

const PrizeValue = styled.div`
  font-size: 2rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.mtnYellow};
`;

const MainSection = styled.section`
  padding: 4rem 0;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.bridgetunesDark};
  text-align: center;
  margin-bottom: 2.5rem;
`;

const PrizeStructureSection = styled.section`
  padding: 4rem 0;
  background-color: ${props => props.theme.colors.gray50};
`;

const PrizeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const PrizeCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  height: 100%;
`;

const PrizeCardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.bridgetunesDark};
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${props => props.theme.colors.gray200};
`;

const PrizeCardSubtitle = styled.h4`
  font-size: 1rem;
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.gray600};
  margin-bottom: 1rem;
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

const PrizeItemValue = styled.span`
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.bridgetunesDark};
`;

const HowItWorksSection = styled.section`
  padding: 4rem 0;
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StepCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  height: 100%;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const StepNumber = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: ${props => props.theme.colors.mtnYellow};
  color: ${props => props.theme.colors.mtnBlack};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${props => props.theme.fontWeights.bold};
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const StepTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.bridgetunesDark};
  margin-bottom: 0.75rem;
`;

const StepDescription = styled.p`
  color: ${props => props.theme.colors.gray600};
  line-height: 1.5;
`;

const OptInSection = styled.section`
  padding: 4rem 0;
  background-color: ${props => props.theme.colors.gray50};
`;

const AboutSection = styled.section`
  padding: 4rem 0;
`;

const AboutCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const AboutText = styled.p`
  color: ${props => props.theme.colors.gray700};
  line-height: 1.7;
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export default function Home() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  // Calculate countdown to next Saturday
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const daysUntilSaturday = (6 - now.getDay() + 7) % 7 || 7; // If today is Saturday, get next Saturday
      const nextSaturday = new Date(now);
      nextSaturday.setDate(now.getDate() + daysUntilSaturday);
      nextSaturday.setHours(12, 0, 0, 0); // Set to noon
      
      const difference = nextSaturday - now;
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        
        setCountdown({ days, hours, minutes, seconds });
      }
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <PageContainer>
      <Head>
        <title>MyNumba Don Win | Bridgetunes</title>
        <meta name="description" content="Win amazing cash prizes with MyNumba Don Win promotion by Bridgetunes and MTN" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection>
        <SectionContainer>
          <HeroGrid>
            <HeroContent>
              <HeroTitle>
                My<HeroHighlight>Numba</HeroHighlight> Don Win
              </HeroTitle>
              <HeroDescription>
                A Bridgetunes promotion in partnership with MTN Nigeria. Recharge your MTN line daily and win amazing cash prizes!
              </HeroDescription>
              <ButtonGroup>
                <PrimaryButton href="/opt-in">
                  Opt-In Now
                </PrimaryButton>
                <SecondaryButton href="#how-it-works">
                  How It Works
                </SecondaryButton>
              </ButtonGroup>
            </HeroContent>
            
            <CountdownContainer>
              <CountdownTitle>Next Mega Draw</CountdownTitle>
              <CountdownGrid>
                <CountdownItem>
                  <CountdownValue>{countdown.days}</CountdownValue>
                  <CountdownLabel>Days</CountdownLabel>
                </CountdownItem>
                <CountdownItem>
                  <CountdownValue>{countdown.hours}</CountdownValue>
                  <CountdownLabel>Hours</CountdownLabel>
                </CountdownItem>
                <CountdownItem>
                  <CountdownValue>{countdown.minutes}</CountdownValue>
                  <CountdownLabel>Minutes</CountdownLabel>
                </CountdownItem>
                <CountdownItem>
                  <CountdownValue>{countdown.seconds}</CountdownValue>
                  <CountdownLabel>Seconds</CountdownLabel>
                </CountdownItem>
              </CountdownGrid>
              
              <PrizeAmount>
                <PrizeLabel>Grand Prize</PrizeLabel>
                <PrizeValue>₦1,000,000</PrizeValue>
              </PrizeAmount>
            </CountdownContainer>
          </HeroGrid>
        </SectionContainer>
      </HeroSection>

      {/* Prize Structure */}
      <PrizeStructureSection>
        <SectionContainer>
          <SectionTitle>Prize Structure</SectionTitle>
          <PrizeGrid>
            <PrizeCard>
              <PrizeCardTitle>Daily Prizes</PrizeCardTitle>
              <PrizeCardSubtitle>Monday to Friday</PrizeCardSubtitle>
              <PrizeList>
                <PrizeItem>
                  <PrizeName>Jackpot Winner</PrizeName>
                  <PrizeItemValue>₦100,000</PrizeItemValue>
                </PrizeItem>
                <PrizeItem>
                  <PrizeName>2nd Prize</PrizeName>
                  <PrizeItemValue>₦50,000</PrizeItemValue>
                </PrizeItem>
                <PrizeItem>
                  <PrizeName>3rd Prize</PrizeName>
                  <PrizeItemValue>₦25,000</PrizeItemValue>
                </PrizeItem>
                <PrizeItem>
                  <PrizeName>Consolation Prizes</PrizeName>
                  <PrizeItemValue>7 x ₦10,000</PrizeItemValue>
                </PrizeItem>
              </PrizeList>
            </PrizeCard>
            
            <PrizeCard>
              <PrizeCardTitle>Saturday Mega Prizes</PrizeCardTitle>
              <PrizeCardSubtitle>Weekly Grand Draw</PrizeCardSubtitle>
              <PrizeList>
                <PrizeItem>
                  <PrizeName>Jackpot Winner</PrizeName>
                  <PrizeItemValue>₦1,000,000</PrizeItemValue>
                </PrizeItem>
                <PrizeItem>
                  <PrizeName>2nd Prize</PrizeName>
                  <PrizeItemValue>₦500,000</PrizeItemValue>
                </PrizeItem>
                <PrizeItem>
                  <PrizeName>3rd Prize</PrizeName>
                  <PrizeItemValue>₦250,000</PrizeItemValue>
                </PrizeItem>
                <PrizeItem>
                  <PrizeName>Consolation Prizes</PrizeName>
                  <PrizeItemValue>7 x ₦50,000</PrizeItemValue>
                </PrizeItem>
              </PrizeList>
            </PrizeCard>
          </PrizeGrid>
        </SectionContainer>
      </PrizeStructureSection>

      {/* How It Works */}
      <HowItWorksSection id="how-it-works">
        <SectionContainer>
          <SectionTitle>How It Works</SectionTitle>
          <StepsGrid>
            <StepCard>
              <StepNumber>1</StepNumber>
              <StepTitle>Opt-In</StepTitle>
              <StepDescription>
                Register your MTN number to participate in the promotion. It's free and takes less than a minute.
              </StepDescription>
            </StepCard>
            
            <StepCard>
              <StepNumber>2</StepNumber>
              <StepTitle>Recharge</StepTitle>
              <StepDescription>
                Recharge your MTN line daily to qualify for draws. Higher recharge amounts give you more chances to win.
              </StepDescription>
            </StepCard>
            
            <StepCard>
              <StepNumber>3</StepNumber>
              <StepTitle>Get Selected</StepNumber>
              <StepDescription>
                Winners are selected through a transparent electronic draw process supervised by regulatory authorities.
              </StepDescription>
            </StepCard>
            
            <StepCard>
              <StepNumber>4</StepNumber>
              <StepTitle>Receive Prize</StepTitle>
              <StepDescription>
                Winners are notified via SMS and prizes are transferred directly to your bank account within 48 hours.
              </StepDescription>
            </StepCard>
          </StepsGrid>
        </SectionContainer>
      </HowItWorksSection>

      {/* Opt-In Section */}
      <OptInSection>
        <SectionContainer>
          <SectionTitle>Join Now</SectionTitle>
          <OptInForm />
        </SectionContainer>
      </OptInSection>

      {/* About Bridgetunes */}
      <AboutSection>
        <SectionContainer>
          <SectionTitle>About Bridgetunes</SectionTitle>
          <AboutCard>
            <AboutText>
              Bridgetunes is a leading promotional campaign management company in Nigeria, specializing in creating engaging and rewarding experiences for customers across various sectors.
            </AboutText>
            <AboutText>
              The 'MyNumba Don Win' promotion is managed by Bridgetunes in partnership with MTN Nigeria, bringing exciting daily and weekly cash prizes to MTN subscribers across the country.
            </AboutText>
            <AboutText>
              With a focus on transparency, fairness, and customer satisfaction, Bridgetunes ensures that all draws are conducted in accordance with regulatory requirements and industry best practices.
            </AboutText>
          </AboutCard>
        </SectionContainer>
      </AboutSection>

      {/* Footer */}
      <Footer />
    </PageContainer>
  );
}

