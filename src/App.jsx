import { useId, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  Award,
  Check,
  ChevronDown,
  ClipboardList,
  Clock3,
  CreditCard,
  Gift,
  LockKeyhole,
  MapPin,
  Medal,
  ShieldCheck,
  Shirt,
  Sparkles,
  Trophy,
  Users,
} from 'lucide-react';
import logo from './assets/four-nations-logo.png';
import usaJersey from './assets/usa-jersey.png';
import canadaJersey from './assets/canada-jersey.png';
import finlandJersey from './assets/finland-jersey.png';
import swedenJersey from './assets/sweden-jersey.png';
import { CanadaFlag, FinlandFlag, SwedenFlag, UsaFlag } from './flags';

const CONTACT_EMAIL = import.meta.env.VITE_EVENT_CONTACT_EMAIL?.trim() || 'tournament@wingsarena.com';
// TODO: paste the EZFacility registration link here once organizers provide it.
// Until then, registration buttons scroll to the on-page registration section.
const REGISTER_URL = '';
const registerLinkProps = REGISTER_URL
  ? { href: REGISTER_URL, target: '_blank', rel: 'noopener noreferrer' }
  : { href: '#register' };

const nations = [
  {
    name: 'USA',
    flag: UsaFlag,
    kit: 'Vintage cream / red / navy',
    image: usaJersey,
    color: '#ca3141',
  },
  {
    name: 'CANADA',
    flag: CanadaFlag,
    kit: 'Red / black',
    image: canadaJersey,
    color: '#e4313a',
  },
  {
    name: 'FINLAND',
    flag: FinlandFlag,
    kit: 'White / cyan / navy',
    image: finlandJersey,
    color: '#4aaff0',
  },
  {
    name: 'SWEDEN',
    flag: SwedenFlag,
    kit: 'Yellow / navy',
    image: swedenJersey,
    color: '#f7bd32',
  },
];

const experience = [
  { icon: Trophy, title: '5 guaranteed games', text: '3 round-robin games, a semifinal, and a medal game. Meaningful hockey from the first puck drop to the last.' },
  { icon: Clock3, title: 'A true team practice', text: 'A 50-minute half-ice session with your team and coach to build chemistry and sharpen the details.' },
  { icon: Shirt, title: 'Custom tournament uniform', text: 'A country-themed jersey and matching socks to keep. Pay in full by June 1, 2027 to get your name and number.' },
  { icon: Gift, title: 'Player extras', text: 'A player gift bag, plus Player of the Game awards throughout the tournament.' },
  { icon: Medal, title: 'A medal moment', text: 'Gold, silver, and bronze medals presented at the medal ceremony after the final games.' },
  { icon: Sparkles, title: 'Beyond the rink', text: 'An outdoor activity area with music, Spikeball, cornhole, and KanJam running alongside the games.' },
];

const faqs = [
  {
    q: 'Can any player register?',
    a: 'No. The Four Nations Youth Games is a selective, invitation-only event. Tournament director Jake Hewitt selects each player and sends an individual invitation with private registration instructions. There is no public registration or waitlist.',
  },
  {
    q: 'Are players representing their home countries?',
    a: 'No. Players are invited local AA players assigned to USA, Canada, Finland, or Sweden-themed teams. The country theme is part of what makes the weekend unique. It is not an international competition, and a player’s nationality has nothing to do with team assignments.',
  },
  {
    q: 'What birth years and skill level are eligible?',
    a: 'The tournament is for invited local 2016 AA and 2017 AA players. Each birth-year division has 4 country-themed teams of 15 players (8 forwards, 5 defense, and 2 goalies): USA, Canada, Finland, and Sweden.',
  },
  {
    q: 'Who coaches the teams?',
    a: 'Every team has its own dedicated coach, 8 in all. Our coaches are focused on teaching the game: building skills, reinforcing good habits, and helping every player improve over the course of the weekend.',
  },
  {
    q: 'What does the player fee include?',
    a: 'The player fee is $425, paid in full at registration. It covers 5 games, a 50-minute half-ice team practice, a jersey and socks to keep, a player gift bag, Player of the Game awards, and gold, silver, and bronze medals.',
  },
  {
    q: 'What if my player needs to withdraw?',
    a: 'Player withdrawals are nonrefundable. If Wings Arena cancels the event, registered families receive a full refund.',
  },
  {
    q: 'Will jerseys include my player’s name and number?',
    a: 'Yes, for players paid in full by June 1, 2027. Those players receive a jersey with their requested name and number. Sizes and numbers are subject to supplier availability.',
  },
  {
    q: 'Can family and friends watch?',
    a: 'Yes. Spectator admission is free for families and supporters all weekend.',
  },
  {
    q: 'When will the game schedule be announced?',
    a: 'The tournament runs Friday through Sunday, August 6–8, 2027. The full game and practice schedule will be shared with registered families once it is set.',
  },
  {
    q: 'Who do I contact with questions?',
    a: <>Email the tournament team at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</>,
  },
];

