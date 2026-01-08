# 🎯 Guia de Configuração - Google Tag Manager

## Visão Geral

O sistema de rastreamento envia **3 tipos de eventos** para o GTM:

1. **`section_view`** - Quando usuário visualiza uma seção
2. **`form_interaction`** - Quando clica ou preenche o formulário
3. **`form_submission`** - Quando envia o formulário (PRINCIPAL)

---

## 📊 Eventos Disponíveis

### 1. Evento: `section_view`

Dispara toda vez que o usuário visualiza uma seção do site.

**Variáveis disponíveis:**
- `{{section_name}}` - Nome da seção (home, features, about, etc.)
- `{{sections_viewed_total}}` - Total de seções visualizadas

**Exemplo de uso:**
- Criar audiências no Google Ads de pessoas que viram "projects"
- Remarketing para quem viu 5+ seções

---

### 2. Evento: `form_interaction`

Dispara quando usuário clica ou preenche campos do formulário.

**Variáveis disponíveis:**
- `{{interaction_type}}` - "click" ou "field_fill"
- `{{field_name}}` - Nome do campo preenchido (apenas field_fill)
- `{{form_name}}` - "contact"
- `{{fields_filled}}` - Quantidade de campos preenchidos
- `{{sections_visited}}` - Array de seções visitadas
- `{{user_journey}}` - Jornada formatada ("home → features → about")

**Exemplo de uso:**
- Criar evento GA4 quando preenche o email
- Remarketing para quem começou mas não completou

---

### 3. Evento: `form_submission` ⭐ PRINCIPAL

Dispara quando o formulário é enviado com sucesso.

**Variáveis disponíveis:**
- `{{form_name}}` - "contact"
- `{{form_type}}` - "contact_form"
- `{{sections_visited}}` - Array de seções
- `{{sections_count}}` - Quantidade de seções visitadas
- `{{user_journey}}` - "home → features → about → contact"
- `{{form_interactions_count}}` - Total de interações
- `{{engagement_time_seconds}}` - Tempo de engajamento em segundos
- `{{utm_source}}` - "website"
- `{{utm_medium}}` - "form_submit"
- `{{utm_campaign}}` - "contact_6_sections"
- `{{utm_content}}` - "submitted_from_contact"

**Exemplo de uso:**
- **Google Ads Conversion** - Lead gerado
- **Facebook Pixel** - Evento de conversão
- **GA4 Event** - Envio de formulário com valor
- **LinkedIn Insight Tag** - Conversão

---

## 🔧 Como Configurar no GTM

### Passo 1: Criar Variáveis da DataLayer

No GTM, vá em **Variables** > **New** > **Data Layer Variable**

Crie as seguintes variáveis:

| Nome da Variável | Data Layer Variable Name |
|------------------|--------------------------|
| DL - Event | event |
| DL - Section Name | section_name |
| DL - Sections Count | sections_count |
| DL - User Journey | user_journey |
| DL - Engagement Time | engagement_time_seconds |
| DL - Form Name | form_name |
| DL - Interaction Type | interaction_type |
| DL - Field Name | field_name |
| DL - UTM Source | utm_source |
| DL - UTM Medium | utm_medium |
| DL - UTM Campaign | utm_campaign |
| DL - UTM Content | utm_content |

---

### Passo 2: Criar Triggers

#### Trigger 1: Section View
- **Tipo:** Custom Event
- **Event name:** `section_view`
- **Nome:** "Tracking - Section View"

#### Trigger 2: Form Click
- **Tipo:** Custom Event
- **Event name:** `form_interaction`
- **This trigger fires on:** Some Custom Events
- **Condição:** `interaction_type` equals `click`
- **Nome:** "Tracking - Form Click"

#### Trigger 3: Form Fill
- **Tipo:** Custom Event
- **Event name:** `form_interaction`
- **This trigger fires on:** Some Custom Events
- **Condição:** `interaction_type` equals `field_fill`
- **Nome:** "Tracking - Form Fill"

#### Trigger 4: Form Submission ⭐
- **Tipo:** Custom Event
- **Event name:** `form_submission`
- **Nome:** "Tracking - Form Submission"

---

### Passo 3: Criar Tags

#### Tag 1: Google Ads Conversion - Lead

**Configuração:**
- **Tipo:** Google Ads Conversion Tracking
- **Conversion ID:** SEU_CONVERSION_ID
- **Conversion Label:** SEU_CONVERSION_LABEL
- **Trigger:** "Tracking - Form Submission"

**Campos Opcionais:**
- **Conversion Value:** Pode usar `{{sections_count}}` como métrica de qualidade
- **Order ID:** Timestamp ou ID único

---

#### Tag 2: Google Analytics 4 - Form Submission

**Configuração:**
- **Tipo:** Google Analytics: GA4 Event
- **Event Name:** `form_submission`
- **Trigger:** "Tracking - Form Submission"

**Event Parameters:**
```
form_name: {{form_name}}
sections_count: {{sections_count}}
user_journey: {{user_journey}}
engagement_time: {{engagement_time_seconds}}
utm_campaign: {{utm_campaign}}
```

