const MODEL_URL = "./my_model/";

let model;

// ── Funny result messages ──
// Each tier has multiple messages — one is picked at random each time
const primitiveMessages = [
    {
        min: 90,
        variants: [
            { emoji: "🦴🔥", title: "완벽한 원시인!", desc: "축하합니다! 당신은 100% 순수 원시인입니다. 매머드 사냥은 기본이고, 불 피우기 장인이시죠? 에어컨 없이도 거뜬하고, 날고기도 맛있게 드실 수 있는 분입니다. 동굴 부동산에 관심 있으시면 연락주세요. 🏔️" },
            { emoji: "🦣💪", title: "전설의 원시 전사!", desc: "호랑이도 당신을 보면 도망갑니다. 맨손으로 바위를 깨고, 맨발로 산을 넘는 당신! 현대인들이 헬스장에서 땀 흘릴 때, 당신은 매머드를 쫓고 있을 타입입니다. 구석기 올림픽 금메달 감이에요. 🏆" },
            { emoji: "🔥🪨", title: "동굴 속 절대 권력자!", desc: "당신이 살던 동굴은 분명 명당이었을 겁니다. 불 피우는 속도 세계 신기록, 사냥 성공률 100%. 원시시대 부동산 재벌이셨을 가능성이 높습니다. 현대에 태어난 게 아쉬울 정도예요. 🏠" },
            { emoji: "🍖🦴", title: "타고난 야생 본능!", desc: "도시에 살고 있지만 당신의 DNA는 완전히 야생입니다. 편의점 앞에서도 사냥 본능이 발동하고, 바비큐 할 때 불 조절은 본능적으로 완벽합니다. 정글에 떨어져도 3일 안에 왕국 건설 가능! 🌿" },
            { emoji: "⚔️🦏", title: "원시 시대의 인플루언서!", desc: "구석기 시대에 SNS가 있었다면 당신은 팔로워 100만 확정이었습니다. '오늘의 사냥 전리품 인증' '동굴 인테리어 꿀팁' 같은 콘텐츠로 원시인계의 탑 크리에이터가 되었을 거예요. 🎬" }
        ]
    },
    {
        min: 70,
        variants: [
            { emoji: "🪨🍖", title: "거의 원시인!", desc: "당신은 사냥을 잘하고 덜 익힌 음식도 거뜬히 먹을 수 있을 것입니다. 돌도끼를 다루는 솜씨가 예사롭지 않으시네요. 현대 사회에서 살고 있지만, 영혼은 구석기 시대에 있습니다. 🦣" },
            { emoji: "🌋🏃", title: "생존왕 후보!", desc: "무인도 서바이벌 프로그램에 나가면 우승 후보 1순위입니다. 불 피우기, 물 구하기, 집 짓기... 전부 본능적으로 해내실 분! 다만 핸드폰 충전은 좀 어려울 수 있어요. 🏝️" },
            { emoji: "🦁🛡️", title: "원시인 정신 계승자!", desc: "현대 문명 속에서도 원시인의 정신을 잃지 않는 당신! 회의실에서도 사냥꾼의 눈빛이 빛나고, 점심시간엔 누구보다 빠르게 맛집을 선점합니다. 현대판 원시 전략가! 📋" },
            { emoji: "🏔️🔥", title: "도시 속 원시인!", desc: "겉으로는 현대인이지만, 캠핑장만 가면 본모습이 드러납니다. 장작 패기에 남다른 재능이 있고, 고기 굽는 실력은 미슐랭 급! 자연 속에서 당신은 진정한 자유를 느끼는 사람입니다. 🏕️" }
        ]
    },
    {
        min: 50,
        variants: [
            { emoji: "🏕️", title: "원시인 성향 우세!", desc: "캠핑을 좋아하시죠? 자연에서 살아남는 능력이 남다릅니다. 와이파이 없는 곳에서도 꿋꿋이 버틸 수 있는 강인한 정신력의 소유자! 다만 가끔 스마트폰이 그리울 수 있습니다. 🌲" },
            { emoji: "🌄🍃", title: "반쯤 야생인!", desc: "에어컨 빵빵한 사무실도 좋지만, 마음 한켠에는 항상 자연이 있습니다. 주말마다 산으로 바다로 떠나고 싶은 당신, 원시인의 피가 조금 더 진하게 흐르고 있네요! 🚗" },
            { emoji: "🪵🌙", title: "아날로그 감성 보유자!", desc: "디지털보다 아날로그가 편한 당신. 캠프파이어 앞에서 이야기하는 걸 좋아하고, 가끔은 스마트폰을 꺼두고 싶은 충동이 밀려옵니다. 원시인 DNA가 슬슬 깨어나고 있어요! 🌌" }
        ]
    }
];

