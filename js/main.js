// main.js

// 1. الانتظار حتى يتم تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== البحث (Search) ==========
    const searchIcon = document.querySelector('.form i');
    const searchForm = document.createElement('div');
    searchForm.className = 'search-form';
    searchForm.innerHTML = `
        <div class="search-container">
            <input type="text" class="search-input" placeholder="Search...">
            <button class="search-close">&times;</button>
        </div>
    `;
    document.body.appendChild(searchForm);
    
    // CSS للبحث
    const searchStyles = document.createElement('style');
    searchStyles.textContent = `
        .search-form {
            position: fixed;
            top: -100%;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.95);
            z-index: 10000;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: top 0.5s ease-in-out;
        }
        
        .search-form.active {
            top: 0;
        }
        
        .search-container {
            width: 80%;
            max-width: 600px;
            position: relative;
        }
        
        .search-input {
            width: 100%;
            padding: 20px 60px 20px 30px;
            font-size: 24px;
            background: transparent;
            border: 2px solid var(--main-color);
            border-radius: 50px;
            color: white;
            outline: none;
        }
        
        .search-close {
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: white;
            font-size: 30px;
            cursor: pointer;
            transition: color 0.3s;
        }
        
        .search-close:hover {
            color: var(--main-color);
        }
        
        ::placeholder {
            color: rgba(255, 255, 255, 0.6);
        }
    `;
    document.head.appendChild(searchStyles);
    
    // حدث فتح/إغلاق البحث
    searchIcon.addEventListener('click', function() {
        searchForm.classList.add('active');
        searchForm.querySelector('.search-input').focus();
    });
    
    searchForm.querySelector('.search-close').addEventListener('click', function() {
        searchForm.classList.remove('active');
    });
    
    // إغلاق البحث بالضغط على ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            searchForm.classList.remove('active');
        }
    });
    
    // ========== Bullets Animation ==========
    const allBullets = document.querySelectorAll('.bullets li');
    
    allBullets.forEach(bullet => {
        bullet.addEventListener('click', function() {
            // إزالة النشاط من جميع الـ bullets
            allBullets.forEach(b => b.classList.remove('active'));
            
            // إضافة النشاط للـ bullet المختار
            this.classList.add('active');
            
            // تأثير رسومي
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 300);
        });
    });
    
    // ========== Portfolio Filtering ==========
    const portfolioShuffle = document.querySelectorAll('.shuffle li');
    const portfolioImages = document.querySelectorAll('.imgs-container .box');
    
    // تخزين الصور لكل فئة
    const portfolioCategories = {
        'all': Array.from(portfolioImages),
        'app': [
            portfolioImages[0], // الصورة الأولى (app.png)
            portfolioImages[2]  // shuffle-05.jpg
        ],
        'photo': [
            portfolioImages[1], // webApp.png
            portfolioImages[5], // pexels-andreimike-1271619.jpg
            portfolioImages[6], // pexels-eberhardgross-691668.jpg
            portfolioImages[7]  // pexels-pixabay-355747.jpg
        ],
        'web': [
            portfolioImages[3], // shuffle-01.jpg
            portfolioImages[4]  // shuffle-04.jpg
        ],
        'print': [
            portfolioImages[2], // shuffle-05.jpg
            portfolioImages[4]  // shuffle-04.jpg
        ]
    };
    
    // أحداث التصفية
    portfolioShuffle.forEach(item => {
        item.addEventListener('click', function() {
            // إزالة النشاط من جميع العناصر
            portfolioShuffle.forEach(li => li.classList.remove('active'));
            
            // إضافة النشاط للعنصر المختار
            this.classList.add('active');
            
            // الحصول على الفئة المختارة
            const category = this.textContent.toLowerCase();
            
            // إخفاء جميع الصور
            portfolioImages.forEach(img => {
                img.style.display = 'none';
                img.style.animation = 'none';
            });
            
            // عرض الصور الخاصة بالفئة المختارة مع تأثير
            setTimeout(() => {
                if (portfolioCategories[category]) {
                    portfolioCategories[category].forEach((img, index) => {
                        img.style.display = 'block';
                        img.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
                    });
                }
            }, 50);
        });
    });
    
    // إضافة CSS للـ animations
    const animationsCSS = document.createElement('style');
    animationsCSS.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(-100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        /* Animation للصفحة الرئيسية */
        .landing .text {
            animation: slideIn 1s ease-out;
        }
        
        /* Animation للخدمات */
        .srv-box {
            opacity: 0;
            transform: translateY(30px);
            animation: fadeIn 0.8s ease forwards;
        }
        
        .srv-box:nth-child(1) { animation-delay: 0.2s; }
        .srv-box:nth-child(2) { animation-delay: 0.4s; }
        .srv-box:nth-child(3) { animation-delay: 0.6s; }
        .srv-box:nth-child(4) { animation-delay: 0.8s; }
        
        /* Animation للمهارات */
        .prog span {
            animation: fillProgress 2s ease-in-out forwards;
        }
        
        @keyframes fillProgress {
            from { width: 0; }
            to { width: attr(data-progress); }
        }
        
        /* Animation للإحصائيات */
        .stats .box {
            animation: countUp 2s ease-out forwards;
        }
        
        @keyframes countUp {
            from { opacity: 0; transform: translateY(50px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        /* Hover effects */
        .portfolio .box {
            transition: transform 0.3s ease;
        }
        
        .portfolio .box:hover {
            transform: translateY(-10px);
        }
        
        .plan {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .plan:hover {
            transform: translateY(-10px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        
        .social-icons i {
            transition: transform 0.3s ease, color 0.3s ease;
        }
        
        .social-icons i:hover {
            transform: translateY(-5px);
            color: var(--main-color);
        }
    `;
    document.head.appendChild(animationsCSS);
    
    // ========== Animated Counter for Stats ==========
    const statsNumbers = document.querySelectorAll('.stats .number');
    
    function animateCounter(element) {
        const target = parseInt(element.textContent.replace(',', ''));
        const duration = 2000; // 2 ثانية
        const step = target / (duration / 16); // 60fps
        
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    }
    
    // تشغيل العد عند التمرير للقسم
    const statsSection = document.querySelector('.stats');
    
    function checkStatsVisibility() {
        const rect = statsSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isVisible) {
            statsNumbers.forEach(animateCounter);
            window.removeEventListener('scroll', checkStatsVisibility);
        }
    }
    
    window.addEventListener('scroll', checkStatsVisibility);
    
    // ========== Animated Skills Bars ==========
    const skillBars = document.querySelectorAll('.prog span');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress;
            
            // إضافة تأثير تدريجي
            setTimeout(() => {
                bar.style.transition = 'width 1.5s ease-in-out';
            }, 500);
        });
    }
    
    // تشغيل animation عند التمرير للقسم
    const skillsSection = document.querySelector('.our-skills');
    
    function checkSkillsVisibility() {
        const rect = skillsSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isVisible) {
            animateSkillBars();
            window.removeEventListener('scroll', checkSkillsVisibility);
        }
    }
    
    window.addEventListener('scroll', checkSkillsVisibility);
    
    // ========== Smooth Navigation ==========
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========== Video Control ==========
    const video = document.querySelector('video');
    const videoButton = document.querySelector('.video button');
    
    if (videoButton) {
        videoButton.addEventListener('click', function() {
            video.muted = false;
            video.play();
            
            // إضافة زر إيقاف
            const pauseButton = document.createElement('button');
            pauseButton.textContent = 'Pause Video';
            pauseButton.className = 'pause-video';
            pauseButton.style.cssText = `
                position: absolute;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                padding: 10px 20px;
                background: var(--main-color);
                color: white;
                border: none;
                cursor: pointer;
                border-radius: 5px;
            `;
            
            document.querySelector('.video').appendChild(pauseButton);
            
            pauseButton.addEventListener('click', function() {
                video.pause();
                this.remove();
            });
        });
    }
    
    // ========== Form Validation ==========
    const contactForm = document.querySelector('.contact form');
    const subscribeForm = document.querySelector('.subscribe form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[name="name"]');
            const email = this.querySelector('input[name="mail"]');
            const message = this.querySelector('textarea[name="message"]');
            
            let isValid = true;
            
            // التحقق من الاسم
            if (!name.value.trim()) {
                showError(name, 'الرجاء إدخال الاسم');
                isValid = false;
            } else {
                clearError(name);
            }
            
            // التحقق من البريد الإلكتروني
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                showError(email, 'الرجاء إدخال بريد إلكتروني صحيح');
                isValid = false;
            } else {
                clearError(email);
            }
            
            // التحقق من الرسالة
            if (!message.value.trim()) {
                showError(message, 'الرجاء إدخال الرسالة');
                isValid = false;
            } else {
                clearError(message);
            }
            
            if (isValid) {
                // هنا يمكنك إرسال النموذج
                alert('تم إرسال الرسالة بنجاح!');
                this.reset();
            }
        });
    }
    
    function showError(input, message) {
        const formGroup = input.parentElement;
        let errorDiv = formGroup.querySelector('.error-message');
        
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.cssText = `
                color: #ff3333;
                font-size: 14px;
                margin-top: 5px;
            `;
            formGroup.appendChild(errorDiv);
        }
        
        errorDiv.textContent = message;
        input.style.borderColor = '#ff3333';
    }
    
    function clearError(input) {
        const formGroup = input.parentElement;
        const errorDiv = formGroup.querySelector('.error-message');
        
        if (errorDiv) {
            errorDiv.remove();
        }
        
        input.style.borderColor = '#ccc';
    }
    
    
    
    // ========== Back to Top Button ==========
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '&uarr;';
    backToTopButton.className = 'back-to-top';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: var(--main-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 20px;
        display: none;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        transition: opacity 0.3s;
    `;
    
    document.body.appendChild(backToTopButton);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
            setTimeout(() => {
                backToTopButton.style.opacity = '1';
            }, 10);
        } else {
            backToTopButton.style.opacity = '0';
            setTimeout(() => {
                backToTopButton.style.display = 'none';
            }, 300);
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ========== Preloader ==========
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #1f2021;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s, visibility 0.5s;
    `;
    
    preloader.innerHTML = `
        <div class="loader" style="
            width: 50px;
            height: 50px;
            border: 5px solid #f3f3f3;
            border-top: 5px solid var(--main-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        "></div>
    `;
    
    document.body.prepend(preloader);
    
    // إخفاء preloader بعد تحميل الصفحة
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }, 1000);
    });
    
    // إضافة keyframe للـ preloader
    const preloaderCSS = document.createElement('style');
    preloaderCSS.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(preloaderCSS);
});