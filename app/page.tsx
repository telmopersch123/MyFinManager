import { Suspense } from "react";
import Loading from "./(home)/_components/loading";
import Home from "./(home)/page";

export default function HomePage({
  searchParams,
}: {
  searchParams: { month?: string };
}) {
  return (
    <>
      <Suspense
        fallback={
          <div>
            <Loading />
          </div>
        }
      >
        <Home searchParams={searchParams} />
      </Suspense>
    </>
  );
}
