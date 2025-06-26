'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from 'chart.js';

import { Bar, Line } from 'react-chartjs-2';
import { getAverageDepartmentRatings, getBookmarkTrends } from '../lib/mockAnalytics';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

export default function AnalyticsPage() {
  const departmentData = getAverageDepartmentRatings();
  const bookmarkData = getBookmarkTrends();

  const barChartData = {
    labels: departmentData.map((d) => d.department),
    datasets: [
      {
        label: 'Avg Rating',
        data: departmentData.map((d) => d.averageRating),
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderRadius: 6,
      },
    ],
  };

  const lineChartData = {
    labels: bookmarkData.labels,
    datasets: [
      {
        label: 'Bookmarked Users',
        data: bookmarkData.data,
        fill: false,
        borderColor: 'rgb(34, 197, 94)',
        tension: 0.3,
      },
    ],
  };

  return (
    <main className="p-8 space-y-12">
      <h1 className="text-2xl font-bold">📊 Analytics</h1>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Average Ratings by Department</h2>
        <div className="bg-white p-4 rounded-xl shadow">
          <Bar data={barChartData} />
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Bookmark Trends (Mock)</h2>
        <div className="bg-white p-4 rounded-xl shadow">
          <Line data={lineChartData} />
        </div>
      </section>
    </main>
  );
}
