import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function LanguageToggle() {
  const [currentLanguage, setCurrentLanguage] = useState("EN");

  const languages = [
    { code: "EN", flag: "🇺🇸", name: "English" },
    { code: "ES", flag: "🇪🇸", name: "Español" }
  ];

  const handleLanguageChange = (code: string) => {
    setCurrentLanguage(code);
    // TODO: Implement actual language switching logic
    console.log(`Language switched to: ${code}`);
  };

  return (
    <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
      {languages.map((language) => (
        <motion.div key={language.code}>
          <Button
            variant="ghost"
            size="sm"
            className={`flex items-center space-x-1 px-2 py-1 text-sm font-medium transition-all ${
              currentLanguage === language.code
                ? "bg-white shadow-sm text-gray-900"
                : "text-gray-600 hover:bg-white hover:shadow-sm"
            }`}
            onClick={() => handleLanguageChange(language.code)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>{language.flag}</span>
            <span>{language.code}</span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}
