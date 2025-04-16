import React, { useState, useEffect } from 'react';

// API service for handling opt-in data
const OptInService = {
  // Get all opt-in data (combines localStorage and backend data)
  getAllOptIns: async () => {
    try {
      // First, get data from localStorage
      const localData = localStorage.getItem('optInData') 
        ? JSON.parse(localStorage.getItem('optInData')) 
        : [];
      
      // Then, get data from our backend JSON file
      const response = await fetch('/data/msisdn_data.json');
      const backendData = await response.json();
      
      // Combine the data, giving priority to local data for duplicates
      const localMsisdns = new Set(localData.map(item => item.msisdn));
      const filteredBackendData = backendData.filter(item => !localMsisdns.has(item.msisdn));
      
      return [...localData, ...filteredBackendData];
    } catch (error) {
      console.error('Error fetching opt-in data:', error);
      return [];
    }
  },
  
  // Add new opt-in
  addOptIn: async (optInData) => {
    try {
      // In a real implementation, this would be an API call
      // For the prototype, we'll store in localStorage
      const existingData = localStorage.getItem('optInData') 
        ? JSON.parse(localStorage.getItem('optInData')) 
        : [];
      
      // Check if MSISDN already exists
      const existingIndex = existingData.findIndex(item => item.msisdn === optInData.msisdn);
      
      if (existingIndex >= 0) {
        // Update existing record
        existingData[existingIndex] = {
          ...existingData[existingIndex],
          optIn: true,
          date: optInData.date
        };
      } else {
        // Add new record
        existingData.push(optInData);
      }
      
      localStorage.setItem('optInData', JSON.stringify(existingData));
      return { success: true, data: optInData };
    } catch (error) {
      console.error('Error adding opt-in:', error);
      return { success: false, error: 'Failed to add opt-in' };
    }
  },
  
  // Get eligible participants for draw
  getEligibleParticipants: async (endingDigits) => {
    try {
      const allData = await OptInService.getAllOptIns();
      
      // Filter by opt-in status and ending digits
      return allData.filter(participant => 
        participant.optIn && 
        endingDigits.includes(participant.lastDigit)
      );
    } catch (error) {
      console.error('Error getting eligible participants:', error);
      return [];
    }
  },
  
  // Get recent opt-ins
  getRecentOptIns: async (limit = 5) => {
    try {
      const allData = await OptInService.getAllOptIns();
      
      // Sort by date (newest first) and take the specified limit
      return allData
        .filter(item => item.optIn)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, limit);
    } catch (error) {
      console.error('Error getting recent opt-ins:', error);
      return [];
    }
  }
};

export default OptInService;
