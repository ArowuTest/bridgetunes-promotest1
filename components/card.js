// components/Card.js
import styled from 'styled-components';

const Card = styled.div`
  background: ${props => props.gradient ? props.theme.gradients[props.gradient] : props.theme.colors.white};
  color: ${props => props.gradient ? props.theme.colors.white : 'inherit'};
  border-radius: ${props => props.theme.radii.lg};
  box-shadow: ${props => props.theme.shadows.md};
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  transition: transform ${props => props.theme.transitions.default}, 
              box-shadow ${props => props.theme.transitions.default};
  
  &:hover {
    transform: ${props => props.interactive ? 'translateY(-5px)' : 'none'};
    box-shadow: ${props => props.interactive ? props.theme.shadows.lg : props.theme.shadows.md};
  }
`;

export default Card;
