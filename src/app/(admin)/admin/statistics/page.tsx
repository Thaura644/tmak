import { prisma } from "@/lib/prisma";
import { StatisticsList } from "./StatisticsList";

export default async function AdminStatisticsPage() {
  const stats = await prisma.statistic.findMany({
    orderBy: { year: 'desc' }
  });

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold mb-8">Manage Statistics</h1>
      <StatisticsList initialStats={stats} />
    </div>
  );
}
