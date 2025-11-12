"use client";

import { useEffect, useMemo, useState } from "react";

type NotificationSettings = {
  emailUpdates: boolean;
  smsAlerts: boolean;
  weeklyDigest: boolean;
  productAnnouncements: boolean;
};

type PrivacySettings = {
  locationSharing: boolean;
  personalizedRecommendations: boolean;
  shareActivity: boolean;
};

type AccountSettings = {
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  timezone: string;
  autoSignOutMinutes: number;
};

const DEFAULT_SETTINGS: AccountSettings = {
  notifications: {
    emailUpdates: true,
    smsAlerts: false,
    weeklyDigest: true,
    productAnnouncements: true,
  },
  privacy: {
    locationSharing: true,
    personalizedRecommendations: true,
    shareActivity: false,
  },
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone ?? "UTC",
  autoSignOutMinutes: 30,
};

const STORAGE_KEY = "lokalista-account-settings";

type ToggleProps = {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
};

function Toggle({ label, description, checked, onChange }: ToggleProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-ai bg-ai-surface px-4 py-3 shadow-sm">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        {description ? <p className="text-xs text-ai-muted mt-1">{description}</p> : null}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`w-12 h-6 rounded-full transition-colors relative ${
          checked ? "bg-gradient-to-r from-fuchsia-500 to-violet-600" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-[3px] left-[3px] h-4 w-4 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

export default function AccountSettingsPage() {
  const [settings, setSettings] = useState<AccountSettings>(DEFAULT_SETTINGS);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as AccountSettings;
        setSettings({
          ...DEFAULT_SETTINGS,
          ...parsed,
          notifications: { ...DEFAULT_SETTINGS.notifications, ...parsed.notifications },
          privacy: { ...DEFAULT_SETTINGS.privacy, ...parsed.privacy },
        });
      }
    } catch (error) {
      console.warn("Failed to parse stored account settings:", error);
    }
  }, []);

  const timezoneOptions = useMemo(() => {
    try {
      return Intl.supportedValuesOf("timeZone");
    } catch {
      return ["UTC", "Asia/Manila", "America/New_York", "Europe/London"];
    }
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      setMessage("Settings saved successfully!");
      setTimeout(() => setMessage(null), 2500);
    } catch (error) {
      console.error("Failed to persist settings:", error);
      setMessage("Something went wrong saving your settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
    setMessage("Settings reset to defaults. Remember to save to keep the changes.");
    setTimeout(() => setMessage(null), 2500);
  };

  return (
    <div className="ai-assistant-bg">
      <div className="container py-10">
        <div className="max-w-3xl mx-auto space-y-8">
          <header className="bg-ai-card border border-ai shadow-ai rounded-2xl p-6 md:p-8 text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-8 w-8 rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-600 grid place-items-center text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M12 21s7-4.5 7-10a7 7 0 10-14 0c0 5.5 7 10 7 10z" stroke="currentColor" strokeWidth="1.6" />
                  <circle cx="12" cy="11" r="2" fill="currentColor" />
                </svg>
              </span>
              <span className="text-lg font-semibold bg-gradient-to-r from-fuchsia-500 to-violet-600 bg-clip-text text-transparent">
                Lokalista
              </span>
            </div>
            <h1 className="text-2xl font-semibold text-foreground mb-2">Account Settings</h1>
            <p className="text-ai-muted max-w-2xl mx-auto">
              Manage how Lokalista communicates with you and tailor your privacy preferences. Actual data syncing will
              arrive soon — for now settings are saved locally in your browser.
            </p>
          </header>

          <section className="bg-ai-card border border-ai shadow-ai rounded-2xl p-6 md:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-1">Notifications</h2>
              <p className="text-ai-muted text-sm mb-4">
                Choose how you’d like to hear from us about latest discoveries, reminders, and account updates.
              </p>
              <div className="space-y-3">
                <Toggle
                  label="Email recommendations"
                  description="Get curated lists of trending restos and cafes every Friday."
                  checked={settings.notifications.emailUpdates}
                  onChange={(value) =>
                    setSettings((prev) => ({
                      ...prev,
                      notifications: { ...prev.notifications, emailUpdates: value },
                    }))
                  }
                />
                <Toggle
                  label="SMS alerts"
                  description="Receive urgent updates (e.g. reservation reminders)."
                  checked={settings.notifications.smsAlerts}
                  onChange={(value) =>
                    setSettings((prev) => ({
                      ...prev,
                      notifications: { ...prev.notifications, smsAlerts: value },
                    }))
                  }
                />
                <Toggle
                  label="Weekly digest"
                  description="Summary of the hottest places and events near you."
                  checked={settings.notifications.weeklyDigest}
                  onChange={(value) =>
                    setSettings((prev) => ({
                      ...prev,
                      notifications: { ...prev.notifications, weeklyDigest: value },
                    }))
                  }
                />
                <Toggle
                  label="Product announcements"
                  description="Be first to know about new Lokalista features and beta invites."
                  checked={settings.notifications.productAnnouncements}
                  onChange={(value) =>
                    setSettings((prev) => ({
                      ...prev,
                      notifications: { ...prev.notifications, productAnnouncements: value },
                    }))
                  }
                />
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground mb-1">Session & security</h2>
              <div className="rounded-xl border border-ai bg-ai-surface px-4 py-3 shadow-sm">
                <label className="block text-sm font-medium text-ai-muted mb-2" htmlFor="timezone">
                  Preferred time zone
                </label>
                <select
                  id="timezone"
                  value={settings.timezone}
                  onChange={(event) =>
                    setSettings((prev) => ({
                      ...prev,
                      timezone: event.target.value,
                    }))
                  }
                  className="w-full h-11 px-3 rounded-md border border-ai focus-ring bg-transparent text-foreground"
                >
                  {timezoneOptions.map((zone) => (
                    <option key={zone} value={zone}>
                      {zone}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-ai-muted mt-1">Used for scheduling reminders and daily digests.</p>
              </div>

              <div className="rounded-xl border border-ai bg-ai-surface px-4 py-3 shadow-sm">
                <label className="block text-sm font-medium text-ai-muted mb-2" htmlFor="autoSignOut">
                  Auto sign-out
                </label>
                <input
                  id="autoSignOut"
                  type="number"
                  min={5}
                  max={240}
                  value={settings.autoSignOutMinutes}
                  onChange={(event) =>
                    setSettings((prev) => ({
                      ...prev,
                      autoSignOutMinutes: Number(event.target.value),
                    }))
                  }
                  className="w-full h-11 px-3 rounded-md border border-ai focus-ring bg-transparent text-foreground"
                />
                <p className="text-xs text-ai-muted mt-1">
                  Automatically log out after inactivity (minutes). Great for shared devices.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-ai-card border border-ai shadow-ai rounded-2xl p-6 md:p-8 space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-1">Privacy controls</h2>
              <p className="text-ai-muted text-sm mb-4">
                Lokalista personalizes recommendations with your consent. You’re always in control.
              </p>
            </div>
            <div className="space-y-3">
              <Toggle
                label="Share approximate location"
                description="Improve suggestions by using your city or neighborhood."
                checked={settings.privacy.locationSharing}
                onChange={(value) =>
                  setSettings((prev) => ({
                    ...prev,
                    privacy: { ...prev.privacy, locationSharing: value },
                  }))
                }
              />
              <Toggle
                label="Personalized AI picks"
                description="Lokalista learns from your favorites to surface better matches."
                checked={settings.privacy.personalizedRecommendations}
                onChange={(value) =>
                  setSettings((prev) => ({
                    ...prev,
                    privacy: { ...prev.privacy, personalizedRecommendations: value },
                  }))
                }
              />
              <Toggle
                label="Share activity with friends"
                description="Allow friends to see which restaurants you bookmarked or reviewed."
                checked={settings.privacy.shareActivity}
                onChange={(value) =>
                  setSettings((prev) => ({
                    ...prev,
                    privacy: { ...prev.privacy, shareActivity: value },
                  }))
                }
              />
            </div>
          </section>

          <footer className="bg-ai-card border border-ai shadow-ai rounded-2xl p-6 md:p-8 space-y-4 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="text-sm text-ai-muted">
                Settings are stored locally for now. Cloud sync will be enabled once the secure preferences API is
                available.
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 rounded-md border border-ai hover:bg-ai-muted text-ai-muted transition"
                  disabled={saving}
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="px-5 py-2 rounded-md bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white hover:opacity-90 disabled:opacity-60 transition flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving…
                    </>
                  ) : (
                    "Save changes"
                  )}
                </button>
              </div>
            </div>
            {message ? (
              <div
                className={`text-sm px-4 py-3 rounded-md border ${
                  message.includes("successfully")
                    ? "bg-green-50/80 border-green-200 text-green-700 dark:text-green-100"
                    : "bg-amber-50/80 border-amber-200 text-amber-700 dark:text-amber-100"
                }`}
              >
                {message}
              </div>
            ) : null}
          </footer>
        </div>
      </div>
    </div>
  );
}

