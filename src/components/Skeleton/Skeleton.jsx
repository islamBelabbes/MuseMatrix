import Conditional from "../Conditional";

export const CardSkeleton = ({ count = 3 }) => {
  return Array(count)
    .fill(0)
    .map((_, index) => (
      <div
        className="flex flex-col items-center gap-4 p-4 border rounded-xl border-secondary animate-pulse "
        key={index}
      >
        <div className="w-full h-[240px] bg-slate-200   "></div>
        <div className="flex flex-col w-full gap-5 p-2">
          <TagSkeleton />
          <h1 className="w-[90%] h-[15px] bg-slate-200"></h1>
          <h1 className="w-[70%] h-[15px] bg-slate-200"></h1>
          <div className="flex items-center gap-6">
            <div className="flex gap-[12px] items-center">
              <div className="w-[36px] h-[36px] rounded-full bg-slate-200"></div>
              <span className="w-[100px] h-[15px] bg-slate-200"></span>
            </div>
          </div>
        </div>
      </div>
    ));
};

export const TagSkeleton = () => {
  return (
    <span
      className={`px-[10px] py-1 rounded-md w-[100px] h-[32px] bg-slate-200`}
    ></span>
  );
};

export const PostListingSkeleton = ({ count = 3, hasEntry = false }) => {
  return (
    <div className="flex flex-col gap-8 " role="status">
      <Conditional
        condition={hasEntry}
        onTrue={
          <div className="flex justify-between">
            <h1 className="w-[100px]  h-[15px] bg-slate-200"></h1>
            <span className="w-[50px]  h-[15px] bg-slate-200 "></span>
          </div>
        }
        onFalse={null}
      />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] justify-center gap-5">
        <CardSkeleton count={count} />
      </div>
    </div>
  );
};

export const PostContentViewSkeleton = () => {
  return (
    <article className="flex flex-col gap-5 p-[24px] border border-secondary rounded-xl  animate-pulse  ">
      <span className="flex flex-col gap-3">
        <h1 className="w-[500px] h-[20px] bg-slate-200"></h1>
        <p className="w-[90%] h-[15px] bg-slate-200"></p>
        <h1 className="w-[500px] h-[20px] bg-slate-200"></h1>
        <p className="w-[90%] h-[15px] bg-slate-200"></p>
        <h1 className="w-[500px] h-[20px] bg-slate-200"></h1>
        <p className="w-[90%] h-[15px] bg-slate-200"></p>
        <h1 className="w-[500px] h-[20px] bg-slate-200"></h1>
        <p className="w-[90%] h-[15px] bg-slate-200"></p>
        <h1 className="w-[500px] h-[20px] bg-slate-200"></h1>
        <p className="w-[90%] h-[15px] bg-slate-200"></p>
        <h1 className="w-[500px] h-[20px] bg-slate-200"></h1>
        <p className="w-[90%] h-[15px] bg-slate-200"></p>
        <h1 className="w-[500px] h-[20px] bg-slate-200"></h1>
        <p className="w-[90%] h-[15px] bg-slate-200"></p>
        <h1 className="w-[500px] h-[20px] bg-slate-200"></h1>
        <p className="w-[90%] h-[15px] bg-slate-200"></p>
        <h1 className="w-[500px] h-[20px] bg-slate-200"></h1>
        <p className="w-[90%] h-[15px] bg-slate-200"></p>
      </span>
    </article>
  );
};
