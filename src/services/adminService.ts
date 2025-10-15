import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';

export interface AdminStats {
  totalUsers: number;
  totalSubscriptions: number;
  activeSubscriptions: number;
  cancelledSubscriptions: number;
  expiredSubscriptions: number;
}

export class AdminService {
  private static instance: AdminService;
  private client = generateClient<Schema>();

  public static getInstance(): AdminService {
    if (!AdminService.instance) {
      AdminService.instance = new AdminService();
    }
    return AdminService.instance;
  }

  // Get user and subscription statistics
  async getAdminStats(): Promise<AdminStats> {
    try {
      // Get all subscriptions (admin view - would need proper authorization in production)
      const { data: subscriptions } = await this.client.models.UserSubscription.list();

      // Get unique users from subscriptions
      const uniqueUsers = new Set<string>();
      let activeCount = 0;
      let cancelledCount = 0;
      let expiredCount = 0;

      if (subscriptions) {
        subscriptions.forEach(sub => {
          // Add user to unique users set
          uniqueUsers.add(sub.userEmail);

          // Count subscription statuses
          switch (sub.status) {
            case 'active':
              activeCount++;
              break;
            case 'cancelled':
              cancelledCount++;
              break;
            case 'expired':
              expiredCount++;
              break;
          }
        });
      }

      return {
        totalUsers: uniqueUsers.size,
        totalSubscriptions: subscriptions?.length || 0,
        activeSubscriptions: activeCount,
        cancelledSubscriptions: cancelledCount,
        expiredSubscriptions: expiredCount
      };

    } catch (error) {
      console.error('Error fetching admin stats:', error);
      throw new Error('Failed to fetch admin statistics');
    }
  }

  // Get recent subscriptions (last 30 days)
  async getRecentSubscriptions(limit: number = 10): Promise<any[]> {
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data: subscriptions } = await this.client.models.UserSubscription.list({
        filter: {
          startDate: { ge: thirtyDaysAgo.toISOString() }
        }
      });

      // Sort by startDate in descending order (newest first)
      const sortedSubscriptions = subscriptions?.sort((a, b) => {
        const dateA = new Date(a.startDate).getTime();
        const dateB = new Date(b.startDate).getTime();
        return dateB - dateA;
      }) || [];

      return sortedSubscriptions.slice(0, limit);
    } catch (error) {
      console.error('Error fetching recent subscriptions:', error);
      return [];
    }
  }

  // Get subscription trends (active vs cancelled over time)
  async getSubscriptionTrends(): Promise<{ active: number; cancelled: number; expired: number }> {
    try {
      const { data: subscriptions } = await this.client.models.UserSubscription.list();

      let activeCount = 0;
      let cancelledCount = 0;
      let expiredCount = 0;

      if (subscriptions) {
        subscriptions.forEach(sub => {
          switch (sub.status) {
            case 'active':
              activeCount++;
              break;
            case 'cancelled':
              cancelledCount++;
              break;
            case 'expired':
              expiredCount++;
              break;
          }
        });
      }

      return {
        active: activeCount,
        cancelled: cancelledCount,
        expired: expiredCount
      };
    } catch (error) {
      console.error('Error fetching subscription trends:', error);
      return { active: 0, cancelled: 0, expired: 0 };
    }
  }
}

// Export singleton instance
export const adminService = AdminService.getInstance();