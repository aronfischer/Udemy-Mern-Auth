const User = require("../models/user");
const jwt = require("jsonwebtoken");
const sg = require("@sendgrid/mail");
sg.setApiKey(process.env.SENDGRID_API_KEY);

exports.signUp = (req, res) => {
  const { username, email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err) {
      console.log(
        "ERROR ON FIND USER IN SIGN_UP IN SERVER/CONTROLLERS/AUTH",
        err
      );

      return res.status(400).json({
        errorMsg: "Something went wrong. Please try again.",
      });
    }

    if (user) {
      return res.status(400).json({
        errorMsg:
          "Ups, it seems like a user with thi email address already exists.",
      });
    }

    if (!user) {
      // Create a token
      const signUpToken = jwt.sign(
        { username, email, password },
        process.env.TOKEN_SIGNUP_SECRET,
        { expiresIn: "1h" }
      );

      // Create email data
      const sendgridEmail = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Account activation. Please verify your account.",
        html: `
          <h1 style="text-align:center" >Please verify your email address</h1>
          <h3 style="text-align:center">Congratulations, you successfully created an account. There is only one step missing. Please verify your account.</h3>
          <a href=${process.env.CLIENT_URL}/auth/${signUpToken} style="text-align:center; display=block; margin-bottom=30px">Verify your account</a>
          <br />
          <a href=${process.env.CLIENT_URL}/auth/${signUpToken} style="text-align:center; display=block; margin-bottom=30px">${process.env.CLIENT_URL}/auth/${signUpToken}</a>
          <p style="text-align:center" >This email might contain sensitive Information, do not share it with others</p>
          `,
      };

      // Send the email
      sg.send(sendgridEmail)
        .then((response) => {
          return res.status(200).json({
            message: `Email has been sent successfully to ${email}. Please verify your email address.`,
          });
        })
        .catch((error) => {
          console.log(
            "ERROR ON SEND EMAIL IN SIGNUP IN SERVER/CONTROLLERS/AUTH",
            err
          );
          return res.status(400).json({
            errorMsg:
              "Ups, couldn't send an email to the provided address. Please try again.",
          });
        });
    }
  });
};

exports.activateAccount = (req, res) => {
  const { token } = req.body;

  if (!token) {
    console.log(
      "ERROR ON FIND TOKEN IN ACTIVATE_ACCOUNT IN SERVER/CONTROLLERS/AUTH",
      err
    );

    return res.status(404).json({
      errorMsg: "Couldn't verify your email address. Please try again.",
    });
  }

  if (token) {
    // Check if the token is valid
    jwt.verify(token, process.env.TOKEN_SIGNUP_SECRET, function (
      error,
      verified
    ) {
      if (error) {
        return res.status(401).json({
          errorMsg: "Token is not valid anymore. Please sign up again.",
        });
      }

      if (verified) {
        const { username, email, password } = jwt.decode(token);

        // Create a new user
        const newUser = new User({ username, email, password });

        // Save the user in the DB
        newUser.save((err, savedUser) => {
          if (err) {
            console.log(
              "ERROR ON SAVE USER IN ACTIVATE_ACCOUNT IN SERVER/CONTROLLERS/AUTH",
              err
            );

            return res.status(400).json({
              errorMsg: "User could not be saved. Please sign up again later.",
            });
          }

          if (savedUser) {
            return res.status(200).json({
              message: "You signed up successfully. Please log in",
            });
          }
        });
      }
    });
  }
};
