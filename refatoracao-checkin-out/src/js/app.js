// ============================
// DADOS DO SISTEMA
// ============================

const USERS = [
    {
        name: 'Bruno Reichembak',
        matricula: '001',
        location: {
            address: 'Motorista PX, Rua Itajubá, 768. Bom Retiro. Joinville/SC',
            lat: -26.253337,
            lon: -48.841455,
            radiusInMeters: 150
        },
        contract: {
            entryTime: '07:00',
            exitTime: '17:00',
            entryWindow: { before: 1, after: 3 },
            exitWindow: { before: 2, after: 2 }
        }
    },
    {
        name: 'Maria Souza',
        matricula: '002',
        location: {
            address: 'Contratada B, Avenida Central, 123. Centro. São Paulo/SP',
            lat: -23.55052,
            lon: -46.633308,
            radiusInMeters: 150
        },
        contract: {
            entryTime: '09:00',
            exitTime: '18:00',
            entryWindow: { before: 1, after: 2 },
            exitWindow: { before: 1, after: 1 }
        }
    },
    {
        name: 'Carlos Pereira',
        matricula: '003',
        location: {
            address: 'Prestador C, Rua das Flores, 45. Bairro Jardim. Rio de Janeiro/RJ',
            lat: -22.906847,
            lon: -43.172896,
            radiusInMeters: 150
        },
        contract: {
            entryTime: '06:00',
            exitTime: '14:00',
            entryWindow: { before: 2, after: 1 },
            exitWindow: { before: 1, after: 2 }
        }
    },
    {
        name: 'Ana Costa',
        matricula: '004',
        location: {
            address: 'Operadora A, Av. Paulista, 1000. Bela Vista. São Paulo/SP',
            lat: -23.561389,
            lon: -46.656722,
            radiusInMeters: 150
        },
        contract: {
            entryTime: '12:00',
            exitTime: '20:00',
            entryWindow: { before: 1, after: 2 },
            exitWindow: { before: 2, after: 1 }
        }
    },
    {
        name: 'Pedro Santos',
        matricula: '005',
        location: {
            address: 'Gerente Noturno, Rua 25 de Dezembro, 500. Centro. Curitiba/PR',
            lat: -25.428355,
            lon: -49.267137,
            radiusInMeters: 150
        },
        contract: {
            entryTime: '20:00',
            exitTime: '04:00',
            entryWindow: { before: 1, after: 3 },
            exitWindow: { before: 2, after: 2 }
        }
    },
    {
        name: 'Lucia Martins',
        matricula: '006',
        location: {
            address: 'Supervisora, Rua Dom Pedro I, 200. Saúde. São Paulo/SP',
            lat: -23.594982,
            lon: -46.618378,
            radiusInMeters: 150
        },
        contract: {
            entryTime: '05:00',
            exitTime: '13:00',
            entryWindow: { before: 1, after: 1 },
            exitWindow: { before: 1, after: 2 }
        }
    },
    {
        name: 'Roberto Alves',
        matricula: '007',
        location: {
            address: 'Coordenador, Rua Vergueiro, 2000. Vila Mariana. São Paulo/SP',
            lat: -23.595873,
            lon: -46.616666,
            radiusInMeters: 150
        },
        contract: {
            entryTime: '10:00',
            exitTime: '18:00',
            entryWindow: { before: 2, after: 1 },
            exitWindow: { before: 1, after: 3 }
        }
    },
    {
        name: 'Fernanda Oliveira',
        matricula: '008',
        location: {
            address: 'Assistente, Rua Cinquenta, 1500. Zona Leste. Belém/PA',
            lat: -1.455271,
            lon: -48.476666,
            radiusInMeters: 150
        },
        contract: {
            entryTime: '07:00',
            exitTime: '15:00',
            entryWindow: { before: 1, after: 2 },
            exitWindow: { before: 2, after: 1 }
        }
    }
];

function getCurrentUser() {
    return USERS[appState.selectedUserIndex];
}

// ============================
// ESTADO DA APLICAÇÃO
// ============================

let appState = {
    selectedUserIndex: 0,
    checkedIn: false,
    checkinTime: null,
    checkoutTime: null,
    currentQRData: null,
    currentCode: null,
    userLocation: null,
    presenceHistory: getPresenceHistory(),
    activeClientCode: null,
    activeClientCodeExpiry: null,
    clientCodesHistory: getClientCodesHistory(),
    usedClientCode: false
};

// ============================
// ELEMENTOS DOM
// ============================

