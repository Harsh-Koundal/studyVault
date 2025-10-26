import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';
import { Home, Sparkles, Users, Code, Palette, Zap, Shield, BookOpen, Target, Award, ArrowRight, Globe, Briefcase, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const navigate = useNavigate()
  const canvasRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.position.z = 40;

    const shapes = [];
    
    for (let i = 0; i < 8; i++) {
      let geometry;
      const randomShape = Math.random();
      
      if (randomShape < 0.33) {
        geometry = new THREE.IcosahedronGeometry(0.8, 2);
      } else if (randomShape < 0.66) {
        geometry = new THREE.TetrahedronGeometry(0.8);
      } else {
        geometry = new THREE.OctahedronGeometry(0.8);
      }

      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color().setHSL(Math.random() * 0.3 + 0.65, 0.6, 0.7),
        wireframe: false,
        emissive: new THREE.Color().setHSL(Math.random() * 0.3 + 0.65, 0.4, 0.5),
        emissiveIntensity: 0.2
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = (Math.random() - 0.5) * 60;
      mesh.position.y = (Math.random() - 0.5) * 60;
      mesh.position.z = (Math.random() - 0.5) * 30;
      
      mesh.velocity = {
        x: (Math.random() - 0.5) * 0.1,
        y: (Math.random() - 0.5) * 0.1,
        z: (Math.random() - 0.5) * 0.1
      };

      scene.add(mesh);
      shapes.push(mesh);
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x6366f1, 0.5);
    pointLight1.position.set(20, 20, 20);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xec4899, 0.4);
    pointLight2.position.set(-20, -20, 10);
    scene.add(pointLight2);

    let frame = 0;

    const animate = () => {
      frame++;
      requestAnimationFrame(animate);

      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.003 + index * 0.0002;
        shape.rotation.y += 0.005 + index * 0.0001;
        shape.rotation.z += 0.002 + index * 0.00008;

        shape.position.x += shape.velocity.x;
        shape.position.y += shape.velocity.y;
        shape.position.z += shape.velocity.z;

        if (shape.position.x > 30) shape.velocity.x *= -1;
        if (shape.position.x < -30) shape.velocity.x *= -1;
        if (shape.position.y > 30) shape.velocity.y *= -1;
        if (shape.position.y < -30) shape.velocity.y *= -1;
        if (shape.position.z > 15) shape.velocity.z *= -1;
        if (shape.position.z < -15) shape.velocity.z *= -1;
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
    };
  }, []);

  const nerathixServices = [
    { icon: Code, title: "Web Development", desc: "Custom websites and applications built with cutting-edge technologies" },
    { icon: Palette, title: "UI/UX Design", desc: "Beautiful and intuitive digital experiences that users love" },
    { icon: Globe, title: "Digital Marketing", desc: "Strategic marketing solutions to grow your online presence" },
    { icon: Briefcase, title: "Branding", desc: "Complete brand identity and strategy services" },
    { icon: Zap, title: "Performance", desc: "Optimized solutions for speed and efficiency" },
    { icon: Shield, title: "Security", desc: "Enterprise-grade security for your digital assets" }
  ];

  const studyVaultFeatures = [
    { icon: BookOpen, title: "Vast Library", desc: "10,000+ curated study materials across all subjects and semesters" },
    { icon: Users, title: "Community", desc: "Connect with 50,000+ students and share knowledge" },
    { icon: Award, title: "Quality Content", desc: "Verified materials from educators and top performers" },
    { icon: Zap, title: "Fast & Easy", desc: "Instant access with seamless download experience" }
  ];

  const journey = [
    { year: "2024", title: "StudyVault Launch", desc: "Creating a revolution in student learning" },
    { year: "2024", title: "NerathiX Founded", desc: "Providing digital solutions globally" }
  ];

  return (
    <div className="overflow-x-hidden relative bg-white">
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" style={{ opacity: 0.08 }} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 pb-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div animate={{ background: ['radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.05) 0%, transparent 50%)', 'radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.05) 0%, transparent 50%)', 'radial-gradient(circle at 50% 80%, rgba(236, 72, 153, 0.05) 0%, transparent 50%)', 'radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.05) 0%, transparent 50%)'] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute inset-0" />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-pink-100 px-6 py-2 rounded-full border border-purple-200 mb-6">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span className="text-purple-700 font-semibold">About StudyVault</span>
            </motion.div>

            <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight text-gray-900">
              Empowering Students,
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Enabling Excellence
              </motion.span>
            </h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              StudyVault is a revolutionary learning platform created by NerathiX, a global digital agency. We believe every student deserves access to quality education materials, seamless collaboration tools, and a supportive community.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="flex flex-wrap gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all" onClick={()=>navigate(!token?'/login':'/dashboard')}>
                Explore Materials
              </button>
              <button className="px-8 py-4 bg-gray-100 border-2 border-gray-300 text-gray-900 rounded-xl font-semibold hover:bg-gray-200 transition-all" >
                <a href="https://nerathix.onrender.com/">
                Visit NerathiX
                </a>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="relative py-20 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "50,000+", label: "Active Students" },
              { number: "10,000+", label: "Study Materials" },
              { number: "100+", label: "Colleges" },
              { number: "4.9/5", label: "Rating" }
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <p className="text-4xl md:text-5xl font-black bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent mb-2">{stat.number}</p>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* About StudyVault */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-black text-gray-900 mb-6">What is StudyVault?</h2>
              <p className="text-xl text-gray-600 mb-4 leading-relaxed">
                StudyVault is more than just a platform—it's a comprehensive learning ecosystem designed specifically for students. We provide instant access to thousands of curated study materials, enabling seamless collaboration and knowledge sharing.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Whether you're preparing for exams, seeking reference materials, or looking to collaborate with peers, StudyVault is your one-stop solution for academic success.
              </p>
              <ul className="space-y-3">
                {["Instant access to thousands of materials", "Community-driven content sharing", "Quality-assured resources", "Seamless user experience"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-600 to-pink-600"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-3xl p-12 aspect-square flex flex-col items-center justify-center relative"
            >
              <BookOpen className="w-32 h-32 text-purple-600 mb-4 opacity-80" />
              <p className="text-gray-700 font-semibold text-center text-lg">Transforming Education Through Technology</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* StudyVault Features */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black text-gray-900 mb-4">Why Choose StudyVault?</h2>
            <p className="text-xl text-gray-600">Built with students in mind, powered by NerathiX expertise</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {studyVaultFeatures.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-purple-500/30 transition-all">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NerathiX Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-3xl p-12 aspect-square flex flex-col items-center justify-center relative"
            >
              <Globe className="w-32 h-32 text-indigo-600 mb-4 opacity-80" />
              <p className="text-gray-700 font-semibold text-center text-lg">Global Digital Solutions</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-black text-gray-900 mb-6">Powered by NerathiX</h2>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                NerathiX is a leading global digital agency specializing in delivering comprehensive digital solutions to businesses worldwide. With expertise spanning web development, UI/UX design, digital marketing, and strategic branding, NerathiX brings world-class innovation to every project.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                StudyVault is a testament to NerathiX's commitment to creating meaningful digital experiences. By combining cutting-edge technology with intuitive design, we've built a platform that truly makes a difference in students' lives.
              </p>
              <div className="space-y-3">
                {["Web Development Excellence", "User-Centric Design Philosophy", "Global Digital Reach", "Innovation & Technology"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 list-none">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-600 to-pink-600"></div>
                    {item}
                  </li>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* NerathiX Services */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black text-gray-900 mb-4">NerathiX Services</h2>
            <p className="text-xl text-gray-600">Comprehensive digital solutions for your business</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {nerathixServices.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-purple-500/30 transition-all">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-8"
            >
              <Target className="w-12 h-12 text-indigo-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To democratize education and empower students worldwide by providing accessible, high-quality learning resources in a supportive, collaborative community.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-8"
            >
              <Sparkles className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To create a world where every student has equal access to knowledge, mentorship, and opportunities to achieve academic excellence and personal growth.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200 rounded-2xl p-8"
            >
              <Heart className="w-12 h-12 text-pink-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
              <p className="text-gray-700 leading-relaxed">
                We're committed to integrity, innovation, inclusivity, and impact. Everything we do is driven by a genuine desire to make education better and more accessible.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative py-32 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white overflow-hidden"
      >
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            Join the Learning Revolution
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Be part of a community of over 50,000 students transforming their education with StudyVault
          </p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold flex items-center gap-2 mx-auto hover:shadow-xl transition-all" onClick={()=>navigate(!token?'/login':'/dashboard')}
          >
            Start Exploring <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.section>

    </div>
  );
};

export default AboutUs;