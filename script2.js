document.addEventListener("DOMContentLoaded", function () {

    // ── Rutinas de Modo Recuperación (15-20 min) ──────────────────────────
    // Se inyectan en window.getAllAvailableRoutines vía patch en exerciseDatabase2.
    // Aquí las registramos en un array global que el patch ya consume.
    (function () {
        var newRecovery = [
            // ─── 1. MOVILIDAD & ESTIRAMIENTO (~17 min) ───────────────────
            {
                id: "recovery_mobility_flow",
                name: "🧘 Movilidad & Estiramiento",
                gender: "unisex",
                daysPerWeek: 3,
                difficulty: "principiante",
                category: "Recovery",
                description: "Sesión de 17 min basada en movilidad articular y estiramientos isométricos. Page et al. (2010) — Stretching científico: mantener una posición isométrica 20-30s activa el reflejo de inhibición autogénica (órgano de Golgi), produciendo mayor relajación muscular que el estiramiento pasivo. Ideal para el día después del entrenamiento o como complemento diario.",
                exercises: [
                    "cat_cow",
                    "thoracic_rotation",
                    "hip_flexor_stretch_iso",
                    "wall_angel",
                    "prone_shoulder_retraction",
                    "bird_dog",
                    "ankle_circles_iso",
                    "foam_roll_iso"
                ],
                seriesPerEx: 2,
                repsPerEx:   4
            },
            // ─── 2. ACTIVACIÓN LIGERA (~19 min) ──────────────────────────
            {
                id: "recovery_light_activation",
                name: "⚡ Activación Ligera",
                gender: "unisex",
                daysPerWeek: 3,
                difficulty: "principiante",
                category: "Recovery",
                description: "Sesión de 19 min de activación muscular de baja intensidad. Schoenfeld & Contreras (2014): ejercicios de baja carga al 20-40% del 1RM activan el sistema nervioso y aumentan el flujo sanguíneo sin generar daño muscular adicional. Kellmann et al. (2018): la recuperación activa con ejercicio ligero acelera la eliminación de lactato hasta un 30% más rápido que el reposo total. Perfecta como plus al día de entrenamiento o al día siguiente.",
                exercises: [
                    "glute_bridge",
                    "dead_bug",
                    "bird_dog",
                    "hip_abduction",
                    "band_pull_apart",
                    "shoulder_external_rotation",
                    "cat_cow",
                    "wall_angel"
                ],
                seriesPerEx: 2,
                repsPerEx:   6
            },
            // ─── 3. BIENESTAR CUERPO & MENTE (~16 min) ───────────────────
            {
                id: "recovery_mindful_body",
                name: "🌿 Bienestar Cuerpo & Mente",
                gender: "unisex",
                daysPerWeek: 7,
                difficulty: "principiante",
                category: "Recovery",
                description: "Sesión de 16 min de movimiento consciente. Lowen et al. (2019) — Biofeedback y movimiento: la atención plena durante el movimiento lento reduce el cortisol un 15% y mejora la variabilidad de la frecuencia cardíaca. La combinación de isométricos de hold largo + movilidad lumbar activa el sistema nervioso parasimpático (descanso-digestión). Ideal cualquier día — mañana, mediodía o noche.",
                exercises: [
                    "dead_bug",
                    "cat_cow",
                    "hip_flexor_stretch_iso",
                    "bird_dog",
                    "prone_shoulder_retraction",
                    "foam_roll_iso",
                    "ankle_circles_iso"
                ],
                seriesPerEx: 2,
                repsPerEx:   4
            }
        ];

        // Registrar en window para que el patch de exerciseDatabase2 las incluya
        if (!window._extraRecoveryRoutines) window._extraRecoveryRoutines = [];
        newRecovery.forEach(function (r) {
            var alreadyIn = (window._extraRecoveryRoutines || []).some(function (x) { return x.id === r.id; });
            if (!alreadyIn) window._extraRecoveryRoutines.push(r);
        });

        // Parchear window.getAllAvailableRoutines para incluir las nuevas rutinas Recovery
        var _prevAll = window.getAllAvailableRoutines;
        if (_prevAll && !_prevAll._extraPatched) {
            window.getAllAvailableRoutines = function (gender) {
                var base = _prevAll(gender);
                var extra = (window._extraRecoveryRoutines || []);
                var ids = base.map(function (r) { return r.id; });
                extra = extra.filter(function (r) { return ids.indexOf(r.id) === -1; });
                return base.concat(extra);
            };
            window.getAllAvailableRoutines._extraPatched = true;
        }
    })();

    // ── Estado global ─────────────────────────────────────────────────────
    var audioCtx        = null;
    var audioUnlocked   = false;
    var voiceEnabled    = true;
    var restSpeakTimers = [];
    var editingExIndex  = null;
    var editingTarget   = null;
    var currentGender   = localStorage.getItem("userGender") || "male";
    window.currentGender = currentGender; // expuesto para fatigue_ui.js
    var userWeight      = parseInt(localStorage.getItem("userWeight")) || 70;
    var currentRoutine  = null;
    var trainingActive  = false;
    var trainingPaused  = false;
    var _workerInt      = null;
    var countdownInterval = null;
    var currentExerciseIndex = 0;
    var currentSet  = 1;
    var currentRep  = 1;
    var currentPhase     = "eccentric";
    var phaseTimeLeft    = 0;
    var phaseStartTime   = 0;
    var totalDuration    = 0;
    var workoutStartTime = null;
    var completedSeries  = [];
    var isResting             = false;
    var isInitialCountdown    = false;
    var isBetweenExerciseRest = false;
    var restTimeLeft     = 0;
    var lastBeepSecond   = -1;
    var lastSpeechSecond = -1;
    var rehabModeActive  = false;
    var currentSide      = null;
    var BETWEEN_EXERCISE_REST = 90;
    var selectedExercisesForCreate = [];
    var currentRehabProtocol = null;
    var currentDetailRoutine = null;
    var openDetailId         = null;
    var ttsWarmedUp          = false;

    // ── Estado del módulo de fatiga ───────────────────────────────────────
    var _isFatigued        = false;
    var _accordionOpenId   = null;
    var tenSecPrepSpoken     = false;
    var restTenSecSpoken     = false;
    var _lastPhaseClass      = "";
    var _transitioning       = false;
    var wakeLock = null;
    var CIRC = 2 * Math.PI * 90;

    var stats = JSON.parse(localStorage.getItem("workoutStats")) || {
        totalWorkouts: 0, totalMinutes: 0, totalCalories: 0,
        streak: 0, lastWorkoutDate: null, history: [],
        weeklyGoals: {}, achievements: []
    };

    // ── Timer worker ──────────────────────────────────────────────────────
    function startWorkerInterval() {
        stopWorkerInterval();
        _workerInt = setInterval(updateTrainingTimer, 50);
    }
    function stopWorkerInterval() {
        if (_workerInt) { clearInterval(_workerInt); _workerInt = null; }
    }

    // ── Wake lock ─────────────────────────────────────────────────────────
    function requestWakeLock() {
        if (!("wakeLock" in navigator)) return;
        navigator.wakeLock.request("screen").then(function (lock) {
            wakeLock = lock;
            lock.addEventListener("release", function () { wakeLock = null; });
        }).catch(function () {});
    }
    function releaseWakeLock() {
        if (wakeLock) { wakeLock.release().catch(function () {}); wakeLock = null; }
    }
    document.addEventListener("visibilitychange", function () {
        if (document.visibilityState === "visible" && trainingActive && !trainingPaused) {
            requestWakeLock();
            phaseStartTime = Date.now() - ((totalDuration - phaseTimeLeft) * 1000);
        }
    });

    // ── AUDIO ─────────────────────────────────────────────────────────────
    function initAudio() {
        if (!audioCtx) {
            try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
            catch (e) {}
        }
        if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
        if (!audioUnlocked && audioCtx) playSilentBuffer();
    }
    function playSilentBuffer() {
        if (!audioCtx) return;
        try {
            var buf = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.5, audioCtx.sampleRate);
            var src = audioCtx.createBufferSource();
            src.buffer = buf; src.connect(audioCtx.destination); src.start(0);
            src.onended = function () { audioUnlocked = true; };
        } catch (e) {}
    }
    function warmUpTTS() {
        if (ttsWarmedUp || !window.speechSynthesis) return;
        ttsWarmedUp = true;
        try {
            var u = new SpeechSynthesisUtterance(" ");
            u.volume = 0; u.lang = "es-ES"; u.rate = 1.55;
            window.speechSynthesis.speak(u);
        } catch (e) {}
    }
    function playBeep(freq, dur, vol) {
        if (!audioCtx) initAudio();
        if (!audioCtx) return;
        try {
            var now  = audioCtx.currentTime;
            var osc  = audioCtx.createOscillator();
            var gain = audioCtx.createGain();
            osc.connect(gain); gain.connect(audioCtx.destination);
            osc.frequency.value = freq; osc.type = "sine";
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(vol || 0.35, now + 0.01);
            gain.gain.linearRampToValueAtTime(0, now + (dur || 0.15));
            osc.start(now); osc.stop(now + (dur || 0.15));
        } catch (e) {}
    }

    // ── VOZ ───────────────────────────────────────────────────────────────
    // Sin speechSynthesis.cancel() para evitar error "utterance not found for boundary".
    // Cola simple: speak() encola y reemplaza el último pendiente.
    // speakImmediate() vacía la cola y pone el texto al frente para hablar lo antes posible.
    var ttsQueue    = [];
    var ttsSpeaking = false;

    function ttsFlush() {
        if (ttsSpeaking || !ttsQueue.length || !window.speechSynthesis) return;
        var text = ttsQueue.shift();
        if (!text) { ttsFlush(); return; }
        ttsSpeaking = true;
        try {
            var u = new SpeechSynthesisUtterance(text);
            u.lang = "es-ES"; u.rate = 1.4; u.pitch = 1.0; u.volume = 1.0;
            u.onend  = function () { ttsSpeaking = false; setTimeout(ttsFlush, 50); };
            u.onerror = function (e) {
                // Ignorar el error boundary silenciosamente
                ttsSpeaking = false;
                setTimeout(ttsFlush, 50);
            };
            window.speechSynthesis.speak(u);
        } catch (e) { ttsSpeaking = false; }
    }
    function speak(text) {
        if (!voiceEnabled || !window.speechSynthesis) return;
        // Reemplazar el último elemento pendiente en lugar de acumular
        if (ttsQueue.length > 0) { ttsQueue[ttsQueue.length - 1] = text; }
        else { ttsQueue.push(text); }
        ttsFlush();
    }
    function speakImmediate(text) {
        if (!voiceEnabled || !window.speechSynthesis) return;
        // Vaciar cola y poner el texto al frente; NO cancelar la utterance en curso
        // para evitar el error "utterance not found for boundary"
        ttsQueue = [text];
        if (!ttsSpeaking) ttsFlush();
        // Si está hablando, el texto se reproducirá cuando termine la utterance actual
    }
    function speakPhase(phase) {
        if (phase === "eccentric")       speakImmediate("Baja");
        else if (phase === "isometric")  speakImmediate("Mantén");
        else if (phase === "concentric") speakImmediate("Sube");

    }
    function speakSide(side) {
        if (side === "right") speak("Lado derecho");
        else if (side === "left") speak("Lado izquierdo");
    }
    function speakBetweenRest(nextExName, side) {
        var text = "Descansa";
        if (nextExName) {
            text += ". Prepárate para " + nextExName;
            if (side === "right")     text += " lado derecho";
            else if (side === "left") text += " lado izquierdo";
        }
        speak(text);
    }
    function syncSpeakCountdown(s) {
        if (s === 3)      speakImmediate("Tres");
        else if (s === 2) speakImmediate("Dos");
        else if (s === 1) speakImmediate("Uno");
    }
    function speakTenSecPrep(exName, side, serieNum, serieTotal) {
        var text = "Diez segundos para " + exName;
        if (serieNum && serieTotal) text += " serie " + serieNum + " de " + serieTotal;
        if (side === "right")     text += " lado derecho";
        else if (side === "left") text += " lado izquierdo";
        text += ", prepárate";
        speakImmediate(text);
    }
    function speakTenSecRest(nextName, side, isSameExercise) {
        if (!nextName) return;
        var text = "Diez segundos para " + nextName;
        if (side === "right")     text += " lado derecho";
        else if (side === "left") text += " lado izquierdo";
        else if (isSameExercise)  text += ", siguiente serie";
        speakImmediate(text);
    }
    function scheduleRestSpeech(totalSec, nextName, isSameExercise, side) {
        clearRestSpeech();
        if (!voiceEnabled) return;
        if (totalSec >= 31) {
            restSpeakTimers.push(setTimeout(function () {
                speak("Treinta segundos");
            }, (totalSec - 30) * 1000));
        }
        if (totalSec >= 11) {
            restSpeakTimers.push(setTimeout(function () {
                speakTenSecRest(nextName, side, isSameExercise);
            }, (totalSec - 10) * 1000));
        }
        if (totalSec >= 4) {
            restSpeakTimers.push(setTimeout(function () { speakImmediate("Tres"); }, (totalSec - 3) * 1000));
        }
        if (totalSec >= 3) {
            restSpeakTimers.push(setTimeout(function () { speakImmediate("Dos");  }, (totalSec - 2) * 1000));
        }
        if (totalSec >= 2) {
            restSpeakTimers.push(setTimeout(function () { speakImmediate("Uno");  }, (totalSec - 1) * 1000));
        }
    }
    function clearRestSpeech() {
        restSpeakTimers.forEach(function (t) { clearTimeout(t); });
        restSpeakTimers = [];
        ttsQueue = [];
    }

    // ── Beeps ─────────────────────────────────────────────────────────────
    function playPum(d) { setTimeout(function () { playBeep(220, 0.13, 0.45); }, d); }
    function playSecondBeep() { playBeep(660, 0.08, 0.25); }
    function playRhythmEccentric()  { playPum(0); playPum(1000); playPum(2000); }
    function playRhythmIsometric()  { playBeep(440, 0.4, 0.5); }
    function playRhythmConcentric() { playPum(0); playPum(1000); }
    function playPhaseStart()  { playBeep(880, 0.12, 0.4); }
    function playPhaseEnd()    { playBeep(440, 0.12, 0.35); }
    function playCountdownBeep(isLast) {
        playBeep(isLast ? 880 : 660, isLast ? 0.18 : 0.12, isLast ? 0.45 : 0.32);
    }
    function playRestAlert() { playBeep(523, 0.1, 0.3); }
    function playRestEnd()   { playBeep(784, 0.2, 0.4); }
    function playCompleteBeep() {
        playBeep(784, 0.2, 0.4);
        setTimeout(function () { playBeep(880, 0.2, 0.4); }, 200);
        setTimeout(function () { playBeep(1046, 0.3, 0.5); }, 400);
    }

    // ── Helpers ───────────────────────────────────────────────────────────
    function calculateRoutineDuration(routine, seriesOverride, repsOverride, betweenRest) {
        if (!routine || !routine.exercises || !routine.exercises.length) return 0;
        var totalSec = 0;
        routine.exercises.forEach(function (ex) {
            var lib = getExById(typeof ex === "string" ? ex : ex.id);
            var ph  = (typeof ex === "object" && ex.customPhases) ? ex.customPhases : (lib ? lib.phases : { eccentric:3, isometric:1, concentric:2, rest:90 });
            var series    = seriesOverride || ex.series || 3;
            var reps      = repsOverride   || ex.reps   || 10;
            var phaseTime = (ph.eccentric || 0) + (ph.isometric || 0) + (ph.concentric || 0);
            totalSec += phaseTime * reps * series + (ph.rest || 90) * (series - 1);
        });
        var between = (betweenRest !== undefined ? betweenRest : BETWEEN_EXERCISE_REST);
        totalSec += between * (routine.exercises.length - 1);
        return Math.round(totalSec / 60);
    }
    function calculateRoutineDurationFromR(r, s, rp) { return calculateRoutineDuration(r, s, rp, BETWEEN_EXERCISE_REST); }

    function updateRingFill(phase, progress) {
        var fill = document.getElementById("ringFill");
        var lbl  = document.getElementById("circlePhaseLabel");
        var colors = { eccentric:"#DA121A", isometric:"#FCDD09", concentric:"#078930", rest:"#8b5cf6", countdown:"#94a3b8" };
        var labels = { eccentric:"EXCÉNTRICA", isometric:"PAUSA", concentric:"CONCÉNTRICA", rest:"DESCANSO", countdown:"PREPARA" };
        if (fill) {
            fill.style.stroke = colors[phase] || "#94a3b8";
            var p = Math.max(0, Math.min(1, progress));
            fill.style.strokeDasharray = (CIRC * (1 - p)) + " " + CIRC;
        }
        if (lbl) lbl.textContent = labels[phase] || "";
    }

    function getStartPhase(exerciseId, phases) {
        // Ejercicios isométricos puros
        var pureIso = ["plank","side_plank","copenhagen_plank",
                       "pallof_press","farmer_walk","wall_sit","suitcase_carry"];
        if (pureIso.indexOf(exerciseId) !== -1) return "isometric";

        // Ejercicios que ARRANCAN SUBIENDO / jalando (concéntrico primero):
        // dominadas, jalón, remos, curls, face pull, hip thrust, glute bridge,
        // cable kickback, abductoras, step up, calf raise, box jump,
        // banda separación, reverse fly, seated row con banda, nordic curl
        var startConcentric = [
            // Jalar vertical
            "pull_up", "chin_up", "lat_pulldown",
            // Jalar horizontal
            "bent_over_row", "dumbbell_row", "seated_cable_row",
            // Curl de brazo
            "bicep_curl",
            // Hombro posterior / manguito
            "face_pull", "reverse_fly", "rear_delt_fly",
            "shoulder_external_rotation", "band_pull_apart", "seated_row_band",
            // Cadera / glúteo (empujan desde abajo)
            "hip_thrust", "glute_bridge", "cable_kickback",
            "abductor_machine", "hip_abduction",
            // Pierna / tobillo
            "step_up", "box_jump", "calf_raise", "heel_drop",
            // Core / funcional que jala
            "leg_raise",
            // Excéntrico nórdico: empieza con la caída excéntrica
            // NO está aquí → arranca excéntrico (correcto)
        ];
        if (startConcentric.indexOf(exerciseId) !== -1) return "concentric";

        // Todo lo demás arranca excéntrico (bajando)
        return "eccentric";
    }

    // updatePhaseVisual: cachea la clase para evitar layout thrashing cada 50ms
    function updatePhaseVisual(phase) {
        if (_lastPhaseClass === phase) return;
        _lastPhaseClass = phase;
        document.body.classList.remove("phase-eccentric","phase-isometric","phase-concentric","phase-rest","phase-countdown");
        var modal = document.getElementById("trainingModal");
        if (modal) modal.classList.remove("phase-eccentric","phase-isometric","phase-concentric","phase-rest","phase-countdown");
        if (phase === "neutral") return;
        document.body.classList.add("phase-" + phase);
        if (modal) modal.classList.add("phase-" + phase);
    }

    function resetTrainingState() {
        trainingActive = false; trainingPaused = false;
        stopWorkerInterval();
        if (countdownInterval) { clearInterval(countdownInterval); countdownInterval = null; }
        clearRestSpeech(); ttsQueue = []; ttsSpeaking = false;
        releaseWakeLock();
        currentExerciseIndex = 0; currentSet = 1; currentRep = 1;
        currentPhase = "eccentric"; phaseTimeLeft = 0; phaseStartTime = 0; totalDuration = 0;
        isResting = false; isInitialCountdown = false; isBetweenExerciseRest = false;
        restTimeLeft = 0; lastBeepSecond = -1; lastSpeechSecond = -1;
        tenSecPrepSpoken = false; restTenSecSpoken = false;
        completedSeries = []; workoutStartTime = null; currentSide = null;
        _lastPhaseClass = ""; _transitioning = false;
        updatePhaseVisual("neutral");
        var cs = document.getElementById("completedSeriesList");
        if (cs) cs.innerHTML = "";
        var pb = document.getElementById("pauseTrainingBtn");
        if (pb) pb.innerText = "⏸️ Pausar";
        var ss = document.getElementById("startScreen");
        if (ss && ss.parentElement) ss.parentElement.removeChild(ss);
        var mc = document.getElementById("mainTrainingContent");
        if (mc) mc.style.display = "";
        var mb = document.getElementById("trainingModalBtns");
        if (mb) mb.style.display = "";
        var tpd = document.getElementById("trainingPhaseDisplay");
        if (tpd) tpd.style.display = "none";
    }

    function getExById(id) {
        return window.exerciseLibrary ? window.exerciseLibrary.find(function (e) { return e.id === id; }) : null;
    }
    function getAllRoutines() {
        return window.getAllAvailableRoutines ? window.getAllAvailableRoutines(currentGender) : [];
    }
    function fmtMin(m) { var h = Math.floor(m / 60), mn = m % 60; return h > 0 ? h + "h " + mn + "m" : mn + "m"; }

    function updateTrainingPhaseImages(exId) {
        var tpd = document.getElementById("trainingPhaseDisplay");
        if (!tpd) return;
        if (!exId) { tpd.style.display = "none"; return; }
        var img = document.getElementById("tpdImgPos");
        if (!img) return;
        var newSrc = "img/fases/" + exId + "_pos.png";
        if (img.dataset.loaded === newSrc) {
            tpd.style.display = "";
            return;
        }
        img.dataset.loaded = newSrc;
        img.src = newSrc;
        img.onerror = function () { tpd.style.display = "none"; this.onerror = null; };
        img.onload  = function () { tpd.style.display = ""; };
        tpd.style.display = "none"; // ocultar hasta cargar
    }

    function updateStatsUI() {
        var tw = document.getElementById("totalWorkouts");
        var tt = document.getElementById("totalTime");
        var sd = document.getElementById("streakDays");
        var tc = document.getElementById("totalCalories");
        if (tw) tw.innerText = stats.totalWorkouts;
        if (tt) tt.innerText = fmtMin(stats.totalMinutes);
        if (sd) sd.innerText = stats.streak;
        if (tc) tc.innerText = stats.totalCalories;
    }
    function updateStreak() {
        var today = new Date().toDateString();
        if (stats.lastWorkoutDate === today) return;
        if (stats.lastWorkoutDate) {
            var last = new Date(stats.lastWorkoutDate);
            var yest = new Date(); yest.setDate(yest.getDate() - 1);
            stats.streak = last.toDateString() === yest.toDateString() ? (stats.streak || 0) + 1 : 1;
        } else { stats.streak = 1; }
        stats.lastWorkoutDate = today;
    }
    function saveStats() { localStorage.setItem("workoutStats", JSON.stringify(stats)); updateStatsUI(); updateProgressUI(); }

    function updateProgressUI() {
        var al = document.getElementById("achievementsList");
        var hl = document.getElementById("historyList");
        if (al) {
            var ach = [
                { name:"Primer entreno", unlocked: stats.totalWorkouts > 0,    icon:"🎯" },
                { name:"5 entrenos",     unlocked: stats.totalWorkouts >= 5,    icon:"⭐" },
                { name:"10 entrenos",    unlocked: stats.totalWorkouts >= 10,   icon:"🏆" },
                { name:"25 entrenos",    unlocked: stats.totalWorkouts >= 25,   icon:"💎" },
                { name:"50 entrenos",    unlocked: stats.totalWorkouts >= 50,   icon:"🏅" },
                { name:"1000 cal",       unlocked: stats.totalCalories >= 1000, icon:"🔥" },
                { name:"Racha 7d",       unlocked: stats.streak >= 7,           icon:"📅" },
                { name:"Racha 30d",      unlocked: stats.streak >= 30,          icon:"🌟" }
            ];
            al.innerHTML = ach.map(function (a) {
                return '<div class="achievement ' + (a.unlocked ? "" : "locked") + '">'
                    + '<div class="achievement-icon">' + a.icon + '</div>'
                    + '<div class="achievement-name">' + a.name + '</div></div>';
            }).join("");
        }
        if (hl) {
            if (!stats.history || !stats.history.length) { hl.innerHTML = '<div class="empty-message">Sin historial aún</div>'; return; }
            hl.innerHTML = stats.history.slice(0, 10).map(function (h) {
                return '<div class="history-item"><span>' + new Date(h.date).toLocaleDateString()
                    + '</span><span>' + h.routineName + '</span><span>' + h.duration
                    + 'min</span><span>🔥' + h.calories + 'kcal</span></div>';
            }).join("");
        }
        var wg = document.getElementById("weeklyGoalsList");
        if (wg) wg.innerHTML = '<div class="empty-message" style="font-size:0.72rem">Completa rutinas para ver metas semanales</div>';
    }

    function updateCountersUI() {
        if (!currentRoutine) return;
        var ex    = currentRoutine.exercises[currentExerciseIndex];
        var libEx = ex ? getExById(ex.id) : null;
        var pureIso = libEx && (libEx.phases.eccentric === 0 && libEx.phases.concentric === 0 && libEx.phases.isometric > 0);
        var setV  = String(currentSet);
        var setsV = String(ex ? (ex.series || 3) : "");
        var repV  = pureIso ? "-" : String(currentRep);
        var repsV = pureIso ? "-" : String(ex ? (ex.reps || 10) : "");
        var exV   = String(currentExerciseIndex + 1);
        var texV  = String(currentRoutine.exercises.length);
        var cs  = document.getElementById("counterSet");
        var cts = document.getElementById("counterTotalSets");
        var cr  = document.getElementById("counterRep");
        var ctr = document.getElementById("counterTotalReps");
        var ce  = document.getElementById("counterExercise");
        var cte = document.getElementById("counterTotalExercises");
        if (cs  && cs.innerText  !== setV)  cs.innerText  = setV;
        if (cts && cts.innerText !== setsV) cts.innerText = setsV;
        if (cr  && cr.innerText  !== repV)  cr.innerText  = repV;
        if (ctr && ctr.innerText !== repsV) ctr.innerText = repsV;
        if (ce  && ce.innerText  !== exV)   ce.innerText  = exV;
        if (cte && cte.innerText !== texV)  cte.innerText = texV;
    }

    function updatePhaseUI() {
        var progress = 1 - (phaseTimeLeft / totalDuration);
        var tl = document.getElementById("timerLarge");
        if (tl) tl.innerText = Math.ceil(phaseTimeLeft);
        updatePhaseVisual(currentPhase);
        updateRingFill(currentPhase, progress);
        var ex    = currentRoutine ? currentRoutine.exercises[currentExerciseIndex] : null;
        var libEx = ex ? getExById(ex.id) : null;
        var fallbackBig   = { eccentric:"EXCÉNTRICA", isometric:"PAUSA", concentric:"CONCÉNTRICA" };
        var fallbackSmall = { eccentric:"Controla el descenso", isometric:"Mantén la tensión", concentric:"Sube con fuerza" };
        var instrSmall = (libEx && libEx.phaseInstructions && libEx.phaseInstructions[currentPhase])
            ? libEx.phaseInstructions[currentPhase] : (fallbackSmall[currentPhase] || "");
        var ib = document.getElementById("instructionBig");
        var is = document.getElementById("instructionSmall");
        if (ib) ib.innerText = fallbackBig[currentPhase] || "";
        if (is) is.innerText = instrSmall;
        var pE = document.getElementById("phaseEccentric");
        var pI = document.getElementById("phaseIsometric");
        var pC = document.getElementById("phaseConcentric");
        [pE, pI, pC].forEach(function (b) { if (b) b.classList.remove("active"); });
        if (currentPhase === "eccentric"  && pE) pE.classList.add("active");
        if (currentPhase === "isometric"  && pI) pI.classList.add("active");
        if (currentPhase === "concentric" && pC) pC.classList.add("active");
        var nxt;
        if (currentPhase === "eccentric") { nxt = "NUEVA REP"; }
        else if (currentPhase === "isometric") {
            nxt = (ex && ex.phases && ex.phases.eccentric > 0) ? "EXCÉNTRICA" : "NUEVA REP";
        } else {
            if (ex && ex.phases) {
                if (ex.phases.isometric > 0)      nxt = "PAUSA";
                else if (ex.phases.eccentric > 0) nxt = "EXCÉNTRICA";
                else                              nxt = "NUEVA REP";
            } else { nxt = "PAUSA"; }
        }
        var np = document.getElementById("nextPhaseText");
        if (np) np.innerText = "Siguiente: " + nxt;
        updateCountersUI();
    }

    // Cache para evitar escrituras DOM innecesarias que causan reflow/salto
    var _uiCache = {};
    function _setIfChanged(id, prop, val) {
        var key = id + "." + prop;
        if (_uiCache[key] === val) return;
        _uiCache[key] = val;
        var el = document.getElementById(id);
        if (!el) return;
        if (prop === "innerText")  el.innerText  = val;
        else if (prop === "style.display") el.style.display = val;
        else if (prop === "className")     el.className = val;
    }

    function updateRestUI() {
        var tl = document.getElementById("timerLarge");
        if (tl) tl.innerText = Math.ceil(restTimeLeft);
        updatePhaseVisual("rest");
        updateRingFill("rest", 1 - (restTimeLeft / totalDuration));
        _setIfChanged("instructionBig",   "innerText", "DESCANSO");
        _setIfChanged("instructionSmall", "innerText", "Respira y recupérate · " + Math.ceil(restTimeLeft) + "s");
        var ex  = currentRoutine && currentRoutine.exercises[currentExerciseIndex];
        if (ex) _setIfChanged("modalExerciseName", "innerText", ex.name + (ex.rehabMode ? " 🏥" : ""));
        var pE = document.getElementById("phaseEccentric");
        var pI = document.getElementById("phaseIsometric");
        var pC = document.getElementById("phaseConcentric");
        [pE, pI, pC].forEach(function (b) { if (b) b.classList.remove("active"); });
        _setIfChanged("nextPhaseText", "innerText", "Serie " + currentSet + " de " + (ex ? (ex.series || 3) : "?"));
        updateCountersUI();
    }

    function updateBetweenExRestUI() {
        var tl = document.getElementById("timerLarge");
        if (tl) tl.innerText = Math.ceil(restTimeLeft);
        updatePhaseVisual("rest");
        updateRingFill("rest", 1 - (restTimeLeft / totalDuration));
        var nextEx    = currentRoutine && currentRoutine.exercises[currentExerciseIndex];
        var nextLibEx = nextEx ? getExById(nextEx.id) : null;
        var nextInstr = nextLibEx && nextLibEx.phaseInstructions ? Object.values(nextLibEx.phaseInstructions)[0] : null;
        var bigTxt  = "DESCANSA · " + Math.ceil(restTimeLeft) + "s";
        var smTxt   = nextEx ? ("Próx: " + nextEx.name + (nextInstr ? " — " + nextInstr.substring(0, 50) + "…" : "")) : "Respira";
        var menTxt  = nextEx ? ("▶ " + nextEx.name) : "";
        _setIfChanged("instructionBig",    "innerText", bigTxt);
        _setIfChanged("instructionSmall",  "innerText", smTxt);
        _setIfChanged("modalExerciseName", "innerText", menTxt);
        var si = document.getElementById("sideIndicator");
        if (si && si.style.display !== "none") si.style.display = "none";
        var pE = document.getElementById("phaseEccentric");
        var pI = document.getElementById("phaseIsometric");
        var pC = document.getElementById("phaseConcentric");
        [pE, pI, pC].forEach(function (b) { if (b) b.classList.remove("active"); });
        if (nextEx) updateTrainingPhaseImages(nextEx.id);
        updateCountersUI();
    }

    function updateCountdownUI(secondsLeft) {
        var cn = document.getElementById("countdownNumber");
        if (cn) cn.innerText = secondsLeft;
        var tl = document.getElementById("timerLarge");
        if (tl) tl.innerText = secondsLeft;
        updatePhaseVisual("countdown");
        updateRingFill("countdown", 1 - (secondsLeft / totalDuration));
        var ib = document.getElementById("instructionBig");
        var is = document.getElementById("instructionSmall");
        if (ib) ib.innerText = "PREPÁRATE";
        var sideText = "";
        if (currentSide === "right")     sideText = " · 🟢 LADO DERECHO";
        else if (currentSide === "left") sideText = " · 🔵 LADO IZQUIERDO";
        if (is) is.innerText = "El ejercicio comienza en " + secondsLeft + "..." + sideText;
        if (secondsLeft === 10 && !tenSecPrepSpoken) {
            tenSecPrepSpoken = true;
            var ex = currentRoutine && currentRoutine.exercises[currentExerciseIndex];
            if (ex) speakTenSecPrep(ex.name, currentSide, currentSet, ex.series || 3);
        }
    }

    // ── Modal descripción ─────────────────────────────────────────────────
    function showExerciseDesc(lib) {
        var modal = document.getElementById("exerciseDescModal");
        var title = document.getElementById("exerciseDescTitle");
        var body  = document.getElementById("exerciseDescBody");
        if (!modal || !lib) return;
        title.innerText = lib.name;
        var html = "";
        if (lib.targetMuscles && lib.targetMuscles.length) {
            html += '<div class="desc-row"><span class="desc-label">💪 Músculos</span><span>' + lib.targetMuscles.join(", ") + '</span></div>';
        }
        if (lib.equipment) {
            var altNames = [];
            if (lib.alternatives && lib.alternatives.length) {
                lib.alternatives.forEach(function(aid) { var a = getExById(aid); if (a) altNames.push(a.name); });
            } else if (lib.alternative) {
                var a0 = getExById(lib.alternative); if (a0) altNames.push(a0.name);
            }
            html += '<div class="desc-row"><span class="desc-label">🔧 Equipo</span><span>' + lib.equipment
                + (altNames.length ? ' <span class="alt-badge">Alt: ' + altNames.join(' / ') + '</span>' : '') + '</span></div>';
        }
        if (lib.description) { html += '<p class="desc-text">' + lib.description + '</p>'; }
        html += '<div class="desc-phase-images">'
            + '<div class="desc-phase-img-wrap-single"><img src="img/fases/' + lib.id + '_pos.png" alt="Posición" class="desc-phase-img-single" onerror="this.parentElement.style.display=\'none\'"></div>'
            + '</div>';
        if (lib.phases) {
            html += '<div class="desc-phases">'
                + '<div class="desc-phase ecc">⬇️ Excéntrica: <strong>' + lib.phases.eccentric + 's</strong>'
                + (lib.phaseInstructions && lib.phaseInstructions.eccentric ? '<span class="desc-phase-instr">' + lib.phaseInstructions.eccentric + '</span>' : '') + '</div>'
                + '<div class="desc-phase iso">⏸️ Pausa: <strong>' + lib.phases.isometric + 's</strong>'
                + (lib.phaseInstructions && lib.phaseInstructions.isometric ? '<span class="desc-phase-instr">' + lib.phaseInstructions.isometric + '</span>' : '') + '</div>'
                + '<div class="desc-phase con">⬆️ Concéntrica: <strong>' + lib.phases.concentric + 's</strong>'
                + (lib.phaseInstructions && lib.phaseInstructions.concentric ? '<span class="desc-phase-instr">' + lib.phaseInstructions.concentric + '</span>' : '') + '</div>'
                + '<div class="desc-phase rest">💤 Descanso: <strong>' + lib.phases.rest + 's</strong></div>'
                + '</div>';
        }
        if (lib.rehab) {
            html += '<div class="desc-rehab-box">🏥 <strong>Versión rehabilitación:</strong> '
                + lib.rehab.phases.eccentric + 's / ' + lib.rehab.phases.isometric + 's / '
                + lib.rehab.phases.concentric + 's · ' + lib.rehab.series + '×' + lib.rehab.reps
                + '<br><small>' + (lib.rehab.notes || "") + '</small></div>';
        }
        if (!html) html = '<p class="desc-text" style="color:#94a3b8">Sin descripción disponible.</p>';
        body.innerHTML = html;
        modal.style.display = "flex";
    }

    // ── Render rutinas ─────────────────────────────────────────────────────
    function renderRecommendedRoutines() {
        var list = document.getElementById("recommendedList");
        if (!list) return;
        var routines = getAllRoutines().slice(0, 4);
        if (!routines.length) { list.innerHTML = '<div class="empty-message">Sin rutinas recomendadas</div>'; return; }
        list.innerHTML = routines.map(function (r) {
            return '<div class="routine-card" data-id="' + r.id + '"><h4>' + r.name + '</h4><p>'
                + (r.description || "") + '</p><small>📅 ' + (r.daysPerWeek || 3) + 'd · '
                + r.exercises.length + ' ejercicios · ' + r.difficulty + '</small></div>';
        }).join("");
        list.querySelectorAll(".routine-card").forEach(function (card) {
            card.addEventListener("click", function () {
                var r = getAllRoutines().find(function (x) { return x.id === card.dataset.id; });
                if (r) {
                    var btn = document.querySelector('[data-tab="training"]');
                    if (btn) btn.click();
                    setTimeout(function () { accordionToggle(r.id); }, 120);
                }
            });
        });
    }

    function renderRoutinesList() {
        var list = document.getElementById("routinesList");
        if (!list) return;
        var catF = (document.getElementById("categoryFilter") || {}).value || "";
        var difF = (document.getElementById("difficultyFilter") || {}).value || "";

        // Obtener rutinas según modo fatiga
        var routines;
        if (_isFatigued) {
            // Modo recuperación: mostrar SOLO rutinas Recovery
            var all = window.getAllAvailableRoutines ? window.getAllAvailableRoutines(currentGender) : [];
            routines = all.filter(function (r) { return r.category === "Recovery"; });
            if (!routines.length) {
                // Fallback: rutinas de dificultad principiante
                routines = all.filter(function (r) { return r.difficulty === "principiante"; });
            }
            // Ordenar: primero las rutinas más cortas (~15-20 min) con id conocido
            var shortIds = ["recovery_mobility_flow", "recovery_mindful_body", "recovery_light_activation"];
            routines.sort(function (a, b) {
                var ai = shortIds.indexOf(a.id);
                var bi = shortIds.indexOf(b.id);
                if (ai !== -1 && bi === -1) return -1;
                if (bi !== -1 && ai === -1) return  1;
                if (ai !== -1 && bi !== -1) return ai - bi;
                return 0;
            });
        } else {
            routines = getAllRoutines();
            // Excluir Recovery cuando no está en modo fatiga
            routines = routines.filter(function (r) { return r.category !== "Recovery"; });
        }

        if (catF) routines = routines.filter(function (r) { return r.category === catF; });
        if (difF) routines = routines.filter(function (r) { return r.difficulty === difF; });
        if (!routines.length) { list.innerHTML = '<div class="empty-message">Sin resultados</div>'; return; }

        list.innerHTML = routines.map(function (r) {
            var isCustom   = window.customRoutines && window.customRoutines.some(function (x) { return x.id === r.id; });
            var isRecovery = r.category === "Recovery";
            var catBadge   = isRecovery
                ? '<span class="category-badge recovery-badge">🔄 Recovery</span>'
                : (r.category ? '<span class="category-badge">' + r.category + '</span>' : "");
            return '<div class="routine-card-wrapper accordion-wrapper" data-id="' + r.id + '">'
                + '<div class="routine-card ' + (isCustom ? "custom" : "") + (isRecovery ? " recovery-card" : "") + '" data-id="' + r.id + '">'
                + '<h4>' + r.name + '</h4>'
                + '<p>' + (r.description || "").substring(0, 80) + '…</p>'
                + '<div class="routine-meta-row">'
                + '<small>📅 ' + (r.daysPerWeek || 3) + 'd · ' + r.exercises.length + ' ej · ' + r.difficulty + '</small>'
                + catBadge
                + '</div>'
                + (isCustom ? '<button class="delete-btn" data-id="' + r.id + '">🗑</button>' : "")
                + '<button class="btn-load-routine accordion-trigger" data-id="' + r.id + '">📋 Cargar Rutina</button>'
                + '</div>'
                + '<div class="routine-inline-detail accordion-panel" id="inline-detail-' + r.id + '">'
                + '<div class="accordion-panel-inner"></div>'
                + '</div>'
                + '</div>';
        }).join("");

        list.querySelectorAll(".btn-load-routine").forEach(function (btn) {
            btn.addEventListener("click", function (e) {
                e.stopPropagation();
                accordionToggle(btn.dataset.id);
            });
        });
        list.querySelectorAll(".delete-btn").forEach(function (btn) {
            btn.addEventListener("click", function (e) {
                e.stopPropagation();
                if (confirm("¿Eliminar esta rutina permanentemente?")) {
                    window.deleteCustomRoutine(btn.dataset.id);
                    if (_accordionOpenId === btn.dataset.id) _accordionOpenId = null;
                    if (openDetailId    === btn.dataset.id) openDetailId = null;
                    renderRoutinesList(); renderCustomRoutinesList();
                }
            });
        });
    }

    // ── Acordeón animado (max-height) ─────────────────────────────────────
    function accordionToggle(id) {
        var panel = document.getElementById("inline-detail-" + id);
        if (!panel) return;

        if (_accordionOpenId === id) {
            accordionClose(id);
            return;
        }
        if (_accordionOpenId) accordionClose(_accordionOpenId);

        _accordionOpenId = id;
        openDetailId     = id;

        // Construir contenido si aún no se ha hecho
        var inner = panel.querySelector(".accordion-panel-inner");
        if (inner && !inner.dataset.built) {
            // Buscar en todas las rutinas disponibles (incluyendo Recovery)
            var allAvail = window.getAllAvailableRoutines ? window.getAllAvailableRoutines(currentGender) : getAllRoutines();
            var r = allAvail.find(function (x) { return x.id === id; });
            if (!r) r = getAllRoutines().find(function (x) { return x.id === id; });
            if (r) {
                currentDetailRoutine = r;
                rehabModeActive = false;
                inner.innerHTML = buildInlineDetailHTML(r);
                inner.dataset.built = "1";
                bindInlineDetailEvents(inner, r);
            }
        }

        panel.classList.add("accordion-open");
        panel.style.maxHeight = "0px";
        panel.style.overflow  = "hidden";
        requestAnimationFrame(function () {
            panel.style.maxHeight = panel.scrollHeight + "px";
            panel.addEventListener("transitionend", function onEnd() {
                panel.style.maxHeight = "none";
                panel.removeEventListener("transitionend", onEnd);
                panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
            });
        });
    }

    function accordionClose(id) {
        var panel = document.getElementById("inline-detail-" + id);
        if (!panel) return;
        var h = panel.scrollHeight;
        panel.style.maxHeight = h + "px";
        panel.style.overflow  = "hidden";
        requestAnimationFrame(function () {
            panel.style.maxHeight = "0px";
            panel.addEventListener("transitionend", function onEnd() {
                panel.classList.remove("accordion-open");
                panel.removeEventListener("transitionend", onEnd);
            });
        });
        if (_accordionOpenId === id) _accordionOpenId = null;
        if (openDetailId    === id) { openDetailId = null; currentDetailRoutine = null; }
    }

    // Mantener toggleInlineDetail como alias para compatibilidad con otras partes del código
    function toggleInlineDetail(id) { accordionToggle(id); }



    // Devuelve el primer alt disponible que NO esté ya en la rutina.
    // Soporta lib.alternatives (array) y lib.alternative (string legacy).
    function getAltForExercise(lib, routineExercises) {
        var currentIds = routineExercises.map(function(e) {
            return typeof e === "string" ? e : e.id;
        });
        var candidates = [];
        if (lib.alternatives && lib.alternatives.length) {
            candidates = lib.alternatives;
        } else if (lib.alternative) {
            candidates = [lib.alternative];
        }
        for (var ci = 0; ci < candidates.length; ci++) {
            var cid = candidates[ci];
            if (currentIds.indexOf(cid) === -1) {
                var found = getExById(cid);
                if (found) return found;
            }
        }
        // Si todos los alts ya están en la rutina, devuelve el primero de todos modos
        if (candidates.length) return getExById(candidates[0]);
        return null;
    }

    // Dado el alt actualmente asignado (altId), busca el SIGUIENTE alt del array
    // que no esté ya en la rutina (para rotar al presionar 🔄 varias veces).
    function getNextAlt(lib, currentAltId, routineExercises) {
        var currentIds = routineExercises.map(function(e) {
            return typeof e === "string" ? e : e.id;
        });
        var candidates = [];
        if (lib.alternatives && lib.alternatives.length) {
            candidates = lib.alternatives;
        } else if (lib.alternative) {
            candidates = [lib.alternative];
        }
        var curIdx = candidates.indexOf(currentAltId);
        // Buscar siguiente que no esté en la rutina
        for (var offset = 1; offset <= candidates.length; offset++) {
            var nextIdx = (curIdx + offset) % candidates.length;
            var nid = candidates[nextIdx];
            if (currentIds.indexOf(nid) === -1) {
                var found = getExById(nid);
                if (found) return found;
            }
        }
        // Si no hay ninguno libre, rotar al siguiente sin importar
        if (candidates.length > 1) {
            var nextIdx2 = (curIdx + 1) % candidates.length;
            return getExById(candidates[nextIdx2]);
        }
        return getExById(candidates[0]);
    }

    function buildInlineDetailHTML(r) {
        var seriesVal = r.seriesPerEx || 3;
        var repsVal   = r.repsPerEx   || 10;
        // Construir filas de ejercicios: nombre clickable, ALT toggle, lápiz para tiempos
        var exRows = r.exercises.map(function (ex, i) {
            var lib = getExById(typeof ex === "string" ? ex : ex.id);
            if (!lib) return "";
            var phases = (typeof ex === "object" && ex.customPhases) ? ex.customPhases : lib.phases;
            var unilateralBadge = lib.unilateral ? '<span class="bilateral-badge">↕ unilateral</span>' : "";
            var altLib = getAltForExercise(lib, r.exercises);
            var altBadge = altLib ? '<button class="alt-swap-btn" data-exindex="' + i + '" data-origid="' + lib.id + '" data-altid="' + altLib.id + '" data-altname="' + altLib.name + '" data-origname="' + lib.name + '" data-swapped="0" title="Cambiar por: ' + altLib.name + '">🔄 Alt.</button>' : "";
            return '<div class="exercise-item" data-index="' + i + '">'
                + '<div style="flex:1;min-width:0"><div class="exercise-name">'
                + '<span class="ex-name-link" data-exid="' + lib.id + '">' + lib.name + '</span>'
                + unilateralBadge + altBadge + '</div>'
                + '<div class="exercise-times">⬇️' + phases.eccentric + 's · ⏸️' + phases.isometric
                + 's · ⬆️' + phases.concentric + 's · 💤' + phases.rest + 's</div></div>'
                + '<span class="exercise-edit-icon" data-index="' + i + '">✏️</span></div>';
        }).join("");
        var estMin = calculateRoutineDurationFromR(r, seriesVal, repsVal);
        return '<div class="routine-detail">'
            + '<div class="routine-header-box"><h3>' + r.name + '</h3><p>' + (r.description || "") + '</p>'
            + '<div class="detail-meta"><span>📅 ' + (r.daysPerWeek || 3) + ' días/semana</span>'
            + '<span>💪 ' + r.difficulty + '</span><span>🏋️ ' + r.exercises.length + ' ejercicios</span></div></div>'
            + '<div class="section-title" style="margin-bottom:8px">Ejercicios <span class="hint-text">(nombre = descripción · ✏️ = tiempos · 🔄 = alternativa)</span></div>'
            + '<div class="exercises-list" id="exlist-' + r.id + '">' + exRows + '</div>'
            + '<div class="routine-duration-badge">⏱️ Duración estimada: <strong>' + fmtMin(estMin) + '</strong></div>'
            + '<div class="detail-controls"><div class="global-config-box"><div class="config-row">'
            + '<div class="config-group"><label class="config-label">Series</label><input type="number" id="gs-' + r.id + '" value="' + seriesVal + '" min="1" max="10" class="config-input"></div>'
            + '<div class="config-group"><label class="config-label">Reps</label><input type="number" id="gr-' + r.id + '" value="' + repsVal + '" min="1" max="50" class="config-input"></div>'
            + '<div class="config-group"><label class="config-label">⚖️ Peso kg</label><input type="number" id="gw-' + r.id + '" value="' + userWeight + '" min="0" step="0.5" class="config-input"></div>'
            + '<div class="config-group"><label class="config-label">💤 Desc. ej.</label><input type="number" id="ger-' + r.id + '" value="' + BETWEEN_EXERCISE_REST + '" min="0" max="300" class="config-input"><span style="font-size:0.65rem;color:#94a3b8;margin-left:2px">s</span></div>'
            + '</div><div class="rehab-mode-row"><label class="toggle-label"><span>🏥 Modo Recuperación</span>'
            + '<div class="toggle-switch"><input type="checkbox" id="rmt-' + r.id + '"><span class="toggle-slider"></span></div></label>'
            + '<p class="rehab-mode-hint" id="rmh-' + r.id + '">Aplica tiempos isométricos de rehabilitación</p>'
            + '</div></div>'
            + '<button class="btn primary large" id="startBtn-' + r.id + '">▶️ INICIAR RUTINA</button>'
            + '</div></div>';
    }

    function bindInlineDetailEvents(detailEl, r) {
        var exListEl = document.getElementById("exlist-" + r.id);
        if (exListEl) {
            exListEl.addEventListener("click", function (e) {
                // Nombre del ejercicio → abrir descripción
                var nameLink = e.target.closest(".ex-name-link");
                if (nameLink) {
                    var lib = getExById(nameLink.dataset.exid);
                    if (lib) showExerciseDesc(lib);
                    return;
                }
                // Botón ALT → cicla entre alternativas, omitiendo las que ya están en la rutina
                var altBtn = e.target.closest(".alt-swap-btn");
                if (altBtn) {
                    e.stopPropagation();
                    var exIndex  = parseInt(altBtn.dataset.exindex);
                    var swapped  = altBtn.dataset.swapped === "1";
                    var origId   = altBtn.dataset.origid;
                    var altId    = altBtn.dataset.altid;
                    var origName = altBtn.dataset.origname;
                    var origLib  = getExById(origId);
                    var useLib;
                    if (swapped) {
                        // Volver al original
                        useLib = getExById(origId);
                    } else {
                        // Avanzar al siguiente alt disponible (no en rutina)
                        if (origLib) {
                            useLib = getNextAlt(origLib, altId, r.exercises);
                        } else {
                            useLib = getExById(altId);
                        }
                    }
                    if (!useLib) return;
                    var useId    = useLib.id;
                    var curEx    = r.exercises[exIndex];
                    var customPh = (typeof curEx === "object" && curEx.customPhases) ? curEx.customPhases : null;
                    r.exercises[exIndex] = customPh ? { id: useId, customPhases: useLib.phases } : useId;
                    // Actualizar UI
                    var nameSpan = altBtn.closest(".exercise-item").querySelector(".ex-name-link");
                    if (nameSpan) { nameSpan.dataset.exid = useId; nameSpan.textContent = useLib.name; }
                    var timesEl = altBtn.closest(".exercise-item").querySelector(".exercise-times");
                    if (timesEl) timesEl.textContent = "⬇️" + useLib.phases.eccentric + "s · ⏸️" + useLib.phases.isometric + "s · ⬆️" + useLib.phases.concentric + "s · 💤" + useLib.phases.rest + "s";
                    if (swapped) {
                        // Volvió al original → resetear
                        altBtn.dataset.swapped = "0";
                        altBtn.dataset.altid   = origLib ? getAltForExercise(origLib, r.exercises).id : altId;
                        altBtn.title = "Cambiar por: " + (origLib ? (getAltForExercise(origLib, r.exercises) || {name: altBtn.dataset.altname}).name : altBtn.dataset.altname);
                        altBtn.style.background = "";
                    } else {
                        // Quedó en alternativa → marcar swapped, guardar altid actual para poder ciclar
                        altBtn.dataset.swapped = "1";
                        altBtn.dataset.altid   = useId;
                        altBtn.title = "Volver a: " + origName;
                        altBtn.style.background = "rgba(252,221,9,0.25)";
                    }
                    return;
                }
                // Ícono lápiz → editar tiempos
                var editIcon = e.target.closest(".exercise-edit-icon");
                if (editIcon) {
                    var idx     = parseInt(editIcon.dataset.index);
                    var exEntry = r.exercises[idx];
                    var lib2    = getExById(typeof exEntry === "string" ? exEntry : exEntry.id);
                    if (!lib2) return;
                    var rehabOn = (document.getElementById("rmt-" + r.id) || {}).checked;
                    var phases  = (typeof exEntry === "object" && exEntry.customPhases)
                        ? exEntry.customPhases : (rehabOn && lib2.rehab ? lib2.rehab.phases : lib2.phases);
                    editingExIndex = idx; editingTarget = "inline-" + r.id;
                    document.getElementById("editTimesTitle").innerText = "Tiempos: " + lib2.name;
                    document.getElementById("editEccentric").value  = phases.eccentric;
                    document.getElementById("editIsometric").value  = phases.isometric;
                    document.getElementById("editConcentric").value = phases.concentric;
                    document.getElementById("editRest").value       = phases.rest;
                    document.getElementById("editTimesModal").style.display = "flex";
                }
            });
        }
        var rmtEl = document.getElementById("rmt-" + r.id);
        if (rmtEl) {
            rmtEl.addEventListener("change", function () {
                rehabModeActive = rmtEl.checked;
                var rmh = document.getElementById("rmh-" + r.id);
                if (rmh) rmh.className = "rehab-mode-hint" + (rehabModeActive ? " active" : "");
                refreshExListInDetail(r);
            });
        }
        var startBtn = document.getElementById("startBtn-" + r.id);
        if (startBtn) { startBtn.addEventListener("click", function () { initAudio(); startTrainingFromInline(r); }); }
    }

    function startTrainingFromInline(r) {
        var gsEl  = document.getElementById("gs-"  + r.id);
        var grEl  = document.getElementById("gr-"  + r.id);
        var gwEl  = document.getElementById("gw-"  + r.id);
        var gerEl = document.getElementById("ger-" + r.id);
        var rmtEl = document.getElementById("rmt-" + r.id);
        var seriesVal = gsEl  ? (parseInt(gsEl.value)   || 3)  : (r.seriesPerEx || 3);
        var repsVal   = grEl  ? (parseInt(grEl.value)   || 10) : (r.repsPerEx   || 10);
        var weightVal = gwEl  ? (parseFloat(gwEl.value) || userWeight) : userWeight;
        var gerVal    = gerEl ? (parseInt(gerEl.value)  || 90) : 90;
        var rehabOn   = rmtEl ? rmtEl.checked : false;
        userWeight = weightVal; localStorage.setItem("userWeight", weightVal);
        BETWEEN_EXERCISE_REST = Math.max(0, gerVal);
        var exercises = r.exercises.map(function (ex) {
            var exId = typeof ex === "string" ? ex : ex.id;
            var lib  = getExById(exId); if (!lib) return null;
            var customPh = (typeof ex === "object" && ex.customPhases) ? ex.customPhases : null;
            var phases   = customPh ? customPh : (rehabOn && lib.rehab ? lib.rehab.phases : lib.phases);
            var pureIso  = (phases.eccentric === 0 && phases.concentric === 0 && phases.isometric > 0);
            return { id: exId, name: lib.name, series: seriesVal, reps: pureIso ? 1 : repsVal,
                phases: phases, caloriesPerMinute: lib.caloriesPerMinute || 6, rehabMode: rehabOn && !!lib.rehab };
        }).filter(Boolean);
        if (!exercises.length) { alert("Sin ejercicios válidos"); return; }
        currentRoutine = { id: r.id, name: r.name, exercises: exercises, isRehab: rehabOn, daysPerWeek: r.daysPerWeek || 3 };
        resetTrainingState();
        trainingActive = true; workoutStartTime = Date.now();
        requestWakeLock();
        var modal = document.getElementById("trainingModal");
        if (modal) modal.style.display = "flex";
        updateCountersUI();
        var mainContent = document.getElementById("mainTrainingContent");
        var modalBtns   = document.getElementById("trainingModalBtns");
        if (mainContent) mainContent.style.display = "none";
        if (modalBtns)   modalBtns.style.display   = "none";
        // Pantalla INICIAR (fixed sobre todo)
        var oldSS = document.getElementById("startScreen");
        if (oldSS && oldSS.parentElement) oldSS.parentElement.removeChild(oldSS);
        var estMin = calculateRoutineDurationFromR(r, seriesVal, repsVal);
        var startScreen = document.createElement("div");
        startScreen.id = "startScreen";
        startScreen.style.cssText = "position:fixed;inset:0;z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 20px;gap:20px;background-image:url('img/fondo2.png');background-size:cover;background-position:center;";
        startScreen.innerHTML = '<div style="font-size:4rem;">🏋️</div>'
            + '<div style="font-size:1.25rem;font-weight:900;color:#f1f5f9;letter-spacing:0.05em;text-align:center;">LISTO PARA ENTRENAR</div>'
            + '<div style="font-size:0.88rem;color:#94a3b8;text-align:center;line-height:1.8;max-width:280px;">'
            + '<strong style="color:#e2e8f0">' + currentRoutine.name + '</strong><br>'
            + currentRoutine.exercises.length + ' ejercicios · ⏱️ ~' + fmtMin(estMin) + '</div>'
            + '<div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;max-width:300px">'
            + '<div style="background:rgba(218,18,26,0.12);border:1px solid rgba(218,18,26,0.25);border-radius:12px;padding:8px 14px;text-align:center;font-size:0.68rem;"><span style="display:block;font-size:1.1rem">⬇️</span>Excéntrica</div>'
            + '<div style="background:rgba(252,221,9,0.1);border:1px solid rgba(252,221,9,0.25);border-radius:12px;padding:8px 14px;text-align:center;font-size:0.68rem;"><span style="display:block;font-size:1.1rem">⏸️</span>Pausa</div>'
            + '<div style="background:rgba(7,137,48,0.12);border:1px solid rgba(7,137,48,0.25);border-radius:12px;padding:8px 14px;text-align:center;font-size:0.68rem;"><span style="display:block;font-size:1.1rem">⬆️</span>Concéntrica</div>'
            + '</div>'
            + '<button id="playAudioBtn" style="margin-top:8px;background:linear-gradient(135deg,#22c55e,#16a34a);color:white;border:none;border-radius:40px;font-size:1.2rem;font-weight:800;padding:18px 48px;cursor:pointer;letter-spacing:0.05em;box-shadow:0 6px 32px rgba(34,197,94,0.45);width:100%;max-width:280px;">▶ INICIAR</button>'
            + '<p style="font-size:0.62rem;color:#475569;text-align:center">El audio se activa al presionar INICIAR</p>';
        document.body.appendChild(startScreen);
        document.getElementById("playAudioBtn").addEventListener("click", function (e) {
            e.stopPropagation(); initAudio(); warmUpTTS();
            var ss = document.getElementById("startScreen");
            if (ss && ss.parentElement) ss.parentElement.removeChild(ss);
            if (mainContent) mainContent.style.display = "";
            if (modalBtns)   modalBtns.style.display   = "";
            setTimeout(function () { startInitialCountdown(); }, 150);
        });
    }

    function refreshExListInDetail(r) {
        var exListEl = document.getElementById("exlist-" + r.id);
        if (!exListEl) return;
        var rehabOn = rehabModeActive;
        exListEl.innerHTML = r.exercises.map(function (ex, i) {
            var lib = getExById(typeof ex === "string" ? ex : ex.id); if (!lib) return "";
            var phases  = (typeof ex === "object" && ex.customPhases) ? ex.customPhases : (rehabOn && lib.rehab ? lib.rehab.phases : lib.phases);
            var isRehab = rehabOn && !!lib.rehab;
            var unilateralBadge = lib.unilateral ? '<span class="bilateral-badge">↕ unilateral</span>' : "";
            var altLib  = getAltForExercise(lib, r.exercises);
            var altBadge = altLib ? '<button class="alt-swap-btn" data-exindex="' + i + '" data-origid="' + lib.id + '" data-altid="' + altLib.id + '" data-altname="' + altLib.name + '" data-origname="' + lib.name + '" data-swapped="0" title="Cambiar por: ' + altLib.name + '">🔄 Alt.</button>' : "";
            return '<div class="exercise-item ' + (isRehab ? "rehab-mode" : "") + '" data-index="' + i + '">'
                + '<div style="flex:1;min-width:0"><div class="exercise-name">'
                + '<span class="ex-name-link" data-exid="' + lib.id + '">' + lib.name + (isRehab ? " 🏥" : "") + '</span>'
                + unilateralBadge + altBadge + '</div>'
                + '<div class="exercise-times ' + (isRehab ? "rehab" : "") + '">⬇️' + phases.eccentric
                + 's · ⏸️' + phases.isometric + 's · ⬆️' + phases.concentric + 's · 💤' + phases.rest + 's</div></div>'
                + '<span class="exercise-edit-icon" data-index="' + i + '">✏️</span></div>';
        }).join("");
    }

    // ════════════════════════════════════════════════════════════════════
    // LOOP DE ENTRENAMIENTO
    // Secuencia completa:
    // [10s countdown] → baja/mantén/sube × reps → fin serie N/total
    // → descanso (30s aviso, 10s aviso dentro del descanso, 3-2-1)
    // → [nuevo 10s countdown EN EL DESCANSO ya terminó] → baja/mantén/sube...
    // Si se salta el descanso: si quedan >10s → salta a los últimos 10s del descanso
    //                          si quedan ≤10s → arranca ejercicio directo
    // ════════════════════════════════════════════════════════════════════

    // Arranca el countdown de 10s para el ejercicio actual
    function startInitialCountdown() {
        var ex = currentRoutine && currentRoutine.exercises[currentExerciseIndex];
        if (!ex) { endWorkout(); return; }
        var libEx = getExById(ex.id);
        var isUnilateral = libEx && libEx.unilateral;
        if (isUnilateral && currentSide === null) currentSide = "right";
        else if (!isUnilateral) currentSide = null;
        var men = document.getElementById("modalExerciseName");
        if (men) men.innerText = ex.name + (ex.rehabMode ? " 🏥" : "");
        var si = document.getElementById("sideIndicator");
        if (si) {
            if (isUnilateral && currentSide) {
                si.style.display = "inline-flex";
                si.className = "side-indicator " + currentSide;
                si.innerText = currentSide === "right" ? "🟢 LADO DERECHO" : "🔵 LADO IZQUIERDO";
            } else { si.style.display = "none"; }
        }
        var cc = document.getElementById("countdownContainer");
        var ib = document.getElementById("instructionBox");
        var mc = document.getElementById("mainTrainingContent");
        if (mc) mc.style.display = "block";
        if (cc) cc.style.display = "flex";
        if (ib) ib.style.display = "none";
        isInitialCountdown = true;
        isResting = false;
        isBetweenExerciseRest = false;
        _transitioning = false;
        _lastPhaseClass = "";
        tenSecPrepSpoken = false;
        totalDuration = 10;
        phaseTimeLeft = 10;
        phaseStartTime = Date.now();
        lastBeepSecond = 11;
        updateCountersUI();
        updateTrainingPhaseImages(ex.id);
        stopWorkerInterval();
        startWorkerInterval();
    }

    function startCurrentExercise() {
        var ex = currentRoutine.exercises[currentExerciseIndex];
        if (!ex) { endWorkout(); return; }
        var libEx = getExById(ex.id);
        var isUnilateral = libEx && libEx.unilateral;
        if (isUnilateral && currentSide === null) currentSide = "right";
        else if (!isUnilateral) currentSide = null;
        var men = document.getElementById("modalExerciseName");
        if (men) men.innerText = ex.name + (ex.rehabMode ? " 🏥" : "");
        var si = document.getElementById("sideIndicator");
        if (si) {
            if (isUnilateral && currentSide) {
                si.style.display = "inline-flex";
                si.className = "side-indicator " + currentSide;
                si.innerText = currentSide === "right" ? "🟢 LADO DERECHO" : "🔵 LADO IZQUIERDO";
            } else { si.style.display = "none"; si.innerText = ""; }
        }
        var cc = document.getElementById("countdownContainer");
        var ib = document.getElementById("instructionBox");
        if (cc) cc.style.display = "none";
        if (ib) ib.style.display = "flex";
        updateCountersUI();
        currentPhase = getStartPhase(ex.id, ex.phases);
        updateTrainingPhaseImages(ex.id);
        
        startPhase();
    }

    function startPhase() {
        _transitioning = false;
        if (isResting || isInitialCountdown) return;
        var ex = currentRoutine.exercises[currentExerciseIndex];
        var phases = ex.phases;
        var dur = 0;
        if (currentPhase === "eccentric")       dur = phases.eccentric  || 0;
        else if (currentPhase === "isometric")  dur = phases.isometric  || 0;
        else if (currentPhase === "concentric") dur = phases.concentric || 0;
        if (dur <= 0) { setTimeout(nextPhase, 10); return; }
        if (currentPhase === "eccentric")       { playRhythmEccentric();  speakPhase("eccentric");  }
        else if (currentPhase === "isometric")  { playRhythmIsometric();  speakPhase("isometric");  }
        else if (currentPhase === "concentric") { playRhythmConcentric(); speakPhase("concentric"); }
        totalDuration = dur; phaseTimeLeft = dur; phaseStartTime = Date.now();
        lastBeepSecond = dur + 1;
        updatePhaseUI();
        stopWorkerInterval();
        startWorkerInterval();
    }

    function updateTrainingTimer() {
        if (!trainingActive || trainingPaused) return;
        var now     = Date.now();
        var elapsed = (now - phaseStartTime) / 1000;
        var rem     = totalDuration - elapsed;
        var ceilRem = Math.ceil(rem);

        if (isInitialCountdown) {
            if (rem <= 0) {
                stopWorkerInterval();
                isInitialCountdown = false;
                var cc = document.getElementById("countdownContainer");
                var ib = document.getElementById("instructionBox");
                if (cc) cc.style.display = "none";
                if (ib) ib.style.display = "flex";
                playPhaseStart();
                startCurrentExercise();
            } else {
                phaseTimeLeft = rem;
                updateCountdownUI(ceilRem);
                if (ceilRem < lastBeepSecond) {
                    lastBeepSecond = ceilRem;
                    playCountdownBeep(ceilRem === 1);
                    if (ceilRem <= 3) syncSpeakCountdown(ceilRem);
                }
            }
            return;
        }

        if (isResting || isBetweenExerciseRest) {
            if (rem <= 0) {
                stopWorkerInterval();
                clearRestSpeech();
                var wasResting = isResting;
                isResting = false;
                isBetweenExerciseRest = false;
                playRestEnd();
                // Al terminar descanso, arrancar ejercicio directo (el 10s ya se habló dentro del descanso)
                startCurrentExercise();
            } else {
                restTimeLeft = rem;
                if (isResting) updateRestUI();
                else updateBetweenExRestUI();
                if (ceilRem <= 3 && ceilRem > 0 && ceilRem < lastBeepSecond) {
                    lastBeepSecond = ceilRem;
                    playRestAlert();
                }
            }
            return;
        }

        if (rem <= 0) {
            stopWorkerInterval();
            _transitioning = false;
            playPhaseEnd();
            nextPhase();
        } else {
            phaseTimeLeft = rem;
            if (ceilRem < lastBeepSecond && ceilRem > 0) {
                lastBeepSecond = ceilRem;
                playSecondBeep();
            }
            updatePhaseUI();
        }
    }

    function nextPhase() {
        if (isResting || isInitialCountdown) return;
        if (_transitioning) return;
        _transitioning = true;
        var ex = currentRoutine.exercises[currentExerciseIndex];
        var startPh = getStartPhase(ex.id, ex.phases);
        if (startPh === "isometric") { _transitioning = false; finishRepetition(); return; }
        if (startPh === "concentric") {
            if      (currentPhase === "concentric") { currentPhase = "isometric";  playPhaseStart(); _transitioning = false; startPhase(); }
            else if (currentPhase === "isometric")  { currentPhase = "eccentric";  playPhaseStart(); _transitioning = false; startPhase(); }
            else { _transitioning = false; finishRepetition(); }
        } else {
            if      (currentPhase === "eccentric")  { currentPhase = "isometric";  playPhaseStart(); _transitioning = false; startPhase(); }
            else if (currentPhase === "isometric")  { currentPhase = "concentric"; playPhaseStart(); _transitioning = false; startPhase(); }
            else { _transitioning = false; finishRepetition(); }
        }
    }

    function finishRepetition() {
        if (_transitioning) return;
        _transitioning = true;
        var ex = currentRoutine.exercises[currentExerciseIndex];
        updateCountersUI();
        if (currentRep < (ex.reps || 10)) {
            currentRep++;
            currentPhase = getStartPhase(ex.id, ex.phases);
            playPhaseStart();
            _transitioning = false;
            startPhase();
        } else { _transitioning = false; finishSet(); }
    }

    function finishSet() {
        completedSeries.push({ set: currentSet, reps: currentRep, weight: userWeight });
        var csl = document.getElementById("completedSeriesList");
        if (csl) {
            csl.innerHTML = "<h4>✅ Series completadas:</h4>"
                + completedSeries.map(function (s) {
                    return '<span class="series-badge">S' + s.set + ' · ' + s.reps + 'r · ' + s.weight + 'kg</span>';
                }).join("");
        }
        var ex    = currentRoutine.exercises[currentExerciseIndex];
        var libEx = getExById(ex.id);
        var isUnilateral = libEx && libEx.unilateral;

        if (isUnilateral && currentSide === "right") {
            currentSide = "left";
            currentRep  = 1;
            currentPhase = getStartPhase(ex.id, ex.phases);
            tenSecPrepSpoken = false;
            startRestWithCountdown(15, ex.name, true, "left");
            updateCountersUI();
            return;
        }
        if (isUnilateral) currentSide = "right";

        if (currentSet < (ex.series || 3)) {
            currentSet++;
            currentRep   = 1;
            currentPhase = getStartPhase(ex.id, ex.phases);
            tenSecPrepSpoken = false;
            // Descanso entre series: el aviso de 10s está DENTRO del descanso
            startRestWithCountdown(ex.phases.rest || 90, ex.name, true, currentSide);
        } else {
            nextExercise();
        }
        updateCountersUI();
    }

    // startRestWithCountdown: inicia el descanso. El aviso de 10s ocurre DENTRO de la cuenta
    function startRestWithCountdown(seconds, exName, isSameEx, side) {
        isResting             = true;
        isBetweenExerciseRest = false;
        isInitialCountdown    = false;
        _transitioning        = false;
        _lastPhaseClass       = "";
        restTimeLeft  = seconds;
        totalDuration = seconds;
        phaseStartTime = Date.now();
        lastBeepSecond = seconds + 1;
        clearRestSpeech();
        playRestAlert();
        // Anuncio inicial de descanso
        if (isSameEx) {
            // Cambio de lado (unilateral) o descanso entre series
            if (side === "left") {
                speak("Descansa. Lado izquierdo.");
            } else if (side === "right") {
                var totalSeries = currentRoutine.exercises[currentExerciseIndex].series || 3;
                speak("Descansa. Serie " + currentSet + " de " + totalSeries + ". Lado derecho.");
            } else {
                speak("Descansa. Serie " + currentSet + " de " + (currentRoutine.exercises[currentExerciseIndex].series || 3) + ".");
            }
        } else {
            speak("Descansa. Próximo: " + (exName || ""));
        }
        // Programar: 30s, 10s y 3-2-1 dentro del descanso
        scheduleRestSpeech(seconds, exName, isSameEx, side);
        stopWorkerInterval();
        startWorkerInterval();
        updateRestUI();
    }

    function nextExercise() {
        if (currentExerciseIndex + 1 < currentRoutine.exercises.length) {
            currentExerciseIndex++;
            currentSet  = 1; currentRep = 1;
            isResting   = false; currentSide = null;
            completedSeries = []; tenSecPrepSpoken = false;
            _transitioning  = false; _lastPhaseClass = "";
            var csl = document.getElementById("completedSeriesList");
            if (csl) csl.innerHTML = "";
            updateCountersUI();
            var nextEx = currentRoutine.exercises[currentExerciseIndex];
            // Descanso entre ejercicios: igual, el 10s está DENTRO del descanso
            startBetweenExerciseRest(BETWEEN_EXERCISE_REST, nextEx ? nextEx.name : null);
        } else { endWorkout(); }
    }

    function startBetweenExerciseRest(seconds, nextExName) {
        isBetweenExerciseRest = true;
        isResting             = false;
        isInitialCountdown    = false;
        _transitioning        = false;
        _lastPhaseClass       = "";
        restTimeLeft  = seconds;
        totalDuration = seconds;
        phaseStartTime = Date.now();
        lastBeepSecond = seconds + 1;
        tenSecPrepSpoken = false;
        clearRestSpeech();
        var cc  = document.getElementById("countdownContainer");
        var ib2 = document.getElementById("instructionBox");
        if (cc)  cc.style.display  = "none";
        if (ib2) ib2.style.display = "flex";
        playRestAlert();
        // Determinar el lado del próximo ejercicio
        var nextEx   = currentRoutine && currentRoutine.exercises[currentExerciseIndex];
        var nextLib  = nextEx ? getExById(nextEx.id) : null;
        var nextSide = (nextLib && nextLib.unilateral) ? "right" : null;
        speakBetweenRest(nextExName, nextSide);
        scheduleRestSpeech(seconds, nextExName, false, nextSide);
        stopWorkerInterval();
        startWorkerInterval();
        updateBetweenExRestUI();
    }

    // ── Controles ─────────────────────────────────────────────────────────

    function pauseTraining() {
        if (!trainingActive) return;
        trainingPaused = !trainingPaused;
        var pb = document.getElementById("pauseTrainingBtn");
        if (trainingPaused) {
            if (pb) pb.innerText = "▶️ Reanudar";
            clearRestSpeech();
            phaseTimeLeft = totalDuration - ((Date.now() - phaseStartTime) / 1000);
            stopWorkerInterval();
            releaseWakeLock();
        } else {
            if (pb) pb.innerText = "⏸️ Pausar";
            phaseStartTime = Date.now() - ((totalDuration - phaseTimeLeft) * 1000);
            if (isResting || isBetweenExerciseRest) {
                var ex2  = currentRoutine && currentRoutine.exercises[currentExerciseIndex];
                var nm   = ex2 ? ex2.name : null;
                var same = isResting;
                scheduleRestSpeech(Math.ceil(phaseTimeLeft), nm, same, currentSide);
            }
            playPhaseStart();
            startWorkerInterval();
            requestWakeLock();
        }
    }

    function stopTraining() {
        if (!trainingActive) return;
        if (!confirm("¿Detener el entrenamiento actual? No se guardarán estadísticas.")) return;
        resetTrainingState();
        var modal = document.getElementById("trainingModal");
        if (modal) modal.style.display = "none";
    }

    // skipPhase: durante descanso → si >10s restantes, salta a los últimos 10s;
    //            si ≤10s, arranca ejercicio directo
    function skipPhase() {
        if (!trainingActive || trainingPaused || isInitialCountdown) return;
        if (_transitioning) return;
        stopWorkerInterval();
        clearRestSpeech();
        if (isResting || isBetweenExerciseRest) {
            var timeLeft = totalDuration - ((Date.now() - phaseStartTime) / 1000);
            if (timeLeft > 10) {
                // Saltar a los últimos 10 segundos del descanso
                restTimeLeft  = 10;
                totalDuration = 10;
                phaseStartTime = Date.now();
                lastBeepSecond = 11;
                _lastPhaseClass = "";
                var exName = (currentRoutine.exercises[currentExerciseIndex] || {}).name || "";
                speakTenSecRest(exName, currentSide, isResting);
                scheduleRestSpeech(10, exName, isResting, currentSide);
                stopWorkerInterval();
                startWorkerInterval();
            } else {
                // Ya estamos en los últimos 10s, arrancar ejercicio directo
                isResting = false;
                isBetweenExerciseRest = false;
                _lastPhaseClass = "";
                playRestEnd();
                startCurrentExercise();
            }
        } else {
            _transitioning = false;
            playPhaseEnd();
            nextPhase();
        }
    }

    // skipExercise: salta al siguiente ejercicio con countdown de 10s
    function skipExercise() {
        if (!trainingActive || trainingPaused) return;
        stopWorkerInterval(); clearRestSpeech();
        _transitioning = false; _lastPhaseClass = "";
        var totalEx = currentRoutine.exercises.length;
        if (currentExerciseIndex + 1 < totalEx) {
            currentExerciseIndex++;
            currentSet = 1; currentRep = 1;
            isResting = false; isBetweenExerciseRest = false; isInitialCountdown = false;
            currentSide = null; completedSeries = [];
            tenSecPrepSpoken = false; lastBeepSecond = -1;
            var csl = document.getElementById("completedSeriesList");
            if (csl) csl.innerHTML = "";
            speak("Siguiente ejercicio");
            startInitialCountdown();
        } else { endWorkout(); }
    }

    // skipSet: salta la serie actual, arranca la siguiente con countdown de 10s
    function skipSet() {
        if (!trainingActive || trainingPaused) return;
        stopWorkerInterval(); clearRestSpeech();
        isResting = false; isBetweenExerciseRest = false; isInitialCountdown = false;
        _transitioning = false; _lastPhaseClass = "";
        tenSecPrepSpoken = false; lastBeepSecond = -1;
        var ex = currentRoutine.exercises[currentExerciseIndex];
        completedSeries.push({ set: currentSet, reps: currentRep, weight: userWeight });
        var csl = document.getElementById("completedSeriesList");
        if (csl) {
            csl.innerHTML = "<h4>✅ Series:</h4>"
                + completedSeries.map(function (s) { return '<span class="series-badge">S' + s.set + ' · ' + s.reps + 'r</span>'; }).join("");
        }
        if (currentSet < (ex.series || 3)) {
            currentSet++;
            currentRep   = 1;
            currentPhase = getStartPhase(ex.id, ex.phases);
            speak("Serie " + currentSet);
            startInitialCountdown();
        } else {
            speak("Último set completado");
            nextExercise();
        }
    }

    function endWorkout() {
        if (!trainingActive) return;
        var durMs  = Date.now() - workoutStartTime;
        var durMin = Math.round(durMs / 60000);
        if (durMin < 1 && durMs > 10000) durMin = 1;
        var cal = currentRoutine.exercises.reduce(function (sum, ex) {
            var tRep     = (ex.phases.eccentric || 0) + (ex.phases.isometric || 0) + (ex.phases.concentric || 0);
            var tsActive = tRep * (ex.reps || 10) * (ex.series || 3);
            return sum + (tsActive / 60) * (ex.caloriesPerMinute || 6) * (userWeight / 70);
        }, 0);
        stats.totalWorkouts++; stats.totalMinutes += durMin; stats.totalCalories += Math.round(cal);
        updateStreak();
        stats.history.unshift({ date: new Date().toISOString(), routineName: currentRoutine.name, duration: durMin, calories: Math.round(cal) });
        if (stats.history.length > 20) stats.history.pop();
        saveStats();
        playCompleteBeep();
        if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
        var rName = currentRoutine.name;
        resetTrainingState();
        var modal = document.getElementById("trainingModal");
        if (modal) modal.style.display = "none";
        setTimeout(function () {
            showAwardAnimation("workout_complete", rName, durMin, Math.round(cal));
        }, 300);
    }

    function showAwardAnimation(type, name, durMin, cal) {
        var overlay = document.createElement("div");
        overlay.style.cssText = "position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.88);backdrop-filter:blur(8px);";
        overlay.innerHTML = '<div style="text-align:center;padding:32px 24px;max-width:340px;animation:awardPop 0.5s cubic-bezier(0.175,0.885,0.32,1.275)">'
            + '<div style="font-size:5rem;margin-bottom:16px;filter:drop-shadow(0 0 20px rgba(252,221,9,0.8));">🎉</div>'
            + '<div style="font-size:1.2rem;font-weight:900;color:#fcdd09;letter-spacing:0.06em;margin-bottom:8px;">¡ENTRENAMIENTO COMPLETADO!</div>'
            + '<div style="font-size:0.85rem;color:#94a3b8;margin-bottom:6px;">' + (name || "") + '</div>'
            + '<div style="font-size:0.78rem;color:#64748b;margin-bottom:20px;">⏱️ ' + (durMin || 0) + ' min · 🔥 ' + (cal || 0) + ' kcal aprox.</div>'
            + '<button onclick="this.parentElement.parentElement.remove()" style="background:linear-gradient(135deg,#078930,#056b26);color:#fff;border:none;border-radius:40px;padding:12px 36px;font-size:1rem;font-weight:700;cursor:pointer;">¡GENIAL!</button>'
            + '</div>';
        var style = document.createElement("style");
        style.textContent = "@keyframes awardPop{from{transform:scale(0.3) rotate(-10deg);opacity:0}to{transform:scale(1) rotate(0);opacity:1}}";
        document.head.appendChild(style);
        document.body.appendChild(overlay);
        setTimeout(function () { if (overlay.parentElement) overlay.parentElement.removeChild(overlay); }, 8000);
    }

    function saveEditTimes() {
        var ecc  = parseInt(document.getElementById("editEccentric").value)  || 0;
        var iso  = parseInt(document.getElementById("editIsometric").value)  || 0;
        var con  = parseInt(document.getElementById("editConcentric").value) || 0;
        var rest = parseInt(document.getElementById("editRest").value)       || 0;
        if (ecc + iso + con <= 0 && rest <= 0) { alert("Tiempos inválidos"); return; }
        var newPhases = { eccentric: ecc, isometric: iso, concentric: con, rest: rest };
        if (editingTarget === "create" && editingExIndex !== null) {
            selectedExercisesForCreate[editingExIndex].customPhases = newPhases;
            renderSelectedExercises();
        } else if (editingTarget && editingTarget.indexOf("inline-") === 0 && currentDetailRoutine && editingExIndex !== null) {
            var ex = currentDetailRoutine.exercises[editingExIndex];
            currentDetailRoutine.exercises[editingExIndex] = typeof ex === "string"
                ? { id: ex, customPhases: newPhases }
                : Object.assign({}, ex, { customPhases: newPhases });
            refreshExListInDetail(currentDetailRoutine);
        }
        document.getElementById("editTimesModal").style.display = "none";
        editingExIndex = null; editingTarget = null;
    }

    function renderCustomRoutinesList() {
        var list = document.getElementById("customRoutinesList");
        if (!list) return;
        var customs = window.customRoutines || [];
        if (!customs.length) { list.innerHTML = '<div class="empty-message">Aún no tienes rutinas guardadas</div>'; return; }
        list.innerHTML = customs.map(function (r) {
            return '<div class="routine-card custom" data-id="' + r.id + '"><h4>' + r.name + '</h4><p>'
                + (r.description || "") + '</p><small>📅 ' + (r.daysPerWeek || 3) + 'd · '
                + r.exercises.length + ' ej · ' + r.difficulty + '</small>'
                + '<button class="delete-btn" data-id="' + r.id + '">🗑</button></div>';
        }).join("");
        list.querySelectorAll(".routine-card").forEach(function (card) {
            card.addEventListener("click", function (e) {
                if (e.target.classList.contains("delete-btn")) return;
                var r = window.customRoutines.find(function (x) { return x.id === card.dataset.id; });
                if (r) { var btn = document.querySelector('[data-tab="training"]'); if (btn) btn.click(); setTimeout(function () { toggleInlineDetail(r.id); }, 120); }
            });
        });
        list.querySelectorAll(".delete-btn").forEach(function (btn) {
            btn.addEventListener("click", function (e) {
                e.stopPropagation();
                if (confirm("¿Eliminar esta rutina?")) { window.deleteCustomRoutine(btn.dataset.id); renderCustomRoutinesList(); renderRoutinesList(); }
            });
        });
    }

    function initExerciseSearch() {
        var input   = document.getElementById("exerciseSearch");
        var results = document.getElementById("exerciseSearchResults");
        if (!input || !results || input._bound) return;
        input._bound = true;
        input.addEventListener("input", function () {
            var q = input.value.toLowerCase().trim();
            if (!q) { results.innerHTML = ""; return; }
            var matches = (window.exerciseLibrary || []).filter(function (e) {
                return e.name.toLowerCase().includes(q) || e.targetMuscles.join(" ").toLowerCase().includes(q);
            }).slice(0, 8);
            if (!matches.length) { results.innerHTML = '<div class="search-no-results">No encontrado</div>'; return; }
            results.innerHTML = matches.map(function (e) {
                return '<div class="search-result-item" data-id="' + e.id + '">'
                    + '<div class="search-result-name">' + e.name
                    + '<span class="search-result-muscle">' + e.targetMuscles.join(", ") + '</span></div>'
                    + '<span class="add-icon">+</span></div>';
            }).join("");
            results.querySelectorAll(".search-result-item").forEach(function (item) {
                item.addEventListener("click", function () {
                    var ex = window.exerciseLibrary.find(function (e) { return e.id === item.dataset.id; });
                    if (ex && !selectedExercisesForCreate.find(function (x) { return x.id === ex.id; })) {
                        var ecc = parseInt((document.getElementById("defaultEccentric")  || {}).value) || 3;
                        var iso = parseInt((document.getElementById("defaultIsometric")  || {}).value) || 1;
                        var con = parseInt((document.getElementById("defaultConcentric") || {}).value) || 2;
                        var rst = parseInt((document.getElementById("defaultRest")       || {}).value) || 90;
                        selectedExercisesForCreate.push(Object.assign({}, ex, { customPhases: { eccentric: ecc, isometric: iso, concentric: con, rest: rst } }));
                        renderSelectedExercises(); input.value = ""; results.innerHTML = "";
                    } else if (ex) { alert("El ejercicio ya está añadido"); }
                });
            });
        });
    }

    function renderSelectedExercises() {
        var container = document.getElementById("selectedExercises");
        if (!container) return;
        if (!selectedExercisesForCreate.length) { container.innerHTML = '<div class="empty-hint">Busca y añade ejercicios arriba</div>'; return; }
        container.innerHTML = selectedExercisesForCreate.map(function (e, i) {
            return '<div class="selected-ex-item">'
                + '<div class="selected-ex-left"><span class="selected-ex-name">' + e.name + '</span>'
                + '<span class="selected-ex-times">⬇️' + e.customPhases.eccentric + 's · ⏸️'
                + e.customPhases.isometric + 's · ⬆️' + e.customPhases.concentric + 's · 💤'
                + e.customPhases.rest + 's</span></div>'
                + '<div class="selected-ex-actions">'
                + '<button class="edit-ex-btn" data-i="' + i + '">✏️</button>'
                + '<button class="remove-ex"   data-i="' + i + '">×</button></div></div>';
        }).join("");
        container.querySelectorAll(".edit-ex-btn").forEach(function (btn) {
            btn.addEventListener("click", function (e) {
                e.stopPropagation();
                var idx = parseInt(btn.dataset.i); var ex = selectedExercisesForCreate[idx];
                editingExIndex = idx; editingTarget = "create";
                document.getElementById("editTimesTitle").innerText = "Tiempos: " + ex.name;
                document.getElementById("editEccentric").value  = ex.customPhases.eccentric;
                document.getElementById("editIsometric").value  = ex.customPhases.isometric;
                document.getElementById("editConcentric").value = ex.customPhases.concentric;
                document.getElementById("editRest").value       = ex.customPhases.rest;
                document.getElementById("editTimesModal").style.display = "flex";
            });
        });
        container.querySelectorAll(".remove-ex").forEach(function (btn) {
            btn.addEventListener("click", function (e) { e.stopPropagation(); selectedExercisesForCreate.splice(parseInt(btn.dataset.i), 1); renderSelectedExercises(); });
        });
    }

    function saveNewRoutine() {
        var name = (document.getElementById("newRoutineName") || {}).value.trim();
        if (!name) { alert("Ponle un nombre a la rutina"); return; }
        if (!selectedExercisesForCreate.length) { alert("Añade al menos un ejercicio"); return; }
        var newRoutine = {
            id: "custom_" + Date.now(), name: name,
            description: (document.getElementById("newRoutineDesc")      || {}).value || "Rutina personalizada",
            gender: "both",
            daysPerWeek: parseInt((document.getElementById("newRoutineDays") || {}).value) || 3,
            difficulty:  (document.getElementById("newRoutineDifficulty") || {}).value  || "intermedio",
            category: "personalizada",
            exercises: selectedExercisesForCreate.map(function (e) { return { id: e.id, customPhases: e.customPhases }; }),
            seriesPerEx: 3, repsPerEx: 10
        };
        if (window.saveCustomRoutine(newRoutine)) {
            alert("✅ Rutina \"" + name + "\" guardada");
            if (document.getElementById("newRoutineName")) document.getElementById("newRoutineName").value = "";
            if (document.getElementById("newRoutineDesc")) document.getElementById("newRoutineDesc").value = "";
            selectedExercisesForCreate = [];
            renderSelectedExercises(); renderCustomRoutinesList(); renderRoutinesList();
        } else { alert("Error al guardar la rutina"); }
    }

    function renderRehabProtocols(filter) {
        var list   = document.getElementById("rehabProtocolsList");
        var detail = document.getElementById("rehabDetail");
        if (!list) return;
        if (detail) detail.style.display = "none";
        list.style.display = "grid";
        var protocols = window.rehabProtocols || [];
        var filtered = (filter && filter !== "all") ? protocols.filter(function (p) { return p.injury === filter; }) : protocols;
        if (!filtered.length) { list.innerHTML = '<div class="empty-message">Sin protocolos disponibles</div>'; return; }
        list.innerHTML = filtered.map(function (p) {
            return '<div class="rehab-card" data-id="' + p.id + '"><h4>' + p.name + '</h4><p>'
                + p.description + '</p><div class="rehab-meta">⏱️ ' + p.duration + ' · '
                + p.phases.length + ' fases · ' + p.exercises.length + ' ej.</div></div>';
        }).join("");
        list.querySelectorAll(".rehab-card").forEach(function (card) {
            card.addEventListener("click", function () {
                var p = protocols.find(function (x) { return x.id === card.dataset.id; });
                if (p) showRehabDetail(p);
            });
        });
    }

    function showRehabDetail(protocol) {
        currentRehabProtocol = protocol;
        var list    = document.getElementById("rehabProtocolsList");
        var detail  = document.getElementById("rehabDetail");
        var content = document.getElementById("rehabDetailContent");
        if (!detail || !content) return;
        if (list) list.style.display = "none";
        detail.style.display = "block";
        var html = "<h3 style='margin-bottom:8px'>" + protocol.name + "</h3>"
            + "<p style='font-size:0.8rem;color:#94a3b8;margin-bottom:8px'>" + protocol.description + "</p>"
            + "<div class='rehab-notes-box'>⚠️ Protocolo orientativo. Consulta a tu fisio antes de empezar.</div>"
            + (protocol.scientificBasis ? '<div class="rehab-science-box">📚 ' + protocol.scientificBasis + '</div>' : "");
        protocol.phases.forEach(function (phase) {
            html += "<div class='rehab-phase-section'><div class='rehab-phase-title'>" + phase.name + "</div>";
            phase.exercises.forEach(function (exId) {
                var ex = window.exerciseLibrary ? window.exerciseLibrary.find(function (e) { return e.id === exId; }) : null;
                if (!ex) return;
                var rh = ex.rehab;
                html += "<div class='rehab-ex-item'><div class='rehab-ex-name'><button class='ex-desc-btn' data-exid='" + ex.id + "'>ℹ️</button> " + ex.name + "</div>";
                if (rh) {
                    html += "<div class='rehab-ex-times'>⬇️" + rh.phases.eccentric + "s · ⏸️" + rh.phases.isometric
                        + "s · ⬆️" + rh.phases.concentric + "s · 💤" + rh.phases.rest + "s · " + rh.series + "×" + rh.reps + "</div>";
                    html += "<div class='rehab-ex-note'>" + (rh.notes || "") + "</div>";
                }
                html += "</div>";
            });
            html += "</div>";
        });
        content.innerHTML = html;
        content.querySelectorAll(".ex-desc-btn").forEach(function (btn) {
            btn.addEventListener("click", function () { var lib = getExById(btn.dataset.exid); if (lib) showExerciseDesc(lib); });
        });
        detail.scrollTop = 0;
    }

    function startRehabProtocol() {
        if (!currentRehabProtocol) return;
        initAudio();
        if (!confirm("¿Iniciar este protocolo de readaptación?")) return;
        var exercises = currentRehabProtocol.exercises.map(function (exId) {
            var ex = window.exerciseLibrary ? window.exerciseLibrary.find(function (e) { return e.id === exId; }) : null;
            if (!ex) return null;
            var rh = ex.rehab;
            return { id: ex.id, name: ex.name, series: rh ? rh.series : 3, reps: rh ? rh.reps : 10,
                phases: rh ? rh.phases : ex.phases, caloriesPerMinute: ex.caloriesPerMinute || 4, rehabMode: !!rh };
        }).filter(Boolean);
        currentRoutine = { id: currentRehabProtocol.id, name: currentRehabProtocol.name, exercises: exercises, isRehab: true, daysPerWeek: 3 };
        resetTrainingState();
        trainingActive = true; workoutStartTime = Date.now();
        requestWakeLock();
        var modal = document.getElementById("trainingModal");
        if (modal) modal.style.display = "flex";
        var mainContent = document.getElementById("mainTrainingContent");
        var modalBtns   = document.getElementById("trainingModalBtns");
        if (mainContent) mainContent.style.display = "";
        if (modalBtns)   modalBtns.style.display   = "";
        updateCountersUI();
        setTimeout(function () { startInitialCountdown(); }, 150);
    }

    // ── Modo Recuperación (fatiga) ────────────────────────────────────────
    function injectFatigueSwitch() {
        var target = document.getElementById("training-tab");
        if (!target || document.getElementById("fatigueBlock")) return;
        var block = document.createElement("div");
        block.id        = "fatigueBlock";
        block.className = "fatigue-block";
        block.innerHTML =
            '<div class="fatigue-row">'
            + '<div class="fatigue-label-group">'
            +   '<span class="fatigue-icon">😴</span>'
            +   '<div>'
            +     '<span class="fatigue-title">Modo Recuperación</span>'
            +     '<span class="fatigue-subtitle">Muestra solo rutinas de baja intensidad</span>'
            +   '</div>'
            + '</div>'
            + '<label class="fatigue-switch">'
            +   '<input type="checkbox" id="fatigueToggle">'
            +   '<span class="fatigue-slider"></span>'
            + '</label>'
            + '</div>'
            + '<div id="fatigueBadge" class="fatigue-badge" style="display:none">'
            +   '🔄 Modo Recuperación Activa — Kellmann et al. (2018)'
            + '</div>';
        target.insertBefore(block, target.firstChild);
        var toggle = document.getElementById("fatigueToggle");
        if (toggle) {
            toggle.addEventListener("change", function () {
                _isFatigued = toggle.checked;
                document.getElementById("fatigueBadge").style.display = _isFatigued ? "block" : "none";
                block.classList.toggle("fatigue-active", _isFatigued);
                // Cerrar acordeón abierto antes de re-renderizar
                _accordionOpenId = null; openDetailId = null; currentDetailRoutine = null;
                renderRoutinesList();
                checkAndSuggestRecovery();
            });
        }
    }

    function checkAndSuggestRecovery() {
        // Analizar historial local para detectar 3 sesiones intensas seguidas
        if (document.getElementById("recoverySuggestion")) return;
        var history = stats && stats.history ? stats.history : [];
        if (history.length < 3) return;
        var last3     = history.slice(0, 3);
        var allR      = window.getAllAvailableRoutines ? window.getAllAvailableRoutines("both") : [];
        var intensive = ["Fuerza", "Hipertrofia", "fuerza", "hipertrofia"];
        var count = last3.filter(function (h) {
            var r = allR.find(function (x) { return x.id === (h.routineId || "") || x.name === (h.routineName || ""); });
            return r && intensive.indexOf(r.category) !== -1;
        }).length;
        if (count < 3) return;
        var banner = document.createElement("div");
        banner.id        = "recoverySuggestion";
        banner.className = "recovery-suggestion-banner";
        banner.innerHTML =
            '<div class="recovery-suggestion-content">'
            + '<span class="recovery-suggestion-icon">💡</span>'
            + '<div>'
            +   '<strong>¿Llevas 3 sesiones intensas seguidas?</strong>'
            +   '<p>Kellmann et al. (2018): la recuperación activa acelera la recuperación muscular hasta un 30%.</p>'
            + '</div>'
            + '<button class="recovery-suggestion-btn" id="activateRecoveryBtn">Activar Recuperación</button>'
            + '<button class="recovery-suggestion-close" id="closeRecoverySuggestion">✕</button>'
            + '</div>';
        var trainingTab = document.getElementById("training-tab");
        if (trainingTab) trainingTab.insertBefore(banner, trainingTab.firstChild);
        document.getElementById("activateRecoveryBtn").addEventListener("click", function () {
            _isFatigued = true;
            var t = document.getElementById("fatigueToggle");
            if (t) t.checked = true;
            var fb = document.getElementById("fatigueBadge");
            if (fb) fb.style.display = "block";
            var fbl = document.getElementById("fatigueBlock");
            if (fbl) fbl.classList.add("fatigue-active");
            _accordionOpenId = null; openDetailId = null; currentDetailRoutine = null;
            renderRoutinesList();
            banner.remove();
        });
        document.getElementById("closeRecoverySuggestion").addEventListener("click", function () { banner.remove(); });
    }

    function showSplashScreen(onDone) {
        var splash = document.createElement("div");
        splash.id = "splashScreen";
        splash.innerHTML =
            '<div class="splash-bg"></div>'
            + '<div class="splash-content">'
            +   '<div class="splash-logo-wrap">'
            +     '<img src="img/logo.png" class="splash-logo" alt="Logo" onerror="this.style.display=\'none\'">'
            +     '<div class="splash-ring"></div>'
            +   '</div>'
            +   '<div class="splash-title">TIEMPO DE<span>ENTRENAR</span></div>'
            +   '<div class="splash-tagline">Fuerza · Ciencia · Precisión</div>'
            +   '<div class="splash-bar-wrap"><div class="splash-bar"></div></div>'
            + '</div>';
        document.body.appendChild(splash);
        // Animar la barra de carga
        requestAnimationFrame(function () {
            var bar = splash.querySelector(".splash-bar");
            if (bar) bar.style.width = "100%";
        });
        setTimeout(function () {
            splash.classList.add("splash-fade-out");
            setTimeout(function () {
                if (splash.parentElement) splash.parentElement.removeChild(splash);
                onDone();
            }, 500);
        }, 2200);
    }

    function initIntroScreens() {
        var overlay      = document.getElementById("introOverlay");
        var appContainer = document.getElementById("appContainer");
        if (!overlay) return;
        overlay.style.display = "none";
        if (appContainer) appContainer.style.display = "none";

        showSplashScreen(function () {
            overlay.style.display = "flex";
            showIntroScreen(1);
        });

        var btn1 = document.getElementById("intro1Btn");
        var btn2 = document.getElementById("intro2Btn");
        var btn3 = document.getElementById("intro3Btn");
        if (btn1) btn1.addEventListener("click", function () { initAudio(); warmUpTTS(); showIntroScreen(2); });
        if (btn2) btn2.addEventListener("click", function () { showIntroScreen(3); });
        if (btn3) btn3.addEventListener("click", function () {
            overlay.style.display = "none";
            if (appContainer) appContainer.style.display = "";
            setTimeout(function () { speak("Bienvenido. Elige una rutina para comenzar."); }, 300);
        });
    }
    function showIntroScreen(n) {
        document.querySelectorAll(".intro-screen").forEach(function (s) { s.classList.remove("active"); });
        var target = document.getElementById("intro" + n); if (target) target.classList.add("active");
    }

    // ── Event listeners ───────────────────────────────────────────────────
    var genderMale   = document.getElementById("genderMaleBtn");
    var genderFemale = document.getElementById("genderFemaleBtn");
    var tabs         = document.querySelectorAll(".nav-btn");
    var panels       = document.querySelectorAll(".tab-panel");
    var welcomeTitle = document.getElementById("welcomeTitle");

    function updateGenderUI() {
        if (currentGender === "male") {
            if (genderMale)   genderMale.classList.add("active");
            if (genderFemale) genderFemale.classList.remove("active");
            if (welcomeTitle) welcomeTitle.innerText = "Bienvenido 👨";
        } else {
            if (genderMale)   genderMale.classList.remove("active");
            if (genderFemale) genderFemale.classList.add("active");
            if (welcomeTitle) welcomeTitle.innerText = "Bienvenida 👩";
        }
    }

    function unlockOnFirstInteraction() {
        initAudio(); warmUpTTS();
        document.body.removeEventListener("click",      unlockOnFirstInteraction);
        document.body.removeEventListener("touchstart", unlockOnFirstInteraction);
    }
    document.body.addEventListener("click",      unlockOnFirstInteraction);
    document.body.addEventListener("touchstart", unlockOnFirstInteraction);

    if (genderMale) {
        genderMale.addEventListener("click", function () {
            if (trainingActive) return;
            currentGender = "male"; window.currentGender = "male"; localStorage.setItem("userGender", "male");
            updateGenderUI(); renderRecommendedRoutines(); renderRoutinesList();
        });
    }
    if (genderFemale) {
        genderFemale.addEventListener("click", function () {
            if (trainingActive) return;
            currentGender = "female"; window.currentGender = "female"; localStorage.setItem("userGender", "female");
            updateGenderUI(); renderRecommendedRoutines(); renderRoutinesList();
        });
    }

    tabs.forEach(function (btn) {
        btn.addEventListener("click", function () {
            if (trainingActive) { alert("Termina el entrenamiento primero"); return; }
            var tab = btn.dataset.tab;
            tabs.forEach(function (b)   { b.classList.remove("active"); });
            btn.classList.add("active");
            panels.forEach(function (p) { p.classList.remove("active"); });
            var target = document.getElementById(tab + "-tab");
            if (target) target.classList.add("active");
            if (tab === "training") {
                _accordionOpenId = null; openDetailId = null; currentDetailRoutine = null;
                injectFatigueSwitch();
                renderRoutinesList();
                checkAndSuggestRecovery();
            }
            if (tab === "create")   { renderCustomRoutinesList(); initExerciseSearch(); }
            if (tab === "rehab")    renderRehabProtocols("all");
            if (tab === "progress") updateProgressUI();
        });
    });

    var catF = document.getElementById("categoryFilter");
    var difF = document.getElementById("difficultyFilter");
    if (catF) catF.addEventListener("change", function () { openDetailId = null; currentDetailRoutine = null; renderRoutinesList(); });
    if (difF) difF.addEventListener("change", function () { openDetailId = null; currentDetailRoutine = null; renderRoutinesList(); });

    var closeModalBtn = document.getElementById("closeModalBtn");
    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", function () {
            if (trainingActive) { if (!confirm("¿Salir del entrenamiento?")) return; }
            resetTrainingState();
            var modal = document.getElementById("trainingModal");
            if (modal) modal.style.display = "none";
        });
    }

    var men = document.getElementById("modalExerciseName");
    if (men) {
        men.addEventListener("click", function () {
            if (!trainingActive) return;
            var ex = currentRoutine && currentRoutine.exercises[currentExerciseIndex];
            if (!ex) return;
            var lib = getExById(ex.id); if (lib) showExerciseDesc(lib);
        });
    }

    var ptb  = document.getElementById("pauseTrainingBtn");
    var skb  = document.getElementById("skipPhaseBtn");
    var stpb = document.getElementById("stopTrainingBtn");
    var skExb = document.getElementById("skipExerciseBtn");
    var skSetb = document.getElementById("skipSetBtn");
    if (ptb)   ptb.addEventListener("click",   pauseTraining);
    if (skb)   skb.addEventListener("click",   skipPhase);
    if (stpb)  stpb.addEventListener("click",  stopTraining);
    if (skExb) skExb.addEventListener("click", skipExercise);
    if (skSetb) skSetb.addEventListener("click", skipSet);

    var vtb = document.getElementById("voiceToggleBtn");
    if (vtb) {
        vtb.addEventListener("click", function () {
            voiceEnabled = !voiceEnabled;
            vtb.textContent = voiceEnabled ? "🔊" : "🔇";
            vtb.classList.toggle("muted", !voiceEnabled);
            if (!voiceEnabled) { clearRestSpeech(); ttsQueue = []; ttsSpeaking = false; }
            else { speak("Audio activado"); }
        });
    }

    var rsb = document.getElementById("resetStatsBtn");
    if (rsb) {
        rsb.addEventListener("click", function () {
            if (confirm("¿Borrar todo el progreso?")) {
                stats = { totalWorkouts:0, totalMinutes:0, totalCalories:0, streak:0, lastWorkoutDate:null, history:[], weeklyGoals:{}, achievements:[] };
                saveStats();
            }
        });
    }

    var setb  = document.getElementById("saveEditTimesBtn");
    var cetb  = document.getElementById("cancelEditTimesBtn");
    var cletb = document.getElementById("closeEditTimesBtn");
    if (setb)  setb.addEventListener("click",  saveEditTimes);
    if (cetb)  cetb.addEventListener("click",  function () { document.getElementById("editTimesModal").style.display = "none"; });
    if (cletb) cletb.addEventListener("click", function () { document.getElementById("editTimesModal").style.display = "none"; });

    var cedb = document.getElementById("closeExerciseDescBtn");
    if (cedb) cedb.addEventListener("click", function () { document.getElementById("exerciseDescModal").style.display = "none"; });

    var srb = document.getElementById("saveRoutineBtn");
    var crb = document.getElementById("clearRoutineBtn");
    if (srb) srb.addEventListener("click", saveNewRoutine);
    if (crb) {
        crb.addEventListener("click", function () {
            if (!selectedExercisesForCreate.length) return;
            if (confirm("¿Vaciar la lista?")) { selectedExercisesForCreate = []; renderSelectedExercises(); }
        });
    }

    var rbb  = document.getElementById("rehabBackBtn");
    var srbb = document.getElementById("startRehabBtn");
    if (rbb)  rbb.addEventListener("click", function () {
        document.getElementById("rehabDetail").style.display = "none";
        document.getElementById("rehabProtocolsList").style.display = "grid";
    });
    if (srbb) srbb.addEventListener("click", function () { initAudio(); startRehabProtocol(); });

    document.querySelectorAll(".rehab-filter-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
            document.querySelectorAll(".rehab-filter-btn").forEach(function (b) { b.classList.remove("active"); });
            btn.classList.add("active");
            renderRehabProtocols(btn.dataset.injury);
        });
    });

    initIntroScreens();
    updateGenderUI();
    renderRecommendedRoutines();
    updateStatsUI();
    updateProgressUI();

    var dt = document.getElementById("dailyTip");
    if (dt) dt.innerText = "Tip: ⬇️ Baja controlado · ⏸️ Mantén la tensión · ⬆️ Sube con fuerza";

    // Exponer funciones al scope global
    window.buildInlineDetailHTML  = buildInlineDetailHTML;
    window.bindInlineDetailEvents = bindInlineDetailEvents;
    window.renderRoutinesList     = renderRoutinesList;
    window.FatigueUI = {
        isFatigued:  function ()  { return _isFatigued; },
        setFatigued: function (v) {
            _isFatigued = !!v;
            var t = document.getElementById("fatigueToggle");
            if (t) t.checked = _isFatigued;
            var fb = document.getElementById("fatigueBadge");
            if (fb) fb.style.display = _isFatigued ? "block" : "none";
            var fbl = document.getElementById("fatigueBlock");
            if (fbl) fbl.classList.toggle("fatigue-active", _isFatigued);
            _accordionOpenId = null; openDetailId = null; currentDetailRoutine = null;
            renderRoutinesList();
        }
    };

});
