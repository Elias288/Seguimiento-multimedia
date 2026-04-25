type Props = {};
const MainContent = ({}: Props) => {
  return (
    <main className="bg-[#e7e7e7] overflow-x-hidden">
      <article className="mb-4">
        <div className="content__container bg-[#0000000d] w-full rounded-lg overflow-x-hidden">
          <h2 className="text-2xl py-2 px-4">Anime</h2>

          <div className="content__list w-full flex gap-4 overflow-x-auto py-2 px-4">
            <div className="anime__card bg-white rounded-lg p-2.5 h-100 min-w-75"></div>
            <div className="anime__card bg-white rounded-lg p-2.5 h-100 min-w-75"></div>
            <div className="anime__card bg-white rounded-lg p-2.5 h-100 min-w-75"></div>
            <div className="anime__card bg-white rounded-lg p-2.5 h-100 min-w-75"></div>
            <div className="anime__card bg-white rounded-lg p-2.5 h-100 min-w-75"></div>
          </div>
        </div>
      </article>
    </main>
  );
};

export default MainContent;
