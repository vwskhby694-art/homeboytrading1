export const serviceOptions = [
  {
    value: "automation",
    label: "How the automation works",
    description: "How NexaAI's automated trading works with your own broker account."
  },
  {
    value: "technology",
    label: "General questions",
    description: "Questions about the technology, markets, risk controls or whether NexaAI suits you."
  }
] as const;

// Suggested starting balances (USD) for the client's own broker account. Every profile
// uses the same service; only the balance, and what is worth discussing about it, differs.
export const packages = [
  {
    id: "core",
    name: "Core",
    amount: 250,
    description: "For visitors who would prefer to begin with a smaller balance while they learn how the service fits their circumstances.",
    balanceNote: "Trading costs and minimum position sizes can take up a larger share of a smaller balance."
  },
  {
    id: "advanced",
    name: "Advanced",
    amount: 500,
    description: "For visitors who want to discuss a moderate starting balance and which markets they would like to explore.",
    balanceNote: "Dividing a balance across several markets leaves less available for each individual position."
  },
  {
    id: "elite",
    name: "Elite",
    amount: 1000,
    description: "For visitors who intend to start with a larger balance and want to plan their oversight carefully from the outset.",
    balanceNote: "A larger balance can mean larger losses in money terms. Only commit what you can afford to lose."
  }
] as const;

// Discussion topics shared by every profile. These are not activated services or product entitlements.
export const planningConsiderations = [
  "Your starting balance and how much of it you could afford to lose",
  "The markets you want to explore: forex, gold, indices, or crypto",
  "Your personal tolerance for risk and price swings",
  "How position sizes relate to your balance",
  "How closely you intend to oversee the account",
  "Questions to answer before your broker account is connected"
] as const;

export type PackageId = (typeof packages)[number]["id"];
export type ServiceId = (typeof serviceOptions)[number]["value"];

export type MarketCategory = {
  id: "forex" | "gold" | "indices" | "crypto";
  title: string;
  short: string;
  description: string;
  movers: readonly string[];
  hours: string;
  examples: readonly string[];
  symbol: string;
};

export const marketCategories: readonly MarketCategory[] = [
  {
    id: "forex",
    title: "Foreign exchange",
    short: "Forex",
    description: "Currencies are traded in pairs, such as the euro against the US dollar. It is the largest and most actively traded market in the world.",
    movers: ["Interest-rate decisions", "Inflation and jobs data", "Political and economic news"],
    hours: "Around the clock from Monday to Friday",
    examples: ["EUR/USD", "GBP/USD", "USD/JPY"],
    symbol: "FX:EURUSD"
  },
  {
    id: "gold",
    title: "Gold",
    short: "Gold",
    description: "Gold is priced in US dollars per ounce. Many people watch it during periods of uncertainty, but its price can still move sharply.",
    movers: ["The strength of the US dollar", "Interest rates and inflation", "Geopolitical events"],
    hours: "Almost continuously from Monday to Friday",
    examples: ["XAU/USD"],
    symbol: "OANDA:XAUUSD"
  },
  {
    id: "indices",
    title: "Stock indices",
    short: "Indices",
    description: "An index tracks a group of company shares, such as the 500 large US companies in the S&P 500, giving a broad view of a stock market.",
    movers: ["Company earnings", "Economic growth", "Interest-rate expectations"],
    hours: "Main US session 9:30–16:00 New York time; derivative prices can move outside it",
    examples: ["S&P 500", "NASDAQ 100"],
    symbol: "FOREXCOM:SPXUSD"
  },
  {
    id: "crypto",
    title: "Cryptocurrency",
    short: "Crypto",
    description: "Digital assets such as Bitcoin and Ether trade every day of the year. Prices can rise or fall very quickly, including overnight.",
    movers: ["Market sentiment", "Regulation and news", "Liquidity on exchanges"],
    hours: "24 hours a day, 7 days a week",
    examples: ["Bitcoin", "Ether"],
    symbol: "BITSTAMP:BTCUSD"
  }
];

export type LearningTopic = {
  id: string;
  title: string;
  summary: string;
  takeaways: readonly string[];
};

export type LearningPath = {
  id: "beginner" | "intermediate" | "advanced";
  label: string;
  title: string;
  description: string;
  topics: readonly LearningTopic[];
};

