# 🚀 Guia Rápido - Como Iniciar o Protótipo

## 📂 Arquivos do Projeto

```
refatoracao-checkin-out/
├── src/
│   ├── html/
│   │   └── index.html          ← Abra este arquivo no navegador (ARQUIVO PRINCIPAL)
│   ├── css/
│   │   └── style.css           ← Estilos (carregado automaticamente)
│   └── js/
│       └── app.js              ← Lógica da aplicação (carregado automaticamente)
├── README.md                   ← Documentação completa
├── data/
│   └── dados-exemplo.json      ← Exemplos de dados e estrutura API
└── docs/
    ├── GUIA-RAPIDO.md          ← Este arquivo
    ├── COMECE.md
    ├── TESTES.md
    ├── ARQUITETURA.md
    └── INDICE.md
```

---

## ⚡ 3 Formas Rápidas de Abrir

### Opção 1: Clique Duplo (Recomendado para Windows)
1. Vá até a pasta: `C:\Users\EvertonZepon\Desktop\refatoracao-checkin-out\src\html`
2. Clique duplo no arquivo **`index.html`**
3. Seu navegador padrão abrirá o protótipo

### Opção 2: Arrastar para o Navegador
1. Abra seu navegador (Chrome, Firefox, Edge, Safari)
2. Clique e arraste o arquivo **`src/html/index.html`** para a aba do navegador
3. O protótipo carregará

### Opção 3: Usar Terminal PowerShell
```powershell
# Navegue até a pasta
cd "C:\Users\EvertonZepon\Desktop\refatoracao-checkin-out\src\html"

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

## 🎯 Segundo Teste - Painel do Cliente (2 Minutos)

1. **Clique na aba "🎯 Painel do Cliente"** ↓
   
   ![Painel do Cliente abre]

2. **Clique no botão "✨ Gerar Código 2FA"** ↓
   
   ![Um código de 6 dígitos é gerado, válido por 15 minutos]

3. **Clique em "📋 Copiar Código"** ↓
   
   ![Código copiado para clipboard]

4. **Volte à aba "📱 Checkin/QRCode"** ↓

5. **Clique em "🔍 Simular Leitura de QR Code"** ↓

6. **Cole o código do cliente** (ao invés do código do QR) ↓

7. **Clique em "✓ Validar Código"** ↓
   
   ![Resultado: ✅ VALIDADO automaticamente - sem validação de local ou horário!]

8. **Veja no histórico** que o registro marca "usou código do cliente" ↓

---

## 🔐 Usar Código 2FA do Cliente (Alternativo)

1. **Vá até o "🎯 Painel do Cliente"** ↓

2. **Clique em "✨ Gerar Código 2FA"** ↓
   
   Um código de 6 dígitos será gerado (válido por 15 minutos)

3. **Copie o código** usando o botão "📋 Copiar" ↓

4. **Volte à aba "📱 Checkin/QRCode"** ↓

5. **Clique em "🔍 Usar Código 2FA do Cliente"** ↓
   
   Modal abrirá pedindo o código

6. **Cole o código copiado** ou digite os 6 dígitos ↓

7. **Clique em "Validar Código"** ↓
   
   ![Checkin/Checkout realizado automaticamente!]

8. **Veja no histórico** o registro com código do cliente usado ↓

---

## ✨ Características Demo

### 4 Telas Principais (Navegação por Abas)

**📱 Checkin/QRCode**
- 📊 Status em tempo real e dinâmico
- 📱 Simulação de QR Code
- 🔐 Autenticação 2FA (45 segundos)
- 🔑 Opção de Senha Mestre
- ✅ Validação multi-camadas

**🎯 Painel do Cliente**
- ✨ Geração de Código 2FA (15 minutos)
- 📋 Copiar código para clipboard
- ⏱️ Timer de expiração visual
- 🚫 Botão revogar código
- 📜 Histórico de códigos gerados

**📋 Contrato / Usuário**
- 👥 Seletor de 8 prestadores
- 👤 Dados do usuário selecionado
- 🏢 Endereço e coordenadas GPS
- ⏰ Horários do contrato
- ℹ️ Janelas de validação específicas

**🕒 Histórico**
- 📋 Tabela com 9 colunas
- 🔄 Dados persistem no navegador
- 🎨 Coloração por status (verde/vermelho)
- 📊 Indica se usou código do cliente

---

## 🔧 Testar Diferentes Cenários

### Teste 1: Entrada Válida (QR Code Normal) ✓
- Usuário: Bruno Reichembak
- Horário: 07:15 (entre 06:00-10:00) ✓
- Localização: Dentro de 150m ✓
- **Resultado: ✅ VALIDADO**

### Teste 2: Entrada Inválida (Horário) ✗
- Horário: 12:00 (fora de 06:00-10:00) ✗
- Localização: Dentro de 150m ✓
- **Resultado: ❌ INVÁLIDO - Fora da janela**

### Teste 3: Entrada Inválida (Distância) ✗
- Horário: 07:15 (dentro) ✓
- Localização: Longe, > 150m ✗
- **Resultado: ❌ INVÁLIDO - Fora do raio**

### Teste 4: Saída Válida ✓
- Horário: 17:00 - 18:00 (entre 15:00-19:00) ✓
- Localização: Dentro de 150m ✓
- **Resultado: ✅ VALIDADO**

### Teste 5: Código 2FA Errado ✗
- Digite: 000000 (código diferente do exibido)
- **Resultado: Alerta "Código incorreto"**

### Teste 6: Código do Cliente (Bypass)
- Gere código no Painel do Cliente
- Use esse código ao invés do QR
- **Resultado: ✅ VALIDADO - sem restrições**

### Teste 7: Múltiplos Usuários
- Na aba "Contrato", troque de prestador
- Cada um tem horários e locais diferentes
- Teste diferentes janelas de validação

---

## 🎨 Interface Responsiva

O sistema funciona em:
- ✅ Desktop (1920x1080, 1366x768)
- ✅ Tablet (iPad, Android tablets)
- ✅ Mobile (iPhone, Android phones)

Para testar mobile, pressione **F12** → **Ctrl+Shift+M** (ou ⌘+Shift+M no Mac)

---

## 📍 Dados do Protótipo

### 8 Prestadores Cadastrados

```
1. Bruno Reichembak (001)  - Joinville/SC    - 07:00-17:00
2. Maria Souza (002)       - São Paulo/SP    - 09:00-18:00
3. Carlos Pereira (003)    - Rio de Janeiro  - 06:00-14:00
4. Ana Costa (004)         - São Paulo/SP    - 12:00-20:00
5. Pedro Santos (005)      - Curitiba/PR     - 20:00-04:00 (noturno)
6. Lucia Martins (006)     - São Paulo/SP    - 05:00-13:00
7. Roberto Alves (007)     - São Paulo/SP    - 10:00-18:00
8. Fernanda Oliveira (008) - Belém/PA        - 07:00-15:00
```

### Usuário Padrão: Bruno Reichembak

```
Usuário:        Bruno Reichembak (Matrícula 001)
Local:          Motorista PX, Rua Itajubá, 768
                Bom Retiro, Joinville/SC
