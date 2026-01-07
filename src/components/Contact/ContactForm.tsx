"use client";
import { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("https://flow.agenciatouch.com.br/webhook/a583e69e-60d1-4a81-b804-4ce19fee9e66", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          formType: "contact",
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="rounded-xs bg-white px-4 py-8 shadow-three sm:px-8 sm:py-11 md:p-[55px]"
      data-wow-delay=".15s"
    >
      <h2 className="mb-3 text-xl font-bold text-black sm:text-2xl md:text-3xl">
        Need Help?
      </h2>
      <p className="mb-8 text-sm sm:text-base font-medium text-body-color">
        Our support team will get back to you ASAP via email.
      </p>
      {submitStatus === "success" && (
        <div className="mb-6 rounded-xs bg-green-100 p-4 text-green-700">
          Mensagem enviada com sucesso!
        </div>
      )}
      {submitStatus === "error" && (
        <div className="mb-6 rounded-xs bg-red-100 p-4 text-red-700">
          Erro ao enviar mensagem. Tente novamente.
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="-mx-2 sm:-mx-4 flex flex-wrap">
          <div className="w-full px-2 sm:px-4 md:w-1/2">
            <div className="mb-6 sm:mb-8">
              <label
                htmlFor="name"
                className="mb-2 sm:mb-3 block text-xs sm:text-sm font-medium text-dark text-black"
              >
                Your Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base text-body-color outline-hidden focus:border-primary"
              />
            </div>
          </div>
          <div className="w-full px-2 sm:px-4 md:w-1/2">
            <div className="mb-6 sm:mb-8">
              <label
                htmlFor="email"
                className="mb-2 sm:mb-3 block text-xs sm:text-sm font-medium text-dark text-black"
              >
                Your Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base text-body-color outline-hidden focus:border-primary"
              />
            </div>
          </div>
          <div className="w-full px-2 sm:px-4 md:w-1/2">
            <div className="mb-6 sm:mb-8">
              <label
                htmlFor="phone"
                className="mb-2 sm:mb-3 block text-xs sm:text-sm font-medium text-dark text-black"
              >
                Your Phone
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={handleChange}
                className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base text-body-color outline-hidden focus:border-primary"
              />
            </div>
          </div>
          <div className="w-full px-2 sm:px-4">
            <div className="mb-6 sm:mb-8">
              <label
                htmlFor="message"
                className="mb-2 sm:mb-3 block text-xs sm:text-sm font-medium text-dark text-black"
              >
                Your Message
              </label>
              <textarea
                name="message"
                rows={5}
                placeholder="Enter your Message"
                value={formData.message}
                onChange={handleChange}
                required
                className="border-stroke w-full resize-none rounded-xs border bg-[#f8f8f8] px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base text-body-color outline-hidden focus:border-primary"
              ></textarea>
            </div>
          </div>
          <div className="w-full px-2 sm:px-4">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full sm:w-auto rounded-xs bg-primary px-6 py-3 sm:px-9 sm:py-4 text-sm sm:text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 disabled:opacity-50"
            >
              {isSubmitting ? "Enviando..." : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
