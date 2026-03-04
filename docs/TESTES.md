# 🧪 Guia de Testes - Sistema de Checkin/Checkout v2.0

## 🎬 Passo a Passo para Demonstração

### Preparação Inicial

1. **Abra o arquivo `src/html/index.html` no navegador**
   - Clique duplo no arquivo ou arraste para o navegador
   - A página deve carregar com o layout completo e 4 abas
   - Observe o layout em 2 colunas na tela de Checkin/QRCode

2. **Permita acesso à localização**
   - Quando clicar no botão de scan, o navegador solicitará permissão
   - Clique em "Permitir" para usar sua localização real
   - Se negar, o sistema simula uma localização próxima (~50m)

3. **8 Usuários Disponíveis**
   - O sistema possui 8 prestadores pré-cadastrados
   - Cada um com horários e locais diferentes
   - Use a aba "Contrato / Usuário" para trocar entre eles

4. **Layout Visual Melhorado**
   - Coluna esquerda: Card de Scanear QR Code com visual gradiente
   - Coluna direita: Card de Código 2FA + Status Atual
   - QR Code com animações shimmer e efeitos hover

---

## ✅ Teste 1: Checkin Válido (Horário de Entrada)

### Cenário
- Horário: Entre 07:00 e 11:00 (janela de entrada)
- Localização: Dentro de 200 metros do ponto base

### Passos
1. Abra o sistema
1.1. Use as abas no topo para alternar entre as telas:
- **Checkin/QRCode** (primeira aba) para validação
- **Painel do Cliente** (segunda aba) para gerar códigos especiais
- **Contrato / Usuário** (terceira aba) para ver informações do contrato
- **Histórico** (quarta aba) para ver registros anteriores
1.2 Observe a mensagem de status acima que instruirá realizar "checkin" ou "checkout" conforme a janela de validação atual.
2. Com a aba **Checkin/QRCode** ativa, clique em **"🔍 Simular Leitura de QR Code"**
3. Permita acesso à localização
3.1. Um **modal Bootstrap** de autenticação 2FA surgirá solicitando o código.
3.2. Observe o timer de **45 segundos** contando regressivamente
4. Um código 2FA de 6 dígitos aparecerá (ex: `234567`)
5. Copie o código mostrado e cole no campo de entrada
6. Clique em **"✓ Validar Código"**

### Resultado Esperado
```
✓ ENTRADA VALIDADO COM SUCESSO!

Validações:
- Distância: ~50.45 m ✓ (dentro de 200m)
- Horário: 08:30 ✓ (dentro de 07:00-11:00)
- Status: OK
```

---

## ❌ Teste 2: Checkin Inválido (Fora do Horário)

### Cenário
- Horário: 12:30 (fora da janela de entrada 07:00-11:00)
- Localização: Dentro de 200 metros

### Passos
1. Abra o sistema
2. Ajuste a hora do seu computador para 12:30 (ou simule alterando o sistema)
3. Clique em **"🔍 Simular Leitura de QR Code"**
4. Digite o código 2FA mostrado no modal
5. Clique em **"✓ Validar Código"**

### Resultado Esperado
```
✗ ENTRADA INVÁLIDO - Verifique distância e horário

Validações:
- Distância: ~50.45 m ✓ (dentro de 200m)
- Horário: 12:30 ✗ (fora de 07:00-11:00)
- Status: NOK
```

---

## ❌ Teste 3: Checkout Válido

### Cenário
- Horário: Entre 15:00 e 19:00 (janela de saída)
- Localização: Dentro de 200 metros

### Passos
1. Ajuste a hora do seu computador para 17:30
2. Clique em **"🔍 Simular Leitura de QR Code"**
3. O sistema detectará automaticamente como SAÍDA (por estar próximo de 17:00)
4. Digite o código 2FA mostrado no modal Bootstrap
5. Clique em **"✓ Validar Código"**

### Resultado Esperado
```
✓ SAÍDA VALIDADO COM SUCESSO!

Validações:
- Distância: ~50.45 m ✓ (dentro de 200m)
- Horário: 17:30 ✓ (dentro de 15:00-19:00)
- Status: OK
```

---

## 🧭 Teste 4: Localização Fora do Raio

### Cenário
- Localização: Mais de 200 metros do ponto base
- Horário: Dentro da janela válida

