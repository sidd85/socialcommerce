const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

const EditUserController = {
 
  get router() {
    const router = Router();
    router.use(inject('authSerializer'));         
    router.post("/",inject("editUser"), this.editUser);
    return router;
  },
  editUser(req, res, next) {    
    const { editUser, orderSerializer } = req;
    const { SUCCESS, ERROR, NOT_FOUND, UNAUTHORIZED } = editUser.outputs;
    editUser
      .on(SUCCESS, order => {
        const results = order;
        res.status(Status.OK).json(results);
      })
      .on(UNAUTHORIZED, message => {
        res.status(Status.UNAUTHORIZED).json({ message: message });
      })
      .on(ERROR, next);
      editUser.execute(req.body);
  },
};

module.exports = EditUserController;