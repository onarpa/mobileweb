import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonAvatar,
  IonItem,
  IonLabel 
} from '@ionic/react';
import { useEffect, useState } from "react";
import { authService } from "../auth/auth-service";
import { AuthUser } from "../auth/auth-interface";
import { useHistory } from "react-router-dom";
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

const Tab1: React.FC = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const history = useHistory();

  useEffect(() => {
    const loadUser = async () => {
      const u = await authService.getCurrentUser();
      setUser(u);
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    await authService.logout();
    history.replace("/login");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {user ? (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Welcome</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>

              {user.photoUrl && (
                <IonAvatar style={{ margin: "0 auto 16px auto" }}>
                  <img src={user.photoUrl} alt="profile" />
                </IonAvatar>
              )}

              <IonItem>
                <IonLabel>
                  <h2>UID</h2>
                  <p>{user.uid}</p>
                </IonLabel>
              </IonItem>

              <IonItem>
                <IonLabel>
                  <h2>Email</h2>
                  <p>{user.email ?? "-"}</p>
                </IonLabel>
              </IonItem>

              <IonItem>
                <IonLabel>
                  <h2>Phone</h2>
                  <p>{user.phoneNumber ?? "-"}</p>
                </IonLabel>
              </IonItem>

              <IonItem>
                <IonLabel>
                  <h2>Display Name</h2>
                  <p>{user.displayName ?? "-"}</p>
                </IonLabel>
              </IonItem>

              <IonButton
                expand="block"
                color="danger"
                style={{ marginTop: "20px" }}
                onClick={handleLogout}
              >
                Logout
              </IonButton>

            </IonCardContent>
          </IonCard>
        ) : (
          <p>Loading user...</p>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
