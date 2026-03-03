# 📍 Sistema de Checkin/Checkout com QR Code

Protótipo web funcional de um sistema de validação de presença com QR Code, autenticação 2FA e validação geolocalizada. O código foi organizado em pastas (`src/html`, `src/css`, `src/js`, `data`, `docs`) para facilitar manutenção e futuros acréscimos.

## 🎯 Características Principais

✅ **Validação por QR Code** - Simulação de leitura de QR code  
✅ **Autenticação 2FA** - Código aleatório de 6 dígitos para validar presença  
✅ **Painel do Cliente** - Geração de código 2FA para autorização sem restrições  
✅ **Senha Mestre** - Token do cliente para checkin/checkout sem validações  
✅ **Múltiplos Usuários** - Sistema com 8 prestadores pré-configurados  
✅ **Validação de Localização** - Cálculo de distância usando algoritmo Haversine  
✅ **Validação Temporal** - Janelas de tempo configuráveis para entrada e saída  
✅ **Histórico de Presença** - Registro completo de todas as validações  
✅ **Geolocalização** - Captura localização real do dispositivo  
✅ **Armazenamento Local** - Dados persistem entre sessões (localStorage)  
✅ **Interface com Abas** - Navegação entre Checkin, Cliente, Contrato e Histórico  

## 📋 Dados do Sistema

### Usuários/Prestadores (8 cadastrados)
1. **Bruno Reichembak** (001) - Joinville/SC - Entrada: 07:00, Saída: 17:00
2. **Maria Souza** (002) - São Paulo/SP - Entrada: 09:00, Saída: 18:00
3. **Carlos Pereira** (003) - Rio de Janeiro/RJ - Entrada: 06:00, Saída: 14:00
4. **Ana Costa** (004) - São Paulo/SP - Entrada: 12:00, Saída: 20:00
5. **Pedro Santos** (005) - Curitiba/PR - Entrada: 20:00, Saída: 04:00
6. **Lucia Martins** (006) - São Paulo/SP - Entrada: 05:00, Saída: 13:00
7. **Roberto Alves** (007) - São Paulo/SP - Entrada: 10:00, Saída: 18:00
8. **Fernanda Oliveira** (008) - Belém/PA - Entrada: 07:00, Saída: 15:00

### Exemplo: Bruno Reichembak (Usuário Padrão)
- **Matrícula**: 001
- **Endereço**: Motorista PX, Rua Itajubá, 768. Bom Retiro. Joinville/SC
- **Latitude**: -26.253337
- **Longitude**: -48.841455
- **Raio de Validação**: 150 metros
- **Entrada Prevista**: 07:00
- **Saída Prevista**: 17:00

### Janelas de Validação (Bruno Reichembak)

#### Checkin (Entrada)
- **Janela**: 06:00 às 10:00
- **Detalhe**: 1 hora antes + 3 horas depois do horário previsto

#### Checkout (Saída)
- **Janela**: 15:00 às 19:00
- **Detalhe**: 2 horas antes + 2 horas depois do horário previsto

## 🚀 Como Usar

### 1. Abrir no Navegador
```bash
# Abra o arquivo `src/html/index.html` no navegador
# Pode clicar duas vezes no arquivo ou arrastar para o navegador
```

### 2. Navegação entre Telas
A aplicação possui 4 abas no topo:
- **📱 Checkin/QRCode**: Validações de presença, scan de QR code e uso de token
- **🎯 Painel do Cliente**: Geração de códigos 2FA de autorização (sem restrições)
- **📋 Contrato / Usuário**: Informações do contrato, seleção de prestador
- **🕒 Histórico**: Todos os logs de presença

### 3. Fluxo de Checkin Normal (com QR Code)

### 3. Fluxo de Checkin Normal (com QR Code)

1. **Escanear QR Code**
   - Clique no botão "🔍 Simular Leitura de QR Code"
   - O sistema solicitará permissão para acessar sua localização
   - Um código 2FA de 6 dígitos será gerado automaticamente

2. **Validar 2FA**
   - Digite o código de 6 dígitos exibido
   - Clique em "Validar Código"
   - O sistema valida localização (raio de 150m) e horário

