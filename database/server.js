const mongoose = require('mongoose');

mongoose.connect(process.env.DB, (err) => {
    if(err) {
        console.log('Connection to database failed!');
    }
    else {
        console.log('Connection to database successful!');
    }
});

const bookSchema = new mongoose.Schema({
    title: String,
    commentcount: Number,
    comments: [String]

});

const Book = mongoose.model('Book', bookSchema);

const addBook = async (title) => {
    const newBook = new Book({
        title: title,
        commentcount: 0,
        comments: []
    });
    await newBook.save();
    return { _id: newBook['_id'], title: newBook['title'] };
}

const deleteBook = async (id) => {
    const bookToDelete = await Book.findById(id);
    if(!bookToDelete) {
        throw new Error('no book exists');
    }
    await Book.findByIdAndDelete(id);
    return ('delete successful');
}

const deleteAllBooks = async () => {
    await Book.remove();
}

const getBook = async (id) => {
    const bookToGet = await Book.findById(id);
    if(!bookToGet) {
        throw new Error('no book exists');
    }
    return bookToGet;
}

const getAllBook = async () => {
    const allBooks = await Book.find({}, '');
    return allBooks;
}

const addComment = async (id, comment) => {
    const bookToAddComment = await Book.findById(id);
    if(!bookToAddComment) {
        throw new Error('no book exists');
    }
    bookToAddComment.comments.push(comment);
    bookToAddComment.commentcount += 1;
    await bookToAddComment.save();
    return await getBook(id);
}

module.exports = {
    addBook,
    deleteBook,
    deleteAllBooks,
    getBook,
    getAllBook,
    addComment,
}