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
  
  // Get user entries (topups)
  static async getUserEntries(msisdn, page = 1, limit = 10) {
    // In a real implementation, this would make an API call
    // For the prototype, we'll return mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        const entries = [];
        const totalEntries = 25;
        
        // Generate mock entries
        for (let i = 0; i < Math.min(limit, totalEntries - (page - 1) * limit); i++) {
          const entryIndex = (page - 1) * limit + i;
          const date = new Date();
          date.setDate(date.getDate() - entryIndex);
          
          entries.push({
            id: `ENTRY-${100000 + entryIndex}`,
            msisdn: msisdn,
            amount: Math.floor(Math.random() * 900) + 100, // 100-1000 Naira
            date: date.toISOString().split('T')[0],
            time: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
            points: Math.floor(Math.random() * 5) + 1,
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
        
        // Notification messages
        const messages = [
          'Daily draw will take place today at 8:00 PM.',
          `Your recharge of ₦500 has been confirmed. You've earned 2 points.`,
          `Congratulations! You've won a consolation prize of ₦75,000 in today's draw.`,
          'Saturday mega draw has a jackpot of ₦3,000,000. Don\'t miss out!',
          'Your account has been successfully verified.',
          'Recharge at least ₦200 today to qualify for tomorrow\'s draw.'
        ];
        
        // Generate mock notifications
        for (let i = 0; i < Math.min(limit, totalNotifications - (page - 1) * limit); i++) {
          const notifIndex = (page - 1) * limit + i;
          const date = new Date();
          date.setDate(date.getDate() - Math.floor(notifIndex / 3));
          date.setHours(date.getHours() - (notifIndex % 3) * 4);
          
          const typeIndex = Math.floor(Math.random() * types.length);
          const messageIndex = Math.floor(Math.random() * messages.length);
          
          notifications.push({
            id: `NOTIF-${100000 + notifIndex}`,
            type: types[typeIndex].type,
            title: types[typeIndex].title,
            icon: types[typeIndex].icon,
            message: messages[messageIndex],
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
            { type: 'recharge_confirmation', title: 'Recharge Confirmation', icon: 'credit-card', message: `Your recharge of ₦500 has been confirmed. You've earned 2 points.` },
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
}

export default DashboardService;
