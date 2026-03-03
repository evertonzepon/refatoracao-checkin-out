# 🚀 Guia Rápido - Como Iniciar o Protótipo

## 📂 Arquivos do Projeto

```
refatoracao-checkin-out/
├── index.html              ← Abra este arquivo no navegador (ARQUIVO PRINCIPAL)
├── style.css               ← Estilos (carregado automaticamente)
├── app.js                  ← Lógica da aplicação (carregado automaticamente)
├── README.md               ← Documentação completa
├── TESTES.md               ← Guia de testes e demonstração
├── ARQUITETURA.md          ← Detalhes técnicos
├── ../data/dados-exemplo.json      ← Exemplos de dados e estrutura API
└── GUIA-RAPIDO.md          ← Este arquivo
```

---

## ⚡ 3 Formas Rápidas de Abrir

### Opção 1: Clique Duplo (Recomendado para Windows)
1. Vá até a pasta: `C:\Users\EvertonZepon\Desktop\refatoracao-checkin-out`
2. Clique duplo no arquivo **`index.html`**
3. Seu navegador padrão abrirá o protótipo

### Opção 2: Arrastar para o Navegador
1. Abra seu navegador (Chrome, Firefox, Edge, Safari)
2. Clique e arraste o arquivo **`index.html`** para a aba do navegador
3. O protótipo carregará

### Opção 3: Usar Terminal PowerShell
```powershell
# Navegue até a pasta
cd "C:\Users\EvertonZepon\Desktop\refatoracao-checkin-out"

# Abra o arquivo no navegador padrão
Invoke-Item index.html

# OU use um servidor local (Python)
python -m http.server 8000
# Depois acesse http://localhost:8000
```

---

## 🎯 Primeiro Teste (2 Minutos)

1. **Abra o arquivo `index.html`** ↓
   
   ![Tela inicial carrega com interface completa]

2. **Clique no botão "🔍 Simular Leitura de QR Code"** ↓
   
   ![Sistema solicita permissão de geolocalização]

3. **Clique em "Permitir"** (ou "Allow") ↓
   
   ![Um código 2FA de 6 dígitos aparece]

4. **Copie o código mostrado** ↓
   
   ```
   Código Gerado: [234567]
   ```

5. **Cole no campo "Digite o código"** ↓
   
   ![Campo de entrada do código 2FA]

6. **Clique em "✓ Validar Código"** ↓
   
   ![Resultado de validação aparece]

7. **Veja o resultado** ↓
   ```
   ✓ ENTRADA VALIDADO COM SUCESSO!
   
   • Distância: 50.45 m ✓
   • Horário: 08:15 ✓ (dentro de 07:00-11:00)
   • Status: OK
   ```

8. **Clique em "OK"** para finalizar ↓
   
9. **Verifique a tabela de histórico** ↓
   
   ![Registro aparece na tabela de presença]

10. **Atualize a página (F5)** e veja que o dado persiste ↓

---

## ✨ Características Demo

### Painel Esquerdo (Informações)
- 👤 Dados do usuário (João Silva, Matrícula 001)
- 🏢 Endereço e coordenadas GPS
- ⏰ Horários do contrato
- ℹ️ Janelas de validação

### Painel Central (Interação)
- 📊 Status em tempo real
- 📱 Simulação de QR Code
- 🔐 Autenticação 2FA
- ✅ Validação multi-camadas

### Painel Inferior (Histórico)
- 📋 Tabela com todos os registros
- 🔄 Dados persistem no navegador
- 📊 Visualização completa de todas as tentativas

---

## 🔧 Testar Diferentes Cenários

### Teste 1: Entrada Válida ✓
- Horário: 08:00 - 11:00 (entre 7:00-11:00) ✓
- Localização: Dentro de 100m ✓
- **Resultado: OK**

### Teste 2: Entrada Inválida (Horário)
- Horário: 12:00 (fora de 7:00-11:00) ✗
- Localização: Dentro de 100m ✓
- **Resultado: NOK - Fora da janela**

### Teste 3: Saída Válida
- Horário: 17:00 - 19:00 (entre 15:00-19:00) ✓
- Localização: Dentro de 100m ✓
- **Resultado: OK**

### Teste 4: Código 2FA Errado
- Digite: 000000 (código diferente)
- **Resultado: Alerta "Código incorreto"**

---

## 🎨 Interface Responsiva

O sistema funciona em:
- ✅ Desktop (1920x1080, 1366x768)
- ✅ Tablet (iPad, Android tablets)
- ✅ Mobile (iPhone, Android phones)

Para testar mobile, pressione **F12** → **Ctrl+Shift+M** (ou ⌘+Shift+M no Mac)

---

## 📍 Dados do Protótipo

```
Usuário:        João Silva (Matrícula 001)
Local:          Motorista PX, Rua Itajubá, 768
                Joinville/SC
Coordenadas:    Latitude: -26.253337
                Longitude: -48.841455
Raio:           100 metros
Entrada:        08:00 (janela: 07:00-11:00)
Saída:          17:00 (janela: 15:00-19:00)
```

