import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';
import { Code, Palette, Globe, Briefcase, Zap, Shield, Smartphone, BarChart, Search, Camera, Layout, Users, ArrowRight, Sparkles, Home } from 'lucide-react';

const Services = () => {
  const canvasRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

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

  const mainServices = [
    {
      icon: Code,
      title: "Web Development",
      desc: "Custom websites and applications built with cutting-edge technologies",
      details: "We create responsive, scalable web solutions using modern frameworks and best practices. From simple websites to complex web applications, we deliver excellence.",
      features: ["Responsive Design", "Scalable Architecture", "Modern Stack", "Performance Optimized"]
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      desc: "Beautiful and intuitive digital experiences that users love",
      details: "Our design team creates stunning interfaces that are not just beautiful but also highly functional. We focus on user research and usability testing.",
      features: ["User Research", "Wireframing", "Prototyping", "Design System"]
    },
    {
      icon: Globe,
      title: "Digital Marketing",
      desc: "Strategic marketing solutions to grow your online presence",
      details: "From SEO to social media marketing, we provide comprehensive digital marketing strategies to increase your brand visibility and reach.",
      features: ["SEO Optimization", "Social Media", "Content Strategy", "Analytics"]
    },
    {
      icon: Briefcase,
      title: "Branding",
      desc: "Complete brand identity and strategy services",
      details: "We help you build a strong brand identity that resonates with your audience. From logo design to brand guidelines, we've got you covered.",
      features: ["Logo Design", "Brand Guidelines", "Messaging", "Visual Identity"]
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      desc: "Optimized solutions for speed and efficiency",
      details: "We optimize your digital products for maximum performance, ensuring fast load times and smooth user experiences across all devices.",
      features: ["Speed Optimization", "Load Testing", "CDN Setup", "Caching Strategy"]
    },
    {
      icon: Shield,
      title: "Security & Compliance",
      desc: "Enterprise-grade security for your digital assets",
      details: "Protect your digital assets with our comprehensive security solutions. We ensure compliance with industry standards and best practices.",
      features: ["SSL Encryption", "Data Protection", "Compliance", "Regular Audits"]
    }
  ];

  const additionalServices = [
    { icon: Smartphone, title: "Mobile Development", desc: "Native and cross-platform mobile apps" },
    { icon: Search, title: "SEO Services", desc: "Boost your online visibility" },
    { icon: BarChart, title: "Analytics & Reporting", desc: "Data-driven insights for growth" },
    { icon: Camera, title: "Video Production", desc: "Professional video content creation" },
    { icon: Layout, title: "Web Design", desc: "Stunning visual designs" },
    { icon: Users, title: "Consulting", desc: "Strategic business guidance" }
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
              <span className="text-purple-700 font-semibold">NerathiX Services</span>
            </motion.div>

            <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight text-gray-900">
              Comprehensive Digital
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Solutions for Your Business
              </motion.span>
            </h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              From web development to digital marketing, we provide end-to-end solutions to transform your business and achieve your goals in the digital world.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="flex flex-wrap gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all">
              <a href="https://nerathix.onrender.com">
                Get Started
                </a>
              </button>
              <button className="px-8 py-4 bg-gray-100 border-2 border-gray-300 text-gray-900 rounded-xl font-semibold hover:bg-gray-200 transition-all">
                <a href="https://nerathix.onrender.com">
                Learn More
                </a>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Services - Detailed */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {mainServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`grid md:grid-cols-2 gap-16 items-center mb-32 ${index % 2 === 1 ? 'md:grid-cols-2 md:direction-rtl' : ''}`}
            >
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={index % 2 === 1 ? 'md:order-2' : ''}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-purple-600 bg-purple-50 px-4 py-2 rounded-full">Service {index + 1}</span>
                </div>

                <h2 className="text-5xl font-black text-gray-900 mb-4">{service.title}</h2>
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">{service.details}</p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-600 to-pink-600 mt-2"></div>
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all flex items-center gap-2" >
                <a href="https://nerathix.onrender.com/services">
                  Explore Service <ArrowRight className="w-4 h-4" />
                  </a>
                </button>
              </motion.div>

              {/* Visual */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`bg-gradient-to-br ${
                  [
                    'from-blue-100 via-blue-50 to-cyan-100',
                    'from-purple-100 via-purple-50 to-pink-100',
                    'from-green-100 via-emerald-50 to-teal-100',
                    'from-orange-100 via-amber-50 to-yellow-100',
                    'from-indigo-100 via-indigo-50 to-blue-100',
                    'from-rose-100 via-pink-50 to-red-100'
                  ][index]
                } rounded-3xl p-12 aspect-square flex flex-col items-center justify-center relative ${index % 2 === 1 ? 'md:order-1' : ''}`}
                whileHover={{ scale: 1.05 }}
              >
                <service.icon className="w-40 h-40 text-gray-400 opacity-50 absolute" />
                <div className="relative z-10 text-center">
                  <div className="inline-block">
                    <service.icon className="w-24 h-24 text-gray-700 opacity-80" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black text-gray-900 mb-4">Additional Services</h2>
            <p className="text-xl text-gray-600">Beyond our core offerings</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalServices.map((service, i) => (
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
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black text-gray-900 mb-4">Why Choose NerathiX?</h2>
            <p className="text-xl text-gray-600">Trusted by businesses worldwide</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: "Expert Team", desc: "Experienced professionals with proven track record" },
              { title: "Custom Solutions", desc: "Tailored services for your unique needs" },
              { title: "24/7 Support", desc: "Always available to help you succeed" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-8"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-700 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
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
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Let's work together to achieve your digital goals. Contact us today for a consultation.
          </p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold flex items-center gap-2 mx-auto hover:shadow-xl transition-all"
          >
           <a href="https://nerathix.onrender.com/contact">
            Get in Touch <ArrowRight className="w-5 h-5" />
            </a>
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
};

export default Services;