/**
 * IDLIStack Tech De-jargoniser
 * Knowledge base of tech jargon, relatable everyday metaphors, 
 * open-source non-profit applications, and social sector impact context.
 */

const JARGON_DATABASE = [
  // ==========================================
  // 🚀 OPEN SOURCE APPS (IDLIStack & Social Sector)
  // ==========================================
  {
    id: "ghost",
    term: "Ghost",
    category: "Open Source Apps",
    techPhrase: "We can deploy Ghost on IDLIStack for our organization's storytelling and newsletter.",
    plainExplanation: "Think of Ghost like your non-profit's own private publishing press and modern magazine stand. Unlike social media algorithms that hide your posts or proprietary newsletter services that charge you based on how many supporters you have, Ghost lets you publish articles and send newsletters straight to donor inboxes with zero platform fees or censorship.",
    simpleAnalogy: "Your non-profit's own private printing press and membership magazine.",
    impactContext: "Gives non-profits total ownership over donor relationships and subscriber lists, without paying steep Substack or Mailchimp cut rates as subscriber counts grow.",
    reversePhrase: "How can we start a clean blog and email newsletter without giving away 10% of membership revenue?",
    reverseTechSpec: "Deploy a Ghost CMS instance with transactional email integration via Mailgun or Listmonk on IDLIStack."
  },
  {
    id: "wordpress",
    term: "WordPress",
    category: "Open Source Apps",
    techPhrase: "We run our NGO main portal on WordPress with customized donation blocks.",
    plainExplanation: "Think of WordPress like a digital Lego set for building any kind of website. It started as a simple diary, but because millions of people created snap-on parts (plugins and themes), you can build anything from a small local community page to a massive national fundraising platform.",
    simpleAnalogy: "The world's most versatile digital Lego kit for websites.",
    impactContext: "Powers over 40% of the world's websites. It means your non-profit will never struggle to find volunteers, agencies, or staff who already know how to update content.",
    reversePhrase: "What is the most flexible open-source website builder that everyone knows how to edit?",
    reverseTechSpec: "Host a containerized WordPress CMS instance with MariaDB/MySQL and object storage on IDLIStack."
  },
  {
    id: "listmonk",
    term: "Listmonk",
    category: "Open Source Apps",
    techPhrase: "We use Listmonk on IDLIStack to broadcast 50,000 monthly donor newsletters.",
    plainExplanation: "Think of Listmonk like having your own private postal distribution center in your backyard. Instead of paying commercial courier companies hundreds of dollars every month to deliver community updates, Listmonk lets you send millions of beautifully formatted emails at virtually zero hosting cost.",
    simpleAnalogy: "A high-speed postal sorting office that sends millions of emails for pennies.",
    impactContext: "Saves non-profits tens of thousands of rupees annually compared to commercial email tools like Mailchimp or Campaign Monitor.",
    reversePhrase: "Can we send newsletters to 100,000 community members without paying high monthly subscription fees?",
    reverseTechSpec: "Deploy Listmonk connected to PostgreSQL and an affordable SMTP provider (e.g. Amazon SES)."
  },
  {
    id: "mattermost",
    term: "Mattermost",
    category: "Open Source Apps",
    techPhrase: "Our field volunteers coordinate emergency relief channels on Mattermost.",
    plainExplanation: "Think of Mattermost like a secure, private community hall for your team's chats, voice huddles, and file sharing. It looks and feels just like Slack or Microsoft Teams, but the data stays 100% inside your own encrypted vault where outside corporations can't scan it.",
    simpleAnalogy: "A private, encrypted community clubhouse that works like Slack.",
    impactContext: "Ideal for human rights, legal aid, and social organizations handling sensitive beneficiary or whistleblower data.",
    reversePhrase: "We need an internal team chat like Slack, but our donor policy forbids storing sensitive beneficiary chats on public clouds.",
    reverseTechSpec: "Self-host Mattermost Enterprise or Team Edition on IDLIStack with end-to-end TLS encryption."
  },
  {
    id: "whatomate",
    term: "Whatomate",
    category: "Open Source Apps",
    techPhrase: "Set up Whatomate by Zerodha to broadcast relief announcements on WhatsApp.",
    plainExplanation: "Think of Whatomate like an automated community WhatsApp manager. It connects to the official WhatsApp Business network and lets your NGO schedule broadcasts, answer FAQs, and guide volunteers through automated chatbots without someone typing messages one by one on a phone.",
    simpleAnalogy: "An automated WhatsApp broadcaster and chatbot assistant for NGOs.",
    impactContext: "Allows grassroots teams to reach citizens directly on the app they already use every day—WhatsApp—without expensive enterprise aggregators.",
    reversePhrase: "How can our non-profit send automated WhatsApp reminders to thousands of village coordinators?",
    reverseTechSpec: "Deploy Whatomate connected to the WhatsApp Cloud API with webhook event routing."
  },
  {
    id: "fms",
    term: "FMS (Fundraising Management)",
    category: "Open Source Apps",
    techPhrase: "Our donor CRM and 80G tax receipt generation is automated on FMS by T4GC.",
    plainExplanation: "Think of FMS like a dedicated digital accountant and donor relationship manager built specifically for Indian non-profits. It automatically records donations from payment gateways, issues compliant 80G tax certificates, and keeps your donor history organized.",
    simpleAnalogy: "A bespoke donor relationship manager and automated 80G tax receipt generator.",
    impactContext: "Built directly by T4GC to solve the exact regulatory and operational bottlenecks Indian impact organizations face during fundraising audits.",
    reversePhrase: "How do we automatically generate 80G tax receipts and track recurring donors without manual Excel spreadsheets?",
    reverseTechSpec: "Deploy T4GC's Fundraising Management System (FMS) integrated with Razorpay/Cashfree payment webhooks."
  },
  {
    id: "rforum",
    term: "rForum",
    category: "Open Source Apps",
    techPhrase: "We're using rForum during the summit keynotes for live audience questions and voting.",
    plainExplanation: "Think of rForum like a digital megaphone and voting ballot for everyone in an auditorium. Instead of people having to stand in line at a microphone, audience members scan a QR code, submit questions, and upvote the topics they care about most in real time.",
    simpleAnalogy: "A real-time participatory voting ballot and question wall for events.",
    impactContext: "Replaces expensive proprietary audience tools (like Slido or Mentimeter) with a community-owned open-source tool for town halls and summits.",
    reversePhrase: "How can we run live Q&A and audience polls during our annual conference without paying per-event fees?",
    reverseTechSpec: "Launch rForum by T4GC on IDLIStack with WebSocket real-time live polling."
  },
  {
    id: "nextcloud",
    term: "Nextcloud",
    category: "Open Source Apps",
    techPhrase: "Migrate our team files, calendar, and confidential documents to Nextcloud.",
    plainExplanation: "Think of Nextcloud like having your own personal Google Drive, Dropbox, and Google Docs server hosted inside your NGO's private digital building. You get shared folders, collaborative document editing, and calendars, but no third-party company owns or snoops on your files.",
    simpleAnalogy: "Your non-profit's own sovereign Google Drive and Google Docs.",
    impactContext: "Guarantees full data sovereignty for legal, medical, and human rights NGOs handling vulnerable beneficiary records.",
    reversePhrase: "We need Google Drive-style file sharing and collaborative docs, but we must keep our data on sovereign servers.",
    reverseTechSpec: "Deploy Nextcloud Hub with Collabora Online / OnlyOffice document server on managed storage."
  },
  {
    id: "kobotoolbox",
    term: "KoboToolbox / ODK",
    category: "Open Source Apps",
    techPhrase: "Field surveyors collect baseline beneficiary data offline using KoboToolbox.",
    plainExplanation: "Think of KoboToolbox like a rugged digital clipboard designed for the deepest field locations. Surveyors can walk through remote villages with zero mobile signal, record GPS points, take photos, and fill out forms. When they walk back into an area with Wi-Fi, everything syncs automatically.",
    simpleAnalogy: "An offline-capable digital survey clipboard built for the toughest field conditions.",
    impactContext: "The gold standard across global humanitarian and grassroots organizations for rapid field surveys and monitoring & evaluation (M&E).",
    reversePhrase: "How can our field workers collect survey data on mobile phones in areas with zero cell phone connectivity?",
    reverseTechSpec: "Deploy a KoboToolbox / ODK Aggregate instance with form building and encrypted offline submission endpoints."
  },
  {
    id: "civicrm",
    term: "CiviCRM / ERPNext",
    category: "Open Source Apps",
    techPhrase: "We manage grant tracking, beneficiary cases, and member directories in CiviCRM.",
    plainExplanation: "Think of CiviCRM like a grand central digital binder made specifically for civil society. While commercial CRMs (like Salesforce) are designed to sell products to customers, CiviCRM is structured around volunteers, grant deliverables, donors, and advocacy campaigns.",
    simpleAnalogy: "A comprehensive digital relationship registry engineered for non-profits.",
    impactContext: "Eliminates per-user monthly license fees that make commercial enterprise CRMs unaffordable as an NGO grows.",
    reversePhrase: "Is there an open-source alternative to Salesforce designed specifically for non-profit campaigns and grants?",
    reverseTechSpec: "Deploy CiviCRM integrated with WordPress/Drupal or stand-alone ERPNext Non-Profit Edition on IDLIStack."
  },
  {
    id: "metabase",
    term: "Metabase",
    category: "Open Source Apps",
    techPhrase: "Connect our field survey database to Metabase for live donor impact dashboards.",
    plainExplanation: "Think of Metabase like an interactive glass window looking into your complex spreadsheets and databases. Instead of writing complicated code, anyone on your communications team can click a few buttons to create colorful bar charts, geo-maps, and progress meters for annual reports.",
    simpleAnalogy: "A magic magnifying glass that turns confusing database rows into beautiful charts.",
    impactContext: "Allows leadership and program leads to see real-time impact metrics without waiting days for a data specialist to prepare reports.",
    reversePhrase: "Can we build interactive visual dashboards for our board and funders without paying for Tableau or PowerBI?",
    reverseTechSpec: "Deploy containerized Metabase connected read-only to production replica databases."
  },
  {
    id: "baserow",
    term: "Baserow / NocoDB",
    category: "Open Source Apps",
    techPhrase: "Our project managers organize community workshops in Baserow instead of Airtable.",
    plainExplanation: "Think of Baserow like a supercharged hybrid between a simple spreadsheet (Excel) and a powerful database (SQL). It looks like easy colored rows and columns, but it lets you link records, build kanban boards, and upload photos without hitting Airtable's punitive record limits.",
    simpleAnalogy: "An open-source, limitless alternative to Airtable.",
    impactContext: "Overcomes restrictive free-tier limits on Airtable where non-profits get locked out once they exceed a few thousand rows.",
    reversePhrase: "We love Airtable's interface, but we are hitting row limits and can't afford the enterprise tier.",
    reverseTechSpec: "Deploy Baserow or NocoDB on IDLIStack with PostgreSQL backend and S3 file attachments."
  },
  {
    id: "formbricks",
    term: "Formbricks",
    category: "Open Source Apps",
    techPhrase: "We embedded Formbricks surveys on our beneficiary intake portal.",
    plainExplanation: "Think of Formbricks like a friendly receptionist who asks visitors one conversational question at a time. It works like Typeform, but because it is open-source and privacy-friendly, you can host it yourself and collect sensitive feedback with 100% data ownership.",
    simpleAnalogy: "An open-source, conversational alternative to Typeform.",
    impactContext: "Lets non-profits conduct clean feedback surveys without paywalls on response limits.",
    reversePhrase: "Can we get high-completion, beautiful multi-step surveys without paying monthly Typeform fees?",
    reverseTechSpec: "Deploy Formbricks on IDLIStack with webhook integration to internal notification channels."
  },
  {
    id: "supabase",
    term: "Supabase",
    category: "Open Source Apps",
    techPhrase: "Our volunteer matching mobile app uses Supabase for authentication and real-time data.",
    plainExplanation: "Think of Supabase like a ready-built digital engine room for developers. Instead of spending 6 months building user logins, databases, and file uploads from scratch, Supabase gives developers all these core tools in one open-source package powered by reliable PostgreSQL.",
    simpleAnalogy: "An all-in-one open-source backend engine for apps (the open alternative to Google Firebase).",
    impactContext: "Cuts custom software development time in half for NGOs building mobile or web applications for community programs.",
    reversePhrase: "How can our developers build an app backend quickly without locking us into proprietary Google Firebase?",
    reverseTechSpec: "Host Supabase stack with PostgreSQL, PostgREST, GoTrue Auth, and Realtime engine."
  },
  {
    id: "posthog",
    term: "PostHog / Plausible",
    category: "Open Source Apps",
    techPhrase: "We replaced Google Analytics with Plausible to protect visitor privacy on our campaign pages.",
    plainExplanation: "Think of Plausible like a polite ticket counter at a museum door. It counts how many people walked in and which exhibition room they visited, without peeking into their pockets, tracking where they go afterward, or planting tracking cookies on their phones.",
    simpleAnalogy: "A privacy-respecting ticket counter instead of a surveillance camera.",
    impactContext: "Complies automatically with global privacy laws (GDPR/DPDP) and doesn't annoy website visitors with ugly cookie consent banners.",
    reversePhrase: "How do we track website visitor metrics without selling our donors' browsing habits to big tech ad networks?",
    reverseTechSpec: "Deploy self-hosted Plausible Analytics or PostHog with lightweight script integration."
  },
  {
    id: "jitsi",
    term: "Jitsi Meet",
    category: "Open Source Apps",
    techPhrase: "Our legal aid counselors hold confidential virtual consultations on Jitsi Meet.",
    plainExplanation: "Think of Jitsi Meet like a secure private conference room. You don't need anyone to create an account, download software, or install apps. You simply click a private link and enter a fully encrypted video meeting with zero time limits.",
    simpleAnalogy: "An instant, encrypted private conference room that requires no account or app downloads.",
    impactContext: "Zero per-host subscription fees (unlike Zoom), and no risk of sensitive beneficiary conversations being stored on corporate servers.",
    reversePhrase: "Can we have unlimited video calls with field coordinators without paying for 10 Zoom licenses?",
    reverseTechSpec: "Host a Jitsi Meet instance with JVB (Jitsi Videobridge) and Prosody on IDLIStack."
  },
  {
    id: "discourse",
    term: "Discourse",
    category: "Open Source Apps",
    techPhrase: "Our fellowship alumni and climate activists discuss policy proposals on Discourse.",
    plainExplanation: "Think of Discourse like a civilized, organized town square for community conversations. Unlike WhatsApp groups where important messages get lost in an endless flood of scroll, Discourse organizes topics into categories, archives solutions, and allows thoughtful long-form discussions.",
    simpleAnalogy: "A civilized, searchable community town square that replaces chaotic chat groups.",
    impactContext: "Ideal for fellowships, coalitions, and civil society networks that need permanent institutional knowledge.",
    reversePhrase: "Our community WhatsApp group is total chaos. How can we have structured, searchable discussions?",
    reverseTechSpec: "Deploy a Discourse forum instance on Docker with Redis cache and PostgreSQL."
  },

  // ==========================================
  // ⚙️ INFRASTRUCTURE & HOSTING JARGON
  // ==========================================
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
    id: "kubernetes",
    term: "Kubernetes (K8s)",
    category: "Infrastructure & Hosting",
    techPhrase: "Our microservices are orchestrated in a Kubernetes cluster across three zones.",
    plainExplanation: "If Docker is an individual shipping container, think of Kubernetes as the giant automated harbor crane and logistics manager. It watches over hundreds of containers: if one gets damaged or drops, it immediately replaces it with a fresh one; if cargo spikes, it automatically calls in five more cranes to handle the rush.",
    simpleAnalogy: "An automated harbor master and crane operator managing a fleet of shipping containers.",
    impactContext: "Great for massive tech giants, but often overkill and costly for small NGOs who usually just need simple Docker hosting on IDLIStack.",
    reversePhrase: "Do we really need this complex 'K8s' system that consultants are billing us thousands for?",
    reverseTechSpec: "Evaluate if simple single-node or lightweight Docker Compose on IDLIStack satisfies requirements before adopting Kubernetes."
  },
  {
    id: "ssl-certificate",
    term: "SSL Certificate",
    category: "Security & Privacy",
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
    category: "Infrastructure & Hosting",
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
    category: "Infrastructure & Hosting",
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
    category: "Infrastructure & Hosting",
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
    category: "Software Philosophy",
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
    category: "Infrastructure & Hosting",
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
    category: "Infrastructure & Hosting",
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
    category: "Software Philosophy",
    techPhrase: "Push your commits to a feature branch and open a PR on GitHub.",
    plainExplanation: "Think of Git like a magical time machine and supreme track-changes system for documents. It remembers every word ever added, who wrote it, and when. If someone accidentally deletes an entire chapter, you can rewind time with one click. GitHub is the collaborative community library where everyone shares their work.",
    simpleAnalogy: "A time-machine version-history backup for every line of code.",
    impactContext: "Ensures that if a developer leaves your project, all past work, notes, and code history remain safe and organized.",
    reversePhrase: "How do we keep track of changes so we can undo mistakes if someone breaks something?",
    reverseTechSpec: "Maintain version control in a Git repository with branching policies and Pull Request reviews."
  },
  {
    id: "2fa",
    term: "Two-Factor Auth (2FA)",
    category: "Security & Privacy",
    techPhrase: "Enforce 2FA across all admin accounts on the donor CRM.",
    plainExplanation: "Think of 2FA like entering an ATM. You need both your physical debit card (something you have) and your secret 4-digit PIN (something you know). Even if a thief steals your PIN, they cannot withdraw money without the physical card.",
    simpleAnalogy: "Requiring both a key and a secret password to open the front door.",
    impactContext: "Protects sensitive beneficiary data and donor financial details from being stolen by hacked passwords.",
    reversePhrase: "How can we make sure our admin accounts don't get hacked even if someone guesses a password?",
    reverseTechSpec: "Mandate Multi-Factor Authentication (MFA / 2FA) via authenticator app (TOTP) or SMS."
  },
  {
    id: "dns",
    term: "DNS",
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
    term: "SaaS vs. Self-Hosting",
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
    category: "Software Philosophy",
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
    category: "Infrastructure & Hosting",
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
    category: "Security & Privacy",
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
    term: "SQL Query",
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
    category: "Software Philosophy",
    techPhrase: "We need a refactoring sprint because accumulated tech debt is slowing feature work.",
    plainExplanation: "Think of technical debt like taking out a financial loan to build a quick makeshift shed. It gets you out of the rain today, but if you never reinforce the roof, the interest accumulates. Eventually, you spend all your time patching leaks instead of building anything new.",
    simpleAnalogy: "Taking a quick shortcut now that requires paying heavy interest later.",
    impactContext: "When quick hacks are made to launch a campaign fast, the team must spend time cleaning the code later or future changes will become painfully slow.",
    reversePhrase: "Why does it take three weeks to make a tiny change to our website that used to take an hour?",
    reverseTechSpec: "Accumulated technical debt and tightly coupled legacy code requires dedicated refactoring."
  },

  // ==========================================
  // 🤖 AI & MODERN TECH BUZZWORDS
  // ==========================================
  {
    id: "rag",
    term: "RAG (AI Retrieval)",
    category: "AI & Modern Tech",
    techPhrase: "We built a RAG pipeline on top of our NGO's field reports for our community chatbot.",
    plainExplanation: "Think of RAG (Retrieval-Augmented Generation) like an 'open-book exam' for an AI. Without RAG, an AI is writing an exam entirely from its hazy memory (and might make things up, called hallucinating). With RAG, the AI is first handed your specific NGO research documents, reads the exact page, and then answers the question using only your verified facts.",
    simpleAnalogy: "An open-book exam for AI using your organization's verified research.",
    impactContext: "Lets your team build AI assistants that answer citizen questions accurately based on your actual publications, without making things up.",
    reversePhrase: "How can we make ChatGPT answer questions using only our organization's published reports?",
    reverseTechSpec: "Implement Retrieval-Augmented Generation (RAG) with vector embeddings and an open-source LLM."
  },
  {
    id: "vector-db",
    term: "Vector Database",
    category: "AI & Modern Tech",
    techPhrase: "Store the beneficiary case studies in a vector database with text embeddings.",
    plainExplanation: "Think of a regular database like an alphabetical index in a textbook: it can only find words that match *exact letters*. A vector database is like a conceptual brain map: it understands *meanings*. If you search for 'child malnutrition', it can find stories about 'stunted infant growth' even if the exact word 'malnutrition' was never typed.",
    simpleAnalogy: "A conceptual brain map that searches by meaning rather than exact keywords.",
    impactContext: "Enables semantic search across thousands of case studies, grant proposals, and field interviews.",
    reversePhrase: "How can staff search our archives by concept or meaning instead of guessing the exact keywords?",
    reverseTechSpec: "Generate document embeddings and store them in an open-source vector store (like pgvector or Qdrant)."
  },
  {
    id: "zero-trust",
    term: "Zero-Trust Security",
    category: "Security & Privacy",
    techPhrase: "We are moving to a zero-trust model for staff accessing vulnerable beneficiary records.",
    plainExplanation: "Think of old security like a medieval castle with a moat: once you cross the drawbridge, you can wander into any room in the castle freely. Zero-trust means every single room, hallway, and cabinet inside the castle has its own fingerprint lock. No matter who you are, your badge is re-checked every time you touch a file.",
    simpleAnalogy: "Never trust, always verify: putting fingerprint locks on every internal door.",
    impactContext: "Prevents a single hacked employee laptop from exposing your entire organization's confidential beneficiary database.",
    reversePhrase: "How do we ensure that even if a staff laptop is stolen, hackers cannot access our donor files?",
    reverseTechSpec: "Implement zero-trust network access (ZTNA) with device posture checks and least-privilege RBAC."
  },
  {
    id: "sso",
    term: "SSO (Single Sign-On)",
    category: "Security & Privacy",
    techPhrase: "Enable Google Workspace SSO across all our open-source tools on IDLIStack.",
    plainExplanation: "Think of SSO like a universal master keycard at a modern hotel. Instead of carrying 15 bulky metal keys (one for the gym, one for the elevator, one for your room), you swipe one secure keycard everywhere. With SSO, your staff logs in once with their main email, and instantly has access to Ghost, Mattermost, and Listmonk.",
    simpleAnalogy: "A single master keycard that unlocks all your work applications.",
    impactContext: "When an employee or volunteer leaves, you disable their email in one place, and they instantly lose access to all 15 NGO apps at once.",
    reversePhrase: "Our team has 20 different passwords for 20 different tools and keeps writing them on sticky notes.",
    reverseTechSpec: "Configure OpenID Connect (OIDC) or SAML SSO identity provider integration."
  },
  {
    id: "dpdp-gdpr",
    term: "DPDP Act / GDPR",
    category: "Security & Privacy",
    techPhrase: "Review our beneficiary intake forms for compliance with India's DPDP Act.",
    plainExplanation: "Think of the DPDP Act (Digital Personal Data Protection Act) like a strict legal contract between your NGO and the citizens whose data you hold. It says: you must explicitly ask permission before collecting data, explain clearly what you will use it for, delete it when asked, and protect it like gold.",
    simpleAnalogy: "The citizen's digital bill of rights protecting their personal records.",
    impactContext: "Vital for non-profits in India to avoid heavy legal fines and maintain community trust when recording Aadhaar, phone numbers, or health details.",
    reversePhrase: "What are our legal responsibilities when storing phone numbers and Aadhaar details of beneficiaries?",
    reverseTechSpec: "Implement consent management, data minimization, right to erasure workflows, and encrypted storage."
  },
  {
    id: "load-balancer",
    term: "Load Balancer",
    category: "Infrastructure & Hosting",
    techPhrase: "A load balancer distributes incoming donation traffic across multiple web servers.",
    plainExplanation: "Think of a load balancer like a traffic coordinator at a busy toll plaza with 6 booths. Instead of letting all 100 cars queue up behind Booth #1 while Booths 2 through 6 sit empty, the coordinator waves cars evenly to the open lanes so everyone drives through without delay.",
    simpleAnalogy: "A traffic coordinator waving cars evenly into empty toll booths.",
    impactContext: "Keeps your donation page snappy and responsive during national media broadcasts.",
    reversePhrase: "How do we make sure our website doesn't crash when thousands of people visit at once?",
    reverseTechSpec: "Configure an Nginx or HAProxy reverse proxy load balancer distributing traffic across backend replicas."
  },
  {
    id: "self-hosting",
    term: "Self-Hosting",
    category: "Software Philosophy",
    techPhrase: "IDLIStack provides managed self-hosting so NGOs own their infrastructure.",
    plainExplanation: "Self-hosting means running software on computer servers that you control, rather than trusting your data to an outside commercial vendor's private cloud. Think of it like drinking water from your own clean municipal filtered tap instead of buying marked-up single-use plastic bottles from a private corporation.",
    simpleAnalogy: "Owning your own clean well instead of buying bottled water from a corporation.",
    impactContext: "Gives non-profits complete independence, prevents price hikes, and guarantees beneficiary privacy.",
    reversePhrase: "Why should an impact organization care about controlling its own software infrastructure?",
    reverseTechSpec: "Deploy managed open-source workloads on dedicated or virtual private servers on IDLIStack."
  },
  {
    id: "vendor-lockin",
    term: "Vendor Lock-in",
    category: "Software Philosophy",
    techPhrase: "We chose open-source PostgreSQL to prevent proprietary vendor lock-in.",
    plainExplanation: "Think of vendor lock-in like a printer company that sells you a cheap printer, but designs the machine so it only accepts their proprietary, insanely expensive ink cartridges. If you try to use any other ink, the printer stops working. In software, vendor lock-in happens when a company makes it nearly impossible to export your own data.",
    simpleAnalogy: "A printer designed to only work with one company's expensive ink cartridges.",
    impactContext: "Non-profits often get trapped paying thousands of dollars for proprietary CRM licenses because extracting their data is too painful.",
    reversePhrase: "How do we avoid getting trapped by a tech company that jacks up its prices every year?",
    reverseTechSpec: "Build on open standards and open-source data formats that allow zero-penalty migration."
  },
  {
    id: "offline-first",
    term: "Offline-First / PWA",
    category: "Websites & Tools",
    techPhrase: "Our volunteer field survey app is architected as an offline-first PWA.",
    plainExplanation: "Think of an offline-first app like a modern e-reader (like a Kindle). You don't need internet while turning the pages in the middle of a remote forest. It stores the whole book locally on your device, and only checks for updates whenever you walk near Wi-Fi.",
    simpleAnalogy: "An e-reader that holds all your books locally and only connects to sync.",
    impactContext: "Essential for rural non-profits where field workers lose connectivity in remote tribal or rural habitations.",
    reversePhrase: "How can our web app continue working smoothly for volunteers with zero mobile signal?",
    reverseTechSpec: "Build a Progressive Web App (PWA) with Service Workers and IndexedDB local client storage."
  },
  {
    id: "graphql",
    term: "GraphQL",
    category: "Connectivity & Data",
    techPhrase: "Switch from REST to GraphQL so mobile devices only fetch the fields they need.",
    plainExplanation: "Think of a traditional REST API like ordering a fixed thali: you get rice, dal, subzi, and dessert whether you wanted all of them or not. GraphQL is like a buffet where you hand the chef an exact note saying: 'I only want half a cup of rice and one samosa.' You get precisely what you asked for and carry no extra weight.",
    simpleAnalogy: "A custom buffet order where you request only the exact items you want.",
    impactContext: "Cuts mobile data usage for field volunteers on slow 2G/3G connections.",
    reversePhrase: "Our mobile app is downloading too much unnecessary data on slow 2G networks.",
    reverseTechSpec: "Expose a GraphQL schema allowing client-specified query payloads and reduced overfetching."
  },
  {
    id: "rbac",
    term: "Role-Based Access (RBAC)",
    category: "Security & Privacy",
    techPhrase: "Configure RBAC so field volunteers cannot view donor PAN card numbers.",
    plainExplanation: "Think of RBAC like color-coded security badges in a hospital. Doctors get blue badges that open the surgery ward, visitors get green badges that only open the waiting lobby, and pharmacists get yellow badges for the dispensary. No one gets keys to doors they don't need for their job.",
    simpleAnalogy: "Color-coded security badges that only unlock the specific rooms you need.",
    impactContext: "Ensures volunteers can register beneficiaries without accidentally viewing sensitive donor financial records.",
    reversePhrase: "How do we restrict access so volunteers only see what they need, not sensitive finances?",
    reverseTechSpec: "Implement granular Role-Based Access Control (RBAC) with least-privilege permission sets."
  },
  {
    id: "headless-cms",
    term: "Headless CMS",
    category: "Websites & Tools",
    techPhrase: "We use Ghost as a headless CMS to power both our web portal and our mobile app.",
    plainExplanation: "Think of a traditional CMS like a newspaper company that writes stories and physically prints them on one specific paper size. A 'headless' CMS is a newsroom that writes the stories and sends them out as a clean digital feed: one team can display it on a website, another can display it on a mobile app, and a third can show it on an airport billboard.",
    simpleAnalogy: "A newsroom producing stories that can be displayed on any screen or device.",
    impactContext: "Allows your communications team to write an impact story once, and have it appear simultaneously on your website, mobile app, and WhatsApp bot.",
    reversePhrase: "Can we write our updates in one place and have them show up on both our website and mobile app?",
    reverseTechSpec: "Expose content via Ghost or Strapi Headless Content API consumed by Next.js / Flutter frontends."
  },
  {
    id: "e2ee",
    term: "End-to-End Encryption",
    category: "Security & Privacy",
    techPhrase: "Beneficiary grievance submissions must be protected with end-to-end encryption.",
    plainExplanation: "Think of E2EE like putting a letter inside a locked titanium safe, locking it with a key that only the recipient holds, and handing the safe to a courier. Even if the courier, the postal service, or government authorities intercept the safe, none of them have the key to open it.",
    simpleAnalogy: "A locked titanium safe where only the recipient holds the physical key.",
    impactContext: "Essential for protecting whistleblowers, gender-based violence victims, or legal aid clients.",
    reversePhrase: "How can we guarantee that no intermediary or server administrator can read sensitive grievance reports?",
    reverseTechSpec: "Encrypt payloads client-side with recipient public key before transmission (e.g. Signal Protocol or PGP)."
  },
  {
    id: "disaster-recovery",
    term: "Disaster Recovery & Backups",
    category: "Infrastructure & Hosting",
    techPhrase: "We test our disaster recovery plan with automated off-site database snapshots every night.",
    plainExplanation: "Think of disaster recovery like having an exact replica of your entire office building stored inside an earthquake-proof vault 500 kilometers away. If your primary building catches fire or floods, you flip one master switch and your team continues working from the replica vault within 30 minutes.",
    simpleAnalogy: "An off-site fireproof replica of your entire office ready at a moment's notice.",
    impactContext: "Protects your non-profit from losing years of grant history and donor receipts if a cloud provider has a catastrophic failure.",
    reversePhrase: "What happens to our donor data if our server gets hacked, corrupted, or deleted tomorrow?",
    reverseTechSpec: "Automate daily encrypted off-site snapshots with tested RTO (Recovery Time Objective) protocols."
  }
];