---

## 🔐 2FA (Two-Factor Authentication)

### Como Funciona:
1. **Scan QR Code** 
   - Simula leitura de um QR code
   - Contém dados de localização e validação

2. **Geração de Código Aleatório**
   - 6 dígitos aleatórios (000000 - 999999)
   - Muda a cada scan
   - Expira em 5 minutos

3. **Validação Manual**
   - Usuário digita os 6 dígitos
   - Sistema valida se está correto
   - Só depois disso faz as outras validações

4. **Validações Técnicas**
   - Distância: até 100 metros
   - Horário: dentro da janela permitida
   - Resultado: OK ou NOK

---

## 💾 Dados Salvos Automaticamente

Todos os registros são salvos no **localStorage** do navegador:

```javascript
// Para ver os dados no console (F12):
JSON.parse(localStorage.getItem('presenceHistory'))

// Para limpar histórico:
localStorage.clear()
```

Os dados permanecem mesmo após:
- ✓ Fechar o navegador
- ✓ Fechar a aba
- ✓ Reiniciar o computador

---

## 🧪 Testes Recomendados (10 min)

1. **Teste de Sucesso** (2 min)
   - Clique em Scan → Digite código 2FA → Sucesso esperado

2. **Teste de Código Errado** (1 min)
   - Clique em Scan → Digite código diferente → Erro esperado

3. **Teste de Persistência** (2 min)
   - Faça um checkin → Recarregue página (F5) → Dado deve estar lá

4. **Teste de Múltiplos Registros** (3 min)
   - Faça 3-4 checklins diferentes → Veja todos na tabela

5. **Teste Responsivo** (2 min)
   - Pressione F12 → Teste em mobile view

---

## 📱 Testar em Celular

### Com Servidor Local:
```powershell
# No PowerShell, na pasta do projeto:
python -m http.server 8000

# No celular, acesse: http://SEU_IP_LOCAL:8000
# (ex: http://192.168.1.100:8000)
```

### Vantagens em Mobile:
- ✓ Geolocalização funciona melhor
- ✓ Mais realista que simulação
- ✓ Pode testar com localização real

---

## 🆘 Troubleshooting Rápido

| Problema | Solução |
|----------|---------|
| **Página em branco** | Abra o arquivo index.html (não o CSS ou JS) |
| **Estilo confuso** | Certifique-se que style.css está na mesma pasta |
| **Botões não funcionam** | Verifique se app.js está na mesma pasta |
| **Geoloc não funciona** | Clique em "Permitir" quando solicitar permissão |
| **Histórico desapareceu** | localStorage pode estar desabilitado (modo privado) |
| **Código não valida** | Verifique se está digitando exatamente o código mostrado |

---

## 🎯 Próximas Etapas Sugeridas

### Para Aprofundar:
1. Leia o **README.md** para documentação completa
2. Leia o **TESTES.md** para mais cenários de teste
3. Leia o **ARQUITETURA.md** para entender a estrutura técnica

### Para Estender:
1. Adicionar leitor real de QR code (biblioteca jsQR)
2. Adicionar câmera de selfie para foto
3. Integrar com API backend
4. Adicionar autenticação de usuário
5. Criar painel admin para gerenciar usuários
6. Gerar relatórios de presença

### Para Produção:
1. Mover para servidor web real
2. Implementar backend em Node/Python/Java
3. Adicionar database (PostgreSQL/MySQL)
4. Implementar autenticação real (OAuth/LDAP)
5. Adicionar HTTPS
6. Implementar sincronização offline

---

## 📞 Comandos Úteis (Console - F12)

```javascript
// Ver dados do usuário
console.log(USER);

// Ver histórico completo
console.log(appState.presenceHistory);

// Ver localização atual
console.log(appState.userLocation);

// Ver estado da aplicação
console.log(appState);

// Limpar todos os dados
localStorage.clear();
console.log("Dados limpos!");

// Ver número de registros
console.log("Total de registros:", appState.presenceHistory.length);

// Exportar histórico como JSON
JSON.stringify(appState.presenceHistory, null, 2);
```

---

## ✅ Checklist Inicial

- [ ] Arquivo index.html aberto no navegador
- [ ] Interface carregou sem erros
- [ ] Cliquei em "Simular Leitura de QR Code"
- [ ] Permiti acesso à geolocalização
- [ ] Código 2FA foi gerado
- [ ] Digitei o código e validei
- [ ] Resultado apareceu na tela
- [ ] Histórico foi atualizado
- [ ] Retirei página (F5) e dados persistiram

---

## 🎉 Sucesso!

Se conseguiu fazer todos os passos acima, o protótipo está funcionando perfeitamente!

**Próximo passo**: Explore os testes mais avançados no arquivo **TESTES.md**

---

**Versão**: 1.0  
**Data**: 2026-02-26  
**Tempo de Setup**: < 1 minuto  
**Tempo de Primeiro Teste**: 2-3 minutos  

**¡Bom uso! 🚀**
