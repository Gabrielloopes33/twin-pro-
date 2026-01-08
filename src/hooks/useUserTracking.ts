"use client";
import { useState, useEffect } from 'react';

// Declarar o tipo global para dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}

interface TrackingData {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  visited_sections: string[];
  form_interactions: string[];
  first_interaction: string;
  last_interaction: string;
}

export const useUserTracking = () => {
  const [trackingData, setTrackingData] = useState<TrackingData>({
    utm_source: 'website',
    utm_medium: 'direct',
    utm_campaign: 'contact_form',
    utm_content: '',
    visited_sections: [],
    form_interactions: [],
    first_interaction: '',
    last_interaction: '',
  });

  // Rastrear seções visitadas
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id || entry.target.getAttribute('data-section');
            if (sectionId && !trackingData.visited_sections.includes(sectionId)) {
              setTrackingData((prev) => ({
                ...prev,
                visited_sections: [...prev.visited_sections, sectionId],
                utm_content: `viewed_${sectionId}`,
              }));

              // Enviar evento para Google Tag Manager
              if (typeof window !== 'undefined' && window.dataLayer) {
                window.dataLayer.push({
                  event: 'section_view',
                  section_name: sectionId,
                  sections_viewed_total: trackingData.visited_sections.length + 1,
                  timestamp: new Date().toISOString(),
                });
              }
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observar todas as seções da página
    const sections = document.querySelectorAll('section[id], [data-section]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Rastrear página atual
  useEffect(() => {
    const currentPath = window.location.pathname;
    const pathName = currentPath === '/' ? 'home' : currentPath.replace('/', '');
    
    if (!trackingData.visited_sections.includes(pathName)) {
      setTrackingData((prev) => ({
        ...prev,
        visited_sections: [...prev.visited_sections, pathName],
      }));
    }
  }, []);

  // Registrar interação com formulário (clique)
  const trackFormClick = () => {
    const timestamp = new Date().toISOString();
    setTrackingData((prev) => ({
      ...prev,
      utm_medium: 'form_click',
      utm_content: `clicked_form_${prev.visited_sections.join('_')}`,
      first_interaction: prev.first_interaction || timestamp,
      last_interaction: timestamp,
      form_interactions: [...prev.form_interactions, 'form_clicked'],
    }));

    // Enviar evento para Google Tag Manager
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'form_interaction',
        interaction_type: 'click',
        form_name: 'contact',
        sections_visited: trackingData.visited_sections,
        user_journey: trackingData.visited_sections.join(' → '),
        timestamp: timestamp,
      });
    }
  };

  // Registrar preenchimento de campo
  const trackFieldInteraction = (fieldName: string) => {
    const timestamp = new Date().toISOString();
    const interaction = `filled_${fieldName}`;
    
    if (!trackingData.form_interactions.includes(interaction)) {
      setTrackingData((prev) => ({
        ...prev,
        utm_medium: 'form_fill',
        utm_content: `filled_${fieldName}_from_${prev.visited_sections.slice(-1)[0] || 'unknown'}`,
        first_interaction: prev.first_interaction || timestamp,
        last_interaction: timestamp,
        form_interactions: [...prev.form_interactions, interaction],
      }));

      // Enviar evento para Google Tag Manager
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: 'form_interaction',
          interaction_type: 'field_fill',
          field_name: fieldName,
          form_name: 'contact',
          fields_filled: trackingData.form_interactions.filter(i => i.startsWith('filled_')).length + 1,
          timestamp: timestamp,
        });
      }
    }
  };

  // Registrar envio do formulário
  const trackFormSubmit = () => {
    const timestamp = new Date().toISOString();
    const engagementTime = trackingData.first_interaction 
      ? Math.round((new Date(timestamp).getTime() - new Date(trackingData.first_interaction).getTime()) / 1000)
      : 0;

    setTrackingData((prev) => ({
      ...prev,
      utm_medium: 'form_submit',
      utm_campaign: `contact_${prev.visited_sections.length}_sections`,
      utm_content: `submitted_from_${prev.visited_sections.slice(-1)[0] || 'unknown'}`,
      last_interaction: timestamp,
      form_interactions: [...prev.form_interactions, 'form_submitted'],
    }));

    // Enviar evento para Google Tag Manager
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'form_submission',
        form_name: 'contact',
        form_type: 'contact_form',
        sections_visited: trackingData.visited_sections,
        sections_count: trackingData.visited_sections.length,
        user_journey: trackingData.visited_sections.join(' → '),
        form_interactions_count: trackingData.form_interactions.length + 1,
        engagement_time_seconds: engagementTime,
        utm_source: trackingData.utm_source,
        utm_medium: 'form_submit',
        utm_campaign: `contact_${trackingData.visited_sections.length}_sections`,
        utm_content: `submitted_from_${trackingData.visited_sections.slice(-1)[0] || 'unknown'}`,
        timestamp: timestamp,
      });
    }
  };

  // Gerar URL com UTM parameters
  const getWebhookUrlWithUTM = (baseUrl: string): string => {
    const url = new URL(baseUrl);
    url.searchParams.set('utm_source', trackingData.utm_source);
    url.searchParams.set('utm_medium', trackingData.utm_medium);
    url.searchParams.set('utm_campaign', trackingData.utm_campaign);
    url.searchParams.set('utm_content', trackingData.utm_content);
    return url.toString();
  };

  return {
    trackingData,
    trackFormClick,
    trackFieldInteraction,
    trackFormSubmit,
    getWebhookUrlWithUTM,
  };
};
