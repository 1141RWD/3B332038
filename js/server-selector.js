document.addEventListener('DOMContentLoaded', function () {
    // Logic Matrix based on read.md
    const logicMap = {
        'proxy': {
            name: 'Proxy 伺服器',
            plans: {
                'default': { ram: '2 GiB', series: 'light', seriesName: '臺灣輕量主機' }
            }
        },
        'small_survival': {
            name: '小型生存服 / 簡易插件服',
            plans: {
                '1-5': { ram: '4 GiB', series: 'value', seriesName: '臺灣超值主機' },
                '6-10': { ram: '6 GiB', series: 'value', seriesName: '臺灣超值主機' },
                '11-15': { ram: '8 GiB', series: 'value', seriesName: '臺灣超值主機' },
                '16-20': { ram: '10 GiB', series: 'value', seriesName: '臺灣超值主機' },
                '21+': { ram: '12 GiB', series: 'value', seriesName: '臺灣超值主機' }
            }
        },
        'large_survival': {
            name: '大型生存服 / 小型模組包',
            plans: {
                '1-5': { ram: '6 GiB', series: 'performance', seriesName: '臺灣性能主機' },
                '6-10': { ram: '9 GiB', series: 'performance', seriesName: '臺灣性能主機' },
                '11-15': { ram: '12 GiB', series: 'performance', seriesName: '臺灣性能主機' },
                '16-20': { ram: '15 GiB', series: 'performance', seriesName: '臺灣性能主機' },
                '21+': { ram: '18 GiB', series: 'performance', seriesName: '臺灣性能主機' }
            }
        },
        'large_mods': {
            name: '大型模組包 / 大陸整合包',
            plans: {
                '1-5': { ram: '8 GiB', series: 'high', seriesName: '臺灣高效主機' },
                '6-10': { ram: '12 GiB', series: 'high', seriesName: '臺灣高效主機' },
                '11-15': { ram: '16 GiB', series: 'high', seriesName: '臺灣高效主機' },
                '16-20': { ram: '20 GiB', series: 'high', seriesName: '臺灣高效主機' },
                '21+': { ram: '24 GiB', series: 'high', seriesName: '臺灣高效主機' }
            }
        },
        'extreme': {
            name: '效能不足夠 / 需求較龐大',
            plans: {
                'default': { ram: '25+ GiB', series: 'extreme', seriesName: '臺灣極致主機' }
            }
        }
    };

    const seriesLinks = {
        'light': '#tw-light',
        'value': '#tw-value',
        'performance': '#tw-performance',
        'high': '#tw-high',
        'extreme': '#tw-extreme'
    };

    // Elements
    const typeSelect = document.getElementById('sel-type');
    const playersSelect = document.getElementById('sel-players');
    const outRam = document.getElementById('out-ram');
    const outPlan = document.getElementById('out-plan');
    const outLink = document.getElementById('out-link');

    function updateRecommendation() {
        const type = typeSelect.value;
        const players = playersSelect.value;

        // Reset or Disable Players dropdown if not needed
        if (type === 'proxy' || type === 'extreme') {
            playersSelect.disabled = true;
            playersSelect.parentElement.style.opacity = '0.5';
        } else {
            playersSelect.disabled = false;
            playersSelect.parentElement.style.opacity = '1';
        }

        // Lookup
        const typeData = logicMap[type];
        let result = null;

        if (typeData) {
            if (typeData.plans['default']) {
                result = typeData.plans['default'];
            } else {
                result = typeData.plans[players];
            }
        }

        // Update UI
        if (result) {
            outRam.textContent = result.ram;
            outPlan.textContent = result.seriesName;
            
            // Update Link and Style
            if (outLink) {
                outLink.href = seriesLinks[result.series];
                // Keep the default class defined in HTML (btn-main btn-lg)
                // We do NOT add color specific classes here to match the index style request
            }
            // Update Text Color
            outPlan.className = `fw-bold text-${getColorName(result.series)}`;
        }
    }

    function getColorName(series) {
        switch(series) {
            case 'light': return 'green';
            case 'value': return 'cyan';
            case 'performance': return 'blue';
            case 'high': return 'indigo';
            case 'extreme': return 'purple';
            default: return 'custom';
        }
    }

    // Colors helper for bootstrap classes (assuming we add text-green etc or use existing style)
    // Actually we can just use the btn classes or inline style for simplicity if classes don't exist
    // But let's try to map to the classes we created for buttons: btn-nav-green etc.
    
    if(typeSelect && playersSelect) {
        // Force Defaults on Load
        typeSelect.value = 'small_survival';
        playersSelect.value = '6-10';

        typeSelect.addEventListener('change', updateRecommendation);
        playersSelect.addEventListener('change', updateRecommendation);
        updateRecommendation(); // Initial call
        
        // Trigger style update for players select enablement
        if (typeSelect.value === 'proxy' || typeSelect.value === 'extreme') {
             playersSelect.disabled = true;
             playersSelect.parentElement.style.opacity = '0.5';
        }
    }
});
