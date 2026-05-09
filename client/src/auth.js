const KEY = "mini_crm_logged_in";

export const DEMO_EMAIL = "admin@crm.com";
export const DEMO_PASSWORD = "admin123";

export const isSignedIn = () => {
  return localStorage.getItem(KEY) === "1";
};

export const signIn = (email, password) => {
  if (
    email.toLowerCase() === DEMO_EMAIL &&
    password === DEMO_PASSWORD
  ) {
    localStorage.setItem(KEY, "1");
    return true;
  }

  return false;
};

export const signOut = () => {
  localStorage.removeItem(KEY);
};