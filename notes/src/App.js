import React from "react";

export const Note = ({ note }) => {
  console.log(note);
  return <li>{note.content}</li>;
};

export const App = () => {
  const [notes, setNotes] = React.useState([]);
  const [newNote, setNewNote] = React.useState("");
  const [showAll, setShowAll] = React.useState(true);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };

    setNotes(notes.concat(noteObject));
    setNewNote("");
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          placeholder={"a new note..."}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
