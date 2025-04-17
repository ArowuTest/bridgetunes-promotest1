import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import OptInService from '../services/OptInService';

// Styled Components
const FormCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  max-width: 32rem;
  margin: 0 auto;
  height: 100%;
`;

const FormTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.bridgetunesDark};
  text-align: center;
  margin-bottom: 1.5rem;
`;

const SuccessMessage = styled.div`
  background-color: #f0fff4;
  border: 1px solid #68d391;
  color: #2f855a;
  padding: 1rem;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
`;

const SuccessTitle = styled.p`
  font-weight: ${props => props.theme.fontWeights.bold};
  margin-bottom: 0.5rem;
`;

const SuccessText = styled.p`
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.div`
  background-color: #fff5f5;
  border: 1px solid #fc8181;
  color: #c53030;
  padding: 1rem;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.gray700};
  margin-bottom: 0.25rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.gray300};
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.mtnYellow};
    box-shadow: 0 0 0 3px rgba(255, 204, 0, 0.2);
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.gray400};
  }
`;

const HelpText = styled.p`
  font-size: 0.75rem;
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
  border: 1px solid ${props => props.theme.colors.gray300};
  border-radius: 0.25rem;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 204, 0, 0.2);
  }
`;

const CheckboxLabel = styled.label`
  margin-left: 0.5rem;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.gray700};
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: ${props => props.disabled ? props.theme.colors.gray400 : props.theme.colors.mtnYellow};
  color: ${props => props.theme.colors.mtnBlack};
  font-weight: ${props => props.theme.fontWeights.bold};
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  border: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.disabled ? props.theme.colors.gray400 : '#e6b800'};
    transform: ${props => props.disabled ? 'none' : 'translateY(-2px)'};
  }
`;

const AlternativeOptions = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.gray500};
`;

const OptionsList = styled.ul`
  margin-top: 0.5rem;
  list-style: none;
  padding: 0;
`;

const OptionItem = styled.li`
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
    <FormCard>
      <FormTitle>Join the Promotion</FormTitle>
      
      {success ? (
        <SuccessMessage>
          <SuccessTitle>Success!</SuccessTitle>
          <SuccessText>
            You have successfully opted in to the MyNumba Don Win promotion. 
            Start recharging your MTN line to qualify for draws!
          </SuccessText>
          <SubmitButton 
            onClick={() => setSuccess(false)}
          >
            Register Another Number
          </SubmitButton>
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
          
          <SubmitButton
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Opt-In to Win'}
          </SubmitButton>
          
          <AlternativeOptions>
            <p>You can also register by:</p>
            <OptionsList>
              <OptionItem>Sending "JOIN" to 5050</OptionItem>
              <OptionItem>Dialing *123*1# and selecting option 1</OptionItem>
              <OptionItem>Using the MyMTN app</OptionItem>
            </OptionsList>
          </AlternativeOptions>
        </form>
      )}
    </FormCard>
  );
};

export default OptInForm;

