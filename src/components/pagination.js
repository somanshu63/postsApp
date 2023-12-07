function Pagination(props) {
  let articlesCount = props.articlesCount;
  let activeIndex = props.activeIndex;
  let handleState = props.handleState;
  let num = [],
    count;
  count = Math.ceil(articlesCount / 10);
  for (let i = 0; i < count; i++) {
    num.push(i + 1);
  }
  return (
    <div>
      {num && num.length > 1 ? (
        <>
          <h4 className="p-1 text-center text-xl text-green-600 capitalize">
            pages
          </h4>
          <div className="flex justify-center w-full flex-wrap p-4">
            <button
              onClick={() => {
                handleState(
                  "activeIndex",
                  activeIndex > 0 ? activeIndex - 1 : activeIndex
                );
              }}
              className={`text-sm py-1 px-2 hover:scale-150 text-green-600`}
            >
              prev
            </button>
            {num.map((n, i) => {
              return (
                <button
                  key={i}
                  onClick={() => {
                    handleState("activeIndex", i);
                  }}
                  className={`bg-none w-8 h-8 text-sm hover:scale-125 hover:text-white hover:bg-green-500 rounded-md border-solid border-2 border-green-600 m-1 ${
                    activeIndex === i ? "bg-green-600 text-white" : ""
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}
            <button
              onClick={() => {
                handleState(
                  "activeIndex",
                  activeIndex < count - 1 ? activeIndex + 1 : activeIndex
                );
              }}
              className={`text-sm py-1 hover:scale-150 px-2 text-green-600`}
            >
              next
            </button>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
export default Pagination;
