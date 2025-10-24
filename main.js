// --- Script para Navegación SPA (Single Page Application) ---
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page-content');
const mobileMenu = document.getElementById('mobile-menu');
let activeCharts = [];

const switchPage = (pageId, sectionId) => {
    // Destroy existing charts before switching page
    activeCharts.forEach(chart => chart.destroy());
    activeCharts = [];

    pages.forEach(page => {
        if (page.id === `page-${pageId}`) {
            page.classList.remove('hidden');
        } else {
            page.classList.add('hidden');
        }
    });

    if (sectionId) {
        setTimeout(() => { 
            const sectionElement = document.querySelector(`#page-${pageId} #${sectionId}`);
            if (sectionElement) {
                sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                 window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }, 100);
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    if (pageId === 'menopausia-guia') {
        initializeMenopausiaGuiaCharts();
    }

    mobileMenu.classList.add('hidden');
};

navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const pageId = link.getAttribute('data-page');
        const sectionId = link.getAttribute('data-section');
        switchPage(pageId, sectionId);
    });
});

// Script para el menú móvil
const menuBtn = document.getElementById('menu-btn');
menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

const menopausiaToggleMobile = document.getElementById('menopausia-toggle-mobile');
const menopausiaSubmenuMobile = document.getElementById('menopausia-submenu-mobile');

menopausiaToggleMobile.addEventListener('click', (e) => {
    e.stopPropagation();
    menopausiaSubmenuMobile.classList.toggle('hidden');
    menopausiaToggleMobile.querySelector('svg').classList.toggle('rotate-180');
});

// --- Scripts para Página "Sobre Mí" ---
const accompanimentItems = document.querySelectorAll('.accompaniment-item');
const displayBox = document.getElementById('accompaniment-display');
if(accompanimentItems.length > 0 && displayBox){
    accompanimentItems.forEach(item => {
        item.addEventListener('click', () => {
            const text = item.getAttribute('data-text');
            displayBox.innerHTML = `<p class="accent-color-text font-semibold">${text}</p>`;
            accompanimentItems.forEach(i => i.classList.remove('bg-sky-200', 'border-sky-400'));
            item.classList.add('bg-sky-200', 'border-sky-400');
        });
    });
}

// --- Scripts para Acordeones (Menopausia y Duelo) ---
document.querySelectorAll('#page-menopausia .accordion-header, #page-duelo .accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const wasActive = header.classList.contains('active');

        // Close all accordions in the same container
        header.closest('.accordion-container').querySelectorAll('.accordion-header').forEach(h => h.classList.remove('active'));
        header.closest('.accordion-container').querySelectorAll('.accordion-content').forEach(c => c.style.maxHeight = null);

        // Open the clicked one if it wasn't active
        if (!wasActive) {
            header.classList.add('active');
            if (content) {
               content.style.maxHeight = content.scrollHeight + "px";
            }
        }
    });
});

// --- Scripts para la Página de Estrategias ---
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modal.querySelector('.modal-content').classList.remove('scale-95');
        }, 10);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) {
        modal.classList.add('opacity-0');
        modal.querySelector('.modal-content').classList.add('scale-95');
        setTimeout(() => {
             modal.classList.add('hidden');
             document.body.style.overflow = 'auto';
        }, 300);
    }
    if (modalId === 'respiracionModal') {
        stopBreathing();
    }
}

const breathingButton = document.getElementById('breathingButton');
const breathingCircle = document.getElementById('breathingCircle');
const breathingText = document.getElementById('breathingText');
let breathingInterval;
let isBreathing = false;
const breathingCycle = [
    { text: 'Inhala (4s)', duration: 4000, scale: 1.5, color: '#cffafe' }, // light cyan 1
    { text: 'Mantén (4s)', duration: 4000, scale: 1.5, color: '#a5f3fc' }, // light cyan 2
    { text: 'Exhala (8s)', duration: 8000, scale: 1, color: '#67e8f9' }, // light cyan 3
];

function startBreathing() {
    if (!breathingButton || !breathingCircle || !breathingText) return;
    isBreathing = true;
    breathingButton.textContent = 'Detener';
    let currentStep = 0;

    function doStep() {
        const step = breathingCycle[currentStep];
        breathingText.textContent = step.text;
        breathingCircle.style.transform = `scale(${step.scale})`;
        breathingCircle.style.backgroundColor = step.color;
        
        currentStep = (currentStep + 1) % breathingCycle.length;
        breathingInterval = setTimeout(doStep, step.duration);
    }
    doStep();
}

function stopBreathing() {
    if (!breathingButton || !breathingCircle || !breathingText) return;
    isBreathing = false;
    clearTimeout(breathingInterval);
    breathingButton.textContent = 'Iniciar';
    breathingText.textContent = 'Presiona Iniciar';
    breathingCircle.style.transform = 'scale(1)';
    breathingCircle.style.backgroundColor = '#cffafe'; // Reset to default cyan
}

if (breathingButton) {
    breathingButton.addEventListener('click', () => {
        if (isBreathing) {
            stopBreathing();
        } else {
            startBreathing();
        }
    });
}

