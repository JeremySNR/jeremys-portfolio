import { About, Blog, Gallery, Home, News, Newsletter, Person, Social, Work } from "@/types";
import { Line, Logo, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Jeremy",
  lastName: "Smith",
  name: `Jeremy Smith`,
  role: "AI Innovation Partner & Founder",
  avatar: "/images/1726940932303.jpeg",
  email: "jezalexandersmith@gmail.com",
  location: "Europe/London", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>Updates on AI, entrepreneurship, and technology insights</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://linkedin.com/in/jsmithsales",
  },
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/JeremySNR",
  },
  {
    name: "Website",
    icon: "globe",
    link: "https://neural-voice.ai",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: (
    <>
      AI leadership that ships products, wins revenue, and{" "}
      <em className="accent-italic">makes headlines</em>
    </>
  ),
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Now</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          AI Innovation Partner, Travel Counsellors
        </Text>
      </Row>
    ),
    href: "/about",
  },
  subline: (
    <>
      I'm Jeremy. I lead AI transformation and strategy across Travel Counsellors, a £1.5bn
      PE-backed travel group, after founding Neural Voice and raising £1m as a first-time CEO.
      <br /> I've built sales teams from scratch, taken enterprise AI from pitch to production, and
      I'm still technical enough to build the product myself.
    </>
  ),
  press: {
    display: true,
    title: "As featured in",
    outlets: [
      "BBC News",
      "WIRED",
      "The Washington Post",
      "NBC News",
      "Fox News",
      "Euronews",
      "Travel Weekly",
    ],
  },
  highlights: {
    display: true,
    items: [
      { value: "£1.5bn", label: "travel group where I lead AI" },
      { value: "£1m+", label: "raised as a first-time founder" },
      { value: "87%", label: "cost saving delivered for clients" },
      { value: "2", label: "world-first AI political avatars" },
    ],
  },
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        I'm a commercial leader and founder working at the sharp end of AI. I lead AI strategy and
        product at Travel Counsellors, a £1.5bn PE-backed travel group, after founding Neural Voice,
        where I raised nearly £1m as a first-time CEO, won an Innovate UK grant against 2,250 other
        businesses, and took an enterprise platform from an idea to revenue with the UK's largest
        travel companies as clients. I sit on the board of the Institute of Travel &amp; Tourism as
        a Director, and I was named one of TTG's 30 Under 30. That work keeps pulling me into
        national AI policy too: I collaborate with Westminster on strategy for UK AI sovereignty,
        work with the Yorkshire APPG on AI strategy and deployment, campaign for AI funding in the
        North of England, and building AI Mark put me in direct conversation with OpenAI's policy
        leadership. What makes me unusual is range: I can own the strategy, raise the money, close
        the deals, and hire the team, and then sit down and build the product myself. On the side I
        ship open-source AI tools and publish research on multi-agent systems.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Travel Counsellors",
        timeframe: "2025 - Present",
        role: "AI Innovation Partner",
        achievements: [
          <>
            Leading AI transformation and strategy across a £1.5bn travel group, finding the use
            cases that actually matter and taking them from prototype to production
          </>,
          <>
            Built and shipped real products: voice agents for recruitment (hooked into Zoom Contact
            Center), AI customer and app support agents, and a ChatGPT app for travel matching
          </>,
          <>
            Gave the keynote at TC Together in Manchester, walking counsellors and senior leadership
            through where we're taking AI
          </>,
        ],
        images: [],
      },
      {
        company: "Neural Voice",
        timeframe: "Sep 2023 - 2025",
        role: "Co-Founder & CEO",
        achievements: [
          <>
            Founded company from scratch, raising nearly £1m and securing Innovate UK grant
            (selected from 2,250 competing businesses)
          </>,
          <>
            Built proprietary enterprise AI agent platform from the ground up, working with leading
            AI providers whilst developing all core technology in-house to create unique
            conversational capabilities that scale to hundreds of thousands of simultaneous calls
            with sub-300ms latency, NLP, and sentiment detection
          </>,
          <>
            Integrated platform with 600+ business tools including leading GDS, PMS, and CRM
            systems; partnered with largest UK travel businesses delivering 87% cost savings versus
            traditional call centres
          </>,
          <>
            Featured on BBC, ITV, Fox News, NBC, The Independent, Travel Weekly; keynote at ITT
            'Humans vs AI' with industry C-suite executives
          </>,
          <>
            Invited to Downing Street for AI policy work with Labour government; presented at
            universities, AI conferences, and travel events
          </>,
        ],
        images: [],
      },
      {
        company: "Neural River",
        timeframe: "Jul 2023 - Mar 2024",
        role: "Co-Founder",
        achievements: [
          <>
            Founded AI incubator identifying and developing fresh university AI talent to work on
            internal and external AI startups
          </>,
          <>
            Grew business with expanding portfolio of AI ventures; developed lifelike AI avatars for
            travel, legal, and sales sectors
          </>,
          <>
            Launched Sales Compass as Neural River product, providing fractional sales leadership
            and strategic guidance to B2B technology companies
          </>,
        ],
        images: [],
      },
      {
        company: "AssessFirst UK",
        timeframe: "Sep 2022 - Jun 2023",
        role: "BDR/SDR Manager",
        achievements: [
          <>
            Led UK market expansion, establishing entire UK sales operation from ground up;
            recruited and managed high-performing BDR team
          </>,
          <>
            Implemented Sales Enablement platform and designed inbound/outbound strategies;
            streamlined operations by integrating underutilised systems
          </>,
        ],
        images: [],
      },
      {
        company: "Force24 - Marketing Automation",
        timeframe: "Oct 2020 - Sep 2022",
        role: "Inside Sales Manager",
        achievements: [
          <>
            Led Inside Sales team of 8 representatives; launched partnership division; achieved
            100%+ target attainment across all ramped reps in Q2 2022
          </>,
          <>
            Rapidly promoted through four roles in under two years; established training frameworks
            and became recognised expert in education sector
          </>,
        ],
        images: [],
      },
    ],
  },
  recognition: {
    display: true,
    title: "Roles & Recognition",
    items: [
      {
        title: "Director, Institute of Travel & Tourism (ITT)",
        meta: "Board appointment",
        link: "https://www.itt.co.uk",
      },
      {
        title: "Westminster collaboration on UK AI sovereignty & strategy",
        meta: "AI policy",
      },
      {
        title: "Working with the Yorkshire APPG on AI strategy & deployment",
        meta: "AI policy",
      },
      {
        title: "TTG 30 Under 30",
        meta: "Tomorrow's travel leaders",
        link: "https://www.ttgmedia.com",
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Education",
    institutions: [
      {
        name: "Bangor University, Wales",
        description: (
          <>
            MA in Business and Marketing (Distinction, 2019-20). BSc in Business and Finance (2:1,
            2016-19). President of Bangor Poker Society (2018-19, Won Best New Opportunity Award).
            Silver Duke of Edinburgh Award.
          </>
        ),
      },
      {
        name: "Collyer's College, Horsham",
        description: <>A Levels: Business Studies, Electronics, Computer Science (2014-16)</>,
      },
    ],
  },
  publications: {
    display: true,
    title: "Publications",
    papers: [
      {
        title:
          "Don't Merge Carol: Cross-Inhibition and Protected Dissent in Multi-Agent Language Systems",
        venue: "Zenodo",
        date: "2026",
        description: (
          <>
            A study of multi-agent language systems exploring whether agents can coordinate through
            a shared latent buffer rather than text. Phase 1 introduces a text-level blackboard with
            cross-inhibition and a structurally protected dissenter ("Carol"); Phase 2 introduces
            the Latent Resonance Loop, with Behaviourally-Aligned Prefix Codecs and TIES-inspired
            conflict resolution. Demonstrates that protected dissent and latent-space conflict
            resolution can produce emergent shared representations distinct from any individual
            agent.
          </>
        ),
        link: "https://zenodo.org/records/19467363",
      },
    ],
  },
  talks: {
    display: true,
    title: "Talks & Writing",
    items: [
      {
        title: "Building an AI business",
        meta: "Leeds Business Podcast",
        link: "https://leedsbusinesspodcast.com/podcast/neural-voice-jeremy-smith/",
      },
      {
        title: "AI and Voice Has Come of Age",
        meta: "Interview",
        link: "https://www.youtube.com/watch?v=YdwrcrWwwo0",
      },
      {
        title: "Voice AI That Closes Deals",
        meta: "Talk",
        link: "https://www.youtube.com/watch?v=kmzExzu-wr4",
      },
      {
        title: "Voices of Tomorrow: My Vision for Conversational AI",
        meta: "Essay on Medium",
        link: "https://medium.com/@jeremy_32707/voices-of-tomorrow-my-vision-for-conversational-ai-a32e66c42455",
      },
      {
        title: "More Than Words: Crafting AI That Understands the Symphony of Speech",
        meta: "Essay on Medium",
        link: "https://medium.com/@jeremy_32707/more-than-words-crafting-ai-that-understands-the-symphony-of-speech-6cd0df5b0e31",
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Key Skills & Expertise",
    skills: [
      {
        title: "Leadership & Strategy",
        description: (
          <>
            Proven track record in fundraising (£1m+), strategic planning, board-level stakeholder
            engagement, public speaking, and team building. Led companies from concept to enterprise
            deployment, and now leading AI transformation for a £1.5bn travel group.
          </>
        ),
        tags: [],
        images: [],
      },
      {
        title: "Sales & Business Development",
        description: (
          <>
            Extensive experience in B2B SaaS, Enterprise Sales, Pipeline Management, Customer
            Success, Market Expansion, and Sales Enablement across travel, HR-tech, marketing
            automation, and SaaS sectors.
          </>
        ),
        tags: [],
        images: [],
      },
      {
        title: "AI & Technology",
        description: (
          <>
            Expert in Conversational &amp; Voice AI, multi-agent systems, agentic engineering, LLM
            tooling, NLP, platform architecture, and API integration. Built enterprise-scale AI
            platforms handling hundreds of thousands of concurrent calls with sub-300ms latency, and
            ship in TypeScript, Python, and Rust.
          </>
        ),
        tags: [
          {
            name: "AI",
            icon: "openai",
          },
        ],
        images: [],
      },
      {
        title: "Open Source & Research",
        description: (
          <>
            I build and maintain open-source AI tools like Project Foundry (governance for AI coding
            agents) and the snug context-budgeting library, and I publish research on multi-agent
            language systems. Most of it lives on GitHub at JeremySNR.
          </>
        ),
        tags: [
          {
            name: "GitHub",
            icon: "github",
          },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing on AI, travel, and building businesses",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Ventures, products, and research by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/manchester-tc-together.jpg",
      alt: "Jeremy Smith speaking after a keynote at TC Together in Manchester",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/jeremy-interview.jpg",
      alt: "Jeremy Smith during a media interview",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/IMG-20250402-WA0027.jpg",
      alt: "Gallery photo",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/IMG-20251014-WA0001.jpg",
      alt: "Gallery photo",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/ROZ_8680.jpg",
      alt: "Gallery photo",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/PXL_20250319_123231055.jpg",
      alt: "Gallery photo",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/1241067471_HIGH.jpg",
      alt: "Gallery photo",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/PXL_20250916_170927338.jpg",
      alt: "Gallery photo",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/IMG20230809090847_01.jpg",
      alt: "Gallery photo",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/PXL_20251013_202014559.NIGHT.jpg",
      alt: "Gallery photo",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/IMG-20221207-WA0034.jpg",
      alt: "Gallery photo",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/1_20240223_121141_0000.png",
      alt: "Gallery photo",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/20231121_103712_0000.png",
      alt: "Gallery photo",
      orientation: "vertical",
    },
    {
      src: "/images/projects/neural-river/1752133774471.jpeg",
      alt: "Neural River AI Venture Builder",
      orientation: "horizontal",
    },
  ],
};

const news: News = {
  path: "/news",
  label: "News",
  title: `In the news – ${person.name}`,
  description: `Where ${person.name} and his work have been featured in the press`,
  intro: (
    <>
      A running list of where my work has turned up. Some of it people loved, a fair bit of it
      people loved to hate. Either way, here it all is.
    </>
  ),
  items: [
    // AI Steve, 2024
    {
      outlet: "WIRED",
      title: "AI Steve, the chatbot running for UK Parliament",
      date: "Jun 2024",
      tag: "AI Steve",
      link: "https://www.google.com/search?q=wired+AI+Steve+morgan+meaker+member+of+parliament",
      featured: true,
    },
    {
      outlet: "NBC News",
      title: "An AI candidate running for Parliament says AI can humanize politics",
      date: "Jun 2024",
      tag: "AI Steve",
      link: "https://www.nbcnews.com/tech/tech-news/ai-candidate-running-parliament-uk-says-ai-can-humanize-politics-rcna156991",
      featured: true,
    },
    {
      outlet: "Fox News",
      title: "UK parliamentary candidate runs as first AI lawmaker with an interactive avatar",
      date: "Jun 2024",
      tag: "AI Steve",
      link: "https://www.foxnews.com/world/uk-parliamentary-candidate-runs-first-ai-lawmaker-interactive-ai-avatar",
      featured: true,
    },
    {
      outlet: "Gizmodo",
      title: "An AI bot could be the first artificial Member of Parliament",
      date: "Jun 2024",
      tag: "AI Steve",
      link: "https://gizmodo.com/ai-steve-endacott-running-for-parliament-1851533808",
    },
    {
      outlet: "Dazed",
      title: "Meet AI Steve, the chatbot standing for election as a UK MP",
      date: "Jun 2024",
      tag: "AI Steve",
      link: "https://www.dazeddigital.com/life-culture/article/62895/1/meet-ai-steve-endacott-the-chatbot-standing-for-election-as-a-uk-mp-brighton",
    },
    {
      outlet: "Euronews",
      title: "Meet AI Steve, the UK's avatar election candidate",
      date: "Jun 2024",
      tag: "AI Steve",
      link: "https://www.euronews.com/2024/06/13/meet-ai-steve-the-uks-avatar-election-candidate",
    },
    {
      outlet: "Tech Times",
      title: "'AI Steve' is running for Parliament in the UK",
      date: "Jun 2024",
      tag: "AI Steve",
      link: "https://www.techtimes.com/articles/305672/20240613/ai-steve-running-parliament-uk-candidate-made-endacott-neural-voice.htm",
    },
    {
      outlet: "Gulf News",
      title: "Meet AI Steve, AI candidate on the ballot for the UK election",
      date: "Jun 2024",
      tag: "AI Steve",
      link: "https://gulfnews.com/world/europe/meet-ai-steve-ai-candidate-on-the-ballot-for-uk-election-1.1718789686441",
    },
    {
      outlet: "VOA",
      title: "Candidate uses AI version of self in British election",
      date: "Jun 2024",
      tag: "AI Steve",
      link: "https://learningenglish.voanews.com/a/candidate-uses-ai-version-of-self-in-british-election/7663233.html",
    },
    {
      outlet: "Travel Weekly",
      title: "Endacott creates avatar 'AI Steve' to stand in general election",
      date: "Jun 2024",
      tag: "AI Steve",
      link: "https://travelweekly.co.uk/articles/526523/endacott-creates-avatar-ai-steve-to-stand-in-general-election",
    },
    // AI Mark, 2025
    {
      outlet: "BBC News",
      title: "MP becomes first to create himself as an AI bot",
      date: "Aug 2025",
      tag: "AI Mark",
      link: "https://www.bbc.co.uk/news/articles/cy5pr3q6lrpo",
      featured: true,
    },
    {
      outlet: "The Washington Post",
      title: "A politician made an AI clone of himself. The outrage was real.",
      date: "Aug 2025",
      tag: "AI Mark",
      link: "https://www.washingtonpost.com/world/2025/08/06/ai-chatbot-mp-britain-labour/",
      featured: true,
    },
    {
      outlet: "Euronews",
      title: "A British politician turned himself into an AI chatbot: the UK's first virtual MP",
      date: "Aug 2025",
      tag: "AI Mark",
      link: "https://www.euronews.com/next/2025/08/06/a-british-politician-turned-himself-into-an-ai-chatbot-meet-the-uks-first-virtual-mp",
    },
    {
      outlet: "Raconteur",
      title: "Mark Sewards' AI misfire puts the spotlight on bad chatbots",
      date: "Aug 2025",
      tag: "AI Mark",
      link: "https://www.raconteur.net/technology/mark-sewards-ai-misfire-puts-spotlight-on-bad-chatbots",
    },
    {
      outlet: "eWeek",
      title: "UK politician launches the first AI bot of an MP",
      date: "Aug 2025",
      tag: "AI Mark",
      link: "https://www.eweek.com/news/uk-mp-mark-sewards-ai-bot/",
    },
    {
      outlet: "LBC",
      title: "Politician launches the UK's first virtual MP",
      date: "Aug 2025",
      tag: "AI Mark",
      link: "https://www.lbc.co.uk/politics/uk-politics/labour-ai-leeds-mp/",
    },
    {
      outlet: "Yorkshire Evening Post",
      title: "'AI is on its way': Leeds MP's virtual twin sparks debate",
      date: "Aug 2025",
      tag: "AI Mark",
      link: "https://www.yorkshireeveningpost.co.uk/news/politics/leeds-mp-mark-sewards-ai-reaction-5261812",
    },
    // Travel & industry
    {
      outlet: "Travel Weekly",
      title: "Joins Travel Counsellors as its first AI Innovation Partner",
      tag: "Travel",
      link: "https://travelweekly.co.uk/all-content/son-of-travel-counsellor-joins-business-as-ai-innovation-partner",
    },
    {
      outlet: "Travel Weekly",
      title: "Start-up introduces 'AI Emily' as a virtual travel agent",
      tag: "Travel",
      link: "https://travelweekly.co.uk/news/start-up-introduces-ai-emily-as-virtual-travel-agent",
    },
    {
      outlet: "Travolution",
      title: "Travel Counsellors appoints Jeremy Smith to AI Innovation Partner role",
      tag: "Travel",
      link: "https://www.travolution.com/news/travel-sectors/travel-agents/travel-counsellors-appoints-jeremy-smith-to-newly-created-ai-innovation-partner-role/",
    },
    {
      outlet: "Prolific North",
      title: "Travel Counsellors invests in AI with Neural Voice founder",
      tag: "Travel",
      link: "https://www.prolificnorth.co.uk/news/travel-counsellors-invests-in-ai-with-neural-voice-founder/",
    },
    {
      outlet: "TTG",
      title:
        "'AI will soon be part of every travel transaction, but there's hope yet for humans' (ITT 2024)",
      date: "Jun 2024",
      tag: "Travel",
      link: "https://www.ttgmedia.com/news/ai-will-soon-become-a-part-of-every-travel-transaction-but-theres-hope-yet-for-humans-itt-delegates-told-52758",
    },
    // Recognition
    {
      outlet: "TTG",
      title: "Named one of TTG's 30 Under 30, the travel industry's ones to watch",
      tag: "Recognition",
      link: "https://www.ttgmedia.com",
    },
    {
      outlet: "ITT",
      title: "Appointed Director of the Institute of Travel & Tourism",
      tag: "Recognition",
      link: "https://www.itt.co.uk",
    },
    {
      outlet: "GrantUp",
      title: "Neural Voice wins an Innovate UK Smart Grant (£341,810)",
      tag: "Recognition",
      link: "https://www.grantup.co.uk/work/neural-voice-wins-smart-grant-to-revolutionise-contact-centres-with-real-time-voice-ai",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery, news };
