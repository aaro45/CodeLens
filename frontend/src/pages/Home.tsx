import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import EditorSection from "../components/EditorSection";
import HistoryPanel from "../components/HistoryPanel";
const Home = () => {
  return (
    <main className="min-h-screen bg-zinc-950">
      <Navbar />
      <Hero />

      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-4 gap-6 px-4 md:px-6">
        <div className="lg:col-span-1">
          <HistoryPanel onSelect={() => {}} />
        </div>

        <div className="lg:col-span-3">
          <EditorSection />
        </div>
      </div>
    </main>
  );
};

export default Home;