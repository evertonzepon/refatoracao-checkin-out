# 🧪 Guia de Testes - Sistema de Checkin/Checkout

## 🎬 Passo a Passo para Demonstração

### Preparação Inicial

1. **Abra o arquivo `index.html` no navegador**
   - Clique duplo no arquivo ou arraste para o navegador
   - A página deve carregar com o layout completo

2. **Permita acesso à localização**
   - Quando clicar no botão de scan, o navegador solicitará permissão
   - Clique em "Permitir" para usar sua localização real
   - Se negar, o sistema simula uma localização próxima (~50m)

---

## ✅ Teste 1: Checkin Válido (Horário de Entrada)

### Cenário
- Horário: Entre 07:00 e 11:00 (janela de entrada)
- Localização: Dentro de 100 metros do ponto base

### Passos
1. Abra o sistema
1.1. Use as abas no topo para alternar entre as telas:
- **Checkin/QRCode** (primeira aba) para validação
- **Contrato / Usuário** (segunda aba) para ver informações do contrato
- **Histórico** (terceira aba) para ver registros anteriores
1.2 Observe a mensagem de status acima que instruirá realizar "checkin" ou "checkout" conforme a janela de validação atual.
2. Com a aba **Checkin/QRCode** ativa, clique em **"🔍 Simular Leitura de QR Code"**
3. Permita acesso à localização
3.1. Um modal de autenticação 2FA surgirá solicitando o código.
4. Um código 2FA de 6 dígitos aparecerá (ex: `234567`)
5. Copie o código mostrado e cole no campo de entrada
6. Clique em **"✓ Validar Código"**

### Resultado Esperado
```
✓ ENTRADA VALIDADO COM SUCESSO!

Validações:
- Distância: ~50.45 m ✓ (dentro de 100m)
- Horário: 08:30 ✓ (dentro de 07:00-11:00)
- Status: OK
```

---

## ❌ Teste 2: Checkin Inválido (Fora do Horário)

### Cenário
- Horário: 12:30 (fora da janela de entrada 07:00-11:00)
- Localização: Dentro de 100 metros

### Passos
1. Abra o sistema
2. Ajuste a hora do seu computador para 12:30 (ou simule alterando o sistema)
3. Clique em **"🔍 Simular Leitura de QR Code"**
4. Digite o código 2FA mostrado
5. Clique em **"✓ Validar Código"**

### Resultado Esperado
```
✗ ENTRADA INVÁLIDO - Verifique distância e horário

Validações:
- Distância: ~50.45 m ✓ (dentro de 100m)
- Horário: 12:30 ✗ (fora de 07:00-11:00)
- Status: NOK
```

---

## ❌ Teste 3: Checkout Válido

### Cenário
- Horário: Entre 15:00 e 19:00 (janela de saída)
- Localização: Dentro de 100 metros

### Passos
1. Ajuste a hora do seu computador para 17:30
2. Clique em **"🔍 Simular Leitura de QR Code"**
3. O sistema detectará automaticamente como SAÍDA (por estar próximo de 17:00)
4. Digite o código 2FA mostrado
5. Clique em **"✓ Validar Código"**

### Resultado Esperado
```
✓ SAÍDA VALIDADO COM SUCESSO!

Validações:
- Distância: ~50.45 m ✓ (dentro de 100m)
- Horário: 17:30 ✓ (dentro de 15:00-19:00)
- Status: OK
```

---

## 🧭 Teste 4: Localização Fora do Raio

### Cenário
- Localização: Mais de 100 metros do ponto base
- Horário: Dentro da janela válida

### Como Simular
1. **Opção 1**: Se estiver em uma localização diferente de Joinville/SC, naturalmente estará fora do raio
2. **Opção 2**: Editar temporariamente o arquivo `app.js` para mudar as coordenadas base:
   ```javascript
   // Antes de USER.location.lat = -26.253337;
   // Mude para:
   USER.location.lat = 0; // Equador (muito longe)
   ```

