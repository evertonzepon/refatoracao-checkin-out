# 🏗️ Arquitetura Técnica - Sistema de Checkin/Checkout

## 📁 Estrutura de Arquivos

```
refatoracao-checkin-out/
├── README.md            # Documentação principal
├── src/                 # Código-fonte da aplicação
│   ├── index.html       # Página HTML principal
│   ├── style.css        # Estilos CSS
│   └── app.js           # Lógica JavaScript
├── data/                # Exemplos de JSON/dados estáticos
│   └── dados-exemplo.json
└── docs/                # Documentação e guias
    ├── ARQUITETURA.md   # Este arquivo
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

### 1️⃣ Fluxo de Checkin/Checkout

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
Exibe Código para Usuário
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
                    updateHistoryTable()
                            ↓
                    updateStatus()
```

---

## 🔧 Componentes Principais

### 1. **DATA LAYER** (Dados)

```javascript
USER = {
  name,
  matricula,
  location: {
    address,
    lat,
    lon,
    radiusInMeters
  },
  contract: {
    entryTime,
    exitTime,
    entryWindow: { before, after },
    exitWindow: { before, after }
  }
}

appState = {
  checkedIn: boolean,
  currentQRData: object | null,
  currentCode: string | null,
  userLocation: { lat, lon } | null,
  presenceHistory: []
}
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
```

#### Função: validateTimeWindow()
```
Entrada: currentTime, scheduledTime, isEntry
Cálculo: 
  - Se ENTRADA: window = [scheduled - 1h] até [scheduled + 3h]
  - Se SAÍDA: window = [scheduled - 2h] até [scheduled + 2h]
Saída: { valid: boolean, windowStart, windowEnd, message }
```

#### Função: generateRandomCode()
```
Entrada: none
Processo: Math.random() * 1000000 → padStart(6, '0')
Saída: string de 6 dígitos
```

#### Função: determineCheckType()
```
Entrada: currentTime
Lógica: Compara distância para horário entrada vs saída
Saída: "ENTRADA" | "SAÍDA"
```

### 3. **PRESENTATION LAYER** (View)

**HTML Structure:**
```
div.container
├── header
├── div.main-content
│   ├── aside.left-panel (Usuário, contrato, horários)
│   └── main.right-panel (Scan, 2FA, validação)
├── section.history-section
└── footer
```

**CSS Utilities:**
- Grid Layout para responsividade
- Flexbox para alinhamento
- CSS Variables para tema
- Animações para feedback visual
- Media queries para mobile

### 4. **STORAGE LAYER** (Persistência)

```javascript
localStorage.setItem('presenceHistory', JSON.stringify(history))
localStorage.getItem('presenceHistory') → JSON.parse()
```

---

## 🔄 Ciclo de Vida da Aplicação

```
1. LOAD (DOMContentLoaded)
   ├─ init()
   ├─ getPresenceHistory() from localStorage
   ├─ updateStatus()
   ├─ updateHistoryTable()
   └─ setInterval(updateStatus, 1000) // Atualiza hora

2. INTERACTION (User Click)
   ├─ scanQRBtn.click()
   ├─ simulateQRCodeScan()
   ├─ getUserLocation()
   ├─ Exibe 2FA
```