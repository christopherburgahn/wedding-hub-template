import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import { CalendarDays, CheckCircle2, Database, Heart, Loader2, Lock, MapPin, Music, Users } from "lucide-react";
import { Guest, isSupabaseConfigured, supabase } from "./lib/supabase";
import { copy, eventDetails, Language, sampleGuests } from "./lib/templateData";

type RsvpForm = {
  first_name: string;
  last_name: string;
  email: string;
  attending: string;
  dietary_notes: string;
  travel_notes: string;
  song_request: string;
};

const emptyForm: RsvpForm = {
  first_name: "",
  last_name: "",
  email: "",
  attending: "true",
  dietary_notes: "",
  travel_notes: "",
  song_request: "",
};

function App() {
  const [language, setLanguage] = useState<Language>("en");
  const text = copy[language];

  return (
    <div className="app-shell">
      <header className="site-header">
        <Link to="/" className="brand">
          <Heart aria-hidden="true" />
          <span>Wedding Hub</span>
        </Link>
        <nav className="nav-links" aria-label="Primary navigation">
          <NavLink to="/">{text.navHome}</NavLink>
          <NavLink to="/register">{text.navRsvp}</NavLink>
          <NavLink to="/anreise">{text.navTravel}</NavLink>
          <NavLink to="/uebernachtung">{text.navStay}</NavLink>
          <NavLink to="/aktivitaeten">{text.navActivities}</NavLink>
          <NavLink to="/admin">{text.navAdmin}</NavLink>
        </nav>
        <button className="language-button" onClick={() => setLanguage(language === "en" ? "de" : "en")}>
          {language === "en" ? "DE" : "EN"}
        </button>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home language={language} />} />
          <Route path="/register" element={<Register language={language} />} />
          <Route path="/auth" element={<Auth language={language} />} />
          <Route path="/admin" element={<Admin language={language} />} />
          <Route path="/anreise" element={<InfoPage kind="travel" language={language} />} />
          <Route path="/uebernachtung" element={<InfoPage kind="stay" language={language} />} />
          <Route path="/aktivitaeten" element={<InfoPage kind="activities" language={language} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

function Home({ language }: { language: Language }) {
  const text = copy[language];
  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">{text.heroEyebrow}</p>
          <h1>{text.heroTitle}</h1>
          <p>{text.heroText}</p>
          <div className="hero-actions">
            <Link to="/register" className="button primary">{text.ctaRsvp}</Link>
            <a href="#setup" className="button secondary">{text.ctaSetup}</a>
          </div>
        </div>
        <div className="hero-panel" aria-label="Event summary">
          <EventFact icon={<CalendarDays />} label={text.dateLabel} value={eventDetails.date} />
          <EventFact icon={<MapPin />} label={text.venueLabel} value={`${eventDetails.venue}, ${eventDetails.city}`} />
          <EventFact icon={<CheckCircle2 />} label={text.deadlineLabel} value={eventDetails.rsvpDeadline} />
        </div>
      </section>

      <section className="content-band">
        <div className="feature-grid">
          <Feature icon={<Users />} title="Guest workflow" body="Collect RSVPs, dietary notes, travel needs, and song requests." />
          <Feature icon={<Database />} title="Supabase ready" body="Use the included schema, RLS policies, and seed data for your own project." />
          <Feature icon={<Lock />} title="Privacy first" body="The template ships without private media, real guest data, or hardcoded secrets." />
        </div>
      </section>

      <section id="setup" className="setup-section">
        <h2>Setup path</h2>
        <ol>
          <li>Customize `src/lib/templateData.ts` with your couple, venue, date, and copy.</li>
          <li>Create a Supabase project and run the migration in `supabase/migrations`.</li>
          <li>Copy `.env.example` to `.env.local` and add your own project URL and anon key.</li>
          <li>Run `npm run build`, then deploy the `dist` folder to your static host.</li>
        </ol>
      </section>
    </>
  );
}

function Register({ language }: { language: Language }) {
  const text = copy[language];
  const [form, setForm] = useState<RsvpForm>(emptyForm);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [message, setMessage] = useState("");

  const update = (field: keyof RsvpForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus("saving");
    setMessage("");

    if (!supabase) {
      setStatus("saved");
      setMessage("Demo RSVP captured locally. Configure Supabase to save real guest responses.");
      setForm(emptyForm);
      return;
    }

    const { error } = await supabase.from("guests").insert({
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email || null,
      attending: form.attending === "true",
      dietary_notes: form.dietary_notes || null,
      travel_notes: form.travel_notes || null,
      song_request: form.song_request || null,
    });

    if (error) {
      setStatus("error");
      setMessage(error.message);
      return;
    }

    setStatus("saved");
    setMessage("Thanks. Your RSVP has been saved.");
    setForm(emptyForm);
  };

  return (
    <section className="page-section narrow">
      <ModePill />
      <h1>{text.registerTitle}</h1>
      <p>{text.registerIntro}</p>
      <form className="form-card" onSubmit={submit}>
        <div className="two-column">
          <label>
            First name
            <input required value={form.first_name} onChange={(event) => update("first_name", event.target.value)} />
          </label>
          <label>
            Last name
            <input required value={form.last_name} onChange={(event) => update("last_name", event.target.value)} />
          </label>
        </div>
        <label>
          Email
          <input type="email" value={form.email} onChange={(event) => update("email", event.target.value)} />
        </label>
        <label>
          Attendance
          <select value={form.attending} onChange={(event) => update("attending", event.target.value)}>
            <option value="true">Will attend</option>
            <option value="false">Cannot attend</option>
          </select>
        </label>
        <label>
          Dietary notes
          <textarea value={form.dietary_notes} onChange={(event) => update("dietary_notes", event.target.value)} />
        </label>
        <label>
          Travel notes
          <textarea value={form.travel_notes} onChange={(event) => update("travel_notes", event.target.value)} />
        </label>
        <label>
          Song request
          <input value={form.song_request} onChange={(event) => update("song_request", event.target.value)} />
        </label>
        <button className="button primary" disabled={status === "saving"}>
          {status === "saving" && <Loader2 className="spin" aria-hidden="true" />}
          Submit RSVP
        </button>
        {message && <p className={`status ${status}`}>{message}</p>}
      </form>
    </section>
  );
}

function Auth({ language }: { language: Language }) {
  const text = copy[language];
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setMessage("");

    if (!supabase) {
      setMessage("Configure Supabase before signing in.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    navigate("/admin");
  };

  return (
    <section className="page-section narrow">
      <ModePill />
      <h1>{text.navAdmin} sign in</h1>
      <form className="form-card" onSubmit={submit}>
        <label>
          Email
          <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <label>
          Password
          <input type="password" required value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <button className="button primary" disabled={loading}>
          {loading && <Loader2 className="spin" aria-hidden="true" />}
          Sign in
        </button>
        {message && <p className="status error">{message}</p>}
      </form>
    </section>
  );
}

function Admin({ language }: { language: Language }) {
  const text = copy[language];
  const [guests, setGuests] = useState<Guest[]>(isSupabaseConfigured ? [] : sampleGuests);
  const [loading, setLoading] = useState(Boolean(supabase));
  const [message, setMessage] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(!supabase);
  const [isAdmin, setIsAdmin] = useState(!supabase);

  useEffect(() => {
    async function loadGuests() {
      if (!supabase) return;

      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user.id;
      setIsSignedIn(Boolean(userId));

      if (!userId) {
        setLoading(false);
        return;
      }

      const { data: role } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();

      if (!role) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      setIsAdmin(true);
      const { data, error } = await supabase
        .from("guests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        setMessage(error.message);
      } else {
        setGuests(data ?? []);
      }

      setLoading(false);
    }

    loadGuests();
  }, []);

  const attendingCount = useMemo(
    () => guests.filter((guest) => guest.attending).length,
    [guests],
  );

  if (!isSignedIn) {
    return (
      <section className="page-section narrow">
        <ModePill />
        <h1>{text.adminTitle}</h1>
        <p>Sign in to review guest responses.</p>
        <Link className="button primary" to="/auth">Go to sign in</Link>
      </section>
    );
  }

  if (!isAdmin) {
    return (
      <section className="page-section narrow">
        <ModePill />
        <h1>{text.adminTitle}</h1>
        <p>Your user is signed in but does not have the `admin` role.</p>
      </section>
    );
  }

  return (
    <section className="page-section">
      <ModePill />
      <div className="page-heading">
        <div>
          <h1>{text.adminTitle}</h1>
          <p>Review RSVPs and guest notes.</p>
        </div>
        <div className="summary-card">
          <strong>{attendingCount}</strong>
          <span>attending</span>
        </div>
      </div>
      {loading && <p>Loading guests...</p>}
      {message && <p className="status error">{message}</p>}
      <div className="guest-table" role="table">
        <div className="guest-row guest-head" role="row">
          <span>Name</span>
          <span>Status</span>
          <span>Dietary</span>
          <span>Travel</span>
          <span>Song</span>
        </div>
        {guests.map((guest) => (
          <div className="guest-row" role="row" key={guest.id}>
            <span>{guest.first_name} {guest.last_name}</span>
            <span>{guest.attending ? "Attending" : "Not attending"}</span>
            <span>{guest.dietary_notes || "-"}</span>
            <span>{guest.travel_notes || "-"}</span>
            <span>{guest.song_request || "-"}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function InfoPage({ kind, language }: { kind: "travel" | "stay" | "activities"; language: Language }) {
  const details = {
    travel: {
      title: language === "en" ? "Travel" : "Anreise",
      icon: <MapPin />,
      body: "Add directions, public transit options, shuttle plans, parking information, and useful arrival times.",
    },
    stay: {
      title: language === "en" ? "Accommodation" : "Uebernachtung",
      icon: <CalendarDays />,
      body: "Share hotel blocks, room options, check-in details, nearby alternatives, and accessibility notes.",
    },
    activities: {
      title: language === "en" ? "Activities" : "Aktivitaeten",
      icon: <Music />,
      body: "Collect optional activities, brunch plans, local recommendations, and wedding-weekend extras.",
    },
  }[kind];

  return (
    <section className="page-section narrow">
      <div className="icon-heading">{details.icon}</div>
      <h1>{details.title}</h1>
      <p>{details.body}</p>
      <div className="info-list">
        <p><strong>Template note:</strong> Replace this placeholder copy with your own event details.</p>
        <p>Keep public information here. Put private guest-specific details behind authentication.</p>
      </div>
    </section>
  );
}

function EventFact({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="event-fact">
      {icon}
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

function Feature({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <article className="feature">
      <div className="feature-icon">{icon}</div>
      <h2>{title}</h2>
      <p>{body}</p>
    </article>
  );
}

function ModePill() {
  return (
    <p className="mode-pill">
      {isSupabaseConfigured ? "Supabase connected" : "Demo mode"}
    </p>
  );
}

function NotFound() {
  return (
    <section className="page-section narrow">
      <h1>Page not found</h1>
      <p>This route is not part of the template.</p>
      <Link className="button primary" to="/">Return home</Link>
    </section>
  );
}

export default App;
