import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Scale, 
  Briefcase, 
  GraduationCap, 
  HandHeart, 
  TrendingUp,
  Building2,
  Stethoscope,
  Users,
  CheckCircle,
  Clock,
  Award
} from "lucide-react";

export default function Specialties() {
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

  const specialtyFields = [
    {
      icon: Heart,
      title: "Medical & Healthcare",
      description: "Specialized medical interpreters trained in healthcare terminology and procedures for hospitals, clinics, and medical facilities.",
      features: [
        "Certified Medical Interpreters (CMI)",
        "HIPAA compliance training",
        "Emergency room interpretation",
        "Surgical procedure support",
        "Mental health counseling",
        "Pharmaceutical consultations"
      ],
      languages: ["Spanish", "Portuguese", "Arabic", "Mandarin", "Russian"],
      image: "https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      color: "bg-red-500",
      gradient: "from-red-50 to-pink-50",
      border: "border-red-100"
    },
    {
      icon: Scale,
      title: "Legal & Court",
      description: "Court-certified interpreters experienced in legal proceedings, depositions, and attorney-client communications.",
      features: [
        "Court-certified interpreters",
        "Federal and state court experience",
        "Immigration hearings",
        "Attorney-client privilege",
        "Deposition interpretation",
        "Legal document review"
      ],
      languages: ["Spanish", "French", "Korean", "Vietnamese", "Haitian Creole"],
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      color: "bg-blue-600",
      gradient: "from-blue-50 to-indigo-50",
      border: "border-blue-100"
    },
    {
      icon: Briefcase,
      title: "Business & Corporate",
      description: "Professional interpreters for corporate meetings, international negotiations, and business communications.",
      features: [
        "Business terminology expertise",
        "Conference interpretation",
        "International negotiations",
        "Corporate training sessions",
        "Board meeting interpretation",
        "Trade show support"
      ],
      languages: ["Mandarin", "Japanese", "German", "Italian", "Dutch"],
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      color: "bg-green-600",
      gradient: "from-green-50 to-emerald-50",
      border: "border-green-100"
    },
    {
      icon: GraduationCap,
      title: "Educational & Academic",
      description: "Educational interpreters for schools, universities, parent-teacher conferences, and academic settings.",
      features: [
        "K-12 school interpretation",
        "University academic support",
        "Parent-teacher conferences",
        "IEP and 504 meetings",
        "Student counseling",
        "Academic testing support"
      ],
      languages: ["Spanish", "Arabic", "Somali", "Vietnamese", "Hmong"],
      color: "bg-yellow-600",
      gradient: "from-yellow-50 to-orange-50",
      border: "border-yellow-100"
    },
    {
      icon: HandHeart,
      title: "Human Services",
      description: "Social service interpreters for government agencies, welfare services, and community programs.",
      features: [
        "Social services interpretation",
        "Government agency support",
        "Welfare program assistance",
        "Community health programs",
        "Immigration services",
        "Non-profit organization support"
      ],
      languages: ["Spanish", "Arabic", "French", "Russian", "Portuguese"],
      color: "bg-purple-600",
      gradient: "from-purple-50 to-violet-50",
      border: "border-purple-100"
    },
    {
      icon: TrendingUp,
      title: "Financial Services",
      description: "Financial interpreters for banking, insurance, investment consultations, and financial planning.",
      features: [
        "Banking and finance expertise",
        "Insurance claim processing",
        "Investment consultations",
        "Loan application support",
        "Financial planning sessions",
        "Tax preparation assistance"
      ],
      languages: ["Mandarin", "Spanish", "Korean", "Vietnamese", "Arabic"],
      color: "bg-indigo-600",
      gradient: "from-indigo-50 to-blue-50",
      border: "border-indigo-100"
    }
  ];

  const certifications = [
    {
      icon: Award,
      title: "Medical Interpreter Certification",
      description: "Certified Healthcare Interpreter (CHI) or Certified Medical Interpreter (CMI) credentials"
    },
    {
      icon: Scale,
      title: "Court Interpreter Certification",
      description: "Federal or state court interpreter certification for legal proceedings"
    },
    {
      icon: Users,
      title: "Community Interpreter Certification",
      description: "National or regional community interpreter certification programs"
    },
    {
      icon: Building2,
      title: "Specialized Industry Training",
      description: "Ongoing professional development in specialized terminology and procedures"
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
              Specialized <span className="text-interproz-blue">Interpretation</span> Fields
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our interpreters are trained specialists in various professional fields, ensuring accurate, 
              contextual communication that respects industry-specific terminology and protocols.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Stethoscope className="w-5 h-5 text-red-500" />
                <span>Medical Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <Scale className="w-5 h-5 text-blue-500" />
                <span>Court Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-green-500" />
                <span>24/7 Available</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Specialty Fields */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Specialty Areas</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional interpreters with deep expertise in specialized fields and industry-specific knowledge
            </p>
          </motion.div>

          <motion.div 
            className="space-y-16"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {specialtyFields.map((field, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`bg-gradient-to-r ${field.gradient} rounded-2xl border ${field.border} overflow-hidden`}
              >
                <div className={`grid lg:grid-cols-2 gap-8 p-8 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                  <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 ${field.color} rounded-xl flex items-center justify-center`}>
                        <field.icon className="text-white text-2xl w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{field.title}</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {field.languages.slice(0, 3).map((language, langIndex) => (
                            <Badge key={langIndex} variant="secondary" className="text-xs">
                              {language}
                            </Badge>
                          ))}
                          {field.languages.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{field.languages.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed">{field.description}</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      {field.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button 
                      className={`${field.color} hover:opacity-90 text-white`}
                      onClick={() => window.location.href = "/api/login"}
                    >
                      Book {field.title} Interpreter
                    </Button>
                  </div>
                  <div className={`flex items-center justify-center ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                    {field.image ? (
                      <img 
                        src={field.image}
                        alt={field.title}
                        className="rounded-xl shadow-lg w-full h-64 lg:h-80 object-cover"
                      />
                    ) : (
                      <div className="bg-gray-100 rounded-xl w-full h-64 lg:h-80 flex items-center justify-center">
                        <field.icon className="w-20 h-20 text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Professional Certifications</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our interpreters maintain the highest professional standards through ongoing certification and training
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
              >
                <Card className="text-center h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-interproz-blue rounded-xl flex items-center justify-center mx-auto mb-4">
                      <cert.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">{cert.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{cert.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Industry Focus */}
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
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Industry-Specific Expertise</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Each specialty field requires unique knowledge of terminology, procedures, and cultural considerations. 
                  Our interpreters undergo specialized training to ensure they can accurately convey not just words, 
                  but meaning and context within their field of expertise.
                </p>
                <p>
                  From complex medical procedures to intricate legal proceedings, our specialists understand that 
                  accurate interpretation can be the difference between successful outcomes and critical misunderstandings. 
                  We invest in continuous education to keep our interpreters current with industry developments.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="font-medium text-gray-900">Ongoing professional development</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="font-medium text-gray-900">Industry-specific terminology training</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="font-medium text-gray-900">Cultural competency certification</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="font-medium text-gray-900">Ethics and confidentiality training</span>
                </div>
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
                alt="Professional training session" 
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
            <h2 className="text-3xl lg:text-4xl font-bold text-white">Find Your Specialized Interpreter</h2>
            <p className="text-xl text-blue-100 leading-relaxed">
              Whatever your field or industry, we have qualified interpreters ready to support your communication needs. 
              Get matched with specialists who understand your specific requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-interproz-blue hover:bg-gray-100 text-lg px-8 py-4"
                onClick={() => window.location.href = "/api/login"}
              >
                Find Specialist Now
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-interproz-blue text-lg px-8 py-4"
                onClick={() => window.location.href = "/contact"}
              >
                Discuss Your Needs
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
