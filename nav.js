document.addEventListener("DOMContentLoaded", function() {
    const navHTML = `
    <nav class="fixed top-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div class="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
            <a href="index.html#top" class="text-xl font-bold gradient-text">MARCO LEUNG</a>
            <div class="flex space-x-8 text-sm font-medium text-gray-700">
                <div class="nav-item"><a href="index.html#top" class="hover:text-blue-600 transition">關於</a></div>
                <div class="relative dropdown nav-item cursor-pointer group">
                    <span class="hover:text-blue-600 transition flex items-center">專案 <i class="fas fa-chevron-down ml-1 text-[10px]"></i></span>
                    <div class="dropdown-menu hidden group-hover:block absolute left-0 top-full bg-white border border-gray-100 shadow-xl rounded-lg py-2 w-48">
                        <a href="project-nursing.html" class="block px-4 py-2 hover:bg-blue-50 text-gray-700">護理紀錄補全系統</a>
                        <a href="project-chatbot.html" class="block px-4 py-2 hover:bg-blue-50 text-gray-700">多模態 AI 機器人</a>
                        <a href="project-weather.html" class="block px-4 py-2 hover:bg-blue-50 text-gray-700">澳洲天氣預測</a>
                        <a href="project-retrieval.html" class="block px-4 py-2 hover:bg-blue-50 text-gray-700">服飾以圖搜圖</a>
                        <a href="project-ticketing.html" class="block px-4 py-2 hover:bg-blue-50 text-gray-700">威秀訂票系統</a>
                    </div>
                </div>
                <div class="relative dropdown nav-item cursor-pointer group">
                    <span class="hover:text-blue-600 transition flex items-center font-bold text-blue-600">經歷 <i class="fas fa-chevron-down ml-1 text-[10px]"></i></span>
                    <div class="dropdown-menu hidden group-hover:block absolute left-0 top-full bg-white border border-gray-100 shadow-xl rounded-lg py-2 w-40">
                        <a href="experience.html#cadre" class="block px-4 py-2 hover:bg-blue-50 text-gray-700">班級幹部</a>
                        <a href="experience.html#clubs" class="block px-4 py-2 hover:bg-blue-50 text-gray-700">社團與活動</a>
                        <a href="experience.html#work" class="block px-4 py-2 hover:bg-blue-50 text-gray-700">工作經驗</a>
                    </div>
                </div>
                <div class="relative nav-item"><a href="awards.html" class="hover:text-blue-600 transition">榮譽</a></div>
            </div>
        </div>
    </nav>`;

    const footerHTML = `
    <footer class="text-center py-12 text-gray-400 border-t border-gray-200">
        <p class="text-sm">© 2026 Chiu-Ho Leung | 梁釗豪</p>
    </footer>`;
    
    document.body.insertAdjacentHTML('afterbegin', navHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);
});
