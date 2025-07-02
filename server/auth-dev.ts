import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { User } from "@shared/schema";

declare global {
  namespace Express {
    interface User {
      id: number;
      username: string;
      email: string;
      role: string;
      firstName: string;
      lastName: string;
    }
  }
}

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

// In-memory storage for development
let users: User[] = [];
let userIdCounter = 1;

// Development storage functions
async function getUserByUsername(username: string): Promise<User | undefined> {
  return users.find(user => user.username === username);
}

async function getUserByEmail(email: string): Promise<User | undefined> {
  return users.find(user => user.email === email);
}

async function getUserById(id: number): Promise<User | undefined> {
  return users.find(user => user.id === id);
}

async function createUser(userData: any): Promise<User> {
  const user: User = {
    id: userIdCounter++,
    username: userData.username,
    email: userData.email,
    password: userData.password,
    firstName: userData.firstName,
    lastName: userData.lastName,
    role: userData.role,
    languages: userData.languages || [],
    specialties: userData.specialties || [],
    isVerified: userData.isVerified || false,
    hourlyRate: userData.hourlyRate || null,
    bio: userData.bio || null,
    profileImage: userData.profileImage || null,
    rating: userData.rating || null,
    totalJobs: userData.totalJobs || 0,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  users.push(user);
  return user;
}

// Initialize with test users
async function initTestUsers() {
  if (users.length === 0) {
    try {
      // Admin user
      await createUser({
        username: "admin",
        email: "admin@example.com",
        password: await hashPassword("admin123"),
        firstName: "Admin",
        lastName: "User",
        role: "admin",
      });

      // Client user
      await createUser({
        username: "client",
        email: "client@example.com",
        password: await hashPassword("client123"),
        firstName: "Test",
        lastName: "Client",
        role: "client",
      });

      // Interpreter user
      await createUser({
        username: "interpreter",
        email: "interpreter@example.com",
        password: await hashPassword("interpreter123"),
        firstName: "Test",
        lastName: "Interpreter",
        role: "interpreter",
        languages: ["Spanish", "English"],
        specialties: ["Medical", "Legal"],
        isVerified: true,
        hourlyRate: "85.00",
      });

      console.log("Test users created successfully");
    } catch (error) {
      console.error("Error creating test users:", error);
    }
  }
}

export function setupAuthDev(app: Express) {
  // Initialize test users
  initTestUsers();

  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || "your-secret-key-change-in-production",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true,
      secure: false, // Set to false for development
    },
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      const user = await getUserByUsername(username);
      if (!user || !(await comparePasswords(password, user.password))) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    }),
  );

  passport.serializeUser((user, done) => done(null, (user as any).id));
  passport.deserializeUser(async (id: number, done) => {
    const user = await getUserById(id);
    done(null, user);
  });

  // Create test users endpoint
  app.post("/api/create-test-users", async (req, res) => {
    try {
      await initTestUsers();
      res.status(201).json({ message: "Test users created successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/register", async (req, res, next) => {
    try {
      const existingUser = await getUserByUsername(req.body.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const existingEmail = await getUserByEmail(req.body.email);
      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const user = await createUser({
        ...req.body,
        password: await hashPassword(req.body.password),
      });

      req.login(user, (err) => {
        if (err) return next(err);
        res.status(201).json(user);
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.status(200).json(req.user);
  });

  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });

  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    res.json(req.user);
  });
}

export function isAuthenticatedDev(req: any, res: any, next: any) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
}