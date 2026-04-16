const SettingGeneral = require("../../models/settings-general.model")

//[GET] /admin/setting/general
module.exports.general = async (req, res) => {
  const settingGeneral = await SettingGeneral.findOne({}); //setting chung chỉ cần 1 bản ghi

  res.render("admin/pages/setting/general", {
    pageTitle: "Cài đặt chung",
    settingGeneral: settingGeneral
  })
};

//[PATCH] /admin/setting/general
module.exports.generalPatch = async (req, res) => {
  const settingGeneral = await SettingGeneral.findOne({});

  if (settingGeneral) {
    await SettingGeneral.updateOne({
      _id: settingGeneral.id
    }, req.body);
    req.flash("success", "Cập nhật thành công!");
    res.redirect(req.get('Referrer') || '/');
  }
  else {
    const record = new SettingGeneral(req.body);
    await record.save();

    req.flash("success", "Cập nhật thành công!");
    res.redirect(req.get('Referrer') || '/');
  }

}