### Como Simular
1. **Opção 1**: Se estiver em uma localização diferente de Joinville/SC, naturalmente estará fora do raio
2. **Opção 2**: Editar temporariamente o arquivo `src/js/app.js` para mudar as coordenadas base:
   ```javascript
   // Antes de USERS[0].location.lat = -26.253337;
   // Mude para:
   USERS[0].location.lat = 0; // Equador (muito longe)
   ```

### Resultado Esperado
```
✗ ENTRADA INVÁLIDO - Verifique distância e horário

Validações:
- Distância: 2.945.820,50 m ✗ (fora de 200m)
- Horário: 08:15 ✓ (dentro de 07:00-11:00)
- Status: NOK
```

---

## 🔐 Teste 5: Validação 2FA Incorreta

### Cenário
- Código gerado: `234567`
- Código digitado: `000000` (código errado)

### Passos
1. Clique em **"🔍 Simular Leitura de QR Code"**
2. Note o código mostrado
3. Digite um código diferente (ex: adicione 1 a cada dígito)
4. Clique em **"✓ Validar Código"**

### Resultado Esperado
```
Alerta: "Código incorreto!"
Campo de entrada é limpo
A validação não prossegue
```

---

## ⏰ Teste 6: Código 2FA Expirado

### Cenário
- Simular espera de 45+ segundos após scan do QR code

### Passos
1. Clique em **"🔍 Simular Leitura de QR Code"**
2. Não faça nada e aguarde o timer zerar (45 segundos)
3. Tente inserir o código após o timer expirar

### Resultado Esperado
```
Alerta: "O código expirou. Scaneie novamente."
Formulário retorna ao estado inicial
Necessário novo scan
```

---

## 🎯 Teste 7: Painel do Cliente - Gerar Código

### Cenário
- Cliente gera código especial que bypassa validações de localização e horário

### Passos
1. Clique na aba **"🎯 Painel do Cliente"**
2. Clique em **"✨ Gerar Código 2FA"**
3. Observe o código gerado e a validade (15 minutos)
4. Note que o código aparece na tabela de histórico com status "ATIVO"
5. Clique em **"📋 Copiar"** para copiar o código
6. Volte à aba **"📱 Checkin/QRCode"**
7. Clique em **"Usar Código 2FA do Cliente"** (coluna direita)
8. Cole o código e selecione um motivo (obrigatório)
9. Clique em **"Validar Código"**
10. Volte ao Painel do Cliente e observe:
    - Status mudou para "USADO"
    - Coluna "Utilizado em" mostra data/hora do uso

### Resultado Esperado
```
✓ ENTRADA VALIDADO COM SUCESSO!
[Código gerado pelo cliente]

Validações:
- Código do Cliente: ✓ VÁLIDO
- Status: OK
- Restrições de horário e localização: IGNORADAS
```

**Observação**: O histórico mostrará `[Cliente]` na coluna de observações.

---

## 🔐 Teste 8: Código 2FA do Cliente - Bypass

### Cenário
- Prestador usa código 2FA do cliente para acesso sem restrições de localização/horário

### Passos
1. Vá até o **Painel do Cliente** e clique em "✨ Gerar Código 2FA"
2. Note que o código aparece na tabela de histórico com status "ATIVO"
3. Copie o código gerado usando o botão "📋 Copiar"
4. Na aba **"📱 Checkin/QRCode"** clique em **"Usar Código 2FA do Cliente"** (coluna direita)
5. Um modal solicitará o código 2FA e o motivo
6. Digite o código copiado
7. Selecione um motivo adequado (obrigatório)
8. Clique em **"Validar Código"**
9. Volte ao Painel do Cliente e verifique a tabela de histórico:
   - Status mudou de "ATIVO" para "✅ USADO"
   - Coluna "Utilizado em" agora mostra a data/hora do uso

### Resultado Esperado
```
✓ ENTRADA VALIDADO COM SUCESSO!
[CÓDIGO CLIENTE]

Validações:
- Código Cliente: ✓ VÁLIDO
- Status: OK
- Restrições de distância/horário: IGNORADAS

Histórico de Códigos:
- Status atualizado para "USADO"
- Data/hora de utilização registrada
```

**Observação**: O histórico de presença mostrará `usedClientCode: true` e o motivo selecionado.

---

## 🚫 Teste 9: Código Cliente Inválido

### Cenário
- Tentativa com código 2FA errado ou expirado

### Passos
1. Clique em **"🔍 Usar Código 2FA do Cliente"**
2. Digite um código incorreto (ex: `123456`)
3. Clique em **"Validar Código"**

### Resultado Esperado
```
Alerta: "Código 2FA inválido ou expirado!"
Modal não se fecha
Campo é limpo para nova tentativa
```

