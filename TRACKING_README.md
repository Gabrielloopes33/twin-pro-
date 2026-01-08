# 🎯 Sistema de Rastreamento de UTM e Navegação

## Visão Geral

Este sistema rastreia automaticamente a jornada do usuário no site e adiciona parâmetros UTM ao envio do formulário de contato.

## Funcionalidades

### 1. **Rastreamento Automático de Navegação**
- Rastreia todas as seções que o usuário visualiza (home, features, testimonials, about, projects, contact, etc.)
- Usa Intersection Observer para detectar quando o usuário visualiza cada seção
- Registra o caminho completo da navegação
- **Envia eventos para Google Tag Manager** a cada seção visualizada

### 2. **Rastreamento de Interações com o Formulário**

#### Quando o usuário **CLICA** no formulário:
- Registra: `form_clicked`
- UTM Medium: `form_click`
- UTM Content: `clicked_form_[seções_visitadas]`
- **GTM Event:** `form_interaction` (type: click)

#### Quando o usuário **PREENCHE** um campo:
- Registra: `filled_[campo]` (ex: `filled_name`, `filled_email`)
- UTM Medium: `form_fill`
- UTM Content: `filled_[campo]_from_[última_seção]`
- **GTM Event:** `form_interaction` (type: field_fill)

#### Quando o usuário **ENVIA** o formulário:
- UTM Medium: `form_submit`
- UTM Campaign: `contact_[número_de_seções]_sections`
- UTM Content: `submitted_from_[última_seção]`
- **GTM Event:** `form_submission` (com todos os dados de rastreamento)

### 3. **Dados Enviados no Webhook**

O webhook recebe todos os dados do formulário MAIS:

```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "phone": "(555) 123-4567",
  "message": "Preciso de orçamento...",
  "formType": "contact",
  "timestamp": "2026-01-08T...",
  "tracking": {
    "utm_source": "website",
    "utm_medium": "form_submit",
    "utm_campaign": "contact_5_sections",
    "utm_content": "submitted_from_contact",
    "visited_sections": ["home", "features", "testimonials", "about", "projects", "contact"],
    "form_interactions": ["form_clicked", "filled_name", "filled_email", "filled_phone", "filled_message", "form_submitted"],
    "first_interaction": "2026-01-08T14:30:00.000Z",
    "last_interaction": "2026-01-08T14:35:00.000Z",
    "user_journey": "home → features → testimonials → about → projects → contact"
  }
}
```

### 4. **URL do Webhook com UTM**

O webhook é chamado com UTM parameters na URL:

```
https://flow.agenciatouch.com.br/webhook/a583e69e-60d1-4a81-b804-4ce19fee9e66?utm_source=website&utm_medium=form_submit&utm_campaign=contact_5_sections&utm_content=submitted_from_contact
```

### 5. **Integração com Google Tag Manager**

Todos os eventos são enviados automaticamente para o `dataLayer` do GTM:

#### Evento: `section_view`
```javascript
{
  event: 'section_view',
  section_name: 'features',
  sections_viewed_total: 3,
  timestamp: '2026-01-08T...'
}
```

#### Evento: `form_interaction`
```javascript
{
  event: 'form_interaction',
  interaction_type: 'click', // ou 'field_fill'
  field_name: 'email', // apenas para field_fill
  form_name: 'contact',
  fields_filled: 2, // apenas para field_fill
  sections_visited: ['home', 'features', 'about'],
  user_journey: 'home → features → about',
  timestamp: '2026-01-08T...'
}
```

#### Evento: `form_submission` (Principal)
```javascript
{
  event: 'form_submission',
  form_name: 'contact',
  form_type: 'contact_form',
  sections_visited: ['home', 'features', 'testimonials', 'about', 'projects', 'contact'],
  sections_count: 6,
  user_journey: 'home → features → testimonials → about → projects → contact',
  form_interactions_count: 6,
  engagement_time_seconds: 180,
  utm_source: 'website',
  utm_medium: 'form_submit',
  utm_campaign: 'contact_6_sections',
  utm_content: 'submitted_from_contact',
  timestamp: '2026-01-08T...'
}
```