const elements = {
    currentTime: document.getElementById('currentTime'),
    statusUser: document.getElementById('statusUser'),
    statusBadge: document.getElementById('statusBadge'),
    statusMessage: document.getElementById('statusMessage'),
    userSelect: document.getElementById('userSelect'),
    scanQRBtn: document.getElementById('scanQRBtn'),
    qrResult: document.getElementById('qrResult'),
    modal2FA: document.getElementById('modal2FA'),
    modalResult: document.getElementById('modalResult'),
    modalMasterPassword: document.getElementById('modalMasterPassword'),
    masterPasswordBtn: document.getElementById('masterPasswordBtn'),
    masterPasswordInput: document.getElementById('masterPasswordInput'),
    validateMasterPasswordBtn: document.getElementById('validateMasterPasswordBtn'),
    modalMasterUserName: document.getElementById('modalMasterUserName'),
    modalMasterAddress: document.getElementById('modalMasterAddress'),
    generatedCode: document.getElementById('generatedCode'),
    twoFAInput: document.getElementById('twoFAInput'),
    validateCodeBtn: document.getElementById('validateCodeBtn'),
    confirmBtn: document.getElementById('confirmBtn'),
    historyTableBody: document.getElementById('historyTableBody'),
    clearHistoryBtn: document.getElementById('clearHistoryBtn'),
    timerDisplay: document.getElementById('timerDisplay'),
    modal2FAUserName: document.getElementById('modal2FAUserName'),
    modal2FAAddress: document.getElementById('modal2FAAddress'),
    modal2FAEntryTime: document.getElementById('modal2FAEntryTime'),
    tabs: document.querySelectorAll('.tab-btn'),
    screens: document.querySelectorAll('.screen'),
    // Client panel elements
    generateClientCodeBtn: document.getElementById('generateClientCodeBtn'),
    clientCodeResult: document.getElementById('clientCodeResult'),
    activeCodeCard: document.getElementById('activeCodeCard'),
    activeClientCode: document.getElementById('activeClientCode'),
    codeExpiryTime: document.getElementById('codeExpiryTime'),
    expiryTimestamp: document.getElementById('expiryTimestamp'),
    copyCodeBtn: document.getElementById('copyCodeBtn'),
    revokeCodeBtn: document.getElementById('revokeCodeBtn'),
    clearClientCodesBtn: document.getElementById('clearClientCodesBtn'),
    clientCodesTableBody: document.getElementById('clientCodesTableBody')
};

// ============================
// NAVEGAÇÃO ENTRE TELAS
// ============================

function switchScreen(targetId) {
    elements.screens.forEach(screen => {
        screen.classList.toggle('active', screen.id === targetId);
    });
    elements.tabs.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.target === targetId);
    });
    if (targetId === 'screenHistory') updateHistoryTable();
}

elements.tabs.forEach(btn => {
    btn.addEventListener('click', () => switchScreen(btn.dataset.target));
});

// ============================
// UTILITÁRIOS
// ============================

function formatTime(date){
    return date.toLocaleTimeString('pt-BR', {hour:'2-digit',minute:'2-digit',second:'2-digit'});
}
function formatDateTime(date){
    return date.toLocaleString('pt-BR');
}
function timeToMinutes(timeStr){
    const [h,m]=timeStr.split(':').map(Number);
    return h*60+m;
}
function minutesToTime(minutes){
    const h=Math.floor(minutes/60);
    const m=minutes%60;
    return `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}`;
}
function getCurrentTimeString(){
    return new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
}

function calculateDistance(lat1,lon1,lat2,lon2){
    const R=6371000;
    const φ1=lat1*Math.PI/180;
    const φ2=lat2*Math.PI/180;
    const Δφ=(lat2-lat1)*Math.PI/180;
    const Δλ=(lon2-lon1)*Math.PI/180;
    const a=Math.sin(Δφ/2)**2+Math.cos(φ1)*Math.cos(φ2)*Math.sin(Δλ/2)**2;
    const c=2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
    return R*c;
}
function generateRandomCode(){
    return Math.floor(Math.random()*1000000).toString().padStart(6,'0');
}

