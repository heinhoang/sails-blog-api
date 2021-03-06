/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  create: function (req, res) {
    const { firstName, lastName, userName, password, email } = req.body;

    User.create({
      firstName,
      lastName,
      userName,
      password,
      email
    })
      .then((user) => {
        if (!user) return res.serverError({ message: 'Unable to create user' });
        return res.ok(user);
      })
      .catch(e => res.serverError({ message: 'Unable to create user', error: e.message }));
  }
};

