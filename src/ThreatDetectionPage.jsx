import React, { useState, useRef, useEffect } from "react";
import { Shield, AlertTriangle, Activity, TrendingUp } from "react-feather";
import { useNavigate } from "react-router-dom";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { app } from "./Firebase";
import { Network, Cpu, Database } from "lucide-react";
import { auth } from "./Firebase";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const db = getFirestore(app);

const ThreatDetectionPage = () => {
  const nav = useNavigate();
  const fileInputRef = useRef(null);

  // 🔥 States
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState([]);
  const [maxScore, setMaxScore] = useState(null);
  const [minScore, setMinScore] = useState(null);
  const [recentFiles, setRecentFiles] = useState([]);
  const [selectedFileId, setSelectedFileId] = useState(null);

  // ✅ SAFE back navigation handling
  useEffect(() => {
    const handlePopState = () => {
      if (!auth.currentUser) {
        nav("/home", { replace: true });
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [nav]);

  // 🕒 Fetch last 5 uploaded files
  useEffect(() => {
    const q = query(
      collection(db, "model_jobs"),
      orderBy("createdAt", "desc"),
      limit(5)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const files = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecentFiles(files);
    });
    return () => unsubscribe();
  }, []);

  // 🧠 When user clicks a recent file → show its live feed
  const handleFileSelect = (fileId) => {
    setUploading(true);
    setSelectedFileId(fileId);
    if (window.currentUnsubscribe) window.currentUnsubscribe();

    const docRef = doc(db, "model_jobs", fileId);
    const unsubscribe = onSnapshot(docRef, (snap) => {
      const data = snap.data();
      if (data?.result) {
        setResults(data.result);
        const scores = data.result.map((r) => r.score);
        setMaxScore(Math.max(...scores).toFixed(2));
        setMinScore(Math.min(...scores).toFixed(2));
        setUploading(false);
      } else {
        setResults([]);
        setMaxScore(null);
        setMinScore(null);
      }
    });
    window.currentUnsubscribe = unsubscribe;
  };

  // 📁 Handle new CSV upload
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      alert("Please upload a valid CSV file.");
      return;
    }

    try {
      setUploading(true);
      const text = await file.text();
      const docRef = await addDoc(collection(db, "model_jobs"), {
        filename: file.name,
        csvText: text,
        status: "pending",
        result: null,
        createdAt: new Date(),
      });
      alert("File uploaded! Model will process it shortly.");
      handleFileSelect(docRef.id);
    } catch (error) {
      console.error("❌ Upload failed:", error);
      alert("Upload failed");
      setUploading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem("isUserLoggedIn");
      nav("/home", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleUploadClick = () => fileInputRef.current.click();

  // 🧠 All possible attack names
  const attackNames = [
    "Backdoor",
    "Vulnerability_scanner",
    "DDoS_ICMP",
    "Password",
    "Port_Scanning",
    "DDoS_UDP",
    "Uploading",
    "DDoS_HTTP",
    "SQL_injection",
    "Ransomware",
    "DDoS_TCP",
    "XSS",
    "MITM",
    "Fingerprinting",
  ];

  const recentThreats = [
    { type: "Backdoor", severity: "high", time: "3 min ago" },
    { type: "Vulnerability_scanner", severity: "medium", time: "6 min ago" },
    { type: "DDoS_ICMP", severity: "high", time: "8 min ago" },
    { type: "Password", severity: "medium", time: "10 min ago" },
    { type: "Port_Scanning", severity: "medium", time: "12 min ago" },
    { type: "DDoS_UDP", severity: "high", time: "14 min ago" },
    { type: "Uploading", severity: "low", time: "16 min ago" },
    { type: "DDoS_HTTP", severity: "high", time: "18 min ago" },
    { type: "SQL_injection", severity: "critical", time: "20 min ago" },
    { type: "Ransomware", severity: "critical", time: "22 min ago" },
    { type: "DDoS_TCP", severity: "high", time: "24 min ago" },
    { type: "XSS", severity: "medium", time: "26 min ago" },
    { type: "MITM", severity: "high", time: "28 min ago" },
    { type: "Fingerprinting", severity: "low", time: "30 min ago" },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 to-slate-800">
      {/* HEADER */}
      <header className="bg-slate-800/50 backdrop-blur-xl border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-linear-to-br from-purple-500 to-cyan-500 p-2 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">CyberShield</h1>
              <p className="text-xs text-slate-400">6G IoT Security Platform</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT PANEL */}
          <div className="lg:col-span-1 space-y-6">
            {/* Upload Section */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-4">
                Detection Control
              </h3>
              <input
                type="file"
                accept=".csv"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <button
                onClick={handleUploadClick}
                disabled={uploading}
                className="w-full bg-linear-to-r from-green-500 to-emerald-500 text-white font-semibold py-3 rounded-lg hover:from-green-600 hover:to-emerald-600 transition shadow-lg"
              >
                {uploading ? "Processing..." : "Upload CSV"}
              </button>
            </div>

            {/* Recent Uploads */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
              <h4 className="text-sm text-slate-400 mb-2 font-semibold">
                Recent Uploads
              </h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {recentFiles.length > 0 ? (
                  recentFiles.map((file) => (
                    <div
                      key={file.id}
                      onClick={() => handleFileSelect(file.id)}
                      className={`flex items-center justify-between text-sm px-3 py-2 rounded-lg border cursor-pointer transition ${
                        selectedFileId === file.id
                          ? "bg-slate-600/40 border-cyan-500/30"
                          : "bg-slate-700/30 border-slate-700/50 hover:bg-slate-700/50"
                      }`}
                    >
                      <span className="text-slate-200 truncate w-2/3">
                        {file.filename}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          file.status === "completed"
                            ? "bg-green-500/20 text-green-400"
                            : file.status === "pending"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-slate-500/20 text-slate-400"
                        }`}
                      >
                        {file.status || "unknown"}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500 text-sm">No uploads yet.</p>
                )}
              </div>
            </div>

            {/* Stats Section (Stacked Vertically) */}
            <div className="flex flex-col gap-6">
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm text-slate-400">Max Possibility</h4>
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <p className="text-3xl font-bold text-white mb-1">
                  {maxScore ?? "--"}
                </p>
                <span className="text-slate-400 text-xs">Score</span>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm text-slate-400">Min Possibility</h4>
                  <Activity className="w-5 h-5 text-yellow-400" />
                </div>
                <p className="text-3xl font-bold text-white mb-1">
                  {minScore ?? "--"}
                </p>
                <span className="text-slate-400 text-xs">Score</span>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm text-slate-400">Accuracy</h4>
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                </div>
                <p className="text-3xl font-bold text-white mb-1">95%</p>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="lg:col-span-2">
            {/* Live Detection Feed */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Live Detection Feed
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {results.length > 0 ? (
                  results.map((res, i) => {
                    const severity =
                      res.score > 4
                        ? "critical"
                        : res.score > 2
                        ? "medium"
                        : "safe";
                    return (
                      <div
                        key={i}
                        className={`p-4 rounded-lg border transition-all hover:shadow-lg ${
                          severity === "critical"
                            ? "bg-red-900/20 border-red-500/30"
                            : severity === "medium"
                            ? "bg-yellow-900/20 border-yellow-500/30"
                            : "bg-green-900/20 border-green-500/30"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">
                            {res.name || attackNames[i] || `Attack #${i + 1}`}
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded font-medium ${
                              severity === "critical"
                                ? "bg-red-500/20 text-red-400"
                                : severity === "medium"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-green-500/20 text-green-400"
                            }`}
                          >
                            {severity.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-white text-sm">Score: {res.score}</p>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-slate-500 text-sm italic">
                    No results yet. Upload or select a file to see detections.
                  </p>
                )}
              </div>
            </div>

            {/* 📊 Live Detection Graph */}
            {results.length > 0 && (
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 mt-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Live Attack Scores Graph
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={results.map((r, i) => ({
                        name: r.name || attackNames[i] || `Attack ${i + 1}`,
                        score: r.score,
                      }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                      <XAxis
                        dataKey="name"
                        tick={{ fill: "#94a3b8", fontSize: 12 }}
                        interval={0}
                        angle={-30}
                        textAnchor="end"
                      />
                      <YAxis
                        tick={{ fill: "#94a3b8" }}
                        domain={[0, 5]}
                        label={{
                          value: "Score",
                          angle: -90,
                          position: "insideLeft",
                          fill: "#94a3b8",
                        }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1e293b",
                          border: "none",
                        }}
                        labelStyle={{ color: "#e2e8f0" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#38bdf8"
                        strokeWidth={2}
                        dot={{ r: 4, stroke: "#0ea5e9", strokeWidth: 2 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recent Threats */}
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 mt-10">
          <h3 className="text-lg font-semibold text-white mb-4">
            Recent Threats
          </h3>
          <div className="space-y-3">
            {recentThreats.map((threat, index) => (
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

        {/* Model Info */}
        <div className="mt-6 bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
          <h3 className="text-lg font-semibold text-white mb-4">
            GAN + Transformer Model Architecture
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-purple-400 mb-3">
                Generator Network
              </h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>Generates synthetic attack samples for training</li>
                <li>Random noise vector input transformation</li>
                <li>Adversarial training for robust detection</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-cyan-400 mb-3">
                Transformer Architecture
              </h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>Multi-head attention for pattern recognition</li>
                <li>15-class classification (1 Normal + 14 Attack types)</li>
                <li>95% accuracy on Edge-IIoT dataset</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Model Performance */}
        <div className="mt-6 bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
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

export default ThreatDetectionPage;