export const learningPaths: readonly LearningPath[] = [
  {
    id: "beginner",
    label: "Path 01",
    title: "Beginner",
    description: "Build a precise vocabulary for markets, orders, costs, and first-line risk controls.",
    topics: [
      {
        id: "financial-markets",
        title: "Introduction to financial markets",
        summary: "Understand why markets exist, who participates, and how prices bring buyers and sellers together.",
        takeaways: ["Markets transfer risk and capital", "Liquidity and trading hours vary", "A quoted price is not a guaranteed execution price"]
      },
      {
        id: "forex-fundamentals",
        title: "Forex fundamentals",
        summary: "Learn how one currency is valued against another and what can move exchange rates.",
        takeaways: ["Forex trades in pairs", "Interest rates and macro data matter", "Decentralized markets can quote differently"]
      },
      {
        id: "currency-pairs",
        title: "Currency pairs",
        summary: "Read base and quote currencies and distinguish majors, minors, and less-liquid pairs.",
        takeaways: ["EUR/USD prices euros in dollars", "Liquidity differs by pair", "Exotic pairs may carry wider costs"]
      },
      {
        id: "market-orders",
        title: "Market orders",
        summary: "See how immediate execution differs from price-controlled pending orders.",
        takeaways: ["Market orders prioritize execution", "Fast markets can create slippage", "Limit orders may never fill"]
      },
      {
        id: "spreads",
        title: "Spreads and trading costs",
        summary: "Understand the bid-ask spread and why the visible quote is only part of total trading cost.",
        takeaways: ["Spreads can widen", "Commission and financing may apply", "Costs compound with frequent trading"]
      },
      {
        id: "terminology",
        title: "Trading terminology",
        summary: "Learn practical terms including pip, lot, margin, equity, drawdown, and liquidity.",
        takeaways: ["Terminology affects calculations", "Broker definitions can differ", "Read the contract specification"]
      },
      {
        id: "risk-basics",
        title: "Risk management basics",
        summary: "Start with capital preservation, predefined exits, and limits on exposure per idea.",
        takeaways: ["Losses are unavoidable", "Position size controls exposure", "A stop is not guaranteed at its requested price"]
      }
    ]
  },
  {
    id: "intermediate",
    label: "Path 02",
    title: "Intermediate",
    description: "Connect analysis, position construction, market conditions, and disciplined decision-making.",
    topics: [
      {
        id: "technical-analysis",
        title: "Technical analysis",
        summary: "Use price, volume, and market structure as descriptive evidence rather than prediction certainty.",
        takeaways: ["Indicators are derived from past data", "Confluence does not guarantee an outcome", "Timeframe changes interpretation"]
      },
      {
        id: "fundamental-analysis",
        title: "Fundamental analysis",
        summary: "Relate economic releases, policy expectations, earnings, and geopolitics to market repricing.",
        takeaways: ["Expectations often matter more than the headline", "Reactions can be counterintuitive", "Macro effects unfold across timeframes"]
      },
      {
        id: "volatility",
        title: "Volatility",
        summary: "Measure how widely and quickly prices move and adapt exposure to unstable conditions.",
        takeaways: ["Volatility is not direction", "High volatility changes stop behavior", "Quiet regimes can end abruptly"]
      },
      {
        id: "leverage-margin",
        title: "Leverage and margin",
        summary: "Understand how leverage magnifies both gains and losses and how margin calls can force closure.",
        takeaways: ["Leverage increases exposure", "Margin is not the maximum possible loss", "Broker liquidation rules matter"]
      },
      {
        id: "protective-orders",
        title: "Stop-loss and take-profit concepts",
        summary: "Use predefined exits as risk tools while recognizing gaps, slippage, and liquidity constraints.",
        takeaways: ["Stops manage—not remove—risk", "Targets should relate to the thesis", "Order behavior depends on the venue"]
      },
      {
        id: "position-sizing",
        title: "Position sizing",
        summary: "Calculate exposure from account risk, stop distance, instrument value, and currency conversion.",
        takeaways: ["Size follows risk", "Volatility can inform distance", "Correlated positions aggregate exposure"]
      },
      {
        id: "risk-reward",
        title: "Risk and reward",
        summary: "Evaluate payoff distribution together with probability rather than relying on ratios alone.",
        takeaways: ["A high ratio can have a low win rate", "Expectancy combines wins and losses", "Historical expectancy can change"]
      },
      {
        id: "psychology",
        title: "Trading psychology",
        summary: "Recognize how loss aversion, recency, overconfidence, and fatigue distort decisions.",
        takeaways: ["Rules reduce improvisation", "Journaling exposes patterns", "Automation can encode biases as well as discipline"]
      }
    ]
  },
  {
    id: "advanced",
    label: "Path 03",
    title: "Advanced",
    description: "Examine systematic design, validation, regime change, and the operational limits of automation.",
    topics: [
      {
        id: "algorithmic-trading",
        title: "Algorithmic trading",
        summary: "Translate a repeatable decision process into explicit rules that can be tested and monitored.",
        takeaways: ["Rules need unambiguous inputs", "Execution details change results", "Systems require operational monitoring"]
      },
      {
        id: "ai-analysis",
        title: "AI-assisted analysis",
        summary: "Use models to organize patterns and scenarios while accounting for uncertainty and data drift.",
        takeaways: ["Model output is not truth", "Training data embeds limitations", "Human review remains important"]
      },
      {
        id: "strategy-design",
        title: "Strategy design",
        summary: "Define hypothesis, universe, signals, sizing, exits, costs, and failure conditions before evaluation.",
        takeaways: ["Start with a falsifiable premise", "Complexity increases fragility", "Operational constraints belong in the design"]
      },
      {
        id: "backtesting",
        title: "Backtesting concepts",
        summary: "Test rules against historical data while controlling for leakage, survivorship bias, and overfitting.",
        takeaways: ["Past fit is not future performance", "Costs and slippage must be modeled", "Out-of-sample testing is essential"]
      },
      {
        id: "risk-modeling",
        title: "Risk modeling",
        summary: "Estimate distributions, drawdowns, correlations, and stress outcomes without mistaking models for certainty.",
        takeaways: ["Tail events are difficult to estimate", "Correlation changes under stress", "Model assumptions must stay visible"]
      },
      {
        id: "market-regimes",
        title: "Market regimes",
        summary: "Study how trend, volatility, liquidity, and correlation structures change through time.",
        takeaways: ["Strategies are regime-dependent", "Regimes are clear only in hindsight", "Adaptation can itself overfit"]
      },
      {
        id: "execution-risks",
        title: "Automated execution risks",
        summary: "Plan for latency, rejected orders, partial fills, stale data, outages, and mismatched broker state.",
        takeaways: ["A signal is not an execution", "Reconciliation is essential", "Emergency shutdown procedures need testing"]
      },
      {
        id: "ai-limitations",
        title: "Limits of AI predictions",
        summary: "Understand non-stationary markets, hallucination, uncertainty, and the danger of false precision.",
        takeaways: ["Markets adapt", "Confidence scores can mislead", "No model guarantees a profitable outcome"]
      }
    ]
  }
] as const;

