const { attributes } = require('structure');

const Callinfo = attributes({
    caller_id: Number,
    name:String,
    address: String,
    mobile: Number  
})(class  Callinfo {
});

module.exports = Callinfo;
