import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Logo, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Jeremy",
  lastName: "Smith",
  name: `Jeremy Smith`,
  role: "Entrepreneur & Technology Leader",
  avatar: "/images/1726940932303.jpeg",
  email: "jeremy@neural-voice.ai",
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
  headline: <>Building innovative companies and scaling high-performing teams</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Recent Work</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured project
        </Text>
      </Row>
    ),
    href: "/work/neural-voice",
  },
  subline: (
    <>
      I'm Jeremy, an entrepreneur and technology leader with a track record of founding companies, raising capital, and building products from concept to market.
      <br /> Proven expertise in AI, sales leadership, go-to-market strategy, and scaling businesses from zero to revenue.
    </>
  ),
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
        Jeremy is an entrepreneur and technology leader with extensive experience building companies from the ground up. 
        Proven track record in fundraising (£1m+ raised), product development, team building, and go-to-market execution. 
        Expertise spans AI and emerging technologies, B2B SaaS sales, operational leadership, and scaling businesses from concept to revenue and beyond.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Neural Voice",
        timeframe: "Sep 2023 - Present",
        role: "Co-Founder & CEO",
        achievements: [
          <>
            Founded company from scratch, raising nearly £1m and securing Innovate UK grant (selected from 2,250 competing businesses)
          </>,
          <>
            Built proprietary enterprise AI agent platform from the ground up, working with leading AI providers whilst developing all core technology in-house to create unique conversational capabilities that scale to hundreds of thousands of simultaneous calls with sub-300ms latency, NLP, and sentiment detection
          </>,
          <>
            Integrated platform with 600+ business tools including leading GDS, PMS, and CRM systems; partnered with largest UK travel businesses delivering 87% cost savings versus traditional call centres
          </>,
          <>
            Featured on BBC, ITV, Fox News, NBC, The Independent, Travel Weekly; keynote at ITT 'Humans vs AI' with industry C-suite executives
          </>,
          <>
            Invited to Downing Street for AI policy work with Labour government; presented at universities, AI conferences, and travel events
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
            Founded AI incubator identifying and developing fresh university AI talent to work on internal and external AI startups
          </>,
          <>
            Grew business with expanding portfolio of AI ventures; developed lifelike AI avatars for travel, legal, and sales sectors
          </>,
          <>
            Launched Sales Compass as Neural River product, providing fractional sales leadership and strategic guidance to B2B technology companies
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
            Led UK market expansion, establishing entire UK sales operation from ground up; recruited and managed high-performing BDR team
          </>,
          <>
            Implemented Sales Enablement platform and designed inbound/outbound strategies; streamlined operations by integrating underutilised systems
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
            Led Inside Sales team of 8 representatives; launched partnership division; achieved 100%+ target attainment across all ramped reps in Q2 2022
          </>,
          <>
            Rapidly promoted through four roles in under two years; established training frameworks and became recognised expert in education sector
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Education",
    institutions: [
      {
        name: "Bangor University, Wales",
        description: <>MA in Business and Marketing (Distinction, 2019-20). BSc in Business and Finance (2:1, 2016-19). President of Bangor Poker Society (2018-19, Won Best New Opportunity Award). Silver Duke of Edinburgh Award.</>,
      },
      {
        name: "Collyer's College, Horsham",
        description: <>A Levels: Business Studies, Electronics, Computer Science (2014-16)</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Key Skills & Expertise",
    skills: [
      {
        title: "AI & Technology",
        description: (
          <>Expert in Conversational AI, Voice Technology, NLP, Machine Learning, Platform Architecture, and API Integration. Built enterprise-scale AI platforms handling hundreds of thousands of concurrent calls with sub-300ms latency.</>
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
        title: "Leadership & Strategy",
        description: (
          <>Proven track record in fundraising (£1m+), strategic planning, stakeholder engagement, public speaking, team building, and agile methodologies. Successfully led companies from concept to enterprise deployment.</>
        ),
        tags: [],
        images: [],
      },
      {
        title: "Sales & Business Development",
        description: (
          <>Extensive experience in B2B SaaS, Enterprise Sales, Pipeline Management, Customer Success, Market Expansion, and Sales Enablement across travel, HR-tech, marketing automation, and SaaS sectors.</>
        ),
        tags: [],
        images: [],
      },  
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
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
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
