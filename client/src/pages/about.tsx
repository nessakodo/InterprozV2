import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, 
  Award, 
  Globe, 
  Shield, 
  Heart,
  Target,
  CheckCircle,
  Star
} from "lucide-react";

export default function About() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const values = [
    {
      icon: Heart,
      title: "Compassionate Service",
      description: "We understand that interpretation often occurs during critical moments. Our interpreters approach every assignment with empathy and cultural sensitivity."
    },
    {
      icon: Award,
      title: "Professional Excellence",
      description: "All our interpreters are certified professionals with extensive training in their specialized fields, ensuring accurate and contextual communication."
    },
    {
      icon: Shield,
      title: "Confidentiality & Compliance",
      description: "We maintain the highest standards of confidentiality and comply with HIPAA, NDAA, and other regulatory requirements to protect sensitive information."
    },
    {
      icon: Globe,
      title: "Cultural Bridge",
      description: "Beyond language translation, we facilitate cultural understanding, helping bridge communication gaps across diverse communities."
    }
  ];

  const stats = [
    { number: "200+", label: "Certified Interpreters", icon: Users },
    { number: "50+", label: "Languages Supported", icon: Globe },
    { number: "24/7", label: "Availability", icon: CheckCircle },
    { number: "98%", label: "Client Satisfaction", icon: Star }
  ];

  const teamMembers = [
    {
      name: "Maria Rodriguez",
      role: "Chief Executive Officer",
      specialty: "Medical & Legal Interpretation",
      description: "15+ years experience in healthcare interpretation with certifications in medical terminology."
    },
    {
      name: "David Chen",
      role: "Head of Operations",
      specialty: "Business & Technical Interpretation",
      description: "Former corporate interpreter with expertise in international business communications."
    },
    {
      name: "Sarah Williams",
      role: "Quality Assurance Director",
      specialty: "Educational & Social Services",
      description: "Dedicated to maintaining the highest standards of interpretation quality across all service areas."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-interproz-light to-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              About <span className="text-interproz-blue">Interproz</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              For over a decade, Interproz has been connecting communities through professional interpretation services. 
              We break down language barriers to ensure clear, accurate communication in healthcare, legal, business, and social service settings.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <div className="max-w-4xl mx-auto">
              <Card className="bg-gradient-to-r from-interproz-light to-blue-50 border-blue-100">
                <CardContent className="p-8">
                  <Target className="w-12 h-12 text-interproz-blue mx-auto mb-6" />
                  <p className="text-lg text-gray-700 leading-relaxed">
                    To provide professional, accurate, and culturally sensitive interpretation services that enable effective communication 
                    across language barriers. We are committed to supporting healthcare providers, legal professionals, businesses, and 
                    community organizations in serving diverse populations with dignity and respect.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="w-16 h-16 bg-interproz-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do and shape how we serve our clients and communities.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-interproz-blue rounded-lg flex items-center justify-center flex-shrink-0">
                        <value.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{value.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2010, Interproz began as a small team of passionate linguists who recognized the critical need 
                  for professional interpretation services in underserved communities. What started as a local initiative 
                  has grown into a comprehensive platform serving clients across multiple industries.
                </p>
                <p>
                  Our founders, all experienced interpreters themselves, understood the challenges faced by both clients 
                  seeking interpretation services and professional interpreters looking for meaningful work opportunities. 
                  This dual perspective shaped our commitment to creating a platform that serves both sides of the equation 
                  with equal dedication.
                </p>
                <p>
                  Today, Interproz continues to evolve, incorporating cutting-edge technology while maintaining the human 
                  touch that makes effective interpretation possible. We're proud to be a bridge that connects people, 
                  facilitates understanding, and enables access to essential services regardless of language barriers.
                </p>
              </div>
            </motion.div>
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Team collaboration in diverse workplace" 
                className="rounded-2xl shadow-lg w-full h-auto" 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our experienced leadership team brings decades of interpretation expertise and industry knowledge.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
              >
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-interproz-blue to-interproz-dark rounded-full flex items-center justify-center mx-auto mb-6">
                      <Users className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-interproz-blue font-medium mb-2">{member.role}</p>
                    <p className="text-sm text-gray-600 mb-4">{member.specialty}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-20 bg-interproz-blue">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white">Our Commitment to You</h2>
            <p className="text-xl text-blue-100 leading-relaxed">
              Whether you're a healthcare provider serving diverse patients, a legal professional ensuring due process, 
              or a business expanding into new markets, Interproz is your trusted partner in professional communication. 
              We're here to help you serve everyone, regardless of the language they speak.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a 
                href="/contact"
                className="bg-white text-interproz-blue px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us
              </motion.a>
              <motion.a 
                href="/services"
                className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-interproz-blue transition-colors font-semibold text-lg inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn About Our Services
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