function validateDistance(distance,radius){
    return {valid: distance<=radius, distance, message: distance<=radius?'Dentro do raio':'Fora do raio permitido'};
}
function validateTimeWindow(currentTime,entryTime,exitTime,isEntry){
    const curr=timeToMinutes(currentTime);
    const entry=timeToMinutes(entryTime);
    const exit=timeToMinutes(exitTime);
    let windowStart,windowEnd;
    if(isEntry){
        windowStart=entry - (getCurrentUser().contract.entryWindow.before*60);
        windowEnd=entry + (getCurrentUser().contract.entryWindow.after*60);
    } else {
        windowStart=exit - (getCurrentUser().contract.exitWindow.before*60);
        windowEnd=exit + (getCurrentUser().contract.exitWindow.after*60);
    }
    const isValid = curr>=windowStart && curr<=windowEnd;
    return {
        valid:isValid,
        windowStart:minutesToTime(windowStart),
        windowEnd:minutesToTime(windowEnd),
        message:isValid?'Dentro da janela':'Fora da janela permitida'
    };
}
function determineCheckType(currentTime){
    // Se já fez checkin, é saída. Senão, é entrada.
    // Isso é muito mais preciso que tentar adivinhar pela hora
    if (appState.checkedIn && !appState.checkoutTime) {
        return 'SAÍDA';
    }
    return 'ENTRADA';
}

// ============================
// GEOLOCALIZAÇÃO
// ============================

function getUserLocation(){
    return new Promise((resolve,reject)=>{
        if(!navigator.geolocation) return reject('Geolocalização não suportada');
        navigator.geolocation.getCurrentPosition(pos=>{
            appState.userLocation={lat:pos.coords.latitude, lon:pos.coords.longitude};
            resolve(appState.userLocation);
        }, err=>{
            console.warn('Geolocalização negada, usando simulação:',err);
            const u=getCurrentUser();
            appState.userLocation={lat:u.location.lat+0.0005, lon:u.location.lon+0.0005};
            resolve(appState.userLocation);
        },{enableHighAccuracy:true,timeout:5000,maximunAge:0});
    });
}

// ============================
// QR CODE & 2FA
// ============================

let timerInterval = null;
let timerSeconds = 45;

function startTimer(){
    timerSeconds = 45;
    if(timerInterval) clearInterval(timerInterval);
    updateTimerDisplay();
    timerInterval = setInterval(()=>{
        timerSeconds--;
        updateTimerDisplay();
        if(timerSeconds <= 0){
            clearInterval(timerInterval);
            if(appState.currentCode !== null){
                resetForm('⏰ O código expirou. Scaneie novamente.');
                bootstrapModal2FA.hide();
            }
        }
    }, 1000);
}

function updateTimerDisplay(){
    if(elements.timerDisplay){
        const color = timerSeconds <= 7 ? '#ef4444' : (timerSeconds <= 22 ? '#f59e0b' : '#10b981');
        elements.timerDisplay.textContent = `⏱️ ${timerSeconds}s`;
        elements.timerDisplay.style.color = color;
    }
}


async function simulateQRCodeScan(){
    try{
        await getUserLocation();
        const u=getCurrentUser();
        appState.currentQRData={
            location:u.location.address,
            lat:u.location.lat,
            lon:u.location.lon,
            radius:u.location.radiusInMeters,
            timestamp:new Date()
        };
        appState.currentCode=generateRandomCode();
        elements.qrResult.innerHTML=`<strong>QR Code Lido com Sucesso!</strong><br>Local: ${appState.currentQRData.location}<br>Código 2FA gerado: ${appState.currentCode}`;
        elements.qrResult.classList.add('show');
        setTimeout(()=>{
            elements.generatedCode.textContent=appState.currentCode;
            startTimer();
            show2FAModal();
        },500);
        setTimeout(()=>{
            if (appState.currentCode !== null) {
                resetForm('O código expirou. Scaneie novamente.');
                bootstrapModal2FA.hide();
            }
        },5*60*1000);
    }catch(err){
        elements.qrResult.innerHTML=`<strong style="color:red;">Erro ao ler QR Code</strong><br>${err}`;
        elements.qrResult.classList.add('show');
        console.error('Erro ao simular QR code:',err);
    }
}

function show2FAModal(){
    const u = getCurrentUser();
    elements.modal2FAUserName.textContent = u.name;
    elements.modal2FAAddress.textContent = u.location.address;
    elements.modal2FAEntryTime.textContent = u.contract.entryTime;
    bootstrapModal2FA.show();
    elements.twoFAInput.focus();
}
function hide2FAModal(){
    // remove pending code so expiration check doesn't fire
    appState.currentCode = null;
    if(timerInterval) clearInterval(timerInterval);
    bootstrapModal2FA.hide();
}

