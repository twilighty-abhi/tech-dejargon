/**
 * IDLIStack Tech De-jargoniser
 * Knowledge base of tech jargon, relatable everyday metaphors, 
 * and non-profit/social sector impact context.
 */

const JARGON_DATABASE = [
  {
    id: "api",
    term: "API",
    category: "Connectivity & Data",
    techPhrase: "Just use the API to pull the donor list.",
    plainExplanation: "Think of an API like a waiter. You don't go to the kitchen to make your own food. You tell the waiter, they take the request to the kitchen, and bring back what you asked for. APIs work the same way. They let different apps and systems ask each other for information or actions without needing to know what's happening behind the scenes.",
    simpleAnalogy: "A waiter shuttling requests between your table and the kitchen.",
    impactContext: "Instead of manually exporting CSVs and copying donor lists between platforms, an API lets your website talk directly to your CRM automatically.",
    reversePhrase: "I want our website donation form to automatically update our donor records.",
    reverseTechSpec: "Integrate the website form with our CRM via their REST API endpoint on submission."
  },
  {
    id: "docker",
    term: "Docker",
    category: "Infrastructure & Hosting",
    techPhrase: "We should package the NGO reporting tool in Docker containers.",
    plainExplanation: "Think of Docker like shipping containers. Before shipping containers, goods were packed in random sacks, crates, and barrels that often spilled or couldn't fit on trucks. Docker puts an entire app—its code, tools, and settings—into a neat, standardized box that runs identically on any computer or cloud server without 'it worked on my machine' excuses.",
    simpleAnalogy: "Standardized shipping containers for software applications.",
    impactContext: "Makes deploying tools like Ghost, Listmonk, or WordPress on IDLIStack instant and reliable, avoiding fragile server configurations.",
    reversePhrase: "Can we run this tool on any server without getting stuck in messy setup errors?",
    reverseTechSpec: "Provide a Dockerfile and docker-compose.yml configuration to containerize the service."
  },
  {
    id: "ssl-certificate",
    term: "SSL Certificate",
    category: "Security & Trust",
    techPhrase: "Make sure the SSL certificate is configured or donors will see security alerts.",
    plainExplanation: "Think of SSL like a tamper-proof envelope with a certified wax seal. If you send a regular letter (HTTP), anyone carrying the mail can read or swap the page. With SSL (HTTPS), the envelope is encrypted so only the recipient can open it, and browsers display the safe padlock icon next to your URL.",
    simpleAnalogy: "A tamper-proof armored envelope with a certified seal.",
    impactContext: "Without SSL, browsers label your non-profit website 'Not Secure', scaring away potential donors and supporters.",
    reversePhrase: "Why is the browser saying our website is dangerous and not secure?",
    reverseTechSpec: "Issue and auto-renew a Let's Encrypt SSL/TLS certificate with an HTTPS redirect."
  },
  {
    id: "traffic-spike",
    term: "Traffic Spike",
    category: "Performance & Scaling",
    techPhrase: "We had a huge traffic spike during Giving Tuesday that overloaded the database.",
    plainExplanation: "Think of a traffic spike like 1,000 visitors suddenly trying to squeeze through a single revolving door at the same minute. Normally, your website handles a steady trickle of people, but when a campaign goes viral, the surge of simultaneous requests can cause pages to stall or crash if the server can't scale up.",
    simpleAnalogy: "A flash-mob trying to enter a single door all at once.",
    impactContext: "When your fundraising campaign is featured on national media, your website needs caching or auto-scaling so it doesn't crash right when donations pour in.",
    reversePhrase: "Our website went down right when the newspaper article about us was published!",
    reverseTechSpec: "We experienced high concurrent requests; configure CDN page caching and scale server capacity."
  },
  {
    id: "plugin",
    term: "Plugin",
    category: "Websites & Tools",
    techPhrase: "Let's install a WordPress plugin to handle volunteer registrations.",
    plainExplanation: "Think of a plugin like an attachment for a kitchen stand-mixer or a vacuum cleaner. The base machine works fine on its own, but when you snap on a pasta maker or form builder attachment, it suddenly gains an entirely new skill without you having to build a new machine from scratch.",
    simpleAnalogy: "A snap-on accessory that gives your existing tool a new superpower.",
    impactContext: "Plugins allow non-profits to add donation forms, multilingual support, or analytics in minutes instead of paying for custom software.",
    reversePhrase: "Can we add an interactive event calendar to our website without rebuilding it?",
    reverseTechSpec: "Install and configure a modular plugin/extension compatible with our CMS."
  },
  {
    id: "cron-job",
    term: "Cron Job",
    category: "Automation & Workflows",
    techPhrase: "We scheduled a cron job to send donor tax receipts every midnight.",
    plainExplanation: "Think of a cron job like a very punctual robot alarm clock. You tell it: 'Every Sunday at 8:00 AM' or 'Every midnight', wake up, do this exact checklist (like backing up files or sending receipts), and then go back to sleep. It never forgets, oversleeps, or complains.",
    simpleAnalogy: "A robot butler that executes scheduled chores on the exact minute.",
    impactContext: "Automates repetitive admin chores (like weekly donor digests or backup archives) so your team can focus on fieldwork.",
    reversePhrase: "Can the system automatically generate our weekly donor summary every Monday morning?",
    reverseTechSpec: "Create a scheduled cron job (e.g. 0 8 * * 1) to trigger the report generator script."
  },
  {
    id: "webhook",
    term: "Webhook",
    category: "Connectivity & Data",
    techPhrase: "The payment gateway sends a webhook to update our donor status in real time.",
    plainExplanation: "Think of a webhook like a doorbell. Instead of you standing by the front gate checking every 10 seconds if a delivery driver arrived (which is called polling), the delivery person simply pushes the doorbell when they arrive. A webhook is a message an app sends automatically the split second an event happens.",
    simpleAnalogy: "A doorbell that rings the moment something important happens.",
    impactContext: "Instantly sends a thank-you WhatsApp message or email the exact moment a donation succeeds.",
    reversePhrase: "How do we trigger an immediate WhatsApp message the second someone donates?",
    reverseTechSpec: "Configure a webhook endpoint from the payment gateway to trigger Whatomate or Listmonk."
  },
  {
    id: "cache",
    term: "Cache",
    category: "Performance & Scaling",
    techPhrase: "Clear your browser cache, and let's check Redis cache hit rates.",
    plainExplanation: "Think of a cache like a notepad on your desk with the answers to frequently asked questions. Instead of walking down to the library or file cabinet every time someone asks a question, you glance at the sticky note on your desk. Caching saves ready-made versions of web pages so servers don't re-calculate them every time.",
    simpleAnalogy: "A cheat-sheet sticky note on your desk for fast answers.",
    impactContext: "Speeds up website page loading drastically and prevents servers from crashing during high-traffic campaigns.",
    reversePhrase: "Why are some users seeing the old version of our website even after we updated it?",
    reverseTechSpec: "The CDN or browser cache hasn't expired; purge the edge cache and hard refresh."
  },
  {
    id: "database",
    term: "Database",
    category: "Connectivity & Data",
    techPhrase: "We need to run a migration on the PostgreSQL database schema.",
    plainExplanation: "Think of a database like a giant, super-organized digital warehouse of filing cabinets with an instant search clerk. Instead of messy scattered spreadsheets across 15 staff laptops, a database stores all your members, donations, and project data in one secure, structured vault.",
    simpleAnalogy: "A climate-controlled, indexed vault of digital filing cabinets.",
    impactContext: "The central single source of truth for all your beneficiaries, grant records, and donor transactions.",
    reversePhrase: "We have donor data scattered across 10 Excel sheets and it keeps getting lost.",
    reverseTechSpec: "Migrate and consolidate the tabular data into a centralized relational database."
  },
  {
    id: "open-source",
    term: "Open Source",
    category: "Software Philosophy",
    techPhrase: "IDLIStack helps NGOs run open-source tools instead of expensive proprietary SaaS.",
    plainExplanation: "Think of open source like a world-famous family recipe that is shared publicly with everyone. Anyone can inspect the ingredients, cook it, adapt it to their taste, and share improvements. Unlike commercial secret sauces (where you pay exorbitant monthly fees and can never peek inside), open source belongs to the community.",
    simpleAnalogy: "A shared community recipe book that no single company locks behind a paywall.",
    impactContext: "Non-profits avoid massive recurring licensing fees and vendor lock-in by using proven tools like WordPress, Ghost, and Listmonk.",
    reversePhrase: "Why should our NGO pay thousands of dollars every year for proprietary tools when community alternatives exist?",
    reverseTechSpec: "Adopt self-hosted FOSS (Free and Open Source Software) solutions deployed via managed hosting."
  },
  {
    id: "ci-cd",
    term: "CI/CD Pipeline",
    category: "Development & Operations",
    techPhrase: "The new feature is blocked because the CI/CD pipeline tests failed.",
    plainExplanation: "Think of a CI/CD pipeline like an automated vehicle inspection and delivery conveyer belt. Every time an engineer writes new code, it automatically passes through safety scanners, brake tests, and paint checks. If all tests pass, it rolls straight out to the public showroom without manual tinkering.",
    simpleAnalogy: "An automated quality-inspection and conveyor delivery system.",
    impactContext: "Ensures bug fixes and website updates go live smoothly without accidentally breaking donation forms or login pages.",
    reversePhrase: "How do we make sure new code updates don't crash our live website?",
    reverseTechSpec: "Implement continuous integration and continuous deployment (CI/CD) with automated regression tests."
  },
  {
    id: "staging-vs-prod",
    term: "Staging vs. Production",
    category: "Development & Operations",
    techPhrase: "Let's test the donor checkout in staging before pushing to prod.",
    plainExplanation: "Production ('Prod') is the live theater stage with real ticket-paying audience members watching. Staging is the exact replica rehearsal room backstage with the same lights, props, and costumes. You make your mistakes in the rehearsal room so the live audience never sees a blunder.",
    simpleAnalogy: "The backstage rehearsal hall vs. the live auditorium stage.",
    impactContext: "Never test new features or major redesigns directly on your live website where real donors are making transactions.",
    reversePhrase: "Can we test the new donation flow privately before our real supporters see it?",
    reverseTechSpec: "Deploy the build to an isolated staging environment with mock payment gateways."
  },
  {
    id: "microservices",
    term: "Microservices",
    category: "Architecture",
    techPhrase: "We are decoupling our monolith into loosely coupled microservices.",
    plainExplanation: "Think of a traditional 'monolith' like a Swiss Army knife: all the tools share one metal handle, and if the main hinge breaks, you can't use the knife or scissors. Microservices are like a tool belt with separate, dedicated tools: if your screwdriver gets misplaced, your hammer still works perfectly.",
    simpleAnalogy: "A specialized tool belt instead of an all-in-one Swiss Army knife.",
    impactContext: "If your email notification tool is slow, it won't take down your main donation collection page.",
    reversePhrase: "If one part of our software breaks, does it have to bring down everything else?",
    reverseTechSpec: "Architect the services into modular, independent microservices communicating via APIs."
  },
  {
    id: "latency",
    term: "Latency",
    category: "Performance & Scaling",
    techPhrase: "The high network latency is causing drop-offs on rural mobile connections.",
    plainExplanation: "Think of bandwidth like the width of a highway (how many cars can fit side-by-side), and latency like the speed limit or delay between asking a question and hearing the response (echo time). High latency feels like a sluggish lag on a poor international phone call.",
    simpleAnalogy: "The lag or echo delay before someone responds on a bad telephone line.",
    impactContext: "For field workers in rural areas on 2G/3G connections, high latency means forms spin forever and fail to submit.",
    reversePhrase: "Our field volunteers in remote villages say the app takes 15 seconds to respond.",
    reverseTechSpec: "Optimize asset payloads, enable edge caching, and build offline-first sync to combat network latency."
  },
  {
    id: "git",
    term: "Git / GitHub",
    category: "Development & Collaboration",
    techPhrase: "Push your commits to a feature branch and open a PR on GitHub.",
    plainExplanation: "Think of Git like a magical time machine and supreme track-changes system for documents. It remembers every word ever added, who wrote it, and when. If someone accidentally deletes an entire chapter, you can rewind time with one click. GitHub is the collaborative community library where everyone shares their work.",
    simpleAnalogy: "A time-machine version-history backup for every line of code.",
    impactContext: "Ensures that if a developer leaves your project, all past work, notes, and code history remain safe and organized.",
    reversePhrase: "How do we keep track of changes so we can undo mistakes if someone breaks something?",
    reverseTechSpec: "Maintain version control in a Git repository with branching policies and Pull Request reviews."
  },
  {
    id: "2fa",
    term: "Two-Factor Authentication (2FA)",
    category: "Security & Trust",
    techPhrase: "Enforce 2FA across all admin accounts on the donor CRM.",
    plainExplanation: "Think of 2FA like entering an ATM. You need both your physical debit card (something you have) and your secret 4-digit PIN (something you know). Even if a thief steals your PIN, they cannot withdraw money without the physical card.",
    simpleAnalogy: "Requiring both a key and a secret password to open the front door.",
    impactContext: "Protects sensitive beneficiary data and donor financial details from being stolen by hacked passwords.",
    reversePhrase: "How can we make sure our admin accounts don't get hacked even if someone guesses a password?",
    reverseTechSpec: "Mandate Multi-Factor Authentication (MFA / 2FA) via authenticator app (TOTP) or SMS."
  },
  {
    id: "dns",
    term: "DNS (Domain Name System)",
    category: "Infrastructure & Hosting",
    techPhrase: "Update the DNS A-record to point to the new IDLIStack IP address.",
    plainExplanation: "Think of DNS like the phone contacts book on your mobile phone. You don't memorize your friend Priya's 10-digit phone number; you just tap 'Priya'. DNS translates human-friendly names like 'idlistack.com' into raw computer IP addresses like '142.250.190.46'.",
    simpleAnalogy: "The internet's phonebook translating names into dialable numbers.",
    impactContext: "When moving your website to IDLIStack, updating DNS is what points your domain name to your new fast server.",
    reversePhrase: "How do we connect our custom web domain (ourngo.org) to our new hosted application?",
    reverseTechSpec: "Configure DNS records (A, CNAME, TXT) at your domain registrar pointing to the host IP."
  },
  {
    id: "saas",
    term: "SaaS (Software as a Service)",
    category: "Software Philosophy",
    techPhrase: "We are evaluating SaaS CRM options vs. self-hosting an open-source tool.",
    plainExplanation: "Think of SaaS like renting a fully furnished apartment. You pay monthly rent, the landlord fixes the plumbing, but you can never knock down a wall, and if the landlord doubles your rent next year, you must pay or leave. Self-hosting is like owning your home: more initial autonomy, but total ownership of your data.",
    simpleAnalogy: "Renting a furnished flat instead of buying and owning your own furniture.",
    impactContext: "Non-profits often start on free SaaS tiers, but get locked into exorbitant per-user pricing as they grow.",
    reversePhrase: "Should we rent an expensive subscription software or own our open-source tools?",
    reverseTechSpec: "Compare total cost of ownership between proprietary SaaS subscriptions and managed open-source hosting."
  },
  {
    id: "frontend-backend",
    term: "Frontend vs. Backend",
    category: "Architecture",
    techPhrase: "The frontend looks clean, but the backend API is returning 500 errors.",
    plainExplanation: "Think of a restaurant. The frontend is the dining hall: ambient lighting, comfortable chairs, menu typography, and cutlery. The backend is the kitchen: the stoves, refrigerators, recipe books, prep chefs, and dishwashers doing the heavy lifting out of sight.",
    simpleAnalogy: "The dining room (what guests see) vs. the kitchen (where food is prepared).",
    impactContext: "If your donation page looks beautiful but clicking 'Pay' fails, the issue is in the backend processing.",
    reversePhrase: "Our website design looks great, but clicking the submit button doesn't do anything!",
    reverseTechSpec: "The client-side UI is functional, but the server-side backend endpoint or database is failing."
  },
  {
    id: "bandwidth",
    term: "Bandwidth",
    category: "Performance & Scaling",
    techPhrase: "Our hosting tier exceeded the monthly bandwidth quota during the video launch.",
    plainExplanation: "Think of bandwidth like the diameter of a water pipe. A narrow garden hose can only deliver a small flow of water each minute, while a massive municipal water main can supply an entire neighborhood simultaneously. More bandwidth means more data can flow to your website visitors at once.",
    simpleAnalogy: "The diameter of a water pipe determining how much volume flows through.",
    impactContext: "If you host heavy video files directly on your website, you can quickly exhaust your monthly bandwidth limits.",
    reversePhrase: "Why are we being charged overage fees for high data usage on our hosting plan?",
    reverseTechSpec: "High volume of media traffic exceeded our transfer quota; offload media assets to object storage."
  },
  {
    id: "rate-limit",
    term: "Rate Limiting",
    category: "Security & Trust",
    techPhrase: "The WhatsApp gateway rate-limited our volunteer notification broadcast.",
    plainExplanation: "Think of rate limiting like a bouncer at a club who only allows 10 people to enter per minute so nobody gets trampled. If an app tries to send 500 messages per second, the receiving service slams the brakes and tells you to slow down.",
    simpleAnalogy: "A turnstile or bouncer regulating the pace of people passing through.",
    impactContext: "If you try to blast 10,000 WhatsApp alerts at once via Whatomate, you must pace them to prevent WhatsApp from blocking your phone number.",
    reversePhrase: "Why did WhatsApp stop sending our messages halfway through our volunteer broadcast?",
    reverseTechSpec: "We hit API rate limits (HTTP 429); implement request queuing with exponential backoff."
  },
  {
    id: "serverless",
    term: "Serverless",
    category: "Infrastructure & Hosting",
    techPhrase: "We can run the donation receipt PDF generator as a serverless function.",
    plainExplanation: "Think of serverless like calling an Uber instead of buying and maintaining a car in a garage. You don't pay for gas, insurance, or parking while the car sits idle. A car magically appears only when you need a ride, takes you to your destination, and vanishes. You only pay for the exact miles driven.",
    simpleAnalogy: "Taking an on-demand taxi only when needed instead of paying 24/7 car upkeep.",
    impactContext: "Ideal for tasks that run only once in a while, saving hosting costs when traffic is low.",
    reversePhrase: "Can we avoid paying for a server that sits idle 95% of the day?",
    reverseTechSpec: "Deploy the workload onto event-driven serverless cloud functions (FaaS)."
  },
  {
    id: "sql",
    term: "SQL (Structured Query Language)",
    category: "Connectivity & Data",
    techPhrase: "Write a SQL query to filter all donors who contributed over ₹10,000 in FY25.",
    plainExplanation: "Think of SQL like a polite, precise conversation with a librarian who has cataloged every book in the world. You say: 'Librarian, please find all records where the state is Karnataka and donation is greater than ₹10,000, sorted by date.' The librarian hands you the exact list instantly.",
    simpleAnalogy: "A standardized questioning language to ask a librarian for precise records.",
    impactContext: "The language your tech team uses to pull grant metrics, audit reports, and donor impact stats.",
    reversePhrase: "How can we pull a customized report of our top recurring donors for our annual report?",
    reverseTechSpec: "Execute a parameterized SQL query with aggregate filters on the donations table."
  },
  {
    id: "tech-debt",
    term: "Technical Debt",
    category: "Development & Operations",
    techPhrase: "We need a refactoring sprint because accumulated tech debt is slowing feature work.",
    plainExplanation: "Think of technical debt like taking out a financial loan to build a quick makeshift shed. It gets you out of the rain today, but if you never reinforce the roof, the interest accumulates. Eventually, you spend all your time patching leaks instead of building anything new.",
    simpleAnalogy: "Taking a quick shortcut now that requires paying heavy interest later.",
    impactContext: "When quick hacks are made to launch a campaign fast, the team must spend time cleaning the code later or future changes will become painfully slow.",
    reversePhrase: "Why does it take three weeks to make a tiny change to our website that used to take an hour?",
    reverseTechSpec: "Accumulated technical debt and tightly coupled legacy code requires dedicated refactoring."
  }
];

