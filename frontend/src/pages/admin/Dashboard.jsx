import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiDownload,
  FiUsers,
  FiLogOut,
  FiAlertTriangle,
  FiMessageSquare,
  FiX,
  FiSend,
} from "react-icons/fi";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = ["#FBBF24", "#3B82F6", "#10B981", "#EF4444"];

// Chatbot component
const AIChatBot = ({ stats, categoryData, complaints }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your Nagarsaathi assistant. How can I help you with complaint management today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getAIResponse = async (message) => {
    setIsLoading(true);

    try {
      // In a real implementation, you would call your backend API
      const response = await fetch('http://localhost:5000/api/chatbot/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          context: {
            stats: stats,
            categoryData: categoryData,
            complaints: complaints
          }
        }),
      });

      if (!response.ok) {
        throw new Error('API response error');
      }

      const data = await response.json();
      return data.reply;
    } catch (error) {
      console.error('Error calling AI API:', error);
      const lowerMessage = message.toLowerCase();
      if (lowerMessage.includes('total') && lowerMessage.includes('complaint')) {
        return `There are ${stats.total} total complaints in the system.`;
      } else if (lowerMessage.includes('pending')) {
        return `Currently, ${stats.pending} complaints are pending review.`;
      } else if (lowerMessage.includes('resolved')) {
        return `Great news! ${stats.resolved} complaints have been resolved.`;
      } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        return "Hello! How can I assist you with Nagarsaathi today?";
      } else {
        return "I'm experiencing technical difficulties. Please try again later.";
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");

    // Get AI response
    const botResponseText = await getAIResponse(inputMessage);

    const botResponse = {
      id: messages.length + 2,
      text: botResponseText,
      sender: "bot",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, botResponse]);
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "Total complaints?",
    "Pending complaints?",
    "How to update status?",
    "Export reports?",
    "Most common issue?"
  ];

  return (
    <>
      {/* Chatbot toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg z-50 flex items-center justify-center hover:bg-blue-700 transition-colors"
      >
        {isOpen ? <FiX size={24} /> : <FiMessageSquare size={24} />}
      </button>

      {/* Chatbot window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 h-96 bg-white rounded-lg shadow-xl z-50 flex flex-col border border-gray-200">
          {/* Header */}
          <div className="bg-blue-600 text-white p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Nagarsaathi Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="text-white">
              <FiX size={18} />
            </button>
          </div>

          {/* Messages container */}
          <div className="flex-1 overflow-y-auto p-3 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-3 ${message.sender === "user" ? "text-right" : ""}`}
              >
                <div
                  className={`inline-block p-2 rounded-lg max-w-xs ${
                    message.sender === "user"
                      ? "bg-blue-100 text-blue-900"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {message.text}
                </div>
                <div
                  className={`text-xs mt-1 text-gray-500 ${
                    message.sender === "user" ? "text-right" : ""
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-left mb-3">
                <div className="inline-block p-2 rounded-lg bg-gray-200 text-gray-800">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce mr-1"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce mr-1" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick questions */}
          <div className="p-2 bg-gray-100 border-t border-gray-200">
            <div className="text-xs text-gray-500 mb-1">Quick questions:</div>
            <div className="flex flex-wrap gap-1">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="bg-white border border-gray-300 rounded-full px-2 py-1 text-xs text-gray-600 hover:bg-blue-100 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Input area */}
          <div className="p-3 border-t border-gray-200 flex">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={inputMessage.trim() === "" || isLoading}
              className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors flex items-center justify-center"
            >
              <FiSend size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
    rejected: 0,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterWard, setFilterWard] = useState("");
 const [wardWarning, setWardWarning] = useState("");
  const [categoryWarning, setCategoryWarning] = useState("");
  const WARD_THRESHOLD = 5; 
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      if (parsedUser.role === "admin") {
        fetchComplaints();
      } else {
        navigate("/home");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);
 useEffect(() => {
    // Compute top ward and category and update warning states after complaints are set
    if (complaints.length === 0) {
      setWardWarning("");
      setCategoryWarning("");
      return;
    }

    // Count by ward
    const wardCount = {};
    complaints.forEach(c => {
      const ward = c.user?.ward || c.ward || "Unknown";
      if (!wardCount[ward]) wardCount[ward] = 0;
      wardCount[ward]++;
    });

    const maxWard = Object.entries(wardCount).sort((a, b) => b[1] - a[1])[0];
    if (maxWard && maxWard[1] > WARD_THRESHOLD) {
      setWardWarning(`Warning: Ward "${maxWard[0]}" has high complaints (${maxWard[1]}).`);
    } else {
      setWardWarning("");
    }

    // Count by category
    const categoryCount = {};
    complaints.forEach(c => {
      const cat = c.category || "Unknown";
      if (!categoryCount[cat]) categoryCount[cat] = 0;
      categoryCount[cat]++;
    });
    const maxCat = Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0];
    if (maxCat) {
      setCategoryWarning(`Most complaints are about "${maxCat[0]}" (${maxCat[1]} total).`);
    } else {
      setCategoryWarning("");
    }

  }, [complaints]);
  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/complaints", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const complaintsData = data.complaints || [];
        setComplaints(complaintsData);

        setStats({
          total: complaintsData.length,
          pending: complaintsData.filter((c) => c.status === "Pending").length,
          inProgress: complaintsData.filter((c) => c.status === "In Progress").length,
          resolved: complaintsData.filter((c) => c.status === "Resolved").length,
          rejected: complaintsData.filter((c) => c.status === "Rejected").length,
        });
      }
    } catch (error) {
      console.error("Error fetching complaints:", error);
    } finally {
      setLoading(false);
    }
  };

  // Only deletes on update to "Resolved"
  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/complaints/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // If resolved, delete the complaint (permanent removal)
        if (newStatus === "Resolved") {
          const deleteRes = await fetch(`http://localhost:5000/api/complaints/${id}`, {
            method: "DELETE",
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          });
          if (!deleteRes.ok) {
            alert("Error deleting resolved complaint.");
          }
        }
        fetchComplaints(); // Refresh after status change or deletion
      }
    } catch (err) {
      alert("Error updating status");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleExport = () => {
    const exportData = complaints.map((c) => ({
      ID: c._id,
      Title: c.title,
      Category: c.category,
      Status: c.status,
      Priority: c.priority,
      Location: c.location,
      // Gracefully handle both user and public complaints
      "User Name": c.user?.name || c.submittedBy || "Unknown",
      "User Ward": c.user?.ward || c.ward || "Unknown",
      "Date Filed": new Date(c.createdAt).toLocaleDateString(),
    }));

    if (exportData.length === 0) return;

    const headers = Object.keys(exportData[0]).join(",");
    const rows = exportData.map((obj) =>
      Object.values(obj)
        .map((val) => (typeof val === "string" && val.includes(",") ? `"${val}"` : val))
        .join(",")
    );

    const csvData = [headers, ...rows].join("\n");
    const blob = new Blob([csvData], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `complaints_report_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Resolved":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-800";
      case "High":
        return "bg-orange-100 text-orange-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const pieData = [
    { name: "Pending", value: stats.pending },
    { name: "In Progress", value: stats.inProgress },
    { name: "Resolved", value: stats.resolved },
    { name: "Rejected", value: stats.rejected },
  ];

  const categoryData = Object.entries(
    complaints.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const filteredComplaints = complaints.filter((c) => {
    // Support both user and public complaints
    const userName = c.user?.name || c.submittedBy || '';
    const userWard = c.user?.ward || c.ward || '';

    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      userName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus ? c.status === filterStatus : true;
    const matchesCategory = filterCategory ? c.category === filterCategory : true;
    const matchesWard = filterWard ? userWard === filterWard : true;

    return matchesSearch && matchesStatus && matchesCategory && matchesWard;
  });

  if (!user) return <div>Loading...</div>;

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      {(wardWarning || categoryWarning) && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4 rounded flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <FiAlertTriangle className="text-yellow-600" />
            <span className="font-semibold text-yellow-800">Attention Required:</span>
          </div>
          {wardWarning && (
            <div className="text-yellow-700">{wardWarning}  
              <span className="block text-xs text-gray-600">
                [Tip: Investigate this ward for root causes. Launch awareness campaigns, improve complaint redressal, or organize ward-level meetings.]
              </span>
            </div>
          )}

          {categoryWarning && (
            <div className="text-yellow-700">{categoryWarning}
              <span className="block text-xs text-gray-600">
                [Tip: Analyze root causes in category, allocate more resources, run category-specific workshops, or consult department experts.]
              </span>
            </div>
          )}
        </div>
      )}
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.name}!</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleExport}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <FiDownload /> Export Report
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[{ label: "Total", value: stats.total, icon: <FiAlertCircle /> },
          { label: "Pending", value: stats.pending, icon: <FiClock />, color: "text-yellow-600" },
          { label: "In Progress", value: stats.inProgress, icon: <FiUsers />, color: "text-blue-600" },
          { label: "Resolved", value: stats.resolved, icon: <FiCheckCircle />, color: "text-green-600" },
          { label: "Rejected", value: stats.rejected, icon: <FiAlertTriangle />, color: "text-red-600" },
        ].map((card) => (
          <div key={card.label} className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">{card.label}</p>
              <p className={`text-2xl font-bold ${card.color || "text-gray-800"}`}>{card.value}</p>
            </div>
            <div className="p-2 bg-gray-100 rounded-full">{card.icon}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="flex flex-wrap gap-4">
        {/* Pie Chart */}
        <div className="bg-white rounded-xl shadow p-4 w-full lg:w-[48%]">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Complaints by Status</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100} label>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-xl shadow p-4 w-full lg:w-[48%]">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Complaints by Category</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mt-4">
        <input
          type="text"
          placeholder="Search by title or user"
          className="border p-2 rounded w-full max-w-xs"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select className="border p-2 rounded" onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Rejected">Rejected</option>
        </select>
        <select className="border p-2 rounded" onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="">All Categories</option>
          {[...new Set(complaints.map((c) => c.category))].map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
        <select className="border p-2 rounded" onChange={(e) => setFilterWard(e.target.value)}>
          <option value="">All Wards</option>
          {[...new Set(complaints
            .map((c) => c.user?.ward || c.ward || 'No Ward')
            .filter(ward => ward && ward !== 'No Ward')
          )].map((ward) => (
            <option key={ward} value={ward}>{ward}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-4 bg-white rounded-xl shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["User", "Complaint", "Category", "Priority", "Location", "Status", "Date"].map((h) => (
                <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredComplaints.map((c) => (
              <tr key={c._id}>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {c.user?.name || c.submittedBy || 'Unknown User'}<br />
                  <span className="text-xs text-gray-500">{c.user?.ward || c.ward || 'No Ward'}</span>
                </td>
                <td className="px-6 py-4 text-sm">
                  {c.title}<br /><span className="text-xs text-gray-500">{c.description}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{c.category}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(c.priority)}`}>
                    {c.priority}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{c.location}</td>
                <td className="px-6 py-4 text-sm">
                  <select
                    value={c.status}
                    onChange={(e) => handleStatusChange(c._id, e.target.value)}
                    className={`rounded-full px-3 py-1 text-xs ${getStatusColor(c.status)}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{new Date(c.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add the chatbot component */}
      <AIChatBot stats={stats} categoryData={categoryData} complaints={complaints} />
    </div>
  );
};

export default AdminDashboard;
