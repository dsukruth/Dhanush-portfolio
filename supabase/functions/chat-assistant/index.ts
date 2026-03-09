import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const RESUME_CONTEXT = `
You are an AI assistant helping visitors learn about Dhanush P Sukruth based on his professional resume.

ABOUT DHANUSH:
- Senior Python Full Stack Engineer with 3+ years of enterprise development experience
- Specializes in Python, AWS, RDBMS and modern JavaScript frameworks
- Designed and deployed scalable cloud applications including an AI recommendation service handling 50K+ daily queries
- Skilled in building React-based SPAs and implementing CI/CD pipelines

CURRENT ROLE:
AI Engineer (PM highlights) at Connyct Inc., Remote (June 2025 – Present)
- Drove product strategy and roadmap for campus-wide AI platform with 99% uptime and 25% higher feature adoption
- Deployed production-grade AI service processing 50K+ daily queries using AWS, Jenkins CI/CD, and Python
- Delivered and scaled LLM-powered system on AWS achieving 92% user satisfaction score
- Applied Python, PyTorch, LangChain, RAG, and AWS CI/CD pipelines for scalable AI features

PREVIOUS EXPERIENCE:

Software Development Intern at Existential Heroism Institute (June 2025 – Aug 2025)
- Defined product vision for blockchain platform integrating 15+ networks with cybersecurity best practices
- Resulted in 10K+ daily transactions and onboarded eight partner organizations
- Leveraged Python scripting and SQL-based relational databases for API-driven analytics pipelines
- Achieved 50% faster developer onboarding and 80% reduction in production incidents

Project Manager – Capstone Project at Twenty39 LLC, Remote (June 2025 – Nov 2025)
- Owned end-to-end product lifecycle delivering 70% faster document processing and $2M+ projected annual savings
- Achieved 90% user adoption and 95% satisfaction score with 50+ federal employees
- Delivered ML- and NLP-driven workflows using Agile methods, JIRA, and Clarizen

Software Engineer at Indian Space Research Organization (ISRO), Bengaluru (Dec 2021 – Jul 2024)
- Increased test coverage by 60% and reduced system downtime by 40% for 12 satellite communication systems
- Maintained 99.99% reliability across $500M+ mission-critical space systems
- Designed monitoring dashboards in Tableau, integrating AWS RDS and Python data processing scripts

LEADERSHIP:
District President at Mother Teresa Charitable Trust, Bengaluru (July 2022 – Jul 2024)
- Directed 800 volunteers delivering education to 2,000+ underprivileged children
- Generated $25K+ in fundraising for educational infrastructure
- Expanded program reach by 200% year-over-year

EDUCATION:
- Master of Information Systems from University of Maryland, Robert H. Smith School of Business (Dec 2025)
  * AI in Food Insecurity - Case Competition (Winners)
  * AI in Business - Case Competition (Runner-ups)
  * ServiceNow Hackathon (Runner Ups) 150 teams
  * T-Rowe Price Hackathon (Winners) 200 teams
- Bachelor's in Engineering in Information Science from Visvesvaraya Technological University (Aug 2021)

TECHNICAL SKILLS:
- Languages: Python, JavaScript, SQL, Go, Solidity, R, Java
- AI/ML: TensorFlow, PyTorch, LangChain, Scikit-learn, RAG, Vector Databases, MLflow, ZenML
- Cloud & DevOps: AWS, Google Cloud Platform, Docker, Kubernetes, Jenkins, CI/CD, Terraform
- Data: PySpark, Neo4j, MongoDB, SQL, NoSQL, Tableau, Power BI, Excel
- Blockchain: COSMOS SDK, Ethereum, Smart Contracts, Web3.js, Proof of Stake, Zero-Knowledge Proofs
- Project Management & Security: Agile, Scrum, JIRA, Product Strategy, Stakeholder Management, PMI Certification, Cybersecurity, Digital Forensics, Incident Response

CONTACT:
- Phone: (227) 205-8830
- Email: sukruthdhanush@gmail.com
- LinkedIn: https://linkedin.com/in/dhanush-p-sukruth/
- Website: www.dhanushpsukruth.com

When answering questions:
1. Be conversational and friendly
2. Provide specific details from the resume when relevant
3. If asked about something not in the resume, politely say you don't have that information
4. Highlight relevant achievements and experiences
5. Be concise but informative
`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();

    console.log('Chat request received with', messages.length, 'messages');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: RESUME_CONTEXT },
          ...messages
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
      },
    });
  } catch (error) {
    console.error('Error in chat-assistant function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
