import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonText,
} from "@ionic/react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { authService } from "../auth/auth-service";

const LoginPage: React.FC = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [phone, setPhone] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [otp, setOtp] = useState("");

  // ถ้า login อยู่แล้ว -> ไป tab1
  useEffect(() => {
    const check = async () => {
      const user = await authService.getCurrentUser();
      if (user) {
        history.replace("/tabs/tab1");
      }
    };
    check();
  }, [history]);

  // 1. Login Email/Password
  const handleEmailLogin = async () => {
    try {
      await authService.loginWithEmailPassword({
        email,
        password,
      });
      history.replace("/tabs/tab1");
    } catch (err) {
      alert("Email login failed");
    }
  };

  // 2. Login Google
  const handleGoogleLogin = async () => {
    try {
      await authService.loginWithGoogle();
      history.replace("/tabs/tab1");
    } catch (err) {
      alert("Google login failed");
    }
  };

  // 3. Login by Phone
  const handleSendOtp = async () => {
    try {
      const result = await authService.startPhoneLogin({
        phoneNumberE164: phone,
      });
      setVerificationId(result.verificationId);
      alert("OTP sent");
    } catch (err) {
      alert("Send OTP failed");
    }
  };

  const handleConfirmOtp = async () => {
    try {
      await authService.confirmPhoneCode({
        verificationId,
        verificationCode: otp,
      });
      history.replace("/tabs/tab1");
    } catch (err) {
      alert("OTP incorrect");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        {/* ================= EMAIL ================= */}
        <IonText><h2>Email / Password</h2></IonText>

        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput
            type="password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
          />
        </IonItem>

        <IonButton expand="block" onClick={handleEmailLogin}>
          Login Email/Password
        </IonButton>

        <hr />

        {/* ================= GOOGLE ================= */}
        <IonButton expand="block" onClick={handleGoogleLogin}>
          Login Google
        </IonButton>

        <hr />

        {/* ================= PHONE ================= */}
        <IonText><h2>Phone Login</h2></IonText>

        <IonItem>
          <IonLabel position="floating">Phone (+66812345678)</IonLabel>
          <IonInput
            value={phone}
            onIonChange={(e) => setPhone(e.detail.value!)}
          />
        </IonItem>

        <div id="recaptcha-container"></div>

        <IonButton expand="block" onClick={handleSendOtp}>
          Send OTP
        </IonButton>

        {verificationId && (
          <>
            <IonItem>
              <IonLabel position="floating">OTP Code</IonLabel>
              <IonInput
                value={otp}
                onIonChange={(e) => setOtp(e.detail.value!)}
              />
            </IonItem>

            <IonButton expand="block" onClick={handleConfirmOtp}>
              Confirm OTP
            </IonButton>
          </>
        )}

      </IonContent>
    </IonPage>
  );
};

export default LoginPage;