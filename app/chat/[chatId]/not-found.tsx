import { GoBack } from "@/components/button/go-back";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center gap-y-2 font-sans h-screen px-5">
      <div className="flex flex-col items-center md:text-9xl text-8xl font-bold text-muted-foreground/60">
        404
      </div>

      <div className="text-xl font-semibold mt-2 md:mt-4">
        Page Not Found
      </div>

      <div className="text-base text-muted-foreground text-center">
        Oops! The page doesn&apos;t exist and might have been moved or deleted.
      </div>

      <div className="mt-2">
        <GoBack className="px-4 rounded-md hover:bg-gray-200" />
      </div>
    </div>
  );
}