// Curated Summit Bingo / Hilarious Jargon Sentences
const SUMMIT_BINGO_QUOTES = [
  "“Just use the API to pull the donor list.”",
  "“We can deploy Ghost on IDLIStack for our organization's storytelling and newsletter.”",
  "“We should package the NGO reporting tool in Docker containers.”",
  "“We built a RAG pipeline on top of our NGO's field reports for our community chatbot.”",
  "“We use Listmonk on IDLIStack to broadcast 50,000 monthly donor newsletters.”",
  "“Set up Whatomate by Zerodha to broadcast relief announcements on WhatsApp.”",
  "“Our donor CRM and 80G tax receipt generation is automated on FMS by T4GC.”",
  "“Field surveyors collect baseline beneficiary data offline using KoboToolbox.”",
  "“Connect our field survey database to Metabase for live donor impact dashboards.”",
  "“We scheduled a cron job to send donor tax receipts every midnight.”",
  "“The payment gateway sends a webhook to update our donor status in real time.”",
  "“Make sure the SSL certificate is configured or donors will see security alerts.”",
  "“We had a huge traffic spike during Giving Tuesday that overloaded the database.”",
  "“Store the beneficiary case studies in a vector database with text embeddings.”",
  "“We're using rForum during the summit keynotes for live audience questions and voting.”",
  "“Enable Google Workspace SSO across all our open-source tools on IDLIStack.”",
  "“We replaced Google Analytics with Plausible to protect visitor privacy on our campaign pages.”",
  "“IDLIStack provides managed self-hosting so NGOs own their infrastructure.”",
  "“Our volunteer field survey app is architected as an offline-first PWA.”",
  "“We chose open-source PostgreSQL to prevent proprietary vendor lock-in.”"
];

