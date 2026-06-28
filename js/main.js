document.addEventListener("DOMContentLoaded", () => {
    const selectors = {
        introScreen: "intro-screen",
        introVideo: "intro-video",
        tapTrigger: "tap-to-open-trigger",
        mainContent: "main-content",
        bgAudio: "bg-audio",
        audioControl: "audio-control",
        iconUnmuted: "icon-unmuted",
        iconMuted: "icon-muted"
    };

    const introScreen = document.getElementById(selectors.introScreen);
    const introVideo = document.getElementById(selectors.introVideo);
    const tapTrigger = document.getElementById(selectors.tapTrigger);
    const mainContent = document.getElementById(selectors.mainContent);
    const bgAudio = document.getElementById(selectors.bgAudio);
    const audioControl = document.getElementById(selectors.audioControl);
    const iconUnmuted = document.getElementById(selectors.iconUnmuted);
    const iconMuted = document.getElementById(selectors.iconMuted);

    if (!introScreen || !introVideo || !tapTrigger || !mainContent) {
        return;
    }

    let hasRevealedInvitation = false;

    // AUDIO CONTROL LOGIC
    if (audioControl && bgAudio) {
        audioControl.addEventListener("click", () => {
            if (bgAudio.muted) {
                bgAudio.muted = false;
                iconUnmuted.classList.remove("hidden");
                iconMuted.classList.add("hidden");
            } else {
                bgAudio.muted = true;
                iconUnmuted.classList.add("hidden");
                iconMuted.classList.remove("hidden");
            }
        });
    }

    // State 1: User interaction unlocks video playback
    tapTrigger.addEventListener("click", () => {
        tapTrigger.hidden = true;
        
        // Load audio in the background while video plays
        if (bgAudio) bgAudio.load();

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

        // Start Audio Playback
        if (bgAudio) {
            bgAudio.volume = 0.5; // Optional: Start at 50% volume so it isn't jarring
            bgAudio.play().catch(e => console.log("Audio autoplay blocked:", e));
        }

        // Fade out intro
        introScreen.classList.add("fade-out");
        
        // Unhide main content from DOM to allow layout calculation
        mainContent.classList.remove("hidden");
        
        // Force browser reflow so the opacity transition actually triggers
        void mainContent.offsetWidth;
        
        // Fade in main content
        mainContent.classList.remove("opacity-0");
        mainContent.classList.add("fade-in");

        // Reveal the floating audio button
        if (audioControl) {
            audioControl.classList.remove("hidden");
            // Small delay before fading it in for a smoother transition
            setTimeout(() => {
                audioControl.classList.remove("opacity-0", "pointer-events-none");
            }, 500);
        }
        
        // Garbage collection: remove intro node completely
        setTimeout(() => {
            introScreen.remove();
        }, 800);
    }
});