document.querySelectorAll('#page-estrategias .accordion-button').forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        const icon = button.querySelector('svg');
        const isActive = content.style.maxHeight;
        
        // This is a simple toggle, not a group-closing accordion
        if (isActive) {
            content.style.maxHeight = null;
            if(icon) icon.classList.remove('rotate-180');
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            if(icon) icon.classList.add('rotate-180');
        }
    });
});

// --- Scripts para Gráficos de Guía Menopausia ---
function initializeMenopausiaGuiaCharts() {
    const primaryColor = '#0891B2';
    const secondaryColor = '#FF6700';
    const tertiaryColor = '#6c757d';
    const lightGray = '#EAEAEA';
    const fontFamily = "'Montserrat', sans-serif";

    Chart.defaults.font.family = fontFamily;
    Chart.defaults.font.size = 14;
    Chart.defaults.color = tertiaryColor;
    
    const tooltipCallback = {
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 20,
                    usePointStyle: true,
                    pointStyle: 'rectRounded'
                }
            },
            tooltip: {
                callbacks: {
                    title: function(tooltipItems) {
                        const item = tooltipItems[0];
                        let label = item.chart.data.labels[item.dataIndex];
                        if (Array.isArray(label)) {
                            return label.join(' ');
                        } else {
                            return label;
                        }
                    }
                }
            }
        }
    };

    const nutricionCtx = document.getElementById('nutricionChart')?.getContext('2d');
    if (nutricionCtx) {
        activeCharts.push(new Chart(nutricionCtx, {
            type: 'doughnut',
            data: {
                labels: ['Calcio', 'Fitoestrógenos', 'Moderación'],
                datasets: [{
                    label: 'Nutrición Aliada',
                    data: [33.3, 33.3, 33.3],
                    backgroundColor: [primaryColor, secondaryColor, lightGray],
                    borderColor: '#ffffff',
                    borderWidth: 4,
                    hoverOffset: 8
                }]
            },
            options: { ...tooltipCallback, responsive: true, maintainAspectRatio: false, cutout: '60%' }
        }));
    }

    const movimientoCtx = document.getElementById('movimientoChart')?.getContext('2d');
    if (movimientoCtx) {
        activeCharts.push(new Chart(movimientoCtx, {
            type: 'radar',
            data: {
                labels: ['Fuerza', 'Cardio', 'Flexibilidad'],
                datasets: [{
                    label: 'Equilibrio Ideal',
                    data: [90, 85, 80],
                    fill: true,
                    backgroundColor: 'rgba(8, 145, 178, 0.2)',
                    borderColor: primaryColor,
                    pointBackgroundColor: primaryColor,
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: primaryColor
                }]
            },
            options: {
                ...tooltipCallback,
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: { color: 'rgba(0,0,0,0.1)' },
                        grid: { color: 'rgba(0,0,0,0.1)' },
                        pointLabels: { font: { size: 14, weight: 'bold' } },
                        suggestedMin: 0,
                        suggestedMax: 100,
                        ticks: { display: false }
                    }
                }
            }
        }));
    }
    
    const descansoCtx = document.getElementById('descansoChart')?.getContext('2d');
    if(descansoCtx) {
        activeCharts.push(new Chart(descansoCtx, {
            type: 'polarArea',
            data: {
                labels: ['Ritual Nocturno', 'Santuario del Sueño', 'Limitar Estimulantes'],
                datasets: [{
                    label: 'Calidad del Sueño',
                    data: [1, 1, 1],
                    backgroundColor: [
                        'rgba(8, 145, 178, 0.7)',
                        'rgba(255, 103, 0, 0.7)',
                        'rgba(108, 117, 125, 0.7)'
                    ],
                    borderColor: '#ffffff',
                    borderWidth: 2
                }]
            },
            options: {
                ...tooltipCallback,
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        grid: { circular: true, color: 'rgba(0,0,0,0.1)' },
                        ticks: { display: false }
                    }
                }
            }
        }));
    }
    
    const emocionalCtx = document.getElementById('emocionalChart')?.getContext('2d');
    if(emocionalCtx){
        activeCharts.push(new Chart(emocionalCtx, {
            type: 'bar',
            data: {
                labels: ['Respirar', 'Escribir', 'Naturaleza'],
                datasets: [{
                    label: 'Impacto en Bienestar',
                    data: [100, 100, 100],
                    backgroundColor: [primaryColor, secondaryColor, tertiaryColor],
                    borderRadius: 8,
                    barThickness: 30
                }]
            },
            options: {
                ...tooltipCallback,
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { display: false, beginAtZero: true, max: 110 },
                    y: { grid: { display: false, drawBorder: false } }
                },
                plugins: {
                   ...tooltipCallback.plugins,
                   legend: { display: false }
                }
            }
        }));
    }
}

// --- Scroll to Top Button ---
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollTopBtn.classList.remove('hidden');
    } else {
        scrollTopBtn.classList.add('hidden');
    }
};

scrollTopBtn.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
