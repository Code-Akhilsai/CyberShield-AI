import React, { useState, useRef, useEffect } from "react";
import {
  Shield,
  AlertTriangle,
  Activity,
  TrendingUp,
  ChevronRight,
} from "react-feather";
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
import { getStorage } from "firebase/storage";
import { app } from "./Firebase"; // your firebase init file

const db = getFirestore(app);
const storage = getStorage(app);

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
    console.log("📄 Selected file:", fileId);

    // Stop previous listener if any
    if (window.currentUnsubscribe) {
      window.currentUnsubscribe();
    }

    const docRef = doc(db, "model_jobs", fileId);
    const unsubscribe = onSnapshot(docRef, (snap) => {
      const data = snap.data();
      if (data?.result) {
        console.log("🧠 Live data received for:", fileId, data.result);
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

    // Save unsubscribe for cleanup
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

      console.log("✅ CSV uploaded to Firestore:", docRef.id);
      alert("File uploaded! Model will process it shortly.");

      // Auto-select the newly uploaded file
      handleFileSelect(docRef.id);
    } catch (error) {
      console.error("❌ Upload failed:", error);
      alert("Upload failed");
      setUploading(false);
    }
  };

  const handleUploadClick = () => fileInputRef.current.click();
  const handleDashboard = () => nav("/dashboard");

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 to-slate-800">
      <header className="bg-slate-800/50 backdrop-blur-xl border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-linear-to-br from-purple-500 to-cyan-500 p-2 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">
                  Threat Detection
                </h1>
                <p className="text-xs text-slate-400">
                  Real-time IoT Security Analysis
                </p>
              </div>
            </div>
            <button
              onClick={handleDashboard}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition text-sm"
            >
              Dashboard
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT PANEL */}
          <div className="lg:col-span-1">
            {/* Upload Section */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 mb-6">
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
            <div className="mt-6">
              <h4 className="text-sm text-slate-400 mb-2 font-semibold">
                Recent Uploads
              </h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {recentFiles.length > 0 ? (
                  recentFiles.map((file) => (
                    <div
                      key={file.id}
                      onClick={() => handleFileSelect(file.id)}
                      className={`flex items-center justify-between text-sm px-3 py-2 rounded-lg border cursor-pointer transition
                        ${
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
          </div>

          {/* RIGHT PANEL */}
          <div className="lg:col-span-2">
            {/* Live Detection Feed */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 mb-6">
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
                            Attack #{i + 1} — {res.name || "Unknown Attack"}
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

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm text-slate-400">Max Possibility</h4>
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <p className="text-3xl font-bold text-white mb-1">
                  {maxScore !== null ? maxScore : "--"}
                </p>
                <span className="text-slate-400 text-xs">Score</span>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm text-slate-400">Min Possibility</h4>
                  <Activity className="w-5 h-5 text-yellow-400" />
                </div>
                <p className="text-3xl font-bold text-white mb-1">
                  {minScore !== null ? minScore : "--"}
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
      </main>
    </div>
  );
};

export default ThreatDetectionPage;
