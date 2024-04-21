export default function asyncHandler(middleware) {
  return function (req, res, next) {
    return middleware(req, res, next).catch(next);
  };
}
