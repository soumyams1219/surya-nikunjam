import { useEffect, useState } from "react";

import {
  Home,
  Building2,
  CalendarDays,
  MessageSquare,
} from "lucide-react";

import AdminLayout from "../../../layouts/AdminLayout";

import StatCard from "../../../components/admin/dashboard/StatCard";
import RecentSiteVisitTable from "../../../components/admin/dashboard/RecentSiteVisitTable";
import QuickActions from "../../../components/admin/dashboard/QuickActions";

import { getDashboardStats } from "../../../services/dashboardService";

import type {
  DashboardStats,
  RecentSiteVisit,
} from "../../../types/dashboard";

export default function Dashboard() {
  const [stats, setStats] =
    useState<DashboardStats>({
      villas: 0,
      whyChoose: 0,
      siteVisits: 0,
      testimonials: 0,
    });

  const [recentSiteVisits, setRecentSiteVisits] =
    useState<RecentSiteVisit[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const response =
        await getDashboardStats();

      if (response.success) {
        setStats(response.stats);

        setRecentSiteVisits(
          response.recentSiteVisits || []
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-96">
          <p className="text-lg text-gray-500">
            Loading Dashboard...
          </p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">

        {/* Header */}

        <div>
          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Welcome back! Here's an overview of
            your Surya Nikunjam Community Portal.
          </p>
        </div>

        {/* Statistics */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <StatCard
            title="Villas"
            value={stats.villas}
            icon={Home}
            color="bg-blue-600"
            link="/admin/villas"
          />

          <StatCard
            title="Why Choose"
            value={stats.whyChoose}
            icon={Building2}
            color="bg-green-600"
            link="/admin/why-choose"
          />

          <StatCard
            title="Site Visits"
            value={stats.siteVisits}
            icon={CalendarDays}
            color="bg-yellow-500"
            link="/admin/site-visits"
          />

          <StatCard
            title="Testimonials"
            value={stats.testimonials}
            icon={MessageSquare}
            color="bg-purple-600"
            link="/admin/testimonials"
          />

        </div>

        {/* Recent Site Visits */}

        <RecentSiteVisitTable
          visits={recentSiteVisits}
        />

        {/* Quick Actions */}

        <QuickActions />

      </div>
    </AdminLayout>
  );
}