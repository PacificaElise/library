import BookModel from '../models/Book.js';

export const allBooks = async (req, res) => {
  try {
    const books = await BookModel.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({
      data: null,
      error: {
        status: err.status,
        name: err.name,
        message: err.message,
        details: {},
      },
    });
  }
};

export const oneBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await BookModel.findById(bookId);

    res.json(book);
  } catch (err) {
    res.status(500).json({
      data: null,
      error: {
        status: err.status,
        name: err.name,
        message: err.message,
        details: {},
      },
    });
  }
};
