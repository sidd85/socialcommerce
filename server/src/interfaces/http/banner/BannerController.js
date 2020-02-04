const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

const BannerController = {
 
  get router() {
    const router = Router();
    router.use(inject('bannerSerializer'));

    router.use(inject("communitySerializer"));

    router.get("/", inject("getAllBanners"), this.index);   
    // router.post("/post", inject("postBanner"), this.banner);
    
    // router.post('/bannerPath', inject('banner'), this.banner);

    return router;
  },

  index(req, res, next) {
    const { getAllBanners, bannerSerializer } = req;
    const { SUCCESS, ERROR } = getAllBanners.outputs;
    getAllBanners
      .on(SUCCESS, banners => {
        const itemCount = banners.count;
        const pageCount = Math.ceil(itemCount / req.query.limit);
        const limit = req.query.limit;
        const currentPage = req.query.page;
        const results = {
          banners: banners.rows.map(bannerSerializer.serialize),
          pageCount,
          itemCount,
          limit,
          currentPage
        };
        res.status(Status.OK).json(results);
      })
      .on(ERROR, next);

    getAllBanners.execute(
      req.query.page,
      req.query.limit
    );
  },

  // banner(req, res, next) {
  //   const { postBanner,bannerSerializer } = req;
  //   const { SUCCESS, ERROR, VALIDATION_ERROR } = postBanner.outputs;
  //   postBanner
  //     .on(SUCCESS,(banners) => {
  //       res
  //         .status(Status.CREATED)
  //         .json(bannerSerializer.serialize(banners));
  //     })
  //     .on(VALIDATION_ERROR, (error) => {
  //       res.status(Status.BAD_REQUEST).json({
  //         type: 'ValidationError',
  //         details: error.details
  //       });
  //     })
  //     .on(ERROR, next);      
  //     postBanner.execute(req.body);
  // }
};

module.exports = BannerController;
