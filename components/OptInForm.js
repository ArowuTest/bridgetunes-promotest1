// components/OptInForm.js
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

// Additional styled components omitted for brevity...

const OptInForm = ({ onOptInSuccess }) => {
  // Component logic remains the same
  // ...
};

export default OptInForm;

