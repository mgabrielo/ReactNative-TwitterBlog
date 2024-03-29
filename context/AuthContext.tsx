import { useRouter } from "expo-router";
import { useSegments } from "expo-router";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import * as SecureStore from "expo-secure-store";
const AuthContext = createContext<any>(null);

const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  //   console.log({ authToken: authToken });
  const router = useRouter();
  const segments = useSegments();
  //   console.log(segments);

  useEffect(() => {
    const isAuthGroup = segments[0] === "(auth)";
    if (authToken && isAuthGroup) {
      router.replace("/(drawer)/(tabs)/(feed)/");
    }
    if (!authToken && !isAuthGroup) {
      console.log("user not authenticated");
      router.replace("/signIn");
    }
  }, [segments, authToken]);

  useEffect(() => {
    const loadAuthToken = async () => {
      const token = await SecureStore.getItemAsync("authToken");
      if (token) {
        setAuthToken(token);
      }
    };
    loadAuthToken();
  }, []);
  const updateAuthToken = async (newToken: string) => {
    await SecureStore.setItemAsync("authToken", newToken);
    setAuthToken(newToken);
  };
  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, updateAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuth = () => useContext(AuthContext);
