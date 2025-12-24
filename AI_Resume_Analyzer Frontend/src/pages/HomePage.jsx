import { Layout, Rocket, ShieldCheck, Zap, BrainCircuit } from "lucide-react"; // Using Lucide for icons

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-100">
      {/* 1. Hero Section & Background Decor */}
      <div className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
        {/* Subtle Background Glows */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-700/10 mb-8">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 mr-2"></span>
            Powered by Gemini AI
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-7xl mb-6">
            Resume Screening <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">
              Made Intelligent.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-xl text-gray-600 leading-relaxed mb-10">
            Transform raw resumes into actionable insights. Our AI-driven engine
            provides objective match scores, detects skill gaps, and simulates
            ATS behavior in seconds.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              className="group relative px-8 py-4 text-lg font-bold text-white bg-indigo-600 rounded-2xl shadow-[0_20px_50px_rgba(79,70,229,0.3)] hover:bg-indigo-700 transition-all duration-300 hover:-translate-y-1"
              onClick={() => (window.location.href = "/analyze")}
            >
              Start Screening Now
              <Rocket className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="px-8 py-4 text-lg font-semibold text-gray-700 bg-gray-50 border border-gray-200 rounded-2xl hover:bg-white hover:shadow-md transition-all">
              View Demo
            </button>
          </div>
        </div>
      </div>

      {/* 2. Features Bento Grid */}
      <div className="max-w-7xl mx-auto px-6 py-20 border-t border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<BrainCircuit className="w-6 h-6 text-indigo-600" />}
            title="AI Skill Intelligence"
            desc="Deep analysis of core vs. secondary skills using advanced LLM reasoning."
          />
          <FeatureCard
            icon={<ShieldCheck className="w-6 h-6 text-green-600" />}
            title="ATS Simulation"
            desc="Understand exactly why a resume gets filtered and how to optimize it."
          />
          <FeatureCard
            icon={<Zap className="w-6 h-6 text-orange-500" />}
            title="Learning Roadmaps"
            desc="Bridging skill gaps with personalized resources and project paths."
          />
        </div>
      </div>

      {/* 3. Social Proof/Stats */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-6 flex flex-wrap justify-around items-center opacity-60 grayscale">
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
            Trusted for Recruitment in
          </p>
          <span className="text-xl font-bold text-gray-500">TechCorp</span>
          <span className="text-xl font-bold text-gray-500">InnovateLab</span>
          <span className="text-xl font-bold text-gray-500">FutureSoft</span>
        </div>
      </div>

      {/* 4. Footer */}
      <footer className="py-12 text-center">
        <p className="text-sm text-gray-400">
          Built for recruiters and developers. <br />
          <span className="mt-2 block">
            Illustrations by{" "}
            <a href="#" className="underline">
              Freepik
            </a>{" "}
            • Images by{" "}
            <a href="#" className="underline">
              Unsplash
            </a>
          </span>
        </p>
      </footer>
    </div>
  );
};

// Helper Component for Features
const FeatureCard = ({ icon, title, desc }) => (
  <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all group">
    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{desc}</p>
  </div>
);

export { HomePage };
