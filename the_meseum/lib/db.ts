import { promises as fs } from "fs";
import path from "path";
import type { Artwork, Database, PublicUser, User } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "db.json");

const AVATAR_COLORS = [
  "#c45c26",
  "#c9a227",
  "#3d4f7c",
  "#6b8f71",
  "#8b3a4a",
  "#5c6b8a",
  "#b56b45",
  "#4a7c6f",
];

const seedDatabase = (): Database => ({
  users: [
    {
      id: "user_luna",
      name: "Luna Meridian",
      username: "lunameridian",
      email: "luna@museum.art",
      passwordHash:
        "$2b$10$8K1p/a0dL1LXMIgoEDFrwOfMQnH8vGqJ5YqJ5YqJ5YqJ5YqJ5YqJ5u", // placeholder, overwritten on init
      bio: "Painter of night skies and half-remembered dreams. Based in Lisbon.",
      avatarColor: "#3d4f7c",
      createdAt: "2025-11-02T10:00:00.000Z",
    },
    {
      id: "user_kai",
      name: "Kai Rivera",
      username: "kairivera",
      email: "kai@museum.art",
      passwordHash: "placeholder",
      bio: "Digital collage & experimental photography. Collecting light.",
      avatarColor: "#c45c26",
      createdAt: "2025-12-14T14:20:00.000Z",
    },
    {
      id: "user_noor",
      name: "Noor El-Sayed",
      username: "noorinks",
      email: "noor@museum.art",
      passwordHash: "placeholder",
      bio: "Calligraphy meets abstract form. Ink, paper, patience.",
      avatarColor: "#8b3a4a",
      createdAt: "2026-01-08T09:15:00.000Z",
    },
    {
      id: "user_elio",
      name: "Elio Voss",
      username: "eliovoss",
      email: "elio@museum.art",
      passwordHash: "placeholder",
      bio: "Sculptural ceramics and quiet still-life studies.",
      avatarColor: "#6b8f71",
      createdAt: "2026-02-21T16:40:00.000Z",
    },
  ],
  artworks: [
    {
      id: "art_01",
      userId: "user_luna",
      title: "Midnight Orchard",
      description:
        "A nocturne of fruit trees under a cobalt moon. Layers of oil and wax create a soft luminescence that shifts with the light.",
      imageUrl:
        "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=900&q=80",
      medium: "Oil on canvas",
      tags: ["painting", "night", "landscape"],
      palette: ["#0b1a2b", "#1e3a5f", "#c9a227", "#f0e6d2"],
      likes: ["user_kai", "user_noor", "user_elio"],
      createdAt: "2026-03-01T18:00:00.000Z",
    },
    {
      id: "art_02",
      userId: "user_kai",
      title: "Fragmented Afternoon",
      description:
        "Torn photographs reassembled into a single golden hour. Memory as collage — imperfect, warm, incomplete.",
      imageUrl:
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=900&q=80",
      medium: "Digital collage",
      tags: ["collage", "photo", "memory"],
      palette: ["#e8a87c", "#c38d9e", "#41b3a3", "#f5f0e8"],
      likes: ["user_luna", "user_elio"],
      createdAt: "2026-03-12T11:30:00.000Z",
    },
    {
      id: "art_03",
      userId: "user_noor",
      title: "Letters to the Wind",
      description:
        "Arabic letterforms dissolving into abstract strokes. Written once, then allowed to freefall across handmade paper.",
      imageUrl:
        "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=900&q=80",
      medium: "Ink on paper",
      tags: ["calligraphy", "ink", "abstract"],
      palette: ["#1a1a1a", "#8b3a4a", "#f5f0e8", "#c9a227"],
      likes: ["user_luna", "user_kai"],
      createdAt: "2026-04-02T09:00:00.000Z",
    },
    {
      id: "art_04",
      userId: "user_elio",
      title: "Vessel of Quiet",
      description:
        "A hand-thrown vessel finished with ash glaze. The form is meant to hold silence as much as water.",
      imageUrl:
        "https://images.unsplash.com/photo-1493106819501-66d381c466f1?w=900&q=80",
      medium: "Ceramic",
      tags: ["ceramics", "sculpture", "still-life"],
      palette: ["#6b8f71", "#d4c4a8", "#3d3d3d", "#f0ebe3"],
      likes: ["user_noor"],
      createdAt: "2026-04-18T15:45:00.000Z",
    },
    {
      id: "art_05",
      userId: "user_luna",
      title: "Coral Reverie",
      description:
        "Underwater gardens imagined in thick impasto. Coral structures bloom against a field of teal and coral pink.",
      imageUrl:
        "https://images.unsplash.com/photo-1549490349-8643362247b5?w=900&q=80",
      medium: "Acrylic",
      tags: ["painting", "abstract", "color"],
      palette: ["#e07a5f", "#3d405b", "#81b29a", "#f2cc8f"],
      likes: ["user_kai", "user_elio", "user_noor"],
      createdAt: "2026-05-05T20:10:00.000Z",
    },
    {
      id: "art_06",
      userId: "user_kai",
      title: "City of Paper Lanterns",
      description:
        "Street photography reimagined through warm film grain and layered light leaks — a city that glows from within.",
      imageUrl:
        "https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=900&q=80",
      medium: "Photography",
      tags: ["photo", "city", "night"],
      palette: ["#2d1b0e", "#c45c26", "#f4a261", "#1a1a2e"],
      likes: ["user_luna"],
      createdAt: "2026-05-22T22:00:00.000Z",
    },
    {
      id: "art_07",
      userId: "user_noor",
      title: "Geometry of Breath",
      description:
        "Repeating geometric motifs drawn freehand until the hand finds rhythm. Meditation made visible.",
      imageUrl:
        "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=900&q=80",
      medium: "Graphite & gold leaf",
      tags: ["drawing", "geometry", "meditation"],
      palette: ["#f5f0e8", "#1a1a1a", "#c9a227", "#5c6b8a"],
      likes: ["user_elio", "user_kai", "user_luna"],
      createdAt: "2026-06-01T08:30:00.000Z",
    },
    {
      id: "art_08",
      userId: "user_elio",
      title: "Terracotta Horizon",
      description:
        "Landscape reduced to bands of earth pigment. Horizon as a single continuous breath across clay-colored fields.",
      imageUrl:
        "https://images.unsplash.com/photo-1578301978693-85fa9c011b3a?w=900&q=80",
      medium: "Earth pigments",
      tags: ["landscape", "minimal", "earth"],
      palette: ["#b56b45", "#d4a574", "#8b5e3c", "#f5e6d3"],
      likes: ["user_luna", "user_noor"],
      createdAt: "2026-06-15T13:20:00.000Z",
    },
    {
      id: "art_09",
      userId: "user_luna",
      title: "Study in Ultramarine",
      description:
        "A pure meditation on one of history’s most precious pigments. Depth, shadow, and a single vertical light.",
      imageUrl:
        "https://images.unsplash.com/photo-1561214115-f2f260661840?w=900&q=80",
      medium: "Oil study",
      tags: ["painting", "blue", "study"],
      palette: ["#0a1628", "#1e3a8a", "#3b82f6", "#e0e7ff"],
      likes: ["user_kai"],
      createdAt: "2026-07-01T17:00:00.000Z",
    },
    {
      id: "art_10",
      userId: "user_kai",
      title: "The Soft Rebellion",
      description:
        "Pastel textures against hard architectural lines. Softness as resistance — a quiet manifesto in pink and concrete.",
      imageUrl:
        "https://images.unsplash.com/photo-1507643179773-3e975d7da530?w=900&q=80",
      medium: "Mixed media",
      tags: ["mixed-media", "architecture", "texture"],
      palette: ["#f4acb7", "#9d8189", "#ffcad4", "#2b2d42"],
      likes: ["user_noor", "user_elio"],
      createdAt: "2026-07-10T19:40:00.000Z",
    },
  ],
});

