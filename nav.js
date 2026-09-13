document.addEventListener("DOMContentLoaded", function() {
    // 1. 統一注入 CSS
    const styleHTML = `
    <style>
        .nav-gradient-text { 
            background: linear-gradient(90deg, #3b82f6, #8b5cf6); 
            -webkit-background-clip: text; 
            -webkit-text-fill-color: transparent; 
        }
        /* 確保選單在最上層 */
        .nav-dropdown:hover .nav-dropdown-menu { 
            display: block !important; 
            opacity: 1;
            visibility: visible;
        }
        /* 增加填補空間防止選單閃退 */
        .nav-dropdown-menu::before {
            content: '';
            position: absolute;
            top: -10px;
            left: 0;
            right: 0;
            height: 10px;
        }
        /* 統一所有導航項目的垂直對齊 */
        .nav-flex-center {
            display: flex;
            align-items: center;
            height: 100%;
        }
        /* 防止導航欄遮住區塊標題 */
        section, div[id] { scroll-margin-top: 100px; }
    </style>`;
    document.head.insertAdjacentHTML('beforeend', styleHTML);

    // 2. 導航欄 HTML
    const navHTML = `
    <nav class="fixed top-0 left-0 right-0 z-[9999] bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div class="max-w-5xl mx-auto px-6 h-16 flex justify-between items-center">
            <div class="nav-flex-center">
                <a href="../index.html#top" class="text-xl font-bold nav-gradient-text">MARCO LEUNG</a>
            </div>

            <div class="flex space-x-8 text-sm font-medium text-gray-600 h-full">
                
                <div class="nav-flex-center">
                    <a href="../index.html#top" class="hover:text-blue-600 transition">關於</a>
                </div>
                
                <div class="relative nav-dropdown nav-flex-center cursor-pointer group">
                    <span class="hover:text-blue-600 transition flex items-center">
                        專案 <i class="fas fa-chevron-down ml-1 text-[10px]"></i>
                    </span>
                    <div class="nav-dropdown-menu hidden absolute left-0 top-full bg-white border border-gray-100 shadow-2xl rounded-2xl py-3 w-64 mt-0 z-[10000] text-xs">
                        
                        <!-- 類別 1：多模態與智慧互動 -->
                        <div class="px-4 pt-1 pb-1 font-bold text-[10px] text-rose-600 uppercase tracking-wider">多模態與智慧互動</div>
                        <a href="../project/doc_conflict.html" class="block px-4 py-1.5 hover:bg-blue-50 text-slate-700 hover:text-blue-600 transition">通用多模態文件衝突檢測</a>
                        <a href="../project/search_engine.html" class="block px-4 py-1.5 hover:bg-blue-50 text-slate-700 hover:text-blue-600 transition">技術手冊語意搜尋引擎</a>
                        <a href="../project/neural_system.html" class="block px-4 py-1.5 hover:bg-blue-50 text-slate-700 hover:text-blue-600 transition">神經訊號標籤與閉迴路操控</a>
                        <a href="../project/chatbot.html" class="block px-4 py-1.5 hover:bg-blue-50 text-slate-700 hover:text-blue-600 transition">多模態 AI 機器人</a>

                        <div class="my-2 border-t border-slate-100"></div>

                        <!-- 類別 2：自然語言處理 (NLP) -->
                        <div class="px-4 pt-1 pb-1 font-bold text-[10px] text-blue-600 uppercase tracking-wider">自然語言處理 (NLP)</div>
                        <a href="../project/nursing.html" class="block px-4 py-1.5 hover:bg-blue-50 text-slate-700 hover:text-blue-600 transition">護理紀錄補全系統</a>
                        <a href="../project/ticketing.html" class="block px-4 py-1.5 hover:bg-blue-50 text-slate-700 hover:text-blue-600 transition">威秀訂票系統</a>

                        <div class="my-2 border-t border-slate-100"></div>

                        <!-- 類別 3：數據工程與自動化管線 -->
                        <div class="px-4 pt-1 pb-1 font-bold text-[10px] text-emerald-600 uppercase tracking-wider">數據工程與自動化管線</div>
                        <a href="../project/doc_organization.html" class="block px-4 py-1.5 hover:bg-blue-50 text-slate-700 hover:text-blue-600 transition">企業雲端知識庫整理管線</a>
                        <a href="../project/weather.html" class="block px-4 py-1.5 hover:bg-blue-50 text-slate-700 hover:text-blue-600 transition">澳洲降雨預測系統</a>

                        <div class="my-2 border-t border-slate-100"></div>

                        <!-- 類別 4：電腦視覺 (CV) -->
                        <div class="px-4 pt-1 pb-1 font-bold text-[10px] text-orange-600 uppercase tracking-wider">電腦視覺 (CV)</div>
                        <a href="../project/retrieval.html" class="block px-4 py-1.5 hover:bg-blue-50 text-slate-700 hover:text-blue-600 transition">服飾以圖搜圖</a>

                        <div class="my-2 border-t border-slate-100"></div>

                        <!-- 類別 5：系統與分散式運算 -->
                        <div class="px-4 pt-1 pb-1 font-bold text-[10px] text-slate-500 uppercase tracking-wider">系統與分散式運算</div>
                        <a href="../project/mpi.html" class="block px-4 py-1.5 hover:bg-blue-50 text-slate-700 hover:text-blue-600 transition">平行化巨量向量檢索</a>
                        <a href="../project/ledger.html" class="block px-4 py-1.5 hover:bg-blue-50 text-slate-700 hover:text-blue-600 transition">分散式共享帳本</a>
                    </div>
                </div>

                <div class="relative nav-dropdown nav-flex-center cursor-pointer group">
                    <span class="hover:text-blue-600 transition flex items-center">
                        經歷 <i class="fas fa-chevron-down ml-1 text-[10px]"></i>
                    </span>
                    <div class="nav-dropdown-menu hidden absolute left-0 top-full bg-white border border-gray-100 shadow-xl rounded-xl py-2 w-44 mt-0 z-[10000]">
                        <a href="../experience.html#cadre" class="block px-4 py-2 hover:bg-blue-50 text-gray-700 transition">班級幹部</a>
                        <a href="../experience.html#fire-club" class="block px-4 py-2 hover:bg-blue-50 text-gray-700 transition">社團活動</a>
                        <a href="../experience.html#work" class="block px-4 py-2 hover:bg-blue-50 text-gray-700 transition">工作經驗</a>
                    </div>
                </div>

                <div class="nav-flex-center">
                    <a href="../awards.html" class="hover:text-blue-600 transition">榮譽</a>
                </div>
            </div>
        </div>
    </nav>`;

    // 3. 頁尾 HTML
    const footerHTML = `
    <footer class="text-center py-12 text-gray-400 border-t border-gray-100 mt-20">
        <p class="text-sm">© 2026 Chiu-Ho Leung | 梁釗豪</p>
    </footer>`;
    
    document.body.insertAdjacentHTML('afterbegin', navHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);
});
