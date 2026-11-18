import { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  Award,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock3,
  CreditCard,
  Flag,
  Gift,
  LockKeyhole,
  Mail,
  MapPin,
  Medal,
  Menu,
  ShieldCheck,
  Shirt,
  Sparkles,
  Trophy,
  Users,
  X,
} from 'lucide-react';
import logo from './assets/four-nations-logo.png';

const API = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '');
const CONTACT_EMAIL = import.meta.env.VITE_EVENT_CONTACT_EMAIL?.trim();

const nations = [
  {
    name: 'USA',
    flag: '🇺🇸',
    kit: 'Vintage cream / red / navy',
    image: '/images/usa-concept.webp',
    color: '#ca3141',
    number: '01',
  },
  {
    name: 'CANADA',
    flag: '🇨🇦',
    kit: 'Red / black',
    image: '/images/canada-concept.webp',
    color: '#e4313a',
    number: '02',
  },
  {
    name: 'FINLAND',
    flag: '🇫🇮',
    kit: 'White / cyan / navy',
    image: '/images/finland-concept.webp',
    color: '#4aaff0',
    number: '03',
  },
  {
    name: 'SWEDEN',
    flag: '🇸🇪',
    kit: 'Yellow / navy',
    image: '/images/sweden-concept.webp',
    color: '#f7bd32',
    number: '04',
  },
];

const experience = [
  { icon: Trophy, title: '5 games guaranteed', text: 'Three round-robin games, one semifinal, and one medal-placement game.' },
  { icon: Clock3, title: 'Dedicated practice', text: 'One 50-minute half-ice team practice, included for every player.' },
  { icon: Shirt, title: 'Country-inspired uniform', text: 'A tournament jersey and a matching pair of hockey socks to keep.' },
  { icon: Gift, title: 'Player extras', text: 'A gift bag and Player of the Game recognition throughout the weekend.' },
  { icon: Medal, title: 'A medal moment', text: 'Gold, silver, and bronze medals presented at the event ceremony.' },
  { icon: Sparkles, title: 'Beyond the rink', text: 'Opening ceremony, music, Spikeball, cornhole, and KanJam.' },
];

const faqs = [
  {
    q: 'Can any player register?',
    a: 'No. This is an invitation-only event. Tournament director Jake Hewitt selects and individually invites players. There is no public registration or planned waitlist.',
  },
  {
    q: 'What birth years and skill level are eligible?',
    a: 'The event is designed for invited 2016 AA and 2017 AA players. Each birth-year division has separate USA, Canada, Finland, and Sweden teams.',
  },
  {
    q: 'How much does registration cost?',
    a: 'The proposed player fee is $425, paid in full at private registration. The plan calls for no added checkout processing fee for families. Registration and payment arrangements must be finalized by the organizers before launch.',
  },
  {
    q: 'What if my player needs to withdraw?',
    a: 'The proposed policy is that player withdrawals are nonrefundable. If the event is canceled by Wings Arena, registered families receive a full refund. Final registration terms must be confirmed before accepting payments.',
  },
  {
    q: 'When are personalized jerseys guaranteed?',
    a: 'The proposal calls for a jersey with the player’s name and number for players paid in full by June 1, 2027. Final size options, supplier lead times, and the production deadline still need confirmation.',
  },
  {
    q: 'Can family and friends watch?',
    a: 'Yes. The proposal includes free spectator admission for families and supporters.',
  },
  {
    q: 'When will the game schedule be announced?',
    a: 'The final ice schedule, game-slot lengths, and some playing rules have not yet been confirmed. The event is proposed for Friday through Sunday, August 6–8, 2027.',
  },
];

function SectionHeader({ eyebrow, title, body, light = false }) {
  return (
    <div className={`section-heading ${light ? 'section-heading--light' : ''}`}>
      <p className="eyebrow"><span className="eyebrow-line" />{eyebrow}</p>
      <h2>{title}</h2>
      {body && <p className="section-intro">{body}</p>}
    </div>
  );
}

