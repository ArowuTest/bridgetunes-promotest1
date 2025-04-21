import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

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

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.bridgetunesDark};
  margin: 0;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 2.5rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const TabsContainer = styled.div`
  margin-bottom: 2rem;
  border-bottom: 1px solid ${props => props.theme.colors.gray200};
`;

const TabNav = styled.nav`
  display: flex;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TabButton = styled.button`
  padding: 1rem 1.25rem;
  white-space: nowrap;
  font-size: 0.875rem;
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.active ? props.theme.colors.bridgetunesDark : props.theme.colors.gray500};
  background: transparent;
  border: none;
  border-bottom: 2px solid ${props => props.active ? props.theme.colors.mtnYellow : 'transparent'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    color: ${props => props.active ? props.theme.colors.bridgetunesDark : props.theme.colors.gray700};
    border-bottom-color: ${props => props.active ? props.theme.colors.mtnYellow : props.theme.colors.gray300};
  }
`;

const Card = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.bridgetunesDark};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.gray700};
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.theme.colors.gray300};
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.bridgetunesBlue};
    box-shadow: 0 0 0 3px rgba(0, 86, 179, 0.15);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.theme.colors.gray300};
  border-radius: 0.375rem;
  font-size: 1rem;
  background-color: white;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.bridgetunesBlue};
    box-shadow: 0 0 0 3px rgba(0, 86, 179, 0.15);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.theme.colors.gray300};
  border-radius: 0.375rem;
  font-size: 1rem;
  min-height: 120px;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.bridgetunesBlue};
    box-shadow: 0 0 0 3px rgba(0, 86, 179, 0.15);
  }
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background-color: ${props => props.variant === 'primary' ? props.theme.colors.bridgetunesBlue : 'white'};
  color: ${props => props.variant === 'primary' ? 'white' : props.theme.colors.gray700};
  border: 1px solid ${props => props.variant === 'primary' ? 'transparent' : props.theme.colors.gray300};
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: ${props => props.theme.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.variant === 'primary' ? props.theme.colors.bridgetunesLightBlue : props.theme.colors.gray100};
  }
  
  svg {
    margin-right: 0.5rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: ${props => props.columns || '1fr 1fr'};
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: ${props => props.theme.colors.gray50};
`;

const TableHeadCell = styled.th`
  padding: 0.75rem 1rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.gray500};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid ${props => props.theme.colors.gray200};
`;

const TableBody = styled.tbody`
  background-color: white;
`;

const TableRow = styled.tr`
  &:hover {
    background-color: ${props => props.theme.colors.gray50};
  }
`;

const TableCell = styled.td`
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.gray700};
  border-bottom: 1px solid ${props => props.theme.colors.gray200};
`;

const Badge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: ${props => props.theme.fontWeights.medium};
  background-color: ${props => {
    switch (props.variant) {
      case 'success': return '#d1fae5';
      case 'warning': return '#fef3c7';
      case 'error': return '#fee2e2';
      case 'info': return '#dbeafe';
      default: return '#f3f4f6';
    }
  }};
  color: ${props => {
    switch (props.variant) {
      case 'success': return '#065f46';
      case 'warning': return '#92400e';
      case 'error': return '#991b1b';
      case 'info': return '#1e40af';
      default: return '#1f2937';
    }
  }};
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

const FilterItem = styled.div`
  display: flex;
  align-items: center;
`;

const FilterLabel = styled.span`
  font-size: 0.875rem;
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.gray700};
  margin-right: 0.5rem;
`;

const FilterSelect = styled.select`
  padding: 0.375rem 0.75rem;
  border: 1px solid ${props => props.theme.colors.gray300};
  border-radius: 0.375rem;
  font-size: 0.875rem;
  background-color: white;
`;

const SearchInput = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.theme.colors.gray300};
  border-radius: 0.375rem;
  font-size: 0.875rem;
  width: 100%;
  max-width: 300px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.bridgetunesBlue};
    box-shadow: 0 0 0 3px rgba(0, 86, 179, 0.15);
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
`;

const PaginationButton = styled.button`
  padding: 0.5rem 1rem;
  margin: 0 0.25rem;
  background-color: ${props => props.active ? '#0056b3' : 'white'};
  color: ${props => props.active ? 'white' : '#333333'};
  border: 1px solid ${props => props.active ? '#0056b3' : '#dee2e6'};
  border-radius: 0.25rem;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  
  &:hover:not(:disabled) {
    background-color: ${props => props.active ? '#0056b3' : '#dee2e6'};
  }
`;

const SegmentCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  border: 1px solid ${props => props.theme.colors.gray200};
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

const SegmentTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.bridgetunesDark};
  margin-bottom: 0.5rem;
`;

const SegmentDescription = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.gray600};
  margin-bottom: 1rem;
`;

const SegmentStats = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const SegmentStat = styled.div`
  flex: 1;
`;

const SegmentStatLabel = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.gray500};
  margin-bottom: 0.25rem;
`;

const SegmentStatValue = styled.div`
  font-size: 1.125rem;
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.bridgetunesDark};
`;

const SegmentActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const TemplateCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  border: 1px solid ${props => props.theme.colors.gray200};
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

const TemplateTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.bridgetunesDark};
  margin-bottom: 0.5rem;
`;

const TemplatePreview = styled.div`
  background-color: ${props => props.theme.colors.gray50};
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 1rem 0;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.gray700};
`;

const TemplateActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const CampaignCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  border: 1px solid ${props => props.theme.colors.gray200};
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

const CampaignTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.bridgetunesDark};
  margin-bottom: 0.5rem;
`;

const CampaignDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1rem 0;
`;

const CampaignDetail = styled.div`
  flex: 1;
  min-width: 120px;
`;

const CampaignDetailLabel = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.gray500};
  margin-bottom: 0.25rem;
`;

const CampaignDetailValue = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.gray700};
`;

const CampaignActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 0.5rem;
  background-color: ${props => props.theme.colors.gray200};
  border-radius: 9999px;
  overflow: hidden;
  margin-top: 0.5rem;
`;

const ProgressFill = styled.div`
  height: 100%;
  background-color: ${props => {
    if (props.value >= 80) return '#10b981';
    if (props.value >= 40) return '#f59e0b';
    return '#ef4444';
  }};
  width: ${props => `${props.value}%`};
  transition: width 0.3s ease;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  padding: 2rem;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.bridgetunesDark};
  margin: 0;
`;

const ModalCloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${props => props.theme.colors.gray500};
  
  &:hover {
    color: ${props => props.theme.colors.gray700};
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const ButtonContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

// Mock data for user segments
const mockSegments = [
  {
    id: 1,
    name: 'High Value Users',
    description: 'Users with total recharge amount over ₦5,000',
    userCount: 2345,
    criteria: {
      totalRecharge: { min: 5000 },
      optInStatus: true
    },
    createdAt: '2025-04-10'
  },
  {
    id: 2,
    name: 'Recent Opt-ins',
    description: 'Users who opted in within the last 7 days',
    userCount: 876,
    criteria: {
      optInDate: { from: '2025-04-08' },
      optInStatus: true
    },
    createdAt: '2025-04-12'
  },
  {
    id: 3,
    name: 'Inactive Users',
    description: 'Users with no recharge in the last 14 days',
    userCount: 1543,
    criteria: {
      lastRecharge: { before: '2025-04-01' },
      optInStatus: true
    },
    createdAt: '2025-04-14'
  },
  {
    id: 4,
    name: 'Weekend Rechargers',
    description: 'Users who typically recharge on weekends',
    userCount: 3210,
    criteria: {
      rechargePattern: 'weekend',
      optInStatus: true
    },
    createdAt: '2025-04-15'
  }
];

// Mock data for notification templates
const mockTemplates = [
  {
    id: 1,
    name: 'Recharge Confirmation',
    type: 'sms',
    content: 'Thank you for recharging ₦{{amount}}. You have earned {{points}} points for the MyNumba Don Win promotion!',
    variables: ['amount', 'points'],
    createdAt: '2025-04-05'
  },
  {
    id: 2,
    name: 'Draw Announcement',
    type: 'sms',
    content: 'The MyNumba Don Win draw will take place today at 8:00 PM. Make sure you have recharged to be eligible!',
    variables: [],
    createdAt: '2025-04-08'
  },
  {
    id: 3,
    name: 'Win Notification',
    type: 'sms',
    content: 'Congratulations! You have won {{prize}} in the MyNumba Don Win promotion. Your prize will be processed within 48 hours.',
    variables: ['prize'],
    createdAt: '2025-04-10'
  },
  {
    id: 4,
    name: 'Opt-in Confirmation',
    type: 'sms',
    content: 'Welcome to MyNumba Don Win! You have successfully opted in. Recharge now to start earning points!',
    variables: [],
    createdAt: '2025-04-12'
  }
];

// Mock data for notification campaigns
const mockCampaigns = [
  {
    id: 1,
    name: 'Weekend Draw Reminder',
    segmentId: 4,
    templateId: 2,
    status: 'scheduled',
    scheduledDate: '2025-04-20T10:00:00',
    recurrence: 'weekly',
    createdAt: '2025-04-15'
  },
  {
    id: 2,
    name: 'Inactive User Re-engagement',
    segmentId: 3,
    templateId: 4,
    status: 'active',
    scheduledDate: '2025-04-16T09:00:00',
    recurrence: 'once',
    progress: 65,
    createdAt: '2025-04-15'
  },
  {
    id: 3,
    name: 'New Opt-in Welcome',
    segmentId: 2,
    templateId: 4,
    status: 'completed',
    scheduledDate: '2025-04-14T12:00:00',
    recurrence: 'daily',
    progress: 100,
    createdAt: '2025-04-13'
  }
];

// Mock data for notification logs
const mockNotificationLogs = [
  {
    id: 1,
    campaignId: 3,
    msisdn: '08012345678',
    status: 'delivered',
    sentAt: '2025-04-14T12:05:23',
    deliveredAt: '2025-04-14T12:05:25'
  },
  {
    id: 2,
    campaignId: 3,
    msisdn: '08023456789',
    status: 'delivered',
    sentAt: '2025-04-14T12:05:24',
    deliveredAt: '2025-04-14T12:05:26'
  },
  {
    id: 3,
    campaignId: 3,
    msisdn: '08034567890',
    status: 'failed',
    sentAt: '2025-04-14T12:05:25',
    error: 'Invalid number'
  },
  {
    id: 4,
    campaignId: 2,
    msisdn: '08045678901',
    status: 'delivered',
    sentAt: '2025-04-16T09:05:10',
    deliveredAt: '2025-04-16T09:05:12'
  },
  {
    id: 5,
    campaignId: 2,
    msisdn: '08056789012',
    status: 'pending',
    sentAt: '2025-04-16T09:05:11'
  }
];

const NotificationManagement = () => {
  const [activeTab, setActiveTab] = useState('segments');
  const [segments, setSegments] = useState(mockSegments);
  const [templates, setTemplates] = useState(mockTemplates);
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [logs, setLogs] = useState(mockNotificationLogs);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  
  // Form states
  const [segmentForm, setSegmentForm] = useState({
    name: '',
    description: '',
    criteria: {
      totalRecharge: { min: '', max: '' },
      lastRecharge: { before: '', after: '' },
      optInDate: { from: '', to: '' },
      optInStatus: true,
      rechargePattern: ''
    }
  });
  
  const [templateForm, setTemplateForm] = useState({
    name: '',
    type: 'sms',
    content: '',
    variables: []
  });
  
  const [campaignForm, setCampaignForm] = useState({
    name: '',
    segmentId: '',
    templateId: '',
    scheduledDate: '',
    scheduledTime: '',
    recurrence: 'once'
  });
  
  // Filter states
  const [segmentFilter, setSegmentFilter] = useState('');
  const [templateFilter, setTemplateFilter] = useState('');
  const [campaignFilter, setCampaignFilter] = useState('all');
  const [logFilter, setLogFilter] = useState('all');
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Handle modal open
  const handleOpenModal = (type, item = null) => {
    setModalType(type);
    setSelectedItem(item);
    
    // Initialize form based on modal type
    if (type === 'createSegment') {
      setSegmentForm({
        name: '',
        description: '',
        criteria: {
          totalRecharge: { min: '', max: '' },
          lastRecharge: { before: '', after: '' },
          optInDate: { from: '', to: '' },
          optInStatus: true,
          rechargePattern: ''
        }
      });
    } else if (type === 'editSegment' && item) {
      setSegmentForm({
        name: item.name,
        description: item.description,
        criteria: item.criteria
      });
    } else if (type === 'createTemplate') {
      setTemplateForm({
        name: '',
        type: 'sms',
        content: '',
        variables: []
      });
    } else if (type === 'editTemplate' && item) {
      setTemplateForm({
        name: item.name,
        type: item.type,
        content: item.content,
        variables: item.variables
      });
    } else if (type === 'createCampaign') {
      setCampaignForm({
        name: '',
        segmentId: segments.length > 0 ? segments[0].id : '',
        templateId: templates.length > 0 ? templates[0].id : '',
        scheduledDate: '',
        scheduledTime: '',
        recurrence: 'once'
      });
    } else if (type === 'editCampaign' && item) {
      const scheduledDateTime = new Date(item.scheduledDate);
      setCampaignForm({
        name: item.name,
        segmentId: item.segmentId,
        templateId: item.templateId,
        scheduledDate: scheduledDateTime.toISOString().split('T')[0],
        scheduledTime: scheduledDateTime.toTimeString().split(' ')[0].substring(0, 5),
        recurrence: item.recurrence
      });
    }
    
    setShowModal(true);
  };
  
  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
    setModalType('');
    setSelectedItem(null);
  };
  
  // Handle segment form submission
  const handleSegmentSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (modalType === 'createSegment') {
        const newSegment = {
          id: segments.length + 1,
          name: segmentForm.name,
          description: segmentForm.description,
          userCount: Math.floor(Math.random() * 5000) + 500,
          criteria: segmentForm.criteria,
          createdAt: new Date().toISOString().split('T')[0]
        };
        setSegments([...segments, newSegment]);
      } else if (modalType === 'editSegment' && selectedItem) {
        const updatedSegments = segments.map(segment => {
          if (segment.id === selectedItem.id) {
            return {
              ...segment,
              name: segmentForm.name,
              description: segmentForm.description,
              criteria: segmentForm.criteria
            };
          }
          return segment;
        });
        setSegments(updatedSegments);
      }
      
      setIsLoading(false);
      handleCloseModal();
    }, 1000);
  };
  
  // Handle template form submission
  const handleTemplateSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Extract variables from content (text between {{ and }})
    const variableRegex = /{{(.*?)}}/g;
    const matches = templateForm.content.match(variableRegex) || [];
    const variables = matches.map(match => match.replace(/{{|}}/g, '').trim());
    
    // Simulate API call
    setTimeout(() => {
      if (modalType === 'createTemplate') {
        const newTemplate = {
          id: templates.length + 1,
          name: templateForm.name,
          type: templateForm.type,
          content: templateForm.content,
          variables: [...new Set(variables)],
          createdAt: new Date().toISOString().split('T')[0]
        };
        setTemplates([...templates, newTemplate]);
      } else if (modalType === 'editTemplate' && selectedItem) {
        const updatedTemplates = templates.map(template => {
          if (template.id === selectedItem.id) {
            return {
              ...template,
              name: templateForm.name,
              type: templateForm.type,
              content: templateForm.content,
              variables: [...new Set(variables)]
            };
          }
          return template;
        });
        setTemplates(updatedTemplates);
      }
      
      setIsLoading(false);
      handleCloseModal();
    }, 1000);
  };
  
  // Handle campaign form submission
  const handleCampaignSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Combine date and time
    const scheduledDateTime = `${campaignForm.scheduledDate}T${campaignForm.scheduledTime}:00`;
    
    // Simulate API call
    setTimeout(() => {
      if (modalType === 'createCampaign') {
        const newCampaign = {
          id: campaigns.length + 1,
          name: campaignForm.name,
          segmentId: parseInt(campaignForm.segmentId),
          templateId: parseInt(campaignForm.templateId),
          status: 'scheduled',
          scheduledDate: scheduledDateTime,
          recurrence: campaignForm.recurrence,
          createdAt: new Date().toISOString().split('T')[0]
        };
        setCampaigns([...campaigns, newCampaign]);
      } else if (modalType === 'editCampaign' && selectedItem) {
        const updatedCampaigns = campaigns.map(campaign => {
          if (campaign.id === selectedItem.id) {
            return {
              ...campaign,
              name: campaignForm.name,
              segmentId: parseInt(campaignForm.segmentId),
              templateId: parseInt(campaignForm.templateId),
              scheduledDate: scheduledDateTime,
              recurrence: campaignForm.recurrence
            };
          }
          return campaign;
        });
        setCampaigns(updatedCampaigns);
      }
      
      setIsLoading(false);
      handleCloseModal();
    }, 1000);
  };
  
  // Handle campaign status change
  const handleCampaignStatusChange = (campaignId, newStatus) => {
    const updatedCampaigns = campaigns.map(campaign => {
      if (campaign.id === campaignId) {
        return {
          ...campaign,
          status: newStatus
        };
      }
      return campaign;
    });
    setCampaigns(updatedCampaigns);
  };
  
  // Filter segments based on search term
  const filteredSegments = segments.filter(segment => 
    segment.name.toLowerCase().includes(segmentFilter.toLowerCase()) ||
    segment.description.toLowerCase().includes(segmentFilter.toLowerCase())
  );
  
  // Filter templates based on search term
  const filteredTemplates = templates.filter(template => 
    template.name.toLowerCase().includes(templateFilter.toLowerCase()) ||
    template.content.toLowerCase().includes(templateFilter.toLowerCase())
  );
  
  // Filter campaigns based on status
  const filteredCampaigns = campaigns.filter(campaign => 
    campaignFilter === 'all' || campaign.status === campaignFilter
  );
  
  // Filter logs based on status
  const filteredLogs = logs.filter(log => 
    logFilter === 'all' || log.status === logFilter
  );
  
  // Get segment name by ID
  const getSegmentName = (segmentId) => {
    const segment = segments.find(s => s.id === segmentId);
    return segment ? segment.name : 'Unknown Segment';
  };
  
  // Get template name by ID
  const getTemplateName = (templateId) => {
    const template = templates.find(t => t.id === templateId);
    return template ? template.name : 'Unknown Template';
  };
  
  // Get campaign name by ID
  const getCampaignName = (campaignId) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    return campaign ? campaign.name : 'Unknown Campaign';
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Format date and time
  const formatDateTime = (dateTimeString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateTimeString).toLocaleString('en-US', options);
  };
  
  return (
    <PageContainer>
      <Head>
        <title>Notification Management | MyNumba Don Win</title>
        <meta name="description" content="Manage notifications for MyNumba Don Win promotion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <MainContent>
        <PageHeader>
          <PageTitle>Notification Management</PageTitle>
          <ButtonGroup>
            {activeTab === 'segments' && (
              <Button 
                variant="primary"
                onClick={() => handleOpenModal('createSegment')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Create Segment
              </Button>
            ) }
            {activeTab === 'templates' && (
              <Button 
                variant="primary"
                onClick={() => handleOpenModal('createTemplate')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Create Template
              </Button>
            ) }
            {activeTab === 'campaigns' && (
              <Button 
                variant="primary"
                onClick={() => handleOpenModal('createCampaign')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Create Campaign
              </Button>
            ) }
          </ButtonGroup>
        </PageHeader>

        {/* Tabs */}
        <TabsContainer>
          <TabNav>
            <TabButton 
              active={activeTab === 'segments'} 
              onClick={() => setActiveTab('segments')}
            >
              User Segments
            </TabButton>
            <TabButton 
              active={activeTab === 'templates'} 
              onClick={() => setActiveTab('templates')}
            >
              Notification Templates
            </TabButton>
            <TabButton 
              active={activeTab === 'campaigns'} 
              onClick={() => setActiveTab('campaigns')}
            >
              Campaigns
            </TabButton>
            <TabButton 
              active={activeTab === 'logs'} 
              onClick={() => setActiveTab('logs')}
            >
              Notification Logs
            </TabButton>
            <TabButton 
              active={activeTab === 'settings'} 
              onClick={() => setActiveTab('settings')}
            >
              API Settings
            </TabButton>
          </TabNav>
        </TabsContainer>

        {/* User Segments Tab */}
        {activeTab === 'segments' && (
          <Card>
            <CardTitle>
              User Segments
              <SearchInput 
                type="text" 
                placeholder="Search segments..." 
                value={segmentFilter}
                onChange={(e) => setSegmentFilter(e.target.value)}
              />
            </CardTitle>
            
            <Grid columns="1fr 1fr">
              {filteredSegments.map(segment => (
                <SegmentCard key={segment.id}>
                  <SegmentTitle>{segment.name}</SegmentTitle>
                  <SegmentDescription>{segment.description}</SegmentDescription>
                  
                  <SegmentStats>
                    <SegmentStat>
                      <SegmentStatLabel>Users</SegmentStatLabel>
                      <SegmentStatValue>{segment.userCount.toLocaleString()}</SegmentStatValue>
                    </SegmentStat>
                    <SegmentStat>
                      <SegmentStatLabel>Created</SegmentStatLabel>
                      <SegmentStatValue>{formatDate(segment.createdAt)}</SegmentStatValue>
                    </SegmentStat>
                  </SegmentStats>
                  
                  <SegmentActions>
                    <Button onClick={() => handleOpenModal('editSegment', segment)}>
                      Edit
                    </Button>
                    <Button variant="primary" onClick={() => handleOpenModal('createCampaign', { segmentId: segment.id })}>
                      Create Campaign
                    </Button>
                  </SegmentActions>
                </SegmentCard>
              ))}
            </Grid>
            
            {filteredSegments.length === 0 && (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <p>No segments found. Create a new segment to get started.</p>
              </div>
            )}
          </Card>
        )}

        {/* Notification Templates Tab */}
        {activeTab === 'templates' && (
          <Card>
            <CardTitle>
              Notification Templates
              <SearchInput 
                type="text" 
                placeholder="Search templates..." 
                value={templateFilter}
                onChange={(e) => setTemplateFilter(e.target.value)}
              />
            </CardTitle>
            
            <Grid columns="1fr 1fr">
              {filteredTemplates.map(template => (
                <TemplateCard key={template.id}>
                  <TemplateTitle>{template.name}</TemplateTitle>
                  <Badge variant="info">{template.type.toUpperCase()}</Badge>
                  
                  <TemplatePreview>
                    {template.content}
                  </TemplatePreview>
                  
                  <div>
                    <strong>Variables: </strong>
                    {template.variables.length > 0 
                      ? template.variables.map(v => `{{${v}}}`).join(', ')
                      : 'None'
                    }
                  </div>
                  
                  <TemplateActions>
                    <Button onClick={() => handleOpenModal('editTemplate', template)}>
                      Edit
                    </Button>
                    <Button variant="primary" onClick={() => handleOpenModal('createCampaign', { templateId: template.id })}>
                      Use Template
                    </Button>
                  </TemplateActions>
                </TemplateCard>
              ))}
            </Grid>
            
            {filteredTemplates.length === 0 && (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <p>No templates found. Create a new template to get started.</p>
              </div>
            )}
          </Card>
        )}

        {/* Campaigns Tab */}
        {activeTab === 'campaigns' && (
          <Card>
            <CardTitle>
              Notification Campaigns
              <FilterContainer>
                <FilterItem>
                  <FilterLabel>Status:</FilterLabel>
                  <FilterSelect 
                    value={campaignFilter}
                    onChange={(e) => setCampaignFilter(e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="paused">Paused</option>
                  </FilterSelect>
                </FilterItem>
              </FilterContainer>
            </CardTitle>
            
            <Grid columns="1fr">
              {filteredCampaigns.map(campaign => (
                <CampaignCard key={campaign.id}>
                  <CampaignTitle>{campaign.name}</CampaignTitle>
                  
                  <Badge 
                    variant={
                      campaign.status === 'completed' ? 'success' :
                      campaign.status === 'active' ? 'info' :
                      campaign.status === 'paused' ? 'warning' :
                      'default'
                    }
                  >
                    {campaign.status.toUpperCase()}
                  </Badge>
                  
                  <CampaignDetails>
                    <CampaignDetail>
                      <CampaignDetailLabel>Segment</CampaignDetailLabel>
                      <CampaignDetailValue>{getSegmentName(campaign.segmentId)}</CampaignDetailValue>
                    </CampaignDetail>
                    <CampaignDetail>
                      <CampaignDetailLabel>Template</CampaignDetailLabel>
                      <CampaignDetailValue>{getTemplateName(campaign.templateId)}</CampaignDetailValue>
                    </CampaignDetail>
                    <CampaignDetail>
                      <CampaignDetailLabel>Scheduled</CampaignDetailLabel>
                      <CampaignDetailValue>{formatDateTime(campaign.scheduledDate)}</CampaignDetailValue>
                    </CampaignDetail>
                    <CampaignDetail>
                      <CampaignDetailLabel>Recurrence</CampaignDetailLabel>
                      <CampaignDetailValue>{campaign.recurrence}</CampaignDetailValue>
                    </CampaignDetail>
                  </CampaignDetails>
                  
                  {campaign.status === 'active' && campaign.progress !== undefined && (
                    <>
                      <CampaignDetailLabel>Progress: {campaign.progress}%</CampaignDetailLabel>
                      <ProgressBar>
                        <ProgressFill value={campaign.progress} />
                      </ProgressBar>
                    </>
                  )}
                  
                  <CampaignActions>
                    <Button onClick={() => handleOpenModal('editCampaign', campaign)}>
                      Edit
                    </Button>
                    
                    {campaign.status === 'scheduled' && (
                      <Button variant="primary" onClick={() => handleCampaignStatusChange(campaign.id, 'active')}>
                        Start
                      </Button>
                    )}
                    
                    {campaign.status === 'active' && (
                      <Button onClick={() => handleCampaignStatusChange(campaign.id, 'paused')}>
                        Pause
                      </Button>
                    )}
                    
                    {campaign.status === 'paused' && (
                      <Button variant="primary" onClick={() => handleCampaignStatusChange(campaign.id, 'active')}>
                        Resume
                      </Button>
                    )}
                  </CampaignActions>
                </CampaignCard>
              ))}
            </Grid>
            
            {filteredCampaigns.length === 0 && (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <p>No campaigns found. Create a new campaign to get started.</p>
              </div>
            )}
          </Card>
        )}

        {/* Notification Logs Tab */}
        {activeTab === 'logs' && (
          <Card>
            <CardTitle>
              Notification Logs
              <FilterContainer>
                <FilterItem>
                  <FilterLabel>Status:</FilterLabel>
                  <FilterSelect 
                    value={logFilter}
                    onChange={(e) => setLogFilter(e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="delivered">Delivered</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                  </FilterSelect>
                </FilterItem>
              </FilterContainer>
            </CardTitle>
            
            <Table>
              <TableHead>
                <tr>
                  <TableHeadCell>ID</TableHeadCell>
                  <TableHeadCell>Campaign</TableHeadCell>
                  <TableHeadCell>MSISDN</TableHeadCell>
                  <TableHeadCell>Status</TableHeadCell>
                  <TableHeadCell>Sent At</TableHeadCell>
                  <TableHeadCell>Delivered At</TableHeadCell>
                </tr>
              </TableHead>
              <TableBody>
                {filteredLogs.map(log => (
                  <TableRow key={log.id}>
                    <TableCell>{log.id}</TableCell>
                    <TableCell>{getCampaignName(log.campaignId)}</TableCell>
                    <TableCell>{log.msisdn}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          log.status === 'delivered' ? 'success' :
                          log.status === 'pending' ? 'warning' :
                          'error'
                        }
                      >
                        {log.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDateTime(log.sentAt)}</TableCell>
                    <TableCell>
                      {log.deliveredAt ? formatDateTime(log.deliveredAt) : '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {filteredLogs.length === 0 && (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <p>No notification logs found.</p>
              </div>
            )}
          </Card>
        )}

        {/* API Settings Tab */}
        {activeTab === 'settings' && (
          <Card>
            <CardTitle>API Settings</CardTitle>
            
            <FormGroup>
              <Label>MTN API Endpoint</Label>
              <Input 
                type="text" 
                placeholder="https://api.mtn.com/notifications/v1" 
                defaultValue="https://api.mtn.com/notifications/v1"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>API Key</Label>
              <Input 
                type="password" 
                placeholder="Enter API key" 
                defaultValue="••••••••••••••••"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>API Secret</Label>
              <Input 
                type="password" 
                placeholder="Enter API secret" 
                defaultValue="••••••••••••••••"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Webhook URL</Label>
              <Input 
                type="text" 
                placeholder="https://yourwebsite.com/api/mtn-webhook" 
                defaultValue="https://bridgetunes.com/api/mtn-webhook"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Retry Settings</Label>
              <Grid>
                <div>
                  <Label>Max Retries</Label>
                  <Input 
                    type="number" 
                    min="0" 
                    max="10" 
                    defaultValue="3"
                  />
                </div>
                <div>
                  <Label>Retry Delay (seconds) </Label>
                  <Input 
                    type="number" 
                    min="1" 
                    max="300" 
                    defaultValue="60"
                  />
                </div>
              </Grid>
            </FormGroup>
            
            <ButtonContainer>
              <Button variant="primary">
                Save Settings
              </Button>
              <Button>
                Test Connection
              </Button>
            </ButtonContainer>
          </Card>
        )}

        {/* Modals */}
        {showModal && (
          <ModalBackdrop>
            <ModalContent>
              {/* Create/Edit Segment Modal */}
              {(modalType === 'createSegment' || modalType === 'editSegment') && (
                <>
                  <ModalHeader>
                    <ModalTitle>
                      {modalType === 'createSegment' ? 'Create Segment' : 'Edit Segment'}
                    </ModalTitle>
                    <ModalCloseButton onClick={handleCloseModal}>&times;</ModalCloseButton>
                  </ModalHeader>
                  
                  <form onSubmit={handleSegmentSubmit}>
                    <FormGroup>
                      <Label>Segment Name</Label>
                      <Input 
                        type="text" 
                        placeholder="Enter segment name" 
                        value={segmentForm.name}
                        onChange={(e) => setSegmentForm({...segmentForm, name: e.target.value})}
                        required
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <Label>Description</Label>
                      <Textarea 
                        placeholder="Enter segment description" 
                        value={segmentForm.description}
                        onChange={(e) => setSegmentForm({...segmentForm, description: e.target.value})}
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <Label>Segment Criteria</Label>
                      
                      <Grid>
                        <div>
                          <Label>Total Recharge Amount</Label>
                          <Grid>
                            <Input 
                              type="number" 
                              placeholder="Min" 
                              value={segmentForm.criteria.totalRecharge.min}
                              onChange={(e) => setSegmentForm({
                                ...segmentForm, 
                                criteria: {
                                  ...segmentForm.criteria,
                                  totalRecharge: {
                                    ...segmentForm.criteria.totalRecharge,
                                    min: e.target.value
                                  }
                                }
                              })}
                            />
                            <Input 
                              type="number" 
                              placeholder="Max" 
                              value={segmentForm.criteria.totalRecharge.max}
                              onChange={(e) => setSegmentForm({
                                ...segmentForm, 
                                criteria: {
                                  ...segmentForm.criteria,
                                  totalRecharge: {
                                    ...segmentForm.criteria.totalRecharge,
                                    max: e.target.value
                                  }
                                }
                              })}
                            />
                          </Grid>
                        </div>
                        
                        <div>
                          <Label>Last Recharge Date</Label>
                          <Grid>
                            <div>
                              <Label>Before</Label>
                              <Input 
                                type="date" 
                                value={segmentForm.criteria.lastRecharge.before}
                                onChange={(e) => setSegmentForm({
                                  ...segmentForm, 
                                  criteria: {
                                    ...segmentForm.criteria,
                                    lastRecharge: {
                                      ...segmentForm.criteria.lastRecharge,
                                      before: e.target.value
                                    }
                                  }
                                })}
                              />
                            </div>
                            <div>
                              <Label>After</Label>
                              <Input 
                                type="date" 
                                value={segmentForm.criteria.lastRecharge.after}
                                onChange={(e) => setSegmentForm({
                                  ...segmentForm, 
                                  criteria: {
                                    ...segmentForm.criteria,
                                    lastRecharge: {
                                      ...segmentForm.criteria.lastRecharge,
                                      after: e.target.value
                                    }
                                  }
                                })}
                              />
                            </div>
                          </Grid>
                        </div>
                      </Grid>
                      
                      <Grid>
                        <div>
                          <Label>Opt-in Date</Label>
                          <Grid>
                            <div>
                              <Label>From</Label>
                              <Input 
                                type="date" 
                                value={segmentForm.criteria.optInDate.from}
                                onChange={(e) => setSegmentForm({
                                  ...segmentForm, 
                                  criteria: {
                                    ...segmentForm.criteria,
                                    optInDate: {
                                      ...segmentForm.criteria.optInDate,
                                      from: e.target.value
                                    }
                                  }
                                })}
                              />
                            </div>
                            <div>
                              <Label>To</Label>
                              <Input 
                                type="date" 
                                value={segmentForm.criteria.optInDate.to}
                                onChange={(e) => setSegmentForm({
                                  ...segmentForm, 
                                  criteria: {
                                    ...segmentForm.criteria,
                                    optInDate: {
                                      ...segmentForm.criteria.optInDate,
                                      to: e.target.value
                                    }
                                  }
                                })}
                              />
                            </div>
                          </Grid>
                        </div>
                        
                        <div>
                          <Label>Other Criteria</Label>
                          <Grid>
                            <div>
                              <Label>Opt-in Status</Label>
                              <Select 
                                value={segmentForm.criteria.optInStatus}
                                onChange={(e) => setSegmentForm({
                                  ...segmentForm, 
                                  criteria: {
                                    ...segmentForm.criteria,
                                    optInStatus: e.target.value === 'true'
                                  }
                                })}
                              >
                                <option value="true">Opted In</option>
                                <option value="false">Not Opted In</option>
                              </Select>
                            </div>
                            <div>
                              <Label>Recharge Pattern</Label>
                              <Select 
                                value={segmentForm.criteria.rechargePattern}
                                onChange={(e) => setSegmentForm({
                                  ...segmentForm, 
                                  criteria: {
                                    ...segmentForm.criteria,
                                    rechargePattern: e.target.value
                                  }
                                })}
                              >
                                <option value="">Any</option>
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="weekend">Weekend</option>
                                <option value="monthly">Monthly</option>
                              </Select>
                            </div>
                          </Grid>
                        </div>
                      </Grid>
                    </FormGroup>
                    
                    <ModalFooter>
                      <Button type="button" onClick={handleCloseModal}>
                        Cancel
                      </Button>
                      <Button type="submit" variant="primary" disabled={isLoading}>
                        {isLoading ? 'Saving...' : modalType === 'createSegment' ? 'Create Segment' : 'Save Changes'}
                      </Button>
                    </ModalFooter>
                  </form>
                </>
              )}
              
              {/* Create/Edit Template Modal */}
              {(modalType === 'createTemplate' || modalType === 'editTemplate') && (
                <>
                  <ModalHeader>
                    <ModalTitle>
                      {modalType === 'createTemplate' ? 'Create Template' : 'Edit Template'}
                    </ModalTitle>
                    <ModalCloseButton onClick={handleCloseModal}>&times;</ModalCloseButton>
                  </ModalHeader>
                  
                  <form onSubmit={handleTemplateSubmit}>
                    <FormGroup>
                      <Label>Template Name</Label>
                      <Input 
                        type="text" 
                        placeholder="Enter template name" 
                        value={templateForm.name}
                        onChange={(e) => setTemplateForm({...templateForm, name: e.target.value})}
                        required
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <Label>Template Type</Label>
                      <Select 
                        value={templateForm.type}
                        onChange={(e) => setTemplateForm({...templateForm, type: e.target.value})}
                      >
                        <option value="sms">SMS</option>
                        <option value="email">Email</option>
                        <option value="push">Push Notification</option>
                      </Select>
                    </FormGroup>
                    
                    <FormGroup>
                      <Label>Template Content</Label>
                      <Textarea 
                        placeholder="Enter template content. Use {{variable}} for dynamic content." 
                        value={templateForm.content}
                        onChange={(e) => setTemplateForm({...templateForm, content: e.target.value})}
                        required
                      />
                      <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#666' }}>
                        Available variables: amount, points, prize, msisdn, name
                      </div>
                    </FormGroup>
                    
                    <FormGroup>
                      <Label>Preview</Label>
                      <TemplatePreview>
                        {templateForm.content || 'Template preview will appear here'}
                      </TemplatePreview>
                    </FormGroup>
                    
                    <ModalFooter>
                      <Button type="button" onClick={handleCloseModal}>
                        Cancel
                      </Button>
                      <Button type="submit" variant="primary" disabled={isLoading}>
                        {isLoading ? 'Saving...' : modalType === 'createTemplate' ? 'Create Template' : 'Save Changes'}
                      </Button>
                    </ModalFooter>
                  </form>
                </>
              )}
              
              {/* Create/Edit Campaign Modal */}
              {(modalType === 'createCampaign' || modalType === 'editCampaign') && (
                <>
                  <ModalHeader>
                    <ModalTitle>
                      {modalType === 'createCampaign' ? 'Create Campaign' : 'Edit Campaign'}
                    </ModalTitle>
                    <ModalCloseButton onClick={handleCloseModal}>&times;</ModalCloseButton>
                  </ModalHeader>
                  
                  <form onSubmit={handleCampaignSubmit}>
                    <FormGroup>
                      <Label>Campaign Name</Label>
                      <Input 
                        type="text" 
                        placeholder="Enter campaign name" 
                        value={campaignForm.name}
                        onChange={(e) => setCampaignForm({...campaignForm, name: e.target.value})}
                        required
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <Label>User Segment</Label>
                      <Select 
                        value={campaignForm.segmentId}
                        onChange={(e) => setCampaignForm({...campaignForm, segmentId: e.target.value})}
                        required
                      >
                        <option value="">Select a segment</option>
                        {segments.map(segment => (
                          <option key={segment.id} value={segment.id}>
                            {segment.name} ({segment.userCount.toLocaleString()} users)
                          </option>
                        ))}
                      </Select>
                    </FormGroup>
                    
                    <FormGroup>
                      <Label>Notification Template</Label>
                      <Select 
                        value={campaignForm.templateId}
                        onChange={(e) => setCampaignForm({...campaignForm, templateId: e.target.value})}
                        required
                      >
                        <option value="">Select a template</option>
                        {templates.map(template => (
                          <option key={template.id} value={template.id}>
                            {template.name} ({template.type.toUpperCase()})
                          </option>
                        ))}
                      </Select>
                    </FormGroup>
                    
                    <FormGroup>
                      <Label>Schedule</Label>
                      <Grid>
                        <div>
                          <Label>Date</Label>
                          <Input 
                            type="date" 
                            value={campaignForm.scheduledDate}
                            onChange={(e) => setCampaignForm({...campaignForm, scheduledDate: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label>Time</Label>
                          <Input 
                            type="time" 
                            value={campaignForm.scheduledTime}
                            onChange={(e) => setCampaignForm({...campaignForm, scheduledTime: e.target.value})}
                            required
                          />
                        </div>
                      </Grid>
                    </FormGroup>
                    
                    <FormGroup>
                      <Label>Recurrence</Label>
                      <Select 
                        value={campaignForm.recurrence}
                        onChange={(e) => setCampaignForm({...campaignForm, recurrence: e.target.value})}
                      >
                        <option value="once">One-time</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </Select>
                    </FormGroup>
                    
                    <ModalFooter>
                      <Button type="button" onClick={handleCloseModal}>
                        Cancel
                      </Button>
                      <Button type="submit" variant="primary" disabled={isLoading}>
                        {isLoading ? 'Saving...' : modalType === 'createCampaign' ? 'Create Campaign' : 'Save Changes'}
                      </Button>
                    </ModalFooter>
                  </form>
                </>
              )}
            </ModalContent>
          </ModalBackdrop>
        )}
      </MainContent>

      {/* Footer */}
      <Footer />
    </PageContainer>
  );
};

export default NotificationManagement;

