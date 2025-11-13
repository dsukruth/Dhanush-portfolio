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
- Product Manager with 3+ years of technical program management experience at ISRO
- Scaled campus AI platform from 0→50K daily users achieving 92% satisfaction
- Delivered $2M+ projected cost savings for federal AI platform with 90% user adoption
- Technical background in Python, AI/ML, and cloud platforms

CURRENT ROLE:
AI Engineer Intern (PM highlights) at Connyct Inc., New York City (June 2025 – Present)
- Led product strategy and roadmap for campus AI platform serving 10+ departments
- Conducted user research with 50+ students and stakeholders
- Achieved 50K+ daily active queries and 92% user satisfaction score within three months
- Defined product requirements and success metrics for AI recommendation engine
- Achieved 99% uptime and 25% increase in feature adoption

PREVIOUS EXPERIENCE:

Software Development Intern at Existential Heroism Institute (June 2025 – Aug 2025)
- Defined product vision and strategy for blockchain platform integrating 15+ networks
- Resulted in 10K+ daily transactions and onboarded eight partner organizations
- Established product analytics framework achieving 50% faster developer onboarding

Project Manager – Capstone Project at Twenty39 LLC, Washington D.C. (June 2025 – Nov 2025)
- Owned end-to-end product lifecycle through stakeholder interviews
- Delivered 70% faster document processing and $2M+ projected annual savings
- Achieved 90% user adoption and 95% satisfaction score

Software Engineer at Indian Space Research Organization (ISRO), Bengaluru (Dec 2021 – Jul 2024)
- Managed testing product roadmap for 12 satellite communication systems
- Increased test coverage by 60% and maintained 99.99% reliability across $500M+ missions
- Reduced system downtime by 40% through data-driven insights

LEADERSHIP:
District President at Mother Teresa Charitable Trust, Bengaluru (July 2022 – Jul 2024)
- Directed 800 volunteers delivering education to 2,000+ underprivileged children
- Generated $25K+ in fundraising for educational infrastructure
- Expanded program reach by 200% year-over-year

EDUCATION:
- Master of Information Systems from University of Maryland, Robert H. Smith School of Business (Dec 2025)
  * AI in Food Insecurity - Case Competition (Winners)
  * AI in Business - Case Competition (Runner-ups)
- Bachelor's in Engineering in Information Science from Visvesvaraya Technological University (Aug 2021)

TECHNICAL SKILLS:
- Languages: Python, JavaScript, SQL, Go, Solidity, R, Java
- AI/ML: TensorFlow, PyTorch, LangChain, Scikit-learn, RAG, Vector Databases, MLflow, ZenML
- Cloud & DevOps: AWS, Google Cloud Platform, Docker, Kubernetes, Jenkins, CI/CD, Terraform
- Data: PySpark, Neo4j, MongoDB, SQL, NoSQL, Tableau, Power BI, Excel
- Blockchain: COSMOS SDK, Ethereum, Smart Contracts, Web3.js, Proof of Stake, Zero-Knowledge Proofs
- Project Management: Agile, Scrum, JIRA, Product Strategy, Stakeholder Management

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
