import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import OptInService from '../services/OptInService';

// Styled components
const FormContainer = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.radii.lg};
  box-shadow: ${props => props.theme.shadows.md};
  padding: 1.5rem;
  max-width: 28rem;
  margin: 0 auto;
`;

const FormTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  margin-bottom: 1rem;
  text-align: center;
`;

const SuccessMessage = styled.div`
  background-color: #d1fae5;
  border: 1px solid #34d399;
  color: #065f46;
  padding: 0.75rem 1rem;
  border-radius: ${props => props.theme.radii.md};
  margin-bottom: 1rem;
`;

const SuccessTitle = styled.p`
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const SuccessText = styled.p`
  margin-top: 0.25rem;
`;

const ErrorMessage = styled.div`
  background-color: #fee2e2;
  border: 1px solid #f87171;
  color: #b91c1c;
  padding: 0.75rem 1rem;
  border-radius: ${props => props.theme.radii.md};
  margin-bottom: 1rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.gray700};
  margin-bottom: 0.25rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid ${props => props.theme.colors.gray300};
  border-radius: ${props => props.theme.radii.md};
  font-size: ${props => props.theme.fontSizes.md};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.bridgetunesBlue};
    box-shadow: 0 0 0 3px rgba(0, 86, 179, 0.1);
  }
`;

const HelpText = styled.p`
  font-size: ${props => props.theme.fontSizes.xs};
  color: ${props => props.theme.colors.gray500};
  margin-top: 0.25rem;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Checkbox = styled.input`
  height: 1rem;
  width: 1rem;
  color: ${props => props.theme.colors.mtnYellow};
  border-color: ${props => props.theme.colors.gray300};
  border-radius: ${props => props.theme.radii.sm};
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 204, 0, 0.1);
  }
`;

const CheckboxLabel = styled.label`
  margin-left: 0.5rem;
  display: block;
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.gray700};
`;

const Button = styled.button`
  width: 100%;
  background-color: ${props => props.theme.colors.bridgetunesBlue};
  color: ${props => props.theme.colors.white};
  font-weight: ${props => props.theme.fontWeights.semibold};
  padding: 0.5rem 1rem;
  border: none;
  border-radius: ${props => props.theme.radii.md};
  cursor: pointer;
  transition: background-color ${props => props.theme.transitions.default};
  
  &:hover {
    background-color: ${props => props.theme.colors.bridgetunesLightBlue};
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const InfoSection = styled.div`
  margin-top: 1rem;
  text-align: center;
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.gray500};
`;

const InfoList = styled.ul`
  margin-top: 0.5rem;
  space-y: 0.25rem;
`;

const InfoItem = styled.li`
  margin-bottom: 0.25rem;
`;

const OptInForm = ({ onOptInSuccess }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const validatePhoneNumber = (number) => {
    // Basic validation for Nigerian phone numbers
    const regex = /^(0|234)[7-9][0-1][0-9]{8}$/;
    return regex.test(number);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate phone number
    if (!validatePhoneNumber(phoneNumber)) {
      setError('Please enter a valid Nigerian phone number');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Format the phone number to match our data format
      const formattedNumber = phoneNumber.startsWith('0') 
        ? phoneNumber.substring(1) // Remove leading 0
        : phoneNumber.startsWith('234') 
          ? phoneNumber.substring(3) // Remove 234 country code
          : phoneNumber;
      
      // Create new opt-in record
      const newOptIn = {
        msisdn: formattedNumber,
        topupAmount: 0, // No topup yet
        optIn: true,
        date: new Date().toISOString().split('T')[0],
        commission: 0,
        points: 0,
        lastDigit: formattedNumber.slice(-1)
      };
      
      // Use the OptInService to add the new opt-in
      const result = await OptInService.addOptIn(newOptIn);
      
      if (result.success) {
        // Show success message
        setSuccess(true);
        setPhoneNumber('');
        setName('');
        
        // Notify parent component
        if (onOptInSuccess) {
          onOptInSuccess(newOptIn);
        }
      } else {
        setError('Failed to register. Please try again.');
      }
      
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Opt-in error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <FormTitle>Join the Promotion</FormTitle>
      
      {success ? (
        <SuccessMessage>
          <SuccessTitle>Success!</SuccessTitle>
          <SuccessText>You have successfully opted in to the MyNumba Don Win promotion. Start recharging your MTN line to qualify for draws!</SuccessText>
          <Button 
            onClick={() => setSuccess(false)}
            style={{ marginTop: '1rem' }}
          >
            Register Another Number
          </Button>
        </SuccessMessage>
      ) : (
        <form onSubmit={handleSubmit}>
          {error && (
            <ErrorMessage>
              {error}
            </ErrorMessage>
          )}
          
          <FormGroup>
            <Label htmlFor="name">
              Full Name
            </Label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="phoneNumber">
              Phone Number (MTN)
            </Label>
            <Input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="e.g., 08012345678"
              required
            />
            <HelpText>
              Enter your MTN number in format: 080XXXXXXXX or 234XXXXXXXXX
            </HelpText>
          </FormGroup>
          
          <CheckboxContainer>
            <Checkbox
              id="terms"
              type="checkbox"
              required
            />
            <CheckboxLabel htmlFor="terms">
              I agree to the terms and conditions
            </CheckboxLabel>
          </CheckboxContainer>
          
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Opt-In to Win'}
          </Button>
          
          <InfoSection>
            <p>You can also register by:</p>
            <InfoList>
              <InfoItem>Sending "JOIN" to 5050</InfoItem>
              <InfoItem>Dialing *123*1# and selecting option 1</InfoItem>
              <InfoItem>Using the MyMTN app</InfoItem>
            </InfoList>
          </InfoSection>
        </form>
      )}
    </FormContainer>
  );
};

export default OptInForm;


