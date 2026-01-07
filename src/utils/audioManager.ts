class AudioManager {
    private context: AudioContext | null = null;
    private isMuted: boolean = false;

    constructor() {
        try {
            // Initialize AudioContext only on user interaction usually, 
            // but we prepare the instance.
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            this.context = new AudioContextClass();
        } catch (e) {
            console.error("Web Audio API not supported", e);
        }
    }

    public setMuted(muted: boolean) {
        this.isMuted = muted;
    }

    public isAudioMuted() {
        return this.isMuted;
    }

    private getContext(): AudioContext | null {
        if (!this.context) return null;
        if (this.context.state === 'suspended') {
            this.context.resume();
        }
        return this.context;
    }

    // Play a tone
    private playTone(freq: number, type: OscillatorType, duration: number, startTime: number = 0) {
        const ctx = this.getContext();
        if (!ctx || this.isMuted) return;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);

        gain.gain.setValueAtTime(0.1, ctx.currentTime + startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + startTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + startTime);
        osc.stop(ctx.currentTime + startTime + duration);
    }

    public playCorrect() {
        // Ding! (High High)
        this.playTone(600, 'sine', 0.1, 0);
        this.playTone(1200, 'sine', 0.3, 0.1);
    }

    public playWrong() {
        // Buzz (Low Low)
        this.playTone(150, 'sawtooth', 0.2, 0);
        this.playTone(100, 'sawtooth', 0.4, 0.2);
    }

    public playClick() {
        // Light Tick
        this.playTone(800, 'triangle', 0.05, 0);
    }

    public playWin() {
        // Victory Fanfare
        const now = 0;
        this.playTone(523.25, 'square', 0.1, now); // C5
        this.playTone(659.25, 'square', 0.1, now + 0.1); // E5
        this.playTone(783.99, 'square', 0.1, now + 0.2); // G5
        this.playTone(1046.50, 'square', 0.4, now + 0.3); // C6
    }
    
    public playCompletion() {
        // Softer completion sound
        this.playTone(400, 'sine', 0.1, 0);
        this.playTone(600, 'sine', 0.2, 0.1);
        this.playTone(800, 'sine', 0.4, 0.2);
    }
}

export const audioManager = new AudioManager();
