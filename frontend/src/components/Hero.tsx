const Hero = () => {
  return (
    <section className="relative overflow-hidden py-20 text-center">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-violet-900/20 via-zinc-950 to-zinc-950" />

      <div className="mx-auto max-w-5xl px-6">
        <span className="inline-flex items-center rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300">
          🚀 AI-Powered Developer Tool
        </span>

        <h1 className="mt-8 text-5xl font-extrabold leading-tight text-white md:text-6xl">
          Review Code Smarter
          <br />
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            with CodeLens
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-zinc-400">
          Compare source code, visualize differences, analyze GitHub Pull
          Requests, and receive AI-powered code reviews using Google Gemini —
          all from one intuitive platform.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <div className="rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm text-zinc-300">
            🤖 Gemini AI
          </div>

          <div className="rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm text-zinc-300">
            💻 Monaco Editor
          </div>

          <div className="rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm text-zinc-300">
            🔍 GitHub PR Review
          </div>

          <div className="rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm text-zinc-300">
            📄 Export PDF
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;