// Recommended first steps through the curriculum, in order.
export const startHere = [
  { id: "financial-markets", reason: "Why markets exist and how prices form" },
  { id: "forex-fundamentals", reason: "How currency pairs work" },
  { id: "spreads", reason: "What trading really costs" },
  { id: "risk-basics", reason: "Protecting your capital first" },
  { id: "leverage-margin", reason: "Why leverage magnifies losses" }
] as const;

// Topics that have a natural live example on the Markets page.
export const topicMarketLinks: Readonly<Record<string, string>> = {
  "forex-fundamentals": "FX:EURUSD",
  "currency-pairs": "FX:GBPUSD",
  spreads: "FX:EURUSD",
  "technical-analysis": "FX:EURUSD",
  "fundamental-analysis": "FOREXCOM:SPXUSD",
  volatility: "BITSTAMP:BTCUSD"
};

export const glossary = [
  { term: "Bid and ask", definition: "The bid is the price a buyer will pay; the ask is the price a seller will accept. You usually buy at the ask and sell at the bid." },
  { term: "Spread", definition: "The difference between the bid and ask prices. It is one of the costs of trading and can widen when markets are busy or quiet." },
  { term: "Pip", definition: "A small unit of price movement in currency pairs, usually the fourth decimal place — for example from 1.1000 to 1.1001." },
  { term: "Lot", definition: "A standard unit of trade size. Brokers define lot sizes differently, so always check the contract details." },
  { term: "Leverage", definition: "Borrowed exposure that lets you control a larger position than your balance. It magnifies losses as much as gains." },
  { term: "Margin", definition: "The amount a broker sets aside from your balance to keep a leveraged position open. It is not the most you can lose." },
  { term: "Margin call", definition: "A broker's warning or action when your balance falls too low to support open positions. Positions may be closed automatically." },
  { term: "Stop-loss order", definition: "An instruction to close a position if the price reaches a set level, to limit losses. In fast markets it may fill at a worse price." },
  { term: "Take-profit order", definition: "An instruction to close a position automatically when the price reaches a target you set." },
  { term: "Slippage", definition: "The difference between the price you expected and the price you actually received, common when prices move quickly." },
  { term: "Volatility", definition: "How much and how quickly prices move. Higher volatility means larger swings in both directions." },
  { term: "Liquidity", definition: "How easily something can be bought or sold without moving its price. Low liquidity can mean wider spreads." },
  { term: "Drawdown", definition: "The fall in an account's value from its highest point to a later low, usually shown as a percentage." },
  { term: "Long and short", definition: "Going long benefits if the price rises; going short benefits if it falls. Either can lose money." },
  { term: "Position size", definition: "How large a trade is. Sizing positions relative to your balance is one of the main ways to control risk." },
  { term: "Backtest", definition: "Testing a strategy on past data. Good past results do not mean a strategy will work in the future." }
] as const;