let writeQueue: Promise<void> = Promise.resolve();

async function ensureDb(): Promise<Database> {
  try {
    await fs.access(DB_PATH);
    const raw = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(raw) as Database;
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const { hash } = await import("bcryptjs");
    const db = seedDatabase();
    const demoHash = await hash("museum123", 10);
    db.users = db.users.map((u) => ({ ...u, passwordHash: demoHash }));
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
    return db;
  }
}

async function readDb(): Promise<Database> {
  return ensureDb();
}

async function writeDb(db: Database): Promise<void> {
  writeQueue = writeQueue.then(async () => {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
  });
  return writeQueue;
}

export function toPublicUser(user: User, includeEmail = false): PublicUser {
  const { passwordHash: _, email, ...rest } = user;
  return includeEmail ? { ...rest, email } : rest;
}

export function pickAvatarColor(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export async function getUsers(): Promise<User[]> {
  const db = await readDb();
  return db.users;
}

export async function getUserById(id: string): Promise<User | undefined> {
  const db = await readDb();
  return db.users.find((u) => u.id === id);
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const db = await readDb();
  return db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export async function getUserByUsername(
  username: string,
): Promise<User | undefined> {
  const db = await readDb();
  return db.users.find(
    (u) => u.username.toLowerCase() === username.toLowerCase(),
  );
}

export async function createUser(
  data: Omit<User, "id" | "createdAt" | "avatarColor" | "bio"> & {
    bio?: string;
  },
): Promise<User> {
  const db = await readDb();
  const user: User = {
    id: `user_${crypto.randomUUID().slice(0, 8)}`,
    name: data.name,
    username: data.username,
    email: data.email,
    passwordHash: data.passwordHash,
    bio: data.bio ?? "A new voice in the gallery.",
    avatarColor: pickAvatarColor(data.username),
    createdAt: new Date().toISOString(),
  };
  db.users.push(user);
  await writeDb(db);
  return user;
}

export async function updateUser(
  id: string,
  patch: Partial<Pick<User, "name" | "bio" | "avatarColor">>,
): Promise<User | undefined> {
  const db = await readDb();
  const index = db.users.findIndex((u) => u.id === id);
  if (index === -1) return undefined;
  db.users[index] = { ...db.users[index], ...patch };
  await writeDb(db);
  return db.users[index];
}

export async function getArtworks(): Promise<Artwork[]> {
  const db = await readDb();
  return [...db.artworks].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function getArtworkById(id: string): Promise<Artwork | undefined> {
  const db = await readDb();
  return db.artworks.find((a) => a.id === id);
}

export async function getArtworksByUser(userId: string): Promise<Artwork[]> {
  const db = await readDb();
  return db.artworks
    .filter((a) => a.userId === userId)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
}

export async function createArtwork(
  data: Omit<Artwork, "id" | "createdAt" | "likes">,
): Promise<Artwork> {
  const db = await readDb();
  const artwork: Artwork = {
    ...data,
    id: `art_${crypto.randomUUID().slice(0, 8)}`,
    likes: [],
    createdAt: new Date().toISOString(),
  };
  db.artworks.unshift(artwork);
  await writeDb(db);
  return artwork;
}

export async function toggleLike(
  artworkId: string,
  userId: string,
): Promise<Artwork | undefined> {
  const db = await readDb();
  const index = db.artworks.findIndex((a) => a.id === artworkId);
  if (index === -1) return undefined;
  const likes = new Set(db.artworks[index].likes);
  if (likes.has(userId)) likes.delete(userId);
  else likes.add(userId);
  db.artworks[index] = {
    ...db.artworks[index],
    likes: Array.from(likes),
  };
  await writeDb(db);
  return db.artworks[index];
}

export async function deleteArtwork(
  artworkId: string,
  userId: string,
): Promise<boolean> {
  const db = await readDb();
  const artwork = db.artworks.find((a) => a.id === artworkId);
  if (!artwork || artwork.userId !== userId) return false;
  db.artworks = db.artworks.filter((a) => a.id !== artworkId);
  await writeDb(db);
  return true;
}

export async function searchArtworks(query: string): Promise<Artwork[]> {
  const q = query.toLowerCase().trim();
  if (!q) return getArtworks();
  const artworks = await getArtworks();
  return artworks.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.medium.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q)),
  );
}
