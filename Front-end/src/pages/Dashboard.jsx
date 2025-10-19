import React, { useState } from 'react';
import {
  Home, TrendingUp, Star, Upload, User, Search, Grid, List,
  Eye, Download, Heart, Calendar, Users, FileText, Menu, X,
  Mail, BookOpen, Award, Settings, Plus, Camera, Trophy, Target,
  Activity, Zap, BookMarked, GraduationCap, Code, Brain, MapPin,
  Phone, Linkedin, Github, Twitter, Edit, Share2, CheckCircle
} from 'lucide-react';

const Dashboard = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [favorites, setFavorites] = useState([1, 3]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    subject: 'Data Structures',
    semester: '3rd Sem',
    description: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: "Harsh Koundal",
    course: "B.Tech Computer Science - 3rd Year",
    location: "Baddi, Himachal Pradesh, India",
    email: "harsh@example.com",
    phone: "+91 98765 43210",
    github: "github.com/harsh",
  });

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);

  const [studyMaterials, setStudyMaterials] = useState([
    {
      id: 1,
      title: 'Data Structures Complete Notes',
      subject: 'Data Structures',
      semester: '3rd Sem',
      description: 'Comprehensive notes covering arrays, linked lists, trees, and graphs.',
      author: 'Harsh Koundal',
      date: 'Oct 12, 2025',
      downloads: 120,
      views: 450,
      rating: 4.8,
    },
    {
      id: 2,
      title: 'Operating Systems - Process Management',
      subject: 'Operating Systems',
      semester: '4th Sem',
      description: 'Detailed notes on process scheduling, algorithms, and synchronization.',
      author: 'Priya Sharma',
      date: 'Sep 25, 2025',
      downloads: 89,
      views: 320,
      rating: 4.5,
    },
    {
      id: 3,
      title: 'Database Management Systems',
      subject: 'DBMS',
      semester: '3rd Sem',
      description: 'Complete DBMS notes covering SQL, normalization, and transactions.',
      author: 'Rahul Verma',
      date: 'Sep 30, 2025',
      downloads: 156,
      views: 580,
      rating: 4.9,
    },
    {
      id: 4,
      title: 'Computer Networks - TCP/IP',
      subject: 'Computer Networks',
      semester: '5th Sem',
      description: 'In-depth coverage of TCP/IP protocol suite and OSI layers.',
      author: 'Ankit Singh',
      date: 'Oct 5, 2025',
      downloads: 93,
      views: 380,
      rating: 4.6,
    },
    {
      id: 5,
      title: 'Machine Learning Basics',
      subject: 'Machine Learning',
      semester: '6th Sem',
      description: 'Fundamentals of ML including supervised and unsupervised learning.',
      author: 'Neha Patel',
      date: 'Oct 10, 2025',
      downloads: 142,
      views: 520,
      rating: 4.7,
    },
    {
      id: 6,
      title: 'Algorithms Design and Analysis',
      subject: 'Algorithms',
      semester: '4th Sem',
      description: 'Complete guide to algorithm design paradigms and complexity.',
      author: 'Mohit Kumar',
      date: 'Sep 20, 2025',
      downloads: 108,
      views: 410,
      rating: 4.4,
    },
  ]);

  const userActivity = [
    { action: 'Uploaded', material: 'Data Structures Complete Notes', time: '2 days ago', icon: Upload },
    { action: 'Downloaded', material: 'Machine Learning Basics', time: '3 days ago', icon: Download },
    { action: 'Favorited', material: 'Database Management Systems', time: '5 days ago', icon: Heart },
    { action: 'Shared', material: 'Operating Systems Notes', time: '1 week ago', icon: Share2 },
  ];

  const achievements = [
    { title: 'First Upload', description: 'Upload your first study material', icon: Upload, unlocked: true },
    { title: 'Knowledge Sharer', description: 'Get 100 downloads', icon: Award, unlocked: true },
    { title: 'Popular Creator', description: 'Get 500 total downloads', icon: Trophy, unlocked: true },
    { title: 'Community Helper', description: 'Help 50 students', icon: Users, unlocked: false },
    { title: 'Expert Contributor', description: 'Upload 25 materials', icon: Star, unlocked: false },
    { title: 'Top Rated', description: 'Maintain 4.5 rating', icon: Target, unlocked: true },
  ];

  const subjects = ['All Subjects', 'Data Structures', 'Operating Systems', 'DBMS', 'Computer Networks', 'Machine Learning', 'Algorithms'];

  const getFilteredMaterials = () => {
    let materials = studyMaterials;

    if (activeTab === 'Favorites') {
      materials = materials.filter((m) => favorites.includes(m.id));
    } else if (activeTab === 'Popular') {
      materials = [...materials].sort((a, b) => b.downloads - a.downloads);
    } else if (activeTab === 'My Uploads') {
      materials = materials.filter((m) => m.author === 'Harsh Koundal');
    }

    return materials.filter((m) => {
      const matchesSubject =
        selectedSubject === 'All Subjects' || m.subject === selectedSubject;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        m.title.toLowerCase().includes(q) ||
        m.subject.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q);
      return matchesSubject && matchesSearch;
    });
  };

  const filteredMaterials = getFilteredMaterials();

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const handleUpload = () => {
    if (!uploadForm.title || !uploadForm.description) return;

    const newMaterial = {
      id: studyMaterials.length + 1,
      title: uploadForm.title,
      subject: uploadForm.subject,
      semester: uploadForm.semester,
      description: uploadForm.description,
      author: 'Harsh Koundal',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      downloads: 0,
      views: 0,
      rating: 0,
    };
    setStudyMaterials([newMaterial, ...studyMaterials]);
    setUploadModal(false);
    setUploadForm({ title: '', subject: 'Data Structures', semester: '3rd Sem', description: '' });
    setActiveTab('My Uploads');
  };

  const handleDownload = (material) => {
    setStudyMaterials((materials) =>
      materials.map((m) => (m.id === material.id ? { ...m, downloads: m.downloads + 1 } : m))
    );
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sidebarItems = [
    { icon: Home, label: 'Dashboard' },
    { icon: TrendingUp, label: 'Popular' },
    { icon: Star, label: 'Favorites' },
    { icon: Upload, label: 'My Uploads' },
    { icon: User, label: 'Profile' },
  ];

  const NavigationCard = ({ icon: Icon, title, description, onClick, gradient }) => (
    <button
      onClick={onClick}
      className="bg-white rounded-2xl border-2 border-gray-200 p-6 hover:border-transparent hover:shadow-2xl transition-all duration-300 text-left group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${gradient} group-hover:scale-110 transition-transform`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-gray-600">→</span>
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </button>
  );

  const StatCard = ({ icon, label, value, color }) => {
  const colors = {
    blue: "from-blue-50 to-blue-100 border-blue-200 text-blue-600",
    green: "from-green-50 to-green-100 border-green-200 text-green-600",
    purple: "from-purple-50 to-purple-100 border-purple-200 text-purple-600",
    orange: "from-orange-50 to-orange-100 border-orange-200 text-orange-600",
    gray: "from-gray-50 to-gray-100 border-gray-200 text-gray-600",
  };

  const colorClasses = colors[color] || colors.gray;
  const textColorClass = colorClasses.split(" ")[3] || "text-gray-600"; // safer

  return (
    <div
      className={`bg-gradient-to-br ${colorClasses} rounded-xl p-4 border-2 transition hover:shadow-md`}
    >
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="font-semibold text-gray-900 text-sm">{label}</span>
      </div>
      <p className={`text-2xl font-bold ${textColorClass}`}>
        {value}
      </p>
    </div>
  );
};


  const MaterialsList = ({ materials, viewMode }) => (
    <>
      {materials.length === 0 ? (
        <div className="text-center py-16">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No materials found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {materials.map((material) => (
            <div
              key={material.id}
              className="bg-white rounded-2xl border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <button
                    onClick={() => toggleFavorite(material.id)}
                    className={`transition-all ${favorites.includes(material.id) ? 'text-red-500 scale-110' : 'text-gray-400 hover:text-red-400'}`}
                  >
                    <Heart className="w-5 h-5" />
                  </button>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {material.title}
                </h3>

                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm font-semibold">
                    {material.subject}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold">
                    {material.semester}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {material.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4 flex-wrap">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{material.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    <span>{material.downloads}</span>
                  </div>
                  {material.rating > 0 && (
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span>{material.rating}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition font-semibold text-sm">
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                  <button
                    onClick={() => handleDownload(material)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition font-semibold text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );

  const DashboardContent = () => (
    <>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes, subjects, or topics..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-600"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="px-4 py-2 border-2 border-gray-200 rounded-xl"
              >
                {subjects.map((s) => <option key={s}>{s}</option>)}
              </select>

              <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
                <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-gray-600'}`}><Grid className="w-5 h-5" /></button>
                <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'text-gray-600'}`}><List className="w-5 h-5" /></button>
              </div>
            </div>
          </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
          Welcome Back, Harsh!
        </h1>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Materials</h2>
        <MaterialsList materials={filteredMaterials.slice(0, 6)} viewMode={viewMode} />
      </div>
    </>
  );

  const FilteredContent = () => (
    <>
      <div className="mb-8">
        <button
          onClick={() => setActiveTab('Dashboard')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 font-medium transition-colors"
        >
          <Home className="w-5 h-5" />
          Back to Dashboard
        </button>
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          {activeTab === 'Favorites'
            ? 'My Favorite Materials'
            : activeTab === 'Popular'
            ? 'Popular Study Materials'
            : activeTab === 'My Uploads'
            ? 'My Uploaded Materials'
            : 'All Study Materials'}
        </h1>
        <p className="text-gray-600">{filteredMaterials.length} materials available</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search notes or subjects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 font-medium"
          >
            {subjects.map((s) => <option key={s}>{s}</option>)}
          </select>

          <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <MaterialsList materials={filteredMaterials} viewMode={viewMode} />
    </>
  );

  const ProfileSection = () => (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Back Button */}
      <button
        onClick={() => setActiveTab("Dashboard")}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 font-medium transition-colors"
      >
        <Home className="w-5 h-5" />
        Back to Dashboard
      </button>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-md">
        <div className="h-32 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative">
          <button className="absolute top-3 right-3 bg-white/20 text-white px-3 py-1 rounded-md text-sm hover:bg-white/30 transition">
            <Camera className="w-4 h-4 inline mr-1" />
            Change Cover
          </button>
        </div>

        <div className="px-6 pb-6 -mt-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 mb-4">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-28 h-28 bg-white border-4 border-white rounded-xl flex items-center justify-center shadow-md">
                <User className="w-14 h-14 text-blue-600" />
              </div>
              <button className="absolute bottom-1 right-1 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-blue-700 transition">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) =>
                      setUser({ ...user, name: e.target.value })
                    }   
                    className="text-2xl font-bold text-gray-900 mb-1 border-b border-gray-300 focus:outline-none w-full"
                  />
                  <input
                    type="text"
                    value={user.course}
                    onChange={(e) =>
                      setUser({ ...user, course: e.target.value })
                    }
                    className="text-gray-600 text-sm border-b border-gray-300 focus:outline-none w-full"
                  />
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1 mt-14">
                    {user.name}
                  </h2>
                  <p className="text-gray-600 text-sm">{user.course}</p>
                </>
              )}

              <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                <MapPin className="w-4 h-4" />
                {user.location}
              </div>
            </div>

            {/* Edit/Save Button */}
            <button
              onClick={isEditing ? handleSave : handleEdit}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium"
            >
              <Settings className="w-4 h-4" />
              {isEditing ? "Save" : "Edit Profile"}
            </button>
          </div>

          {/* Edit Form */}
          {isEditing && (
            <div className="mt-6 bg-gray-50 p-5 rounded-xl space-y-4 border border-gray-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={user.location}
                    onChange={(e) =>
                      setUser({ ...user, location: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={user.phone}
                    onChange={(e) =>
                      setUser({ ...user, phone: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">About</label>
                <textarea
                  value={user.about}
                  onChange={(e) =>
                    setUser({ ...user, about: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  rows="3"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    GitHub
                  </label>
                  <input
                    type="text"
                    value={user.github}
                    onChange={(e) =>
                      setUser({ ...user, github: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            <StatCard
              icon={<Upload className="w-4 h-4 text-blue-600" />}
              label="Uploads"
              value={studyMaterials.filter(
                (m) => m.author === user.name
              ).length}
            />
            <StatCard
              icon={<Download className="w-4 h-4 text-green-600" />}
              label="Downloads"
              value={567}
            />
            <StatCard
              icon={<Star className="w-4 h-4 text-purple-600" />}
              label="Rating"
              value="4.8"
            />
            <StatCard
              icon={<Award className="w-4 h-4 text-orange-600" />}
              label="Reputation"
              value="85"
            />
          </div>
        </div>
      </div>

      {/* About & Contact Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-5 md:col-span-2">
          <h3 className="font-semibold text-lg mb-3">About</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {user.about}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <h3 className="font-semibold text-lg mb-3">Contact</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> {user.phone}
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> {user.email}
            </p>
            <p className="flex items-center gap-2">
              <Github className="w-4 h-4" />{" "}
              <a
                href={`https://${user.github}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                {user.github}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 flex gap-6">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 mt-14">
          <div className="space-y-3">
            {sidebarItems.map((it) => {
              const Icon = it.icon;
              const active = (it.label === activeTab) || (activeTab === 'Dashboard' && it.label === 'Dashboard');
              return (
                <button
                  key={it.label}
                  onClick={() => setActiveTab(it.label)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all text-left ${active ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="truncate">{it.label}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
            <div className="relative w-72 max-w-full bg-white h-full p-4 overflow-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">N</div>
                  <span className="font-semibold">NerathiX</span>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="p-2">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-2">
                {sidebarItems.map((it) => {
                  const Icon = it.icon;
                  return (
                    <button
                      key={it.label}
                      onClick={() => { setActiveTab(it.label); setSidebarOpen(false); }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left ${it.label === activeTab ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{it.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Main */}
        <main className="flex-1 mt-14 ">

          {/* Content */}
          {activeTab === 'Dashboard' && <DashboardContent />}
          {['Popular', 'Favorites', 'My Uploads'].includes(activeTab) && <FilteredContent />}
          {activeTab === 'Profile' && <ProfileSection />}
        </main>
      </div>

      {/* Upload Modal */}
      {uploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setUploadModal(false)} />
          <div className="relative w-full max-w-2xl bg-white rounded-2xl p-6 z-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Upload Study Material</h3>
              <button onClick={() => setUploadModal(false)} className="p-2"><X className="w-5 h-5" /></button>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <input value={uploadForm.title} onChange={(e) => setUploadForm(f => ({ ...f, title: e.target.value }))} placeholder="Title" className="w-full px-4 py-2 border rounded-lg" />
              <div className="flex gap-2">
                <select value={uploadForm.subject} onChange={(e) => setUploadForm(f => ({ ...f, subject: e.target.value }))} className="flex-1 px-4 py-2 border rounded-lg">
                  <option>Data Structures</option>
                  <option>Operating Systems</option>
                  <option>DBMS</option>
                  <option>Computer Networks</option>
                </select>
                <select value={uploadForm.semester} onChange={(e) => setUploadForm(f => ({ ...f, semester: e.target.value }))} className="w-36 px-4 py-2 border rounded-lg">
                  <option>3rd Sem</option>
                  <option>4th Sem</option>
                  <option>5th Sem</option>
                </select>
              </div>
              <textarea value={uploadForm.description} onChange={(e) => setUploadForm(f => ({ ...f, description: e.target.value }))} rows={4} placeholder="Description" className="w-full px-4 py-2 border rounded-lg" />
              <div className="flex items-center gap-2 justify-end">
                <button onClick={() => setUploadModal(false)} className="px-4 py-2 rounded-lg border">Cancel</button>
                <button onClick={handleUpload} className="px-4 py-2 rounded-lg bg-indigo-600 text-white">Upload</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom navigation for small screens */}
      <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 md:hidden">
        <div className="bg-white border border-gray-200 rounded-full px-3 py-2 shadow-lg flex items-center gap-3">
          <button className="p-2 rounded-lg text-gray-600" onClick={() => setActiveTab('Dashboard')} aria-label="Home"><Home className="w-5 h-5" /></button>
          <button className="p-2 rounded-lg text-gray-600" onClick={() => setActiveTab('Popular')} aria-label="Popular"><TrendingUp className="w-5 h-5" /></button>
          <button className="p-2 rounded-lg text-gray-600" onClick={() => setUploadModal(true)} aria-label="Upload"><Upload className="w-5 h-5" /></button>
          <button className="p-2 rounded-lg text-gray-600" onClick={() => setActiveTab('Favorites')} aria-label="Favorites"><Heart className="w-5 h-5" /></button>
          <button className="p-2 rounded-lg text-gray-600" onClick={() => setActiveTab('Profile')} aria-label="Profile"><User className="w-5 h-5" /></button>
        </div>
      </nav>
    </div>
  );
};

export default Dashboard;