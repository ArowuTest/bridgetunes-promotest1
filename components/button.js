// components/Button.js
import styled from 'styled-components';

const Button = styled.button`
  background: ${props => 
    props.variant === 'primary' ? props.theme.colors.bridgetunesBlue :
    props.variant === 'secondary' ? props.theme.colors.mtnYellow :
    props.variant === 'outline' ? 'transparent' :
    props.theme.colors.bridgetunesBlue
  };
  color: ${props => 
    props.variant === 'outline' ? props.theme.colors.bridgetunesBlue :
    props.variant === 'secondary' ? props.theme.colors.black :
    props.theme.colors.white
  };
  border: ${props => 
    props.variant === 'outline' ? `2px solid ${props.theme.colors.bridgetunesBlue}` : 'none'
  };
  padding: 0.75rem 1.5rem;
  border-radius: ${props => props.theme.radii.md};
  font-weight: ${props => props.theme.fontWeights.semibold};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.default};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background: ${props => 
      props.variant === 'primary' ? props.theme.colors.bridgetunesLightBlue :
      props.variant === 'secondary' ? '#ffdd33' :
      props.variant === 'outline' ? props.theme.colors.gray100 :
      props.theme.colors.bridgetunesLightBlue
    };
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export default Button;
