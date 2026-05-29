import { useState } from "react";
import PageHeader from "../components/PageHeader";

type SettingsSection =
  | "General"
  | "Profile"
  | "Appearance"
  | "Notifications"
  | "Personalization"
  | "Data & Backup"
  | "Cloud Sync";

type AppTheme = "Light" | "Dark" | "System";
type SidebarStyle = "Comfortable" | "Compact" | "Expanded";
type ReminderTone = "Friendly" | "Strict" | "Motivational" | "Minimal" | "Funny";

const settingsSections: SettingsSection[] = [
  "General",
  "Profile",
  "Appearance",
  "Notifications",
  "Personalization",
  "Data & Backup",
  "Cloud Sync",
];

const accentColors = [
  { name: "Blue", value: "#2563EB", className: "bg-blue-600" },
  { name: "Green", value: "#16A34A", className: "bg-green-600" },
  { name: "Violet", value: "#7C3AED", className: "bg-violet-600" },
  { name: "Rose", value: "#E11D48", className: "bg-rose-600" },
  { name: "Slate", value: "#334155", className: "bg-slate-700" },
];

function Settings() {
  const [selectedSection, setSelectedSection] = useState<SettingsSection>("General");
  const [theme, setTheme] = useState<AppTheme>("System");
  const [launchAtLogin, setLaunchAtLogin] = useState(false);
  const [language, setLanguage] = useState("English");
  const [name, setName] = useState("Sanjeeb Bhattarai");
  const [email, setEmail] = useState("sanjeeb@example.com");
  const [role, setRole] = useState("Personal development");
  const [compactMode, setCompactMode] = useState(false);
  const [sidebarStyle, setSidebarStyle] = useState<SidebarStyle>("Comfortable");
  const [accentColor, setAccentColor] = useState("#2563EB");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [dailyCheckInTime, setDailyCheckInTime] = useState("21:00");
  const [habitReminderTime, setHabitReminderTime] = useState("07:00");
  const [quietStart, setQuietStart] = useState("22:30");
  const [quietEnd, setQuietEnd] = useState("07:00");
  const [weekendReminders, setWeekendReminders] = useState(false);
  const [reminderTone, setReminderTone] = useState<ReminderTone>("Friendly");
  const [customReminderMessage, setCustomReminderMessage] = useState(
    "Small progress still counts. Take the next useful step.",
  );
  const [dailyMotivationMessage, setDailyMotivationMessage] = useState(
    "Stay consistent today and make tomorrow easier.",
  );

  return (
    <div>
      <PageHeader title="Settings" description="Adjust PersonalCore to match how you work." />

      <div className="grid min-h-[620px] gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
          <nav className="space-y-1">
            {settingsSections.map((section) => (
              <button
                key={section}
                type="button"
                onClick={() => setSelectedSection(section)}
                className={`w-full rounded-lg px-4 py-3 text-left text-sm font-semibold transition ${
                  selectedSection === section
                    ? "bg-blue-50 text-core-accent"
                    : "text-core-muted hover:bg-slate-50 hover:text-core-ink"
                }`}
              >
                {section}
              </button>
            ))}
          </nav>
        </aside>

        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="border-b border-slate-100 pb-5">
            <h2 className="text-2xl font-bold text-core-ink">{selectedSection}</h2>
            <p className="mt-2 text-sm leading-6 text-core-muted">
              {getSectionDescription(selectedSection)}
            </p>
          </div>

          <div className="mt-6">
            {selectedSection === "General" && (
              <div className="grid gap-4">
                <SettingsCard title="App Theme" description="Choose how PersonalCore should look.">
                  <SegmentedOptions
                    options={["Light", "Dark", "System"]}
                    selected={theme}
                    onSelect={(value) => setTheme(value as AppTheme)}
                  />
                </SettingsCard>

                <SettingsCard
                  title="Launch at Login"
                  description="Open PersonalCore automatically when your desktop starts."
                >
                  <Toggle checked={launchAtLogin} onChange={setLaunchAtLogin} />
                </SettingsCard>

                <SettingsCard title="Language" description="Choose the app display language.">
                  <select
                    value={language}
                    onChange={(event) => setLanguage(event.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-core-accent focus:ring-2 focus:ring-blue-100 sm:w-64"
                  >
                    <option>English</option>
                    <option>Nepali</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </SettingsCard>
              </div>
            )}

            {selectedSection === "Profile" && (
              <div className="max-w-2xl rounded-lg border border-slate-200 bg-slate-50 p-5">
                <div className="grid gap-4">
                  <TextField label="Name" value={name} onChange={setName} />
                  <TextField label="Email" value={email} onChange={setEmail} type="email" />
                  <TextField label="Role or focus" value={role} onChange={setRole} />
                </div>
                <button
                  type="button"
                  className="mt-5 rounded-lg bg-core-accent px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                  Save Profile
                </button>
              </div>
            )}

            {selectedSection === "Appearance" && (
              <div className="grid gap-4">
                <SettingsCard title="Theme Selector" description="Set the preferred visual theme.">
                  <SegmentedOptions
                    options={["Light", "Dark", "System"]}
                    selected={theme}
                    onSelect={(value) => setTheme(value as AppTheme)}
                  />
                </SettingsCard>

                <SettingsCard
                  title="Compact Mode"
                  description="Use tighter spacing for denser dashboard views."
                >
                  <Toggle checked={compactMode} onChange={setCompactMode} />
                </SettingsCard>

                <SettingsCard title="Sidebar Style" description="Control the app sidebar density.">
                  <SegmentedOptions
                    options={["Comfortable", "Compact", "Expanded"]}
                    selected={sidebarStyle}
                    onSelect={(value) => setSidebarStyle(value as SidebarStyle)}
                  />
                </SettingsCard>

                <SettingsCard title="Accent Color" description="Pick a simple highlight color.">
                  <div className="flex flex-wrap gap-3">
                    {accentColors.map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => setAccentColor(color.value)}
                        className={`h-9 w-9 rounded-full border-4 transition ${color.className} ${
                          accentColor === color.value
                            ? "border-slate-900"
                            : "border-white shadow ring-1 ring-slate-200"
                        }`}
                        aria-label={color.name}
                      />
                    ))}
                  </div>
                </SettingsCard>
              </div>
            )}

            {selectedSection === "Notifications" && (
              <div className="grid gap-4">
                <SettingsCard
                  title="Enable Notifications"
                  description="Turn local reminder alerts on or off."
                >
                  <Toggle checked={notificationsEnabled} onChange={setNotificationsEnabled} />
                </SettingsCard>

                <div className="grid gap-4 md:grid-cols-2">
                  <TimeCard
                    label="Daily check-in reminder time"
                    value={dailyCheckInTime}
                    onChange={setDailyCheckInTime}
                  />
                  <TimeCard
                    label="Habit reminder time"
                    value={habitReminderTime}
                    onChange={setHabitReminderTime}
                  />
                  <TimeCard label="Quiet hours start" value={quietStart} onChange={setQuietStart} />
                  <TimeCard label="Quiet hours end" value={quietEnd} onChange={setQuietEnd} />
                </div>

                <SettingsCard
                  title="Weekend Reminders"
                  description="Keep reminders active on Saturday and Sunday."
                >
                  <Toggle checked={weekendReminders} onChange={setWeekendReminders} />
                </SettingsCard>
              </div>
            )}

            {selectedSection === "Personalization" && (
              <div className="grid gap-4">
                <SettingsCard
                  title="Reminder Tone"
                  description="Choose how reminder copy should feel."
                >
                  <SegmentedOptions
                    options={["Friendly", "Strict", "Motivational", "Minimal", "Funny"]}
                    selected={reminderTone}
                    onSelect={(value) => setReminderTone(value as ReminderTone)}
                  />
                </SettingsCard>

                <TextareaField
                  label="Custom reminder message"
                  value={customReminderMessage}
                  onChange={setCustomReminderMessage}
                />
                <TextareaField
                  label="Daily motivation message"
                  value={dailyMotivationMessage}
                  onChange={setDailyMotivationMessage}
                />
              </div>
            )}

            {selectedSection === "Data & Backup" && (
              <div className="grid gap-4">
                <div className="grid gap-3 sm:grid-cols-3">
                  <ActionButton label="Export data" />
                  <ActionButton label="Import data" />
                  <button
                    type="button"
                    className="rounded-lg border border-red-100 bg-white px-4 py-3 text-sm font-semibold text-red-600 transition hover:border-red-200 hover:bg-red-50"
                  >
                    Clear local data
                  </button>
                </div>

                <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-core-muted">
                    Backup status
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-core-ink">Local only</h3>
                  <p className="mt-2 text-sm leading-6 text-core-muted">
                    Your settings are currently stored in local component state for the prototype.
                    Real import, export, and backups can be wired later.
                  </p>
                </div>
              </div>
            )}

            {selectedSection === "Cloud Sync" && (
              <div className="max-w-2xl rounded-lg border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-core-accent">
                  Supabase sync placeholder
                </p>
                <h3 className="mt-3 text-2xl font-bold text-core-ink">Not connected</h3>
                <p className="mt-3 text-sm leading-6 text-core-muted">
                  Cloud Sync will connect PersonalCore to Supabase later. This screen is only a UI
                  placeholder for now.
                </p>

                <div className="mt-5 grid gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-core-muted">Sync status</span>
                    <span className="font-semibold text-slate-500">Not connected</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-core-muted">Last synced</span>
                    <span className="font-semibold text-slate-500">Never</span>
                  </div>
                </div>

                <button
                  type="button"
                  disabled
                  className="mt-5 rounded-lg bg-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-500"
                >
                  Connect Supabase
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

type SettingsCardProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

function SettingsCard({ title, description, children }: SettingsCardProps) {
  return (
    <div className="grid gap-4 rounded-lg border border-slate-200 bg-slate-50 p-5 md:grid-cols-[1fr_auto] md:items-center">
      <div>
        <h3 className="text-base font-semibold text-core-ink">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-core-muted">{description}</p>
      </div>
      <div>{children}</div>
    </div>
  );
}

type SegmentedOptionsProps = {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
};

function SegmentedOptions({ options, selected, onSelect }: SegmentedOptionsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onSelect(option)}
          className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
            selected === option
              ? "border-core-accent bg-blue-50 text-core-accent"
              : "border-slate-200 bg-white text-core-muted hover:border-core-accent hover:text-core-accent"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

type ToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex h-7 w-12 items-center rounded-full p-1 transition ${
        checked ? "bg-core-accent" : "bg-slate-300"
      }`}
    >
      <span
        className={`h-5 w-5 rounded-full bg-white shadow transition ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

type TextFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
};

function TextField({ label, value, onChange, type = "text" }: TextFieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-core-muted">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-core-accent focus:ring-2 focus:ring-blue-100"
      />
    </label>
  );
}

type TimeCardProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

function TimeCard({ label, value, onChange }: TimeCardProps) {
  return (
    <label className="rounded-lg border border-slate-200 bg-slate-50 p-5">
      <span className="text-sm font-semibold text-core-ink">{label}</span>
      <input
        type="time"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-3 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-core-accent focus:ring-2 focus:ring-blue-100"
      />
    </label>
  );
}

type TextareaFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

function TextareaField({ label, value, onChange }: TextareaFieldProps) {
  return (
    <label className="block rounded-lg border border-slate-200 bg-slate-50 p-5">
      <span className="text-sm font-semibold text-core-ink">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-3 min-h-28 w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm leading-6 outline-none transition focus:border-core-accent focus:ring-2 focus:ring-blue-100"
      />
    </label>
  );
}

type ActionButtonProps = {
  label: string;
};

function ActionButton({ label }: ActionButtonProps) {
  return (
    <button
      type="button"
      className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-core-muted transition hover:border-slate-300 hover:text-core-ink"
    >
      {label}
    </button>
  );
}

function getSectionDescription(section: SettingsSection) {
  switch (section) {
    case "General":
      return "Set core app behavior and language preferences.";
    case "Profile":
      return "Keep your basic identity and focus area available for personalization.";
    case "Appearance":
      return "Tune the visual density, theme, and accent color.";
    case "Notifications":
      return "Prepare reminder preferences before native notifications are connected.";
    case "Personalization":
      return "Shape the tone and messages PersonalCore uses in your workflow.";
    case "Data & Backup":
      return "Manage local data actions and backup readiness.";
    case "Cloud Sync":
      return "A future home for Supabase connection and sync status.";
  }
}

export default Settings;
