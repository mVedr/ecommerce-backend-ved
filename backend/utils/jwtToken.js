
const sendToken = (user, statusCode, res) => {
  console.log("hello")
  const token = user.getJWTToken();
   if(token)console.log("hello3")
   console.log("hello3")
  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token,options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;