# 🏗️ Arquitetura Técnica - Sistema de Checkin/Checkout

## 📁 Estrutura de Arquivos

```
refatoracao-checkin-out/
├── README.md                   # Documentação principal
├── src/                        # Código-fonte da aplicação
│   ├── html/
│   │   └── index.html          # Página HTML principal (367 linhas)
│   ├── css/
│   │   └── style.css           # Estilos CSS
│   └── js/
│       └── app.js              # Lógica JavaScript (1010 linhas)
├── data/                       # Exemplos de JSON/dados estáticos
│   └── dados-exemplo.json
└── docs/                       # Documentação e guias
    ├── ARQUITETURA.md          # Este arquivo
    ├── COMECE.md
    ├── GUIA-RAPIDO.md
    ├── INDICE.md
    └── TESTES.md
```

## 🏛️ Arquitetura da Aplicação

### Padrão MVC (Model-View-Controller)

```
┌─────────────────────────────────────────────┐
│           INTERFACE (View)                  │
│   HTML + CSS + Event Listeners              │
└────────────────────┬────────────────────────┘
                     │
┌────────────────────▼────────────────────────┐
│         LÓGICA (Controller)                 │
│ - Validações                                │
│ - Processamento                             │
│ - Persistência                              │
└────────────────────┬────────────────────────┘
                     │
┌────────────────────▼────────────────────────┐
│         DADOS (Model)                       │
│ - STATE                                     │
│ - localStorage                              │
└─────────────────────────────────────────────┘
```

---

## 📊 Fluxo de Dados

### 1️⃣ Fluxo de Checkin/Checkout Normal (QR Code)

```
Usuário Clica "Simular QR Code"
            ↓
Solicita Geolocalização
            ↓
getUserLocation() → appState.userLocation
            ↓
Gera Dados QR (com coordenadas)
            ↓
Gera Código 2FA Random (6 dígitos)
            ↓
Inicia Timer (45 segundos)
            ↓
Exibe Modal 2FA com Código para Usuário
            ↓
Usuário Digita Código
            ↓
validate2FACode()
     │
     ├─ Código Incorreto → Alerta → Limpa input
     │
     └─ Código Correto → performPresenceValidation()
                            ↓
                    Calcula Distância (Haversine)
                    Valida Distância vs Raio
                    Valida Horário vs Janela
                    Determina Tipo (ENTRADA/SAÍDA)
                            ↓
                    Cria Registro de Presença
                            ↓
                    Salva em appState.presenceHistory
                            ↓
                    savePresenceHistory() → localStorage
                            ↓
                    showValidationResults()
                            ↓
                    Exibe Modal de Resultado
                            ↓
                    updateHistoryTable()
                            ↓
                    updateStatus()
```

### 2️⃣ Fluxo do Painel do Cliente (Código Autorização)

```
Cliente Clica "Gerar Código 2FA"
            ↓
generateClientCode()
            ↓
Gera Código Random (6 dígitos)
Define Expiração (+15 minutos)
            ↓
appState.activeClientCode = code
appState.activeClientCodeExpiry = expiresAt
            ↓
Registra no Histórico de Códigos
            ↓
saveClientCodesHistory() → localStorage
            ↓
Exibe Código Ativo com Timer
            ↓
startClientCodeTimer() (countdown visual)
            ↓
Cliente Copia Código (botão "Copiar")
            ↓
[Prestador usa código no fluxo normal]
            ↓
validate2FACode()
    │
    ├─ Verifica código QR (normal)
    │
    └─ Verifica código do cliente (activeClientCode)
            │
            └─ Se válido → appState.usedClientCode = true
                            ↓
                    performPresenceValidation()
                    (ignora validações de distância e horário)
```

### 3️⃣ Fluxo Alternativo com Código 2FA do Cliente

```
Prestador Clica "Usar Código 2FA do Cliente"
            ↓
Exibe Modal para Entrada do Código 2FA
            ↓
showMasterPasswordModal()
            ↓
Prestador Digita Código do Cliente (6 dígitos)
            ↓
validateMasterPassword()
     │
     ├─ Código Inválido ou Expirado → Alerta
     │
     └─ Código Válido → appState.usedClientCode = true
                          ↓
                    getUserLocation() (opcional)
                          ↓
                    performPresenceValidation()
                    (ignora validações de distância e horário)
```

---

## 🔧 Componentes Principais

### 1. **DATA LAYER** (Dados)

