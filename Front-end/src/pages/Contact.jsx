import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';
import { Home, Sparkles, Mail, Phone, MapPin, Globe, MessageSquare, Clock, Users, ArrowRight, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';

const ContactUs = () => {
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

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      desc: "Get in touch via email",
      details: "hello@nerathix.com",
      subdetails: "We'll respond within 24 hours"
    },
    {
      icon: Phone,
      title: "Call Us",
      desc: "Speak directly with our team",
      details: "+91 9736054697",
      subdetails: "Monday - Friday, 9 AM - 6 PM"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      desc: "Instant messaging support",
      details: "Chat with us now",
      subdetails: "Available 24/7 on our website"
    }
  ];

  const whyContact = [
    {
      icon: Users,
      title: "Expert Support",
      desc: "Our experienced team is ready to assist you with any inquiries or project requirements"
    },
    {
      icon: Clock,
      title: "Quick Response",
      desc: "We value your time and ensure prompt responses to all your communications"
    },
    {
      icon: Globe,
      title: "Global Reach",
      desc: "Connect with us from anywhere in the world. We serve clients globally"
    }
  ];

  const socialLinks = [
    { icon: Linkedin, label: "LinkedIn", link: "#" },
    { icon: Twitter, label: "Twitter", link: "#" },
    { icon: Facebook, label: "Facebook", link: "#" },
    { icon: Instagram, label: "Instagram", link: "#" }
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
              <span className="text-purple-700 font-semibold">Get In Touch</span>
            </motion.div>

            <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight text-gray-900">
              Let's Connect &
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Build Together
              </motion.span>
            </h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              Whether you have a question about our services or want to discuss your project, we're here to help. Reach out to us and let's create something amazing together.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="flex flex-wrap gap-4 justify-center">
              <a 
                href="https://nerathix.onrender.com/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all flex items-center gap-2"
              >
                Contact Us Now <ArrowRight className="w-5 h-5" />
              </a>
              <button className="px-8 py-4 bg-gray-100 border-2 border-gray-300 text-gray-900 rounded-xl font-semibold hover:bg-gray-200 transition-all">
                Schedule a Call
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black text-gray-900 mb-4">Ways to Reach Us</h2>
            <p className="text-xl text-gray-600">Choose the method that works best for you</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, i) => (
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
                  <method.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{method.desc}</p>
                <p className="text-lg font-semibold text-gray-900 mb-2">{method.details}</p>
                <p className="text-sm text-gray-600">{method.subdetails}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Contact Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black text-gray-900 mb-4">Why Contact Us?</h2>
            <p className="text-xl text-gray-600">Experience world-class digital solutions</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {whyContact.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-gray-200 p-8 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <item.icon className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black text-gray-900 mb-4">We Serve</h2>
            <p className="text-xl text-gray-600">Companies and organizations worldwide</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Startups", desc: "Launch your digital presence" },
              { title: "SMEs", desc: "Scale your business online" },
              { title: "Enterprises", desc: "Transform at enterprise scale" },
              { title: "Agencies", desc: "Partner with us for growth" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-8 text-center hover:border-indigo-300 transition-all"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Details Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Office Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-black text-gray-900 mb-8">Office Information</h2>
              
              <div className="space-y-8">
                <div className="bg-white rounded-2xl border border-gray-200 p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <Globe className="w-6 h-6 text-indigo-600" />
                    Headquarters
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Kangra<br />
                   Himachal Pradesh, India
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <Clock className="w-6 h-6 text-purple-600" />
                    Business Hours
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-black text-gray-900 mb-8">Follow Us</h2>
              
              <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  Stay connected with us on social media for updates, insights, and industry trends.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, i) => (
                    <a
                      key={i}
                      href={social.link}
                      className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-xl hover:bg-indigo-50 hover:border-indigo-200 transition-all group"
                    >
                      <social.icon className="w-5 h-5 text-gray-600 group-hover:text-indigo-600" />
                      <span className="font-medium text-gray-700 group-hover:text-indigo-600">{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              <a 
                href="https://nerathix.onrender.com/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all flex items-center justify-center gap-2"
              >
                Open Contact Form <ArrowRight className="w-5 h-5" />
              </a>
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
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Let's discuss how NerathiX can help transform your digital presence and achieve your business goals.
          </p>
          <motion.a
            href="https://nerathix.onrender.com/contact"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold flex items-center gap-2 mx-auto hover:shadow-xl transition-all w-fit inline-flex"
          >
            Contact Us Today <ArrowRight className="w-5 h-5" />
          </motion.a>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center text-gray-600 text-sm">
          <p>© 2025 NerathiX. All rights reserved. We look forward to hearing from you.</p>
        </div>
      </footer>
    </div>
  );
};

export default ContactUs;