const setting = require("../../models/setting-general.model")

module.exports.settingGeneral = async(req,res,next) => {
    const settingGeneral = await setting.findOne({});
    res.locals.settingGeneral = settingGeneral;
    next();
}