export default function LoadingPage() {
  return (
    <div
      className="flex flex-col justify-between h-full animate-pulse gap-8"
      aria-hidden="true"
      aria-label="Loading tomorrow page"
    >
      <div className="flex items-center gap-4">
        <div className="h-8 w-8 bg-yellow-600 rounded-full" />
        <div>
          <div className="h-7 w-48 bg-yellow-600 rounded" />
          <div className="h-4 w-64 bg-yellow-600 rounded mt-1" />
        </div>
      </div>

      <div className="overflow-y-scroll">
        <div className="flex flex-col gap-4">
          {Array(24)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="bg-white/30 rounded-md py-4 px-6 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-8">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-yellow-600" />
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="h-4 w-14 bg-yellow-600 rounded" />
                  </div>
                </div>

                <div className="h-8 w-14 bg-yellow-600 rounded" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