const modernMessages = [
    {
        min: 90,
        variants: [
            { emoji: "💻📱", title: "완벽한 현대인!", desc: "당신은 와이파이가 끊기면 생존이 불가능한 완벽한 현대인입니다. 배달앱 없이는 못 살고, 걷기보다 킥보드를 선호하시죠? 동굴에 가면 5분 안에 울 것 같습니다. 충전기를 항상 챙기세요! 🔋" },
            { emoji: "🤖✨", title: "디지털 네이티브 그 자체!", desc: "태어날 때부터 스마트폰을 들고 나온 것 같은 당신! AI한테 말 거는 게 사람한테보다 편하고, 현금이 뭔지 까먹은 지 오래입니다. 원시인을 만나면 '충전기 어딨어요?'라고 물어볼 사람. ⚡" },
            { emoji: "📱💳", title: "문명의 최종 진화체!", desc: "로봇청소기, 에어프라이어, 스마트워치... 기술 없이는 하루도 못 사는 당신! 원시시대에 태어났으면 첫째 날 '이건 아닌데...'하고 타임머신을 발명했을 겁니다. 미래에서 온 사람 아니세요? 🚀" },
            { emoji: "🎧🛒", title: "21세기형 프로 도시인!", desc: "아침에 눈 뜨면 스마트폰 확인, 출근은 앱으로 택시 호출, 점심은 배달앱, 퇴근 후엔 넷플릭스. 이 루틴이 깨지면 멘붕 오는 당신은 현대 문명 없이 24시간도 버틸 수 없습니다! 📺" },
            { emoji: "🧬💻", title: "테크 의존증 말기!", desc: "스마트폰 배터리 1%에 심장이 멎는 사람, 바로 당신입니다. 엘리베이터 고장나면 그날 출근 포기, 에어컨 없으면 여름에 용해됩니다. 원시인이 보면 '어떻게 살아있지?' 할 레벨! 😵" }
        ]
    },
    {
        min: 70,
        variants: [
            { emoji: "🧑‍💻☕", title: "거의 현대인!", desc: "카페에서 노트북 펼치는 게 일상인 당신! 원시시대에 태어났다면 첫날에 리타이어했을 것입니다. 불 피우기는 유튜브 보고 배우면 되니까요. 당신의 무기는 돌도끼가 아니라 키보드입니다. ⌨️" },
            { emoji: "🏢🍜", title: "도시 적응 만렙!", desc: "지하철 환승은 눈 감고도 가능하고, 맛집 리스트는 항상 업데이트 중. 자연? 인스타 필터로 충분합니다. 당신에게 '야생'이란 금요일 저녁 홍대 거리가 전부예요. 🌃" },
            { emoji: "📲🎯", title: "디지털 생존 전문가!", desc: "앱스토어 인기 앱은 전부 깔려있고, 새 기능 업데이트는 당일 설치. 기술 트렌드는 누구보다 빠르게 캐치하지만, 모기 한 마리에 온 집안이 난리가 됩니다. 🦟" },
            { emoji: "🏙️📡", title: "편의점이 고향인 사람!", desc: "편의점 삼각김밥의 모든 맛을 꿰고 있고, 무인매장 키오스크는 원어민급. 당신에게 '생존'이란 스마트폰 충전기와 카드만 있으면 되는 겁니다! 💳" }
        ]
    },
    {
        min: 50,
        variants: [
            { emoji: "🏙️", title: "현대인 성향 우세!", desc: "문명의 혜택을 사랑하지만, 가끔은 자연이 그리운 당신. 캠핑은 가고 싶지만 글램핑만 OK. 벌레는 절대 안 되고, 에어컨은 필수. 원시인의 DNA가 살짝 남아있긴 합니다... 아주 살짝. 🏕️" },
            { emoji: "🛋️📺", title: "소파 위의 현대인!", desc: "주말엔 소파가 내 집이고, 리모컨이 내 무기. 밖에 나가는 건 배달이 안 될 때뿐! 하지만 가끔 선선한 바람이 불면 '산책이나 할까...' 하다가 넷플릭스를 켭니다. 🍿" },
            { emoji: "☕🗺️", title: "문명 애호가!", desc: "따뜻한 카페라떼 한 잔이면 행복한 당신. 자연은 카페 창밖으로 보는 것만으로 충분합니다. 원시인 DNA가 아주 약하게 남아있어서, 1년에 한 번 캠핑 사진은 올려줍니다. 📸" }
        ]
    }
];