---

## ⏱️ Teste 10: Código Cliente Expirado

### Cenário
- Código do cliente gerado há mais de 15 minutos

### Passos
1. Vá ao **Painel do Cliente** e gere um código
2. Anote a hora de expiração
3. Ajuste o relógio do sistema para passar de 15 minutos
4. Tente usar o código expirado

### Resultado Esperado
```
Alerta: "Código expirado!"
Validação falha
Necessário gerar novo código
```

---

## 📊 Teste 7: Histórico de Presença

### Cenário
- Realizar múltiplos checkins/checkouts
- Verificar persistência dos dados

### Passos
1. Realize 3-4 checkins com sucesso
2. Feche e reabra o navegador (ou F5)
3. Vá para a aba **"📋 Histórico"**
4. Verifique a tabela de histórico

### Resultado Esperado
```
- Tabela mostra todos os registros com 9 colunas
- Dados persistem após refresh
- Ordenação: do mais recente para o mais antigo
- Status visual de OK/NOK visível
- Coluna de observações mostra: padrão, [Cliente], ou Master Override
```

---

## 👥 Teste 11: Múltiplos Usuários

### Cenário
- Testar a funcionalidade de troca de usuário

### Passos
1. Na aba **"📝 Contrato / Usuário"**
2. Selecione **Bruno Reichembak (001)** no dropdown
3. Observe os dados de localização e horário
4. Selecione **Maria Souza (002)**
5. Observe que os dados mudaram
6. Volte à aba **"📱 Checkin/QRCode"**
7. Faça um checkin
8. Vá para o histórico e veja o registro com o nome do novo usuário

### Resultado Esperado
```
- Cada usuário possui:
  - Nome único
  - Matrícula única
  - Endereço diferente
  - Coordenadas diferentes
  - Horários diferentes
- Histórico registra o nome correto do usuário
```

---

## 🎯 Testes de Compatibilidade (Bruno Reichembak - 001)

### Janela de Entrada (Base: 07:00)
| Hora | Válida? | Status | Janela |
|------|---------|--------|--------|
| 05:45 | ❌ | Muito cedo | Fora da janela |
| 06:00 | ✓ | Limite inferior | 1h antes |
| 07:00 | ✓ | Horário previsto | Exato |
| 09:00 | ✓ | Dentro da janela | 2h depois |
| 10:00 | ✓ | Limite superior | 3h depois |
| 10:15 | ❌ | Muito tarde | Fora da janela |

### Janela de Saída (Base: 17:00)
| Hora | Válida? | Status | Janela |
|------|---------|--------|--------|
| 14:45 | ❌ | Muito cedo | Fora da janela |
| 15:00 | ✓ | Limite inferior | 2h antes |
| 17:00 | ✓ | Horário previsto | Exato |
| 18:00 | ✓ | Dentro da janela | 1h depois |
| 19:00 | ✓ | Limite superior | 2h depois |
| 19:15 | ❌ | Muito tarde | Fora da janela |

### Validação de Distância
| Distância | Válida? | Status |
|-----------|---------|--------|
| 0m | ✓ | Exato |
| 50m | ✓ | Próximo |
| 100m | ✓ | Perto |
| 149m | ✓ | Limite |
| 200m | ✓ | Limite exato |
| 151m | ❌ | Fora |
| 500m | ❌ | Muito longe |
| 1000m+ | ❌ | Extremamente longe |

## 🐛 Troubleshooting

| Problema | Solução |
|----------|---------|
| Geolocalização não funciona | Verifique se deu permissão ao navegador |
| | Alguns navegadores private/incognito podem bloquear |
| | Repositório HTTPS pode ser requerido (não necessário em localhost) |
| Código 2FA não valida | Certifique-se de digitar todos os 6 dígitos |
| | Verifique se o código não expirou (45 segundos) |
| | Console mostrará erros se houver |
| Modais não abrem | Verifique conexão CDN do Bootstrap 5.3 |
| | Abra o console (F12) para ver erros |
| Histórico vazio após refresh | Verifique se localStorage está habilitado |
| | Alguns navegadores private/incognito podem desabilitar |
| | Use `localStorage.getItem('presenceHistory')` no console |
| Distância sempre 0 | Isso é normal se usar a mesma localização |
| | Mude sua localização ou altere coordenadas no código |
| Código cliente não funciona | Verifique se não expirou (15 minutos) |
| | Gere um novo código se necessário |
| Código cliente recusado | Verifique se o código está ativo |
| | Use o botão "Copiar" para garantir código correto |

