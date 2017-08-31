/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  create: function (req, res) {
    if (!req.user) return res.forbidden({ error: 'You don\'t have right to post' });

    const { categoryName } = req.body;
    const { id: userId } = req.user;

    Category.create({
      name: categoryName,
      user: userId
    })
      .then(created => {
        if (!created) throw new Error('Unable to create new post');
        return res.json({ created });
      })
      .catch(e => res.serverError(e.message));
  },
  findAll: function (re, res) {
    Category.find()
      .populate('user')
      .then(category => {

        if (!category || category.length === 0) {
          throw new Error('No post found');
        }
        return res.ok(category);

      })
      .catch(err => res.serverError(err));
  },
  findOne: function (req, res) {
    const catId = req.params.id;
    if (!catId) return res.badRequest({ error: 'Missing category id' });
    Category.findOne({ id: catId })
      .populate('user')
      .then(category => {
        if (!category) return res.notFound({ error: `the category ${catId} is not found` });
        return res.ok(category);
      })
      .catch(error => res.serverError({ error }));
  },
  deleteAll: function (req, res) {
    if (!req.user) return res.forbidden({ error: 'You don\'t have right to delete' });

    Category.destroy({})
      .then(() => {
        return res.ok('All categories are deleted');
      })
      .catch(error => res.serverError(error));
  },
  delete: function (req, res) {
    let catId = req.params.id;

    if (!catId) return res.badRequest({ error: 'missing post id' });

    Category.destroy({ id: catId })
      .then(category => {
        if (!category || category.length === 0) return res.notFound({ error: 'No post found in our record' });
        return res.ok(`Category is deleted with id ${catId}`);
      })
      .catch(error => res.serverError(error));
  },
  update: function (req, res) {
    if (!req.user) return res.forbidden({ error: 'You don\'t have right to post' });
    const catId = req.params.id;

    const { categoryName } = req.body;
    const { id: userId } = req.user;

    Category.update({ id: catId }, {
      name: categoryName,
      user: userId
    })
      .then(created => {
        if (!created) throw new Error('Unable to create new post');
        return res.json({ created });
      })
      .catch(e => res.serverError(e.message));
  },
};

