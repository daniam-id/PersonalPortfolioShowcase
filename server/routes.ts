import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve CV data as JSON endpoint
  app.get("/api/cv", (req, res) => {
    try {
      const cvData = {
        personal: {
          name: "Adam Daniam",
          email: "adam.dani.apta-2024@fpk.unair.ac.id",
          phone: "+6285156057360",
          linkedin: "https://www.linkedin.com/in/adam-dani-apta-mahendra-099408323",
          location: "Surabaya, Indonesia",
          title: "Leadership-focused Fisheries Product Technology Student",
          subtitle: "Organizational Development Specialist",
          initials: "AD"
        },
        summary: "An active Fisheries Product Technology student at the Faculty of Fisheries and Marine Sciences, Universitas Airlangga. Possesses strong interest in leadership and organizational development. Demonstrates competencies in critical thinking, communication, team collaboration, and event management. Highly motivated to create positive contributions.",
        experience: [
          {
            id: "exp-1",
            title: "Coordinator of Culture, Youth, and Sports Division",
            organization: "Youth Information and Counseling Center",
            period: "2023-2024",
            description: "Led cultural and sports program development reaching over 1000 students",
            achievements: [
              "Developed more than three innovative creativity and sports programs for students",
              "Organized a series of cultural and sports activities as a medium for promoting mental and physical health, reaching over 1000 students",
              "Coordinated with school administration in program implementation"
            ]
          },
          {
            id: "exp-2",
            title: "Curriculum Division Coordinator",
            organization: "Sooko's Computer Student",
            period: "2022-2023",
            description: "Managed computer extracurricular programs for over 20 students",
            achievements: [
              "Led the development of the computer extracurricular syllabus, successfully guiding over 20 new members in mastering a diverse range of skills",
              "Taught computer fundamentals, programming principles, graphic design, photography, videography, and video editing",
              "Managed weekly training schedules and participant evaluations",
              "Worked with teachers and club leaders on educational programs"
            ]
          },
          {
            id: "exp-3",
            title: "Student Resource Development Division Staff",
            organization: "Organisasi Siswa Intra Sekolah",
            period: "2021-2022",
            description: "Contributed to leadership training programs for over 50 students",
            achievements: [
              "Actively contributed to the design and management of the Student Basic Leadership Training program",
              "Managed Training for Trainers programs attended by over 50 students",
              "Served as staff member of the Student Resource Development Division"
            ]
          }
        ],
        education: [
          {
            degree: "Bachelor of Fishery Product Technology",
            institution: "Universitas Airlangga",
            faculty: "Faculty of Fisheries and Marine Sciences",
            period: "Current",
            status: "Undergraduate"
          },
          {
            degree: "Senior High School",
            institution: "SMA Negeri 1 Sooko",
            faculty: "Mathematics and Natural Sciences (MIPA)",
            period: "2021-2024",
            status: "Completed"
          }
        ],
        skills: {
          leadership: [
            "Team Management",
            "Strategic Planning",
            "Decision Making"
          ],
          communication: [
            "Public Speaking",
            "Interpersonal Skills",
            "Presentation"
          ],
          management: [
            "Event Management",
            "Time Management",
            "Project Coordination"
          ],
          problemSolving: [
            "Critical Thinking",
            "Analytical Skills",
            "Innovation"
          ],
          adaptability: [
            "Flexibility",
            "Learning Agility",
            "Change Management"
          ],
          languages: [
            "Indonesian (Native)",
            "English (Intermediate)",
            "TOEFL Certified"
          ]
        },
        certifications: [
          {
            name: "English Language Proficiency Test",
            issuer: "Universitas Airlangga",
            score: "450"
          },
          {
            name: "TOEFL English Certification",
            issuer: "BLTI Yogyakarta",
            level: "Intermediate Level"
          }
        ]
      };
      
      res.json(cvData);
    } catch (error) {
      res.status(500).json({ error: "Failed to load CV data" });
    }
  });

  // Handle contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      
      // Validate required fields
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ 
          error: "All fields are required" 
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ 
          error: "Invalid email format" 
        });
      }

      // In a real application, you would:
      // 1. Save the message to a database
      // 2. Send an email notification
      // 3. Send a confirmation email to the sender
      
      console.log("Contact form submission:", { name, email, subject, message });
      
      res.json({ 
        success: true, 
        message: "Thank you for your message! I'll get back to you soon." 
      });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(500).json({ 
        error: "Failed to send message. Please try again later." 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
