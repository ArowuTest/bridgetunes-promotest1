import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

// Styled components
const HeaderContainer = styled.header`
  background-color: ${props => props.theme.colors.mtnBlack};
  color: ${props => props.theme.colors.white};
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  font-size: 1.75rem;
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
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin: 0 0.5rem;
`;

const NavLink = styled.a`
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.white};
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${props => props.theme.colors.mtnYellow};
  }
`;

const MobileMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: ${props => props.theme.colors.white};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  border-radius: 4px;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const MobileMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${props => props.theme.colors.mtnBlack};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0;
  z-index: 40;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const MobileNavList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MobileNavItem = styled.li`
  margin: 0;
`;

const MobileNavLink = styled.a`
  display: block;
  padding: 0.75rem 1.5rem;
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.white};
  text-decoration: none;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: ${props => props.theme.colors.mtnYellow};
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
            <Link href="/" passHref>
              <a style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
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
                <Link href="/" passHref>
                  <NavLink>Home</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/dashboard" passHref>
                  <NavLink>Dashboard</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/opt-in" passHref>
                  <NavLink>Opt-In</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/draw-management" passHref>
                  <NavLink>Draw Management</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/admin" passHref>
                  <NavLink>Admin Dashboard</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/admin/notifications" passHref>
                  <NavLink>Notification Management</NavLink>
                </Link>
              </NavItem>
            </NavList>
          </DesktopNav>
          
          {/* Mobile Menu Button */}
          <MobileMenuButton onClick={toggleMobileMenu} aria-label="Toggle menu">
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
                <Link href="/" passHref>
                  <MobileNavLink onClick={() => setMobileMenuOpen(false)}>Home</MobileNavLink>
                </Link>
              </MobileNavItem>
              <MobileNavItem>
                <Link href="/dashboard" passHref>
                  <MobileNavLink onClick={() => setMobileMenuOpen(false)}>Dashboard</MobileNavLink>
                </Link>
              </MobileNavItem>
              <MobileNavItem>
                <Link href="/opt-in" passHref>
                  <MobileNavLink onClick={() => setMobileMenuOpen(false)}>Opt-In</MobileNavLink>
                </Link>
              </MobileNavItem>
              <MobileNavItem>
                <Link href="/draw-management" passHref>
                  <MobileNavLink onClick={() => setMobileMenuOpen(false)}>Draw Management</MobileNavLink>
                </Link>
              </MobileNavItem>
              <MobileNavItem>
                <Link href="/admin" passHref>
                  <MobileNavLink onClick={() => setMobileMenuOpen(false)}>Admin Dashboard</MobileNavLink>
                </Link>
              </MobileNavItem>
              <MobileNavItem>
                <Link href="/admin/notifications" passHref>
                  <MobileNavLink onClick={() => setMobileMenuOpen(false)}>Notification Management</MobileNavLink>
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
