# 🚀 Teste Rápido - 2 Minutos

## 1️⃣ Inicie o servidor
```bash
npm run dev
```

## 2️⃣ Abra no navegador
```
http://localhost:3000
```

## 3️⃣ Ative o Debug
Você verá um **botão redondo 🎯** no canto inferior direito da tela.

**Clique nele!**

Ou pressione: `Alt + Shift + D`

## 4️⃣ Teste o Rastreamento

### Role a página devagar
Veja as seções aparecendo no painel:
- ✅ home
- ✅ features  
- ✅ testimonials
- ✅ about
- ✅ projects
- ✅ contact

### Interaja com o formulário
1. **Clique** no formulário (fundo branco)
   - Aparece: `form_clicked`

2. **Preencha** os campos
   - Digite seu nome → Aparece: `filled_name`
   - Digite email → Aparece: `filled_email`
   - Digite telefone → Aparece: `filled_phone`
   - Digite mensagem → Aparece: `filled_message`

## 5️⃣ Veja os dados sendo enviados

### Abra o Console
Pressione `F12` e vá na aba **Console**

### Envie o formulário
Clique em "Submit"

### Veja o log
```
📊 Dados de Rastreamento: {
  url: "...?utm_source=website&utm_medium=form_submit&utm_campaign=contact_6_sections...",
  payload: { 
    tracking: { ... todos os dados ... }
  }
}

✅ Formulário enviado com sucesso!
```

## 6️⃣ Verifique no n8n

Vá no seu n8n e veja os dados chegando no webhook:
```
https://flow.agenciatouch.com.br
```

---

## ✅ Funcionou?

Se você viu:
- ✅ Botão 🎯 apareceu
- ✅ Painel de debug abriu
- ✅ Seções foram registradas ao rolar
- ✅ Interações apareceram ao preencher
- ✅ Dados completos no console
- ✅ Webhook recebeu os dados no n8n

**🎉 Está tudo funcionando perfeitamente!**

---

## ❌ Problemas?

### Botão 🎯 não aparece
- Certifique-se que rodou `npm run dev` (não `npm run build`)
- Recarregue a página (Ctrl+R)

### Painel não abre
- Tente o atalho: `Alt + Shift + D`
- Veja se há erros no Console (F12)

### Dados não aparecem
- Abra o Console (F12)
- Procure por erros em vermelho
- Veja o arquivo [TESTING_GUIDE.md](TESTING_GUIDE.md) para troubleshooting completo

---

## 📚 Quer mais detalhes?

- [TRACKING_README.md](TRACKING_README.md) - Documentação completa
- [TRACKING_EXAMPLE.md](TRACKING_EXAMPLE.md) - Exemplos de dados
- [TESTING_GUIDE.md](TESTING_GUIDE.md) - Guia de teste completo

---

## 🎯 Pronto!

Agora você já sabe que está funcionando. Todo envio do formulário vai incluir:
- UTM parameters na URL
- Jornada completa do usuário
- Todas as interações rastreadas
- Timestamps de primeira e última interação

**Tudo isso chega no seu webhook do n8n automaticamente!** 🚀
