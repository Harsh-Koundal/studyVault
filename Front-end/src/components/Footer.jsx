import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative z-20 bg-white text-gray-600 py-10 px-6 md:px-14 shadow-inner">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Info */}
        <div>
          <h2 className="font-bold text-2xl bg-gradient-to-r from-teal-500 to-indigo-600 bg-clip-text text-transparent">
            StudyVault
          </h2>
          <p className="mt-3 text-sm leading-relaxed">
            A student-powered platform by{" "}
            <span className="font-semibold text-gray-800">Harsh Koundal</span> — 
            built to make learning accessible. Upload, share, and download notes, 
            question papers, and study materials all in one place.
          </p>

          <div className="mt-5">
            <h3 className="font-semibold text-gray-800 mb-3">Follow Us</h3>
            <div className="flex space-x-3">
              <a
                href="https://github.com/"
                className="p-2 rounded-full hover:bg-gray-100 border border-gray-300 transition"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://twitter.com/"
                className="p-2 rounded-full hover:bg-gray-100 border border-gray-300 transition"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://www.instagram.com/nerathix/"
                className="p-2 rounded-full hover:bg-gray-100 border border-gray-300 transition"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://linkedin.com/"
                className="p-2 rounded-full hover:bg-gray-100 border border-gray-300 transition"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Explore */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/notes" className="hover:text-indigo-600 transition">Upload Notes</a></li>
            <li><a href="/papers" className="hover:text-indigo-600 transition">Question Papers</a></li>
            <li><a href="/resources" className="hover:text-indigo-600 transition">Study Resources</a></li>
            <li><a href="/community" className="hover:text-indigo-600 transition">Student Community</a></li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/faq" className="hover:text-indigo-600 transition">FAQs</a></li>
            <li><a href="/privacy-policy" className="hover:text-indigo-600 transition">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-indigo-600 transition">Terms of Use</a></li>
            <li><a href="/contact" className="hover:text-indigo-600 transition">Contact Us</a></li>
          </ul>
        </div>

        {/* About */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">About Us</h3>
          <p className="text-sm">
            We’re a digital innovation agency helping ideas turn into MVPs that matter.
            <br />
            <span className="text-gray-800 font-semibold">StudyVault</span> is one of our initiatives
            to empower the next generation of learners.
          </p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
        <p>© {new Date().getFullYear()} StudyVault by Harsh Koundal. All rights reserved.</p>
        <p>Built with ❤️ by Harsh Koundal.</p>
      </div>
    </footer>
  );
};

export default Footer;
