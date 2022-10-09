const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
const AuthModel = require("./models/Auth.model");

const GOOGLE_CLIENT_ID =
  "22804827553-0po070v7v6ebr4im50md4st6bh5lgcdm.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

FACEBOOK_APP_ID = "your id";
FACEBOOK_APP_SECRET = "your id";
const getUserByIdFaceBook = async (uid) => {
  return AuthModel.findOne({ 'facebook.uid': uid, role: 'user' });
};
const getUserByIdGoogle = async (uid) => {
  return AuthModel.findOne({ 'google.uid': uid, role: 'user' });
};
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      passReqToCallback: true,
      
      callbackURL: "/auth/google/callback",
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const user = await getUserByIdGoogle(profile.id);
        if (user) return done(null, user);
        const newUser = await AuthModel.create({
          google: {
            uid: profile.id,
            token: accessToken,
            email: profile.emails[0].value,
          },
          username: profile.displayName,
          email: profile.emails[0].value,
        });
        return done(null, newUser);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  AuthModel.findById(id)
    .then(user => {
      done(null, user);
    })
});