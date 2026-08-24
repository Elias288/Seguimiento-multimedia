import MultimediaCard from "@/components/MultimediaCard";

const EmptySkeleton = ({ title }: { title: string }) => {
  return (
    <section className="mb-16 md:mb-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 px-1 py-3">
        <MultimediaCard />
        <MultimediaCard />
        <MultimediaCard />
        <MultimediaCard />
        <MultimediaCard />
        <MultimediaCard />
      </div>
    </section>
  );
};

export default EmptySkeleton;