### Resultado Esperado
```
✗ ENTRADA INVÁLIDO - Verifique distância e horário

Validações:
- Distância: 2.945.820,50 m ✗ (fora de 100m)
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
- Simular espera de 5+ minutos após scan do QR code

### Passos
1. Clique em **"🔍 Simular Leitura de QR Code"**
2. Não faça nada e espere 5 minutos
3. Tente inserir o código

### Resultado Esperado
```
Alerta: "O código expirou. Scaneie novamente."
Formulário retorna ao estado inicial
Necessário novo scan
```



---

## 📊 Teste 7: Histórico de Presença

### Cenário
- Realizar múltiplos checklins/checkouts
- Verificar persistência dos dados

### Passos
1. Realize 3-4 checklins com sucesso
2. Feche e reabra o navegador (ou F5)
3. Verifique a tabela de histórico

### Resultado Esperado
```
- Tabela mostra todos os registros
- Dados persistem após refresh
- Ordenação: do mais recente para o mais antigo
- Status visual de OK/NOK visível
```

---

## 🎯 Testes de Compatibilidade

### Janela de Entrada
| Hora | Válida? | Status |
|------|---------|--------|
| 06:45 | ❌ | Muito cedo |
| 07:00 | ✓ | Limite inferior |
| 08:00 | ✓ | Horário previsto |
| 11:00 | ✓ | Limite superior |
| 11:15 | ❌ | Muito tarde |

### Janela de Saída
| Hora | Válida? | Status |
|------|---------|--------|
| 14:45 | ❌ | Muito cedo |
| 15:00 | ✓ | Limite inferior |
| 17:00 | ✓ | Horário previsto |
| 19:00 | ✓ | Limite superior |
| 19:15 | ❌ | Muito tarde |

---

## 🔍 Inspecionar Dados no Console

Abra o console do navegador (F12) para debug:

```javascript
// Ver dados do usuário
console.log(USER);

// Ver histórico de presença
console.log(appState.presenceHistory);

// Ver localização do usuário
console.log(appState.userLocation);

// Limpar histórico (CUIDADO: Deleta dados)
localStorage.clear();

// Ver histórico salvo no localStorage
console.log(JSON.parse(localStorage.getItem('presenceHistory')));
```

---

## 🎨 Personalizações para Demonstração

### Alterar Dados do Usuário
Edite `app.js` linha 10:
```javascript
const USER = {
    name: 'Seu Nome',
    matricula: '002',
    // ... resto dos dados
};
```

### Alterar Localização
Edite `app.js` linha 15:
```javascript
location: {
    address: 'Novo endereço',
    lat: -26.253337,  // Sua latitude
    lon: -48.841455,  // Sua longitude
    radiusInMeters: 100
}
```

### Alterar Horários
Edite `app.js` linha 23:
```javascript
contract: {
    entryTime: '09:00',  // Novo horário de entrada
    exitTime: '18:00',   // Novo horário de saída
    // ... janelas de tempo
}
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

## 🐛 Troubleshooting

### Geolocalização não funciona
- ✓ Verifique se deu permissão ao navegador
- ✓ Alguns navegadores private/incognito podem bloquear
- ✓ Repositório HTTPS pode ser requerido (não necessário em localhost)

### Código 2FA não valida
- ✓ Certifique-se de digitar todos os 6 dígitos
- ✓ Verifique se o código não expirou (5 minutos)
- ✓ Console mostrará erros se houver

### Histórico vazio após refresh
- ✓ Verifique se localStorage está habilitado
- ✓ Alguns navegadores private/incognito podem desabilitar
- ✓ Use `localStorage.getItem('presenceHistory')` no console para debug

### Distância sempre 0
- ✓ Isso é normal se usar a mesma localização
- ✓ Mude sua localização ou altere coordenadas no código para testar

---

## ✅ Checklist de Demonstração

- [ ] Sistema abre sem erros
- [ ] Botão de QR Code funciona
- [ ] Código 2FA é gerado aleatoriamente
- [ ] Validação de código funciona
- [ ] Resultados de validação exibem corretamente
- [ ] Histórico lista registros
- [ ] Dados persistem após refresh
- [ ] Janelas de tempo são respeitadas
- [ ] Validação de distância funciona
- [ ] Status atualiza em tempo real
- [ ] Interface responsiva em diferentes tamanhos

---

**Dicas para Demonstração Eficaz:**

1. Comece com um teste bem-sucedido para mostrar o happy path
2. Mostre o histórico crescendo com cada validação
3. Demonstre validação de 2FA com código incorreto
4. Mencione a persistência de dados recarregando a página
5. Abra o console para mostrar a estrutura dos dados
6. Explique as validações de distância e tempo
7. Mencione como dados podem ser sincronizados com backend

