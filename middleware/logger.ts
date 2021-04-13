const logger = (req,res, next) => {
  req.hello = 'hello world';
  console.log('Middleware Ran');
  next();
}

export {
  logger,
}