// Cấu hình ứng dụng
const CORRECT_PIN = "0313"; // Thay mã PIN bạn muốn tại đây
let currentPIN = "";

// CẤU HÌNH FILE NHẠC MẠNG CHUẨN Ở ĐÂY
const bgMusic = new Audio('https://files.catbox.moe/s2l13g.mp3'); 
let isPlaying = false;
bgMusic.loop = true; // Tự động lặp lại bài hát khi hết bài

// 1. LOGIC XỬ LÝ MÃ PIN
function pressKey(num) {
    if (currentPIN.length < 4) {
        currentPIN += num;
        updatePinDisplay();
        
        if (currentPIN.length === 4) {
            setTimeout(checkPIN, 300);
        }
    }
}

function clearPIN() {
    currentPIN = "";
    updatePinDisplay();
}

function backspacePIN() {
    currentPIN = currentPIN.slice(0, -1);
    updatePinDisplay();
}

function updatePinDisplay() {
    const dots = document.querySelectorAll('.pin-display .dot');
    dots.forEach((dot, index) => {
        if (index < currentPIN.length) {
            dot.classList.add('filled');
        } else {
            dot.classList.remove('filled');
        }
    });
}

function checkPIN() {
    if (currentPIN === CORRECT_PIN) {
        // Chuyển từ màn hình khóa sang menu chính
        document.getElementById('lock-screen').classList.remove('active');
        document.getElementById('menu-screen').classList.add('active');
        
        // TỰ ĐỘNG PHÁT NHẠC NỀN NGAY KHI VÀO MENU NÈ 🎵
        bgMusic.play().then(() => {
            isPlaying = true;
            // Cập nhật trạng thái nút bấm và đĩa xoay nếu người dùng có vào mục Music sau đó
            const playBtn = document.getElementById('play-pause-btn');
            const disc = document.getElementById('music-avatar');
            if (playBtn) playBtn.innerText = "⏸️ Pause";
            if (disc) disc.style.animationPlayState = "running";
        }).catch(err => console.log("Trình duyệt chặn tự động phát, cần bấm Play ở mục Music: ", err));

        // Kích hoạt hiệu ứng tim bay ở nền
        setInterval(createHeart, 400);
    } else {
        alert("Ngày sinh của 2 đứa ");
        clearPIN();
    }
}

// 2. CHUYỂN ĐỔI MÀN HÌNH TÍNH NĂNG
function openFeature(feature) {
    // Ẩn menu chính
    document.getElementById('menu-screen').classList.remove('active');
    
    // Hiển thị màn hình tính năng tương ứng
    const targetScreen = document.getElementById(`feature-${feature}`);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }

    // Nếu chọn Thư, chạy hiệu ứng đánh chữ
    if (feature === 'letter') {
        startTypewriter();
    }
}

// Hàm closeFeature mới: Giữ nguyên nhạc phát nền khi đóng tính năng
function closeFeature() {
    document.querySelectorAll('.sub-screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Đã xóa lệnh tắt nhạc ở đây để nhạc phát liên tục khi thoát ra ngoài menu chính 🎶

    document.getElementById('menu-screen').classList.add('active');
}

// 3. HIỆU ỨNG ĐÁNH CHỮ (TYPEWRITER)
const letterContent = `Hello Em iu,
Gần 3 tháng rồi đó 😊.Hơn hai tháng , không hẳn là một khoảng thời gian quá dài, nhưng đối với anh đủ để anh nhận ra em có ý nghĩa nhường nào trong cuộc sống của anh.

Anh nhớ những ngày đầu tiên hai đứa còn chút ngại ngùng, rồi đến những buổi hẹn hò ngập tràn tiếng cười, và cả những lúc chỉ cần ngồi im lặng bên nhau thôi cũng thấy bình yên đến lạ. Khoảng thời gian qua, mỗi ngày được trò chuyện, được quan tâm và có em ở bên cạnh là những khoảnh khắc anh luôn trân trọng nhất. Tình yêu của em khiến anh cảm thấy mình thật may mắn.

Anh biết, bản thân anh vẫn còn nhiều thiếu sót. Có những lúc anh chưa đủ tinh tế, đôi khi vô tâm, hoặc chưa biết cách thể hiện tình cảm sao cho trọn vẹn nhất để em luôn cảm thấy an tâm. Anh thực sự xin lỗi vì những lúc đã làm em buồn hay phải suy nghĩ suy tư. Cảm ơn em vì đã luôn bao dung, kiên nhẫn và ở lại bên anh, chấp nhận cả những phần chưa hoàn hảo của anh.

Hai tháng qua chỉ là chương mở đầu cho câu chuyện của tụi mình. Anh không dám hứa một tương lai xa xôi hoàn mỹ, nhưng anh hứa sẽ luôn cố gắng mỗi ngày — cố gắng lắng nghe em hơn, học cách sửa đổi những điều chưa tốt, và hoàn thiện bản thân để trở thành một chỗ dựa vững vàng, xứng đáng với tình yêu mà em đã trao cho anh.

Cảm ơn em vì đã đến, đã thương anh 
Yêu em nhiều hơn mỗi ngày :3
✨💖`;

let textIndex = 0;

function startTypewriter() {
    const textContainer = document.getElementById('typewriter-text');
    textContainer.innerHTML = "";
    textIndex = 0;
    type();
}

function type() {
    if (textIndex < letterContent.length) {
        document.getElementById('typewriter-text').innerHTML += letterContent.charAt(textIndex);
        textIndex++;
        setTimeout(type, 30); // Tốc độ gõ chữ (ms)
    }
}

// 4. HIỆU ỨNG TIM BAY (FLOATING HEARTS)
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart-bubble');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 2 + 3 + 's'; // từ 3s đến 5s
    document.body.appendChild(heart);

    // Xóa tim sau khi bay xong để tránh nặng máy
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// 5. LOGIC ĐIỀU KHIỂN NHẠC (MUSIC PLAYER)
function togglePlayMusic() {
    const playBtn = document.getElementById('play-pause-btn');
    const disc = document.getElementById('music-avatar');

    if (!isPlaying) {
        // Lệnh phát nhạc
        bgMusic.play().then(() => {
            isPlaying = true;
            playBtn.innerText = "⏸️ Pause";
            disc.style.animationPlayState = "running"; // Cho đĩa xoay
        }).catch(err => {
            alert("Không thể tải được bài hát từ mạng, bạn hãy kiểm tra lại link nhạc nhé.");
            console.log("Lỗi phát nhạc: ", err);
        });
    } else {
        // Lệnh dừng nhạc
        bgMusic.pause();
        isPlaying = false;
        playBtn.innerText = "▶️ Play";
        disc.style.animationPlayState = "paused"; // Dừng đĩa xoay
    }
}