import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';
import {
  Upload, ArrowRight, Download, Users, FileText, Star, BookOpen,
  GraduationCap, Shield, Heart, User, Eye, Clock,
  Sparkles, Award
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.position.z = 40;

    // Create floating geometric shapes
    const shapes = [];
    
    for (let i = 0; i < 8; i++) {
      let geometry;
      const randomShape = Math.random();
      
      if (randomShape < 0.33) {
        geometry = new THREE.IcosahedronGeometry(1.5, 2);
      } else if (randomShape < 0.66) {
        geometry = new THREE.TetrahedronGeometry(1.5);
      } else {
        geometry = new THREE.OctahedronGeometry(1.5);
      }

      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color().setHSL(Math.random() * 0.3 + 0.65, 0.7, 0.65),
        wireframe: true,
        emissive: new THREE.Color().setHSL(Math.random() * 0.3 + 0.65, 0.5, 0.4),
        emissiveIntensity: 0.3
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = (Math.random() - 0.5) * 80;
      mesh.position.y = (Math.random() - 0.5) * 80;
      mesh.position.z = (Math.random() - 0.5) * 40;
      
      mesh.velocity = {
        x: (Math.random() - 0.5) * 0.2,
        y: (Math.random() - 0.5) * 0.2,
        z: (Math.random() - 0.5) * 0.2
      };

      scene.add(mesh);
      shapes.push(mesh);
    }

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x6366f1, 1);
    pointLight1.position.set(20, 20, 20);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xec4899, 0.8);
    pointLight2.position.set(-20, -20, 10);
    scene.add(pointLight2);

    let frame = 0;

    const animate = () => {
      frame++;
      requestAnimationFrame(animate);

      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.005 + index * 0.0005;
        shape.rotation.y += 0.008 + index * 0.0003;
        shape.rotation.z += 0.003 + index * 0.0002;

        shape.position.x += shape.velocity.x;
        shape.position.y += shape.velocity.y;
        shape.position.z += shape.velocity.z;

        // Bounce off boundaries
        if (shape.position.x > 40) shape.velocity.x *= -1;
        if (shape.position.x < -40) shape.velocity.x *= -1;
        if (shape.position.y > 40) shape.velocity.y *= -1;
        if (shape.position.y < -40) shape.velocity.y *= -1;
        if (shape.position.z > 20) shape.velocity.z *= -1;
        if (shape.position.z < -20) shape.velocity.z *= -1;
      });

      renderer.render(scene, camera);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      shapes.forEach((shape) => shape.geometry.dispose());
    };
  }, []);

  const studyMaterials = [
    { id: 1, icon: FileText, title: "Data Structures Complete Notes", category: "Data Structures", semester: "3rd Sem", description: "Comprehensive notes covering arrays, linked lists, trees, graphs, and algorithms.", author: "Alice Johnson", date: "Oct 2025", downloads: 1500, rating: 4.9 },
    { id: 2, icon: FileText, title: "Operating Systems Question Paper", category: "Operating Systems", semester: "4th Sem", description: "Previous year question papers with detailed solutions for OS concepts.", author: "Bob Smith", date: "Sep 2025", downloads: 1200, rating: 4.7 },
    { id: 3, icon: FileText, title: "Database Management Systems Notes", category: "DBMS", semester: "4th Sem", description: "Detailed notes on relational models, normalization, SQL queries, and transactions.", author: "Charlie Brown", date: "Aug 2025", downloads: 1000, rating: 4.8 }
  ];

  const categories = [
    { icon: FileText, title: "Study Notes", count: "2,500+", color: "from-purple-500 to-indigo-600" },
    { icon: BookOpen, title: "Courses", count: "500+", color: "from-pink-500 to-rose-600" },
    { icon: GraduationCap, title: "Achievements", count: "10,000+", color: "from-cyan-500 to-blue-600" }
  ];

  const features = [
    { icon: Upload, title: "Easy Upload", desc: "Drag and drop your notes and question papers in seconds.", color: "from-blue-500 to-cyan-500" },
    { icon: Download, title: "Quick Access", desc: "Download study materials instantly with one click.", color: "from-purple-500 to-pink-500" },
    { icon: Shield, title: "Secure & Reliable", desc: "Your data is protected with industry-standard security.", color: "from-indigo-500 to-purple-600" }
  ];

  const stats = [
    { icon: Users, label: "Active Students", value: "10,000+" },
    { icon: FileText, label: "Study Materials", value: "5,000+" },
    { icon: Star, label: "User Rating", value: "4.8/5" },
    { icon: Download, label: "Downloads", value: "15,000+" }
  ];

  return (
    <div className="overflow-x-hidden relative">
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" style={{ opacity: 0.3 }} />

      <motion.section style={{ opacity, scale }} className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div animate={{ background: ['radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)', 'radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)', 'radial-gradient(circle at 50% 80%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)', 'radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)'] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute inset-0" />
        </div>

        <div className="container mx-auto px-4 py-10 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <motion.div whileHover={{ scale: 1.05 }} className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-xl px-6 py-2 rounded-full shadow-lg border border-purple-200 mb-6">
                <Sparkles className="w-5 h-5 text-purple-500" />
                <span className="text-purple-600 font-semibold">Powered By NerathiX</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>Empowering Students with </motion.span>
                <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Knowledge</motion.span>
              </h1>

              <motion.div initial={{ width: 0 }} animate={{ width: 112 }} transition={{ delay: 0.6, duration: 0.8 }} className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full mb-6" />

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-slate-600 text-lg leading-relaxed mb-8">
                A modern platform for students to upload, share, and access study materials. Built with innovation and designed for efficiency.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="flex flex-wrap gap-4 mb-12">
                <motion.button whileHover={{ scale: 1.05, y: -2, boxShadow: "0 20px 40px rgba(99, 102, 241, 0.4)" }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg" onClick={()=>navigate(!token?'/login':'/upload')}>
                  <Upload className="w-5 h-5" />Upload Notes<ArrowRight className="w-5 h-5" />
                </motion.button>
                <motion.button whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 bg-white/80 backdrop-blur-xl text-purple-600 px-8 py-4 rounded-xl font-semibold shadow-lg border-2 border-purple-200" onClick={()=>navigate(!token?'/login':'/dashboard')}>
                  <Download className="w-5 h-5" />Find Question Paper
                </motion.button>
              </motion.div>

              <div className="grid grid-cols-2 gap-4">
                {[{ icon: Users, value: "10,000+", label: "Active Students", color: "from-blue-500 to-cyan-500" }, { icon: FileText, value: "5,000+", label: "Study Materials", color: "from-purple-500 to-pink-500" }].map((stat, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 + i * 0.2 }} whileHover={{ y: -5, scale: 1.02 }} className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-100 cursor-pointer group">
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-3 group-hover:shadow-lg transition-shadow`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="relative hidden lg:block">
              <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="relative z-10">
                <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity }} className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 blur-3xl opacity-25 rounded-3xl" />
                <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-4 border-white/50 overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center relative">
                    <div className="absolute inset-0 opacity-30">
                      <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-indigo-300 rounded-full blur-2xl"></div>
                      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-pink-300 rounded-full blur-2xl"></div>
                    </div>
                    <div className="relative z-10 text-center">
                      <BookOpen className="w-16 h-16 text-purple-500 mx-auto mb-3" />
                      <p className="text-purple-700 font-semibold">Interactive Learning Hub</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-12 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ scale: 1.08, y: -3 }} className="text-center cursor-pointer">
                <div className="inline-block mb-3">
                  <stat.icon className="w-8 h-8" />
                </div>
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm opacity-90">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <motion.div initial={{ width: 0 }} whileInView={{ width: 112 }} viewport={{ once: true }} className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full mx-auto mb-6" />
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Access thousands of study materials across different categories</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {categories.map((cat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }} whileHover={{ y: -10, scale: 1.03 }} onHoverStart={() => setHoveredCard(i)} onHoverEnd={() => setHoveredCard(null)} className="relative bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-purple-200 transition-all duration-300 cursor-pointer overflow-hidden shadow-lg hover:shadow-xl group">
                <div className={`w-16 h-16 bg-gradient-to-br ${cat.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow`}>
                  <cat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{cat.title}</h3>
                <p className="text-gray-600"><span className={`text-2xl font-bold bg-gradient-to-r ${cat.color} bg-clip-text text-transparent`}>{cat.count}</span><br />Resources available</p>
                {hoveredCard === i && <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} className="absolute top-4 right-4"><Sparkles className="w-6 h-6 text-purple-400" /></motion.div>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Study Materials</h2>
            <motion.div initial={{ width: 0 }} whileInView={{ width: 112 }} viewport={{ once: true }} className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full mx-auto mb-6" />
            <p className="text-gray-600 text-lg">Most downloaded notes and question papers this week</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {studyMaterials.map((material, i) => (
              <motion.div key={material.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }} whileHover={{ y: -10, scale: 1.03 }} className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-purple-300 transition-all duration-300 cursor-pointer group">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-purple-100 p-3 rounded-xl group-hover:bg-purple-200 transition-colors">
                    <material.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <motion.button whileHover={{ scale: 1.25 }} whileTap={{ scale: 0.9 }} className="p-2 hover:bg-pink-50 rounded-full transition-colors">
                    <Heart className="w-5 h-5 text-gray-300 hover:text-pink-500" />
                  </motion.button>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{material.title}</h3>
                <div className="flex gap-2 mb-4">
                  <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full">{material.category}</span>
                  <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">{material.semester}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{material.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1"><User className="w-4 h-4" /><span>{material.author}</span></div>
                  <div className="flex items-center gap-1"><Download className="w-4 h-4" /><span>{material.downloads}</span></div>
                  <div className="flex items-center gap-1"><Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /><span>{material.rating}</span></div>
                </div>
                <div className="flex gap-2">
                  <motion.button whileHover={{ scale: 1.05 }} className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 font-medium transition-colors" onClick={()=>navigate(!token?'/login':'/dashboard')}><Eye className="w-4 h-4" />Preview</motion.button>
                  <motion.button whileHover={{ scale: 1.05 }} className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow" onClick={()=>navigate(!token?'/login':'/dashboard')}><Download className="w-4 h-4"/>Download</motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mt-12">
            <motion.button whileHover={{ scale: 1.05, y: -2, boxShadow: "0 15px 35px rgba(99, 102, 241, 0.3)" }} whileTap={{ scale: 0.95 }} className="px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl flex items-center gap-2 mx-auto transition-shadow" onClick={()=>navigate(!token?'/login':'/dashboard')}>
              Explore All Materials<ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Platform?</h2>
            <motion.div initial={{ width: 0 }} whileInView={{ width: 112 }} viewport={{ once: true }} className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full mx-auto mb-6" />
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Built with modern technology to provide the best experience for students</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }} whileHover={{ y: -10, scale: 1.03 }} className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 transition-all duration-300 cursor-pointer group hover:shadow-lg">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{feature.title}</h3>
                <p className="text-gray-600 text-center">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="relative py-32 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white overflow-hidden">
        <motion.div animate={{ x: [0, 40, 0], y: [0, -40, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} className="absolute top-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-5xl md:text-6xl font-black mb-6">Ready to Start Sharing <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Knowledge?</span></h2>
            
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-12">Join thousands of students who are already benefiting from our platform. Upload your first material today and contribute to the community.</p>

            <div className="flex flex-wrap gap-4 justify-center">
              <motion.button whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 bg-white text-purple-900 px-8 py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-shadow" onClick={()=>navigate(!token?'/login':'/dashboard')}>Get Started Free<ArrowRight className="w-5 h-5" /></motion.button>
              <motion.button whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 rounded-xl font-bold shadow-xl border-2 border-white/20 hover:shadow-2xl transition-shadow" onClick={()=>navigate(!token?'/login':'/dashboard')}>Browse Materials<Clock className="w-5 h-5" /></motion.button>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;