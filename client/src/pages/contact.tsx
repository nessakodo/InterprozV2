import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare,
  Building2,
  Heart,
  Scale,
  Users,
  Send
} from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    inquiryType: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "24/7 emergency interpretation services and general inquiries",
      contact: "1-800-INTERPROZ (1-800-468-3777)",
      availability: "24/7 Emergency • 8 AM - 8 PM General",
      color: "bg-green-500"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "General inquiries, partnership opportunities, and detailed requests",
      contact: "contact@interproz.com",
      availability: "Response within 2 business hours",
      color: "bg-blue-500"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Instant support for urgent requests and quick questions",
      contact: "Available on this website",
      availability: "8 AM - 8 PM Monday-Friday",
      color: "bg-purple-500"
    }
  ];

  const offices = [
    {
      title: "Headquarters",
      address: "1234 Professional Drive, Suite 500",
      city: "Washington, DC 20001",
      phone: "(202) 555-0100",
      specialties: ["Government Services", "Legal Interpretation"]
    },
    {
      title: "Healthcare Division",
      address: "5678 Medical Center Blvd",
      city: "Chicago, IL 60601", 
      phone: "(312) 555-0200",
      specialties: ["Medical Interpretation", "Healthcare Services"]
    },
    {
      title: "Business Services",
      address: "9012 Corporate Plaza",
      city: "New York, NY 10001",
      phone: "(212) 555-0300",
      specialties: ["Corporate Interpretation", "International Business"]
    }
  ];

  const inquiryTypes = [
    { value: "general", label: "General Information" },
    { value: "booking", label: "Service Booking" },
    { value: "interpreter", label: "Become an Interpreter" },
    { value: "enterprise", label: "Enterprise Solutions" },
    { value: "partnership", label: "Partnership Inquiry" },
    { value: "support", label: "Technical Support" },
    { value: "billing", label: "Billing Question" },
    { value: "other", label: "Other" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      // In a real implementation, this would send to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent Successfully",
        description: "We'll get back to you within 2 business hours.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        organization: "",
        inquiryType: "",
        message: ""
      });
    } catch (error) {
      toast({
        title: "Error Sending Message",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
              Get in <span className="text-interproz-blue">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ready to break down language barriers? We're here to help you find the perfect interpretation solution 
              for your organization. Contact us 24/7 for immediate assistance or to schedule a consultation.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-green-500" />
                <span>24/7 Emergency Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-blue-500" />
                <span>Free Consultations</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-purple-500" />
                <span>Instant Response</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">How to Reach Us</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Multiple ways to connect with our team for immediate assistance
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
              >
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className={`w-16 h-16 ${method.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                      <method.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{method.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{method.description}</p>
                    <p className="font-semibold text-gray-900 mb-2">{method.contact}</p>
                    <p className="text-sm text-gray-500">{method.availability}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
            <p className="text-xl text-gray-600">
              Tell us about your interpretation needs and we'll get back to you with a customized solution
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Card>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                        className="w-full"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        className="w-full"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>

                  {/* Phone and Organization */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="w-full"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div>
                      <Label htmlFor="organization" className="text-sm font-medium text-gray-700 mb-2">
                        Organization
                      </Label>
                      <Input
                        id="organization"
                        type="text"
                        value={formData.organization}
                        onChange={(e) => handleInputChange("organization", e.target.value)}
                        className="w-full"
                        placeholder="Your organization name"
                      />
                    </div>
                  </div>

                  {/* Inquiry Type */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2">
                      Inquiry Type *
                    </Label>
                    <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange("inquiryType", value)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select type of inquiry" />
                      </SelectTrigger>
                      <SelectContent>
                        {inquiryTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Message */}
                  <div>
                    <Label htmlFor="message" className="text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      rows={6}
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      required
                      className="w-full"
                      placeholder="Please describe your interpretation needs, preferred languages, timing, and any specific requirements..."
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center pt-4">
                    <Button
                      type="submit"
                      size="lg"
                      className="bg-interproz-blue hover:bg-interproz-dark text-white px-12 py-4 text-lg"
                      disabled={isSubmitting || !formData.name || !formData.email || !formData.inquiryType || !formData.message}
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Locations</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Regional offices to better serve your local interpretation needs
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {offices.map((office, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <MapPin className="w-6 h-6 text-interproz-blue" />
                      <CardTitle className="text-xl">{office.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-gray-700">{office.address}</p>
                        <p className="text-gray-700">{office.city}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">{office.phone}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Specialties:</p>
                        <div className="flex flex-wrap gap-2">
                          {office.specialties.map((specialty, specIndex) => (
                            <span 
                              key={specIndex} 
                              className="px-2 py-1 bg-interproz-light text-interproz-blue text-xs rounded-full"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-20 bg-red-50 border border-red-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Emergency Interpretation Services</h2>
            <p className="text-lg text-gray-600">
              For immediate interpretation needs outside business hours, call our 24/7 emergency line:
            </p>
            <div className="text-3xl font-bold text-red-600">1-800-INTERPROZ</div>
            <p className="text-sm text-gray-500">
              Emergency services available for medical, legal, and critical business situations
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
