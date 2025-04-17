import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

// Styled components
const HeaderContainer = styled.header`
  background-color: ${props => props.theme.colors.bridgetunesDark}; // Darker background for better contrast
  color: ${props => props.theme.colors.white};
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: ${props => props.theme.shadows.md};
`;

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const BrandText = styled.span`
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.white};
`;

const BrandHighlight = styled.span`
  color: ${props => props.theme.colors.mtnYellow};
`;

const Divider = styled.div`
  height: 1.5rem;
  width: 1px;
  background-color: ${props => props.theme.colors.gray400};
  margin: 0 0.75rem;
`;

const DesktopNav = styled.nav`
  display: none;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    display: block;
  }
`;

const NavList = styled.ul`
  display: flex;
  space-x: 1rem;
`;

const NavItem = styled.li`
  margin: 0 0.5rem;
`;

const NavLink = styled.a`
  padding: 0.5rem 0.75rem;
  border-radius: ${props => props.theme.radii.md};
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.white}; // Ensure text is white
  transition: all ${props => props.theme.transitions.default};
  
  &:hover {
    color: ${props => props.theme.colors.mtnYellow};
    background-color: rgba(255, 255, 255, 0.1); // Add hover background
  }
`;

const MobileMenuButton = styled.button`
  display: block;
  color: ${props => props.theme.colors.white};
  background: none;
  border: none;
  cursor: pointer;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const MobileMenu = styled.div`
  margin-top: 1rem;
  background-color: ${props => props.theme.colors.bridgetunesDark}; // Match header background
  border-radius: ${props => props.theme.radii.lg};
  box-shadow: ${props => props.theme.shadows.lg};
  padding: 1rem;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const MobileNavList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const MobileNavItem = styled.li`
  margin: 0.5rem 0;
`;

const MobileNavLink = styled.a`
  display: block;
  padding: 0.5rem 0.75rem;
  border-radius: ${props => props.theme.radii.md};
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.white}; // Ensure text is white
  transition: all ${props => props.theme.transitions.default};
  
  &:hover {
    color: ${props => props.theme.colors.mtnYellow};
    background-color: rgba(255, 255, 255, 0.1); // Add hover background
  }
`;

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <HeaderContainer>
      <Container>
        <FlexContainer>
          <LogoContainer>
            <Link href="/" passHref legacyBehavior>
              <a>
                {/* Bridgetunes Logo */}
                <BrandText>Bridge<BrandHighlight>tunes</BrandHighlight></BrandText>
                {/* Divider */}
                <Divider />
                {/* MTN Logo */}
                <BrandText><BrandHighlight>MTN</BrandHighlight></BrandText>
              </a>
            </Link>
          </LogoContainer>
          
          {/* Desktop Navigation */}
          <DesktopNav>
            <NavList>
              <NavItem>
                <Link href="/" passHref legacyBehavior>
                  <NavLink>Home</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/opt-in" passHref legacyBehavior>
                  <NavLink>Opt-In</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/draw-management" passHref legacyBehavior>
                  <NavLink>Draw Management</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/admin" passHref legacyBehavior>
                  <NavLink>Admin Dashboard</NavLink>
                </Link>
              </NavItem>
            </NavList>
          </DesktopNav>
          
          {/* Mobile Menu Button */}
          <MobileMenuButton onClick={toggleMobileMenu}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </MobileMenuButton>
        </FlexContainer>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <MobileMenu>
            <MobileNavList>
              <MobileNavItem>
                <Link href="/" passHref legacyBehavior>
                  <MobileNavLink onClick={() => setMobileMenuOpen(false)}>Home</MobileNavLink>
                </Link>
              </MobileNavItem>
              <MobileNavItem>
                <Link href="/opt-in" passHref legacyBehavior>
                  <MobileNavLink onClick={() => setMobileMenuOpen(false)}>Opt-In</MobileNavLink>
                </Link>
              </MobileNavItem>
              <MobileNavItem>
                <Link href="/draw-management" passHref legacyBehavior>
                  <MobileNavLink onClick={() => setMobileMenuOpen(false)}>Draw Management</MobileNavLink>
                </Link>
              </MobileNavItem>
              <MobileNavItem>
                <Link href="/admin" passHref legacyBehavior>
                  <MobileNavLink onClick={() => setMobileMenuOpen(false)}>Admin Dashboard</MobileNavLink>
                </Link>
              </MobileNavItem>
            </MobileNavList>
          </MobileMenu>
        )}
      </Container>
    </HeaderContainer>
  );
};

export default Header;