// How joining NexaAI works: the enquiry-led, representative-assisted journey.
export const joinSteps: readonly { title: string; text: string; detail: string }[] = [
  {
    title: "Share your details",
    text: "Complete the short enquiry form with your contact details and the funding profile you are interested in.",
    detail: "It takes a few minutes. No payment, deposit or account details are requested."
  },
  {
    title: "We review your enquiry",
    text: "Our team looks at your goals and the profile you selected, so the conversation is relevant to you.",
    detail: "Your details are stored securely and used only to respond to your enquiry."
  },
  {
    title: "Speak with our team",
    text: "A NexaAI sales or support representative contacts you by phone or email to explain the service and answer your questions.",
    detail: "There is no obligation to continue."
  },
  {
    title: "Guided onboarding",
    text: "If you are eligible and decide to proceed, your representative guides you through onboarding and the brokerage arrangements for your account.",
    detail: "Eligibility depends on your country of residence and the broker's own checks."
  },
  {
    title: "Automated trading begins",
    text: "With your authorization, NexaAI's system analyzes the markets and places trades in your broker account within the settings agreed with you.",
    detail: "Automated trading carries a risk of loss. Only commit what you can afford to lose."
  }
];

// How the automated trading service works, in plain language.
export const tradingExplained = [
  { title: "Market analysis", text: "NexaAI's AI models analyze price movement, volatility and market conditions across forex, gold, indices and crypto." },
  { title: "Automated execution", text: "When conditions meet the strategy's rules, the system places trades automatically in your broker account." },
  { title: "Risk settings", text: "The markets traded and the level of risk are discussed and agreed with you during onboarding." },
  { title: "Your broker account", text: "Your trading funds are held in your own account, in your name, at an independent broker." },
  { title: "Trading permissions", text: "The system trades in your account only with your authorization." },
  { title: "Account oversight", text: "Your positions, balance and statements are available from your broker, and our team is there to help with questions." }
] as const;

// Planned client-facing products. Not available yet; never present them as live.
export const plannedProducts = [
  {
    name: "NexaAI Web Trader",
    text: "A dedicated web platform where clients will be able to follow their trading activity and account information in one place."
  },
  {
    name: "NexaAI mobile app",
    text: "A mobile experience connected to the same trading service, so clients can stay up to date on the move."
  }
] as const;

export const custodyRows = [
  { item: "Your trading funds", answer: "In your own account, in your name, at an independent broker" },
  { item: "Markets and risk settings", answer: "Discussed and agreed with you during onboarding" },
  { item: "Authorization to trade", answer: "Given by you" },
  { item: "NexaAI's role", answer: "AI trading technology, onboarding and client support" },
  { item: "Deposits and payments", answer: "Never taken through this website" }
] as const;