```javascript
// Array de 8 usuários/prestadores
USERS = [
  {
    name: string,
    matricula: string,
    location: {
      address: string,
      lat: number,
      lon: number,
      radiusInMeters: number (150 padrão)
    },
    contract: {
      entryTime: "HH:MM",
      exitTime: "HH:MM",
      entryWindow: { before: hours, after: hours },
      exitWindow: { before: hours, after: hours }
    }
  },
  // ... 7 outros usuários
]

appState = {
  selectedUserIndex: number (0-7),
  checkedIn: boolean,
  checkinTime: Date | null,
  checkoutTime: Date | null,
  currentQRData: object | null,
  currentCode: string | null,
  userLocation: { lat, lon } | null,
  presenceHistory: [],
  activeClientCode: string | null,
  activeClientCodeExpiry: Date | null,
  clientCodesHistory: [],
  usedClientCode: boolean
}

// Códigos 2FA do cliente são gerados dinamicamente no painel
```

### 2. **BUSINESS LOGIC LAYER** (Validações)

#### Função: calculateDistance()
```
Entrada: (lat1, lon1, lat2, lon2)
Processo: Haversine Formula
Saída: Distância em metros
```

#### Função: validateDistance()
```
Entrada: distance, radius
Validação: distance <= radius
Saída: { valid: boolean, distance: number, message: string }
Override: usedClientCode = true → sempre válido
```

#### Função: validateTimeWindow()
```
Entrada: currentTime, entryTime, exitTime, isEntry
Cálculo: 
  - Se ENTRADA: window = [scheduled - before*60] até [scheduled + after*60]
  - Se SAÍDA: window = [scheduled - before*60] até [scheduled + after*60]
Saída: { valid: boolean, windowStart, windowEnd, message }
Override: usedClientCode = true → sempre válido
```

#### Função: generateRandomCode()
```
Entrada: none
Processo: Math.random() * 1000000 → padStart(6, '0')
Saída: string de 6 dígitos
Uso: QR Code (45s) e Cliente (15 min)
```

#### Função: determineCheckType()
```
Entrada: currentTime, appState.checkedIn
Lógica: Se já fez checkin (e não fez checkout), retorna SAÍDA, senão ENTRADA
Saída: "ENTRADA" | "SAÍDA"
```

#### Função: generateClientCode()
```
Entrada: none
Processo: 
  - Gera código 6 dígitos
  - Define expiração (+15 min)
  - Salva em activeClientCode
  - Registra em clientCodesHistory
Saída: void (atualiza UI)
```

#### Função: validateMasterPassword()
```
Entrada: código 2FA input
Validação: input === appState.activeClientCode && !expirado
Saída: Se válido, faz checkin direto com usedClientCode = true
```

### 3. **PRESENTATION LAYER** (View)

**Interface com Abas (4 telas):**
```
nav.tabs
├── btn[data-target="screenQR"]      → Checkin/QRCode
├── btn[data-target="screenClient"]  → Painel do Cliente
├── btn[data-target="screenContract"]→ Contrato / Usuário
└── btn[data-target="screenHistory"] → Histórico
```

**HTML Structure por Tela:**
```
TELA 1: screenQR (Checkin/QRCode)
├── Status Atual (badge + mensagem dinâmica)
├── Simulação QR Code + botão Scan
├── Seção Senha Mestre
├── Modal 2FA (Bootstrap 5.3)
│   ├── Timer countdown (45s)
│   ├── Código gerado (display)
│   └── Input para validação
└── Modal Resultado (Bootstrap 5.3)
    └── Grid de validação

TELA 2: screenClient (Painel do Cliente)
├── Card Info do Cliente
├── Botão Gerar Código 2FA
├── Card Código Ativo (se existir)
│   ├── Display do código
│   ├── Timer de expiração (15 min)
│   ├── Botão Copiar
│   └── Botão Revogar
└── Tabela Histórico de Códigos

TELA 3: screenContract (Contrato)
├── Select de Prestador (8 opções)
└── Painéis informativos
    ├── Dados do Usuário
    ├── Contrato Atual
    ├── Horários
    └── Janelas de Validação

TELA 4: screenHistory (Histórico)
└── Tabela de Registros
    ├── 9 colunas (data, nome, matrícula, tipo, dist, etc)
    └── Coloração por status (verde/vermelho)
```

**CSS Utilities:**
- Grid Layout para responsividade
- Flexbox para alinhamento
- CSS Variables para tema
- Animações para feedback visual
- Media queries para mobile
- Bootstrap 5.3 para modais

### 4. **STORAGE LAYER** (Persistência)

```javascript
// Histórico de Presença
localStorage.setItem('presenceHistory', JSON.stringify(history))
localStorage.getItem('presenceHistory') → JSON.parse()

// Histórico de Códigos do Cliente
localStorage.setItem('clientCodesHistory', JSON.stringify(codes))
localStorage.getItem('clientCodesHistory') → JSON.parse()
```

