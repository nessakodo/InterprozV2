import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { setupAuthDev, isAuthenticatedDev } from "./auth-dev";
import { insertJobSchema, insertMessageSchema, insertRatingSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Traditional auth middleware - sets up /api/register, /api/login, /api/logout, /api/user
  setupAuthDev(app);

  // Create test users endpoint
  app.post("/api/create-test-users", async (req, res) => {
    try {
      await storage.createTestUsers();
      res.json({ message: "Test users created successfully" });
    } catch (error: any) {
      if (error.message.includes("duplicate key")) {
        res.status(200).json({ message: "Test users already exist" });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  });

  // Admin Dashboard APIs
  app.get('/api/admin/stats', isAuthenticatedDev, async (req: any, res) => {
    try {
      const stats = await storage.getJobStats();
      const userStats = await storage.getUserStats();
      res.json({
        totalUsers: userStats.totalUsers || 0,
        activeJobs: stats.activeJobs || 0,
        monthlyRevenue: stats.monthlyRevenue || 0,
        growthRate: stats.growthRate || 0,
        recentActivity: [
          { message: "New user registered", time: "2 minutes ago" },
          { message: "Job completed successfully", time: "15 minutes ago" },
          { message: "Payment processed", time: "1 hour ago" }
        ]
      });
    } catch (error) {
      console.error("Error fetching admin stats:", error);
      res.status(500).json({ message: "Failed to fetch admin stats" });
    }
  });

  app.get('/api/admin/users', isAuthenticatedDev, async (req: any, res) => {
    try {
      // For demo purposes, return sample users - in production, fetch from database
      const users = [
        {
          id: "1",
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          role: "client",
          isActive: true
        },
        {
          id: "2",
          firstName: "Maria",
          lastName: "Garcia",
          email: "maria@example.com",
          role: "interpreter",
          isActive: true
        }
      ];
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.get('/api/admin/jobs', isAuthenticatedDev, async (req: any, res) => {
    try {
      const jobs = await storage.getAvailableJobs();
      res.json(jobs);
    } catch (error) {
      console.error("Error fetching admin jobs:", error);
      res.status(500).json({ message: "Failed to fetch jobs" });
    }
  });

  app.get('/api/admin/interpreters', isAuthenticatedDev, async (req: any, res) => {
    try {
      // Return sample interpreters for demo
      const interpreters = [
        {
          id: "2",
          firstName: "Maria",
          lastName: "Garcia",
          email: "maria@example.com",
          languages: ["Spanish", "English"],
          specialties: ["Medical", "Legal"],
          rating: "4.8",
          isActive: true
        }
      ];
      res.json(interpreters);
    } catch (error) {
      console.error("Error fetching interpreters:", error);
      res.status(500).json({ message: "Failed to fetch interpreters" });
    }
  });

  // Client Dashboard APIs
  app.get('/api/client/stats', isAuthenticatedDev, async (req: any, res) => {
    try {
      const userId = req.user.id.toString();
      const jobs = await storage.getJobsByClient(userId);
      const stats = {
        totalBookings: jobs.length,
        totalHours: jobs.reduce((sum, job) => sum + (job.estimatedDuration || 0), 0),
        totalSpent: jobs.reduce((sum, job) => sum + parseFloat(job.totalAmount || "0"), 0),
        averageRating: "4.5"
      };
      res.json(stats);
    } catch (error) {
      console.error("Error fetching client stats:", error);
      res.status(500).json({ message: "Failed to fetch client stats" });
    }
  });

  app.get('/api/client/jobs', isAuthenticatedDev, async (req: any, res) => {
    try {
      const userId = req.user.id.toString();
      const jobs = await storage.getJobsByClient(userId);
      res.json(jobs);
    } catch (error) {
      console.error("Error fetching client jobs:", error);
      res.status(500).json({ message: "Failed to fetch client jobs" });
    }
  });

  app.get('/api/client/jobs/upcoming', isAuthenticatedDev, async (req: any, res) => {
    try {
      const userId = req.user.id.toString();
      const jobs = await storage.getJobsByClient(userId);
      const upcomingJobs = jobs.filter(job => 
        job.status === 'confirmed' && new Date(job.startTime) > new Date()
      );
      res.json(upcomingJobs);
    } catch (error) {
      console.error("Error fetching upcoming jobs:", error);
      res.status(500).json({ message: "Failed to fetch upcoming jobs" });
    }
  });

  app.get('/api/client/invoices', isAuthenticatedDev, async (req: any, res) => {
    try {
      // Return sample invoices for demo
      const invoices = [
        {
          id: "1",
          number: "INV-2024-001",
          amount: 150,
          status: "paid",
          createdAt: new Date().toISOString()
        }
      ];
      res.json(invoices);
    } catch (error) {
      console.error("Error fetching invoices:", error);
      res.status(500).json({ message: "Failed to fetch invoices" });
    }
  });

  // Interpreter Dashboard APIs
  app.get('/api/interpreter/stats', isAuthenticatedDev, async (req: any, res) => {
    try {
      const userId = req.user.id.toString();
      const jobs = await storage.getJobsByInterpreter(userId);
      const completedJobs = jobs.filter(job => job.status === 'completed');
      const stats = {
        completedJobs: completedJobs.length,
        totalHours: jobs.reduce((sum, job) => sum + (job.estimatedDuration || 0), 0),
        totalEarnings: jobs.reduce((sum, job) => sum + parseFloat(job.totalAmount || "0"), 0),
        averageRating: "4.7",
        monthlyJobs: jobs.filter(job => 
          new Date(job.startTime).getMonth() === new Date().getMonth()
        ).length,
        monthlyEarnings: 2500,
        clientSatisfaction: 95,
        hourlyRate: 75
      };
      res.json(stats);
    } catch (error) {
      console.error("Error fetching interpreter stats:", error);
      res.status(500).json({ message: "Failed to fetch interpreter stats" });
    }
  });

  app.get('/api/interpreter/jobs', isAuthenticatedDev, async (req: any, res) => {
    try {
      const userId = req.user.id.toString();
      const jobs = await storage.getJobsByInterpreter(userId);
      res.json(jobs);
    } catch (error) {
      console.error("Error fetching interpreter jobs:", error);
      res.status(500).json({ message: "Failed to fetch interpreter jobs" });
    }
  });

  app.get('/api/interpreter/jobs/available', isAuthenticatedDev, async (req: any, res) => {
    try {
      const jobs = await storage.getAvailableJobs();
      res.json(jobs);
    } catch (error) {
      console.error("Error fetching available jobs:", error);
      res.status(500).json({ message: "Failed to fetch available jobs" });
    }
  });

  app.get('/api/interpreter/jobs/upcoming', isAuthenticatedDev, async (req: any, res) => {
    try {
      const userId = req.user.id.toString();
      const jobs = await storage.getJobsByInterpreter(userId);
      const upcomingJobs = jobs.filter(job => 
        job.status === 'confirmed' && new Date(job.startTime) > new Date()
      );
      res.json(upcomingJobs);
    } catch (error) {
      console.error("Error fetching upcoming interpreter jobs:", error);
      res.status(500).json({ message: "Failed to fetch upcoming interpreter jobs" });
    }
  });

  app.get('/api/interpreter/earnings', isAuthenticatedDev, async (req: any, res) => {
    try {
      // Return sample earnings for demo
      const earnings = [
        {
          id: "1",
          jobLanguage: "Spanish",
          jobSpecialty: "Medical",
          amount: 150,
          status: "paid",
          date: new Date().toISOString()
        }
      ];
      res.json(earnings);
    } catch (error) {
      console.error("Error fetching earnings:", error);
      res.status(500).json({ message: "Failed to fetch earnings" });
    }
  });

  // Job Management APIs
  app.post('/api/jobs', isAuthenticatedDev, async (req: any, res) => {
    try {
      const userId = req.user.id.toString();
      const jobData = {
        ...req.body,
        clientId: userId,
        status: 'pending' as const,
      };
      const job = await storage.createJob(jobData);
      res.json(job);
    } catch (error) {
      console.error("Error creating job:", error);
      res.status(500).json({ message: "Failed to create job" });
    }
  });

  app.patch('/api/jobs/:id', isAuthenticatedDev, async (req: any, res) => {
    try {
      const jobId = parseInt(req.params.id);
      const job = await storage.updateJob(jobId, req.body);
      res.json(job);
    } catch (error) {
      console.error("Error updating job:", error);
      res.status(500).json({ message: "Failed to update job" });
    }
  });

  app.post('/api/interpreter/jobs/:id/accept', isAuthenticatedDev, async (req: any, res) => {
    try {
      const jobId = parseInt(req.params.id);
      const userId = req.user.id.toString();
      const job = await storage.assignInterpreter(jobId, userId);
      res.json(job);
    } catch (error) {
      console.error("Error accepting job:", error);
      res.status(500).json({ message: "Failed to accept job" });
    }
  });

  // Specialty management
  app.get('/api/specialties', async (req, res) => {
    try {
      const specialties = await storage.getSpecialties();
      res.json(specialties);
    } catch (error) {
      console.error("Error fetching specialties:", error);
      res.status(500).json({ message: "Failed to fetch specialties" });
    }
  });

  // Job routes
  app.post("/api/jobs", isAuthenticatedDev, async (req: any, res) => {
    try {
      const userId = req.user.id.toString();
      const jobData = insertJobSchema.parse({
        ...req.body,
        clientId: userId,
      });
      
      const job = await storage.createJob(jobData);
      res.json(job);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/jobs", isAuthenticatedDev, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      let jobs;
      if (user.role === "client") {
        jobs = await storage.getJobsByClient(userId);
      } else if (user.role === "interpreter") {
        jobs = await storage.getJobsByInterpreter(userId);
      } else {
        // Admin can see all jobs
        jobs = await storage.getAvailableJobs();
      }
      
      res.json(jobs);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/jobs/available", isAuthenticatedDev, async (req: any, res) => {
    try {
      const jobs = await storage.getAvailableJobs();
      res.json(jobs);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/jobs/:id/claim", isAuthenticatedDev, async (req: any, res) => {
    try {
      const jobId = parseInt(req.params.id);
      const interpreterId = req.user.id.toString();
      
      const job = await storage.assignInterpreter(jobId, interpreterId);
      res.json(job);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.patch("/api/jobs/:id", isAuthenticatedDev, async (req: any, res) => {
    try {
      const jobId = parseInt(req.params.id);
      const updates = req.body;
      
      const job = await storage.updateJob(jobId, updates);
      res.json(job);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Message routes
  app.post("/api/jobs/:id/messages", isAuthenticatedDev, async (req: any, res) => {
    try {
      const jobId = parseInt(req.params.id);
      const senderId = req.user.id.toString();
      
      const messageData = insertMessageSchema.parse({
        jobId,
        senderId,
        message: req.body.message,
      });
      
      const message = await storage.createMessage(messageData);
      res.json(message);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/jobs/:id/messages", isAuthenticatedDev, async (req: any, res) => {
    try {
      const jobId = parseInt(req.params.id);
      const messages = await storage.getJobMessages(jobId);
      res.json(messages);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Rating routes
  app.post("/api/jobs/:id/rating", isAuthenticatedDev, async (req: any, res) => {
    try {
      const jobId = parseInt(req.params.id);
      const userId = req.user.id.toString();
      
      const job = await storage.getJob(jobId);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
      
      const ratingData = insertRatingSchema.parse({
        jobId,
        interpreterId: job.interpreterId!,
        clientId: job.clientId,
        ...req.body,
      });
      
      const rating = await storage.createRating(ratingData);
      res.json(rating);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Specialty routes
  app.get("/api/specialties", async (req, res) => {
    try {
      const specialties = await storage.getSpecialties();
      res.json(specialties);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // AI Interpreter Avatar endpoint
  app.post("/api/interpret", isAuthenticatedDev, async (req: any, res) => {
    try {
      const multer = (await import('multer')).default;
      const upload = multer({ 
        storage: multer.memoryStorage(),
        limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
      });

      // Handle file upload
      upload.single('audio')(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ message: "File upload error" });
        }

        if (!req.file) {
          return res.status(400).json({ message: "No audio file provided" });
        }

        const { sourceLanguage, targetLanguage } = req.body;

        try {
          // Import OpenAI dynamically
          const OpenAI = (await import('openai')).default;
          const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

          // Convert audio buffer to file for Whisper
          const audioFile = new File([req.file.buffer], 'audio.webm', { 
            type: req.file.mimetype 
          });

          // Transcribe with Whisper
          const transcription = await openai.audio.transcriptions.create({
            file: audioFile,
            model: "whisper-1",
            language: sourceLanguage === 'auto' ? undefined : sourceLanguage,
          });

          const originalText = transcription.text;

          // Translate with GPT-4o
          const translation = await openai.chat.completions.create({
            model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
            messages: [
              {
                role: "system",
                content: `You are a professional interpreter. Translate the following text from ${sourceLanguage} to ${targetLanguage}. Maintain the tone, context, and meaning. Provide only the translation without any additional commentary.`
              },
              {
                role: "user",
                content: originalText
              }
            ],
            temperature: 0.3,
          });

          const translatedText = translation.choices[0].message.content || "";

          // Generate speech with ElevenLabs using their API directly
          const elevenLabsResponse = await fetch('https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM', {
            method: 'POST',
            headers: {
              'Accept': 'audio/mpeg',
              'Content-Type': 'application/json',
              'xi-api-key': process.env.ELEVENLABS_API_KEY!
            },
            body: JSON.stringify({
              text: translatedText,
              model_id: "eleven_multilingual_v2",
              voice_settings: {
                stability: 0.5,
                similarity_boost: 0.5
              }
            })
          });

          if (!elevenLabsResponse.ok) {
            throw new Error(`ElevenLabs API error: ${elevenLabsResponse.statusText}`);
          }

          const elevenLabsAudioBuffer = Buffer.from(await elevenLabsResponse.arrayBuffer());

          // Convert audio to base64
          const audioBase64 = `data:audio/mpeg;base64,${elevenLabsAudioBuffer.toString('base64')}`;

          res.json({
            originalText,
            translatedText,
            audioUrl: audioBase64,
            sourceLanguage,
            targetLanguage
          });

        } catch (apiError: any) {
          console.error('API Error:', apiError);
          res.status(500).json({ 
            message: "Translation service error", 
            details: apiError.message 
          });
        }
      });

    } catch (error: any) {
      console.error('Interpret endpoint error:', error);
      res.status(500).json({ message: error.message });
    }
  });

  // Analytics routes (Admin only)
  app.get("/api/analytics/jobs", isAuthenticatedDev, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.id);
      if (user?.role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
      }
      
      const stats = await storage.getJobStats();
      res.json(stats);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/analytics/users", isAuthenticatedDev, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.id);
      if (user?.role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
      }
      
      const stats = await storage.getUserStats();
      res.json(stats);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);

  // WebSocket server for real-time messaging
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

  wss.on('connection', (ws: WebSocket) => {
    console.log('Client connected to WebSocket');

    ws.on('message', (message: string) => {
      try {
        const data = JSON.parse(message);
        
        // Broadcast message to all connected clients
        // In a real implementation, you'd filter by job/room
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(message);
          }
        });
      } catch (error) {
        console.error('Error handling WebSocket message:', error);
      }
    });

    ws.on('close', () => {
      console.log('Client disconnected from WebSocket');
    });
  });

  return httpServer;
}
