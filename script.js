
// ===============================
// CẤU HÌNH WEBSITE MAYA
// ===============================
const CORRECT_PIN = "0313";
const startDate = new Date("2026-04-13T00:00:00");

// Giữ nguyên nhạc từ website cũ
const bgMusic = new Audio("https://files.catbox.moe/s2l13g.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.55;

let currentPIN = "";
let isPlaying = false;
let typewriterTimer = null;
let heartTimer = null;

// ===============================
// HIỆU ỨNG NỀN
// ===============================
function createStars() {
    const container = document.getElementById("stars");
    if (!container) return;

    for (let i = 0; i < 90; i++) {
        const star = document.createElement("span");
        star.className = "star";
        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 100 + "%";
        star.style.animationDelay = Math.random() * 3 + "s";
        star.style.animationDuration = (1.5 + Math.random() * 3) + "s";
        container.appendChild(star);
    }
}

function createHeart() {
    const container = document.getElementById("hearts");
    if (!container) return;

    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = ["💗", "💕", "✨", "💖", "💜"][Math.floor(Math.random() * 5)];
    heart.style.left = Math.random() * 100 + "%";
    heart.style.fontSize = (14 + Math.random() * 17) + "px";
    container.appendChild(heart);

    setTimeout(() => heart.remove(), 7500);
}

// ===============================
// XỬ LÝ MÃ PIN
// ===============================
function pressKey(num) {
    if (currentPIN.length >= 4) return;

    currentPIN += String(num);
    updatePinDisplay();

    if (currentPIN.length === 4) {
        setTimeout(checkPIN, 250);
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
    document.querySelectorAll(".pin-display .dot").forEach((dot, index) => {
        dot.classList.toggle("filled", index < currentPIN.length);
    });
}

function checkPIN() {
    const message = document.getElementById("pin-message");

    if (currentPIN === CORRECT_PIN) {
        document.getElementById("lock-screen").classList.remove("active");
        document.getElementById("menu-screen").classList.add("active");

        if (message) message.textContent = "";

        // Trình duyệt có thể chặn tự phát nhạc.
        bgMusic.play().then(() => {
            isPlaying = true;
            updateMusicButton();
        }).catch(() => {
            isPlaying = false;
            updateMusicButton();
        });

        if (!heartTimer) {
            heartTimer = setInterval(createHeart, 700);
        }
    } else {
        if (message) message.textContent = "Sai mật mã rồi, thử lại nhé 💗";
        clearPIN();
    }
}

// Cho phép nhập PIN bằng bàn phím máy tính
document.addEventListener("keydown", (event) => {
    if (!document.getElementById("lock-screen")?.classList.contains("active")) return;

    if (/^\d$/.test(event.key)) {
        pressKey(event.key);
    } else if (event.key === "Backspace") {
        backspacePIN();
    } else if (event.key === "Escape") {
        clearPIN();
    }
});

// ===============================
// CHUYỂN MÀN HÌNH
// ===============================
function openFeature(feature) {
    document.getElementById("menu-screen").classList.remove("active");

    document.querySelectorAll(".sub-screen").forEach(screen => {
        screen.classList.remove("active");
    });

    const target = document.getElementById("feature-" + feature);

    if (target) {
        target.classList.add("active");
    }

    if (feature === "letter") {
        startTypewriter();
    }
}

function closeFeature() {
    document.querySelectorAll(".sub-screen").forEach(screen => {
        screen.classList.remove("active");
    });

    document.getElementById("menu-screen").classList.add("active");
    clearInterval(typewriterTimer);
}

// ===============================
// NỘI DUNG THƯ
// ===============================
const letterContent = `Hello Em iu,

Gần 3 tháng rồi đó 😊. Hơn hai tháng, không hẳn là một khoảng thời gian quá dài, nhưng đối với anh đủ để anh nhận ra em có ý nghĩa nhường nào trong cuộc sống của anh.

Anh nhớ những ngày đầu tiên hai đứa còn chút ngại ngùng, rồi đến những buổi hẹn hò ngập tràn tiếng cười, và cả những lúc chỉ cần ngồi im lặng bên nhau thôi cũng thấy bình yên đến lạ. Khoảng thời gian qua, mỗi ngày được trò chuyện, được quan tâm và có em ở bên cạnh là những khoảnh khắc anh luôn trân trọng nhất. Tình yêu của em khiến anh cảm thấy mình thật may mắn.

Anh biết, bản thân anh vẫn còn nhiều thiếu sót. Có những lúc anh chưa đủ tinh tế, đôi khi vô tâm, hoặc chưa biết cách thể hiện tình cảm sao cho trọn vẹn nhất để em luôn cảm thấy an tâm. Anh thực sự xin lỗi vì những lúc đã làm em buồn hay phải suy nghĩ suy tư. Cảm ơn em vì đã luôn bao dung, kiên nhẫn và ở lại bên anh, chấp nhận cả những phần chưa hoàn hảo của anh.

Hai tháng qua chỉ là chương mở đầu cho câu chuyện của tụi mình. Anh không dám hứa một tương lai xa xôi hoàn mỹ, nhưng anh hứa sẽ luôn cố gắng mỗi ngày — cố gắng lắng nghe em hơn, học cách sửa đổi những điều chưa tốt, và hoàn thiện bản thân để trở thành một chỗ dựa vững vàng, xứng đáng với tình yêu mà em đã trao cho anh.

Cảm ơn em vì đã đến, đã thương anh.

Yêu em nhiều hơn mỗi ngày :3

✨💖`;

function startTypewriter() {
    const container = document.getElementById("typewriter-text");
    if (!container) return;

    clearInterval(typewriterTimer);
    container.textContent = "";

    let index = 0;

    typewriterTimer = setInterval(() => {
        if (index < letterContent.length) {
            container.textContent += letterContent.charAt(index);
            index++;
        } else {
            clearInterval(typewriterTimer);
        }
    }, 28);
}

// ===============================
// TRÌNH PHÁT NHẠC
// ===============================
function updateMusicButton() {
    const button = document.getElementById("play-pause-btn");
    const disc = document.getElementById("music-avatar");

    if (button) {
        button.textContent = isPlaying ? "⏸ Pause" : "▶ Play";
    }

    if (disc) {
        disc.classList.toggle("playing", isPlaying);
    }
}

async function togglePlayMusic() {
    try {
        if (isPlaying) {
            bgMusic.pause();
            isPlaying = false;
        } else {
            await bgMusic.play();
            isPlaying = true;
        }

        updateMusicButton();
    } catch (error) {
        alert("Không phát được nhạc. Bạn hãy kiểm tra kết nối mạng nhé!");
    }
}

// Cập nhật trạng thái nếu nhạc bị dừng từ trình duyệt
bgMusic.addEventListener("pause", () => {
    isPlaying = false;
    updateMusicButton();
});

bgMusic.addEventListener("play", () => {
    isPlaying = true;
    updateMusicButton();
});

// ===============================
// BỘ ĐẾM KỶ NIỆM
// ===============================
function updateAnniversary() {
    const now = new Date();
    const diff = now - ANNIVERSARY;

    const ids = ["days", "hours", "minutes", "seconds"];

    if (diff < 0) {
        ids.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = "0";
        });
        return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

// ===============================
// XOAY ALBUM BẰNG CẢM ỨNG
// ===============================
function setupGallerySwipe() {
    const gallery = document.querySelector(".carousel-container");
    const carousel = document.querySelector(".carousel-3d");

    if (!gallery || !carousel) return;

    let startX = 0;
    let rotation = 0;

    gallery.addEventListener("touchstart", event => {
        startX = event.touches[0].clientX;
        carousel.style.animation = "none";
    }, { passive: true });

    gallery.addEventListener("touchend", event => {
        const endX = event.changedTouches[0].clientX;
        const delta = endX - startX;

        rotation += delta > 0 ? 60 : -60;
        carousel.style.transform = `rotateY(${rotation}deg)`;
    }, { passive: true });
}

// ===============================
// KHỞI ĐỘNG
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    createStars();
    updateAnniversary();
    setInterval(updateAnniversary, 1000);
    setupGallerySwipe();
});
