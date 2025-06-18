import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Users, Phone, Video } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function BookingForm() {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [serviceType, setServiceType] = useState("phone");
  const [formData, setFormData] = useState({
    language: "",
    specialty: "",
    date: "",
    time: "",
    duration: "60",
    notes: ""
  });

  const createJobMutation = useMutation({
    mutationFn: async (jobData: any) => {
      if (!isAuthenticated) {
        window.location.href = "/api/login";
        return;
      }
      
      const response = await apiRequest("POST", "/api/jobs", jobData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Booking Request Submitted",
        description: "We'll find an available interpreter and contact you shortly.",
      });
      // Reset form
      setFormData({
        language: "",
        specialty: "",
        date: "",
        time: "",
        duration: "60",
        notes: ""
      });
    },
    onError: (error: any) => {
      toast({
        title: "Booking Failed",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.language || !formData.specialty || !formData.date || !formData.time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const startTime = new Date(`${formData.date}T${formData.time}`);
    const endTime = new Date(startTime.getTime() + parseInt(formData.duration) * 60000);

    createJobMutation.mutate({
      language: formData.language,
      specialty: formData.specialty,
      modality: serviceType,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      estimatedDuration: parseInt(formData.duration),
      notes: formData.notes || null,
    });
  };

  const serviceTypes = [
    { id: "on_site", label: "On-Site", description: "In-person interpretation", icon: Users },
    { id: "phone", label: "Phone (OPI)", description: "Over-the-phone", icon: Phone },
    { id: "video", label: "Video (VRI)", description: "Video remote", icon: Video }
  ];

  const languages = [
    "Spanish", "Portuguese", "French", "Mandarin", "Arabic", "Russian", "German", "Italian", "Japanese", "Korean"
  ];

  const specialties = [
    "Medical", "Legal", "Business", "Academic", "Human Services", "Financial", "Technical", "Government"
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="text-center space-y-4 mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Book an Interpreter</h2>
        <p className="text-xl text-gray-600">Get connected with a certified interpreter in minutes</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <Card className="shadow-xl">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Service Type Selection */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-3">Service Type</Label>
                <RadioGroup 
                  value={serviceType} 
                  onValueChange={setServiceType}
                  className="grid md:grid-cols-3 gap-4"
                >
                  {serviceTypes.map((service) => (
                    <div key={service.id} className="relative">
                      <RadioGroupItem 
                        value={service.id} 
                        id={service.id}
                        className="sr-only"
                      />
                      <Label
                        htmlFor={service.id}
                        className={`cursor-pointer block border-2 rounded-lg p-4 text-center transition-colors ${
                          serviceType === service.id
                            ? "border-interproz-blue bg-blue-50"
                            : "border-gray-200 hover:border-interproz-blue"
                        }`}
                      >
                        <service.icon className={`mx-auto mb-2 w-8 h-8 ${
                          serviceType === service.id ? "text-interproz-blue" : "text-gray-400"
                        }`} />
                        <div className="font-medium text-gray-900">{service.label}</div>
                        <div className="text-sm text-gray-600">{service.description}</div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Language and Specialty */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">Language Needed *</Label>
                  <Select value={formData.language} onValueChange={(value) => setFormData({ ...formData, language: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((language) => (
                        <SelectItem key={language} value={language}>
                          {language}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">Specialty Field *</Label>
                  <Select value={formData.specialty} onValueChange={(value) => setFormData({ ...formData, specialty: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      {specialties.map((specialty) => (
                        <SelectItem key={specialty} value={specialty}>
                          {specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Date and Time */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">Date *</Label>
                  <Input 
                    type="date" 
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">Time *</Label>
                  <Input 
                    type="time" 
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  />
                </div>
              </div>

              {/* Duration */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2">Estimated Duration</Label>
                <Select value={formData.duration} onValueChange={(value) => setFormData({ ...formData, duration: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                    <SelectItem value="180">3 hours</SelectItem>
                    <SelectItem value="240">4+ hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Additional Notes */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2">Additional Notes (Optional)</Label>
                <Textarea 
                  rows={3} 
                  placeholder="Any specific requirements, context, or instructions..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <Button 
                  type="submit" 
                  size="lg"
                  className="bg-interproz-blue hover:bg-interproz-dark text-white px-12 py-4 text-lg"
                  disabled={createJobMutation.isPending}
                >
                  {createJobMutation.isPending ? "Processing..." : "Find Available Interpreters"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
