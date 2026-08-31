window.PORTFOLIO = {
  projects: [
    {
      id: "autoeda",
      kind: "Data system",
      title: "AutoEDA",
      blurb: "An automated exploratory analysis platform that finds anomalies in complex datasets so people spend less time staring at spreadsheets.",
      problem: "Exploratory data analysis on multivariate time-series is slow, repetitive, and easy to get wrong by hand.",
      role: "Designed and built the analysis pipeline and the platform around it.",
      stack: ["Python", "TensorFlow", "NumPy", "Pandas", "Flask", "LSTM Autoencoders", "RNNs", "Attention"],
      features: [
        "Automated EDA workflows for complex datasets",
        "Anomaly detection with LSTM autoencoders and attention",
        "Faster data-quality assessment for multivariate time-series"
      ],
      challenge: "Making sequence models useful for messy, real datasets — not just a notebook demo.",
      learned: "Automation is only valuable when the output is something a person can actually trust and act on.",
      result: "Reduced manual EDA time by 70% and enabled faster data-quality assessment.",
      github: "https://github.com/lathikasakthivel/AutoEDA",
      flow: ["Dataset", "Encode", "Attend", "Detect", "Report"]
    },
    {
      id: "netratax",
      kind: "Graph + web app",
      title: "NetraTax",
      blurb: "A GNN-powered web app that looks at GST invoice networks and flags patterns that look like fraud.",
      problem: "Tax fraud often hides in relationships — shell companies, circular trading, duplicate invoices — not in a single row of a table.",
      role: "Built the fraud-detection system end to end, from graph modeling to a usable web interface.",
      stack: ["Python", "FastAPI", "PyTorch Geometric", "NetworkX", "PostgreSQL", "Plotly"],
      features: [
        "Graph analysis of GST invoice networks",
        "Risk scoring for suspicious patterns",
        "Fraud network visualization"
      ],
      challenge: "Turning a graph neural network into something investigators can actually read — scores, visuals, and a path through the network.",
      learned: "The model is only half the product. The other half is explaining why something looks wrong.",
      result: "Reduced manual investigation effort by 60% through risk scoring and network visualization.",
      github: null,
      flow: ["Invoices", "Graph", "GNN", "Risk score", "Review"]
    },
    {
      id: "air-quality",
      kind: "IoT + ML",
      title: "Air Quality Monitoring",
      blurb: "Sensors, forecasts, and alerts for industrial air quality — so critical events are visible before they become emergencies.",
      problem: "Manual air-quality checks are slow. By the time someone notices a spike, the window to react is already small.",
      role: "Integrated hardware, a forecasting model, a live dashboard, and notifications into one monitoring loop.",
      stack: ["Arduino", "MQ135", "DHT11", "ESP32", "Python", "Streamlit", "Firebase", "Machine Learning"],
      features: [
        "Real-time industrial air-quality monitoring",
        "Gas forecasting to surface critical events about 5 minutes ahead",
        "Streamlit dashboard and instant notifications"
      ],
      challenge: "Keeping live sensor data, a forecast, and alerts in the same loop without the dashboard becoming noise.",
      learned: "A sensor is useless if the alert arrives after the person who needed it has already left the room.",
      result: "Reduced manual monitoring time by 70%, with forecasting for upcoming critical events.",
      github: "https://github.com/lathikasakthivel/envi-care-air-quality-monitor",
      flow: ["Sensor", "ESP32", "Forecast", "Dashboard", "Alert"]
    },
    {
      id: "thozhil",
      kind: "Product",
      title: "Thozhil Bazaar",
      blurb: "A bilingual local job portal for tier-2 and tier-3 cities — built so finding work does not require speaking the internet's default language.",
      problem: "Most job platforms are designed for metro hiring. Local employers and seekers still get lost in the noise.",
      role: "Built the portal for seekers and employers: listings, filters, applications, tracking, and chat.",
      stack: ["Python", "Flask", "MySQL", "HTML", "CSS", "JavaScript"],
      features: [
        "Bilingual experience for local job markets",
        "Filter, apply, and track applications",
        "Direct chat between applicants and employers"
      ],
      challenge: "Designing a product that works for people who are not already fluent in typical job-app UX.",
      learned: "Reach is a product problem. If the interface is only comfortable for one kind of user, half the town never shows up.",
      result: "Pilot run increased employer reach by 60%, cut search time by 50%, and improved response rate by 40%.",
      github: "https://github.com/lathikasakthivel/ThozhilBazaar--a-job-portal",
      flow: ["Seeker", "Jobs", "Apply", "Chat", "Employer"]
    }
  ],
  systems: [
    {
      title: "Marketplace platform",
      text: "A working path from customer to product or service, through vendor, cart, checkout, payment, shipping, and notification. The interesting part is not any single screen — it is keeping the whole chain consistent.",
      flow: ["Customer", "Catalog", "Vendor", "Cart", "Payment", "Shipping", "Notify"]
    },
    {
      title: "Lab / service platform",
      text: "Operations software for labs and services: admin control, lab setup, service catalogs, customers, and bookings. Built so the people running the work can actually operate the system.",
      flow: ["Admin", "Labs", "Services", "Customers", "Bookings"]
    },
    {
      title: "Authentication",
      text: "Login flows with OTP, JWT access tokens, refresh tokens, session handling, and logout. Security here is a sequence, not a checkbox.",
      flow: ["Login", "OTP", "JWT", "Refresh", "Session", "Logout"]
    },
    {
      title: "Odoo HR / Payroll",
      text: "ERP customization around employees, contracts, salary structures, payslips, and QWeb reports. The work is making the existing system match how the organization actually pays people.",
      flow: ["Employee", "Contract", "Salary", "Payslip", "QWeb"]
    }
  ]
};