function SectionHeader({ eyebrow, title, body, light = false }) {
  return (
    <div className={`section-heading ${light ? 'section-heading--light' : ''}`}>
      {eyebrow && <p className="eyebrow"><span className="eyebrow-line" />{eyebrow}</p>}
      <h2>{title}</h2>
      {body && <p className="section-intro">{body}</p>}
    </div>
  );
}

// Accordion row: animates open/closed by transitioning grid rows from 0fr to 1fr.
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className={`faq-item${open ? ' is-open' : ''}`}>
      <button type="button" className="faq-question" aria-expanded={open} aria-controls={id} onClick={() => setOpen((v) => !v)}>
        {q}<span className="faq-plus" aria-hidden="true">+</span>
      </button>
      <div className="faq-answer" id={id} inert={!open}>
        <div className="faq-answer-inner"><p>{a}</p></div>
      </div>
    </div>
  );
}

function Registration() {
  return (
    <section id="register" className="registration-section">
      <div className="content-width registration-layout">
        <div className="registration-aside">
          <p className="eyebrow eyebrow--yellow"><span className="eyebrow-line" />INVITED PLAYERS</p>
          <h2>Got the invite?<br /><span>Lock in your spot.</span></h2>
          <p>
            Every invited player receives an individual invitation from tournament director
            Jake Hewitt, along with private instructions for registering through EZFacility.
          </p>
          <div className="registration-highlights">
            <div><ShieldCheck size={21} /><span>Personal invitations only</span></div>
            <div><CreditCard size={21} /><span>$425 per player · paid in full</span></div>
            <div><Shirt size={21} /><span>Pay by June 1, 2027 for a name &amp; number jersey</span></div>
          </div>
          <p className="registration-fineprint">
            Registration is private and not open to the public. Your invitation includes
            your registration instructions.
          </p>
        </div>

        <div className="registration-card">
          <div className="registration-card-head">
            <span className="registration-lock"><LockKeyhole size={20} /></span>
            <div>
              <p className="small-kicker">INVITATION-ONLY ACCESS</p>
              <h3>Register through EZFacility</h3>
            </div>
          </div>
          <p className="registration-intro">Have these details ready before you start:</p>
          <ul className="ready-list">
            <li><Check size={18} />Your invitation and registration instructions</li>
            <li><Check size={18} />Parent or guardian contact information</li>
            <li><Check size={18} />Requested jersey name and number</li>
            <li><Check size={18} />Jersey and sock sizes</li>
          </ul>
          <div className="registration-terms">
            <strong>Registration terms</strong>
            <p>Payment of $425 in full secures your player’s place. Player withdrawals are nonrefundable. If Wings Arena cancels the event, registered families receive a full refund.</p>
          </div>
          {REGISTER_URL ? (
            <a className="button button--red button--full" {...registerLinkProps}>Continue to EZFacility <ArrowRight size={18} /></a>
          ) : (
            <span className="button button--full button--pending">EZFacility registration link coming soon</span>
          )}
          <p className="registration-disclaimer">
            Questions about your invitation? Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <>

      <main id="top">
        <section className="hero">
          <div className="content-width hero-inner">
            <div className="hero-copy">
              <h1>THE ROAD TO GOLD<br /><em>STARTS HERE.</em><br /></h1>
              <p>An invitation-only tournament for 2016 and 2017 AA players: 5 competitive games, coaches who teach the game, and a weekend your player will be talking about all season.</p>
              <div className="hero-actions">
                <a className="button button--red" {...registerLinkProps}>Register Here <ArrowRight size={18} /></a>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-logo-halo" />
              <img src={logo} alt="Future Stars Four Nations Youth Games tournament logo" className="hero-logo" />
            </div>
          </div>
        </section>

        <section className="details-bar" aria-label="Tournament at a glance">
          <div className="content-width">
            <dl className="details-grid">
              <div className="details-item"><dt>DATES</dt><dd>August 6–8, 2027</dd></div>
              <div className="details-item"><dt>DIVISIONS</dt><dd>2016 &amp; 2017 AA</dd></div>
              <div className="details-item"><dt>FORMAT</dt><dd>1 practice · 5 games</dd></div>
              <div className="details-item"><dt>PLAYER FEE</dt><dd>$425 per player</dd></div>
            </dl>
          </div>
        </section>

        <section id="about" className="about-section section-pad">
          <div className="content-width about-layout">
            <div>
              <SectionHeader eyebrow="THE TOURNAMENT" title={<>Compete with purpose.<br /><span className="highlight-word">Develop with every shift.</span></>} body="A selective, 3-day event for invited local 2016 and 2017 AA players, built around meaningful games, real instruction, and designed to send every player home better than when they arrived." />
              <p className="about-prose">The Four Nations format places invited local AA players on 1 of 4 country-themed teams (USA, Canada, Finland, or Sweden) within their birth-year division. Every team practices together, plays a full round-robin schedule, and competes through a semifinal and medal game, with a dedicated coach teaching the game from the first practice to the final whistle.</p>
              <div className="about-quickfacts"><div><Users size={22} /><span><strong>15 players per roster</strong><small>8 forwards · 5 defense · 2 goalies</small></span></div><div><ClipboardList size={22} /><span><strong>A dedicated coach for every team</strong><small>Teaching-focused, from practices through to the medal round</small></span></div><div><MapPin size={22} /><span><strong>Wings Arena</strong><small>5 Barry Pl., Stamford, CT</small></span></div></div>
              <a href="#format" className="inline-link">See the tournament format <ArrowRight size={18} /></a>
            </div>
            <div className="about-showcase">
              <div className="showcase-card showcase-card--one"><span className="showcase-label">DIVISION 01 AA</span><div className="showcase-year"><strong>2016</strong><span>BIRTH YEAR</span></div></div>
              <div className="showcase-card showcase-card--two"><span className="showcase-label">DIVISION 02 AA</span><div className="showcase-year"><strong>2017</strong><span>BIRTH YEAR</span></div></div>
            </div>
          </div>
        </section>

        <section id="nations" className="nations-section section-pad">
          <div className="content-width">
            <SectionHeader title={<>Dressed for <span className="highlight-word">the occasion.</span></>} body="Every player suits up in a country-themed tournament jersey with matching socks and the Four Nations emblem, designed for this event and theirs to keep long after the last game." light />
            <div className="nations-grid">
              {nations.map((nation) => (
                <article className="nation-card" key={nation.name} style={{ '--nation-accent': nation.color }}>
                  <div className="nation-image-wrap"><img src={nation.image} alt={`${nation.name}-themed tournament jersey and sock concept`} loading="lazy" /></div>
                  <div className="nation-card-bottom"><div><nation.flag /><h3>{nation.name}</h3></div><small>{nation.kit}</small></div>
                </article>
              ))}
            </div>
            <p className="nations-note">Uniforms shown are design concepts. Final materials, sizes, and details will be confirmed with our supplier.</p>
          </div>
        </section>

        <section id="experience" className="experience-section section-pad">
          <div className="content-width">
            <div className="experience-top"><SectionHeader eyebrow="THE FULL EXPERIENCE" title={<>Not your average <span className="highlight-word">tournament weekend.</span></>} body="Big games, real coaching, and plenty of fun in between. Here’s what’s included for every player." /><div className="fee-badge"><span>PLAYER FEE</span><strong>$425<small>/ player</small></strong><span>COVERS THE FULL PLAYER EXPERIENCE</span></div></div>
            <div className="experience-grid">{experience.map((item, idx) => { const Icon = item.icon; return <article className="experience-card" key={item.title}><div className="experience-card-top"><span className="experience-icon"><Icon size={23} strokeWidth={1.9} /></span><span className="experience-number">0{idx + 1}</span></div><h3>{item.title}</h3><p>{item.text}</p></article>; })}</div>
            <div className="event-callout"><div className="callout-icon"><Award size={30} /></div><div><span>SPECIAL GUEST · SPEAKER &amp; SEMINAR</span><strong>Jake Thibeault</strong><p>Jake headlines the opening ceremony, alongside team introductions and flags, and leads a seminar during the tournament weekend.</p></div><a href="#faq" className="callout-link">EVENT DETAILS <ArrowRight size={18} /></a></div>
          </div>
        </section>

        <section id="format" className="format-section section-pad">
          <div className="content-width format-layout">
            <div className="format-copy"><SectionHeader eyebrow="TOURNAMENT FORMAT" title={<>Every game <span>counts.</span></>} body="It starts with a team practice. Then every team plays each opponent in its division before the bracket sets the semifinals and medal games: 5 guaranteed games, with something on the line in every one." light />
              <div className="format-legend"><div><span className="legend-swatch legend-swatch--red" /> ROUND ROBIN</div><div><span className="legend-swatch legend-swatch--blue" /> PLAYOFFS</div><div><span className="legend-swatch legend-swatch--gold" /> MEDAL GAMES</div></div>
            </div>
            <div className="format-steps"><div className="format-step"><span className="format-step-count">01</span><div><small>THE OPENING ROUNDS</small><h3>3 round-robin games</h3><p>Each team plays the other 3 in its division. Tiebreakers: head-to-head, then goal differential.</p></div><ChevronDown size={19} /></div><div className="format-step"><span className="format-step-count">02</span><div><small>THE FINAL FOUR</small><h3>1 semifinal game</h3><p>1st place plays 4th; 2nd place plays 3rd.</p></div><ChevronDown size={19} /></div><div className="format-step"><span className="format-step-count">03</span><div><small>FOR THE MEDALS</small><h3>1 medal-placement game</h3><p>Semifinal winners play for gold and silver; the other 2 teams meet for bronze.</p></div><Trophy size={23} /></div></div>
            <div className="overtime-note"><Clock3 size={20} /><div><strong>Overtime rules</strong><p>Round robin: 5 minutes of 3-on-3, then a shootout. Semifinals and medal games: continuous 3-on-3 until a winner. Game length and remaining rules will be shared before the event.</p></div></div>
          </div>
        </section>

        <section className="details-strip"><div className="content-width details-layout"><div><p className="eyebrow"><span className="eyebrow-line" /> THE WEEKEND</p><h2>OFF THE ICE,<br /><span>THE FUN CONTINUES.</span></h2></div><div className="details-items"><div><Check size={20} /><span>Free spectator admission</span></div><div><Check size={20} /><span>Opening ceremony</span></div><div><Check size={20} /><span>Seminar with Jake Thibeault</span></div><div><Check size={20} /><span>Music &amp; outdoor games</span></div></div></div></section>

        <Registration />

        <section id="faq" className="faq-section section-pad"><div className="content-width faq-layout"><div><SectionHeader eyebrow="GOOD TO KNOW" title={<>Frequently asked<br /><span className="highlight-word">questions.</span></>} /></div><div className="faq-list">{faqs.map((item) => <FaqItem key={item.q} q={item.q} a={item.a} />)}</div></div></section>
      </main>

      <footer className="footer"><div className="content-width footer-main"><div className="footer-brand"><img src={logo} alt="Future Stars Four Nations Youth Games logo" /></div><div className="footer-location"><MapPin size={19} /><span>Wings Arena · Stamford, Connecticut<br />August 6–8, 2027<br /><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></span></div><a href="#top" className="back-to-top">BACK TO TOP <ArrowDown size={18} /></a></div><div className="content-width footer-bottom"><span>© {new Date().getFullYear()} </span><span>Event details subject to change</span></div></footer>
    </>
  );
}
