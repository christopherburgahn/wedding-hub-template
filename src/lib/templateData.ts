export const eventDetails = {
  coupleNames: "Alex & Sam",
  date: "Saturday, 20 June 2026",
  ceremonyTime: "15:00",
  venue: "The Greenhouse",
  city: "Sample City",
  rsvpDeadline: "1 May 2026",
};

export const sampleGuests = [
  {
    id: "sample-1",
    first_name: "Taylor",
    last_name: "River",
    email: null,
    attending: true,
    dietary_notes: "Vegetarian",
    travel_notes: "Needs shuttle info",
    song_request: "A favorite dance song",
    created_at: new Date().toISOString(),
  },
  {
    id: "sample-2",
    first_name: "Jordan",
    last_name: "Stone",
    email: null,
    attending: false,
    dietary_notes: null,
    travel_notes: null,
    song_request: null,
    created_at: new Date().toISOString(),
  },
];

export const copy = {
  en: {
    navHome: "Home",
    navRsvp: "RSVP",
    navTravel: "Travel",
    navStay: "Stay",
    navActivities: "Activities",
    navAdmin: "Admin",
    heroEyebrow: "Wedding Hub Template",
    heroTitle: "A calm place for guests to RSVP and find every detail.",
    heroText:
      "Customize the couple, schedule, travel notes, and guest workflow. Connect Supabase when you are ready to collect real RSVPs.",
    ctaRsvp: "Open RSVP",
    ctaSetup: "View setup",
    dateLabel: "Date",
    venueLabel: "Venue",
    deadlineLabel: "RSVP deadline",
    registerTitle: "Guest RSVP",
    registerIntro: "Collect names, attendance, dietary notes, travel notes, and a song request.",
    adminTitle: "Guest Admin",
    demoMode: "Demo mode",
    configuredMode: "Supabase connected",
  },
  de: {
    navHome: "Start",
    navRsvp: "Rueckmeldung",
    navTravel: "Anreise",
    navStay: "Uebernachtung",
    navActivities: "Aktivitaeten",
    navAdmin: "Admin",
    heroEyebrow: "Wedding Hub Vorlage",
    heroTitle: "Ein ruhiger Ort fuer Rueckmeldungen und alle wichtigen Infos.",
    heroText:
      "Passe Paar, Ablauf, Reiseinfos und Gaesteprozess an. Verbinde Supabase, sobald echte Rueckmeldungen gesammelt werden sollen.",
    ctaRsvp: "Rueckmeldung oeffnen",
    ctaSetup: "Setup ansehen",
    dateLabel: "Datum",
    venueLabel: "Ort",
    deadlineLabel: "Rueckmeldefrist",
    registerTitle: "Rueckmeldung",
    registerIntro: "Sammle Namen, Teilnahme, Essensnotizen, Reiseinfos und Musikwunsch.",
    adminTitle: "Gaeste Admin",
    demoMode: "Demo-Modus",
    configuredMode: "Supabase verbunden",
  },
};

export type Language = keyof typeof copy;
