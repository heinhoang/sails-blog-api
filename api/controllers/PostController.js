/**
 * PostController
 *
 * @description :: Server-side logic for managing Posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /**
   * `PostController.create()`
   */
  // create: function (req, res) {
  //   if (!req.user) return res.forbidden({ error: 'You don\'t have right to post' });

  //   const { category, title, content } = req.body;
  //   const { id } = req.user;

  //   Category.findOrCreate({ name: category })
  //     .then(category => Post.create({
  //       title,
  //       content,
  //       user: id,
  //       category: category.id
  //     }))
  //     .then(post => {
  //       if (!post) throw new Error('Unable to create new post');
  //       return res.json({ post });
  //     })
  //     .catch(e => res.serverError(e.message));
  // },
  create: (req, res) => {
    if (!req.user) return res.forbidden({ error: 'You don\'t have right to post' });

    const { title, content } = req.body;
    const categories = req.body.categories.replace(/\s/g, '').split(',');
    const { id: userId } = req.user;

    Post.create({
      title,
      content,
      user: userId
    })
      .then((created) => {
        if (!created) throw new Error('Unable to create new post');
        created.category.add(categories);
        created.save();
        return created;
      })
      .then(created => {
        if (!created) throw new Error('Unable to create new post');
        res.ok({ message: 'Post created', data: { post: created, categories } });
      })
      .catch(error => res.serverError({ error }));

  },


  /**
   * `PostController.findAll()`
   */
  findAll: function (req, res) {
    Post.find()
      .populate('user')
      .populate('category')
      .then(posts => {

        if (!posts || posts.length === 0) {
          throw new Error('No post found');
        }
        return res.ok(posts);

      })
      .catch(err => res.serverError(err));
  },


  /**
   * `PostController.findOne()`
   */
  findOne: function (req, res) {
    const postId = req.params.id;
    if (!postId) return res.badRequest({ error: 'Missing post id' });
    Post.findOne({ id: postId })
      .populate('category')
      .populate('user')
      .then(_post => {
        if (!_post) return res.notFound({ error: `the post ${postId} is not found` });
        return res.ok(_post);
      })
      .catch(error => res.serverError({ error }));
  },


  deleteAll: function (req, res) {
    if (!req.user) return res.forbidden({ error: 'You don\'t have right to delete' });

    Post.destroy({})
      .then(() => {
        return res.ok('All posts are deleted');
      })
      .catch(error => res.serverError(error));
  },

  /**
   * `PostController.delete()`
   */
  delete: function (req, res) {
    let postId = req.params.id;

    if (!postId) return res.badRequest({ error: 'missing post id' });

    Post.destroy({ id: postId })
      .then(_post => {
        if (!_post || _post.length === 0) return res.notFound({ error: 'No post found in our record' });
        return res.ok(`Post is deleted with id ${postId}`);
      })
      .catch(error => res.serverError(error));
  },


  /**
   * This method will update the post
   */
  // update: function (req, res) {
  //   const { title, content, category } = req.body;
  //   const { id } = req.params;

  //   if (!req.user) return res.forbidden({ error: 'You don\'t have right to post' });
  //   const { id: userId } = req.user;

  //   if (!id) return res.badRequest({ error: 'Post id is missing' });

  //   Category.findOrCreate({ name: category })
  //     .then(_category => Post.update({ id }, {
  //       title,
  //       content,
  //       user: userId,
  //       category: _category.id
  //     }))
  //     .then(posts => {

  //       if (!posts || posts.length === 0) {
  //         throw new Error('No post found');
  //       }
  //       return res.ok(posts);

  //     })
  //     .catch(err => res.serverError(err));
  // },
  update: function (req, res) {
    const { title, content } = req.body;
    const { id } = req.params;

    if (!req.user) return res.forbidden({ error: 'You don\'t have right to post' });
    const { id: userId } = req.user;
    const categories = req.body.categories.replace(/\s/g, '').split(',');

    if (!id) return res.badRequest({ error: 'Post id is missing' });

    Post.update({ id }, {
      title,
      content,
      user: userId,
      category: categories
    })
      .then(created => {
        if (!created) throw new Error('Unable to create new post');
        res.ok({ message: 'Post created', data: { post: created, categories } });
      })
      .catch(error => res.serverError({ error }));
  },
};

