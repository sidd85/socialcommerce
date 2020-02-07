const { Router } = require("express");
const { inject } = require("awilix-express");
const Status = require("http-status");

const PreferencesController = {
  get router() {
    const router = Router();

    router.use(inject("preferencesSerializer"));

    router.get("/", inject("getPreferences"), this.getPreferences);
    router.put("/", inject("updatePreferences"), this.updatePreferences
    );

    return router;
  },

  getPreferences(req, res, next) {
    const { getPreferences, preferencesSerializer } = req;
    const { SUCCESS, ERROR, UNAUTHORIZED } = getPreferences.outputs;
    getPreferences
      .on(SUCCESS, preferences => {
        res.status(Status.OK).json(preferences ? preferencesSerializer.serialize(preferences) : {});
      })
      .on(UNAUTHORIZED, message => {
        res.status(Status.UNAUTHORIZED).json({ message: message });
      })
      .on(ERROR, next);

    getPreferences.execute(
      req.user
    );
  },

  updatePreferences(req, res, next) {
    const { updatePreferences, preferencesSerializer } = req;
    const { SUCCESS, ERROR, UNAUTHORIZED } = updatePreferences.outputs;
    updatePreferences
      .on(SUCCESS, preferences => {
        res.status(Status.OK).json(preferences ? preferencesSerializer.serialize(preferences): {});
      })
      .on(UNAUTHORIZED, message => {
        res.status(Status.UNAUTHORIZED).json({ message: message });
      })
      .on(ERROR, next);
    updatePreferences.execute(
      req.user, req.body
    );
  }
};

module.exports = PreferencesController;