// Curated Summit Bingo / Hilarious Jargon Sentences
const SUMMIT_BINGO_QUOTES = [
  "“Just use the API to pull the donor list.”",
  "“We should package the NGO reporting tool in Docker containers.”",
  "“Make sure the SSL certificate is configured or donors will see security alerts.”",
  "“We had a huge traffic spike during Giving Tuesday that overloaded the database.”",
  "“Let's install a WordPress plugin to handle volunteer registrations.”",
  "“We scheduled a cron job to send donor tax receipts every midnight.”",
  "“The payment gateway sends a webhook to update our donor status in real time.”",
  "“Clear your browser cache, and let's check Redis cache hit rates.”",
  "“We need to run a migration on the PostgreSQL database schema.”",
  "“IDLIStack helps NGOs run open-source tools instead of expensive proprietary SaaS.”",
  "“The frontend looks clean, but the backend API is returning 500 errors.”",
  "“Enforce 2FA across all admin accounts on the donor CRM.”",
  "“Let's test the donor checkout in staging before pushing to prod.”",
  "“Update the DNS A-record to point to the new IDLIStack IP address.”",
  "“The WhatsApp gateway rate-limited our volunteer notification broadcast.”"
];

// Interactive Summit Quiz Questions
const SUMMIT_QUIZ_QUESTIONS = [
  {
    question: "A developer tells you: 'Think of this like a waiter who shuttles food orders between you and the kitchen.' What are they describing?",
    options: ["Docker", "An API", "A Cron Job", "SSL Certificate"],
    answerIndex: 1,
    explanation: "An API acts like a waiter! It delivers requests from your app to a server and brings back the information."
  },
  {
    question: "Which tech term represents a robot butler that wakes up at the exact same scheduled time every day to do chores?",
    options: ["A Cron Job", "A Webhook", "A Firewall", "A Domain Name"],
    answerIndex: 0,
    explanation: "A Cron Job is an automated task scheduler that runs commands at recurring dates or times."
  },
  {
    question: "Why does an SSL Certificate matter for an NGO fundraising website?",
    options: [
      "It makes the website text load in dark mode",
      "It encrypts donor payment info and gives your site the green padlock of trust",
      "It sends WhatsApp messages to your staff",
      "It turns your WordPress site into a mobile app"
    ],
    answerIndex: 1,
    explanation: "SSL encrypts sensitive traffic, keeping donor credit cards and passwords safe from eavesdroppers."
  },
  {
    question: "What is a 'Webhook' best compared to in everyday life?",
    options: [
      "A doorbell that rings the exact second someone arrives",
      "A printed annual report on a shelf",
      "A password written on a sticky note",
      "An offline hard drive"
    ],
    answerIndex: 0,
    explanation: "A Webhook instantly alerts your system when an event happens (like a successful donation), just like a doorbell!"
  }
];
