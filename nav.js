document.addEventListener("DOMContentLoaded", function() {
    // 0. 專案分類資料（桌面版與手機版選單共用）
    const projectCategories = [
        { name: '多模態與智慧互動', icon: 'fa-cubes', color: 'rose', width: 'w-60', items: [
            ['doc_conflict', '通用多模態文件衝突檢測'],
            ['search_engine', '技術手冊語意搜尋引擎'],
            ['neural_system', '神經訊號標籤與閉迴路操控'],
            ['chatbot', '多模態 AI 機器人'],
        ]},
        { name: '自然語言處理 (NLP)', icon: 'fa-language', color: 'blue', width: 'w-56', items: [
            ['nursing', '護理紀錄補全系統'],
            ['ticketing', '威秀訂票系統'],
        ]},
        { name: '數據工程與自動化', icon: 'fa-database', color: 'emerald', width: 'w-60', items: [
            ['doc_organization', '企業雲端知識庫整理管線'],
            ['weather', '澳洲降雨預測系統'],
        ]},
        { name: '電腦視覺 (CV)', icon: 'fa-eye', color: 'orange', width: 'w-52', items: [
            ['retrieval', '服飾以圖搜圖'],
        ]},
        { name: '系統與分散式運算', icon: 'fa-network-wired', color: 'slate', width: 'w-56', items: [
            ['mpi', '平行化巨量向量檢索'],
            ['ledger', '分散式共享帳本'],
        ]},
    ];
    const experienceLinks = [
        ['cadre', '班級幹部'],
        ['fire-club', '社團活動'],
        ['work', '工作經驗'],
    ];

    // 目前頁面（用於高亮當前位置）
    const currentPage = location.pathname.split('/').pop().replace('.html', '') || 'index';
    const inProjectDir = /\/project\//.test(location.pathname);
    const isCurrentProject = (slug) => inProjectDir && currentPage === slug;

    // 1. 統一注入 CSS
    const styleHTML = `
    <style>
        html { -webkit-text-size-adjust: 100%; scroll-behavior: smooth; }
        body { -webkit-tap-highlight-color: transparent; overflow-x: hidden; }
        img { max-width: 100%; }

        .nav-gradient-text {
            background: linear-gradient(90deg, #3b82f6, #8b5cf6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        /* 一級選單：滑鼠懸浮、鍵盤聚焦或點擊（.is-open）時展開 */
        .nav-dropdown:hover > .nav-dropdown-menu,
        .nav-dropdown:has(:focus-visible) > .nav-dropdown-menu,
        .nav-dropdown.is-open > .nav-dropdown-menu {
            display: block !important;
        }
        /* 二級子選單：往左側展開 */
        .nav-sub-item:hover > .nav-sub-menu,
        .nav-sub-item:has(:focus-visible) > .nav-sub-menu,
        .nav-sub-item.is-open > .nav-sub-menu {
            display: block !important;
        }
        .nav-dropdown-menu, .nav-sub-menu { animation: navFadeIn .15s ease-out; }
        @keyframes navFadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }
        /* 增加填補空間防止選單閃退 */
        .nav-dropdown-menu::before {
            content: '';
            position: absolute;
            top: -10px;
            left: 0;
            right: 0;
            height: 10px;
        }
        .nav-sub-menu::after {
            content: '';
            position: absolute;
            top: 0;
            right: -10px;
            bottom: 0;
            width: 10px;
        }
        /* 統一所有導航項目的垂直對齊 */
        .nav-flex-center {
            display: flex;
            align-items: center;
            height: 100%;
        }
        .nav-link-active { color: #2563eb !important; }
        .nav-link-active::after {
            content: ''; position: absolute; left: 0; right: 0; bottom: -1px; height: 2px;
            background: linear-gradient(90deg, #3b82f6, #8b5cf6); border-radius: 2px;
        }
        #site-nav.is-scrolled { box-shadow: 0 4px 20px -8px rgba(15, 23, 42, .15); }

        /* 閱讀進度條 */
        #scroll-progress {
            position: absolute; left: 0; bottom: -1px; height: 2px; width: 100%;
            background: linear-gradient(90deg, #3b82f6, #8b5cf6);
            transform-origin: 0 50%; transform: scaleX(0);
        }

        /* 手機版選單面板 */
        #mobile-menu {
            max-height: 0; overflow: hidden;
            transition: max-height .35s ease;
        }
        #mobile-menu.is-open { max-height: calc(100vh - 4rem); max-height: calc(100dvh - 4rem); overflow-y: auto; overscroll-behavior: contain; }
        .m-acc-panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .3s ease; }
        .m-acc-panel > div { overflow: hidden; }
        .m-acc.is-open > .m-acc-panel { grid-template-rows: 1fr; }
        .m-acc.is-open > button .m-acc-chevron { transform: rotate(180deg); }
        .m-acc-chevron { transition: transform .25s ease; }
        #nav-backdrop { opacity: 0; pointer-events: none; transition: opacity .3s ease; }
        #nav-backdrop.is-open { opacity: 1; pointer-events: auto; }
        body.nav-locked { overflow: hidden; }

        /* 漢堡按鈕動畫 */
        .burger span { display: block; width: 20px; height: 2px; background: #334155; border-radius: 2px; transition: transform .3s ease, opacity .2s ease; }
        .burger span + span { margin-top: 5px; }
        .burger.is-open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .burger.is-open span:nth-child(2) { opacity: 0; }
        .burger.is-open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* 回到頂部按鈕 */
        #back-to-top {
            opacity: 0; transform: translateY(12px); pointer-events: none;
            transition: opacity .3s ease, transform .3s ease, background-color .2s ease;
        }
        #back-to-top.is-visible { opacity: 1; transform: none; pointer-events: auto; }

        /* 鍵盤操作時清楚的焦點框 */
        a:focus-visible, button:focus-visible { outline: 2px solid #3b82f6; outline-offset: 2px; border-radius: 6px; }

        /* 防止導航欄遮住區塊標題 */
        section, div[id] { scroll-margin-top: 100px; }

        /* 榮譽頁：可展開卡片在觸控裝置上以點擊開合 */
        .expandable-card { cursor: pointer; }
        .expandable-card.is-open { max-height: 2000px !important; background-color: #f8fafc; border-left-color: #8b5cf6; }
        .expandable-card.is-open .expand-content { opacity: 1 !important; transform: none !important; }
        .expand-hint { display: none; }
        @media (hover: none) {
            .expand-hint { display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 700; color: #94a3b8; margin-top: 6px; }
            .expand-hint i { transition: transform .3s ease; }
            .expandable-card.is-open .expand-hint i { transform: rotate(180deg); }
        }

        /* ===== 手機版排版優化 ===== */
        @media (max-width: 767px) {
            main .section-card { padding: 24px; border-radius: 24px; margin-bottom: 24px; }
            main .p-10, main .p-12 { padding: 1.5rem; }
            main .md\\:p-12, main .md\\:p-10 { padding: 1.5rem; }
            main .rounded-\\[2\\.5rem\\], main .rounded-\\[3rem\\] { border-radius: 1.5rem; }
            main h1.text-5xl { font-size: 2.25rem; line-height: 1.15; }
            main .mb-32 { margin-bottom: 4rem; }
            main .mb-28 { margin-bottom: 3.5rem; }
            main .space-y-24 > :not([hidden]) ~ :not([hidden]) { margin-top: 3.5rem; }
            main .gap-12 { gap: 1.75rem; }
            p, li, td, h1, h2, h3, h4 { overflow-wrap: anywhere; }
            table { font-size: 0.875rem; }
            .category-header { top: 64px !important; }
            /* 觸控裝置不需要的懸浮位移效果 */
            .award-item:hover { transform: none; }
            .expandable-card { max-height: var(--collapsed-h, 120px) !important; }
            .expandable-card.is-open { max-height: 2000px !important; }
            .expandable-card:hover:not(.is-open) .expand-content { opacity: 0; }
            .category-header h2 { letter-spacing: .2em !important; }
        }
        @media (prefers-reduced-motion: reduce) {
            html { scroll-behavior: auto; }
            *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
        }
    </style>`;
    document.head.insertAdjacentHTML('beforeend', styleHTML);

    // 手機瀏覽器網址列配色
    if (!document.querySelector('meta[name="theme-color"]')) {
        document.head.insertAdjacentHTML('beforeend', '<meta name="theme-color" content="#ffffff">');
    }

    // 2. 導航欄 HTML
    const desktopProjectMenu = projectCategories.map(cat => `
                        <div class="relative nav-sub-item">
                            <button type="button" class="nav-sub-toggle w-full px-4 py-2 hover:bg-${cat.color}-50 hover:text-${cat.color}-600 text-slate-700 font-semibold flex items-center justify-between transition" aria-haspopup="true">
                                <span class="flex items-center gap-2.5">
                                    <i class="fas ${cat.icon} text-${cat.color}-500 text-sm"></i> ${cat.name}
                                </span>
                                <i class="fas fa-chevron-left text-[10px] text-slate-400"></i>
                            </button>
                            <div class="nav-sub-menu hidden absolute right-full top-0 mr-1.5 bg-white border border-gray-100 shadow-2xl rounded-2xl py-2 ${cat.width} z-[10001] text-sm">
                                ${cat.items.map(([slug, title]) => `<a href="../project/${slug}.html" class="block px-4 py-2 hover:bg-${cat.color}-50 hover:text-${cat.color}-600 transition ${isCurrentProject(slug) ? `text-${cat.color}-600 font-semibold` : 'text-slate-700'}">${title}</a>`).join('')}
                            </div>
                        </div>`).join('');

    const mobileProjectMenu = projectCategories.map(cat => `
                            <p class="flex items-center gap-2 px-3 pt-3 pb-1 text-[11px] font-black uppercase tracking-widest text-slate-400">
                                <i class="fas ${cat.icon} text-${cat.color}-500"></i> ${cat.name}
                            </p>
                            ${cat.items.map(([slug, title]) => `<a href="../project/${slug}.html" class="block px-3 py-2.5 rounded-xl hover:bg-${cat.color}-50 active:bg-${cat.color}-50 ${isCurrentProject(slug) ? `bg-${cat.color}-50 text-${cat.color}-600 font-semibold` : 'text-slate-700'}">${title}</a>`).join('')}`).join('');

    const navHTML = `
    <a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[10002] bg-white px-4 py-2 rounded-lg shadow text-sm">跳至主要內容</a>
    <nav id="site-nav" class="fixed top-0 left-0 right-0 z-[9999] bg-white/80 backdrop-blur-md border-b border-gray-100 transition-shadow">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex justify-between items-center">
            <div class="nav-flex-center">
                <a href="../index.html#top" class="text-lg sm:text-xl font-bold nav-gradient-text">MARCO LEUNG</a>
            </div>

            <!-- 桌面版選單 -->
            <div class="hidden md:flex space-x-8 text-sm font-medium text-gray-600 h-full">

                <div class="nav-flex-center relative">
                    <a href="../index.html#top" class="hover:text-blue-600 transition ${currentPage === 'index' ? 'nav-link-active' : ''}">關於</a>
                </div>

                <div class="relative nav-dropdown nav-flex-center">
                    <button type="button" class="nav-dropdown-toggle hover:text-blue-600 transition flex items-center ${inProjectDir ? 'nav-link-active' : ''}" aria-haspopup="true" aria-expanded="false">
                        專案 <i class="fas fa-chevron-down ml-1 text-[10px]"></i>
                    </button>
                    <div class="nav-dropdown-menu hidden absolute left-0 top-full bg-white border border-gray-100 shadow-2xl rounded-2xl py-2.5 w-60 mt-0 z-[10000] text-sm">
                        ${desktopProjectMenu}
                    </div>
                </div>

                <div class="relative nav-dropdown nav-flex-center">
                    <button type="button" class="nav-dropdown-toggle hover:text-blue-600 transition flex items-center ${currentPage === 'experience' ? 'nav-link-active' : ''}" aria-haspopup="true" aria-expanded="false">
                        經歷 <i class="fas fa-chevron-down ml-1 text-[10px]"></i>
                    </button>
                    <div class="nav-dropdown-menu hidden absolute left-0 top-full bg-white border border-gray-100 shadow-xl rounded-2xl py-2 w-44 mt-0 z-[10000] text-sm">
                        ${experienceLinks.map(([id, label]) => `<a href="../experience.html#${id}" class="block px-4 py-2 hover:bg-blue-50 text-gray-700 transition">${label}</a>`).join('')}
                    </div>
                </div>

                <div class="nav-flex-center relative">
                    <a href="../awards.html" class="hover:text-blue-600 transition ${currentPage === 'awards' ? 'nav-link-active' : ''}">榮譽</a>
                </div>
            </div>

            <!-- 手機版漢堡按鈕 -->
            <button id="nav-burger" type="button" class="burger md:hidden w-11 h-11 -mr-2 flex flex-col items-center justify-center rounded-xl active:bg-slate-100" aria-label="開啟選單" aria-expanded="false" aria-controls="mobile-menu">
                <span></span><span></span><span></span>
            </button>
        </div>

        <!-- 手機版選單面板 -->
        <div id="mobile-menu" class="md:hidden bg-white border-t border-gray-100">
            <div class="px-4 py-3 text-[15px] font-medium text-slate-700">
                <a href="../index.html#top" class="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-slate-50 ${currentPage === 'index' ? 'text-blue-600 bg-blue-50' : ''}">
                    <i class="fas fa-user w-5 text-center text-blue-500"></i> 關於
                </a>

                <div class="m-acc ${inProjectDir ? 'is-open' : ''}">
                    <button type="button" class="w-full flex items-center justify-between px-3 py-3 rounded-xl hover:bg-slate-50 ${inProjectDir ? 'text-blue-600' : ''}" aria-expanded="${inProjectDir}">
                        <span class="flex items-center gap-3"><i class="fas fa-code w-5 text-center text-purple-500"></i> 專案</span>
                        <i class="fas fa-chevron-down text-xs text-slate-400 m-acc-chevron"></i>
                    </button>
                    <div class="m-acc-panel"><div><div class="pl-4 pb-2 text-sm">${mobileProjectMenu}</div></div></div>
                </div>

                <div class="m-acc ${currentPage === 'experience' ? 'is-open' : ''}">
                    <button type="button" class="w-full flex items-center justify-between px-3 py-3 rounded-xl hover:bg-slate-50 ${currentPage === 'experience' ? 'text-blue-600' : ''}" aria-expanded="${currentPage === 'experience'}">
                        <span class="flex items-center gap-3"><i class="fas fa-briefcase w-5 text-center text-orange-500"></i> 經歷</span>
                        <i class="fas fa-chevron-down text-xs text-slate-400 m-acc-chevron"></i>
                    </button>
                    <div class="m-acc-panel"><div><div class="pl-4 pb-2 text-sm">
                        ${experienceLinks.map(([id, label]) => `<a href="../experience.html#${id}" class="block px-3 py-2.5 rounded-xl hover:bg-blue-50 active:bg-blue-50">${label}</a>`).join('')}
                    </div></div></div>
                </div>

                <a href="../awards.html" class="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-slate-50 ${currentPage === 'awards' ? 'text-blue-600 bg-blue-50' : ''}">
                    <i class="fas fa-trophy w-5 text-center text-yellow-500"></i> 榮譽
                </a>

                <div class="flex gap-3 px-3 pt-4 pb-2 mt-2 border-t border-gray-100">
                    <a href="mailto:marcoleung.cgu@gmail.com" class="flex-1 text-center bg-blue-600 text-white py-2.5 rounded-full text-sm"><i class="fas fa-envelope mr-1.5"></i>聯絡我</a>
                    <a href="https://github.com/marcoleung052" target="_blank" rel="noopener" class="flex-1 text-center border border-gray-300 py-2.5 rounded-full text-sm"><i class="fab fa-github mr-1.5"></i>GitHub</a>
                </div>
            </div>
        </div>

        <div id="scroll-progress"></div>
    </nav>
    <div id="nav-backdrop" class="md:hidden fixed inset-0 z-[9998] bg-slate-900/30 backdrop-blur-sm"></div>`;

    // 3. 頁尾 HTML
    const footerHTML = `
    <footer class="text-center py-12 text-gray-400 border-t border-gray-100 mt-20">
        <div class="flex justify-center gap-5 mb-4 text-lg">
            <a href="mailto:marcoleung.cgu@gmail.com" class="hover:text-blue-600 transition" aria-label="Email"><i class="fas fa-envelope"></i></a>
            <a href="https://github.com/marcoleung052" target="_blank" rel="noopener" class="hover:text-blue-600 transition" aria-label="GitHub"><i class="fab fa-github"></i></a>
        </div>
        <p class="text-sm">© 2026 Chiu-Ho Leung | 梁釗豪</p>
    </footer>
    <button id="back-to-top" type="button" class="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-[9990] w-11 h-11 rounded-full bg-slate-900/85 hover:bg-blue-600 text-white shadow-lg backdrop-blur flex items-center justify-center" aria-label="回到頂部">
        <i class="fas fa-arrow-up text-sm"></i>
    </button>`;

    document.body.insertAdjacentHTML('afterbegin', navHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);

    const main = document.querySelector('main');
    if (main && !main.id) main.id = 'main-content';

    // 4. 互動行為
    const nav = document.getElementById('site-nav');
    const burger = document.getElementById('nav-burger');
    const mobileMenu = document.getElementById('mobile-menu');
    const backdrop = document.getElementById('nav-backdrop');
    const progress = document.getElementById('scroll-progress');
    const backToTop = document.getElementById('back-to-top');

    // 手機選單開關
    function setMobileMenu(open) {
        mobileMenu.classList.toggle('is-open', open);
        backdrop.classList.toggle('is-open', open);
        burger.classList.toggle('is-open', open);
        burger.setAttribute('aria-expanded', open);
        burger.setAttribute('aria-label', open ? '關閉選單' : '開啟選單');
        document.body.classList.toggle('nav-locked', open);
    }
    burger.addEventListener('click', () => setMobileMenu(!mobileMenu.classList.contains('is-open')));
    backdrop.addEventListener('click', () => setMobileMenu(false));
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMobileMenu(false)));
    mobileMenu.querySelectorAll('.m-acc > button').forEach(btn => {
        btn.addEventListener('click', () => {
            const open = btn.parentElement.classList.toggle('is-open');
            btn.setAttribute('aria-expanded', open);
        });
    });
    window.matchMedia('(min-width: 768px)').addEventListener('change', e => { if (e.matches) setMobileMenu(false); });

    // 桌面下拉選單：支援點擊（平板觸控）與鍵盤
    function closeDropdowns(except) {
        nav.querySelectorAll('.nav-dropdown.is-open, .nav-sub-item.is-open').forEach(el => {
            if (except && el.contains(except)) return;
            el.classList.remove('is-open');
            const t = el.querySelector(':scope > .nav-dropdown-toggle');
            if (t) t.setAttribute('aria-expanded', 'false');
        });
    }
    const canHover = () => window.matchMedia('(hover: hover)').matches;
    nav.querySelectorAll('.nav-dropdown-toggle').forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            if (canHover()) return;
            const dd = btn.parentElement;
            const open = !dd.classList.contains('is-open');
            closeDropdowns();
            dd.classList.toggle('is-open', open);
            btn.setAttribute('aria-expanded', open);
        });
    });
    nav.querySelectorAll('.nav-sub-toggle').forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            if (canHover()) return;
            const item = btn.parentElement;
            const open = !item.classList.contains('is-open');
            item.parentElement.querySelectorAll(':scope > .nav-sub-item.is-open').forEach(el => el.classList.remove('is-open'));
            item.classList.toggle('is-open', open);
        });
    });
    document.addEventListener('click', e => { if (!nav.contains(e.target)) closeDropdowns(); });
    document.addEventListener('keydown', e => {
        if (e.key !== 'Escape') return;
        closeDropdowns();
        if (mobileMenu.classList.contains('is-open')) { setMobileMenu(false); burger.focus(); }
        if (document.activeElement && nav.contains(document.activeElement)) document.activeElement.blur();
    });

    // 捲動：導航陰影、閱讀進度、回到頂部
    let ticking = false;
    function onScroll() {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        nav.classList.toggle('is-scrolled', y > 8);
        progress.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
        backToTop.classList.toggle('is-visible', y > 600);
        ticking = false;
    }
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // 圖片延遲載入（首屏以外）
    document.querySelectorAll('main img:not([loading])').forEach((img, i) => {
        if (i > 1) img.loading = 'lazy';
        img.decoding = 'async';
    });

    // 榮譽頁可展開卡片：觸控裝置點擊開合
    const expandableCards = document.querySelectorAll('.expandable-card');
    expandableCards.forEach(card => {
        const head = card.firstElementChild;
        if (head) head.insertAdjacentHTML('beforeend', '<span class="expand-hint">點擊查看詳情 <i class="fas fa-chevron-down"></i></span>');
        card.addEventListener('click', e => {
            if (e.target.closest('a')) return;
            if (canHover()) return;
            card.classList.toggle('is-open');
        });
    });

    // 依實際標題高度設定收合高度，避免手機上標題換行後被截斷
    function measureCards() {
        expandableCards.forEach(card => {
            const head = card.firstElementChild;
            if (!head) return;
            const cs = getComputedStyle(card);
            const h = head.offsetHeight + parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom) + parseFloat(getComputedStyle(head).marginBottom) / 2;
            card.style.setProperty('--collapsed-h', Math.ceil(h) + 'px');
        });
    }
    if (expandableCards.length) {
        measureCards();
        window.addEventListener('resize', measureCards, { passive: true });
        window.addEventListener('load', measureCards);
    }
});
