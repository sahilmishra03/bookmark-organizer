export default function SettingsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">Settings</h1>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">Manage your account and preferences</p>

      <div className="flex flex-col gap-4 max-w-lg">
        {[
          { label: "Account", desc: "Manage your profile and email" },
          { label: "Appearance", desc: "Theme and display preferences" },
          { label: "Integrations", desc: "Connect external services" },
          { label: "Danger Zone", desc: "Delete account or export data" },
        ].map(({ label, desc }) => (
          <div key={label} className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-5 bg-white dark:bg-neutral-900 flex items-center justify-between cursor-pointer hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
            <div>
              <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{label}</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">{desc}</p>
            </div>
            <span className="text-neutral-400">→</span>
          </div>
        ))}
      </div>
    </div>
  )
}
