import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Phone, 
  Video, 
  FileText, 
  Headphones,
  Clock,
  Shield,
  Star,
  CheckCircle,
  Globe,
  Mic,
  Languages
} from "lucide-react";

export default function Services() {
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

  const mainServices = [
    {
      icon: Users,
      title: "On-Site Interpretation",
      description: "Professional interpreters visit your location for face-to-face interpretation services.",
      features: [
        "Certified professional interpreters",
        "Same-day and scheduled appointments",
        "Background checked and verified",
        "Medical, legal, and business settings",
        "Culturally sensitive communication"
      ],
      pricing: "Starting at $85/hour",
      availability: "24/7 emergency available",
      color: "bg-blue-500",
      gradient: "from-blue-50 to-indigo-50",
      border: "border-blue-100"
    },
    {
      icon: Phone,
      title: "Over-the-Phone Interpretation (OPI)",
      description: "Instant access to certified interpreters via telephone for immediate communication needs.",
      features: [
        "Connect in under 30 seconds",
        "200+ languages available",
        "24/7/365 availability",
        "HIPAA compliant phone system",
        "No equipment installation required"
      ],
      pricing: "Starting at $2.50/minute",
      availability: "Instant connection",
      color: "bg-green-600",
      gradient: "from-green-50 to-emerald-50",
      border: "border-green-100"
    },
    {
      icon: Video,
      title: "Video Remote Interpretation (VRI)",
      description: "High-quality video interpretation combining visual communication with remote convenience.",
      features: [
        "HD video quality",
        "Screen sharing capabilities",
        "Multi-party video conferences",
        "HIPAA compliant platform",
        "Mobile and desktop compatible"
      ],
      pricing: "Starting at $3.50/minute",
      availability: "24/7 with reservation",
      color: "bg-purple-600",
      gradient: "from-purple-50 to-violet-50",
      border: "border-purple-100"
    }
  ];

  const additionalServices = [
    {
      icon: FileText,
      title: "Document Translation",
      description: "Professional translation of documents with accuracy verification and certification.",
      features: ["Certified translations", "Legal document translation", "Medical record translation", "Technical documentation"],
      turnaround: "24-72 hours"
    },
    {
      icon: Headphones,
      title: "Audio Transcription",
      description: "Convert audio recordings to written text with timestamp accuracy.",
      features: ["Multi-language transcription", "Legal proceeding transcripts", "Medical dictation", "Business meeting notes"],
      turnaround: "Same day available"
    },
    {
      icon: Mic,
      title: "Audio Dubbing",
      description: "Professional voice-over services for videos, presentations, and multimedia content.",
      features: ["Native speaker voice talent", "Video synchronization", "Multiple format support", "Quality assurance"],
      turnaround: "3-5 business days"
    }
  ];

  const qualityFeatures = [
    {
      icon: Shield,
      title: "HIPAA Compliance",
      description: "Full compliance with healthcare privacy regulations and secure communication protocols."
    },
    {
      icon: Star,
      title: "Certified Interpreters",
      description: "All interpreters hold professional certifications and undergo continuous training."
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Round-the-clock service for emergency situations and urgent interpretation needs."
    },
    {
      icon: Globe,
      title: "200+ Languages",
      description: "Comprehensive language support including rare languages and regional dialects."
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
              Professional <span className="text-interproz-blue">Interpretation</span> Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive language services designed to meet your communication needs across healthcare, legal, 
              business, and community settings. Choose from multiple service modalities for maximum flexibility.
            </p>
            <Button 
              size="lg" 
              className="bg-interproz-blue hover:bg-interproz-dark text-white text-lg px-8 py-4"
              onClick={() => window.location.href = "/api/login"}
            >
              Get Started Today
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Core Interpretation Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional interpretation services tailored to your specific communication requirements
            </p>
          </motion.div>

          <motion.div 
            className="space-y-12"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {mainServices.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`bg-gradient-to-r ${service.gradient} rounded-2xl border ${service.border} overflow-hidden`}
              >
                <div className="grid lg:grid-cols-2 gap-8 p-8">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 ${service.color} rounded-xl flex items-center justify-center`}>
                        <service.icon className="text-white text-2xl w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                        <div className="flex items-center space-x-4 mt-2">
                          <Badge variant="secondary">{service.pricing}</Badge>
                          <Badge variant="outline">{service.availability}</Badge>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed">{service.description}</p>
                    <ul className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`${service.color} hover:opacity-90 text-white`}
                      onClick={() => window.location.href = "/api/login"}
                    >
                      Book {service.title}
                    </Button>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="relative">
                      <img 
                        src={index === 0 ? 
                          "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" :
                          index === 1 ?
                          "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" :
                          "https://images.unsplash.com/photo-1587440871875-191322ee64b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                        }
                        alt={service.title}
                        className="rounded-xl shadow-lg w-full h-64 object-cover"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Additional Language Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive language support beyond interpretation
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {additionalServices.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-interproz-blue rounded-lg flex items-center justify-center mb-4">
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <Badge variant="outline">{service.turnaround}</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quality & Compliance */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Quality & Compliance</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Industry-leading standards for security, quality, and professional excellence
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {qualityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-interproz-blue to-interproz-dark rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-20 bg-interproz-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple, streamlined process to get you connected with professional interpreters
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-4 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { step: "1", title: "Request Service", description: "Submit your interpretation request with language, specialty, and timing requirements" },
              { step: "2", title: "Matching", description: "Our AI-powered system matches you with qualified interpreters based on your specific needs" },
              { step: "3", title: "Confirmation", description: "Receive confirmation with interpreter details and session information within minutes" },
              { step: "4", title: "Connect", description: "Connect with your interpreter via your chosen modality and begin your session" }
            ].map((step, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="w-16 h-16 bg-interproz-blue text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-interproz-blue to-interproz-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white">Ready to Get Started?</h2>
            <p className="text-xl text-blue-100 leading-relaxed">
              Experience professional interpretation services that make communication seamless. 
              Join thousands of satisfied clients who trust Interproz for their language needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-interproz-blue hover:bg-gray-100 text-lg px-8 py-4"
                onClick={() => window.location.href = "/api/login"}
              >
                Book Interpreter Now
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-interproz-blue text-lg px-8 py-4"
                onClick={() => window.location.href = "/contact"}
              >
                Contact Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