// Interactive Summit Quiz Question Bank (24 Curated Questions)
const SUMMIT_QUIZ_QUESTIONS = [
  {
    id: "listmonk",
    tag: "🚀 Open Source Apps",
    question: "Your NGO has 60,000 community subscribers and commercial tools ask for ₹40,000/month. Which self-hosted open-source tool on IDLIStack lets you broadcast unlimited newsletters for pennies?",
    options: ["Listmonk", "Docker", "SSL Certificate", "Kubernetes"],
    answerIndex: 0,
    explanation: "Listmonk is a blazingly fast, open-source mailing list and newsletter manager hosted on IDLIStack that saves non-profits lakhs of rupees!"
  },
  {
    id: "ghost",
    tag: "🚀 Open Source Apps",
    question: "Which modern open-source platform on IDLIStack allows impact teams to publish stories and membership newsletters with 0% platform transaction fees?",
    options: ["Ghost", "Substack", "Medium", "X (Twitter)"],
    answerIndex: 0,
    explanation: "Ghost gives non-profits total ownership over donor relationships and membership tiers without taking a cut of your revenue!"
  },
  {
    id: "whatomate",
    tag: "💬 Community Engagement",
    question: "An NGO wants to send automated relief announcements and run volunteer chatbots on WhatsApp without expensive enterprise aggregators. What open-source tool by Zerodha and T4GC powers this?",
    options: ["Whatomate", "WordPress", "Discourse", "CiviCRM"],
    answerIndex: 0,
    explanation: "Whatomate is an open-source platform built by Zerodha and T4GC to automate WhatsApp broadcasts and chatbot responses for social impact!"
  },
  {
    id: "kobotoolbox",
    tag: "🌍 Grassroots Tech",
    question: "Your field surveyors are heading into remote villages with zero mobile network. Which open-source tool lets them collect survey data completely offline and auto-sync when Wi-Fi returns?",
    options: ["KoboToolbox / ODK", "Google Sheets", "Typeform", "Salesforce"],
    answerIndex: 0,
    explanation: "KoboToolbox and ODK are the global open-source standards for rugged offline field data collection!"
  },
  {
    id: "rag",
    tag: "🤖 AI & Data",
    question: "What is 'RAG' (Retrieval-Augmented Generation) best compared to when building an AI chatbot for your NGO?",
    options: [
      "An open-book exam where the AI reads only your verified NGO reports before answering",
      "A closed-book exam where the AI makes up answers from memory",
      "A script that deletes old database backups",
      "A proprietary algorithm locked behind a paywall"
    ],
    answerIndex: 0,
    explanation: "RAG prevents AI hallucinations by ensuring the model grounds its answers in your verified field publications!"
  },
  {
    id: "sovereignty",
    tag: "💡 Tech Philosophy",
    question: "Why is open-source hosting on IDLIStack fundamentally better for Indian non-profits than proprietary commercial SaaS?",
    options: [
      "It prevents vendor lock-in, ensures full DPDP privacy compliance, and guarantees data sovereignty",
      "It only runs on weekends",
      "It forces everyone to write raw terminal code",
      "It makes all websites look identical"
    ],
    answerIndex: 0,
    explanation: "Open source guarantees that your beneficiary data, donor records, and software infrastructure belong to your organization forever!"
  },
  {
    id: "api",
    tag: "📊 Connectivity & Data",
    question: "A developer tells you: 'Think of this like a waiter who shuttles food orders between you and the kitchen.' What are they describing?",
    options: ["An API", "A Cron Job", "Docker", "SSL Certificate"],
    answerIndex: 0,
    explanation: "An API acts like a waiter! It delivers requests from your website to a database or server and brings back the information."
  },
  {
    id: "docker",
    tag: "⚙️ Cloud & Hosting",
    question: "What is Docker best compared to in real life?",
    options: [
      "Standardized shipping containers that fit neatly on any ship, truck, or train",
      "A locked bicycle in the rain",
      "An expensive paper shredder",
      "A manual spreadsheet"
    ],
    answerIndex: 0,
    explanation: "Docker packages software into standardized shipping containers so it runs identically on any computer or server!"
  },
  {
    id: "cron-job",
    tag: "⚙️ Automation",
    question: "Which tech term represents a punctual robot alarm clock that wakes up at the exact same minute every day to run chores?",
    options: ["A Cron Job", "A Webhook", "A Firewall", "A DNS Record"],
    answerIndex: 0,
    explanation: "A Cron Job is an automated task scheduler that triggers tasks (like midnight backups or daily donor receipts) on a schedule!"
  },
  {
    id: "webhook",
    tag: "📊 Connectivity & Data",
    question: "What is a 'Webhook' best compared to in everyday life?",
    options: [
      "A doorbell that rings the exact second a delivery arrives",
      "A physical book on a shelf",
      "A forgotten password",
      "An unplugged printer"
    ],
    answerIndex: 0,
    explanation: "A Webhook is an automated message sent the split second an event happens (like a successful online donation)!"
  },
  {
    id: "ssl",
    tag: "🔒 Security & Trust",
    question: "Why does having an SSL Certificate matter for an NGO fundraising website?",
    options: [
      "It encrypts donor payment info and gives your site the green padlock of trust",
      "It changes your fonts to italic",
      "It sends WhatsApp messages to your staff",
      "It automatically doubles your donations"
    ],
    answerIndex: 0,
    explanation: "SSL encrypts sensitive traffic, keeping donor credit cards and passwords safe from eavesdroppers and browser security alerts!"
  },
  {
    id: "mattermost",
    tag: "🚀 Open Source Apps",
    question: "Which open-source tool on IDLIStack provides a secure, self-hosted team chat platform like Slack without outside corporations scanning chats?",
    options: ["Mattermost", "Ghost", "WordPress", "Docker"],
    answerIndex: 0,
    explanation: "Mattermost is a private, encrypted team collaboration platform that keeps sensitive beneficiary communications sovereign!"
  },
  {
    id: "nextcloud",
    tag: "🚀 Open Source Apps",
    question: "Your donor policy strictly forbids storing sensitive beneficiary files on third-party commercial clouds. What open-source tool gives you a private Google Drive alternative?",
    options: ["Nextcloud", "Substack", "Mailchimp", "Zapier"],
    answerIndex: 0,
    explanation: "Nextcloud gives non-profits sovereign cloud storage, document collaboration, and calendars on servers you control!"
  },
  {
    id: "fms",
    tag: "🚀 Open Source Apps",
    question: "What in-house open-source application was built specifically by T4GC for Indian impact organizations to manage donors and generate 80G receipts?",
    options: ["FMS (Fundraising Management System)", "Salesforce", "Shopify", "HubSpot"],
    answerIndex: 0,
    explanation: "FMS was developed in-house by T4GC to automate donor management and compliant 80G tax receipts for Indian non-profits!"
  },
  {
    id: "rforum",
    tag: "🚀 Open Source Apps",
    question: "Which open-source tool developed by T4GC allows live participatory audience voting and Q&A during summits without per-event fees?",
    options: ["rForum", "Listmonk", "Nextcloud", "Supabase"],
    answerIndex: 0,
    explanation: "rForum is an open-source live audience engagement and town hall polling tool created by T4GC!"
  },
  {
    id: "metabase",
    tag: "🚀 Open Source Apps",
    question: "Which open-source tool connects directly to your databases and turns raw rows of data into beautiful impact charts for donor reports?",
    options: ["Metabase", "Docker", "Let's Encrypt", "Git"],
    answerIndex: 0,
    explanation: "Metabase lets non-technical team members ask questions and generate visual impact charts without writing complex code!"
  },
  {
    id: "baserow",
    tag: "🚀 Open Source Apps",
    question: "Your team loves Airtable's interface, but you are hitting strict row limits on the free plan. Which open-source tool provides a limitless self-hosted alternative?",
    options: ["Baserow / NocoDB", "WordPress", "Jitsi Meet", "Whatomate"],
    answerIndex: 0,
    explanation: "Baserow and NocoDB are open-source relational databases with spreadsheet-like interfaces that avoid commercial SaaS row paywalls!"
  },
  {
    id: "jitsi",
    tag: "🚀 Open Source Apps",
    question: "Which open-source tool lets non-profits hold unlimited encrypted video meetings directly in the browser without Zoom licenses or account signups?",
    options: ["Jitsi Meet", "Listmonk", "CiviCRM", "Ghost"],
    answerIndex: 0,
    explanation: "Jitsi Meet provides fully encrypted, browser-based video calling with zero license fees or user account requirements!"
  },
  {
    id: "civicrm",
    tag: "🚀 Open Source Apps",
    question: "Which open-source CRM is built specifically for civil society, grant deliverables, and volunteer networks rather than commercial sales pipelines?",
    options: ["CiviCRM / ERPNext", "Salesforce", "Pipedrive", "Zoho CRM"],
    answerIndex: 0,
    explanation: "CiviCRM is an open-source CRM specifically tailored to the unique campaign and grant tracking needs of non-profits!"
  },
  {
    id: "vector-db",
    tag: "🤖 AI & Data",
    question: "How does a Vector Database search documents differently from a traditional keyword search?",
    options: [
      "It searches by conceptual meaning rather than exact word spelling",
      "It only searches for files created on Tuesdays",
      "It deletes all words that are not in English",
      "It prints documents on physical paper"
    ],
    answerIndex: 0,
    explanation: "Vector databases use mathematical embeddings to understand the meaning of concepts, finding relevant research even with different words!"
  },
  {
    id: "zero-trust",
    tag: "🔒 Security & Trust",
    question: "What is the core philosophy of 'Zero-Trust' cybersecurity?",
    options: [
      "Never trust, always verify: putting fingerprint locks on every internal door",
      "Trusting everyone on the office Wi-Fi automatically",
      "Writing passwords on sticky notes",
      "Never using any computer passwords"
    ],
    answerIndex: 0,
    explanation: "Zero-Trust assumes threats can exist inside the network, requiring continuous verification on every single file access!"
  },
  {
    id: "dpdp",
    tag: "🔒 Security & Trust",
    question: "What does compliance with India's DPDP Act require from non-profits collecting citizen data?",
    options: [
      "Explicit informed consent, clear purpose specification, and strict data protection",
      "Sharing citizen phone numbers with commercial advertisers",
      "Stamping paper documents with wax",
      "Keeping data on unencrypted USB sticks"
    ],
    answerIndex: 0,
    explanation: "The DPDP Act mandates clear consent, purpose limitation, and secure handling for all personal data collected by organizations!"
  },
  {
    id: "offline-first",
    tag: "🌍 Grassroots Tech",
    question: "What is an 'Offline-First' app best compared to in everyday life?",
    options: [
      "An e-reader that holds all your books locally and only connects to sync",
      "A landline phone that only works when plugged in",
      "A physical television broadcast",
      "A megaphone"
    ],
    answerIndex: 0,
    explanation: "Offline-first apps store data locally so volunteers can work in remote areas with zero cell coverage, auto-syncing later!"
  },
  {
    id: "load-balancer",
    tag: "⚙️ Cloud & Hosting",
    question: "What does a Load Balancer do when an NGO's fundraising campaign goes viral on TV?",
    options: [
      "Distributes incoming website visitors evenly across multiple server lanes so the site doesn't crash",
      "Disconnects the website from the internet",
      "Sends emails to everyone on the internet",
      "Turns off the database to save electricity"
    ],
    answerIndex: 0,
    explanation: "A Load Balancer acts like a traffic coordinator at a toll plaza, waving incoming visitor traffic across open server replicas!"
  },
  {
    id: "supabase",
    tag: "🚀 Open Source Apps",
    question: "Your NGO needs an instant backend database, real-time authentication, and auto-generated APIs without Firebase's escalating cloud costs. What open-source tool on IDLIStack provides this?",
    options: ["Supabase", "Kubernetes", "Apache Kafka", "Terraform"],
    answerIndex: 0,
    explanation: "Supabase provides an open-source Firebase alternative built on resilient PostgreSQL, keeping data fully under your NGO's control!"
  },
  {
    id: "formbricks",
    tag: "🚀 Open Source Apps",
    question: "You want to gather beneficiary feedback through clean multi-step survey forms without paying high Typeform subscription rates. Which open-source tool hosted on IDLIStack does this?",
    options: ["Formbricks", "Nginx", "Git", "Redis"],
    answerIndex: 0,
    explanation: "Formbricks is an open-source survey and experience management suite that lets non-profits collect unlimited responses privately!"
  },
  {
    id: "posthog",
    tag: "🚀 Open Source Apps",
    question: "An NGO wants to understand which donation pages donors visit without sending private user data to Google Analytics. What open-source product analytics tool solves this?",
    options: ["PostHog", "WordPerfect", "cURL", "Bootstrap"],
    answerIndex: 0,
    explanation: "PostHog is an open-source analytics platform that non-profits can self-host to respect user privacy and avoid third-party ad tracking!"
  },
  {
    id: "discourse",
    tag: "🚀 Open Source Apps",
    question: "Which open-source community discussion platform powers long-form, searchable knowledge sharing for global civic tech networks?",
    options: ["Discourse", "Docker", "SSL", "Cron Job"],
    answerIndex: 0,
    explanation: "Discourse is the premier open-source discussion platform that organizes community dialogue into searchable, civil knowledge hubs!"
  },
  {
    id: "vendor-lock-in",
    tag: "💡 Tech Philosophy",
    question: "What does 'Vendor Lock-in' mean for a non-profit organization?",
    options: [
      "Being trapped in a proprietary software ecosystem where migrating donor data elsewhere is exorbitantly expensive or impossible",
      "A locked server cabinet in an office",
      "A software security feature that prevents computer theft",
      "A two-factor authentication keycard"
    ],
    answerIndex: 0,
    explanation: "Vendor lock-in happens when proprietary SaaS providers make it painful or costly to export your own community data when prices rise!"
  },
  {
    id: "agpl-mit",
    tag: "💡 Tech Philosophy",
    question: "Why does IDLIStack champion copyleft and open-source licenses like AGPL and MIT for public-good tech?",
    options: [
      "They ensure software remains free, openly auditable, and cannot be privatized behind corporate paywalls",
      "They make software run twice as fast on older phones",
      "They require every user to pay annual licensing fees",
      "They only allow government employees to view code"
    ],
    answerIndex: 0,
    explanation: "Open-source licenses legally guarantee that software created for the public good stays accessible and transparent for all communities forever!"
  },
  {
    id: "cicd",
    tag: "⚙️ Automation",
    question: "What is a 'CI/CD Pipeline' best compared to in an NGO's operations?",
    options: [
      "An automated inspection and delivery conveyor belt that tests software changes and deploys them without human panic",
      "A physical water pipeline to an office",
      "A legal contract signed by donors",
      "A spreadsheet where volunteers log their hours"
    ],
    answerIndex: 0,
    explanation: "CI/CD automates testing and server deployment, ensuring bug-free updates reach field workers automatically!"
  },
  {
    id: "321-backup",
    tag: "🔒 Security & Trust",
    question: "What is the golden '3-2-1 Rule' for protecting irreplaceable community and beneficiary data?",
    options: [
      "Keep 3 copies of data on 2 different media types, with 1 copy stored securely offsite",
      "Check email 3 times a day for 2 minutes using 1 computer",
      "Store data on 3 laptops owned by 2 volunteers in 1 office",
      "Restart your computer 3 times every 2 weeks"
    ],
    answerIndex: 0,
    explanation: "The 3-2-1 backup rule ensures that even if ransomware, flood, or server hardware failures strike, your non-profit's data is never lost!"
  },
  {
    id: "git",
    tag: "⚙️ Automation",
    question: "A volunteer developer asks: 'Have you committed that to Git?' What is Git best compared to?",
    options: [
      "A magical time machine that tracks every change to documents with an infinite undo button and audit trail",
      "A social media messaging app",
      "A brand of computer monitors",
      "A digital credit card for server bills"
    ],
    answerIndex: 0,
    explanation: "Git tracks historical changes to software and documents, letting multiple team members collaborate without overwriting each other!"
  },
  {
    id: "monolith-microservices",
    tag: "⚙️ Cloud & Hosting",
    question: "When developers debate 'Monolith vs Microservices', what is the practical difference for an NGO?",
    options: [
      "A Monolith is a single unified Swiss Army knife app, while Microservices are separate specialized toolboxes connected by wires",
      "A Monolith is always broken, and Microservices are always free",
      "Monoliths only run on Linux, while Microservices only run on Windows",
      "Microservices do not require any computers or servers"
    ],
    answerIndex: 0,
    explanation: "Monoliths keep everything in one tidy application, while microservices split tasks into independent cooperating services!"
  },
  {
    id: "encryption",
    tag: "🔒 Security & Trust",
    question: "Why must beneficiary health and identity records be encrypted both 'In Transit' and 'At Rest'?",
    options: [
      "To ensure data is scrambled like secret code both while travelling over the internet AND while sitting on hard drives",
      "To make files smaller so they fit onto floppy disks",
      "To prevent field volunteers from reading donor names",
      "To automatically translate English records into Hindi"
    ],
    answerIndex: 0,
    explanation: "End-to-end encryption guarantees that eavesdroppers on Wi-Fi or unauthorized physical hard drive access cannot read sensitive citizen files!"
  },
  {
    id: "localhost",
    tag: "⚙️ Cloud & Hosting",
    question: "What does 'Localhost' (or 127.0.0.1) mean when testing an application before publishing it online?",
    options: [
      "'This very computer right in front of me' — a private testing playground before releasing to the world",
      "A website hosted in New York City",
      "A public Wi-Fi hotspot in an airport",
      "A server owned by the government"
    ],
    answerIndex: 0,
    explanation: "Localhost refers to your local machine! It lets team members test apps locally before deploying them live on IDLIStack."
  }
];
