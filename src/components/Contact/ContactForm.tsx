"use client";
import { useState } from "react";
import { useUserTracking } from "@/hooks/useUserTracking";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  
  // Hook de rastreamento
  const { trackingData, trackFormClick, trackFieldInteraction, trackFormSubmit, getWebhookUrlWithUTM } = useUserTracking();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const fieldName = e.target.name;
    
    // Rastrear quando o usuário preenche um campo
    trackFieldInteraction(fieldName);
    
    setFormData({
      ...formData,
      [fieldName]: e.target.value
    });
  };

  const handleFormClick = () => {
    // Rastrear quando o usuário clica no formulário
    trackFormClick();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Rastrear envio do formulário
    trackFormSubmit();

    const baseUrl = "https://flow.agenciatouch.com.br/webhook/a583e69e-60d1-4a81-b804-4ce19fee9e66";
    const webhookUrlWithUTM = getWebhookUrlWithUTM(baseUrl);

    const payloadData = {
      ...formData,
      formType: "contact",
      timestamp: new Date().toISOString(),
      // Dados de rastreamento
      tracking: {
        utm_source: trackingData.utm_source,
        utm_medium: trackingData.utm_medium,
        utm_campaign: trackingData.utm_campaign,
        utm_content: trackingData.utm_content,
        visited_sections: trackingData.visited_sections,
        form_interactions: trackingData.form_interactions,
        first_interaction: trackingData.first_interaction,
        last_interaction: trackingData.last_interaction,
        user_journey: trackingData.visited_sections.join(' → '),
      }
    };

    // Log para debug (pode remover em produção)
    console.log('📊 Dados de Rastreamento:', {
      url: webhookUrlWithUTM,
      payload: payloadData
    });

    try {
      const response = await fetch(webhookUrlWithUTM, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payloadData)
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
        console.log('✅ Formulário enviado com sucesso!');
      } else {
        setSubmitStatus("error");
        console.error('❌ Erro ao enviar formulário:', response.status);
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error('❌ Erro ao enviar formulário:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="rounded-xs bg-white px-4 py-8 shadow-three sm:px-8 sm:py-11 md:p-[55px]"
      data-wow-delay=".15s"
      onClick={handleFormClick}
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
