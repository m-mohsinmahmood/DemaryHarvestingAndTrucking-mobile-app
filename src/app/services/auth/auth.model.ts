export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

export interface AuthState {
  isLoggedIn: boolean;
  isEmailVerified: boolean;
  id: string | null;
  email: string | null;
  name: string | null;
  phone_number: string | null;
  token: string | null;
  display_picture: string | null;
  role: string;
  cover_photo: string | null;
  stripe_id?: string;
}