async function postJson(path, payload) {
  let response;
  try {
    response = await fetch(`${API}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error('Registration service is not available. Please try again later.');
  }
  const json = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(json.error || 'Request failed. Please try again.');
  return json;
}

function Registration() {
  const [inviteCode, setInviteCode] = useState('');
  const [invitation, setInvitation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    guardianName: '', email: '', phone: '', jerseyName: '', jerseyNumber: '',
    jerseySize: '', sockSize: '', termsAccepted: false, waiverAcknowledged: false,
  });

  const status = new URLSearchParams(window.location.search).get('registration');

  useEffect(() => {
    // Invite links may contain a private token. Remove it from browser history promptly.
    const url = new URL(window.location.href);
    const receivedCode = url.searchParams.get('invite');
    if (receivedCode) {
      setInviteCode(receivedCode);
      url.searchParams.delete('invite');
      window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
    }
  }, []);

  const lookup = async (event) => {
    event.preventDefault();
    setError('');
    setInvitation(null);
    setLoading(true);
    try {
      const result = await postJson('/invite/lookup', { code: inviteCode.trim() });
      setInvitation(result.invitation);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const checkout = async (event) => {
    event.preventDefault();
    if (!form.termsAccepted || !form.waiverAcknowledged) {
      setError('Please review both acknowledgments before proceeding.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const result = await postJson('/registration/checkout', {
        code: inviteCode.trim(), ...form,
      });
      if (!result.url?.startsWith('https://checkout.stripe.com/')) {
        throw new Error('Checkout did not return a valid payment link.');
      }
      window.location.assign(result.url);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const change = (name, value) => setForm((current) => ({ ...current, [name]: value }));

  return (
    <section id="register" className="registration-section">
      <div className="content-width registration-layout">
        <div className="registration-aside">
          <p className="eyebrow eyebrow--yellow"><span className="eyebrow-line" />PRIVATE PLAYER PORTAL</p>
          <h2>Your invitation.<br /><span>Your moment.</span></h2>
          <p>
            Invited players can review their team assignment, submit uniform preferences,
            and complete their registration securely.
          </p>
          <div className="registration-highlights">
            <div><ShieldCheck size={21} /><span>Individual invitations only</span></div>
            <div><CreditCard size={21} /><span>$425 per player · paid in full</span></div>
            <div><CheckCircle2 size={21} /><span>No additional checkout fee planned</span></div>
          </div>
          <p className="registration-fineprint">
            Registration is private. Organizers must confirm the final terms, waivers,
            payment setup, and supplier sizes before accepting registrations.
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

          {status === 'success' && (
            <div className="state-message state-message--success" role="status">
              <CheckCircle2 size={21} /> Checkout completed. Your registration is confirmed once payment is verified by the event system.
            </div>
          )}
          {status === 'cancelled' && (
            <div className="state-message" role="status">
              Checkout was not completed. Re-enter your invitation code to resume your existing checkout session.
            </div>
          )}
          {error && <div className="state-message state-message--error" role="alert">{error}</div>}

          {!invitation ? (
            <form onSubmit={lookup} className="access-form">
              <label htmlFor="invite-code">Your private invitation code</label>
              <input
                id="invite-code"
                name="invite-code"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                placeholder="Enter the code from your invitation"
                autoComplete="off"
                required
                minLength={10}
              />
              <p className="input-hint">Use the personal code sent directly to you by the tournament director.</p>
              <button className="button button--red button--full" type="submit" disabled={loading}>
                {loading ? 'Checking invitation…' : 'Continue with invitation'} <ArrowRight size={18} />
              </button>
            </form>
          ) : invitation.status === 'registered' ? (
            <div className="confirmed-view">
              <CheckCircle2 size={46} className="confirmed-icon" />
              <h4>Registration already completed</h4>
              <p>This invitation has already been used for a paid registration.</p>
              <button type="button" className="text-action" onClick={() => { setInvitation(null); setInviteCode(''); }}>
                Use another invitation
              </button>
            </div>
          ) : (
            <form onSubmit={checkout} className="details-form">
              <div className="invitation-summary">
                <div><small>INVITED PLAYER</small><strong>{invitation.playerName}</strong></div>
                <div><small>DIVISION</small><strong>{invitation.birthYear} AA</strong></div>
                <div><small>COUNTRY TEAM</small><strong>{invitation.country}</strong></div>
                {invitation.position && <div><small>POSITION</small><strong>{invitation.position}</strong></div>}
              </div>
              <div className="form-grid">
                <div className="field field--full">
                  <label htmlFor="guardianName">Parent / guardian full name *</label>
                  <input id="guardianName" value={form.guardianName} onChange={(e) => change('guardianName', e.target.value)} required maxLength={90} autoComplete="name" />
                </div>
                <div className="field field--full">
                  <label htmlFor="guardianEmail">Parent / guardian email *</label>
                  <input id="guardianEmail" type="email" value={form.email} onChange={(e) => change('email', e.target.value)} required maxLength={180} autoComplete="email" />
                </div>
                <div className="field field--full">
                  <label htmlFor="guardianPhone">Parent / guardian phone *</label>
                  <input id="guardianPhone" type="tel" value={form.phone} onChange={(e) => change('phone', e.target.value)} required maxLength={30} autoComplete="tel" />
                </div>
                <div className="field">
                  <label htmlFor="jerseyName">Requested jersey name *</label>
                  <input id="jerseyName" value={form.jerseyName} onChange={(e) => change('jerseyName', e.target.value.toUpperCase())} placeholder="LAST NAME" required maxLength={24} />
                </div>
                <div className="field">
                  <label htmlFor="jerseyNumber">Requested number *</label>
                  <input id="jerseyNumber" type="text" inputMode="numeric" pattern="[0-9]{1,2}" value={form.jerseyNumber} onChange={(e) => change('jerseyNumber', e.target.value)} placeholder="00–99" required />
                </div>
                <div className="field">
                  <label htmlFor="jerseySize">Preferred jersey size *</label>
                  <input id="jerseySize" value={form.jerseySize} onChange={(e) => change('jerseySize', e.target.value)} placeholder="e.g. Youth L" required maxLength={30} />
                </div>
                <div className="field">
                  <label htmlFor="sockSize">Preferred sock size *</label>
                  <input id="sockSize" value={form.sockSize} onChange={(e) => change('sockSize', e.target.value)} placeholder="e.g. Youth L" required maxLength={30} />
                </div>
              </div>
              <p className="input-hint">Sizes and requested numbers are subject to supplier availability. Customized jerseys are planned for players paid by June 1, 2027.</p>
              <div className="registration-terms">
                <strong>Proposed registration terms</strong>
                <p>Payment of $425 is due in full to secure a place. Player withdrawals are nonrefundable; if Wings Arena cancels the event, registered families receive a full refund. These policies are subject to organizer confirmation before registration opens.</p>
              </div>
              <label className="check-row">
                <input type="checkbox" checked={form.termsAccepted} onChange={(e) => change('termsAccepted', e.target.checked)} required />
                <span>I have reviewed the proposed payment and cancellation terms above. *</span>
              </label>
              <label className="check-row">
                <input type="checkbox" checked={form.waiverAcknowledged} onChange={(e) => change('waiverAcknowledged', e.target.checked)} required />
                <span>I understand the organizers may require additional waivers before participation. *</span>
              </label>
              <div className="checkout-total"><span>Player registration</span><strong>$425.00</strong></div>
              <button className="button button--red button--full" type="submit" disabled={loading}>
                {loading ? 'Preparing secure checkout…' : 'Proceed to secure payment'} <ArrowRight size={18} />
              </button>
              <button type="button" className="text-action" onClick={() => { setInvitation(null); setError(''); }}>
                <ChevronRight size={15} className="rotate-back" /> Back to invite code
              </button>
            </form>
          )}
          <p className="registration-disclaimer">
            Private registration does not open until organizers complete approvals and configure secure payment processing.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const nav = [
    ['The tournament', '#about'],
    ['Four nations', '#nations'],
    ['Player experience', '#experience'],
    ['FAQ', '#faq'],
  ];

  return (
    <>
      <div className="announcement"><span className="announcement-dot" /> AUGUST 6–8, 2027 <span className="announcement-divider">/</span> STAMFORD, CONNECTICUT <span className="announcement-divider">/</span> INVITATION ONLY</div>
      <header className="site-header">
        <div className="content-width header-inner">
          <a className="header-brand" href="#top" aria-label="Four Nations Youth Games home" onClick={() => setMenuOpen(false)}>
            <img src={logo} alt="" />
            <span><strong>FUTURE STARS</strong><small>FOUR NATIONS YOUTH GAMES</small></span>
          </a>
          <nav className={menuOpen ? 'main-nav main-nav--open' : 'main-nav'} aria-label="Main navigation">
            {nav.map(([label, url]) => <a href={url} key={url} onClick={() => setMenuOpen(false)}>{label}</a>)}
            <a className="nav-register" href="#register" onClick={() => setMenuOpen(false)}>Private registration <ArrowRight size={16} /></a>
          </nav>
          <button className="mobile-menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="content-width hero-inner">
            <div className="hero-copy">
              <div className="hero-tag"><span /> THE NEXT GENERATION TAKES THE ICE</div>
              <h1>FOUR NATIONS.<br /><em>ONE STAGE.</em><br /></h1>
              <p>Eight elite youth teams. Four countries. One unforgettable weekend of competition, camaraderie, and national pride.</p>
              <div className="hero-actions">
                <a className="button button--red" href="#about">Explore the tournament <ArrowRight size={18} /></a>
                <a className="button button--outline" href="#register"><LockKeyhole size={17} /> Invited players</a>
              </div>
              <div className="hero-date"><CalendarDays size={18} /><strong>AUG 6–8, 2027</strong><span>·</span><MapPin size={18} /> WINGS ARENA · STAMFORD, CT</div>
            </div>
            <div className="hero-visual">
              <div className="hero-logo-halo" />
              <img src={logo} alt="Future Stars Four Nations Youth Games tournament logo" className="hero-logo" />
            </div>
          </div>
        </section>

        <section className="stat-bar" aria-label="Tournament at a glance">
          <div className="content-width stat-grid">
            <div><strong>04</strong><span>COUNTRIES</span></div>
            <div><strong>08</strong><span>INVITE-ONLY TEAMS</span></div>
            <div><strong>02</strong><span>AA DIVISIONS</span></div>
            <div><strong>05</strong><span>GAMES PER TEAM</span></div>
          </div>
        </section>

        <section id="about" className="about-section section-pad">
          <div className="content-width about-layout">
            <div>
              <SectionHeader eyebrow="THE TOURNAMENT" title={<>Made for the moments <span className="highlight-word">that matter.</span></>} body="A three-day celebration of elite youth hockey, built around competitive games, national-team identity, and a first-class player experience." />
              <p className="about-prose">The Future Stars Four Nations Youth Games brings together invited local AA players born in 2016 and 2017. Each division features USA, Canada, Finland, and Sweden, coached by a dedicated team coach and competing for a spot on the medal podium.</p>
              <div className="about-quickfacts"><div><Users size={22} /><span><strong>15 players per roster</strong><small>8 forwards · 5 defense · 2 goalies</small></span></div><div><MapPin size={22} /><span><strong>Wings Arena</strong><small>Stamford, Connecticut</small></span></div></div>
              <a href="#format" className="inline-link">See tournament format <ArrowRight size={18} /></a>
            </div>
            <div className="about-showcase">
              <div className="showcase-card showcase-card--one"><span className="showcase-label">DIVISION 01</span><strong>2016</strong><span>AA BIRTH YEAR</span></div>
              <div className="showcase-card showcase-card--two"><span className="showcase-label">DIVISION 02</span><strong>2017</strong><span>AA BIRTH YEAR</span></div>
              <div className="showcase-note"><Flag size={19} /><span>FOUR NATIONAL TEAMS PER DIVISION</span></div>
            </div>
          </div>
        </section>

        <section id="nations" className="nations-section section-pad">
          <div className="content-width">
            <SectionHeader eyebrow="REPRESENT YOUR COLORS" title={<>Four nations.<br />One championship dream.</>} body="Country-inspired uniforms are part of the experience. Every registered player keeps their jersey and matching hockey socks." light />
            <div className="nations-grid">
              {nations.map((nation) => (
                <article className="nation-card" key={nation.name} style={{ '--nation-accent': nation.color }}>
                  <div className="nation-image-wrap"><img src={nation.image} alt={`${nation.name} proposed youth jersey and hockey sock concept`} loading="lazy" /><span className="nation-index">{nation.number} / 04</span></div>
                  <div className="nation-card-bottom"><div><span className="nation-flag" aria-hidden="true">{nation.flag}</span><h3>{nation.name}</h3></div><small>{nation.kit}</small></div>
                </article>
              ))}
            </div>
            <p className="nations-note">Uniforms shown are concepts from the proposal; final apparel designs, sizes, and production details are subject to supplier confirmation.</p>
          </div>
        </section>

        <section id="experience" className="experience-section section-pad">
          <div className="content-width">
            <div className="experience-top"><SectionHeader eyebrow="THE FULL EXPERIENCE" title={<>More than <span className="highlight-word">a tournament.</span></>} body="A weekend players will remember long after the final buzzer." /><div className="fee-badge"><span>PROPOSED PLAYER FEE</span><strong>$425<small>/ player</small></strong><span>NO ADDED CHECKOUT FEE PLANNED</span></div></div>
            <div className="experience-grid">{experience.map((item, idx) => { const Icon = item.icon; return <article className="experience-card" key={item.title}><div className="experience-card-top"><span className="experience-icon"><Icon size={23} strokeWidth={1.9} /></span><span className="experience-number">0{idx + 1}</span></div><h3>{item.title}</h3><p>{item.text}</p></article>; })}</div>
            <div className="event-callout"><div className="callout-icon"><Award size={30} /></div><div><span>OPENING CEREMONY SPECIAL GUEST</span><strong>Jake Thibeault</strong><p>Confirmed guest speaker alongside country introductions and flags.</p></div><a href="#faq" className="callout-link">EVENT DETAILS <ArrowRight size={18} /></a></div>
          </div>
        </section>

        <section id="format" className="format-section section-pad">
          <div className="content-width format-layout">
            <div className="format-copy"><SectionHeader eyebrow="ROAD TO THE PODIUM" title={<>Every game <span>counts.</span></>} body="Each country faces every opponent in its division before the tournament moves into win-or-go-home hockey." light />
              <div className="format-legend"><div><span className="legend-swatch legend-swatch--red" /> ROUND ROBIN</div><div><span className="legend-swatch legend-swatch--blue" /> PLAYOFFS</div><div><span className="legend-swatch legend-swatch--gold" /> MEDAL GAMES</div></div>
            </div>
            <div className="format-steps"><div className="format-step"><span className="format-step-count">01</span><div><small>THE OPENING ROUNDS</small><h3>3 round-robin games</h3><p>Each country faces the other three. Tiebreakers: head-to-head, then goal differential.</p></div><ChevronDown size={19} /></div><div className="format-step"><span className="format-step-count">02</span><div><small>THE FINAL FOUR</small><h3>1 semifinal game</h3><p>First place plays fourth; second place plays third.</p></div><ChevronDown size={19} /></div><div className="format-step"><span className="format-step-count">03</span><div><small>FOR THE MEDALS</small><h3>1 medal-placement game</h3><p>Semifinal winners play for gold and silver; the other teams compete for bronze.</p></div><Trophy size={23} /></div></div>
            <div className="overtime-note"><Clock3 size={20} /><div><strong>Overtime rules</strong><p>Round robin: five minutes of 3-on-3, then a shootout. Semifinals and medal games: continuous 3-on-3 until a winner. Final playing rules remain subject to confirmation.</p></div></div>
          </div>
        </section>

        <section className="details-strip"><div className="content-width details-layout"><div><p className="eyebrow"><span className="eyebrow-line" /> THE WEEKEND</p><h2>OFF THE ICE,<br /><span>THE FUN CONTINUES.</span></h2></div><div className="details-items"><div><Check size={20} /><span>Free spectator admission</span></div><div><Check size={20} /><span>Music & outdoor games</span></div><div><Check size={20} /><span>Player of the Game awards</span></div><div><Check size={20} /><span>Medal presentations</span></div></div></div></section>

        <Registration />

        <section id="faq" className="faq-section section-pad"><div className="content-width faq-layout"><div><SectionHeader eyebrow="GOOD TO KNOW" title={<>Questions,<br /><span className="highlight-word">answered.</span></>} body="Key details for players, parents, and supporters. Final arrangements may be updated by event organizers." /></div><div className="faq-list">{faqs.map((item) => <details key={item.q}><summary>{item.q}<span className="faq-plus">+</span></summary><p>{item.a}</p></details>)}</div></div></section>

        <section className="partner-section"><div className="content-width partner-layout"><div><p className="eyebrow eyebrow--yellow"><span className="eyebrow-line" /> PARTNER WITH THE EVENT</p><h2>Put your brand<br />on the <em>big stage.</em></h2><p>Sponsorship opportunities may include website and social recognition, arena signage, PA announcements, player apparel, and a potential jersey patch.</p></div><div className="partner-cta"><div className="partner-mark"><Sparkles size={44} /></div><h3>Help shape the experience.</h3><p>Sponsorship packages and placements are being finalized.</p>{CONTACT_EMAIL ? <a className="button button--red" href={`mailto:${CONTACT_EMAIL}?subject=Four%20Nations%20Sponsorship%20Inquiry`}>Sponsorship inquiries <Mail size={18} /></a> : <span className="partner-coming">SPONSOR CONTACT DETAILS COMING SOON</span>}</div></div></section>
      </main>

      <footer className="footer"><div className="content-width footer-main"><div className="footer-brand"><img src={logo} alt="Future Stars Four Nations logo" /><div><strong>FUTURE STARS</strong><span>FOUR NATIONS YOUTH GAMES</span></div></div><div className="footer-location"><MapPin size={19} /><span>Wings Arena · Stamford, Connecticut<br />August 6–8, 2027</span></div><a href="#top" className="back-to-top">BACK TO TOP <ArrowDown size={18} /></a></div><div className="content-width footer-bottom"><span>© {new Date().getFullYear()} Future Stars Four Nations Youth Games</span><span>Invitation-only tournament · Final event details subject to organizer confirmation</span></div></footer>
    </>
  );
}
