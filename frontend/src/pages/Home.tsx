import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import EditorSection from "../components/EditorSection";
import HistoryPanel from "../components/HistoryPanel";

export interface Comparison {
  _id: string;
  language: string;
  originalCode: string;
  modifiedCode: string;
  aiResponse: string;
  createdAt: string;
}

const Home = () => {
  const [selectedComparison, setSelectedComparison] =
    useState<Comparison | null>(null);

  return (
    <main className="min-h-screen bg-zinc-950">
      <Navbar />
      <Hero />

      <div className="max-w-7xl mx-auto grid grid-cols-4 gap-6 px-6">
        <div className="col-span-1">
          <HistoryPanel onSelect={setSelectedComparison} />
        </div>

        <div className="col-span-3">
          <EditorSection selectedComparison={selectedComparison} />
        </div>
      </div>
    </main>
  );
};

export default Home;