async function validate2FACode(){
    const input = elements.twoFAInput.value.trim();
    if(!input){ alert('Digite o código'); return; }
    
    // Aceita código do QR Code OU código do cliente (se estiver ativo)
    const isValidQRCode = input === appState.currentCode;
    const isValidClientCode = appState.activeClientCode && input === appState.activeClientCode && new Date() < appState.activeClientCodeExpiry;
    
    if(!isValidQRCode && !isValidClientCode){ 
        alert('Código incorreto!'); 
        elements.twoFAInput.value=''; 
        return; 
    }
    
    // Registra se usou código do cliente (para fazer override das validações)
    appState.usedClientCode = isValidClientCode;
    
    // reset code so expiration check doesn't trigger later
    appState.currentCode = null;
    if(timerInterval) clearInterval(timerInterval);
    hide2FAModal();
    await performPresenceValidation();
}


// ============================
// MASTER PASSWORD
// ============================

function showMasterPasswordModal(){
    const u = getCurrentUser();
    elements.modalMasterUserName.textContent = u.name;
    elements.modalMasterAddress.textContent = u.location.address;
    elements.masterPasswordInput.value = '';
    bootstrapModalMaster.show();
    setTimeout(() => elements.masterPasswordInput.focus(), 300);
}

async function validateMasterPassword(){
    const input = elements.masterPasswordInput.value.trim();
    
    if(!input){ 
        alert('Digite a senha'); 
        return; 
    }
    
    if(input !== MASTER_PASSWORD){ 
        alert('Senha incorreta!'); 
        elements.masterPasswordInput.value = '';
        return; 
    }
    
    // Senha correta - fazer checkin/checkout com override de validações
    appState.usedClientCode = true; // Usar mesmo override do cliente code
    bootstrapModalMaster.hide();
    
    // Obter localização do usuário
    try{
        await getUserLocation();
    } catch(err){
        console.warn('Erro ao obter geolocalização:', err);
    }
    
    // Fazer validação de presença diretamente
    await performPresenceValidation();
    
    // Resetar flag
    appState.usedClientCode = false;
}

// ============================
// PRESENÇA
// ============================
async function performPresenceValidation(){
    const now=new Date();
    const nowStr=getCurrentTimeString();
    const u=getCurrentUser();
    const checkType=determineCheckType(nowStr);
    const isEntry=checkType==='ENTRADA';
    const dist=calculateDistance(appState.userLocation.lat,appState.userLocation.lon,u.location.lat,u.location.lon);
    const distVal=validateDistance(dist,u.location.radiusInMeters);
    const timeVal=validateTimeWindow(nowStr,u.contract.entryTime,u.contract.exitTime,isEntry);
    
    // OVERRIDE: Se usou código do cliente, ignora validações de distância e horário
    let isValid;
    if (appState.usedClientCode) {
        isValid = true;
        var distStatus = 'IGNORADO (Código do Cliente)';
        var timeStatus = 'IGNORADO (Código do Cliente)';
    } else {
        isValid = distVal.valid && timeVal.valid;
        var distStatus = distVal.message;
        var timeStatus = timeVal.message;
    }
    
    const record={
        id:Date.now(),
        dateTime:now,
        userName:u.name,
        userMatricula:u.matricula,
        type:checkType,
        distance:dist,
        distanceStatus:distStatus,
        distanceValid: appState.usedClientCode ? true : distVal.valid,
        timeWindow:`${timeVal.windowStart} - ${timeVal.windowEnd}`,
        timeStatus:timeStatus,
        timeValid: appState.usedClientCode ? true : timeVal.valid,
        userLat:appState.userLocation.lat,
        userLon:appState.userLocation.lon,
        isValid,
        usedClientCode: appState.usedClientCode
    };

    appState.presenceHistory.push(record);
    savePresenceHistory();
    showValidationResults(record);
    // exibir modal de resultado
    if (bootstrapModalResult) bootstrapModalResult.show();
    if(isValid){
        // Registrar tempo de checkin/checkout
        if (checkType === 'ENTRADA') {
            appState.checkinTime = now;
        } else {
            appState.checkoutTime = now;
        }
        appState.checkedIn = (checkType === 'ENTRADA');
        updateStatus();
    }
    updateHistoryTable();
    elements.twoFAInput.value='';
    elements.qrResult.classList.remove('show');
    
    // Limpar flag de código do cliente após usar
    appState.usedClientCode = false;
}

function showValidationResults(record){
    document.getElementById('resultDateTime').textContent = formatDateTime(record.dateTime);
    document.getElementById('resultType').textContent = record.type;
    document.getElementById('resultDistance').textContent = `${record.distance.toFixed(2)} m`;
    document.getElementById('resultDistanceStatus').innerHTML = `<span class="${record.distanceValid?'status-ok':'status-nok'}">${record.distanceStatus}</span>`;
    document.getElementById('resultTimeWindow').textContent = record.timeWindow;
    document.getElementById('resultTimeStatus').innerHTML = `<span class="${record.timeValid?'status-ok':'status-nok'}">${record.timeStatus}</span>`;
    document.getElementById('finalResultMessage').textContent = record.isValid ? 'Presença validada com sucesso' : 'Falha na validação';
}