**Como usar no GTM:**
1. Crie Triggers baseados nos eventos (`section_view`, `form_interaction`, `form_submission`)
2. Configure Tags para disparar conversões (Google Ads, Facebook Pixel, etc.)
3. Use as variáveis do dataLayer nas suas tags (ex: `{{sections_count}}`, `{{user_journey}}`)

## Seções Rastreadas

Todas as seções principais do site têm IDs para rastreamento:

- `home` - Hero Section
- `features` - Features Section
- `testimonials` - Testimonials Section
- `about` - About Section
- `brands` - Brands Section
- `projects` - Projects Section
- `pricing` - Pricing Section (se disponível)
- `contact` - Contact Section

## Debug Mode

Para visualizar o rastreamento em tempo real durante o desenvolvimento:

1. Clique no botão flutuante 🎯 no canto inferior direito OU pressione **Alt + Shift + D**
2. Veja em tempo real:
   - Parâmetros UTM atuais
   - Seções visitadas
   - Interações com o formulário
   - Timestamps

## Arquivos Modificados

### Novos Arquivos:
- `src/hooks/useUserTracking.ts` - Hook principal de rastreamento
- `src/components/TrackingDebugger.tsx` - Componente de debug (opcional)
- `TRACKING_README.md` - Esta documentação

### Arquivos Modificados:
- `src/components/Contact/ContactForm.tsx` - Integração com tracking
- `src/components/Testimonials/index.tsx` - Adicionado ID `testimonials`
- `src/components/Projects/index.tsx` - Adicionado ID `projects`
- `src/components/Brands/index.tsx` - Adicionado ID `brands`
- `src/components/Hero/index.tsx` - Já tinha ID `home`
- `src/components/Features/index.tsx` - Já tinha ID `features`
- `src/components/About/AboutSectionOne.tsx` - Já tinha ID `about`
- `src/components/Contact/index.tsx` - Já tinha ID `contact`

## Uso

O sistema funciona automaticamente. Não é necessário configuração adicional.

### Para Ativar o Debug (Opcional):

Adicione no seu layout ou página principal:

```tsx
import { TrackingDebugger } from "@/components/TrackingDebugger";

export default function Layout({ children }) {
  return (
    <>
      {children}
      {process.env.NODE_ENV === 'development' && <TrackingDebugger />}
    </>
  );
}
```

## Benefícios

1. **Marketing**: Entenda de onde os leads vêm e qual foi a jornada deles
2. **Analytics**: Veja quais seções geram mais conversões
3. **Otimização**: Identifique pontos de atrito no formulário
4. **ROI**: Atribua conversões às campanhas corretas com UTM
5. **Dados Ricos**: Receba muito mais contexto sobre cada lead
6. **GTM Integrado**: Dispare conversões automáticas no Google Ads, Facebook, etc.
7. **Tempo Real**: Todos os eventos aparecem imediatamente no GTM Preview Mode

## Exemplos de Insights

Com estes dados você pode responder perguntas como:

- "Usuários que visitam a seção de projetos convertem mais?"
- "Quanto tempo leva entre o primeiro clique e o envio?"
- "Quais campos do formulário causam abandono?"
- "Qual caminho de navegação gera mais leads qualificados?"

## Privacidade

- Todos os dados são armazenados apenas no navegador até o envio
- Nenhum dado pessoal é coletado sem consentimento
- O rastreamento é apenas comportamental (navegação)
- Compatível com LGPD e GDPR

## ✅ **Integrado com Google Tag Manager** - Eventos sendo enviados automaticamente
2. Adicionar eventos de scroll depth
3. Rastrear cliques em botões específicos
4. Configurar conversões no Google Ads via GTM
5. Configurar eventos no Facebook Pixel via GTM
6. Rastrear cliques em botões específicos
4. Integrar com pixel do Facebook/Meta
5. Criar dashboards de análise dos dados coletados
