const Note = require("../models/Note");

// CREATE NOTE
exports.createNote = async (req, res) => {
  const note = await Note.create({
    user: req.user.id,
    title: req.body.title,
    content: req.body.content
  });
  res.json(note);
};


// GET ALL NOTES (ONLY OWN)
exports.getNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.json(notes);
};


// UPDATE NOTE
exports.updateNote = async (req, res) => {
  const note = await Note.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(note);
};


// DELETE NOTE
exports.deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ msg: "Note deleted" });
};
