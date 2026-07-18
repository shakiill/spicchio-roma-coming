// --- Spicchio Roma - Dynamic Coming Soon Page Interactivity ---

document.addEventListener('DOMContentLoaded', () => {
    // 1. Set current year in footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Countdown Timer Logic
    // Set launch target to 30 days from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);
    
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate.getTime() - now;

        if (difference <= 0) {
            // Target date reached
            if (daysEl) daysEl.textContent = '00';
            if (hoursEl) hoursEl.textContent = '00';
            if (minutesEl) minutesEl.textContent = '00';
            if (secondsEl) secondsEl.textContent = '00';
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Pad with leading zeros
        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    // Initial run and repeat every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
    // 3. Premium Mouse Tilt Effect on Teaser Cards (Desktop Only)
    const cards = document.querySelectorAll('.teaser-card');
    
    cards.forEach(card => {
        if (window.innerWidth > 768) {
            card.addEventListener('mousemove', (e) => {
                const cardRect = card.getBoundingClientRect();
                const cardWidth = cardRect.width;
                const cardHeight = cardRect.height;
                const centerX = cardRect.left + cardWidth / 2;
                const centerY = cardRect.top + cardHeight / 2;
                
                const mouseX = e.clientX - centerX;
                const mouseY = e.clientY - centerY;
                
                const maxTilt = 3.5; 
                const rotateX = -((mouseY / (cardHeight / 2)) * maxTilt).toFixed(2);
                const rotateY = ((mouseX / (cardWidth / 2)) * maxTilt).toFixed(2);
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
                card.style.transition = 'transform 0.5s ease';
            });

            card.addEventListener('mouseenter', () => {
                card.style.transition = 'none';
            });
        }
    });

    // 4. Inertial Ambient Cursor Glow Tracking
    const cursorGlow = document.getElementById('cursor-glow');
    
    if (cursorGlow) {
        let mouseX = 0;
        let mouseY = 0;
        let glowX = 0;
        let glowY = 0;
        let isGlowActive = false;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Initialize glow coordinates if first move
            if (!isGlowActive) {
                glowX = mouseX;
                glowY = mouseY;
                isGlowActive = true;
            }
            cursorGlow.style.opacity = '1';
        });

        document.addEventListener('mouseleave', () => {
            cursorGlow.style.opacity = '0';
        });

        function animateGlow() {
            if (isGlowActive) {
                const dx = mouseX - glowX;
                const dy = mouseY - glowY;
                
                // 0.08 multiplier creates a smooth lagging inertia
                glowX += dx * 0.08;
                glowY += dy * 0.08;
                
                cursorGlow.style.left = `${glowX}px`;
                cursorGlow.style.top = `${glowY}px`;
            }
            requestAnimationFrame(animateGlow);
        }
        animateGlow();
    }
});
