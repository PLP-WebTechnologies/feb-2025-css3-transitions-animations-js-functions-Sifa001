document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const animateBtn = document.getElementById('animate-btn');
    const animatedElement = document.getElementById('animated-element');
    const animationStyleSelect = document.getElementById('animation-style');
    const themeSelect = document.getElementById('theme');
    const savePrefsBtn = document.getElementById('save-prefs');
    const body = document.body;
    
    // Load saved preferences
    loadPreferences();
    
    // Animation button click handler
    animateBtn.addEventListener('click', function() {
        // Remove any existing animation classes
        animatedElement.classList.remove('bounce', 'rotate', 'fade');
        
        // Get the selected animation style (default to bounce if none selected)
        const animationStyle = animationStyleSelect.value || 'bounce';
        
        // Apply the selected animation
        animatedElement.classList.add(animationStyle);
    });
    
    // Theme change handler (immediate preview)
    themeSelect.addEventListener('change', function() {
        applyTheme(themeSelect.value);
    });
    
    // Save preferences handler
    savePrefsBtn.addEventListener('click', function() {
        const preferences = {
            animationStyle: animationStyleSelect.value,
            theme: themeSelect.value
        };
        
        // Save to localStorage
        localStorage.setItem('userPreferences', JSON.stringify(preferences));
        
        // Visual feedback
        savePrefsBtn.classList.add('save-confirmation');
        savePrefsBtn.textContent = 'Preferences Saved!';
        
        // Reset button after animation
        setTimeout(() => {
            savePrefsBtn.classList.remove('save-confirmation');
            savePrefsBtn.textContent = 'Save Preferences';
        }, 1000);
    });
    
    // Function to load preferences from localStorage
    function loadPreferences() {
        const savedPrefs = localStorage.getItem('userPreferences');
        
        if (savedPrefs) {
            const preferences = JSON.parse(savedPrefs);
            
            // Set the select values
            animationStyleSelect.value = preferences.animationStyle || 'bounce';
            themeSelect.value = preferences.theme || 'light';
            
            // Apply the theme
            applyTheme(preferences.theme);
        }
    }
    
    // Function to apply theme
    function applyTheme(theme) {
        // Remove all theme classes
        body.classList.remove('light', 'dark', 'blue');
        
        // Add the selected theme class
        body.classList.add(theme || 'light');
    }
});