import primsa from "../../prisma/client";
import Hero from "./_components/hero";
import RecentNote from "./_components/recent-note";

export default async function Home() {
  const notes = await primsa.note.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
    where: {
      noteStatus: "PUBLISHED",
    },
    include: {
      user: true,
      comment: true,
    },
  });

  return (
    <main>
      <Hero />
      <RecentNote items={notes} />
    </main>
  );
}
