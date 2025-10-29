import { useState } from "react";
import {
  Shield,
  Activity,
  AlertTriangle,
  Network,
  Cpu,
  Database,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import DashboardPage from "./DashboardPage";
import ThreatDetectionPage from "./ThreatDetectionPage";
import LoginPage from "./Loginpage";
import SignupPage from "./SignupPage";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [currentPage, setCurrentPage] = useState("home");

  const login = useNavigate();
  const signup = useNavigate();

  const navigateToLogin = () => {
    login("/login");
  };

  const navigateToSignup = () => {
    signup("/signup");
  };
  // Home/Landing Page Component
  const HomePage = () => (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-linear-to-br from-purple-500 to-cyan-500 p-2 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                CyberShield AI
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <a
                href="#features"
                className="text-slate-300 hover:text-white transition text-sm font-medium"
              >
                Features
              </a>
              <a
                href="#architecture"
                className="text-slate-300 hover:text-white transition text-sm font-medium"
              >
                Architecture
              </a>
              <a
                href="#about"
                className="text-slate-300 hover:text-white transition text-sm font-medium"
              >
                About
              </a>
              <button
                onClick={() => navigateToLogin()}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition text-sm font-medium"
              >
                Login
              </button>
              <button
                onClick={() => navigateToSignup()}
                className="px-4 py-2 bg-linear-to-r from-purple-500 to-cyan-500 text-white rounded-lg hover:from-purple-600 hover:to-cyan-600 transition text-sm font-medium"
              >
                Signup
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>

        <div className="absolute top-40 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div
          className="absolute bottom-40 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-linear-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  AI-Powered
                </span>
                <br />
                <span className="text-white">Cyber Threat Hunting</span>
              </h1>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Next-generation security for 6G-enabled IoT networks using
                Generative AI, GAN and Transformer-based models with 95%
                detection accuracy.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigateToSignup()}
                  className="px-8 py-4 bg-linear-to-r from-purple-500 to-cyan-500 text-white rounded-lg hover:from-purple-600 hover:to-cyan-600 transition text-lg font-semibold shadow-lg shadow-purple-500/30"
                >
                  Signup
                </button>
                <button
                  onClick={() => navigateToLogin()}
                  className="px-8 py-4 bg-slate-800/50 backdrop-blur-xl border border-slate-700 text-white rounded-lg hover:bg-slate-700/50 transition text-lg font-semibold"
                >
                  Login
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-slate-800/30 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 shadow-2xl">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-linear-to-br from-purple-500 to-cyan-500 rounded-full blur-2xl opacity-50"></div>
                <div className="relative space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <div className="flex-1">
                      <p className="text-white font-semibold">System Active</p>
                      <p className="text-sm text-slate-400">
                        Monitoring 1,247 devices
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    <div className="flex-1">
                      <p className="text-white font-semibold">
                        DDoS_HTTP Detected
                      </p>
                      <p className="text-sm text-slate-400">
                        Source: 192.168.1.45
                      </p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded">
                      BLOCKED
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-orange-900/20 border border-orange-500/30 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-orange-400" />
                    <div className="flex-1">
                      <p className="text-white font-semibold">SQL_injection</p>
                      <p className="text-sm text-slate-400">
                        Source: 10.0.0.231
                      </p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-orange-500/20 text-orange-400 rounded">
                      BLOCKED
                    </span>
                  </div>
                  <div className="p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-400">
                        Detection Rate
                      </span>
                      <span className="text-sm font-semibold text-white">
                        95%
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-linear-to-r from-purple-500 to-cyan-500 h-2 rounded-full"
                        style={{ width: "95%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="relative py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-slate-400">
              Advanced AI-driven security for modern IoT networks
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-800/30 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 hover:border-purple-500/50 transition">
              <div className="bg-linear-to-br from-purple-500 to-pink-500 p-3 rounded-lg w-fit mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Real-time Detection
              </h3>
              <p className="text-slate-400">
                Continuous monitoring with instant threat identification using
                advanced AI algorithms.
              </p>
            </div>

            <div className="bg-slate-800/30 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition">
              <div className="bg-linear-to-br from-cyan-500 to-blue-500 p-3 rounded-lg w-fit mb-4">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                GAN + Transformer
              </h3>
              <p className="text-slate-400">
                Hybrid architecture combining GANs and Transformers for superior
                accuracy.
              </p>
            </div>

            <div className="bg-slate-800/30 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 hover:border-green-500/50 transition">
              <div className="bg-linear-to-br from-green-500 to-emerald-500 p-3 rounded-lg w-fit mb-4">
                <Network className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                6G IoT Ready
              </h3>
              <p className="text-slate-400">
                Optimized for next-generation 6G-enabled IoT network
                infrastructure.
              </p>
            </div>

            <div className="bg-slate-800/30 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 hover:border-orange-500/50 transition">
              <div className="bg-linear-to-br from-orange-500 to-red-500 p-3 rounded-lg w-fit mb-4">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Multi-Attack Detection
              </h3>
              <p className="text-slate-400">
                Identifies 15 different attack types including DDoS, malware,
                and injections.
              </p>
            </div>

            <div className="bg-slate-800/30 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 hover:border-yellow-500/50 transition">
              <div className="bg-linear-to-br from-yellow-500 to-orange-500 p-3 rounded-lg w-fit mb-4">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                95% Accuracy
              </h3>
              <p className="text-slate-400">
                Industry-leading detection accuracy validated on Edge-IIoT
                dataset.
              </p>
            </div>

            <div className="bg-slate-800/30 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 hover:border-purple-500/50 transition">
              <div className="bg-linear-to-br from-purple-500 to-cyan-500 p-3 rounded-lg w-fit mb-4">
                <Database className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Smart Analytics
              </h3>
              <p className="text-slate-400">
                Comprehensive dashboards with real-time insights and threat
                intelligence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section
        id="architecture"
        className="relative py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              System Architecture
            </h2>
            <p className="text-xl text-slate-400">
              4-tier architecture for comprehensive IoT security
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800/30 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 text-center">
              <div className="bg-linear-to-br from-blue-500 to-cyan-500 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Perception Layer
              </h3>
              <p className="text-sm text-slate-400">
                IoT devices, sensors, and data collection endpoints
              </p>
            </div>

            <div className="bg-slate-800/30 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 text-center">
              <div className="bg-linear-to-br from-purple-500 to-pink-500 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Network Layer
              </h3>
              <p className="text-sm text-slate-400">
                6G, Wi-Fi, Bluetooth connectivity protocols
              </p>
            </div>

            <div className="bg-slate-800/30 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 text-center">
              <div className="bg-linear-to-br from-green-500 to-emerald-500 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Edge Layer
              </h3>
              <p className="text-sm text-slate-400">
                Edge AI processing and real-time analysis
              </p>
            </div>

            <div className="bg-slate-800/30 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 text-center">
              <div className="bg-linear-to-br from-orange-500 to-red-500 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Cloud Layer
              </h3>
              <p className="text-sm text-slate-400">
                Centralized storage, management, and AI training
              </p>
            </div>
          </div>

          <div className="mt-12 bg-slate-800/30 backdrop-blur-xl rounded-xl p-8 border border-slate-700/50">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  GAN + Transformer Model
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-purple-500/20 p-2 rounded-lg mt-1">
                      <ChevronRight className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">
                        Generative Adversarial Network
                      </p>
                      <p className="text-sm text-slate-400">
                        Creates synthetic attack samples for robust training
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-cyan-500/20 p-2 rounded-lg mt-1">
                      <ChevronRight className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">
                        Transformer Architecture
                      </p>
                      <p className="text-sm text-slate-400">
                        Multi-head attention for pattern recognition
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-green-500/20 p-2 rounded-lg mt-1">
                      <ChevronRight className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">
                        Edge-IIoT Dataset
                      </p>
                      <p className="text-sm text-slate-400">
                        Trained on 441,371 samples across 15 classes
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-900/50 rounded-xl p-6">
                <h4 className="text-white font-semibold mb-4">
                  Performance Metrics
                </h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-300">Overall Accuracy</span>
                      <span className="text-white font-semibold">95.0%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-linear-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                        style={{ width: "95%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-300">Precision</span>
                      <span className="text-white font-semibold">95.0%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-linear-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                        style={{ width: "95%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-300">Recall</span>
                      <span className="text-white font-semibold">95.0%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-linear-to-r from-cyan-500 to-blue-500 h-2 rounded-full"
                        style={{ width: "95%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-300">F1-Score</span>
                      <span className="text-white font-semibold">94.0%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-linear-to-r from-orange-500 to-red-500 h-2 rounded-full"
                        style={{ width: "94%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="about"
        className="relative py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-purple-900/50 to-cyan-900/50"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Secure Your IoT Network?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Experience next-generation threat detection powered by AI. Start
            protecting your 6G-enabled IoT devices today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigateToSignup()}
              className="px-8 py-4 bg-linear-to-r from-purple-500 to-cyan-500 text-white rounded-lg hover:from-purple-600 hover:to-cyan-600 transition text-lg font-semibold shadow-lg shadow-purple-500/30"
            >
              Get started
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-4 sm:px-6 lg:px-8 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-400">
            © 2025 CyberShield AI - Generative AI for Cyber Threat-Hunting in
            6G-enabled IoT Networks
          </p>
        </div>
      </footer>
    </div>
  );

  // Render logic
  return (
    <>
      {currentPage === "home" && <HomePage />}
      {currentPage === "login" && <LoginPage setCurrentPage={setCurrentPage} />}
      {currentPage === "signup" && (
        <SignupPage setCurrentPage={setCurrentPage} />
      )}
      {currentPage === "dashboard" && (
        <DashboardPage setCurrentPage={setCurrentPage} />
      )}
      {currentPage === "detection" && (
        <ThreatDetectionPage setCurrentPage={setCurrentPage} />
      )}
    </>
  );
};

export default Home;