const balancedMessages = [
    { emoji: "⚖️🤔", title: "반반! 하이브리드 인간!", desc: "당신은 원시인과 현대인의 완벽한 균형! 한 손에는 스마트폰, 다른 손에는 돌도끼를 들고 있는 느낌이랄까요. 캠핑도 좋아하고 와이파이도 사랑하는, 시대를 초월한 존재입니다. 🌍" },
    { emoji: "🔀🧬", title: "시대 혼종 인간!", desc: "아침엔 현대인, 저녁엔 원시인. 낮에는 카페에서 코딩하다가, 밤에는 캠프파이어 앞에서 고기를 굽습니다. 어느 시대에 태어나도 적응할 수 있는 만능 인간이에요! 🌗" },
    { emoji: "🎭🌀", title: "시간여행자 의심!", desc: "원시시대와 현대를 자유롭게 오가는 당신, 혹시 타임머신 가지고 계신 거 아니죠? 돌도끼도 다룰 줄 알고 앱도 잘 쓰는 이 밸런스, 범상치 않습니다. 시간여행자 출석체크! 🕰️" }
];

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getResultMessage(predictions) {
    let primitiveProb = 0;
    let modernProb = 0;

    for (const p of predictions) {
        const name = p.className.toLowerCase();
        if (name.includes('원시') || name.includes('primitive')) {
            primitiveProb = p.probability * 100;
        } else if (name.includes('현대') || name.includes('modern')) {
            modernProb = p.probability * 100;
        }
    }

    // If very close
    if (Math.abs(primitiveProb - modernProb) < 10) {
        return { ...pickRandom(balancedMessages), type: 'balanced', primitiveProb, modernProb };
    }

    if (primitiveProb > modernProb) {
        const tiers = primitiveMessages.filter(m => primitiveProb >= m.min);
        const tier = tiers[0] || primitiveMessages[primitiveMessages.length - 1];
        const variant = pickRandom(tier.variants);
        return { ...variant, type: 'primitive', primitiveProb, modernProb };
    } else {
        const tiers = modernMessages.filter(m => modernProb >= m.min);
        const tier = tiers[0] || modernMessages[modernMessages.length - 1];
        const variant = pickRandom(tier.variants);
        return { ...variant, type: 'modern', primitiveProb, modernProb };
    }
}

let lastResult = null;

// ── DOM Elements ──
const fileInput = document.getElementById('file-input');
const uploadArea = document.getElementById('upload-area');
const uploadPlaceholder = document.getElementById('upload-placeholder');
const previewImage = document.getElementById('preview-image');
const analyzeBtn = document.getElementById('analyze-btn');
const retryBtn = document.getElementById('retry-btn');
const resultContainer = document.getElementById('result-container');
const resultEmoji = document.getElementById('result-emoji');
const resultTitle = document.getElementById('result-title');
const resultDesc = document.getElementById('result-desc');
const labelContainer = document.getElementById('label-container');
const loading = document.getElementById('loading');

// ── Upload Handling ──
uploadArea.addEventListener('click', () => fileInput.click());

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        handleFile(file);
    }
});

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
});

function handleFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        previewImage.src = e.target.result;
        previewImage.classList.remove('hidden');
        uploadPlaceholder.classList.add('hidden');
        analyzeBtn.classList.remove('hidden');
        retryBtn.classList.add('hidden');
        resultContainer.classList.add('hidden');
    };
    reader.readAsDataURL(file);
}

