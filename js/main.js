document.addEventListener("DOMContentLoaded", () => {
    const selectors = {
        introScreen: "intro-screen",
        introVideo: "intro-video",
        tapTrigger: "tap-to-open-trigger",
        mainContent: "main-content",
    };

    const introScreen = document.getElementById(selectors.introScreen);
    const introVideo = document.getElementById(selectors.introVideo);
    const tapTrigger = document.getElementById(selectors.tapTrigger);
    const mainContent = document.getElementById(selectors.mainContent);

    if (!introScreen || !introVideo || !tapTrigger || !mainContent) {
        return;
    }

    let hasRevealedInvitation = false;

    // State 1: User interaction unlocks video playback
    tapTrigger.addEventListener("click", () => {
        tapTrigger.hidden = true;
        
        introVideo.play().catch(error => {
            console.error("Video playback failed or blocked by browser:", error);
            revealMainContent();
        });
    }, { once: true });

    // State 2: Video finishes, transition to invitation
    introVideo.addEventListener("ended", () => {
        revealMainContent();
    }, { once: true });

    function revealMainContent() {
        if (hasRevealedInvitation) {
            return;
        }

        hasRevealedInvitation = true;

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
