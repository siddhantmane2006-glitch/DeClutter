// Simple intersection observer to add elegant, subtle reveal animations
document.addEventListener('DOMContentLoaded', () => {
    // Add CSS definitions for our dynamic animations
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .animated-up { animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animated-fade { animation: fadeIn 1s ease-out forwards; }
    `;
    document.head.appendChild(style);

    // Classes mapping to animations
    const animationMap = {
        'reveal-up': 'animated-up',
        'reveal-up-delay': 'animated-up',
        'reveal-text': 'animated-up',
        'reveal-text-delay': 'animated-up',
        'reveal-fade': 'animated-fade'
    };

    // Stagger delays
    const delays = {
        'reveal-text-delay': '0.15s',
        'reveal-hero-btns': '0.3s',
        'reveal-up-delay': '0.2s'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                
                // Determine which animation to apply
                for (const [triggerClass, animClass] of Object.entries(animationMap)) {
                    if (el.classList.contains(triggerClass)) {
                        el.classList.add(animClass);
                        el.style.opacity = '1'; /* Override hidden defaults */
                        
                        // Apply specific staggering if needed
                        if (delays[triggerClass]) {
                            el.style.animationDelay = delays[triggerClass];
                        }
                    }
                }
                
                // Only animate once
                observer.unobserve(el);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    // Target elements
    const elementsToAnimate = document.querySelectorAll('.reveal-up, .reveal-text, .reveal-fade, .reveal-text-delay, .reveal-up-delay');
    elementsToAnimate.forEach(el => observer.observe(el));
    
    // Falling Files Animation Logic
    const files = document.querySelectorAll('.file');
    const animContainer = document.querySelector('.merged-animation-area');
    const spawnButtons = [document.getElementById('btn-spawn-1'), document.getElementById('btn-spawn-2')];
    
    if (animContainer && files.length > 0) {
        const targetMap = { 'docs': {x: 0, y: 0}, 'photos': {x: 0, y: 0}, 'code': {x: 0, y: 0} };
        const countMap = { 'docs': 0, 'photos': 0, 'code': 0 }; 
        
        function updateTargets() {
            const folders = document.querySelectorAll('.folder');
            folders.forEach(f => {
                const id = f.id.replace('folder-', '');
                const fRect = f.getBoundingClientRect();
                const cRect = animContainer.getBoundingClientRect();
                // Store center of the folder icon area
                targetMap[id] = {
                    x: (fRect.left - cRect.left) + (fRect.width / 2),
                    y: (fRect.top - cRect.top) + 40 // ~center of the icon
                };
            });
        }
        
        function dropFile(fileEl, delay) {
            setTimeout(() => {
                updateTargets();
                
                // Source from buttons
                const btn = spawnButtons[Math.floor(Math.random() * spawnButtons.length)];
                const btnRect = btn.getBoundingClientRect();
                const cRect = animContainer.getBoundingClientRect();
                
                // Center of the button
                const startX = (btnRect.left - cRect.left) + (btnRect.width / 2);
                const startY = (btnRect.top - cRect.top) + (btnRect.height / 2);
                
                // Visual feedback: Emit pulse from button 
                btn.style.transition = 'transform 0.1s cubic-bezier(0.4, 0, 0.2, 1)';
                btn.style.transform = 'scale(0.93)';
                setTimeout(() => { btn.style.transform = 'translateY(-1px) scale(1)'; }, 100);
                setTimeout(() => { btn.style.transform = ''; }, 200);
                
                const targetId = fileEl.getAttribute('data-target');
                const targetX = targetMap[targetId].x;
                const targetY = targetMap[targetId].y;
                
                // Speeds that snap clearly from the button
                const duration = 1.1 + Math.random() * 0.4; 
                
                // Explode out of the button
                fileEl.style.transition = 'none';
                fileEl.style.top = startY + 'px';
                fileEl.style.left = startX + 'px';
                fileEl.style.opacity = '1';
                fileEl.style.transform = `translate(-50%, -50%) scale(0) rotate(${(Math.random() - 0.5) * 60}deg)`;
                fileEl.style.zIndex = '1000'; // Super high 
                
                // Start Float
                setTimeout(() => {
                    fileEl.style.transition = `top ${duration}s cubic-bezier(0.3, 0, 0.3, 1), left ${duration}s cubic-bezier(0.3, 0, 0.3, 1), transform ${duration}s ease`;
                    fileEl.style.transform = 'translate(-50%, -50%) scale(0.9) rotate(0deg)';
                    
                    fileEl.style.top = targetY + 'px';
                    fileEl.style.left = targetX + 'px';
                    
                    // Landing hit
                    setTimeout(() => {
                        const folder = document.getElementById('folder-' + targetId);
                        folder.classList.add('active'); 
                        
                        countMap[targetId]++;
                        const counterEl = folder.querySelector('.folder-count');
                        if(counterEl) {
                            counterEl.innerText = `${countMap[targetId]} items sorted`;
                            counterEl.style.color = 'var(--primary-blue)';
                            setTimeout(() => counterEl.style.color = 'var(--text-secondary)', 300);
                        }
                        
                        fileEl.style.transition = 'all 0.15s ease-out';
                        fileEl.style.transform = 'translate(-50%, -50%) scale(0) translateY(40px)';
                        fileEl.style.opacity = '0';
                        
                        setTimeout(() => {
                            folder.classList.remove('active');
                        }, 300);
                        
                        // Loop it
                        setTimeout(() => dropFile(fileEl, Math.random() * 1000 + 400), 800);
                    }, duration * 1000 - 100); 
                    
                }, 40); // very short delay to ensure browser registers the size 0
            }, delay);
        }
        
        // Stagger the initial drops
        files.forEach((file, idx) => {
            dropFile(file, idx * 500 + Math.random() * 500); 
        });
        
        window.addEventListener('resize', updateTargets);
    }

    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            // Close all
            faqItems.forEach(faq => faq.classList.remove('active'));
            // Open clicked if not previously active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Realistic Live Counter
    const counterEl = document.getElementById('live-count');
    if (counterEl) {
        // Use the current epoch time to create a globally synchronized and ever-growing base number.
        // This ensures the count doesn't reset on refresh and stays realistic across all devices.
        // Anchor set to approx April 10, 2026 to start calculating from 80k right now.
        const baseEpoch = 1775840000000; 
        const elapsedSinceAnchor = Math.max(0, Date.now() - baseEpoch);
        
        // Start with the initial baseline + (elapsed milliseconds * approx ~3.8 files/sec globally)
        let count = 80000 + Math.floor(elapsedSinceAnchor * 0.0038);
        
        // Render initial sync count immediately
        counterEl.innerText = count.toLocaleString();
        
        const updateCounter = () => {
            // Randomly increase between 1 and 4 files to simulate real network bursts visually
            const increment = Math.floor(Math.random() * 4) + 1;
            count += increment;
            counterEl.innerText = count.toLocaleString();
            
            // Randomly determine delay. Simulates organic traffic bursts vs slow periods
            // Average growth matches the ~3.8 global files/sec sync rate.
            const nextUpdateDelay = Math.random() < 0.2 ? Math.random() * 2500 + 1000 : Math.random() * 300 + 100;
            setTimeout(updateCounter, nextUpdateDelay);
        };
        
        // Start after slight delay on load
        setTimeout(updateCounter, 800);
    }

});
