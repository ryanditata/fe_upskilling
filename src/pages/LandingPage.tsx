import React, { useEffect, useState } from "react";
import { Plus, Minus } from "lucide-react";

type FAQ = {
  id: number;
  question: string;
  answer: string;
};

const LandingPage: React.FC = () => {
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
      else setError("Failed to load FAQs");
    } catch (err: any) {
      setError("Error fetching FAQs: " + err.message);
    }
  };

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <section
      id="faq"
      className="w-full flex flex-col gap-4 lg:gap-17 pt-15 px-5 md:px-10 lg:px-16"
    >
      <div className="flex md:flex-row flex-col-reverse text-center gap-4 md:gap-0 md:text-left justify-between items-center">
        <div className="flex md:flex-row gap-4 flex-col">
          <h1 className="font-audiowide font-semibold text-center text-2xl md:text-3xl lg:text-5xl text-[#333333]">
            FAQ
          </h1>

          <p className="text-[#646464] font-inter flex md:hidden">
            Looking for some related answers?
          </p>
        </div>

        <p className="text-[#646464] font-inter hidden md:flex lg:text-lg md:text-sm lg:leading-8 md:leading-6 max-w-lg md:mr-35 lg:mr-70">
          Looking for some related answers?
        </p>

        <h1 className="font-audiowide text-black/10 text-5xl md:text-[80px] lg:text-[100px] font-medium">
          05
        </h1>
      </div>

      <div className="space-y-4 mt-10 md:mt-5 lg:mt-0">
        {faqs.map((faq, index) => (
          <div
            key={faq.id}
            className="bg-white shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md"
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
            >
              <span className="text-sm lg:text-xl font-medium text-black pr-8">
                {faq.question}
              </span>
              <span className="shrink-0 ml-4">
                {openIndex === index ? (
                  <Minus className="w-6 h-6 text-[#FF4800]" />
                ) : (
                  <Plus className="w-6 h-6 text-[#FF4800]" />
                )}
              </span>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-96" : "max-h-0"
              }`}
            >
              <div className="px-6 pb-6 pt-2">
                <p className="text-[#646464]">{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LandingPage;