function resetForm(message){
    elements.qrResult.innerHTML = message;
    elements.qrResult.classList.add('show');
    if (bootstrapModal2FA) bootstrapModal2FA.hide();
}

// ============================
// HISTÓRICO
// ============================

function updateHistoryTable(){
    const tbody = elements.historyTableBody;
    tbody.innerHTML='';
    if(appState.presenceHistory.length===0){
        const tr=document.createElement('tr');
        tr.innerHTML='<td colspan="9" class="empty-message">Nenhum registro de presença ainda</td>';
        tbody.appendChild(tr);
        return;
    }
    appState.presenceHistory.sort((a,b) => b.dateTime - a.dateTime).forEach(rec=>{
        const tr=document.createElement('tr');
        tr.className = rec.isValid ? 'row-valid' : 'row-invalid';
        tr.innerHTML=`
            <td>${formatDateTime(rec.dateTime)}</td>
            <td>${rec.userName}</td>
            <td>${rec.userMatricula}</td>
            <td>${rec.type}</td>
            <td>${rec.distance.toFixed(2)} m</td>
            <td>${rec.distanceStatus}</td>
            <td>${rec.timeWindow}</td>
            <td>${rec.timeStatus}</td>
            <td><strong class="${rec.isValid?'status-ok':'status-nok'}">${rec.isValid?'VALIDADO':'INVALIDO'}</strong></td>
        `;
        tbody.appendChild(tr);
    });
}

function clearHistory(){
    if(confirm('Deseja realmente limpar todo o histórico de presença?')){
        appState.presenceHistory = [];
        savePresenceHistory();
        updateHistoryTable();
    }
}

// ============================
// STORAGE
// ============================

function getPresenceHistory(){
    try{
        const stored = localStorage.getItem('presenceHistory');
        if (!stored) return [];
        const parsed = JSON.parse(stored);
        // convert dateTime strings back to Date objects
        return parsed.map(rec => ({
            ...rec,
            dateTime: new Date(rec.dateTime)
        }));
    }catch(e){
        console.warn('Erro ao ler histórico',e);
        return [];
    }
}
function savePresenceHistory(){
    const toSave = appState.presenceHistory.map(rec => ({
        ...rec,
        dateTime: rec.dateTime instanceof Date ? rec.dateTime.toISOString() : rec.dateTime
    }));
    localStorage.setItem('presenceHistory', JSON.stringify(toSave));
}

// ============================
// CLIENT CODES STORAGE
// ============================

function getClientCodesHistory(){
    try{
        const stored = localStorage.getItem('clientCodesHistory');
        if (!stored) return [];
        const parsed = JSON.parse(stored);
        // convert dateTime strings back to Date objects
        return parsed.map(rec => ({
            ...rec,
            generatedAt: new Date(rec.generatedAt),
            expiresAt: new Date(rec.expiresAt)
        }));
    }catch(e){
        console.warn('Erro ao ler histórico de códigos do cliente',e);
        return [];
    }
}

function saveClientCodesHistory(){
    const toSave = appState.clientCodesHistory.map(rec => ({
        ...rec,
        generatedAt: rec.generatedAt instanceof Date ? rec.generatedAt.toISOString() : rec.generatedAt,
        expiresAt: rec.expiresAt instanceof Date ? rec.expiresAt.toISOString() : rec.expiresAt
    }));
    localStorage.setItem('clientCodesHistory', JSON.stringify(toSave));
}

// ============================
// CLIENT PANEL - 2FA CODE GENERATION
// ============================

function generateClientCode(){
    const code = generateRandomCode();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 15 * 60 * 1000); // 15 minutos

    appState.activeClientCode = code;
    appState.activeClientCodeExpiry = expiresAt;

    // Registrar no histórico
    const record = {
        id: Date.now(),
        code: code,
        generatedAt: now,
        expiresAt: expiresAt,
        status: 'ATIVO'
    };

    appState.clientCodesHistory.unshift(record);
    saveClientCodesHistory();

    // Atualizar UI
    updateClientCodeDisplay();
    elements.clientCodeResult.innerHTML = `<strong class="status-ok">✅ Código gerado com sucesso!</strong>`;
    elements.clientCodeResult.classList.add('show');

    // Iniciar contador de expiração
    startClientCodeTimer();
}

