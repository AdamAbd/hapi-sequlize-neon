// src/handlers/notesHandler.js
const { Note } = require('../models'); // Mengimpor model Note dari file index.js di models

// Handler untuk membuat catatan baru (Create)
const createNote = async (request, h) => {
  const { title, content } = request.payload; // Mengambil data dari body request

  // Validasi dasar: pastikan judul ada
  if (!title) {
    return h.response({
      status: 'fail',
      message: 'Gagal membuat catatan. Mohon isi judul catatan.',
    }).code(400); // Bad Request
  }

  try {
    // Menggunakan Sequelize untuk membuat data baru di tabel Notes
    const newNote = await Note.create({
      title,
      content,
    });

    // Mengembalikan respons sukses dengan data catatan yang baru dibuat
    return h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: newNote.id, // Mengembalikan ID catatan yang dibuat
        title: newNote.title,
        content: newNote.content,
        createdAt: newNote.createdAt,
        updatedAt: newNote.updatedAt,
      },
    }).code(201); // Created
  } catch (error) {
    console.error('Error creating note:', error);
    // Mengembalikan respons error jika terjadi masalah
    return h.response({
      status: 'error',
      message: 'Catatan gagal ditambahkan karena kesalahan server',
    }).code(500); // Internal Server Error
  }
};

// Handler untuk mendapatkan semua catatan (Read All)
const getAllNotes = async (request, h) => {
  try {
    // Menggunakan Sequelize untuk mengambil semua data dari tabel Notes
    const notes = await Note.findAll({
      attributes: ['id', 'title', 'content', 'createdAt', 'updatedAt'], // Memilih kolom yang ingin ditampilkan
    });

    // Mengembalikan respons sukses dengan daftar catatan
    return h.response({
      status: 'success',
      data: {
        notes,
      },
    }).code(200); // OK
  } catch (error) {
    console.error('Error fetching notes:', error);
    // Mengembalikan respons error jika terjadi masalah
    return h.response({
      status: 'error',
      message: 'Gagal mengambil catatan karena kesalahan server',
    }).code(500); // Internal Server Error
  }
};

// Handler untuk mendapatkan catatan berdasarkan ID (Read One)
const getNoteById = async (request, h) => {
  const { id } = request.params; // Mengambil ID dari parameter rute

  try {
    // Menggunakan Sequelize untuk mencari catatan berdasarkan primary key (ID)
    const note = await Note.findByPk(id, {
       attributes: ['id', 'title', 'content', 'createdAt', 'updatedAt'], // Memilih kolom yang ingin ditampilkan
    });

    // Jika catatan tidak ditemukan
    if (!note) {
      return h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan',
      }).code(404); // Not Found
    }

    // Jika catatan ditemukan, kembalikan respons sukses
    return h.response({
      status: 'success',
      data: {
        note,
      },
    }).code(200); // OK
  } catch (error) {
    console.error('Error fetching note by ID:', error);
    // Mengembalikan respons error jika terjadi masalah
    return h.response({
      status: 'error',
      message: 'Gagal mengambil catatan karena kesalahan server',
    }).code(500); // Internal Server Error
  }
};

// Handler untuk memperbarui catatan (Update)
const updateNote = async (request, h) => {
  const { id } = request.params; // Mengambil ID dari parameter rute
  const { title, content } = request.payload; // Mengambil data terbaru dari body request

  try {
    // Cari catatan berdasarkan ID
    const note = await Note.findByPk(id);

    // Jika catatan tidak ditemukan
    if (!note) {
      return h.response({
        status: 'fail',
        message: 'Gagal memperbarui catatan. ID tidak ditemukan',
      }).code(404); // Not Found
    }

    // Perbarui data catatan (jika ada perubahan di payload)
    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;

    // Simpan perubahan ke database
    await note.save();

    // Mengembalikan respons sukses
    return h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
      data: {
         noteId: note.id,
         title: note.title,
         content: note.content,
         createdAt: note.createdAt,
         updatedAt: note.updatedAt,
      }
    }).code(200); // OK

  } catch (error) {
    console.error('Error updating note:', error);
    // Mengembalikan respons error jika terjadi masalah
    return h.response({
      status: 'error',
      message: 'Gagal memperbarui catatan karena kesalahan server',
    }).code(500); // Internal Server Error
  }
};

// Handler untuk menghapus catatan (Delete)
const deleteNote = async (request, h) => {
  const { id } = request.params; // Mengambil ID dari parameter rute

  try {
    // Cari catatan berdasarkan ID
    const note = await Note.findByPk(id);

    // Jika catatan tidak ditemukan
    if (!note) {
      return h.response({
        status: 'fail',
        message: 'Catatan gagal dihapus. ID tidak ditemukan',
      }).code(404); // Not Found
    }

    // Hapus catatan dari database
    await note.destroy();

    // Mengembalikan respons sukses
    return h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    }).code(200); // OK

  } catch (error) {
    console.error('Error deleting note:', error);
    // Mengembalikan respons error jika terjadi masalah
    return h.response({
      status: 'error',
      message: 'Gagal menghapus catatan karena kesalahan server',
    }).code(500); // Internal Server Error
  }
};


module.exports = {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
};
