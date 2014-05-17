
// home page
exports.index = function(req, res){
  res.render('index', { title: 'Butkus' });
};

// exercise form
exports.log = function(req, res){
  res.render('log', { title : 'Butkus | Log your exercise' });
};