function updateClientCodeDisplay(){
    if (appState.activeClientCode && appState.activeClientCodeExpiry) {
        elements.activeClientCode.textContent = appState.activeClientCode;
        elements.activeCodeCard.style.display = 'block';
        
        // Calcular tempo restante
        const now = new Date();
        const timeLeft = Math.max(0, appState.activeClientCodeExpiry - now);
        const seconds = Math.floor((timeLeft % 60000) / 1000);
        const minutes = Math.floor(timeLeft / 60000);
        
        const expiryDisplay = `⏱️ ${minutes}:${seconds.toString().padStart(2, '0')} minutos`;
        elements.codeExpiryTime.textContent = expiryDisplay;
        
        // Cor progressiva
        if (timeLeft <= 0) {
            revokeClientCode();
        } else if (timeLeft <= 60000) { // menos de 1 minuto
            elements.codeExpiryTime.style.color = '#ef4444';
        } else if (timeLeft <= 300000) { // menos de 5 minutos
            elements.codeExpiryTime.style.color = '#f59e0b';
        } else {
            elements.codeExpiryTime.style.color = '#10b981';
        }

        // Timestamp de expiração
        elements.expiryTimestamp.textContent = formatDateTime(appState.activeClientCodeExpiry);
    } else {
        elements.activeCodeCard.style.display = 'none';
    }
}

let clientCodeTimerInterval = null;

function startClientCodeTimer(){
    if (clientCodeTimerInterval) clearInterval(clientCodeTimerInterval);
    
    clientCodeTimerInterval = setInterval(() => {
        updateClientCodeDisplay();
        
        if (appState.activeClientCodeExpiry && new Date() >= appState.activeClientCodeExpiry) {
            revokeClientCode();
            elements.clientCodeResult.innerHTML = `<strong class="status-nok">❌ Código expirou!</strong>`;
            elements.clientCodeResult.classList.add('show');
        }
    }, 1000);
}

function revokeClientCode(){
    appState.activeClientCode = null;
    appState.activeClientCodeExpiry = null;
    
    if (clientCodeTimerInterval) clearInterval(clientCodeTimerInterval);
    
    // Atualizar histórico - marcar como revogado
    if (appState.clientCodesHistory.length > 0) {
        appState.clientCodesHistory[0].status = 'EXPIRADO';
        saveClientCodesHistory();
    }
    
    updateClientCodeDisplay();
    elements.clientCodeResult.innerHTML = `<strong class="status-nok\">⚠️ Código revogado ou expirado. Gere um novo código.</strong>`;
    elements.clientCodeResult.classList.add('show');
    
    updateClientCodesHistory();
}

function copyClientCode(){
    if (appState.activeClientCode) {
        navigator.clipboard.writeText(appState.activeClientCode).then(() => {
            alert('✅ Código copiado para a área de transferência!');
        }).catch(() => {
            alert('❌ Erro ao copiar código');
        });
    }
}

function updateClientCodesHistory(){
    const tbody = elements.clientCodesTableBody;
    tbody.innerHTML = '';
    
    if (appState.clientCodesHistory.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = '<td colspan="4" class="empty-message">Nenhum código gerado ainda</td>';
        tbody.appendChild(tr);
        return;
    }

    appState.clientCodesHistory.forEach(rec => {
        const tr = document.createElement('tr');
        const now = new Date();
        const isExpired = now >= rec.expiresAt;
        const statusClass = isExpired || rec.status === 'EXPIRADO' ? 'status-nok' : 'status-ok';
        const statusText = isExpired || rec.status === 'EXPIRADO' ? '❌ EXPIRADO' : '✅ ATIVO';
        
        tr.innerHTML = `
            <td>${formatDateTime(rec.generatedAt)}</td>
            <td><strong class="code-display">${rec.code}</strong></td>
            <td>${formatDateTime(rec.expiresAt)}</td>
            <td><strong class="${statusClass}">${statusText}</strong></td>
        `;
        tbody.appendChild(tr);
    });
}

function clearClientCodesHistory(){
    if (confirm('Deseja realmente limpar o histórico de códigos gerados?')) {
        appState.clientCodesHistory = [];
        appState.activeClientCode = null;
        appState.activeClientCodeExpiry = null;
        
        if (clientCodeTimerInterval) clearInterval(clientCodeTimerInterval);
        
        saveClientCodesHistory();
        updateClientCodeDisplay();
        updateClientCodesHistory();
        
        elements.clientCodeResult.innerHTML = `<strong class="status-ok">🧹 Histórico limpo.</strong>`;
        elements.clientCodeResult.classList.add('show');
    }
}

// ============================
// STATUS / CONTRATO
// ============================

