import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Building2, 
  Heart, 
  Scale, 
  GraduationCap, 
  Star,
  Quote,
  Users,
  CheckCircle,
  TrendingUp,
  Award
} from "lucide-react";
import testimonials from "@/data/testimonials.json";

export default function Clients() {
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

  const clientCategories = [
    {
      icon: Heart,
      title: "Healthcare Organizations",
      description: "Hospitals, clinics, and healthcare systems serving diverse patient populations",
      clients: ["Regional Medical Center", "Community Health Network", "Specialty Care Clinics"],
      color: "bg-red-500",
      gradient: "from-red-50 to-pink-50"
    },
    {
      icon: Scale,
      title: "Legal & Justice System",
      description: "Courts, law firms, and legal aid organizations ensuring equal access to justice",
      clients: ["Federal District Courts", "Immigration Law Firms", "Public Defender Offices"],
      color: "bg-blue-600",
      gradient: "from-blue-50 to-indigo-50"
    },
    {
      icon: Building2,
      title: "Corporate & Business",
      description: "International corporations and businesses expanding into global markets",
      clients: ["Fortune 500 Companies", "International Trade Organizations", "Global Consulting Firms"],
      color: "bg-green-600",
      gradient: "from-green-50 to-emerald-50"
    },
    {
      icon: GraduationCap,
      title: "Educational Institutions",
      description: "Schools, universities, and educational programs supporting diverse student bodies",
      clients: ["Public School Districts", "Universities", "Adult Education Centers"],
      color: "bg-purple-600",
      gradient: "from-purple-50 to-violet-50"
    }
  ];

  const caseStudies = [
    {
      title: "Regional Medical Center Reduces Wait Times by 60%",
      category: "Healthcare",
      challenge: "Long patient wait times due to scheduling delays for interpretation services",
      solution: "Implemented 24/7 video remote interpretation for emergency departments and on-demand phone interpretation for routine appointments",
      results: [
        "60% reduction in average patient wait time",
        "95% patient satisfaction score",
        "40% increase in LEP patient volume served",
        "Cost savings of $180,000 annually"
      ],
      icon: Heart,
      color: "bg-red-500"
    },
    {
      title: "Immigration Law Firm Expands Service Capacity",
      category: "Legal",
      challenge: "Growing client base requiring interpretation in multiple languages with complex legal terminology",
      solution: "Partnership with certified court interpreters for depositions and client consultations with specialized legal terminology training",
      results: [
        "300% increase in case capacity",
        "99% accuracy rate in legal proceedings",
        "Expanded services to 15 additional languages",
        "100% client retention rate"
      ],
      icon: Scale,
      color: "bg-blue-600"
    },
    {
      title: "Global Corporation Streamlines International Operations",
      category: "Business",
      challenge: "Communication barriers in international meetings and negotiations affecting deal closure rates",
      solution: "Comprehensive interpretation services for board meetings, negotiations, and training sessions across 12 languages",
      results: [
        "50% faster deal closure rates",
        "Successful expansion into 8 new markets",
        "90% improvement in cross-cultural team collaboration",
        "ROI of 340% within first year"
      ],
      icon: Building2,
      color: "bg-green-600"
    }
  ];

  const clientStats = [
    { number: "500+", label: "Active Clients", icon: Users },
    { number: "50,000+", label: "Sessions Completed", icon: CheckCircle },
    { number: "98%", label: "Client Retention Rate", icon: TrendingUp },
    { number: "4.9/5", label: "Average Rating", icon: Star }
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
              Trusted by <span className="text-interproz-blue">Leading Organizations</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From healthcare systems to global corporations, discover how organizations across industries 
              are breaking down language barriers and improving outcomes with Interproz.
            </p>
            
            {/* Client Stats */}
            <motion.div 
              className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-12"
              variants={staggerChildren}
              initial="initial"
              animate="animate"
            >
              {clientStats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center"
                >
                  <div className="w-12 h-12 bg-interproz-blue rounded-lg flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Client Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Industries We Serve</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Providing specialized interpretation services across diverse sectors and industries
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {clientCategories.map((category, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
              >
                <Card className={`bg-gradient-to-r ${category.gradient} border-0 hover:shadow-lg transition-shadow`}>
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center`}>
                        <category.icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-xl text-gray-900">{category.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-6">{category.description}</p>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Typical Clients:</p>
                      <div className="flex flex-wrap gap-2">
                        {category.clients.map((client, clientIndex) => (
                          <Badge key={clientIndex} variant="secondary" className="text-xs">
                            {client}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real results from organizations that partnered with Interproz to improve their language access
            </p>
          </motion.div>

          <motion.div 
            className="space-y-12"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
              >
                <Card className="overflow-hidden">
                  <div className="grid lg:grid-cols-3 gap-8 p-8">
                    <div className="lg:col-span-2 space-y-6">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 ${study.color} rounded-lg flex items-center justify-center`}>
                          <study.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <Badge variant="outline" className="mb-2">{study.category}</Badge>
                          <h3 className="text-xl font-bold text-gray-900">{study.title}</h3>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Challenge</h4>
                          <p className="text-gray-600">{study.challenge}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Solution</h4>
                          <p className="text-gray-600">{study.solution}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <Award className="w-5 h-5 mr-2 text-green-500" />
                        Results Achieved
                      </h4>
                      <ul className="space-y-3">
                        {study.results.map((result, resultIndex) => (
                          <li key={resultIndex} className="flex items-start space-x-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from the organizations that trust Interproz for their interpretation needs
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <Quote className="w-8 h-8 text-interproz-blue mb-4" />
                    <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback className="bg-interproz-blue text-white">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                        <p className="text-sm text-interproz-blue">{testimonial.organization}</p>
                      </div>
                    </div>
                    <div className="flex items-center mt-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-20 bg-interproz-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Why Organizations Choose Interproz</h2>
              <div className="space-y-4">
                {[
                  "Reduced operational costs through efficient resource allocation",
                  "Improved client satisfaction and engagement metrics",
                  "Enhanced compliance with accessibility regulations",
                  "Streamlined workflows with integrated technology solutions",
                  "24/7 support with dedicated account management",
                  "Scalable solutions that grow with your organization"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-700">{benefit}</p>
                  </div>
                ))}
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
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Business team collaboration" 
                className="rounded-2xl shadow-lg w-full h-auto" 
              />
            </motion.div>
          </div>
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
            <h2 className="text-3xl lg:text-4xl font-bold text-white">Ready to Join Our Success Stories?</h2>
            <p className="text-xl text-blue-100 leading-relaxed">
              Transform your organization's ability to serve diverse communities. Let's discuss how Interproz 
              can customize a solution for your specific needs and goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-interproz-blue hover:bg-gray-100 text-lg px-8 py-4"
                onClick={() => window.location.href = "/contact"}
              >
                Schedule Consultation
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-interproz-blue text-lg px-8 py-4"
                onClick={() => window.location.href = "/api/login"}
              >
                Get Started Now
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
