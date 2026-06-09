document.addEventListener("DOMContentLoaded", () => {
    const introScreen = document.getElementById("intro-screen");
    const introVideo = document.getElementById("intro-video");
    const tapTrigger = document.getElementById("tap-to-open-trigger");
    const mainContent = document.getElementById("main-content");

    // State 1: User interaction unlocks video playback
    tapTrigger.addEventListener("click", () => {
        tapTrigger.style.display = "none"; // Prevent double taps
        
        introVideo.play().catch(error => {
            console.error("Video playback failed or blocked by browser:", error);
            revealMainContent(); // Fallback if iOS blocks the video
        });
    });

    // State 2: Video finishes, transition to invitation
    introVideo.addEventListener("ended", () => {
        revealMainContent();
    });

    function revealMainContent() {
        // Fade out intro
        introScreen.classList.add("fade-out");
        
        // Unhide main content from DOM to allow layout calculation
        mainContent.classList.remove("hidden");
        
        // Force browser reflow so the opacity transition actually triggers
        void mainContent.offsetWidth; 
        
        // Fade in main content
        mainContent.classList.remove("opacity-0");
        mainContent.classList.add("fade-in");
        
        // Garbage collection: remove intro node completely
        setTimeout(() => {
            introScreen.remove();
        }, 800); 
    }
});