---

#### Tag 3: Facebook Pixel - Lead

**Configuração:**
- **Tipo:** Custom HTML
- **Trigger:** "Tracking - Form Submission"

**Código:**
```html
<script>
  fbq('track', 'Lead', {
    content_name: {{form_name}},
    sections_visited: {{sections_count}},
    user_journey: {{user_journey}},
    engagement_time: {{engagement_time_seconds}},
    value: {{sections_count}}, // Valor baseado no engajamento
    currency: 'USD'
  });
</script>
```

---

#### Tag 4: GA4 Event - Section Views (Opcional)

Para rastrear visualizações de seções específicas:

**Configuração:**
- **Tipo:** Google Analytics: GA4 Event
- **Event Name:** `view_section`
- **Trigger:** "Tracking - Section View"

**Event Parameters:**
```
section_name: {{section_name}}
sections_total: {{sections_viewed_total}}
```

---

## 🧪 Como Testar

### 1. Ative o Preview Mode no GTM
- No GTM, clique em **Preview**
- Conecte ao seu site local ou em produção

### 2. Navegue pelo Site
- Role a página devagar
- Veja os eventos `section_view` aparecendo no GTM Preview

### 3. Interaja com o Formulário
- Clique no formulário → Veja `form_interaction` (click)
- Preencha campos → Veja `form_interaction` (field_fill) para cada campo

### 4. Envie o Formulário
- Clique em Submit
- Veja o evento `form_submission` com TODOS os dados
- Verifique se as tags dispararam (Google Ads, GA4, Facebook, etc.)

---

## 📈 Exemplos de Uso Avançado

### 1. Criar Audiência de Alto Engajamento

No Google Ads, crie audiência de pessoas que:
- Visitaram 5+ seções (`sections_count >= 5`)
- Tempo de engajamento > 120 segundos
- Visualizaram a seção "projects"

### 2. Otimizar Lances Baseado na Jornada

Use `{{user_journey}}` para identificar caminhos de maior conversão:
- "home → projects → contact" = Lead qualificado = Maior valor
- "home → contact" = Lead rápido = Menor valor

### 3. Criar Regras de Remarketing

- Quem viu "projects" mas não converteu → Remarketing com projetos
- Quem clicou no formulário mas não enviou → Urgência/desconto
- Quem passou 3+ minutos → Alta intenção

### 4. Calcular Valor da Conversão Dinamicamente

```javascript
// No GTM, crie uma variável JavaScript customizada
function() {
  var sections = {{sections_count}};
  var time = {{engagement_time_seconds}};
  
  // Valor base
  var value = 10;
  
  // +$5 por seção visitada
  value += sections * 5;
  
  // +$10 se passou mais de 2 minutos
  if (time > 120) value += 10;
  
  return value;
}
```

Use essa variável como **Conversion Value** no Google Ads.

---

## 🎯 Checklist de Configuração

- [ ] Variáveis do DataLayer criadas
- [ ] Trigger "Tracking - Form Submission" criado
- [ ] Tag do Google Ads Conversion configurada
- [ ] Tag do GA4 Event configurada
- [ ] Tag do Facebook Pixel configurada (se aplicável)
- [ ] Testado no Preview Mode
- [ ] Conversões aparecendo no Google Ads
- [ ] Eventos aparecendo no GA4
- [ ] Container publicado

---

## 🚀 Resultado Final

Com tudo configurado, você terá:

✅ **Conversões automáticas** no Google Ads quando formulário é enviado  
✅ **Dados ricos** sobre a jornada de cada lead  
✅ **Remarketing inteligente** baseado no comportamento  
✅ **Otimização de lances** com dados de qualidade do lead  
✅ **Dashboards completos** no GA4  
✅ **Pixel do Facebook** disparando automaticamente  

---

## 💡 Dica Pro

No Google Ads, use **Conversion Value Rules** para ajustar o valor baseado em:
- `utm_campaign` = "contact_7_sections" → +50% valor (lead muito engajado)
- `utm_campaign` = "contact_2_sections" → -20% valor (lead pouco engajado)

Isso melhora MUITO a otimização automática do Google Ads!

---

## 📚 Documentação Relacionada

- [TRACKING_README.md](TRACKING_README.md) - Visão geral do sistema
- [TRACKING_EXAMPLE.md](TRACKING_EXAMPLE.md) - Exemplos de dados
- [TESTING_GUIDE.md](TESTING_GUIDE.md) - Como testar
- [TESTE_RAPIDO.md](TESTE_RAPIDO.md) - Teste em 2 minutos

---

## ❓ Dúvidas?

- Eventos não aparecem no GTM Preview? → Veja [TESTING_GUIDE.md](TESTING_GUIDE.md)
- Variáveis undefined? → Certifique-se que criou todas as variáveis do DataLayer
- Tags não disparam? → Verifique se os Triggers estão corretos

**Tudo configurado? Agora você tem rastreamento profissional nível enterprise! 🎉**
