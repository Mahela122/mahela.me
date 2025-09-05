// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Modern Custom Cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    // Mouse move event
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update cursor position immediately
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    // Smooth follower animation
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Click effect
    document.addEventListener('mousedown', () => {
        cursor.classList.add('click');
    });

    document.addEventListener('mouseup', () => {
        cursor.classList.remove('click');
    });

    // Hover effects for interactive elements
    const hoverElements = document.querySelectorAll('a, button, .social-card');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorFollower.classList.add('hover');
            cursor.style.transform = 'scale(1.2)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursorFollower.classList.remove('hover');
            cursor.style.transform = 'scale(1)';
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
    });

    // Background Music and Video Controls
    const backgroundMusic = document.getElementById('backgroundMusic');
    const backgroundVideo = document.getElementById('backgroundVideo');
    const musicToggle = document.getElementById('musicToggle');
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeBtn = document.getElementById('volumeBtn');
    const volumeFill = document.querySelector('.volume-fill::before');
    let isPlaying = false;

    // Set initial volume and try autoplay
    if (backgroundMusic) {
        backgroundMusic.volume = 0.3; // 30% volume to not be too loud
        
        // Initialize volume control
        if (volumeSlider) {
            volumeSlider.value = 30;
            updateVolumeDisplay(30);
            
            // Volume slider event
            volumeSlider.addEventListener('input', function() {
                const volume = this.value / 100;
                backgroundMusic.volume = volume;
                updateVolumeDisplay(this.value);
            });
        }

        // Volume button click (mute/unmute)
        if (volumeBtn) {
            volumeBtn.addEventListener('click', function() {
                if (backgroundMusic.volume > 0) {
                    backgroundMusic.dataset.previousVolume = backgroundMusic.volume;
                    backgroundMusic.volume = 0;
                    volumeSlider.value = 0;
                    updateVolumeDisplay(0);
                } else {
                    const previousVolume = backgroundMusic.dataset.previousVolume || 0.3;
                    backgroundMusic.volume = previousVolume;
                    volumeSlider.value = previousVolume * 100;
                    updateVolumeDisplay(previousVolume * 100);
                }
            });
        }

        // Try to autoplay immediately
        const playPromise = backgroundMusic.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Autoplay started successfully
                musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
                musicToggle.classList.add('playing');
                isPlaying = true;
                console.log('Music started automatically');
                
                // Start video if available
                if (backgroundVideo) {
                    backgroundVideo.play().catch(e => console.log('Video autoplay failed:', e));
                }
            }).catch(error => {
                // Autoplay was prevented
                console.log('Autoplay prevented by browser:', error);
                // Show a notification to user
                showAutoplayNotification();
            });
        }

        // Music toggle button functionality
        musicToggle.addEventListener('click', function() {
            if (isPlaying) {
                backgroundMusic.pause();
                if (backgroundVideo) backgroundVideo.pause();
                musicToggle.innerHTML = '<i class="fas fa-music"></i>';
                musicToggle.classList.remove('playing');
                isPlaying = false;
            } else {
                backgroundMusic.play().catch(e => {
                    console.log('Audio play failed:', e);
                    alert('Please allow audio permissions for this site.');
                });
                if (backgroundVideo) {
                    backgroundVideo.play().catch(e => console.log('Video play failed:', e));
                }
                musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
                musicToggle.classList.add('playing');
                isPlaying = true;
            }
        });

        // Handle audio events
        backgroundMusic.addEventListener('play', function() {
            musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
            musicToggle.classList.add('playing');
            isPlaying = true;
            if (backgroundVideo) backgroundVideo.play();
        });

        backgroundMusic.addEventListener('pause', function() {
            musicToggle.innerHTML = '<i class="fas fa-music"></i>';
            musicToggle.classList.remove('playing');
            isPlaying = false;
            if (backgroundVideo) backgroundVideo.pause();
        });

        backgroundMusic.addEventListener('error', function() {
            console.log('Audio file not found or failed to load');
            musicToggle.style.display = 'none'; // Hide button if audio fails
        });

        // Try to play music on any user interaction if autoplay failed
        let hasTriedAutoplay = false;
        document.addEventListener('click', function() {
            if (!hasTriedAutoplay && !isPlaying) {
                backgroundMusic.play().catch(e => console.log('Still cannot autoplay:', e));
                if (backgroundVideo) backgroundVideo.play().catch(e => console.log('Video autoplay failed:', e));
                hasTriedAutoplay = true;
            }
        }, { once: true });
    }

    // Handle video background
    if (backgroundVideo) {
        backgroundVideo.addEventListener('error', function() {
            console.log('Video file not found - using animated background instead');
            // Hide video element and enhance animated effects
            backgroundVideo.style.display = 'none';
            createEnhancedFantasyEffects();
        });
    } else {
        // No video element, create enhanced fantasy effects
        createEnhancedFantasyEffects();
    }

    // Function to create enhanced fantasy effects when no video
    function createEnhancedFantasyEffects() {
        const fantasyContainer = document.querySelector('.fantasy-effects');
        if (!fantasyContainer) return;

        // Create additional mystical elements
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'fantasy-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 8 + 2}px;
                height: ${Math.random() * 8 + 2}px;
                background: ${Math.random() > 0.5 ? 'rgba(0, 212, 255, 0.6)' : 'rgba(155, 89, 182, 0.6)'};
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: fantasyDance ${Math.random() * 10 + 10}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
                box-shadow: 0 0 20px currentColor;
            `;
            fantasyContainer.appendChild(particle);
        }

        // Add CSS for fantasy dance animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fantasyDance {
                0%, 100% {
                    transform: translateY(0px) translateX(0px) rotate(0deg) scale(1);
                    opacity: 0.3;
                }
                25% {
                    transform: translateY(-100px) translateX(50px) rotate(90deg) scale(1.2);
                    opacity: 0.8;
                }
                50% {
                    transform: translateY(-50px) translateX(-30px) rotate(180deg) scale(0.8);
                    opacity: 0.6;
                }
                75% {
                    transform: translateY(-120px) translateX(80px) rotate(270deg) scale(1.1);
                    opacity: 0.9;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Volume Display Update Function
    function updateVolumeDisplay(volume) {
        const volumeFill = document.querySelector('.volume-fill');
        const volumeIcon = document.querySelector('#volumeBtn i');
        
        if (volumeFill) {
            volumeFill.style.setProperty('--volume-width', volume + '%');
            // Add CSS custom property to update the fill
            const style = document.createElement('style');
            style.textContent = `
                .volume-fill::before {
                    width: ${volume}% !important;
                }
            `;
            // Remove previous style if exists
            const prevStyle = document.querySelector('#volume-style');
            if (prevStyle) prevStyle.remove();
            style.id = 'volume-style';
            document.head.appendChild(style);
        }
        
        if (volumeIcon) {
            volumeIcon.className = '';
            if (volume == 0) {
                volumeIcon.className = 'fas fa-volume-mute volume-muted';
            } else if (volume < 50) {
                volumeIcon.className = 'fas fa-volume-down volume-low';
            } else {
                volumeIcon.className = 'fas fa-volume-up volume-high';
            }
        }
    }

    // Function to show autoplay notification
    function showAutoplayNotification() {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: rgba(0, 212, 255, 0.9);
            color: white;
            padding: 10px 15px;
            border-radius: 8px;
            font-size: 14px;
            z-index: 1001;
            animation: slideIn 0.3s ease;
        `;
        notification.innerHTML = '🎵 Click anywhere to start background music';
        document.body.appendChild(notification);

        // Remove notification after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);

        // Remove notification on click
        document.addEventListener('click', () => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, { once: true });
    }

    // Add smooth entrance animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    // Observe social cards for staggered animation
    const socialCards = document.querySelectorAll('.social-card');
    socialCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Add click sound effect (optional - you can remove this if you don't want sound)
    socialCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add a subtle scale animation on click
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Handle profile image loading
    const profileImg = document.getElementById('profileImg');
    profileImg.addEventListener('error', function() {
        // If the profile image fails to load, show a default avatar
        this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiByeD0iNzUiIGZpbGw9InVybCgjZ3JhZGllbnQpIi8+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNjAiIHI9IjI1IiBmaWxsPSJ3aGl0ZSIgb3BhY2l0eT0iMC44Ii8+CjxwYXRoIGQ9Ik0zMCAxMjBDMzAgMTAwIDUwIDg1IDc1IDg1UzEyMCAxMDAgMTIwIDEyMFYxNDBIMzBWMTIwWiIgZmlsbD0id2hpdGUiIG9wYWNpdHk9IjAuOCIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudCIgeDE9IjAiIHkxPSIwIiB4Mj0iMSIgeTI9IjEiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMDBkNGZmIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzliNTliNiIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPgo=';
        this.alt = 'Default Avatar';
    });

    // Add typing animation to bio text
    const bioElement = document.querySelector('.bio');
    const bioText = bioElement.textContent;
    bioElement.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < bioText.length) {
            bioElement.textContent += bioText.charAt(i);
            i++;
            setTimeout(typeWriter, 30);
        }
    }
    
    // Start typing animation after a delay
    setTimeout(typeWriter, 1500);

    // Add parallax effect to background (subtle)
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.body;
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            // Ensure focus is visible on social cards
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // Add dynamic year to footer
    const currentYear = new Date().getFullYear();
    const footerText = document.querySelector('.footer p');
    if (footerText) {
        footerText.innerHTML = footerText.innerHTML.replace('2025', currentYear);
    }

    // Create floating particles effect (optional)
    createFloatingParticles();
});

// Floating particles animation
function createFloatingParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    document.body.appendChild(particlesContainer);

    // Create particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(0, 212, 255, 0.5);
            border-radius: 50%;
            animation: float ${Math.random() * 10 + 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 10}s;
        `;
        particlesContainer.appendChild(particle);
    }

    // Add CSS for particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        .keyboard-navigation .social-card:focus {
            outline: 2px solid #00d4ff;
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(style);
}

// Add smooth loading transition
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
});

// Set initial body opacity
document.body.style.opacity = '0';
