window.initLearnResizableLayout = function () {
    const layoutStorageKey = 'learn-layout-split-v1';
    const layout = document.getElementById('layout');
    const lessons = document.getElementById('lessons-col');
    const instructions = document.getElementById('instructions-col');
    const editor = document.getElementById('editor-col');
    const handle1 = document.getElementById('lessons-resize-handle');
    const handle2 = document.getElementById('instructions-resize-handle');

    if (!layout || !lessons || !instructions || !editor || !handle1 || !handle2) return;

    let lessonWidth = lessons.getBoundingClientRect().width;
    let instructionsWidth = instructions.getBoundingClientRect().width;

    const minPanelWidth = 220;

    function getLayoutWidth() {
        return layout.getBoundingClientRect().width;
    }

    function canFit(lesson, instruction) {
        const remaining = getLayoutWidth() - lesson - instruction;
        return lesson >= minPanelWidth && instruction >= minPanelWidth && remaining >= minPanelWidth;
    }

    function saveLayoutSplit() {
        const layoutWidth = getLayoutWidth();
        if (layoutWidth <= 0) return;

        const payload = {
            lessonRatio: lessonWidth / layoutWidth,
            instructionRatio: instructionsWidth / layoutWidth
        };

        try {
            localStorage.setItem(layoutStorageKey, JSON.stringify(payload));
        } catch {
            // Ignore storage failures (private mode/quota/security policies).
        }
    }

    function restoreLayoutSplit() {
        const layoutWidth = getLayoutWidth();
        if (layoutWidth <= 0) return false;

        try {
            const raw = localStorage.getItem(layoutStorageKey);
            if (!raw) return false;

            const saved = JSON.parse(raw);
            if (!saved || typeof saved.lessonRatio !== 'number' || typeof saved.instructionRatio !== 'number') return false;

            const restoredLesson = Math.round(layoutWidth * saved.lessonRatio);
            const restoredInstruction = Math.round(layoutWidth * saved.instructionRatio);
            if (!canFit(restoredLesson, restoredInstruction)) return false;

            lessonWidth = restoredLesson;
            instructionsWidth = restoredInstruction;
            return true;
        } catch {
            return false;
        }
    }

    function applyWidths() {
        lessons.style.flex = `0 0 ${lessonWidth}px`;
        lessons.style.maxWidth = `${lessonWidth}px`;
        instructions.style.flex = `0 0 ${instructionsWidth}px`;
        instructions.style.maxWidth = `${instructionsWidth}px`;
        // Keep the editor pane filling remaining space so it never collapses due to stale measurements.
        editor.style.flex = '1 1 0';
        editor.style.maxWidth = '';
    }

    function normalizeToLayoutWidth() {
        const layoutWidth = getLayoutWidth();
        if (layoutWidth <= 0) return;

        // Clamp side panels while preserving the editor minimum width.
        const maxCombined = Math.max(minPanelWidth * 2, layoutWidth - minPanelWidth);
        let combined = lessonWidth + instructionsWidth;

        if (combined > maxCombined) {
            const scale = maxCombined / combined;
            lessonWidth = Math.max(minPanelWidth, Math.round(lessonWidth * scale));
            instructionsWidth = Math.max(minPanelWidth, Math.round(instructionsWidth * scale));
            combined = lessonWidth + instructionsWidth;

            if (combined > maxCombined) {
                instructionsWidth = Math.max(minPanelWidth, maxCombined - lessonWidth);
                combined = lessonWidth + instructionsWidth;
            }
            if (combined > maxCombined) {
                lessonWidth = Math.max(minPanelWidth, maxCombined - instructionsWidth);
            }
        }

        if (!canFit(lessonWidth, instructionsWidth)) {
            // Fallback to proportional split matching original Bootstrap column ratios (3/4/5).
            lessonWidth = Math.max(minPanelWidth, Math.round(layoutWidth * 0.25));
            instructionsWidth = Math.max(minPanelWidth, Math.round(layoutWidth * 0.3333));

            if (!canFit(lessonWidth, instructionsWidth)) {
                instructionsWidth = Math.max(minPanelWidth, layoutWidth - lessonWidth - minPanelWidth);
            }
        }
    }

    handle1.onmousedown = (e) => {
        e.preventDefault();
        const startX = e.pageX;
        const startLessonWidth = lessonWidth;
        const startInstructionsWidth = instructionsWidth;

        const move = (evt) => {
            const dx = evt.pageX - startX;
            const newLesson = startLessonWidth + dx;
            const newInstructions = startInstructionsWidth - dx;

            if (!canFit(newLesson, newInstructions)) return;

            lessonWidth = newLesson;
            instructionsWidth = newInstructions;
            applyWidths();
        };

        const up = () => {
            document.body.style.cursor = '';
            document.removeEventListener('mousemove', move);
            document.removeEventListener('mouseup', up);
            saveLayoutSplit();
        };

        document.body.style.cursor = 'col-resize';
        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', up);
    };

    handle2.onmousedown = (e) => {
        e.preventDefault();
        const startX = e.pageX;
        const startInstructionsWidth = instructionsWidth;

        const move = (evt) => {
            const dx = evt.pageX - startX;
            const newInstructions = startInstructionsWidth + dx;
            if (!canFit(lessonWidth, newInstructions)) return;

            instructionsWidth = newInstructions;
            applyWidths();
        };

        const up = () => {
            document.body.style.cursor = '';
            document.removeEventListener('mousemove', move);
            document.removeEventListener('mouseup', up);
            saveLayoutSplit();
        };

        document.body.style.cursor = 'col-resize';
        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', up);
    };

    if (!window.__learnResizableOnResizeBound) {
        window.addEventListener('resize', () => {
            const activeLayout = document.getElementById('layout');
            const activeLessons = document.getElementById('lessons-col');
            const activeInstructions = document.getElementById('instructions-col');
            const activeEditor = document.getElementById('editor-col');
            if (!activeLayout || !activeLessons || !activeInstructions || !activeEditor) return;

            window.initLearnResizableLayout();
        });

        window.__learnResizableOnResizeBound = true;
    }

    if (!restoreLayoutSplit()) {
        normalizeToLayoutWidth();
    } else {
        // Ensure restored values still fit after dynamic style/layout changes.
        normalizeToLayoutWidth();
    }
    applyWidths();
    saveLayoutSplit();
};

window.isMonacoEditorReady = function (id) {
    if (!window.blazorMonaco || !Array.isArray(window.blazorMonaco.editors)) return false;

    const editorHolder = window.blazorMonaco.editors.find(e => e.id === id);
    return !!(editorHolder && editorHolder.editor);
};