// ── Analyze ──
analyzeBtn.addEventListener('click', async () => {
    analyzeBtn.classList.add('hidden');
    loading.classList.remove('hidden');

    try {
        if (!model) {
            const modelURL = MODEL_URL + "model.json";
            const metadataURL = MODEL_URL + "metadata.json";
            model = await tmImage.load(modelURL, metadataURL);
        }

        const predictions = await model.predict(previewImage);

        // Build bars
        labelContainer.innerHTML = '';
        for (const p of predictions) {
            const percent = (p.probability * 100).toFixed(1);
            const name = p.className;
            const nameLower = name.toLowerCase();
            let barClass = 'prediction-bar';
            if (nameLower.includes('원시') || nameLower.includes('primitive')) {
                barClass += ' primitive';
            } else if (nameLower.includes('현대') || nameLower.includes('modern')) {
                barClass += ' modern';
            }

            const barDiv = document.createElement('div');
            barDiv.className = barClass;
            barDiv.innerHTML = `
                <div class="label-row">
                    <span>${name}</span>
                    <span>${percent}%</span>
                </div>
                <div class="bar-bg">
                    <div class="bar-fill" style="width: 0%"></div>
                </div>
            `;
            labelContainer.appendChild(barDiv);

            // Animate bar after append
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    barDiv.querySelector('.bar-fill').style.width = percent + '%';
                });
            });
        }

        // Get funny message
        const msg = getResultMessage(predictions);
        lastResult = msg;
        resultEmoji.textContent = msg.emoji;
        resultTitle.textContent = msg.title;
        resultTitle.className = 'result-title ' + (msg.type === 'balanced' ? 'modern' : msg.type);
        resultDesc.textContent = msg.desc;
        resultDesc.className = 'result-desc ' + (msg.type === 'balanced' ? '' : msg.type);

        loading.classList.add('hidden');
        resultContainer.classList.remove('hidden');
        retryBtn.classList.remove('hidden');
    } catch (err) {
        loading.classList.add('hidden');
        analyzeBtn.classList.remove('hidden');
        alert('분석에 실패했습니다. 모델 파일을 확인해주세요.\n' + err.message);
    }
});

// ── Retry ──
retryBtn.addEventListener('click', () => {
    fileInput.value = '';
    previewImage.src = '';
    previewImage.classList.add('hidden');
    uploadPlaceholder.classList.remove('hidden');
    analyzeBtn.classList.add('hidden');
    retryBtn.classList.add('hidden');
    resultContainer.classList.add('hidden');
    lastResult = null;
});

// ── Share Utilities ──
const siteURL = window.location.href;

function getShareText() {
    if (!lastResult) return '';
    const prim = lastResult.primitiveProb.toFixed(1);
    const mod = lastResult.modernProb.toFixed(1);
    return `${lastResult.emoji} ${lastResult.title}\n원시인 ${prim}% | 현대인 ${mod}%\n\n나는 과연 원시인일까 현대인일까? 지금 확인해보세요!\n${siteURL}`;
}

function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text);
    }
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    return Promise.resolve();
}

function showToast(message, duration) {
    const toast = document.getElementById('share-toast');
    toast.textContent = message;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), duration || 2500);
}

