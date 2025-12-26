import {
  Layout,
  Rocket,
  ShieldCheck,
  Zap,
  BrainCircuit,
  Sparkles,
  TrendingUp,
  Target,
} from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 font-sans selection:bg-indigo-500/30">
      {/* 1. Hero Section with Enhanced Background */}
      <div className="relative overflow-hidden pt-20 pb-32 lg:pt-32 lg:pb-48">
        {/* Animated Background Glows - More Vibrant */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/30 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-screen filter blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse animation-delay-4000"></div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvZz48L3N2Zz4=')] opacity-20"></div>

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          {/* Badge with Glow */}
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 ring-1 ring-indigo-400/30 backdrop-blur-sm mb-8 shadow-lg shadow-indigo-500/20">
            <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
            Powered by Gemini AI
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-8 leading-tight">
            Resume Screening
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-gradient-x">
              Made Intelligent.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="max-w-3xl mx-auto text-xl md:text-2xl text-gray-300 leading-relaxed mb-12 font-light">
            Transform raw resumes into{" "}
            <span className="text-indigo-400 font-semibold">
              actionable insights
            </span>
            . Our AI-driven engine provides objective match scores, detects
            skill gaps, and simulates ATS behavior in{" "}
            <span className="text-purple-400 font-semibold">seconds</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <button
              className="group relative px-10 py-5 text-lg font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-2xl shadow-indigo-500/50 hover:shadow-indigo-500/70 hover:scale-105 transition-all duration-300 overflow-hidden"
              onClick={() => (window.location.href = "/analyze")}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              <span className="relative z-10 flex items-center gap-2">
                Start Screening Now
                <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
            </button>

            <button className="px-10 py-5 text-lg font-bold text-gray-200 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105">
              View Demo
            </button>
          </div>

          {/* Stats Bar */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-center">
            <StatItem number="10K+" label="Resumes Analyzed" />
            <StatItem number="95%" label="ATS Accuracy" />
            <StatItem number="<5s" label="Analysis Time" />
          </div>
        </div>
      </div>

      {/* 2. Features Bento Grid - Dark Theme */}
      <div className="max-w-7xl mx-auto px-6 py-24 border-t border-white/10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Why Choose <span className="text-indigo-400">AI Screener?</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Cutting-edge features designed for modern recruitment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<BrainCircuit className="w-7 h-7 text-indigo-400" />}
            title="AI Skill Intelligence"
            desc="Deep analysis of core vs. secondary skills using advanced LLM reasoning and pattern recognition."
            gradient="from-indigo-500/10 to-purple-500/10"
            borderColor="indigo-500/20"
            iconBg="indigo-500/10"
          />
          <FeatureCard
            icon={<ShieldCheck className="w-7 h-7 text-green-400" />}
            title="ATS Simulation"
            desc="Understand exactly why a resume gets filtered and receive optimization suggestions instantly."
            gradient="from-green-500/10 to-emerald-500/10"
            borderColor="green-500/20"
            iconBg="green-500/10"
          />
          <FeatureCard
            icon={<Zap className="w-7 h-7 text-yellow-400" />}
            title="Learning Roadmaps"
            desc="Bridge skill gaps with personalized resources, curated learning paths, and project ideas."
            gradient="from-yellow-500/10 to-orange-500/10"
            borderColor="yellow-500/20"
            iconBg="yellow-500/10"
          />
        </div>
      </div>

      {/* 3. How It Works Section */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            How It <span className="text-purple-400">Works</span>
          </h2>
          <p className="text-xl text-gray-400">Simple, fast, and intelligent</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ProcessStep
            number="01"
            title="Upload Resume"
            desc="Paste text or upload PDF/DOCX files with job description"
            icon={<Layout className="w-6 h-6" />}
          />
          <ProcessStep
            number="02"
            title="AI Analysis"
            desc="Our engine extracts skills, calculates matches, and simulates ATS"
            icon={<BrainCircuit className="w-6 h-6" />}
          />
          <ProcessStep
            number="03"
            title="Get Insights"
            desc="Receive detailed reports with actionable recommendations"
            icon={<TrendingUp className="w-6 h-6" />}
          />
        </div>
      </div>

      {/* 4. Social Proof - Enhanced */}
      <div className="bg-white/5 backdrop-blur-sm border-y border-white/10 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-gray-400 font-bold uppercase tracking-widest text-sm text-center mb-8">
            Trusted by Leading Companies
          </p>
          <div className="flex flex-wrap justify-around items-center gap-8 opacity-60">
            <span className="text-2xl font-black text-gray-400 hover:text-indigo-400 transition-colors">
              TechCorp
            </span>
            <span className="text-2xl font-black text-gray-400 hover:text-purple-400 transition-colors">
              InnovateLab
            </span>
            <span className="text-2xl font-black text-gray-400 hover:text-pink-400 transition-colors">
              FutureSoft
            </span>
            <span className="text-2xl font-black text-gray-400 hover:text-indigo-400 transition-colors">
              NextGen AI
            </span>
          </div>
        </div>
      </div>

      {/* 5. Footer */}
      <footer className="py-16 text-center border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-gray-400 mb-4">
            Built for recruiters and developers who value intelligent
            automation.
          </p>
          <p className="text-sm text-gray-500">
            Illustrations by{" "}
            <a
              href="#"
              className="underline hover:text-indigo-400 transition-colors"
            >
              Freepik
            </a>
            {" • "}
            Images by{" "}
            <a
              href="#"
              className="underline hover:text-purple-400 transition-colors"
            >
              Unsplash
            </a>
          </p>
          <div className="mt-8 flex justify-center gap-6">
            <a
              href="#"
              className="text-gray-500 hover:text-indigo-400 transition-colors text-sm font-medium"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-indigo-400 transition-colors text-sm font-medium"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-indigo-400 transition-colors text-sm font-medium"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Enhanced Feature Card Component
const FeatureCard = ({ icon, title, desc, gradient, borderColor, iconBg }) => (
  <div
    className={`group relative p-8 bg-gradient-to-br ${gradient} backdrop-blur-sm rounded-3xl border border-${borderColor} hover:border-white/30 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden`}
  >
    {/* Glow effect on hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

    <div
      className={`relative w-14 h-14 rounded-2xl bg-${iconBg} backdrop-blur-sm flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-lg`}
    >
      {icon}
    </div>

    <h3 className="relative text-2xl font-black text-white mb-3">{title}</h3>
    <p className="relative text-gray-400 leading-relaxed">{desc}</p>
  </div>
);

// New Process Step Component
const ProcessStep = ({ number, title, desc, icon }) => (
  <div className="relative group">
    <div className="flex flex-col items-center text-center">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm border border-indigo-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-xl shadow-indigo-500/20">
        {icon}
      </div>
      <span className="text-5xl font-black text-white/10 mb-4">{number}</span>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{desc}</p>
    </div>
  </div>
);

// New Stats Item Component
const StatItem = ({ number, label }) => (
  <div className="flex flex-col items-center">
    <span className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
      {number}
    </span>
    <span className="text-sm text-gray-400 font-medium mt-1">{label}</span>
  </div>
);

export { HomePage };