---

## 🔍 Inspecionar Dados no Console

Abra o console do navegador (F12) para debug:

```javascript
// Ver todos os usuários cadastrados
console.log(USERS);

// Ver usuário atual
console.log(appState.currentUser);

// Ver histórico de presença
console.log(appState.presenceHistory);

// Ver histórico de códigos do cliente
console.log(appState.clientCodeHistory);

// Ver localização do usuário
console.log(appState.userLocation);

// Limpar histórico (CUIDADO: Deleta dados)
localStorage.clear();

// Ver histórico salvo no localStorage
console.log(JSON.parse(localStorage.getItem('presenceHistory')));
console.log(JSON.parse(localStorage.getItem('clientCodeHistory')));
```

---

## 🎨 Personalizações para Demonstração

### Alterar/Adicionar Usuários
Edite `src/js/app.js` linhas ~5-139:
```javascript
const USERS = [
    {
        name: 'Seu Nome',
        matricula: '009',
        location: {
            address: 'Seu endereço',
            lat: -26.253337,  // Sua latitude
            lon: -48.841455,  // Sua longitude
            radiusInMeters: 200
        },
        contract: {
            entryTime: '09:00',  // Novo horário de entrada
            exitTime: '18:00',   // Novo horário de saída
            entryWindow: { before: 1, after: 2 },
            exitWindow: { before: 1, after: 1 }
        }
    },
    // ... outros usuários
];
```

### Alterar Timer de Código QR
Edite `src/js/app.js` linha ~309:
```javascript
timerSeconds = 60; // Muda de 45 para 60 segundos
```

### Alterar Validade Código Cliente
Edite `src/js/app.js` linha ~666:
```javascript
const expiresAt = new Date(now.getTime() + 30 * 60 * 1000); // 30 minutos
```

---

## 📱 Teste em Dispositivo Mobile

1. **Copie os arquivos para uma pasta compartilhada**
2. **Use um servidor local** (por exemplo, com Python):
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```
3. **Abra no celular**:
   - Acesse `http://seu_ip_local:8000`
   - A geolocalização funcionará melhor em mobile
   - Touch-friendly design adapta automaticamente

---

## ✅ Checklist de Demonstração v2.0

### Básico
- [ ] Sistema abre sem erros
- [ ] 4 abas funcionam corretamente
- [ ] Botão de QR Code funciona
- [ ] Modais Bootstrap abrem corretamente
- [ ] Código 2FA é gerado aleatoriamente
- [ ] Timer de 45s funciona
- [ ] Validação de código funciona
- [ ] Resultados de validação exibem corretamente

### Avançado
- [ ] Painel do Cliente gera códigos
- [ ] Botão copiar funciona
- [ ] Código cliente bypassa restrições
- [ ] Histórico de códigos é exibido
- [ ] Código cliente expira após 15 minutos
- [ ] Código cliente inválido é rejeitado

### Multiu suário
- [ ] Troca de usuário funciona
- [ ] Cada usuário tem dados próprios
- [ ] Horários diferentes são validados
- [ ] Locais diferentes são validados

### Persistência
- [ ] Histórico lista registros
- [ ] Dados persistem após refresh
- [ ] localStorage funciona

### Validações
- [ ] Janelas de tempo são respeitadas
- [ ] Validação de distância funciona (200m)
- [ ] Status atualiza em tempo real
- [ ] Códigos expirados são rejeitados

### Interface
- [ ] Interface responsiva em diferentes tamanhos
- [ ] Botões são clicáveis
- [ ] Feedback visual funciona

---

**Dicas para Demonstração Eficaz:**

1. Comece com um teste bem-sucedido (QR Code) para mostrar o happy path
2. Demonstre o Painel do Cliente e o bypass de restrições
3. Mostre o código 2FA do cliente e o override total de validações
4. Demonstre validação de 2FA com código incorreto
5. Mostre o histórico crescendo com cada validação
6. Mencione a persistência de dados recarregando a página
7. Troque de usuário para mostrar os 8 prestadores
8. Abra o console para mostrar a estrutura dos dados
9. Explique as validações de distância (200m) e tempo
10. Mencione como dados podem ser sincronizados com backend

---

**Documento**: Guia de Testes  
**Versão**: 2.0  
**Data Criação**: 2026-02-26  
**Última Atualização**: 2026-03-03  
**Status**: ✅ COMPLETO E ATUALIZADO

