
// home page
exports.index = function(req, res){
  res.render('index', { title: 'Butkus' });
};

// exercise form
exports.exercise = function(req, res){
  res.render('exercise', { title: 'Exercise' });
};
