// ** React Imports
import { createContext, useEffect, useState, ReactNode } from "react";

// ** Next Import
import { useRouter } from "next/router";

// ** Types
import {
  AuthValuesType,
  LoginParams,
  ErrCallbackType,
  UserDataType,
} from "./types";
import { AuthAPI } from "@/services/auth";

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user);
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);

  // ** Hooks
  const router = useRouter();

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      setLoading(true);
      AuthAPI.me()
        .then(async (user) => {
          setLoading(false);
          setUser(user);
        })
        .catch(() => {
          setUser(null);
          setLoading(false);
          if (!router.pathname.includes("login")) {
            router.replace("/login");
          }
        });
    };

    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = (
    params: LoginParams,
    errorCallback?: ErrCallbackType
  ) => {
    AuthAPI.login(params)
      .then((user) => {
        const returnUrl = router.query.returnUrl;

        setUser(user);

        const redirectURL = returnUrl && returnUrl !== "/" ? returnUrl : "/";

        router.replace(redirectURL as string);
      })
      .catch((error) => {
        if (errorCallback) errorCallback(error.error);
      });
  };

  const handleLogout = (errorCallback?: ErrCallbackType) => {
    AuthAPI.logout()
      .then(async () => {
        setUser(null);
        router.replace('/login');
      })

      .catch((err) => {
        if (errorCallback) errorCallback(err);
      });
  };

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
