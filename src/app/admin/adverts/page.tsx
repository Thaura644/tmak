import { prisma } from "@/lib/prisma";
import { AdvertsList } from "./AdvertsList";

export default async function AdminAdvertsPage() {
  const adverts = await prisma.advert.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold mb-8">Manage Adverts</h1>
      <AdvertsList initialAdverts={adverts} />
    </div>
  );
}
