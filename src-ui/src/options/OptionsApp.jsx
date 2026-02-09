import { useEffect, useState } from "react";

export default function OptionsApp() {
  const [hostname, setHostname] = useState("");
  const [blockedSites, setBlockedSites] = useState([]);

  useEffect(() => {
    chrome.storage.sync.get(["blockedSites"], (data) => {
      setBlockedSites(data.blockedSites || []);
    });
  }, []);

  const addBlockedSite = () => {
    if (!hostname) return;

    const updated = [...blockedSites, hostname];

    chrome.storage.sync.set({ blockedSites: updated }, () => {
      setBlockedSites(updated);
      setHostname("");
    });
  };

  const exportData = () => {
    chrome.storage.local.get(["sessions", "notes"], (localData) => {
      chrome.storage.sync.get(["blockedSites"], (syncData) => {
        const exportObject = {
          sessions: localData.sessions || {},
          notes: localData.notes || "",
          blockedSites: syncData.blockedSites || [],
        };

        const blob = new Blob(
          [JSON.stringify(exportObject, null, 2)],
          { type: "application/json" }
        );

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "productivity_suite_export.json";
        a.click();

        URL.revokeObjectURL(url);
      });
    });
  };

  return (
    <div className="options">
      <h2>Website Blocker Settings</h2>

      <input
        data-testid="block-hostname-input"
        type="text"
        placeholder="Enter hostname (e.g., facebook.com)"
        value={hostname}
        onChange={(e) => setHostname(e.target.value)}
      />

      <button data-testid="add-block-btn" onClick={addBlockedSite}>
        Add to Blocklist
      </button>

      <ul data-testid="blocked-sites-list">
        {blockedSites.map((site, i) => (
          <li key={i}>{site}</li>
        ))}
      </ul>

      <button data-testid="export-data-btn" onClick={exportData}>
        Export All Data
      </button>
    </div>
  );
}