3. **Resultados da Validação**
   - O sistema exibe em modal:
     - Data/Hora do registro
     - Tipo (ENTRADA ou SAÍDA)
     - Distância do local
     - Status de distância (dentro/fora do raio)
     - Janela temporal permitida
     - Status temporal
     - Coordenadas GPS do usuário
   - Resultado final: VALIDADO se todas as validações passarem, INVÁLIDO caso contrário

### 4. Fluxo de Checkin com Token do Cliente (sem restrições)

**Opção A: Usando Código 2FA do Painel do Cliente**

1. Na aba **🎯 Painel do Cliente**, clique em "✨ Gerar Código 2FA"
2. Um código de 6 dígitos será gerado (válido por 15 minutos)
3. Copie o código (botão "📋 Copiar Código")
4. Volte à aba **📱 Checkin/QRCode**
5. Clique em "🔍 Simular Leitura de QR Code"
6. Digite o código do cliente (ao invés do código do QR)
7. **✅ Validação aprovada automaticamente** - sem verificação de localização ou horário

**Opção B: Usando Senha Mestre**

1. Na aba **📱 Checkin/QRCode**, clique em "Usar Token sem QR Code"
2. Digite a senha mestre: **mestre2024**
3. Clique em "Validar Token"
4. **✅ Checkin/Checkout realizado automaticamente** - sem restrições

### 5. Histórico
   - Todos os registros aparecem na aba **🕒 Histórico**
   - Dados persistem no navegador (localStorage)
   - Indicação visual de registros validados (verde) e inválidos (vermelho)
   - Mostra se foi usado código do cliente

## 🔧 Validações Implementadas

### ✓ Validação de Distância
- Calcula distância real usando fórmula Haversine (grande-círculo)
- Compara com raio configurado (150m por padrão)
- Retorna distância precisa em metros
- **Pode ser ignorada** com código do cliente ou senha mestre

### ✓ Validação de Horário
- Verifica se o checkin está dentro da janela permitida
- Janelas configuráveis por prestador
- Exemplo: Entrada: 06:00-10:00 | Saída: 15:00-19:00
- Algoritmo identifica automaticamente entrada ou saída
- **Pode ser ignorada** com código do cliente ou senha mestre

### ✓ Autenticação 2FA Dupla
- **Modo Normal**: Código gerado no QR (expira em 45 segundos)
- **Modo Cliente**: Código gerado no painel (válido 15 minutos, sem restrições)
- Código de 6 dígitos aleatórios
- Timer visual com countdown
- Impede acesso sem validação correta

### ✓ Senha Mestre
- Token: **mestre2024**
- Permite checkin/checkout sem QR Code
- Ignora todas as validações de localização e horário
- Útil para situações excepcionais

### ✓ Geolocalização
- Solicita permissão ao usuário
- Se negada, simula localização próxima (~50m)
- Captura latitude e longitude precisas

## 📊 Estrutura de Dados

### Registro de Presença
```javascript
{
  id: timestamp único,
  dateTime: Data/hora completa,
  userName: nome do prestador,
  userMatricula: matrícula,
  type: "ENTRADA" | "SAÍDA",
  distance: distância em metros,
  distanceStatus: mensagem de validação,
  distanceValid: boolean,
  timeWindow: "HH:MM - HH:MM",
  timeStatus: mensagem de validação,
  timeValid: boolean,
  userLat: latitude do usuário,
  userLon: longitude do usuário,
  isValid: boolean (resultado final),
  usedClientCode: boolean (se usou código do cliente)
}
```

### Código de Autorização do Cliente
```javascript
{
  id: timestamp único,
  code: código de 6 dígitos,
  generatedAt: data/hora de geração,
  expiresAt: data/hora de expiração (15 min),
  status: "ATIVO" | "EXPIRADO"
}
```

## 🎨 Interface

- **Navegação por Abas**: 4 telas principais (Checkin, Cliente, Contrato, Histórico)
- **Status Dinâmico**: Atualiza em tempo real com countdown e mensagens contextuais
- **Modais Bootstrap**: Interface moderna para autenticação 2FA e resultados
- **Design Responsivo**: Funciona em desktop, tablet e mobile
- **Painel do Cliente**: Geração e gerenciamento de códigos de autorização

## 💾 Armazenamento

