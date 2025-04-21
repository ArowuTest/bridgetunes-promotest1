// DashboardService.js - Service for user dashboard functionality

class DashboardService {
  // Get user account information
  static async getUserAccount(msisdn) {
    // In a real implementation, this would make an API call
    // For the prototype, we'll return mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          msisdn: msisdn,
          name: "John Doe",
          optedIn: true,
          optInDate: "2025-04-01",
          totalTopups: 15,
          totalAmount: 7500,
          eligibleDraws: 12,
          status: "active"
        });
      }, 500);
    });
  }
  
  // Calculate points based on amount
  static calculatePoints(amount) {
    // Convert amount to number if it's a string
    const numAmount = typeof amount === 'string' ? parseFloat(amount.replace(/[^\d.]/g, '')) : amount;
    
    // Calculate points based on the correct logic
    // ₦100-199 = 1 point, ₦200-299 = 2 points, etc.
    if (numAmount < 100) return 0;
    
    // Calculate points by dividing by 100 and rounding down
    const points = Math.floor(numAmount / 100);
    
    // Cap at 10 points for amounts ₦1000 and above
    return Math.min(points, 10);
  }
  
  // Get user entries (topups)
  static async getUserEntries(msisdn, page = 1, limit = 10) {
    // In a real implementation, this would make an API call
    // For the prototype, we'll return mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        const entries = [];
        const totalEntries = 25;
        
        // Define fixed amounts for consistent testing
        const fixedAmounts = [780, 397, 610, 124, 214, 288, 636, 880, 287, 664, 450, 550, 325, 175, 925];
        
        // Generate mock entries
        for (let i = 0; i < Math.min(limit, totalEntries - (page - 1) * limit); i++) {
          const entryIndex = (page - 1) * limit + i;
          const date = new Date();
          date.setDate(date.getDate() - entryIndex);
          
          // Use fixed amount if available, otherwise generate random
          const amount = entryIndex < fixedAmounts.length 
            ? fixedAmounts[entryIndex] 
            : Math.floor(Math.random() * 900) + 100;
          
          entries.push({
            id: `ENTRY-${100000 + entryIndex}`,
            msisdn: msisdn,
            date: date.toISOString().split('T')[0],
            time: new Date(date).toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true
            }),
            amount: amount,
            // Use the correct points calculation
            points: this.calculatePoints(amount),
            drawId: `DRAW-${date.toISOString().split('T')[0]}`
          });
        }
        
        resolve({
          entries,
          totalEntries,
          currentPage: page,
          totalPages: Math.ceil(totalEntries / limit)
        });
      }, 500);
    });
  }
  
  // Get user notifications
  static async getUserNotifications(msisdn, page = 1, limit = 10) {
    // In a real implementation, this would make an API call
    // For the prototype, we'll return mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        const notifications = [];
        const totalNotifications = 15;
        
        const notificationTypes = [
          'draw_announcement',
          'win_notification',
          'recharge_confirmation',
          'promotion_update'
        ];
        
        // Generate mock notifications
        for (let i = 0; i < Math.min(limit, totalNotifications - (page - 1) * limit); i++) {
          const notificationIndex = (page - 1) * limit + i;
          const date = new Date();
          date.setDate(date.getDate() - notificationIndex);
          
          const type = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
          let title, message;
          
          switch (type) {
            case 'draw_announcement':
              title = 'Upcoming Draw';
              message = `The next draw will take place on ${date.toISOString().split('T')[0]} at 8:00 PM.`;
              break;
            case 'win_notification':
              title = 'Congratulations!';
              message = 'You have won a consolation prize of ₦75,000 in the daily draw!';
              break;
            case 'recharge_confirmation':
              const amount = Math.floor(Math.random() * 900) + 100;
              title = 'Recharge Confirmed';
              message = `Your recharge of ₦${amount} has been confirmed. You've earned ${this.calculatePoints(amount)} points for this transaction.`;
              break;
            case 'promotion_update':
              title = 'Promotion Update';
              message = 'The Saturday Mega Draw prize has been increased to ₦3,000,000!';
              break;
          }
          
          notifications.push({
            id: `NOTIF-${200000 + notificationIndex}`,
            type: type,
            title: title,
            message: message,
            date: date.toISOString().split('T')[0],
            time: new Date(date).toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true
            }),
            read: notificationIndex > 3
          });
        }
        
        resolve({
          notifications,
          totalNotifications,
          currentPage: page,
          totalPages: Math.ceil(totalNotifications / limit),
          unreadCount: 3
        });
      }, 500);
    });
  }
  
  // Get user draw history
  static async getUserDrawHistory(msisdn, page = 1, limit = 10) {
    // In a real implementation, this would make an API call
    // For the prototype, we'll return mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        const draws = [];
        const totalDraws = 20;
        
        // Generate mock draw history
        for (let i = 0; i < Math.min(limit, totalDraws - (page - 1) * limit); i++) {
          const drawIndex = (page - 1) * limit + i;
          const date = new Date();
          date.setDate(date.getDate() - drawIndex);
          
          const isWinner = drawIndex === 1 || drawIndex === 5;
          const prizeAmount = drawIndex === 1 ? 75000 : 150000;
          
          draws.push({
            id: `DRAW-${date.toISOString().split('T')[0]}`,
            date: date.toISOString().split('T')[0],
            participated: true,
            isWinner: isWinner,
            prizeAmount: isWinner ? prizeAmount : 0,
            prizeType: isWinner ? (drawIndex === 1 ? 'Consolation Prize' : '3rd Prize') : 'N/A'
          });
        }
        
        resolve({
          draws,
          totalDraws,
          currentPage: page,
          totalPages: Math.ceil(totalDraws / limit)
        });
      }, 500);
    });
  }
  
  // Get user statistics
  static async getUserStatistics(msisdn) {
    // In a real implementation, this would make an API call
    // For the prototype, we'll return mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalTopups: 15,
          totalAmount: 7500,
          totalPoints: 75,
          totalDraws: 12,
          totalWins: 2,
          totalPrizeAmount: 225000,
          averageTopupAmount: 500,
          mostFrequentDay: 'Friday',
          mostFrequentTime: 'Evening',
          lastTopupDate: '2025-04-21',
          lastDrawParticipation: '2025-04-21'
        });
      }, 500);
    });
  }
}

export default DashboardService;

