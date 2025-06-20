import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Clock, 
  Award, 
  Users, 
  Phone, 
  Video, 
  Heart,
  Briefcase,
  GraduationCap,
  Building,
  Scale,
  HandHeart,
  TrendingUp,
  Brain,
  Languages,
  ShieldCheck,
  Check,
  Bot,
  Mic
} from "lucide-react";

export default function Landing() {
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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-interproz-light to-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div className="space-y-8" {...fadeInUp}>
              <h1 className="text-4xl lg:text-6xl font-bold hero-text leading-tight">
                Professional <span className="text-interproz-blue">Interpretation</span> Services
              </h1>
              <p className="text-xl body-text leading-relaxed">
                Connect with certified interpreters for medical, legal, business, and specialized interpretation needs. Available 24/7 for on-site, phone, and video remote interpretation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-interproz-blue hover:bg-interproz-dark text-white text-lg px-8 py-4"
                  onClick={() => window.location.href = "/api/login"}
                >
                  Book an Interpreter
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-interproz-blue text-interproz-blue hover:bg-interproz-blue hover:text-white text-lg px-8 py-4"
                  onClick={() => window.location.href = "/api/login"}
                >
                  Join as Interpreter
                </Button>
              </div>
              <div className="flex items-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span>HIPAA Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span>24/7 Available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <span>Certified Interpreters</span>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=800" 
                alt="Professional interpreters in conference room" 
                className="rounded-2xl shadow-2xl w-full h-auto" 
              />
              <motion.div 
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">200+ Active Interpreters</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Avatar Feature Section */}
      <section className="py-20 bg-gradient-to-br from-interproz-light via-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center space-y-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-interproz-blue to-interproz-dark rounded-xl">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold hero-text">AI Interpreter Avatar</h2>
            </div>
            <p className="text-xl body-text max-w-4xl mx-auto">
              Experience the future of interpretation with our cutting-edge AI Avatar. 
              Real-time transcription, translation, and natural voice synthesis in 200+ languages.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-interproz-blue rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-semibold text-interproz-dark">Instant voice-to-voice interpretation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-interproz-blue rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-semibold text-interproz-dark">Professional AI voice synthesis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-interproz-blue rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-semibold text-interproz-dark">Real-time conversation transcripts</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-interproz-blue rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-semibold text-interproz-dark">Available 24/7 for immediate access</span>
                </div>
              </div>
              
              <div className="pt-6">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-interproz-blue to-interproz-dark hover:from-interproz-dark hover:to-blue-800 text-white text-lg px-8 py-4 shadow-lg"
                  onClick={() => window.location.href = "/api/login"}
                >
                  <Brain className="w-5 h-5 mr-2" />
                  Try AI Avatar Demo
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-interproz-blue to-interproz-dark rounded-full flex items-center justify-center">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-interproz-dark">AI Interpreter</h3>
                      <p className="text-sm text-gray-500">Ready to translate</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-600 font-medium">Online</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Mic className="w-4 h-4 text-interproz-blue" />
                      <span className="text-sm font-medium text-gray-700">Voice Input</span>
                    </div>
                    <div className="h-8 bg-gradient-to-r from-interproz-blue via-blue-400 to-interproz-blue opacity-60 rounded animate-pulse"></div>
                  </div>
                  
                  <div className="bg-interproz-light rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Languages className="w-4 h-4 text-interproz-dark" />
                      <span className="text-sm font-medium text-interproz-dark">Translation Output</span>
                    </div>
                    <p className="text-interproz-dark font-medium">"Hello, how can I help you today?"</p>
                    <p className="text-sm text-gray-600 mt-1">English → Spanish</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Modalities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center space-y-4 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Interpretation Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Choose from multiple service modalities to meet your specific communication needs</p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Users,
                title: "On-Site Interpretation",
                description: "Professional interpreters visit your location for face-to-face interpretation services. Ideal for medical appointments, legal proceedings, and business meetings.",
                features: ["Certified interpreters", "Same-day availability", "Background checked"],
                color: "bg-blue-500",
                buttonColor: "bg-interproz-blue hover:bg-interproz-dark"
              },
              {
                icon: Phone,
                title: "Over-the-Phone (OPI)",
                description: "Instant access to certified interpreters via phone. Perfect for urgent situations, routine appointments, and quick consultations.",
                features: ["24/7 availability", "Connect in under 30 seconds", "200+ languages"],
                color: "bg-green-600",
                buttonColor: "bg-green-600 hover:bg-green-700"
              },
              {
                icon: Video,
                title: "Video Remote (VRI)",
                description: "High-quality video interpretation combining visual cues with remote convenience. Ideal for medical consultations and detailed discussions.",
                features: ["HD video quality", "Screen sharing support", "HIPAA compliant platform"],
                color: "bg-purple-600",
                buttonColor: "bg-purple-600 hover:bg-purple-700"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`bg-gradient-to-br ${index === 0 ? 'from-blue-50 to-indigo-50' : index === 1 ? 'from-green-50 to-emerald-50' : 'from-purple-50 to-violet-50'} p-8 rounded-2xl border ${index === 0 ? 'border-blue-100' : index === 1 ? 'border-green-100' : 'border-purple-100'} hover:shadow-lg transition-shadow`}
              >
                <div className={`w-16 h-16 ${service.color} rounded-xl flex items-center justify-center mb-6`}>
                  <service.icon className="text-white text-2xl w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className={`w-full ${service.buttonColor} text-white`}>
                  {index === 0 ? "Book On-Site" : index === 1 ? "Call Now" : "Start Video Session"}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Specialty Fields */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center space-y-4 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Specialty Fields</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Our interpreters are specialized in various professional fields to ensure accurate and contextual communication</p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { icon: Heart, title: "Medical", description: "Specialized medical interpreters for healthcare settings, patient consultations, and medical procedures.", image: "https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200", color: "bg-red-100 text-red-600" },
              { icon: Scale, title: "Legal", description: "Court-certified interpreters for legal proceedings, depositions, and attorney-client meetings.", image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200", color: "bg-blue-100 text-blue-600" },
              { icon: Briefcase, title: "Business", description: "Professional interpreters for corporate meetings, negotiations, and international business communications.", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200", color: "bg-green-100 text-green-600" },
              { icon: GraduationCap, title: "Academic", description: "Educational interpreters for schools, universities, parent-teacher conferences, and academic events.", color: "bg-yellow-100 text-yellow-600" },
              { icon: HandHeart, title: "Human Services", description: "Social service interpreters for government agencies, welfare services, and community programs.", color: "bg-purple-100 text-purple-600" },
              { icon: TrendingUp, title: "Financial", description: "Financial interpreters for banking, insurance, investment consultations, and financial planning.", color: "bg-indigo-100 text-indigo-600" }
            ].map((specialty, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-12 h-12 ${specialty.color} rounded-lg flex items-center justify-center`}>
                    <specialty.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{specialty.title}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">{specialty.description}</p>
                {specialty.image ? (
                  <img src={specialty.image} alt={`${specialty.title} interpretation session`} className="rounded-lg w-full h-32 object-cover" />
                ) : (
                  <div className="bg-gray-100 rounded-lg w-full h-32 flex items-center justify-center">
                    <specialty.icon className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* User Dashboard Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center space-y-4 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Platform Access for Everyone</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Tailored dashboards and tools for clients, interpreters, and administrators</p>
          </motion.div>

          <motion.div 
            className="grid lg:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Briefcase,
                title: "Client Dashboard",
                description: "Manage bookings, view invoices, and access interpretation history",
                color: "bg-interproz-blue",
                features: ["Schedule & manage appointments", "View billing & payment history", "Rate interpreter performance"],
                mockup: {
                  title: "Quick Book",
                  status: "Available Now",
                  fields: [
                    { label: "Language", value: "Spanish" },
                    { label: "Type", value: "Video" }
                  ],
                  button: "Book Interpreter"
                }
              },
              {
                icon: Languages,
                title: "Interpreter Portal",
                description: "Manage availability, claim jobs, and track earnings",
                color: "bg-green-600",
                features: ["Set availability schedule", "Browse & claim job opportunities", "Track earnings & performance"],
                mockup: {
                  title: "Available Jobs",
                  status: "3 New",
                  jobs: [
                    { type: "Medical - Spanish", time: "Today 2:00 PM", rate: "$45/hr" },
                    { type: "Legal - Portuguese", time: "Tomorrow 10:00 AM", rate: "$60/hr" }
                  ],
                  button: "View All Jobs"
                }
              },
              {
                icon: Building,
                title: "Admin Panel",
                description: "Monitor platform performance, manage users, and analytics",
                color: "bg-purple-600",
                features: ["Manage users & permissions", "Platform analytics & reports", "Security & compliance monitoring"],
                mockup: {
                  title: "Platform Stats",
                  status: "Live",
                  stats: [
                    { label: "Active Jobs", value: "148" },
                    { label: "Satisfaction", value: "92%" }
                  ],
                  button: "View Analytics"
                }
              }
            ].map((dashboard, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`bg-gradient-to-br ${index === 0 ? 'from-blue-50 to-indigo-50 border-blue-100' : index === 1 ? 'from-green-50 to-emerald-50 border-green-100' : 'from-purple-50 to-violet-50 border-purple-100'} rounded-2xl p-8 border`}
              >
                <div className="text-center mb-8">
                  <div className={`w-20 h-20 ${dashboard.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <dashboard.icon className="text-white text-2xl w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{dashboard.title}</h3>
                  <p className="text-gray-600">{dashboard.description}</p>
                </div>
                
                <Card className="mb-6">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-700">{dashboard.mockup.title}</span>
                      {dashboard.mockup.status && (
                        <Badge variant={index === 1 ? "default" : "outline"} className={index === 1 ? "bg-green-100 text-green-800" : ""}>
                          {dashboard.mockup.status}
                        </Badge>
                      )}
                    </div>
                    
                    {dashboard.mockup.fields && (
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {dashboard.mockup.fields.map((field, i) => (
                          <div key={i} className="bg-gray-50 p-2 rounded">
                            <div className="font-medium text-gray-700">{field.label}</div>
                            <div className="text-gray-600">{field.value}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {dashboard.mockup.jobs && (
                      <div className="space-y-2">
                        {dashboard.mockup.jobs.map((job, i) => (
                          <div key={i} className={`${i === 0 ? 'bg-green-50' : 'bg-blue-50'} p-2 rounded text-xs`}>
                            <div className="font-medium text-gray-700">{job.type}</div>
                            <div className="text-gray-600">{job.time} • {job.rate}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {dashboard.mockup.stats && (
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {dashboard.mockup.stats.map((stat, i) => (
                          <div key={i} className="bg-gray-50 p-2 rounded text-center">
                            <div className="font-bold text-lg text-gray-900">{stat.value}</div>
                            <div className="text-gray-600">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <Button size="sm" className={`w-full ${dashboard.color} hover:opacity-90 text-white`}>
                      {dashboard.mockup.button}
                    </Button>
                  </CardContent>
                </Card>

                <div className="space-y-3">
                  {dashboard.features.map((feature, i) => (
                    <div key={i} className="flex items-center space-x-3 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Booking Form */}
      <motion.section 
        className="py-20 bg-interproz-light"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <BookingForm />
      </motion.section>

      {/* Technical Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center space-y-4 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Advanced Platform Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Cutting-edge technology meets professional interpretation services</p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { icon: Brain, title: "AI Matching", description: "Intelligent algorithm matches clients with the best-qualified interpreters based on specialty, location, ratings, and availability.", gradient: "from-blue-500 to-purple-600" },
              { icon: Languages, title: "Document Translation", description: "AI-powered document translation with human post-editing ensures accuracy for critical business documents.", gradient: "from-green-500 to-teal-600" },
              { icon: ShieldCheck, title: "HIPAA Compliant", description: "End-to-end encryption, secure file storage, and HIPAA-compliant infrastructure protect sensitive information.", gradient: "from-red-500 to-pink-600" },
              { icon: Clock, title: "24/7 Service", description: "Round-the-clock availability for emergency situations and urgent interpretation needs across all time zones.", gradient: "from-yellow-500 to-orange-600" }
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeInUp} className="text-center space-y-4">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto`}>
                  <feature.icon className="text-white text-2xl w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Feature Details */}
          <motion.div 
            className="bg-gray-50 rounded-2xl p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">Enterprise-Grade Technology</h3>
                <div className="space-y-4">
                  {[
                    { title: "WebRTC Video & Audio", description: "High-quality, low-latency communication with automatic failover to backup systems" },
                    { title: "Automated Billing & Invoicing", description: "Stripe integration for secure payments, automated invoicing, and subscription management" },
                    { title: "Real-time Analytics", description: "Live dashboard with performance metrics, user satisfaction scores, and utilization rates" },
                    { title: "Mobile App Support", description: "Full-featured mobile apps for iOS and Android with offline capabilities" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-interproz-blue rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Check className="text-white text-xs w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{item.title}</div>
                        <div className="text-sm text-gray-600">{item.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1587440871875-191322ee64b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Video conference interpretation setup" 
                  className="rounded-xl shadow-lg w-full h-auto" 
                />
                <motion.div 
                  className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg border"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-700">Live Session Active</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        className="py-20 bg-gradient-to-br from-interproz-blue to-interproz-dark"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <motion.h2 
              className="text-3xl lg:text-5xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Ready to Connect Across Languages?
            </motion.h2>
            <motion.p 
              className="text-xl text-blue-100 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Join thousands of satisfied clients and certified interpreters on our professional platform. Get started today and experience seamless communication.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Button 
                size="lg" 
                className="bg-white text-interproz-blue hover:bg-gray-100 text-lg px-8 py-4"
                onClick={() => window.location.href = "/api/login"}
              >
                Book an Interpreter
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-interproz-blue text-lg px-8 py-4"
                onClick={() => window.location.href = "/api/login"}
              >
                Become an Interpreter
              </Button>
            </motion.div>
            <motion.div 
              className="flex items-center justify-center space-x-8 text-blue-100 text-sm pt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {["No setup fees", "24/7 support", "Instant access"].map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Check className="w-4 h-4" />
                  <span>{item}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
