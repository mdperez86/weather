export default function LoadingPage() {
  return (
    <div
      className="flex flex-col justify-between h-full animate-pulse gap-8"
      aria-hidden="true"
      aria-label="Loading home page"
    >
      <div>
        <div className="h-7 w-52 bg-yellow-600 rounded" />
        <div className="h-4 w-72 bg-yellow-600 rounded mt-1" />
      </div>

      <div className="flex justify-center relative">
        <div className="w-36 h-36 rounded-full bg-yellow-600" />
      </div>

      <div className="flex items-center justify-center">
        <div className="h-32 w-72 rounded-lg bg-yellow-600" />
      </div>

      <div className="flex justify-around text-xs text-stone-800/60">
        <div className="h-4 w-10 bg-yellow-600 rounded" />
        <div className="h-4 w-10 bg-yellow-600 rounded" />
        <div className="h-4 w-10 bg-yellow-600 rounded" />
      </div>

      <div className="shrink-0 -mx-6 sm:mx-0 h-36 overflow-hidden">
        <div className="overflow-hidden pb-4">
          <div className="inline-flex gap-4 mx-6 sm:mx-0">
            {Array(24)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="bg-white/30 rounded-md py-4 px-6 flex flex-col items-center shrink-0 gap-4"
                >
                  <div className="h-4 w-14 bg-yellow-600 rounded" />
                  <div className="w-10 h-10 rounded-full bg-yellow-600" />
                  <div className="h-6 w-14 bg-yellow-600 rounded" />
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-4">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="h-5 w-20 bg-yellow-600 rounded" />
          ))}
      </div>
    </div>
  );
}
