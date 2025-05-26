cc.Class({
    extends: cc.Component,

    properties: {
        progressBar: {
            default: null,
            type: cc.ProgressBar,
            tooltip: "Progress bar component"
        },
        progressValue: {
            default: 0,
            range: [0, 1],
            tooltip: "Current progress value (0-1)"
        }
    },

    onLoad() {
        if (this.progressBar) {
            this.progressBar.progress = this.progressValue;
        }
    },

    onChange(value) {
        this.progressValue = Math.max(0, Math.min(1, value));
        this.updateProgress();
    },

    updateProgress() {
        if (this.progressBar) {
            this.progressBar.progress = this.progressValue;
        }
    },

    testUpdate() {
        // Reset progress to 0
        this.progressValue = 0;
        this.updateProgress();

        // Create a sequence of actions
        let duration = 1.0; // 1 second
        let updateInterval = 0.05; // Update every 0.05 seconds
        let steps = duration / updateInterval;
        let stepValue = 1.0 / steps;

        // Schedule updates
        let currentStep = 0;
        this.schedule(() => {
            if (currentStep < steps) {
                this.progressValue += stepValue;
                this.updateProgress();
                currentStep++;
            }
        }, updateInterval, steps);
    }
});
