# 📍 Sistema de Checkin/Checkout com QR Code

Protótipo web funcional de um sistema de validação de presença com QR Code, autenticação 2FA e validação geolocalizada. O código foi organizado em pastas (`src`, `data`, `docs`) para facilitar manutenção e futuros acréscimos.

## 🎯 Características

✅ **Validação por QR Code** - Simulação de leitura de QR code  
✅ **Autenticação 2FA** - Código aleatório de 6 dígitos para validar presença  
✅ **Validação de Localização** - Cálculo de distância usando algoritmo Haversine  
✅ **Validação Temporal** - Janelas de tempo configuráveis para entrada e saída  
✅ **Histórico de Presença** - Registro completo de todas as validações  
✅ **Geolocalização** - Captura localização real do dispositivo  
✅ **Armazenamento Local** - Dados persistem entre sessões (localStorage)  

## 📋 Dados do Sistema

### Usuário
- **Nome**: João Silva
- **Matrícula**: 001

### Localização do Contrato
- **Endereço**: Motorista PX, Rua Itajubá, 768. Bom Retiro. Joinville/SC
- **Latitude**: -26.253337
- **Longitude**: -48.841455
- **Raio de Validação**: 100 metros

### Horários
- **Entrada Prevista**: 08:00
- **Saída Prevista**: 17:00

### Janelas de Validação

#### Checkin (Entrada)
- **Janela**: 07:00 às 11:00
- **Detalhe**: 1 hora antes + 3 horas depois do horário previsto

#### Checkout (Saída)
- **Janela**: 15:00 às 19:00
- **Detalhe**: 2 horas antes + 2 horas depois do horário previsto

## 🚀 Como Usar

### 1. Abrir no Navegador
```bash
# Abra o arquivo `src/index.html` no navegador
# Pode clicar duas vezes no arquivo ou arrastar para o navegador
```

### 2. Navegação entre telas
A aplicação agora possui abas no topo para separar as funcionalidades:
- **Checkin/QRCode**: validações de presença e scan do QR code. A mensagem de status muda automaticamente para "Realize o checkin" ou "Realize o checkout" conforme a janela de validação ativa. A autenticação 2FA usa um modal Bootstrap elegante; o resultado da validação aparece em outro modal com indicação clara de sucesso ou falha.
- **Contrato / Usuário**: informações do contrato e do prestador
- **Histórico**: todos os logs de presença
Clique nas abas para alternar entre as views.

### 2. Fluxo de Checkin

1. **Escanear QR Code**
   - Clique no botão "Simular Leitura de QR Code"
   - O sistema solicitará permissão para acessar sua localização
   - Um código 2FA de 6 dígitos será gerado automaticamente

2. **Validar 2FA**
   - Digite o código de 6 dígitos exibido
   - Clique em "Validar Código"

3. **Resultados da Validação**
   - O sistema exibe:
     - Data/Hora do registro
     - Tipo (ENTRADA ou SAÍDA)
     - Distância do local
     - Status de distância (dentro/fora do raio)
     - Janela temporal permitida
     - Status temporal
     - Coordenadas GPS do usuário
   - Resultado final: OK se todas as validações passarem, NOK caso contrário

4. **Histórico**
   - Todos os registros aparecem na tabela de histórico
   - Dados persistem no navegador (localStorage)

## 🔧 Validações Implementadas

### ✓ Validação de Distância
- Calcula distância real usando fórmula Haversine (grande-círculo)
- Compara com raio configurado (100m)
- Retorna distância precisa em metros

### ✓ Validação de Horário
- Verifica se o checkin está dentro da janela permitida
- Entrada: 07:00-11:00
- Saída: 15:00-19:00
- Algoritmo identificar automaticamente entrada ou saída

### ✓ Validação de 2FA
- Gera código aleatório de 6 dígitos
- Expira após 5 minutos se não validado
- Impede acesso sem validação correta

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
  type: "ENTRADA" | "SAÍDA",
  distance: distância em metros,
  distanceStatus: mensagem de validação,
  distanceValid: boolean,
  timeWindow: "HH:MM - HH:MM",
  timeStatus: mensagem de validação,
  timeValid: boolean,
  userLat: latitude do usuário,
  userLon: longitude do usuário,
  isValid: boolean (resultado final)
}
```

## 🎨 Interface

- **Painel Esquerdo**: Informações do usuário e contrato
- **Painel Direito**: Controles de checkin/checkout
- **Seção Inferior**: Histórico de presença em tabela
- **Design Responsivo**: Funciona em desktop, tablet e mobile

## 💾 Armazenamento

Os dados de presença são salvos automaticamente no localStorage do navegador:
- Persistem mesmo após fechar o navegador
- Podem ser limpos pelo console: `localStorage.clear()`
- Cada navegador tem seu próprio armazenamento

## 🧪 Testando o Sistema

### Teste de Entrada Válida
- Hora: 08:00 - 11:00
- Localização: Próximo ao ponto base (< 100m)
- Resultado: ✓ OK

### Teste de Entrada Inválida (Fora do Horário)
- Hora: 12:00 (fora da janela 07:00-11:00)
- Resultado: ✗ NOK

### Teste de Entrada Inválida (Fora do Raio)
- Localização: Longe do ponto base (> 100m)
- Resultado: ✗ NOK

## 🔐 Segurança

- 2FA obrigatório para validar presença
- Geolocalização validada
- Janelas de tempo limitadas
- Raio de distância configurável
- Código 2FA com expiração de 5 minutos
- Dados armazenados localmente no navegador

## 📱 Compatibilidade

- ✓ Chrome/Edge (Windows)
- ✓ Firefox
- ✓ Safari
- ✓ Mobile browsers (iOS Safari, Chrome Mobile)

**Requisito**: Navegador com suporte a Geolocation API

## 🎯 Próximas Melhorias Sugeridas

1. **Backend**: Implementar API para armazenamento em servidor
2. **Autenticação**: Integrar com LDAP/Active Directory
3. **QR Code Real**: Integrar biblioteca de leitura de QR Code
4. **Câmera**: Capturar localização de foto/selfie
5. **Relatórios**: Gerar relatórios de presença
6. **Integração**: Conectar com sistemas de RH/payroll
7. **Notificações**: Push notifications para alertas
8. **Admin Dashboard**: Painel para gerenciar usuários e contratos

## 📄 Tecnologias Utilizadas

- HTML5
- CSS3 (Grid, Flexbox, Gradientes)
- JavaScript ES6+
- Geolocation API
- LocalStorage API
- Algoritmo Haversine para cálculo de distância

## 👨‍💻 Autor

Protótipo desenvolvido para demonstração de funcionalidades de checkin/checkout

---

**Versão**: 1.0  
**Data**: 2026-02-26  
**Status**: Protótipo Funcional
