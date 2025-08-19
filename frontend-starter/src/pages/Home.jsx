// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const features = [
    {
      icon: "🤖",
      title: "AI-Powered Business Intelligence",
      description: "Smart insights, meeting summaries, and productivity analytics that Discord doesn't provide",
      color: "from-emerald-500 to-teal-500",
      category: "ai-feature"
    },
    {
      icon: "🔒",
      title: "Enterprise Security & Compliance",
      description: "End-to-end encryption, audit trails, and compliance features for business use",
      color: "from-red-500 to-orange-500",
      category: "security-feature"
    },
    {
      icon: "📊",
      title: "Advanced Analytics Dashboard",
      description: "Team performance metrics, communication patterns, and ROI tracking",
      color: "from-blue-500 to-indigo-500",
      category: "ai-feature"
    },
    {
      icon: "🔗",
      title: "Business Process Integration",
      description: "Seamless CRM, project management, and workflow automation",
      color: "from-purple-500 to-pink-500",
      category: "integration-feature"
    }
  ];

  const businessMetrics = [
    { label: "Productivity Increase", value: "+35%", description: "Through AI insights" },
    { label: "Security Score", value: "98%", description: "Enterprise-grade protection" },
    { label: "Compliance", value: "100%", description: "GDPR, HIPAA, SOX ready" },
    { label: "Integration", value: "8+", description: "Business tools connected" }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-full flex flex-col items-center justify-start p-8 relative overflow-y-auto">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-blue-900/20 to-indigo-900/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl floating-animation"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl floating-animation" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-purple-500/10 rounded-full blur-3xl floating-animation" style={{ animationDelay: '4s' }}></div>

      <div className="relative z-10 text-center max-w-6xl w-full">
                 {/* Main Title */}
         <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
           <h1 className="text-6xl md:text-7xl font-black mb-6 text-white leading-tight">
             Enterprise Hub
           </h1>
           <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
             Professional team collaboration with AI-powered insights, enterprise security, and business process integration
           </p>
         </div>

        {/* Value Proposition */}
        <div className={`mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">✓</div>
                  <div>
                    <h3 className="font-semibold text-white">AI-Powered Insights</h3>
                    <p className="text-white/70 text-sm">Automatic meeting summaries, productivity analytics, and smart recommendations</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">✓</div>
                  <div>
                    <h3 className="font-semibold text-white">Enterprise Security</h3>
                    <p className="text-white/70 text-sm">End-to-end encryption, compliance features, and audit trails</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">✓</div>
                  <div>
                    <h3 className="font-semibold text-white">Business Integration</h3>
                    <p className="text-white/70 text-sm">CRM, project management, and workflow automation</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">✓</div>
                  <div>
                    <h3 className="font-semibold text-white">Real-time Communication</h3>
                    <p className="text-white/70 text-sm">Instant messaging with professional team channels</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">✓</div>
                  <div>
                    <h3 className="font-semibold text-white">Advanced Analytics</h3>
                    <p className="text-white/70 text-sm">Team performance metrics and communication insights</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">✓</div>
                  <div>
                    <h3 className="font-semibold text-white">Task Management</h3>
                    <p className="text-white/70 text-sm">Integrated project tracking and team coordination</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Showcase */}
        <div className={`mb-12 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative">
            <div className={`bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl ${features[currentFeature].category}`}>
              <div className="text-6xl mb-4 transition-all duration-500">
                {features[currentFeature].icon}
              </div>
              <h3 className={`text-2xl font-bold mb-3 bg-gradient-to-r ${features[currentFeature].color} bg-clip-text text-transparent`}>
                {features[currentFeature].title}
              </h3>
              <p className="text-white/70 text-lg">
                {features[currentFeature].description}
              </p>
            </div>
            
            {/* Feature Indicators */}
            <div className="flex justify-center space-x-2 mt-6">
              {features.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentFeature 
                      ? 'bg-white scale-125' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Link
            to="/dashboard"
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/25 hover:scale-105 transition-all duration-300 text-lg"
          >
            🚀 Get Started
          </Link>
          <Link
            to="/tasks"
            className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-2xl backdrop-blur-xl hover:scale-105 transition-all duration-300 text-lg"
          >
            📋 View Demo
          </Link>
        </div>

        {/* Business Metrics */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {businessMetrics.map((metric, index) => (
            <div key={index} className="metric-card">
              <div className="text-center">
                <div className="text-4xl font-black gradient-text mb-2">{metric.value}</div>
                <div className="font-semibold text-white mb-1">{metric.label}</div>
                <div className="text-sm text-white/60">{metric.description}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise Ready Badge */}
        <div className={`mb-16 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/50 rounded-2xl backdrop-blur-xl">
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-emerald-400 font-semibold">Enterprise Ready</span>
          </div>
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    </div>
  );
};

export default Home;
