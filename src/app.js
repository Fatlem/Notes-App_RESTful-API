import { fetchNotes, createNote, deleteNote, updateNote } from './utils/api.js';
import './components/AppHeader.js';
import './components/NoteItem.js';
import './components/NoteForm.js';
import './components/AppFooter.js';

const notesContainer = document.getElementById('notes-container');
const noteForm = document.querySelector('note-form');

document.addEventListener('DOMContentLoaded', () => {
  displayNotes();
});

document.addEventListener('notes-updated', () => {
  displayNotes();
});

document.addEventListener('edit-note', (event) => {
  const note = event.detail;
  noteForm.setNote(note);
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.addEventListener('delete-note', async (event) => {
  const noteId = event.detail;
  try {
    await deleteNote(noteId);
    Swal.fire({
      icon: 'success',
      title: 'Berhasil',
      text: 'Catatan berhasil dihapus!',
      confirmButtonText: 'OK'
    });
    displayNotes();
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: `Error deleting note: ${error.message}`,
      confirmButtonText: 'OK'
    });
  }
});

async function displayNotes() {
  notesContainer.innerHTML = '<div class="loading">Loading notes...</div>';

  try {
    const notes = await fetchNotes();
    notesContainer.innerHTML = '';
    notes.forEach(note => {
      const noteElement = document.createElement('note-item');
      noteElement.setAttribute('note', JSON.stringify(note));
      notesContainer.appendChild(noteElement);
    });
  } catch (error) {
    notesContainer.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}
