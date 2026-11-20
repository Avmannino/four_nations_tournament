import { useId, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Award,
  Check,
  Gift,
  LockKeyhole,
  MapPin,
  Medal,
  Sparkles,
} from 'lucide-react';
import logo from './assets/four-nations-logo.png';
import usaJersey from './assets/usa-jersey.png';
import canadaJersey from './assets/canada-jersey.png';
import finlandJersey from './assets/finland-jersey.png';
import swedenJersey from './assets/sweden-jersey.png';
import jakeThibeaultPhoto from './assets/jake.jpg';
import wingsLogo from './assets/wings-logo.png';
import coastalLogo from './assets/coastal-logo.png';
import { CanadaFlag, FinlandFlag, SwedenFlag, UsaFlag } from './flags';

const CONTACT_EMAIL = import.meta.env.VITE_EVENT_CONTACT_EMAIL?.trim() || 'tournament@wingsarena.com';
// TODO: paste the registration link here once organizers provide it.
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

// Confirmed coaches. Cards render only when this list has entries.
// To add one: put a headshot in src/assets, import it above, and add an entry like:
// { name: 'Coach Name', role: 'Former NCAA Division I defenseman', photo: coachPhoto, bio: 'Short bio…' },
const coaches = [];

const specialGuest = {
  name: 'Jake Thibeault',
  role: 'Guest speaker · Opening ceremony & seminar',
  photo: jakeThibeaultPhoto,
  // Story drawn from Babson Athletics, Babson Magazine, and Boston news coverage. Have Jake review before launch.
  bio: [
    'A Fitchburg, Massachusetts native, Jake Thibeault was a senior playing hockey for Milton Academy when an on-ice collision on September 4, 2021 left him with two broken vertebrae and partial paralysis.',
    'Jake refused to let the injury define him. He went on to Babson College and became an inspiration to the Babson men’s hockey program while continuing to work toward his goal of walking again. In fall 2025, Babson opened its season with a two-game series against Fitchburg State held in his honor.',
    'Jake will share his story during the opening ceremony and lead a seminar during the tournament weekend.',
  ],
  website: 'https://entrepreneurship.babson.edu/jake-thibeault-more-than-hockey/',
};

const schedule = [
  { day: 'Friday', date: 'AUG 6', label: 'OPENING DAY · AFTERNOON', color: '#ff5468', items: ['Team practices', 'Opening ceremony', 'Guest speaker Jake Thibeault', 'First round-robin games'] },
  { day: 'Saturday', date: 'AUG 7', label: 'ROUND ROBIN', color: '#65b5fa', items: ['Round-robin games', 'Semifinal seeding set'] },
  { day: 'Sunday', date: 'AUG 8', label: 'MEDAL DAY', color: '#ffd063', items: ['Semifinals', 'Gold & bronze medal games', 'Medal presentation'] },
];

const gameFormat = [
  { label: 'ROUND ROBIN', items: ['Each team plays the other 3 in its division', 'Tiebreakers: head-to-head, then goal differential'] },
  { label: 'SEMIFINALS', items: ['1st place vs. 4th place', '2nd place vs. 3rd place'] },
  { label: 'MEDAL GAMES', items: ['Semifinal winners play for gold', 'The other 2 teams play for bronze'] },
  { label: 'OVERTIME', items: ['Round robin: 5 min of 3-on-3, then a shootout', 'Semifinals & medal games: 3-on-3 until a winner'] },
];

const experience = [
  { icon: Gift, title: 'Player gift bag', text: 'Every player takes home a tournament gift bag.' },
  { icon: Award, title: 'Player of the Game', text: 'Standout performances recognized throughout the tournament.' },
  { icon: Medal, title: 'Gold, silver & bronze', text: 'Medals for the top 3 teams in each division.' },
  { icon: Sparkles, title: 'Beyond the rink', text: 'Music, Spikeball, cornhole, and KanJam in the outdoor activity area between games.' },
];

