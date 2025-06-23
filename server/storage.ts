import { applications, testimonials, faqItems, chatMessages, type Application, type InsertApplication, type Testimonial, type InsertTestimonial, type FaqItem, type InsertFaqItem, type ChatMessage, type InsertChatMessage } from "@shared/schema";

export interface IStorage {
  // Applications
  createApplication(application: InsertApplication): Promise<Application>;
  getApplications(): Promise<Application[]>;
  
  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // FAQ
  getFaqItems(): Promise<FaqItem[]>;
  createFaqItem(faqItem: InsertFaqItem): Promise<FaqItem>;
  
  // Chat Messages
  createChatMessage(chatMessage: InsertChatMessage): Promise<ChatMessage>;
  getChatMessages(sessionId: string): Promise<ChatMessage[]>;
}

export class MemStorage implements IStorage {
  private applications: Map<number, Application> = new Map();
  private testimonials: Map<number, Testimonial> = new Map();
  private faqItems: Map<number, FaqItem> = new Map();
  private chatMessages: Map<number, ChatMessage> = new Map();
  private currentApplicationId = 1;
  private currentTestimonialId = 1;
  private currentFaqId = 1;
  private currentChatId = 1;

  constructor() {
    // Initialize with sample testimonials
    this.initializeTestimonials();
    this.initializeFaqItems();
  }

  private initializeTestimonials() {
    const sampleTestimonials: InsertTestimonial[] = [
      {
        name: "Mike Thompson",
        location: "Texas • 3 Years with My Star",
        experience: "3 years",
        rating: 5,
        content: "Best company I've worked for in 15 years of trucking. They actually keep their promises about home time and pay. My dispatcher treats me like family.",
        imageUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
      },
      {
        name: "Sarah Rodriguez",
        location: "California • 2 Years with My Star",
        experience: "2 years",
        rating: 5,
        content: "I'm making $2,000+ per week consistently. The equipment is top-notch and I'm home every weekend like they promised. Highly recommend!",
        imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
      },
      {
        name: "Robert Johnson",
        location: "Florida • 1 Year with My Star",
        experience: "1 year",
        rating: 5,
        content: "Switched from another company and got my $15k sign-on bonus as promised. No games, no tricks. They pay what they say they'll pay.",
        imageUrl: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
      }
    ];

    sampleTestimonials.forEach(testimonial => {
      this.createTestimonial(testimonial);
    });
  }

  private initializeFaqItems() {
    const sampleFaqItems: InsertFaqItem[] = [
      {
        question: "What are the minimum requirements to drive for My Star LLC?",
        answer: "You must have a valid CDL-A license, be at least 23 years old, have 6+ months of recent OTR experience, clean MVR with no major violations in the past 3 years, and pass DOT physical and drug screening.",
        category: "requirements",
        order: 1
      },
      {
        question: "How often will I get home?",
        answer: "We offer multiple home time options: 34-hour reset at home every week, or 4 days home every 2 weeks. We guarantee your home time - it's not just a promise, it's our commitment.",
        category: "home-time",
        order: 2
      },
      {
        question: "What type of freight do you haul?",
        answer: "We primarily haul dry van freight for dedicated customers including retail, manufacturing, and distribution centers. Most loads are drop-and-hook, no-touch freight. Average length of haul is 500-800 miles.",
        category: "freight",
        order: 3
      },
      {
        question: "How is the pay structured?",
        answer: "Pay is primarily per-mile (52¢-62¢) plus bonuses. We also pay for: layover ($100/day after first day), detention ($25/hour after 2 hours), breakdown ($150/day), and various performance bonuses. Weekly guarantee of $1,400 for full-time drivers.",
        category: "pay",
        order: 4
      },
      {
        question: "What benefits do you offer?",
        answer: "Full benefits package includes: Medical, dental, and vision insurance (company pays 80%), 401K with 4% company match, paid vacation (1 week after 6 months, 2 weeks after 1 year), life insurance, and rider/pet policy available.",
        category: "benefits",
        order: 5
      }
    ];

    sampleFaqItems.forEach(faqItem => {
      this.createFaqItem(faqItem);
    });
  }

  async createApplication(insertApplication: InsertApplication): Promise<Application> {
    const id = this.currentApplicationId++;
    const application: Application = {
      ...insertApplication,
      id,
      preferredHomeTime: insertApplication.preferredHomeTime || null,
      additionalInfo: insertApplication.additionalInfo || null,
      createdAt: new Date()
    };
    this.applications.set(id, application);
    return application;
  }

  async getApplications(): Promise<Application[]> {
    return Array.from(this.applications.values());
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentTestimonialId++;
    const testimonial: Testimonial = { 
      ...insertTestimonial, 
      id,
      imageUrl: insertTestimonial.imageUrl || null
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  async getFaqItems(): Promise<FaqItem[]> {
    return Array.from(this.faqItems.values()).sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  async createFaqItem(insertFaqItem: InsertFaqItem): Promise<FaqItem> {
    const id = this.currentFaqId++;
    const faqItem: FaqItem = { 
      ...insertFaqItem, 
      id,
      category: insertFaqItem.category || null,
      order: insertFaqItem.order || null
    };
    this.faqItems.set(id, faqItem);
    return faqItem;
  }

  async createChatMessage(insertChatMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = this.currentChatId++;
    const chatMessage: ChatMessage = {
      ...insertChatMessage,
      id,
      createdAt: new Date()
    };
    this.chatMessages.set(id, chatMessage);
    return chatMessage;
  }

  async getChatMessages(sessionId: string): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter(msg => msg.sessionId === sessionId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }
}

export const storage = new MemStorage();
