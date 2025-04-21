import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import OptInForm from '../components/OptInForm';
import OptInService from '../services/OptInService';

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.mtnLight};
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.bridgetunesDark};
  text-align: center;
  margin-bottom: 2rem;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 3rem;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const BenefitsCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const BenefitsTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.bridgetunesDark};
  margin-bottom: 1.5rem;
`;

const BenefitsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const BenefitItem = styled.div`
  display: flex;
  align-items: flex-start;
`;

const BenefitNumber = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: ${props => props.theme.colors.mtnYellow};
  color: ${props => props.theme.colors.mtnBlack};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${props => props.theme.fontWeights.bold};
  margin-right: 1rem;
  flex-shrink: 0;
`;

const BenefitContent = styled.div``;

const BenefitTitle = styled.h3`
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.bridgetunesDark};
  margin-bottom: 0.25rem;
`;

const BenefitDescription = styled.p`
  color: ${props => props.theme.colors.gray600};
  line-height: 1.5;
`;

const PromoText = styled.div`
  font-style: italic;
  color: ${props => props.theme.colors.gray600};
  margin-top: 1.5rem;
  font-size: 0.875rem;
`;

const ParticipantsCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
`;

const ParticipantsTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.bridgetunesDark};
  margin-bottom: 1rem;
`;

const ParticipantsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ParticipantItem = styled.div`
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.colors.gray50};
  padding: 0.75rem;
  border-radius: 0.5rem;
`;

const ParticipantIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background-color: ${props => props.theme.colors.mtnYellow};
  color: ${props => props.theme.colors.mtnBlack};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${props => props.theme.fontWeights.bold};
  margin-right: 0.75rem;
  flex-shrink: 0;
`;

const ParticipantInfo = styled.div``;

const ParticipantNumber = styled.p`
  font-weight: ${props => props.theme.fontWeights.medium};
`;

const ParticipantDate = styled.p`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.gray500};
`;

const FormContainer = styled.div`
  height: 100%;
`;

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
    <PageContainer>
      <Head>
        <title>Opt-In | MyNumba Don Win | Bridgetunes</title>
        <meta name="description" content="Join the MyNumba Don Win promotion by Bridgetunes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <MainContent>
        <PageTitle>Join MyNumba Don Win</PageTitle>
        
        <ContentGrid>
          <div>
            <BenefitsCard>
              <BenefitsTitle>Why Join?</BenefitsTitle>
              <BenefitsList>
                <BenefitItem>
                  <BenefitNumber>1</BenefitNumber>
                  <BenefitContent>
                    <BenefitTitle>Daily Cash Prizes</BenefitTitle>
                    <BenefitDescription>Win up to ₦1,000,000 in daily draws Monday through Friday</BenefitDescription>
                  </BenefitContent>
                </BenefitItem>
                <BenefitItem>
                  <BenefitNumber>2</BenefitNumber>
                  <BenefitContent>
                    <BenefitTitle>Weekly Mega Prizes</BenefitTitle>
                    <BenefitDescription>Participate in Saturday mega draws with a grand prize of ₦3,000,000</BenefitDescription>
                  </BenefitContent>
                </BenefitItem>
                <BenefitItem>
                  <BenefitNumber>3</BenefitNumber>
                  <BenefitContent>
                    <BenefitTitle>Simple Participation</BenefitTitle>
                    <BenefitDescription>Just opt-in once and recharge your MTN line daily to qualify</BenefitDescription>
                  </BenefitContent>
                </BenefitItem>
                <BenefitItem>
                  <BenefitNumber>4</BenefitNumber>
                  <BenefitContent>
                    <BenefitTitle>More Recharges, More Chances</BenefitTitle>
                    <BenefitDescription>Higher recharge amounts give you more points and better chances to win</BenefitDescription>
                  </BenefitContent>
                </BenefitItem>
              </BenefitsList>
              <PromoText>
                A Bridgetunes promotion in partnership with MTN Nigeria
              </PromoText>
            </BenefitsCard>
            
            {recentOptIns.length > 0 && (
              <ParticipantsCard>
                <ParticipantsTitle>Recent Participants</ParticipantsTitle>
                <ParticipantsList>
                  {recentOptIns.map((optIn, index) => (
                    <ParticipantItem key={index}>
                      <ParticipantIcon>{optIn.msisdn.slice(-1)}</ParticipantIcon>
                      <ParticipantInfo>
                        <ParticipantNumber>{formatMsisdn(optIn.msisdn)}</ParticipantNumber>
                        <ParticipantDate>Joined on {optIn.date}</ParticipantDate>
                      </ParticipantInfo>
                    </ParticipantItem>
                  ))}
                </ParticipantsList>
              </ParticipantsCard>
            )}
          </div>
          
          <FormContainer>
            <OptInForm onOptInSuccess={handleOptInSuccess} />
          </FormContainer>
        </ContentGrid>
      </MainContent>

      {/* Footer */}
      <Footer />
    </PageContainer>
  );
}

