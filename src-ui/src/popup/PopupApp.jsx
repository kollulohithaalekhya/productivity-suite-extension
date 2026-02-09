import { useEffect, useState } from "react";

export default function PopupApp() {
  const [sessions, setSessions] = useState({});
  const [notes, setNotes] = useState("");

  useEffect(() => {
    chrome.storage.local.get(["sessions", "notes"], (data) => {
      setSessions(data.sessions || {});
      setNotes(data.notes || "");
    });
  }, []);

  const saveSession = async () => {
    const name = prompt("Enter session name");
    if (!name) return;

    const tabs = await chrome.tabs.query({ currentWindow: true });
    const urls = tabs.map((t) => t.url);

    const updated = { ...sessions, [name]: urls };

    chrome.storage.local.set({ sessions: updated }, () => {
      setSessions(updated);
    });
  };

  const restoreSession = (urls) => {
    chrome.windows.create({ url: urls });
  };

  const saveNotes = () => {
    chrome.storage.local.set({ notes });
  };

  const openOptions = () => {
    chrome.runtime.openOptionsPage();
  };

  return (
    <div className="popup">
      <h2>Productivity Suite</h2>

      <button data-testid="save-session-btn" onClick={saveSession}>
        Save Current Session
      </button>

      <div data-testid="sessions-list" className="sessions">
        {Object.entries(sessions).map(([name, urls]) => (
          <div key={name} className="session-item">
            <span>{name}</span>
            <button
              data-testid={`restore-session-${name}`}
              onClick={() => restoreSession(urls)}
            >
              Restore
            </button>
          </div>
        ))}
      </div>

      <textarea
        data-testid="notes-textarea"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Write notes..."
      />

      <button data-testid="save-notes-btn" onClick={saveNotes}>
        Save Notes
      </button>

      <button data-testid="open-options-btn" onClick={openOptions}>
        Open Options
      </button>
    </div>
  );
}
