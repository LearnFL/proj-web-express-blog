import httpStatus from "http-status-codes";


function logErrors (error, req, res, next) {
  console.error(error.stack);
  next(error);
};

function respondNoResourceFound (req, res){
  let errorCode = httpStatus.NOT_FOUND;
  res.status(errorCode);
  res.render('404');
};

function respondInternalError (error, req, res, next) {
  let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
  console.log(`ERROR occurred: ${error.stack}`)
  res.status(errorCode);
  res.render('500');
};

export {logErrors, respondInternalError, respondNoResourceFound};

// OR PLACE THIS A THE END OF APP.JS
// app.use(function(req, res) {
//  res.status(400);
//  res.render('404', {title: '404: File Not Found'});
// });
// app.use(function(error, req, res, next) {
//   res.status(500);
//   res.render('500.jade', {title:'500: Internal Server Error', error});
// });
