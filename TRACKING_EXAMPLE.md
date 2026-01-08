# 📊 Exemplo de Dados Enviados

## Cenário: Usuário navega pelo site e envia o formulário

### 1️⃣ Jornada do Usuário:
1. Entra na página inicial (home)
2. Rola e visualiza Features
3. Rola e visualiza Testimonials
4. Rola e visualiza About
5. Rola e visualiza Projects
6. Clica no formulário de contato
7. Preenche nome
8. Preenche email
9. Preenche telefone
10. Preenche mensagem
11. Envia o formulário

---

## 2️⃣ URL do Webhook COM UTM:

```
https://flow.agenciatouch.com.br/webhook/a583e69e-60d1-4a81-b804-4ce19fee9e66?utm_source=website&utm_medium=form_submit&utm_campaign=contact_6_sections&utm_content=submitted_from_contact
```

---

## 3️⃣ Payload JSON Enviado:

```json
{
  "name": "João da Silva",
  "email": "joao@example.com",
  "phone": "(305) 123-4567",
  "message": "Gostaria de um orçamento para reforma de banheiro",
  "formType": "contact",
  "timestamp": "2026-01-08T18:45:30.123Z",
  "tracking": {
    "utm_source": "website",
    "utm_medium": "form_submit",
    "utm_campaign": "contact_6_sections",
    "utm_content": "submitted_from_contact",
    "visited_sections": [
      "home",
      "features",
      "testimonials",
      "about",
      "projects",
      "contact"
    ],
    "form_interactions": [
      "form_clicked",
      "filled_name",
      "filled_email",
      "filled_phone",
      "filled_message",
      "form_submitted"
    ],
    "first_interaction": "2026-01-08T18:42:15.000Z",
    "last_interaction": "2026-01-08T18:45:30.123Z",
    "user_journey": "home → features → testimonials → about → projects → contact"
  }
}
```

---

## 4️⃣ Análise dos Dados:

### Parâmetros UTM:
- **utm_source**: `website` - De onde veio (sempre website neste caso)
- **utm_medium**: `form_submit` - Como interagiu (clique, preenchimento ou envio)
- **utm_campaign**: `contact_6_sections` - Quantas seções visitou
- **utm_content**: `submitted_from_contact` - De qual seção enviou

### Dados de Rastreamento:
- **visited_sections**: Lista de todas as seções visualizadas
- **form_interactions**: Lista de todas as interações com o formulário
- **first_interaction**: Quando clicou/começou a preencher pela primeira vez
- **last_interaction**: Quando enviou o formulário
- **user_journey**: Caminho visual da jornada

### Tempo de Engajamento:
- Primeira interação: `18:42:15`
- Última interação: `18:45:30`
- **Tempo total**: ~3 minutos e 15 segundos

---

## 5️⃣ Insights que Você Pode Obter:

### 📈 Marketing:
- "Este lead visitou 6 seções antes de converter"
- "Usuários que visitam 'projects' convertem mais"
- "Leads de 'testimonials' são mais qualificados"

### ⏱️ Comportamento:
- "Tempo médio de 3 minutos até converter"
- "80% preenchem todos os campos sem abandonar"
- "Leads que clicam direto convertem menos"

### 🎯 Otimização:
- "Remover/adicionar seções para melhorar conversão"
- "Qual seção causa mais abandonos?"
- "Testar diferentes ordens de conteúdo"

### 💰 ROI:
- "Atribuir vendas às seções corretas"
- "Calcular valor por seção visitada"
- "Otimizar investimento em conteúdo"

---

## 6️⃣ Como Usar no n8n/Make/Zapier:

### n8n Example:
```javascript
// Acessar dados de rastreamento
const tracking = $json.tracking;
const sections = tracking.visited_sections;
const journey = tracking.user_journey;
const timeEngaged = new Date(tracking.last_interaction) - new Date(tracking.first_interaction);

// Criar tags baseado na jornada
if (sections.includes('projects')) {
  tags.push('interested_in_projects');
}

if (sections.length >= 5) {
  tags.push('high_engagement');
}

if (timeEngaged > 180000) { // 3 minutos
  tags.push('qualified_lead');
}
```

### Make.com:
Use os campos:
- `tracking.visited_sections` - Array de seções
- `tracking.user_journey` - String formatada
- `tracking.utm_campaign` - Nome da campanha

### Zapier:
Os campos ficam disponíveis como:
- `Tracking Visited Sections`
- `Tracking User Journey`
- `Tracking UTM Campaign`

---

## 7️⃣ Exemplos de Variações de UTM:

### Usuário que só clicou (não preencheu):
```
utm_medium=form_click
utm_content=clicked_form_home_features_testimonials
```

### Usuário preenchendo o campo de email:
```
utm_medium=form_fill
utm_content=filled_email_from_projects
```

### Usuário que enviou de outra seção:
```
utm_medium=form_submit
utm_campaign=contact_3_sections
utm_content=submitted_from_about
```

---

## 8️⃣ Debug em Tempo Real:

### No Browser Console:
```javascript
// Ao enviar o formulário, você verá:
📊 Dados de Rastreamento: {
  url: "https://flow.agenciatouch.com.br/webhook/...?utm_source=website&utm_medium=form_submit...",
  payload: { ...todos os dados... }
}

✅ Formulário enviado com sucesso!
```

### Com o Debugger Visual:
Clique no botão flutuante 🎯 ou pressione **Alt + Shift + D** durante o desenvolvimento para ver:
- UTM Parameters atualizando em tempo real
- Seções sendo adicionadas conforme você rola
- Interações registradas conforme você preenche

---

## 9️⃣ Teste Rápido:

1. Inicie o servidor dev: `npm run dev`
2. Abra o browser: `http://localhost:3000`
3. Clique no botão 🎯 ou pressione `Alt + Shift + D` para abrir o debugger
4. Role a página e veja as seções sendo registradas
5. Clique no formulário
6. Preencha os campos (veja as interações)
7. Abra o Console (F12)
8. Envie o formulário
9. Veja os dados completos no console

---

## 🎉 Pronto para Usar!

O sistema está completo e funcionando. Cada envio do formulário agora inclui:
- ✅ UTM parameters na URL
- ✅ Jornada completa do usuário
- ✅ Todas as interações rastreadas
- ✅ Timestamps de primeira e última interação
- ✅ Caminho visual da navegação

Todos esses dados chegam no seu webhook do n8n para você processar!
