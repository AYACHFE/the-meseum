export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  passwordHash: string;
  bio: string;
  avatarColor: string;
  createdAt: string;
};

export type PublicUser = Omit<User, "passwordHash" | "email"> & {
  email?: string;
};

export type Artwork = {
  id: string;
  userId: string;
  title: string;
  description: string;
  imageUrl: string;
  medium: string;
  tags: string[];
  palette: string[];
  likes: string[];
  createdAt: string;
};

export type ArtworkWithArtist = Artwork & {
  artist: PublicUser;
};

export type Database = {
  users: User[];
  artworks: Artwork[];
};

export type SessionPayload = {
  userId: string;
  expiresAt: number;
};

export type AuthFormState = {
  errors?: {
    name?: string[];
    username?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string;
} | undefined;

export type ArtworkFormState = {
  errors?: {
    title?: string[];
    description?: string[];
    medium?: string[];
    image?: string[];
    tags?: string[];
  };
  message?: string;
  success?: boolean;
} | undefined;

export type ProfileFormState = {
  errors?: {
    name?: string[];
    bio?: string[];
  };
  message?: string;
  success?: boolean;
} | undefined;
