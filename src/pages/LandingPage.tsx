import React, { useEffect, useState } from "react";
import { Plus, Minus } from "lucide-react";

type FAQ = {
  id: number;
  question: string;
  answer: string;
}

const LandingPage = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const response = await fetch(`${API_URL}/public/faqs`);
      const result = await response.json();

        if (result.meta.success) setFaqs(result.data);
        else setError("Tidak dapat memuat FAQ");
    } catch (err: any) {
      setError("Terjadi kesalahan saat memuat FAQ:" + err.message);
    }
  }

  return (
    <div className="font-bold text-2xl">
      Upskilling React
    </div>
  );
};

export default LandingPage;