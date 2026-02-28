import React, { useEffect, useMemo, useState } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from "@ionic/react";
import { MotionService } from "../core/MotionService";
import { TtsService } from "../core/TtsService";
import { HapticsService } from "../core/HapticsService";
import { ArmWorkoutEngine } from "../core/ArmWorkoutEngine";
import type { WorkoutState } from "../core/types";

export const HomePage: React.FC = () => {
  const [state, setState] = useState<WorkoutState | null>(null);

  const engine = useMemo(() => new ArmWorkoutEngine(), []);
  const motion = useMemo(() => new MotionService(), []);
  const tts = useMemo(() => new TtsService(), []);
  const haptic = useMemo(() => new HapticsService(), []);

  useEffect(() => {
    return engine.onChange(setState);
  }, [engine]);

  const start = async () => {
    await tts.speak("เริ่มกายบริหารแขน ยกขึ้นจนสุดแล้วลดลง");
    engine.start();
    await motion.start((s) => engine.process(s));
  };

  const stop = async () => {
    await motion.stop();
    engine.stop();
  };

  const decreaseTarget = () => {
    engine.setTargetReps((state?.targetReps ?? 10) - 1);
  };

  const increaseTarget = () => {
    engine.setTargetReps((state?.targetReps ?? 10) + 1);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Lab09 Sensors</IonTitle>
          <div slot="end" style={{ fontSize: "0.8rem", textAlign: "right", paddingRight: "16px", lineHeight: "1.2" }}>
            663380245-3<br />
            อรอาภา เหล่าชัย
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" style={{ textAlign: "center", backgroundColor: "#f9f9f9" }}>
        
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "1rem" }}>
          <div style={{ backgroundColor: "#666", color: "white", padding: "4px 12px", borderRadius: "4px", fontSize: "0.9rem", marginBottom: "2rem" }}>
            {state?.status === "IDLE" ? "รอการเริ่มต้น" : state?.status === "RUNNING" ? "กำลังทำงาน" : "หยุดการทำงาน"}
          </div>
          <h1 style={{ fontSize: "7rem", margin: "0", color: "#222" }}>
            {state?.repDisplay ?? 0}
          </h1>
          <h2 style={{ color: "#555", marginTop: "0" }}>
            / {state?.targetReps ?? 10} ครั้ง
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", margin: "2rem 0" }}>
            <IonButton 
              color="light" 
              onClick={decreaseTarget} 
              disabled={state?.status === "RUNNING"}
              style={{ width: "45px", height: "45px", fontWeight: "bold", fontSize: "1.2rem" }}
            >
              -
            </IonButton>
            
            <div style={{ borderBottom: "2px solid #3880ff", padding: "0 20px", fontSize: "1.5rem", fontWeight: "bold" }}>
              {state?.targetReps ?? 10}
            </div>

            <IonButton 
              color="light" 
              onClick={increaseTarget} 
              disabled={state?.status === "RUNNING"}
              style={{ width: "45px", height: "45px", fontWeight: "bold", fontSize: "1.2rem" }}
            >
              +
            </IonButton>
          </div>

          <div style={{ border: "1px solid #ddd", borderRadius: "8px", width: "100%", padding: "16px", marginBottom: "2rem", backgroundColor: "white", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
            <p style={{ margin: "0 0 10px 0", fontSize: "1.1rem", color: "#555" }}>
              คะแนนรวม: <span style={{ color: "#2dd36f", fontWeight: "bold" }}>{state?.stats.score ?? 0}</span>
            </p>
            <p style={{ margin: "0", color: state?.stats.lastMessage === "OK" ? "green" : "#eb445a" }}>
              {state?.stats.lastMessage}
            </p>
          </div>

          <IonButton 
            expand="block" 
            color="primary" 
            onClick={start} 
            disabled={state?.status === "RUNNING"}
            style={{ width: "100%", height: "50px", fontWeight: "bold", marginBottom: "10px" }}
          >
            START
          </IonButton>
          
          <IonButton 
            expand="block" 
            color="danger" 
            fill="outline" 
            onClick={stop} 
            disabled={state?.status !== "RUNNING"}
            style={{ width: "100%", height: "50px", fontWeight: "bold" }}
          >
            STOP
          </IonButton>

        </div>
      </IonContent>
    </IonPage>
  );
};

