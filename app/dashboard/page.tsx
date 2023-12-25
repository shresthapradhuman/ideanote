import Breadcrumb from "@/components/breadcrumb";
import prisma from "@/prisma/client";
import NotesSummary from "./_components/note-summary";
import RecentNotes from "./_components/recent-note";
import CommentSummary from "./_components/comment-summary";

const DashboardPage = async () => {
  const published = await prisma.note.count({
    where: { noteStatus: "PUBLISHED" },
  });
  const draft = await prisma.note.count({
    where: { noteStatus: "DRAFT" },
  });
  return (
    <>
      <Breadcrumb items={[]} />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* status and chart */}
        <div className="flex flex-col gap-5">
          <NotesSummary published={published} draft={draft} />
          <CommentSummary />
        </div>

        <div className="space-y-6">
          {/* recent notes section */}
          <RecentNotes />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
