import React, { useState, useEffect } from 'react';
import { adminService, AdminStats } from '../services/adminService';
import './Overview.css';

const Overview: React.FC = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [recentSubscriptions, setRecentSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch admin statistics
        const statsData = await adminService.getAdminStats();
        setStats(statsData);

        // Fetch recent subscriptions
        const recentSubs = await adminService.getRecentSubscriptions(5);
        setRecentSubscriptions(recentSubs);

      } catch (err) {
        console.error('Error fetching overview data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load overview data');
      } finally {
        setLoading(false);
      }
    };

    fetchOverviewData();
  }, []);

  if (loading) {
    return (
      <div className="overview-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading overview...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="overview-container">
        <div className="error-message">
          <h2>Error Loading Overview</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="overview-container">
      <div className="overview-header">
        <h1>Admin Overview</h1>
        <p className="overview-subtitle">User and subscription statistics</p>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon users-icon">👥</div>
          <div className="stat-content">
            <h3>Total Users</h3>
            <p className="stat-number">{stats?.totalUsers || 0}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon subscriptions-icon">💳</div>
          <div className="stat-content">
            <h3>Total Subscriptions</h3>
            <p className="stat-number">{stats?.totalSubscriptions || 0}</p>
          </div>
        </div>

        <div className="stat-card active">
          <div className="stat-icon active-icon">✅</div>
          <div className="stat-content">
            <h3>Active Subscriptions</h3>
            <p className="stat-number">{stats?.activeSubscriptions || 0}</p>
          </div>
        </div>

        <div className="stat-card cancelled">
          <div className="stat-icon cancelled-icon">❌</div>
          <div className="stat-content">
            <h3>Cancelled Subscriptions</h3>
            <p className="stat-number">{stats?.cancelledSubscriptions || 0}</p>
          </div>
        </div>

        <div className="stat-card expired">
          <div className="stat-icon expired-icon">⏰</div>
          <div className="stat-content">
            <h3>Expired Subscriptions</h3>
            <p className="stat-number">{stats?.expiredSubscriptions || 0}</p>
          </div>
        </div>
      </div>

      {/* Recent Subscriptions */}
      <div className="recent-subscriptions">
        <h2>Recent Subscriptions</h2>
        {recentSubscriptions.length === 0 ? (
          <div className="no-data">
            <p>No recent subscriptions found.</p>
          </div>
        ) : (
          <div className="subscriptions-table">
            <div className="table-header">
              <span>User Email</span>
              <span>Plan</span>
              <span>Status</span>
              <span>Start Date</span>
              <span>Amount</span>
            </div>
            {recentSubscriptions.map((subscription, index) => (
              <div key={subscription.id || index} className="table-row">
                <span className="user-email">{subscription.userEmail}</span>
                <span className="plan-name">{subscription.planName}</span>
                <span className={`status-badge ${subscription.status}`}>
                  {subscription.status}
                </span>
                <span className="start-date">
                  {new Date(subscription.startDate).toLocaleDateString()}
                </span>
                <span className="amount">
                  ₹{subscription.amount} {subscription.interval}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Overview;