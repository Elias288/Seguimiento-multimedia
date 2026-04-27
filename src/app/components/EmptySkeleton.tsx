const EmptySkeleton = ({ title }: { title: string }) => {
  return (
    <article className="mb-4">
      <div className="content__container bg-[#ffffff1c] w-full rounded-lg overflow-x-hidden">
        <h2 className="text-2xl py-2 px-4">{title}</h2>

        <div className="content__list w-full flex gap-4 overflow-x-hidden py-2 px-4">
          <div className="anime__card bg-card rounded-lg p-2.5 h-100 min-w-75 animate-pulse"></div>
          <div className="anime__card bg-card rounded-lg p-2.5 h-100 min-w-75 animate-pulse"></div>
          <div className="anime__card bg-card rounded-lg p-2.5 h-100 min-w-75 animate-pulse"></div>
          <div className="anime__card bg-card rounded-lg p-2.5 h-100 min-w-75 animate-pulse"></div>
          <div className="anime__card bg-card rounded-lg p-2.5 h-100 min-w-75 animate-pulse"></div>
        </div>
      </div>
    </article>
  );
};

export default EmptySkeleton;