// Confirmed individually with each prospective client during onboarding.
export const confirmedBeforeStart = [
  "Whether the service is available in your country",
  "Your broker, its regulatory details and its terms",
  "NexaAI's charges and service terms, in writing",
  "The markets traded and your risk settings"
] as const;

export type Faq = { question: string; answer: string; pending?: boolean };
export type FaqGroup = { id: string; title: string; items: readonly Faq[] };

export const faqGroups: readonly FaqGroup[] = [
  {
    id: "about",
    title: "About NexaAI",
    items: [
      {
        question: "What is NexaAI?",
        answer: "NexaAI provides AI-powered automated trading for forex, gold, stock indices and cryptocurrency. Our system analyzes the markets and places trades automatically in your own broker account, and our team personally guides every client through onboarding."
      },
      {
        question: "Is the AI trading bot operational?",
        answer: "Yes. NexaAI's AI trading system is operational and in use today. Access is arranged individually through our team after an enquiry."
      },
      {
        question: "How does the AI trading service work?",
        answer: "The system analyzes price movement, volatility and market conditions. When conditions meet the strategy's rules, it places trades automatically in your broker account, with your authorization and within the settings agreed with you. AI can be wrong, and losses remain possible."
      }
    ]
  },
  {
    id: "joining",
    title: "Joining NexaAI",
    items: [
      {
        question: "How do I become a client?",
        answer: "Start by sending your details through the enquiry form. Our team reviews your enquiry, contacts you to explain the service and, if you are eligible and wish to proceed, guides you through onboarding and the brokerage arrangements for your account."
      },
      {
        question: "Will someone contact me?",
        answer: "Our sales and support team reviews each enquiry and contacts prospective clients by phone or email using the details provided. We will never ask for passwords or deposits through this website."
      },
      {
        question: "What happens after I submit my enquiry?",
        answer: "Your details are stored securely and reviewed by our team, who may then contact you to talk through the service. Submitting the form does not open a trading account, start any trading or commit you to anything."
      }
    ]
  },
  {
    id: "funds",
    title: "Your money and funding profiles",
    items: [
      {
        question: "Where would my trading funds be held?",
        answer: "In your own account, in your name, at an independent broker. NexaAI does not hold client trading funds, and this website does not accept deposits or payments."
      },
      {
        question: "What are the funding profiles?",
        answer: "Core (US$250), Advanced (US$500) and Elite (US$1,000) are suggested starting balances for your own broker account. They are not fees or deposits paid to NexaAI, and every profile uses the same service. Your choice simply helps your representative understand what you would like to discuss."
      }
    ]
  },
  {
    id: "availability",
    title: "Availability and platforms",
    items: [
      {
        question: "Is the service available in my country?",
        answer: "NexaAI focuses primarily on clients in Europe and welcomes enquiries from other countries. Availability depends on local rules and broker eligibility, so your representative confirms it for your country.",
        pending: true
      },
      {
        question: "Is the NexaAI Web Trader available yet?",
        answer: "Not yet. The NexaAI Web Trader is a planned client platform. Today, your positions and statements are available from your broker, and our team supports you directly."
      },
      {
        question: "Is there a NexaAI mobile app?",
        answer: "Not yet. A NexaAI mobile app is planned. Please be cautious of any app claiming to be NexaAI before we announce it officially."
      }
    ]
  },
  {
    id: "risk",
    title: "Risk and charges",
    items: [
      {
        question: "What are the risks?",
        answer: "Trading forex, gold, indices and cryptocurrency can lose some or all of the money you commit, and leverage can make losses larger. Automation does not remove this risk, and past results do not guarantee future performance. Please read our risk disclosure."
      },
      {
        question: "Are profits guaranteed?",
        answer: "No. No technology, funding profile or strategy can guarantee a profit or prevent a loss, and we will never claim otherwise."
      },
      {
        question: "What charges and terms apply?",
        answer: "Charges and service terms are explained by our team and confirmed in writing before you start. Nothing is charged through this website.",
        pending: true
      }
    ]
  }
];

export type InstrumentGuide = {
  name: string;
  what: string;
  movers: readonly string[];
  hours: string;
  note: string;
};