function updateStatus(){
    elements.statusUser.textContent = getCurrentUser().name;
    elements.currentTime.textContent = formatTime(new Date());
    
    const nowStr = getCurrentTimeString();
    const u = getCurrentUser();
    const currMin = timeToMinutes(nowStr);
    const entryMin = timeToMinutes(u.contract.entryTime);
    const exitMin = timeToMinutes(u.contract.exitTime);
    
    // Calcular janelas
    const entryWindowStart = entryMin - (u.contract.entryWindow.before * 60);
    const entryWindowEnd = entryMin + (u.contract.entryWindow.after * 60);
    const exitWindowStart = exitMin - (u.contract.exitWindow.before * 60);
    const exitWindowEnd = exitMin + (u.contract.exitWindow.after * 60);
    
    // Determinar fase do dia
    const isInEntryWindow = currMin >= entryWindowStart && currMin <= entryWindowEnd;
    const isInExitWindow = currMin >= exitWindowStart && currMin <= exitWindowEnd;
    const beforeEntry = currMin < entryWindowStart;
    const betweenEntryAndExit = currMin > entryWindowEnd && currMin < exitWindowStart;
    const afterExit = currMin > exitWindowEnd;
    
    let statusText = '';
    let statusColor = 'badge-inactive';
    let message = '';
    
    // Lógica para determinar status
    if (beforeEntry) {
        // Antes da janela de entrada
        const minLeft = entryWindowStart - currMin;
        const hh = Math.floor(minLeft / 60);
        const mm = minLeft % 60;
        statusText = '⏳ Aguardando Entrada';
        statusColor = 'badge-warning';
        message = `🚪 Janela de ENTRADA abre em ${hh}h ${mm}min (${minutesToTime(entryWindowStart)} - ${minutesToTime(entryWindowEnd)})`;
    } 
    else if (isInEntryWindow) {
        // Dentro janela de entrada
        if (appState.checkinTime) {
            // Já fez checkin
            const now = new Date();
            const timeElapsed = Math.floor((now - appState.checkinTime) / 60000); // em minutos
            const hh = Math.floor(timeElapsed / 60);
            const mm = timeElapsed % 60;
            statusText = '✅ Checkin Realizado';
            statusColor = 'badge-success';
            message = `Presente há ${hh}h ${mm}min | ⏳ Checkout disponível até ${minutesToTime(exitWindowEnd)}`;
        } else {
            // Não fez checkin - está em atraso
            const minLeft = entryWindowEnd - currMin;
            if (minLeft > 0) {
                const hh = Math.floor(minLeft / 60);
                const mm = minLeft % 60;
                statusText = '⚠️ Falta Checkin';
                statusColor = 'badge-danger';
                message = `🚨 URGENTE: Faça checkin em até ${hh}h ${mm}min (Janela encerra ${minutesToTime(entryWindowEnd)})`;
            } else {
                statusText = '❌ Checkin Expirado';
                statusColor = 'badge-danger';
                message = `Janela de entrada expirou às ${minutesToTime(entryWindowEnd)}`;
            }
        }
    }
    else if (betweenEntryAndExit) {
        // Entre entrada e saída
        if (appState.checkinTime && !appState.checkoutTime) {
            statusText = '✅ Presente';
            statusColor = 'badge-success';
            const now = new Date();
            const timeElapsed = Math.floor((now - appState.checkinTime) / 60000);
            const hh = Math.floor(timeElapsed / 60);
            const mm = timeElapsed % 60;
            const minUntilExit = exitWindowStart - currMin;
            const hhExit = Math.floor(minUntilExit / 60);
            const mmExit = minUntilExit % 60;
            message = `Presente há ${hh}h ${mm}min | 🚪 Janela de SAÍDA abre em ${hhExit}h ${mmExit}min`;
        } else {
            statusText = '❌ Checkin não realizado';
            statusColor = 'badge-danger';
            message = `Checkin não foi feito. A janela encerrou`;
        }
    }
    else if (isInExitWindow) {
        // Dentro janela de saída
        if (appState.checkinTime) {
            if (appState.checkoutTime) {
                // Já fez checkout
                statusText = 'Checkout Realizado';
                statusColor = 'badge-secondary';
                const timeInside = Math.floor((appState.checkoutTime - appState.checkinTime) / 60000);
                const hh = Math.floor(timeInside / 60);
                const mm = timeInside % 60;
                message = `Jornada encerrada | Tempo total: ${hh}h ${mm}min`;
            } else {
                // Não fez checkout - está em atraso
                const minLeft = exitWindowEnd - currMin;
                if (minLeft > 0) {
                    const hh = Math.floor(minLeft / 60);
                    const mm = minLeft % 60;
                    statusText = '⚠️ Falta Checkout';
                    statusColor = 'badge-warning';
                    message = `🚨 Faça checkout em até ${hh}h ${mm}min (Janela encerra ${minutesToTime(exitWindowEnd)})`;
                } else {
                    statusText = '❌ Checkout Expirado';
                    statusColor = 'badge-danger';
                    message = `Janela de saída expirou às ${minutesToTime(exitWindowEnd)}`;
                }
            }
        } else {
            statusText = '❌ Entrada não validada';
            statusColor = 'badge-danger';
            message = `Não é possível fazer checkout sem checkin`;
        }
    }
    else if (afterExit) {
        // Depois da janela de saída
        if (appState.checkoutTime) {
            statusText = 'Jornada Encerrada';
            statusColor = 'badge-secondary';
            message = `Expediente finalizado`;
        } else {
            statusText = '❌ Checkout Não Realizado';
            statusColor = 'badge-danger';
            message = `Prazo de checkout expirou às ${minutesToTime(exitWindowEnd)}`;
        }
    }
    
    elements.statusBadge.textContent = statusText;
    elements.statusBadge.className = 'badge ' + statusColor;
    elements.statusMessage.textContent = message;
}