Coordenadas:    Latitude: -26.253337
                Longitude: -48.841455
Raio:           200 metros
Entrada:        07:00 (janela: 06:00-10:00)
                1h antes + 3h depois
Saída:          17:00 (janela: 15:00-19:00)
                2h antes + 2h depois
```

### Credenciais de Acesso

```
Códigos 2FA:    Gerados automaticamente (6 dígitos)
                - QR Code: 45 segundos
                - Cliente: 15 minutos (via Painel do Cliente)
```

---

## 🔐 2FA (Two-Factor Authentication)

### Dois Tipos de Código 2FA:

#### 1️⃣ Código QR (Validação Normal)
- **Geração**: Ao clicar em "Simular QR Code"
- **Validade**: 45 segundos
- **Timer**: Countdown visual (verde → amarelo → vermelho)
- **Validações**: Distância + Horário aplicadas
- **Uso**: Checkin normal com todas as restrições

#### 2️⃣ Código Cliente (Bypass)
- **Geração**: Painel do Cliente → "Gerar Código 2FA"
- **Validade**: 15 minutos
- **Timer**: Countdown visual no painel
- **Validações**: IGNORADAS (❌ distância, ❌ horário)
- **Uso**: Situações excepcionais
- **Rastreabilidade**: Marcado no histórico

### Fluxo de Validação:

```
1. Scan QR Code / Gerar Código / Senha Mestre
         ↓
2. Sistema gera/solicita código 6 dígitos
         ↓
3. Usuário digita código
         ↓
4. Sistema valida código
         ↓
5a. Código QR    → Valida distância + horário
5b. Código Cliente → Aprova automaticamente
5c. Senha Mestre   → Aprova automaticamente
         ↓
6. Registra no histórico
```

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
