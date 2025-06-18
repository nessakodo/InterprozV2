import { motion } from "framer-motion";
import { Link } from "wouter";
import { Linkedin, Twitter, Facebook, Phone, Mail } from "lucide-react";

export default function Footer() {
  const footerSections = [
    {
      title: "Services",
      links: [
        { name: "On-Site Interpretation", href: "/services" },
        { name: "Phone Interpretation (OPI)", href: "/services" },
        { name: "Video Remote (VRI)", href: "/services" },
        { name: "Document Translation", href: "/services" },
        { name: "Audio Transcription", href: "/services" }
      ]
    },
    {
      title: "Specialties",
      links: [
        { name: "Medical & Healthcare", href: "/specialties" },
        { name: "Legal & Court", href: "/specialties" },
        { name: "Business & Corporate", href: "/specialties" },
        { name: "Educational", href: "/specialties" },
        { name: "Government & Human Services", href: "/specialties" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "/contact" },
        { name: "Contact Us", href: "/contact" },
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "HIPAA Compliance", href: "#" }
      ]
    }
  ];

  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Facebook, href: "#", label: "Facebook" }
  ];

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Company Info */}
          <div className="space-y-4">
            <svg width="150" height="40" viewBox="0 0 150 40" fill="none">
              <text x="0" y="28" fontFamily="Inter, sans-serif" fontSize="20" fontWeight="700" fill="#FFFFFF">interproz</text>
              <text x="0" y="38" fontFamily="Inter, sans-serif" fontSize="10" fontStyle="italic" fill="#9CA3AF">Interpreting Professionals</text>
            </svg>
            <p className="text-gray-400 text-sm">
              Professional interpretation services connecting businesses, healthcare providers, and legal professionals with certified interpreters worldwide.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a 
                  key={index}
                  href={social.href} 
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer sections */}
          {footerSections.map((section, index) => (
            <motion.div 
              key={index} 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <h3 className="text-lg font-semibold">{section.title}</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.href}>
                      <motion.a 
                        className="hover:text-white transition-colors cursor-pointer"
                        whileHover={{ x: 2 }}
                      >
                        {link.name}
                      </motion.a>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Footer */}
        <motion.div 
          className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p className="text-gray-400 text-sm">© 2024 Interproz. All rights reserved.</p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Phone className="w-4 h-4" />
              <span>1-800-INTERPROZ</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Mail className="w-4 h-4" />
              <span>contact@interproz.com</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
