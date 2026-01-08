# 🧪 Como Testar o Sistema de Rastreamento

## Teste Rápido (5 minutos)

### 1. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

### 2. Abra o navegador
```
http://localhost:3000
```

### 3. Ative o Debug Mode
Clique no botão flutuante 🎯 no canto inferior direito OU pressione: **Alt + Shift + D**

Você verá um painel no canto inferior direito mostrando:
- UTM Parameters em tempo real
- Seções visitadas
- Interações com o formulário

### 4. Navegue pelo site
- Role a página devagar
- Veja as seções sendo adicionadas no debugger:
  - ✅ home
  - ✅ features
  - ✅ testimonials
  - ✅ about
  - ✅ projects
  - ✅ contact

### 5. Interaja com o formulário
1. **Clique** no formulário (não nos campos, mas no fundo branco)
   - Veja aparecer: `form_clicked` nas interações
   - UTM Medium muda para: `form_click`

2. **Preencha** o campo Nome
   - Digite qualquer coisa
   - Veja aparecer: `filled_name` nas interações
   - UTM Medium muda para: `form_fill`

3. **Preencha** os outros campos
   - Email
   - Telefone
   - Mensagem

### 6. Abra o Console do Browser
Pressione **F12** e vá na aba "Console"

### 7. Envie o formulário
Clique em "Submit"

### 8. Veja os dados no Console
Você verá algo assim:

```
📊 Dados de Rastreamento: {
  url: "https://flow.agenciatouch.com.br/webhook/...?utm_source=website&utm_medium=form_submit&utm_campaign=contact_6_sections&utm_content=submitted_from_contact",
  payload: {
    name: "...",
    email: "...",
    tracking: {
      visited_sections: ["home", "features", "testimonials", "about", "projects", "contact"],
      form_interactions: ["form_clicked", "filled_name", "filled_email", "filled_phone", "filled_message", "form_submitted"],
      user_journey: "home → features → testimonials → about → projects → contact"
    }
  }
}

✅ Formulário enviado com sucesso!
```

---

## Teste no n8n

### Verifique o Webhook
1. Vá no seu n8n: https://flow.agenciatouch.com.br
2. Encontre o workflow com o webhook: `a583e69e-60d1-4a81-b804-4ce19fee9e66`
3. Ative o modo "Test" ou veja o histórico de execuções

### Dados que Chegarão:

```json
{
  "name": "Nome do Usuário",
  "email": "email@example.com",
  "phone": "(555) 123-4567",
  "message": "Mensagem do usuário",
  "formType": "contact",
  "timestamp": "2026-01-08T...",
  "tracking": {
    "utm_source": "website",
    "utm_medium": "form_submit",
    "utm_campaign": "contact_X_sections",
    "utm_content": "submitted_from_contact",
    "visited_sections": [...],
    "form_interactions": [...],
    "first_interaction": "...",
    "last_interaction": "...",
    "user_journey": "..."
  }
}
```

### Use no n8n:

```javascript
// Acessar dados
const sections = $json.tracking.visited_sections;
const journey = $json.tracking.user_journey;
const utmCampaign = $json.tracking.utm_campaign;

// Criar lógica
if (sections.includes('projects')) {
  // Lead interessado em projetos
  leadScore += 10;
}

if (sections.length >= 5) {
  // Lead engajado
  leadTag = 'high_engagement';
}
```

---

## Teste de Diferentes Cenários

### Cenário 1: Usuário Impaciente
1. Entre no site
2. Role direto até o formulário
3. Clique e preencha rápido
4. Envie

**Resultado:**
- `visited_sections`: ["home", "contact"]
- `utm_campaign`: "contact_2_sections"
- Lead pouco engajado

---

### Cenário 2: Usuário Explorador
1. Entre no site
2. Role devagar por TODAS as seções
3. Pare em cada uma por alguns segundos
4. Clique no formulário (mas não preencha ainda)
5. Espere 10 segundos
6. Preencha os campos
7. Envie

**Resultado:**
- `visited_sections`: ["home", "features", "testimonials", "about", "brands", "projects", "contact"]
- `form_interactions`: ["form_clicked", ... campos ..., "form_submitted"]
- `utm_campaign`: "contact_7_sections"
- Lead muito engajado
- Tempo de 30+ segundos entre first e last interaction

---

### Cenário 3: Usuário que Abandona
1. Entre no site
2. Role até o formulário
3. Clique no formulário
4. Preencha apenas o nome
5. **NÃO ENVIE** - Feche a aba

**Resultado:**
- Dados ficam apenas no browser (não são enviados)
- Pode adicionar rastreamento de "abandonos" futuramente

---

## Verificar Logs

### No Browser Console:
- **F12** → Aba Console
- Veja logs em tempo real

### No n8n:
- Vá em "Executions"
- Veja o histórico de webhooks recebidos
- Expanda o JSON e veja todos os dados

### No Make/Zapier:
- Vá em "History" ou "Task History"
- Veja os dados recebidos do webhook

---

## Troubleshooting

### Debug não aparece?
- Certifique-se que está em modo development: `npm run dev`
- Clique no botão flutuante 🎯 ou pressione **Alt + Shift + D**

### Seções não são rastreadas?
- Verifique se as seções têm IDs:
  - Hero: `id="home"`
  - Features: `id="features"`
  - Testimonials: `id="testimonials"`
  - etc.

### Formulário não envia dados?
- Abra o Console (F12)
- Procure por erros em vermelho
- Verifique se o webhook está funcionando

### UTM não aparece na URL?
- Verifique o Console ao enviar
- A URL com UTM deve aparecer no log

---

## Checklist de Teste ✅

- [ ] Servidor dev rodando
- [ ] Debug mode ativado (botão 🎯 ou Alt+Shift+D)
- [ ] Rolar página e ver seções no debugger
- [ ] Clicar no formulário (ver `form_clicked`)
- [ ] Preencher campos (ver `filled_*`)
- [ ] Console aberto (F12)
- [ ] Enviar formulário
- [ ] Ver dados completos no console
- [ ] Verificar webhook no n8n
- [ ] Confirmar dados recebidos

---

## Próximos Passos

Após confirmar que tudo funciona:

1. **Remover console.logs** (opcional - mantenha se quiser debug em prod)
2. **Desativar TrackingDebugger** em produção (já está configurado)
3. **Deploy** normal do site
4. **Configurar n8n** para processar os dados
5. **Criar dashboards** com os insights

---

## Perguntas Frequentes

**Q: O rastreamento funciona em produção?**
A: Sim! O TrackingDebugger só aparece em desenvolvimento, mas o rastreamento funciona sempre.

**Q: Afeta a performance?**
A: Não. O rastreamento é leve e usa APIs nativas do browser (IntersectionObserver).

**Q: É compatível com LGPD?**
A: Sim. Não coleta dados pessoais até o envio do formulário (com consentimento).

**Q: Posso personalizar os UTM?**
A: Sim! Edite o arquivo [useUserTracking.ts](src/hooks/useUserTracking.ts)

**Q: Funciona em mobile?**
A: Sim! Funciona em todos os dispositivos.

---

## Suporte

Dúvidas? Verifique:
- [TRACKING_README.md](TRACKING_README.md) - Documentação completa
- [TRACKING_EXAMPLE.md](TRACKING_EXAMPLE.md) - Exemplos de dados
- Este arquivo - Instruções de teste

---

## 🎉 Boa Sorte!

Teste o sistema e veja a mágica acontecer! 🚀
