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
            amount: amount,
            date: date.toISOString().split('T')[0],
            time: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
            // Use the correct points calculation
            points: this.calculatePoints(amount),
            eligibleDraws: [`DRAW-${date.toISOString().split('T')[0]}`]
          });
        }
        
        resolve({
          entries,
          pagination: {
            page,
            limit,
            totalEntries,
            totalPages: Math.ceil(totalEntries / limit)
          }
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
        const totalNotifications = 18;
        
        // Notification types
        const types = [
          { type: 'draw_announcement', title: 'Draw Announcement', icon: 'calendar' },
          { type: 'recharge_confirmation', title: 'Recharge Confirmation', icon: 'credit-card' },
          { type: 'win_notification', title: 'Congratulations!', icon: 'award' },
          { type: 'info', title: 'Information', icon: 'info' }
        ];
        
        // Generate mock notifications
        for (let i = 0; i < Math.min(limit, totalNotifications - (page - 1) * limit); i++) {
          const notifIndex = (page - 1) * limit + i;
          const date = new Date();
          date.setDate(date.getDate() - Math.floor(notifIndex / 3));
          date.setHours(date.getHours() - (notifIndex % 3) * 4);
          
          const typeIndex = Math.floor(Math.random() * types.length);
          let message;
          
          // Create message based on type
          if (types[typeIndex].type === 'recharge_confirmation') {
            const amount = Math.floor(Math.random() * 900) + 100;
            message = `Your recharge of ₦${amount} has been confirmed. You've earned ${this.calculatePoints(amount)} points.`;
          } else if (types[typeIndex].type === 'draw_announcement') {
            message = 'Daily draw will take place today at 8:00 PM.';
          } else if (types[typeIndex].type === 'win_notification') {
            message = `Congratulations! You've won a consolation prize of ₦75,000 in today's draw.`;
          } else {
            message = 'Saturday mega draw has a jackpot of ₦3,000,000. Don\'t miss out!';
          }
          
          notifications.push({
            id: `NOTIF-${100000 + notifIndex}`,
            type: types[typeIndex].type,
            title: types[typeIndex].title,
            icon: types[typeIndex].icon,
            message: message,
            date: date.toISOString(),
            read: notifIndex > 5
          });
        }
        
        resolve({
          notifications,
          pagination: {
            page,
            limit,
            totalNotifications,
            totalPages: Math.ceil(totalNotifications / limit)
          }
        });
      }, 500);
    });
  }
  
  // Mark notification as read
  static async markNotificationAsRead(notificationId) {
    // In a real implementation, this would make an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 300);
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
          averageTopup: 500,
          eligibleDraws: 12,
          participatedDraws: 12,
          winningDraws: 1,
          totalWinnings: 75000,
          topupHistory: [
            { date: '2025-04-01', amount: 500 },
            { date: '2025-04-02', amount: 300 },
            { date: '2025-04-03', amount: 700 },
            { date: '2025-04-04', amount: 200 },
            { date: '2025-04-05', amount: 1000 },
            { date: '2025-04-06', amount: 500 },
            { date: '2025-04-07', amount: 300 },
            { date: '2025-04-08', amount: 400 },
            { date: '2025-04-09', amount: 600 },
            { date: '2025-04-10', amount: 500 },
            { date: '2025-04-11', amount: 300 },
            { date: '2025-04-12', amount: 700 },
            { date: '2025-04-13', amount: 200 },
            { date: '2025-04-14', amount: 800 },
            { date: '2025-04-15', amount: 500 }
          ]
        });
      }, 500);
    });
  }
  
  // Check for real-time notifications
  static async checkRealTimeNotifications(msisdn) {
    // In a real implementation, this would make an API call or use WebSockets
    // For the prototype, we'll randomly return a notification
    return new Promise((resolve) => {
      setTimeout(() => {
        const shouldShowNotification = Math.random() > 0.7; // 30% chance
        
        if (shouldShowNotification) {
          const types = [
            { type: 'draw_announcement', title: 'Draw Announcement', icon: 'calendar', message: 'Daily draw will take place today at 8:00 PM.' },
            { type: 'recharge_confirmation', title: 'Recharge Confirmation', icon: 'credit-card', message: `Your recharge of ₦500 has been confirmed. You've earned ${this.calculatePoints(500)} points.` },
            { type: 'win_notification', title: 'Congratulations!', icon: 'award', message: `Congratulations! You've won a consolation prize of ₦75,000 in today's draw.` }
          ];
          
          const typeIndex = Math.floor(Math.random() * types.length);
          
          resolve({
            hasNotification: true,
            notification: {
              id: `NOTIF-RT-${Date.now()}`,
              ...types[typeIndex],
              date: new Date().toISOString(),
              read: false
            }
          });
        } else {
          resolve({
            hasNotification: false
          });
        }
      }, 500);
    });
  }
  
  // For compatibility with the current dashboard implementation
  static async getUserInfo(msisdn) {
    // In a real implementation, this would fetch data from an API
    // For the prototype, we'll return mock data
    const account = await this.getUserAccount(msisdn);
    return {
      msisdn: account.msisdn,
      optInStatus: account.optedIn,
      joinDate: account.optInDate,
      totalEntries: account.totalTopups,
      totalChances: 87,
      totalRecharge: account.totalAmount,
      eligibleDraws: account.eligibleDraws
    };
  }
  
  // For compatibility with the current dashboard implementation
  static async checkForNewNotifications(msisdn) {
    return this.checkRealTimeNotifications(msisdn);
  }
}

export default DashboardService;