function populateUserSelect(){
    const sel = elements.userSelect;
    sel.innerHTML='';
    USERS.forEach((u,i)=>{
        const opt=document.createElement('option');
        opt.value=i; opt.textContent=`${u.name} (${u.matricula})`;
        sel.appendChild(opt);
    });
    sel.value = appState.selectedUserIndex;
    sel.addEventListener('change',()=>{
        appState.selectedUserIndex=parseInt(sel.value,10);
        // Resetar checkin/checkout ao mudar de usuário
        appState.checkinTime = null;
        appState.checkoutTime = null;
        appState.checkedIn = false;
        updateContractInfo();
        updateStatus();
    });
}
function updateContractInfo(){
    const u=getCurrentUser();
    document.getElementById('userName').textContent=u.name;
    document.getElementById('userMatricula').textContent=u.matricula;
    document.getElementById('location').textContent=u.location.address;
    document.getElementById('entryTime').textContent=u.contract.entryTime;
    document.getElementById('exitTime').textContent=u.contract.exitTime;
    document.getElementById('validationRadius').textContent=`${u.location.radiusInMeters} metros`;
}

// ============================
// MASTER PASSWORD CONFIG
// ============================

const MASTER_PASSWORD = 'mestre2024'; // Senha mestre do cliente

// ============================
// Bootstrap Modals
// ============================

let bootstrapModal2FA = null;
let bootstrapModalResult = null;
let bootstrapModalMaster = null;

// ============================
// INICIALIZAÇÃO
// ============================

document.addEventListener('DOMContentLoaded',()=>{
    // inicializa opções de navegação e status
    populateUserSelect();
    updateContractInfo();
    updateStatus();
    updateHistoryTable();
    updateClientCodesHistory();
    setInterval(updateStatus,1000);

    // bootstrap modals
    bootstrapModal2FA = new bootstrap.Modal(elements.modal2FA);
    bootstrapModalResult = new bootstrap.Modal(elements.modalResult);
    bootstrapModalMaster = new bootstrap.Modal(elements.modalMasterPassword);

    // eventos
    elements.scanQRBtn.addEventListener('click',simulateQRCodeScan);
    elements.validateCodeBtn.addEventListener('click',validate2FACode);
    elements.confirmBtn.addEventListener('click',()=>{}); // fechado via data-bs-dismiss
    if(elements.clearHistoryBtn) elements.clearHistoryBtn.addEventListener('click',clearHistory);
    
    // close 2FA modal on dismiss
    elements.modal2FA.addEventListener('hide.bs.modal', hide2FAModal);

    // Master password events
    if(elements.masterPasswordBtn) elements.masterPasswordBtn.addEventListener('click', showMasterPasswordModal);
    if(elements.validateMasterPasswordBtn) elements.validateMasterPasswordBtn.addEventListener('click', validateMasterPassword);

    // Client panel events
    if(elements.generateClientCodeBtn) elements.generateClientCodeBtn.addEventListener('click', generateClientCode);
    if(elements.copyCodeBtn) elements.copyCodeBtn.addEventListener('click', copyClientCode);
    if(elements.revokeCodeBtn) elements.revokeCodeBtn.addEventListener('click', revokeClientCode);
    if(elements.clearClientCodesBtn) elements.clearClientCodesBtn.addEventListener('click', clearClientCodesHistory);
});
