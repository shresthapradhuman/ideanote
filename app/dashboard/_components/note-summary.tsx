import { Card, CardHeader } from "@/components/ui/card";

const NotesSummary = ({
  published,
  draft,
}: {
  published: number;
  draft: number;
}) => {
  const containers = [
    { label: "Published", value: published },
    { label: "Draft", value: draft },
    { label: "Total", value: published + draft },
  ];
  return (
    <div className="grid gap-4 grid-cols-1  md:grid-cols-2 lg:grid-cols-3">
      {containers.map((container, idx) => (
        <Card key={idx} className="dark:hover:bg-zinc-900">
          <CardHeader>
            <h1>{container.label}</h1>
            <p className="text-sm text-gray-400">{container.value}</p>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default NotesSummary;
