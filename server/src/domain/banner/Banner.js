const { attributes } = require('structure');

const Banner = attributes({
    banner_id: Number,
    banner_type:Number,
    banner_path: String,
    banner_product_id: Number,
    banner_path1:String,
    banner_path2:String  
})(class Banner {
});

module.exports = Banner;