export const instrumentGuides: Readonly<Record<string, InstrumentGuide>> = {
  "FX:EURUSD": {
    name: "Euro / US dollar",
    what: "Shows how many US dollars one euro buys. It is the most traded currency pair in the world.",
    movers: ["European Central Bank and US Federal Reserve interest-rate decisions", "Inflation, growth and jobs figures from Europe and the US", "Changes in global risk appetite"],
    hours: "Trades around the clock from Monday to Friday. Activity is usually highest when the European and US sessions overlap.",
    note: "Small price moves are measured in pips. Leverage can magnify both gains and losses."
  },
  "FX:GBPUSD": {
    name: "British pound / US dollar",
    what: "Shows how many US dollars one British pound buys.",
    movers: ["Bank of England and Federal Reserve decisions", "UK and US inflation and jobs data", "UK political and economic news"],
    hours: "Trades around the clock from Monday to Friday, most actively during the London and New York sessions.",
    note: "Often moves more sharply than EUR/USD around UK news releases."
  },
  "OANDA:XAUUSD": {
    name: "Gold / US dollar",
    what: "The price of one troy ounce of gold in US dollars.",
    movers: ["The strength of the US dollar", "Interest-rate and inflation expectations", "Geopolitical uncertainty and central-bank buying"],
    hours: "Trades almost continuously from Monday to Friday, with a short daily break.",
    note: "Gold can move sharply around major US economic releases."
  },
  "FOREXCOM:SPXUSD": {
    name: "S&P 500",
    what: "Tracks 500 large companies listed in the United States and is widely used as a gauge of the US stock market.",
    movers: ["Company earnings", "Economic growth and employment", "Interest-rate expectations"],
    hours: "The main US stock-market session runs 9:30–16:00 New York time. The price shown here can move outside those hours.",
    note: "Prices come from a third-party data source and may differ slightly from the official index level."
  },
  "FOREXCOM:NSXUSD": {
    name: "NASDAQ 100",
    what: "Tracks 100 of the largest non-financial companies listed on the Nasdaq exchange, with a heavy weighting in technology.",
    movers: ["Technology company earnings", "Interest-rate expectations", "Investor appetite for growth companies"],
    hours: "The main US stock-market session runs 9:30–16:00 New York time. The price shown here can move outside those hours.",
    note: "Often swings more than broader indices because it is concentrated in fewer sectors."
  },
  "BITSTAMP:BTCUSD": {
    name: "Bitcoin / US dollar",
    what: "The price of one Bitcoin in US dollars on the Bitstamp exchange.",
    movers: ["Market sentiment and news", "Regulatory developments", "Money moving into and out of crypto exchanges and funds"],
    hours: "Trades 24 hours a day, every day of the year.",
    note: "Cryptocurrency prices can move by large amounts in short periods, and protections can differ from regulated markets."
  },
  "BITSTAMP:ETHUSD": {
    name: "Ether / US dollar",
    what: "The price of one Ether, the currency of the Ethereum network, in US dollars.",
    movers: ["Activity on the Ethereum network", "Market sentiment and Bitcoin's direction", "Regulatory developments"],
    hours: "Trades 24 hours a day, every day of the year.",
    note: "Cryptocurrency prices can move by large amounts in short periods, and protections can differ from regulated markets."
  }
};

export const chartTips = [
  "Each candle shows the opening, highest, lowest and closing price for one period, such as one hour.",
  "Green candles closed higher than they opened; red candles closed lower.",
  "Use the timeframe buttons to zoom out. Short timeframes can make normal movement look dramatic.",
  "Volume bars show how much was traded. Unusually high volume often accompanies news."
] as const;

// Owner-supplied figures (win rate from NexaAI's internal trading analysis; client funds and investors confirmed 16 October 2026).
export const performanceStats = [
  { value: "94–98%", label: "Win rate" },
  { value: "US$6.21M+", label: "Client funds managed" },
  { value: "1,000+", label: "Active investors" },
  { value: "10+ years", label: "Of trading experience" }
] as const;

export const performanceNote =
  "Trading involves risk of loss, and past performance does not guarantee future results.";

// Real client testimonials only, each used with the client's permission. The section stays hidden while empty.
export type Testimonial = { quote: string; name: string; location?: string };
export const testimonials: readonly Testimonial[] = [];