Os dados de presença são salvos automaticamente no localStorage do navegador:
- Persistem mesmo após fechar o navegador
- Podem ser limpos pelo console: `localStorage.clear()`
- Cada navegador tem seu próprio armazenamento

## 🧪 Testando o Sistema

### Teste 1: Entrada Válida (QR Code Normal)
- Usuário: Bruno Reichembak
- Hora: 07:00 - 10:00
- Localização: Próximo ao ponto base (< 150m)
- Resultado: ✅ VALIDADO

### Teste 2: Entrada Inválida (Fora do Horário)
- Hora: 12:00 (fora da janela 06:00-10:00)
- Resultado: ❌ INVÁLIDO

### Teste 3: Entrada Inválida (Fora do Raio)
- Localização: Longe do ponto base (> 150m)
- Resultado: ❌ INVÁLIDO

### Teste 4: Checkin com Código do Cliente
- Gerar código no Painel do Cliente
- Usar código ao invés do QR
- Resultado: ✅ VALIDADO (sem restrições)

### Teste 5: Checkin com Senha Mestre
- Usar "Token sem QR Code"
- Senha: mestre2024
- Resultado: ✅ VALIDADO (sem restrições)

### Teste 6: Múltiplos Usuários
- Trocar prestador na aba "Contrato/Usuário"
- Testar diferentes horários e localizações
- Verificar janelas específicas de cada um

## 🔐 Segurança

- 2FA obrigatório para validar presença
- Dois tipos de código 2FA:
  - **QR Code**: Expira em 45 segundos
  - **Cliente**: Válido por 15 minutos, bypass de validações
- Geolocalização validada (exceto com código cliente)
- Janelas de tempo limitadas (exceto com código cliente)
- Raio de distância configurável (150m padrão)
- Senha mestre do cliente: **mestre2024**
- Dados armazenados localmente no navegador (localStorage)
- Histórico completo de códigos gerados pelo cliente

## 📱 Compatibilidade

- ✓ Chrome/Edge (Windows)
- ✓ Firefox
- ✓ Safari
- ✓ Mobile browsers (iOS Safari, Chrome Mobile)

**Requisito**: Navegador com suporte a Geolocation API

## 🎯 Próximas Melhorias Sugeridas

1. **Backend**: Implementar API para armazenamento em servidor
2. **Autenticação**: Integrar com LDAP/Active Directory
3. **QR Code Real**: Integrar biblioteca de leitura de QR Code (QuaggaJS, jsQR)
4. **Câmera**: Capturar foto/selfie no momento do checkin
5. **Relatórios**: Gerar relatórios de presença em PDF/Excel
6. **Integração**: Conectar com sistemas de RH/payroll
7. **Notificações**: Push notifications para alertas
8. **Admin Dashboard**: Painel para gerenciar usuários e contratos
9. **Exportação**: Exportar histórico de presença
10. **Multi-empresa**: Suporte a múltiplos clientes/empresas
11. **Geofencing**: Melhorar validação de localização com múltiplos pontos

## 📱 Compatibilidade

- ✓ Chrome/Edge (Windows/Mac)
- ✓ Firefox
- ✓ Safari
- ✓ Mobile browsers (iOS Safari, Chrome Mobile)

**Requisito**: Navegador com suporte a Geolocation API

## 📁 Estrutura de Arquivos

```
refatoracao-checkin-out/
├── README.md                      # Este arquivo
├── src/
│   ├── html/
│   │   └── index.html             # Página HTML principal
│   ├── css/
│   │   └── style.css              # Estilos CSS
│   └── js/
│       └── app.js                 # Lógica JavaScript (1010 linhas)
├── data/
│   └── dados-exemplo.json         # Estrutura de dados exemplo
└── docs/
    ├── ARQUITETURA.md             # Arquitetura técnica
    ├── COMECE.md                  # Guia para começar
    ├── GUIA-RAPIDO.md             # Início rápido
    ├── INDICE.md                  # Índice do projeto
    └── TESTES.md                  # Guia de testes

```

## 👨‍💻 Autor

Protótipo desenvolvido para demonstração de funcionalidades de checkin/checkout

---

**Versão**: 2.0  
**Data**: 2026-03-03  
**Status**: Protótipo Funcional Completo  
**Novidades v2.0**: Painel do Cliente, Senha Mestre, Múltiplos Usuários, Interface com Abas
