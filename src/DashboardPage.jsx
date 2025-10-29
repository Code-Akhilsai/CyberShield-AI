import {
  Shield,
  AlertTriangle,
  Activity,
  TrendingUp,
  Network,
  Cpu,
  Database,
} from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./Firebase";

const DashboardPage = () => {
  const nav = useNavigate();

  // ✅ Redirect if not authenticated
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        nav("/", { replace: true });
      }
    });
    return unsubscribe;
  }, [nav]);

  // ✅ Optional: Disable back navigation while logged in
  useEffect(() => {
    const handlePopState = () => {
      if (auth.currentUser) {
        window.history.pushState(null, "", window.location.href);
      }
    };
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // ✅ Logout function
  const handleLogout = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem("isUserLoggedIn");
      nav("/", { replace: true }); // replaces dashboard history
      // optional hard reload to ensure complete cleanup:
      // window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const threatDetec = () => nav("/ThreatDetectionPage");

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 to-slate-800">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-xl border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-linear-to-br from-purple-500 to-cyan-500 p-2 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">CyberShield AI</h1>
                <p className="text-xs text-slate-400">
                  6G IoT Security Platform
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={threatDetec}
                className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition text-sm font-medium"
              >
                Threat Detection
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-500/20 p-3 rounded-lg">
                <Shield className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-xs font-medium text-green-400 bg-green-500/20 px-2 py-1 rounded">
                +12%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">323,129</h3>
            <p className="text-slate-400 text-sm">Normal Packets</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-red-500/20 p-3 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <span className="text-xs font-medium text-red-400 bg-red-500/20 px-2 py-1 rounded">
                +5%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">118,242</h3>
            <p className="text-slate-400 text-sm">Threats Detected</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-cyan-500/20 p-3 rounded-lg">
                <Activity className="w-6 h-6 text-cyan-400" />
              </div>
              <span className="text-xs font-medium text-cyan-400 bg-cyan-500/20 px-2 py-1 rounded">
                Live
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">95.0%</h3>
            <p className="text-slate-400 text-sm">Detection Accuracy</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-500/20 p-3 rounded-lg">
                <Network className="w-6 h-6 text-purple-400" />
              </div>
              <span className="text-xs font-medium text-purple-400 bg-purple-500/20 px-2 py-1 rounded">
                Active
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">1,247</h3>
            <p className="text-slate-400 text-sm">IoT Devices</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
            <h3 className="text-lg font-semibold text-white mb-4">
              Threat Distribution
            </h3>
            <div className="space-y-4">
              {[
                { name: "DDoS Attack", value: 35, color: "bg-red-500" },
                { name: "Malware", value: 25, color: "bg-orange-500" },
                { name: "SQL Injection", value: 20, color: "bg-yellow-500" },
                { name: "XSS", value: 12, color: "bg-purple-500" },
                { name: "Other", value: 8, color: "bg-cyan-500" },
              ].map((threat, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-300">{threat.name}</span>
                    <span className="text-slate-400">{threat.value}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className={`${threat.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${threat.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
            <h3 className="text-lg font-semibold text-white mb-4">
              Recent Threats
            </h3>
            <div className="space-y-3">
              {[
                { type: "DDoS_HTTP", severity: "high", time: "2 min ago" },
                {
                  type: "SQL_injection",
                  severity: "critical",
                  time: "5 min ago",
                },
                {
                  type: "Port_Scanning",
                  severity: "medium",
                  time: "12 min ago",
                },
                { type: "Backdoor", severity: "high", time: "18 min ago" },
                { type: "XSS", severity: "medium", time: "23 min ago" },
              ].map((threat, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        threat.severity === "critical"
                          ? "bg-red-500"
                          : threat.severity === "high"
                          ? "bg-orange-500"
                          : "bg-yellow-500"
                      }`}
                    ></div>
                    <div>
                      <p className="text-white text-sm font-medium">
                        {threat.type}
                      </p>
                      <p className="text-slate-400 text-xs">{threat.time}</p>
                    </div>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      threat.severity === "critical"
                        ? "bg-red-500/20 text-red-400"
                        : threat.severity === "high"
                        ? "bg-orange-500/20 text-orange-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {threat.severity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Model Info */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
          <h3 className="text-lg font-semibold text-white mb-4">
            AI Model Performance
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-4">
              <div className="bg-linear-to-br from-purple-500 to-cyan-500 p-3 rounded-lg">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  GAN + Transformer
                </p>
                <p className="text-slate-400 text-sm">Architecture</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-linear-to-br from-green-500 to-emerald-500 p-3 rounded-lg">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">441,371</p>
                <p className="text-slate-400 text-sm">Training Samples</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-linear-to-br from-orange-500 to-red-500 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">15 Classes</p>
                <p className="text-slate-400 text-sm">Attack Types</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