const faqs = [
  {
    q: 'Can any player register?',
    a: 'No. The Four Nations Youth Games is a selective, invitation-only event. The Tournament Director selects each player and sends an individual invitation with private registration instructions. There is no public registration or waitlist.',
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
    a: 'Teams are coached by a highly qualified staff, including former NCAA Division I players. Our coaches are focused on teaching the game: building skills, reinforcing good habits, and helping every player improve over the course of the weekend.',
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
    a: 'Name and number details, including the ordering deadline, are still being finalized with our supplier. We’ll share them with registered families once confirmed.',
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

// Shows a person's photo, or their initials until a photo is supplied.
function Headshot({ name, photo, className }) {
  const initials = name.split(' ').map((part) => part[0]).join('').slice(0, 2);
  return (
    <div className={className}>
      {photo ? <img src={photo} alt={name} /> : <span aria-hidden="true">{initials}</span>}
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
            Every invited player receives an individual invitation from the Tournament Director,
            along with private registration instructions.
          </p>
        </div>

        <div className="registration-card">
          <div className="registration-card-head">
            <span className="registration-lock"><LockKeyhole size={20} /></span>
            <div>
              <p className="small-kicker">INVITATION-ONLY ACCESS</p>
              <h3>Player registration</h3>
            </div>
          </div>
          <p className="registration-intro">Have these details ready before you start:</p>
          <ul className="ready-list">
            <li><Check size={18} />Your invitation and registration instructions</li>
            <li><Check size={18} />Parent or guardian contact information</li>
            <li><Check size={18} />Requested jersey name and number</li>
            <li><Check size={18} />Jersey and sock sizes</li>
          </ul>
          {REGISTER_URL ? (
            <a className="button button--red button--full" {...registerLinkProps}>Continue to registration <ArrowRight size={18} /></a>
          ) : (
            <span className="button button--full button--pending">Registration link coming soon</span>
          )}
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
          <h1 className="sr-only">Future Stars Four Nations Youth Games: August 6–8, 2027 at Wings Arena, Stamford, Connecticut</h1>
        </section>

        <section className="cta-bar" aria-label="Player registration">
          <div className="content-width cta-layout">
            <img src={wingsLogo} alt="Wings Arena" className="partner-logo partner-logo--wings" />
            <div className="cta-card">
              <div className="cta-copy">
                <h2>One step closer to game day.</h2>
                <p>Invited players can complete their registration using the link below to secure their place in the Future Stars Four Nations Youth Games.</p>
                <a className="button button--red button--cta" {...registerLinkProps}>Access registration <ArrowUpRight size={18} /></a>
              </div>
            </div>
            <div className="cta-partner">
              <span className="cta-partner-label">In partnership with</span>
              <img src={coastalLogo} alt="Coastal Elite" className="partner-logo partner-logo--coastal" />
            </div>
          </div>
        </section>

        <section id="about" className="about-section section-pad">
          <div className="content-width about-layout">
            <div>
              <SectionHeader eyebrow="THE TOURNAMENT" title={<>Compete with purpose.<br /><span className="highlight-word">Develop with every shift.</span></>} body="An invitation-only weekend for local 2016 and 2017 AA players, built around meaningful games and real instruction, and designed to send every player home a better hockey player." />
              <a href="#format" className="inline-link">See the weekend schedule <ArrowRight size={18} /></a>
            </div>
            <div className="about-showcase">
              <div className="showcase-card showcase-card--one"><span className="showcase-label">DIVISION 01 AA</span><div className="showcase-year"><strong>2016</strong><span>BIRTH YEAR</span></div></div>
              <div className="showcase-card showcase-card--two"><span className="showcase-label">DIVISION 02 AA</span><div className="showcase-year"><strong>2017</strong><span>BIRTH YEAR</span></div></div>
            </div>
          </div>
        </section>

        <section id="coaches" className="coaches-section section-pad">
          <div className="content-width">
            <div className="coaches-layout">
              <SectionHeader eyebrow="THE COACHES" title={<>Coaches who <br className="mobile-break" /><span className="highlight-word">teach the game.</span></>} />
              <p className="coaches-intro">Teams are coached by a highly qualified staff, including former NCAA Division I players, who put teaching first: building skills, reinforcing good habits, and helping every player improve over the weekend.</p>
            </div>
            {coaches.length > 0 && (
              <div className="coach-grid">
                {coaches.map((coach) => (
                  <article className="coach-card" key={coach.name}>
                    <Headshot name={coach.name} photo={coach.photo} className="coach-photo" />
                    <h3>{coach.name}</h3>
                    <p className="coach-role">{coach.role}</p>
                    <p>{coach.bio}</p>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <section id="nations" className="nations-section section-pad">
          <div className="content-width">
            <SectionHeader title={<>Wear one of the Four Nations <br className="mobile-break" /><span className="highlight-word">team colors.</span></>} body="Every player is assigned to 1 of 4 teams and receives that team’s custom jersey and matching socks to keep." light />
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
            <div className="experience-top"><SectionHeader eyebrow="THE FULL EXPERIENCE" title={<>The little <span className="highlight-word">extras</span></>} /></div>
            <div className="experience-grid">{experience.map((item) => { const Icon = item.icon; return <article className="experience-card" key={item.title}><div className="experience-card-top"><span className="experience-icon"><Icon size={23} strokeWidth={1.9} /></span></div><h3>{item.title}</h3><p>{item.text}</p></article>; })}</div>
          </div>
        </section>

        <section id="format" className="format-section section-pad">
          <div className="content-width">
            <div className="format-copy"><SectionHeader eyebrow="SCHEDULE & FORMAT" title={<>Every game <span>counts.</span></>} body="1 team practice and 5 guaranteed games over 3 days, with something on the line in every one." light /></div>
            <div className="schedule-grid">
              {schedule.map((item) => (
                <article className="day-card" key={item.day} style={{ '--day-color': item.color }}>
                  <div className="day-card-head">
                    <span className="day-date">{item.date}</span>
                    <h3 className="day-name">{item.day}</h3>
                    <small className="day-label">{item.label}</small>
                  </div>
                  <ul className="day-list">{item.items.map((entry) => <li key={entry}>{entry}</li>)}</ul>
                </article>
              ))}
            </div>
            <div className="format-rules">
              <div className="format-rules-head">
                <h3>Game format</h3>
                <p className="format-note">Game length will be confirmed before the event.</p>
              </div>
              <div className="rules-grid">
                {gameFormat.map((rule) => (
                  <div className="rule" key={rule.label}>
                    <h4>{rule.label}</h4>
                    <ul>{rule.items.map((entry) => <li key={entry}>{entry}</li>)}</ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="guest" className="guest-section">
          <div className="content-width guest-layout">
            <Headshot name={specialGuest.name} photo={specialGuest.photo} className="guest-photo" />
            <div className="guest-copy">
              <p className="eyebrow"><span className="eyebrow-line" />SPECIAL GUEST</p>
              <h2>{specialGuest.name}</h2>
              <p className="guest-role">{specialGuest.role}</p>
              {specialGuest.bio.map((paragraph) => <p className="guest-bio" key={paragraph}>{paragraph}</p>)}
              {specialGuest.website && (
                <a className="guest-link" href={specialGuest.website} target="_blank" rel="noopener noreferrer">Read Jake’s story at Babson <ArrowRight size={18} /></a>
              )}
            </div>
          </div>
        </section>

        <Registration />

        <section id="faq" className="faq-section section-pad"><div className="content-width faq-layout"><div><SectionHeader eyebrow="GOOD TO KNOW" title={<>Frequently asked<br /><span className="highlight-word">questions.</span></>} /></div><div className="faq-list">{faqs.map((item) => <FaqItem key={item.q} q={item.q} a={item.a} />)}</div></div></section>
      </main>

      <footer className="footer"><div className="content-width footer-main"><div className="footer-brand"><img src={logo} alt="Future Stars Four Nations Youth Games logo" /></div><div className="footer-location"><MapPin size={19} /><span>Wings Arena · 5 Barry Pl., Stamford, CT<br />August 6–8, 2027<br /><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></span></div><a href="#top" className="back-to-top">BACK TO TOP <ArrowDown size={18} /></a></div><div className="content-width footer-bottom"><span>© 2026 Wings Arena</span><span>Event details subject to change</span></div></footer>
    </>
  );
}
