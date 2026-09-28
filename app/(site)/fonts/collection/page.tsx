import { Suspense } from "react";
import SelectedFonts from "./SelectedFonts";

export default function SelectedFontsPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto w-full max-w-[1120px] px-6 pb-28 pt-12">
          <div className="aura-tile min-h-64 animate-pulse p-8" />
        </main>
      }
    >
      <SelectedFonts />
    </Suspense>
  );
}
