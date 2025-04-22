import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styled, { keyframes } from 'styled-components';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideInRight = keyframes`
  from { transform: translateX(20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const slideInLeft = keyframes`
  from { transform: translateX(-20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled components
const HeaderContainer = styled.header`
  background-color: ${props => props.theme.colors.mtnBlack};
  color: ${props => props.theme.colors.white};
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: ${fadeIn} 0.8s ease-out;
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
  animation: ${slideInLeft} 0.6s ease-out;
`;

const BrandText = styled.span`
  font-size: 1.75rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.white};
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.mtnYellow};
  }
`;

const BrandHighlight = styled.span`
  color: ${props => props.theme.colors.mtnYellow};
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${props => props.theme.colors.mtnYellow};
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }
  
  ${LogoContainer}:hover & {
    &:after {
      transform: scaleX(1);
      transform-origin: left;
    }
  }
`;

const Divider = styled.div`
  height: 1.5rem;
  width: 1px;
  background-color: ${props => props.theme.colors.gray400};
  margin: 0 0.75rem;
  position: relative;
  overflow: hidden;
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, 
      transparent, 
      ${props => props.theme.colors.mtnYellow}, 
      transparent
    );
    transform: translateY(-100%);
    animation: shine 3s infinite;
  }
  
  @keyframes shine {
    0% { transform: translateY(-100%); }
    50% { transform: translateY(100%); }
    100% { transform: translateY(100%); }
  }
`;

const DesktopNav = styled.nav`
  display: none;
  animation: ${slideInRight} 0.6s ease-out;
  
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
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    width: 0;
    height: 2px;
    background-color: ${props => props.theme.colors.mtnYellow};
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }
  
  &:hover:after {
    width: 100%;
  }
`;

const NavLink = styled.a`
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.white};
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: all 0.5s ease;
  }
  
  &:hover {
    color: ${props => props.theme.colors.mtnYellow};
    transform: translateY(-2px);
    
    &:before {
      left: 100%;
    }
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
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.8s ease-out;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: scale(1.05);
  }
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: rotate(90deg);
  }
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const slideDown = keyframes`
  from { 
    opacity: 0;
    transform: translateY(-20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
`;

const MobileMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${props => props.theme.colors.mtnBlack};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  padding: 0.5rem 0;
  z-index: 40;
  animation: ${slideDown} 0.3s ease-out;
  transform-origin: top center;
  
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
  opacity: 0;
  animation: ${fadeIn} 0.5s forwards;
  animation-delay: ${props => props.index * 0.1}s;
`;

const MobileNavLink = styled.a`
  display: block;
  padding: 0.75rem 1.5rem;
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.white};
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: ${props => props.theme.colors.mtnYellow};
    padding-left: 2rem;
  }
`;

const AnimatedHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <HeaderContainer style={{
      boxShadow: scrolled ? '0 8px 20px rgba(0, 0, 0, 0.2)' : '0 4px 12px rgba(0, 0, 0, 0.15)',
      transition: 'box-shadow 0.3s ease'
    }}>
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
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
              />
            </svg>
          </MobileMenuButton>
        </FlexContainer>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <MobileMenu>
            <MobileNavList>
              <MobileNavItem index={0}>
                <Link href="/" passHref>
                  <MobileNavLink onClick={() => setMobileMenuOpen(false)}>Home</MobileNavLink>
                </Link>
              </MobileNavItem>
              <MobileNavItem index={1}>
                <Link href="/dashboard" passHref>
                  <MobileNavLink onClick={() => setMobileMenuOpen(false)}>Dashboard</MobileNavLink>
                </Link>
              </MobileNavItem>
              <MobileNavItem index={2}>
                <Link href="/opt-in" passHref>
                  <MobileNavLink onClick={() => setMobileMenuOpen(false)}>Opt-In</MobileNavLink>
                </Link>
              </MobileNavItem>
              <MobileNavItem index={3}>
                <Link href="/draw-management" passHref>
                  <MobileNavLink onClick={() => setMobileMenuOpen(false)}>Draw Management</MobileNavLink>
                </Link>
              </MobileNavItem>
              <MobileNavItem index={4}>
                <Link href="/admin" passHref>
                  <MobileNavLink onClick={() => setMobileMenuOpen(false)}>Admin Dashboard</MobileNavLink>
                </Link>
              </MobileNavItem>
              <MobileNavItem index={5}>
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

export default AnimatedHeader;
