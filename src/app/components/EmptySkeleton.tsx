import MultimediaCard from "./multimediaCard";

const EmptySkeleton = ({ title }: { title: string }) => {
  return (
    <article className="mb-4">
      <div className="content__container bg-background2 w-full rounded-lg overflow-x-hidden">
        <h2 className="text-2xl py-2 px-4">{title}</h2>

        <div className="w-full pt-2 pb-5 px-5 flex gap-4 overflow-x-hidden">
          <MultimediaCard />
          <MultimediaCard />
          <MultimediaCard />
          <MultimediaCard />
          <MultimediaCard />
        </div>
      </div>
    </article>
  );
};

export default EmptySkeleton;
