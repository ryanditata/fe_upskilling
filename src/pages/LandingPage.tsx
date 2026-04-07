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

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (error) {
    return(
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-400">{error}</p>
      </div>
    )
  }


  return (
    <section id="faq" className="flex flex-col w-full gap-4 lg:gap-17 pt-15 px-5 md:px-10 lg:px-16">
      <div className="flex md:flex-row flex-col-reverse text-center gap-4 md:gap-0 md:text-left justify-between items-center">
        <div className="flex flex-col md:flex-row gap-4">
          <h1 className="font-audiowide font-semibold lg:text-5xl md:text-3xl text-2xl text-[#333333] text-center">FAQ</h1>

          <p className="text-[#646464] font-inter lg:text-lg md:text-sm md:flex lg:leading-8 md:leading-6 max-w-lg md:mr-35 lg:mr-70">Looking for some related answers?</p>
        </div>

        <h1 className="font-audiowide font-medium text-black/10 text-5xl md:text-[80px] lg:text-[100px]">05</h1>
      </div>

      <div className="space-y-4 mt-10 md:mt-5 lg:mt-0">
        {faqs.map((faq, index) => (
          <div key={faq.id} className="bg-white shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md">
            <button onClick={() => toggle(index)} className="flex w-full items-center justify-between p-6 text-left cursor-pointer">
              <span className="text-black font-inter font-medium text-sm lg:text-xl pr-8">
                {faq.question}
              </span>
              <span className="shrink-0 ml-6">
                {openIndex === index ? (
                  <Minus className="w-6 h-6 text-[#FF4800]" />
                ) : (
                  <Plus className="w-6 h-6 text-[#FF4800]" />
              )}
              </span>
            </button>

            <div className={`overflow-hidden transition-all duration-200 ${
              openIndex === index ? "max-h-96" : "max-h-0"
            }`}>
              <div className="px-6 pb-6 pt-2">
                <p className="text-[#646464]">{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
        <div>

        </div>
      </div>
    </section>
  );
};

export default LandingPage;