// ── 결과 이미지 생성 (사용자 사진 + 결과 포함) ──
function generateResultImage() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1080;
    canvas.height = 1440;

    const msg = lastResult;
    const isPrimitive = msg.type === 'primitive';
    const isBalanced = msg.type === 'balanced';
    const mainColor = isPrimitive ? '#ff6b35' : isBalanced ? '#c77dff' : '#00d4aa';

    // ── 배경 ──
    ctx.fillStyle = '#1a1028';
    ctx.fillRect(0, 0, 1080, 1440);
    const grad = ctx.createLinearGradient(0, 0, 1080, 1440);
    grad.addColorStop(0, 'rgba(42,26,66,1)');
    grad.addColorStop(1, 'rgba(26,16,40,1)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1080, 1440);

    // ── 상단 타이틀 ──
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.font = '600 28px sans-serif';
    ctx.fillText('🦣 원시인 vs 현대인 판별기 🧑‍💻', 540, 60);

    // ── 사용자 사진 (원형) ──
    const img = previewImage;
    const photoSize = 300;
    const photoCX = 540;
    const photoCY = 250;

    ctx.save();
    ctx.beginPath();
    ctx.arc(photoCX, photoCY, photoSize / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    const imgRatio = img.naturalWidth / img.naturalHeight;
    let dw, dh, dx, dy;
    if (imgRatio > 1) {
        dh = photoSize; dw = photoSize * imgRatio;
        dx = photoCX - dw / 2; dy = photoCY - photoSize / 2;
    } else {
        dw = photoSize; dh = photoSize / imgRatio;
        dx = photoCX - photoSize / 2; dy = photoCY - dh / 2;
    }
    ctx.drawImage(img, dx, dy, dw, dh);
    ctx.restore();

    // 사진 테두리
    ctx.strokeStyle = mainColor;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(photoCX, photoCY, photoSize / 2 + 4, 0, Math.PI * 2);
    ctx.stroke();

    // ── 이모지 ──
    ctx.textAlign = 'center';
    ctx.font = '100px serif';
    ctx.fillText(msg.emoji, 540, 500);

    // ── 타이틀 ──
    ctx.fillStyle = mainColor;
    ctx.font = '900 60px sans-serif';
    ctx.fillText(msg.title, 540, 590);

    // ── 퍼센트 바 ──
    const prim = msg.primitiveProb.toFixed(1);
    const mod = msg.modernProb.toFixed(1);
    const barX = 140;
    const barW = 800;
    const barH = 44;

    // 원시인
    const bar1Y = 640;
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.beginPath(); ctx.roundRect(barX, bar1Y, barW, barH, 22); ctx.fill();
    ctx.fillStyle = '#ff6b35';
    const primW = Math.max((msg.primitiveProb / 100) * barW, 44);
    ctx.beginPath(); ctx.roundRect(barX, bar1Y, primW, barH, 22); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = '700 24px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('🦴 원시인 ' + prim + '%', barX + 16, bar1Y + 30);

    // 현대인
    const bar2Y = bar1Y + 60;
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.beginPath(); ctx.roundRect(barX, bar2Y, barW, barH, 22); ctx.fill();
    ctx.fillStyle = '#00d4aa';
    const modW = Math.max((msg.modernProb / 100) * barW, 44);
    ctx.beginPath(); ctx.roundRect(barX, bar2Y, modW, barH, 22); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'left';
    ctx.fillText('💻 현대인 ' + mod + '%', barX + 16, bar2Y + 30);

    // ── 설명 박스 ──
    const descX = 100;
    const descW = 880;
    const descY = 800;
    const descH = 480;

    ctx.fillStyle = isPrimitive ? 'rgba(255,107,53,0.08)' : isBalanced ? 'rgba(199,125,255,0.08)' : 'rgba(0,212,170,0.08)';
    ctx.beginPath(); ctx.roundRect(descX, descY, descW, descH, 24); ctx.fill();
    ctx.strokeStyle = isPrimitive ? 'rgba(255,107,53,0.2)' : isBalanced ? 'rgba(199,125,255,0.2)' : 'rgba(0,212,170,0.2)';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(descX, descY, descW, descH, 24); ctx.stroke();

    ctx.fillStyle = isPrimitive ? '#ffb899' : isBalanced ? '#e0c8ff' : '#80eed5';
    ctx.font = '400 32px sans-serif';
    ctx.textAlign = 'center';

    // 텍스트 줄바꿈
    const words = msg.desc;
    let line = '';
    let lineY = descY + 55;
    const maxW = descW - 60;
    for (let i = 0; i < words.length; i++) {
        const test = line + words[i];
        if (ctx.measureText(test).width > maxW && line.length > 0) {
            ctx.fillText(line, 540, lineY);
            line = words[i];
            lineY += 46;
        } else {
            line = test;
        }
    }
    ctx.fillText(line, 540, lineY);

    // ── 하단 브랜딩 ──
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    ctx.font = '400 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('나도 테스트 해보기 → cavemanify0.pages.dev', 540, 1400);

    return canvas;
}

// ── 공유 버튼 공통 로직 ──
document.getElementById('share-insta').addEventListener('click', function () {
    if (!lastResult) return;
    doShare('인스타 스토리에 올려보세요 📷');
});

document.getElementById('share-kakao').addEventListener('click', function () {
    if (!lastResult) return;
    doShare('카카오톡에서 사진을 전송해보세요 💬');
});

function doShare(fallbackMsg) {
    try {
        const canvas = generateResultImage();
        const dataURL = canvas.toDataURL('image/png');

        // dataURL → Blob 변환
        const byteString = atob(dataURL.split(',')[1]);
        const mimeType = dataURL.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeType });
        const file = new File([blob], 'cavemanify-result.png', { type: 'image/png' });

        // 모바일: Web Share API
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            navigator.share({ files: [file], title: '원시인 vs 현대인 판별기' })
                .catch(function () {});
            return;
        }

        // PC: 이미지 다운로드
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'cavemanify-result.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast('이미지가 저장되었습니다! ' + fallbackMsg, 3000);

    } catch (err) {
        alert('이미지 생성에 실패했습니다: ' + err.message);
    }
}

// ── 링크 복사 ──
document.getElementById('share-link').addEventListener('click', function () {
    copyToClipboard(getShareText()).then(function () {
        showToast('링크가 복사되었습니다!', 2000);
    });
});
