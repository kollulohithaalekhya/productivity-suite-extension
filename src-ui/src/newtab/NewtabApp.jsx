import { useEffect, useState } from "react";

export default function NewtabApp() {
  const [notes, setNotes] = useState("");
  const [sessions, setSessions] = useState({});

  useEffect(() => {
    chrome.storage.local.get(["notes", "sessions"], (data) => {
      setNotes(data.notes || "");
      setSessions(data.sessions || {});
    });
  }, []);

  return (
    <div className="newtab">
      <h1>Productivity Dashboard</h1>

      <section data-testid="widget-notes" className="widget">
        <h2>Your Notes</h2>
        <p>{notes || "No notes saved yet."}</p>
      </section>

      <section data-testid="widget-sessions" className="widget">
        <h2>Saved Sessions</h2>

        {Object.keys(sessions).length === 0 && (
          <p>No sessions saved.</p>
        )}

        <ul>
          {Object.entries(sessions).map(([name, urls]) => (
            <li key={name}>
              <strong>{name}</strong> ({urls.length} tabs)
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