---

## 🔄 Ciclo de Vida da Aplicação

```
1. LOAD (DOMContentLoaded)
   ├─ Inicializar Bootstrap Modals
   ├─ populateUserSelect() (8 usuários)
   ├─ updateContractInfo()
   ├─ getPresenceHistory() from localStorage
   ├─ getClientCodesHistory() from localStorage
   ├─ updateStatus()
   ├─ updateHistoryTable()
   ├─ updateClientCodesHistory()
   ├─ setInterval(updateStatus, 1000) // Atualiza status a cada 1s
   └─ Registrar Event Listeners

2. INTERACTION - Navegação
   ├─ tab-btn.click() → switchScreen(targetId)
   │   ├─ Oculta todas as screens
   │   ├─ Mostra screen target
   │   └─ Atualiza classes das tabs

3. INTERACTION - Checkin Normal
   ├─ scanQRBtn.click()
   ├─ simulateQRCodeScan()
   ├─ getUserLocation()
   ├─ startTimer(45s)
   ├─ show2FAModal()
   ├─ validateCodeBtn.click()
   └─ performPresenceValidation()

4. INTERACTION - Painel Cliente
   ├─ generateClientCodeBtn.click()
   ├─ generateClientCode()
   ├─ startClientCodeTimer() (15 min)
   ├─ updateClientCodeDisplay() (cada 1s)
   ├─ copyCodeBtn.click() → Clipboard API
   └─ revokeCodeBtn.click() → revokeClientCode()

5. INTERACTION - Código 2FA do Cliente
   ├─ masterPasswordBtn.click()
   ├─ showMasterPasswordModal()
   ├─ validateMasterPasswordBtn.click()
   ├─ validateMasterPassword() [valida código 2FA ativo]
   └─ performPresenceValidation() (bypass distance & time validations)

6. INTERACTION - Trocar Usuário
   ├─ userSelect.change()
   ├─ appState.selectedUserIndex = newIndex
   ├─ Reset checkin/checkout state
   ├─ updateContractInfo()
   └─ updateStatus()

7. TIMERS & INTERVALS
   ├─ updateStatus() → cada 1000ms
   ├─ timerInterval (QR Code) → cada 1000ms (45s total)
   └─ clientCodeTimerInterval → cada 1000ms (15 min total)
```

---

## 🎯 Decisões de Design

### Por que Bootstrap 5.3?
- Modais prontos e responsivos
- Componentes acessíveis
- Reduz código CSS customizado
- Familiar para desenvolvedores

### Por que localStorage?
- Protótipo não necessita backend
- Dados persistem entre sessões
- Simples de implementar
- Fácil de migrar para API posteriormente

### Por que múltiplos usuários?
- Simula ambiente real multi-prestador
- Testa diferentes configurações de horário
- Demonstra escalabilidade
- Facilita testes com diversos cenários

### Por que Timer Visual?
- Feedback imediato ao usuário
- Senso de urgência (45s QR, 15 min Cliente)
- Previne confusão sobre expiração
- Melhora UX significativamente

### Por que Código do Cliente?
- Situações excepcionais (emergências, problemas técnicos)
- Flexibilidade para o cliente autorizar
- Rastreabilidade (registrado no histórico)
- Mantém audit trail
- Válido por tempo limitado (15 minutos)
- Mais seguro que senha fixa

---

## 📊 Estatísticas do Código

- **Total de linhas**: ~1600 (HTML: 367, JS: 1010, CSS: ~220)
- **Funções principais**: 30+
- **Usuários cadastrados**: 8
- **Tipos de validação**: 2 (normal com QR, alternativo com código 2FA)
- **Modais**: 3 (2FA, Resultado, Código do Cliente)
- **Telas**: 4 (Checkin, Cliente, Contrato, Histórico)
- **localStorage keys**: 2 (presenceHistory, clientCodesHistory)
- **Timers**: 3 (status, QR, cliente)

---

## 🔐 Segurança e Validações

### Níveis de Segurança

**Nível 1: Máxima Segurança (QR Code Normal)**
- **Validação de geolocalização (raio 200m)
- ✅ Validação de janela temporal
- ✅ Código 2FA (45 segundos)
- ✅ Registrado como validação normal

**Nível 2: Segurança Moderada (Código Cliente)**
- ❌ Sem validação de geolocalização
- ❌ Sem validação temporal
- ✅ Código 2FA (15 minutos, tempo limitado)
- ✅ Registrado como "usou código do cliente"
- ✅ Rastreável e auditável no histórico

---

**Versão**: 2.0  
**Última Atualização**: 2026-03-03  
**Status**: Documentação Completa e Atualizada