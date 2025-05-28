const notesHandler = require('../handlers/notesHandler');

module.exports = [
  {
    method: 'GET',
    path: '/notes',
    handler: notesHandler.getAllNotes
  },
  {
    method: 'POST',
    path: '/notes',
    handler: notesHandler.createNote
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: notesHandler.getNoteById
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: notesHandler.updateNote
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: notesHandler.deleteNote
  }
];