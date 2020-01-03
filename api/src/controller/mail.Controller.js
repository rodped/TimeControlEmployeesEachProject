const nodemailer = require("nodemailer");

// var key = "real secret keys should be long and random";
// var encryptor = require("simple-encryptor")(key);

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  tls: {
    rejectUnauthorized: false
  },
  auth: {
    user: "q1w2w2w2@gmail.com",
    pass: "teste123teste"
  }
});

exports.sendMail = async function(password, req, res) {
  const mailOptions = {
    from: "q1w2w2w2@gmail.com",
    to: req.body.email,
    subject: "Register in Time Control",
    html:
      '<h1 style="text-align: center;"><strong>Time Control</strong></h1><table style="border-color: black; margin-left: auto; margin-right: auto;"><tbody><tr><td><h3>Your Account Information</h3><p></td></tr><tr><td>name: ' +
      req.body.name +
      "<p>username: " +
      req.body.username +
      "<p>email: " +
      req.body.email +
      "<p>password: " +
      password +
      "<p>roles: " +
      req.body.roles +
      "</p></td></tr></tbody></table>"
  };

  transporter.sendMail(mailOptions, async function(error, info) {
    if (error) {
      console.log("\n\n" + error + "\n\n");
      return false;
    } else {
      console.log("Email sent: " + info.response);
      return true;
    }
  });
};
