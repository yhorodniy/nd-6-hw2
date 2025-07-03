const fileDb = require('./db/tableFactory');


const newPostSchema = {
    id: Number,
    title: String,
    text: String,
    createDate: Date
};

const tableName = 'newPosts';

fileDb.defineSchema(tableName, newPostSchema);

const newPostTable = fileDb.getTable(tableName);

const post = newPostTable.create({
    title: 'My First Post',
    text: 'This is the content of my first post.',
    some: 'extra data',
    lxfgblxfgft: 123123123123
});

console.log('\n____________________________________________________\n');
console.log("Created Post:", post);

const postId = post.id || 1;

const updatedPost = newPostTable.update(postId, {
    title: 'Updated Post Title',
    text: 'This is the updated content of my post.',
    some: 'more extra data'
});

console.log('\n____________________________________________________\n');
console.log("Updated Post:", updatedPost);

const allPosts = newPostTable.getAll();

console.log('\n____________________________________________________\n');
console.log("All Posts:\n", allPosts);

const deletedPostId = newPostTable.delete(postId);

console.log('\n____________________________________________________\n');
console.log("Deleted Post ID:", deletedPostId);
