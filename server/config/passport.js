const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const GitHubStrategy = require("passport-github2").Strategy
const User = require("../models/User")

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (error) {
    done(error, null)
  }
})

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.API_URL}/auth/google/callback`,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists
        let user = await User.findOne({ email: profile.emails[0].value })

        if (user) {
          // Update user's Google-specific info
          user.googleId = profile.id
          user.name = user.name || profile.displayName
          user.avatar = user.avatar || profile.photos[0]?.value
          await user.save()
          return done(null, user)
        }

        // Create new user
        user = await User.create({
          email: profile.emails[0].value,
          name: profile.displayName,
          googleId: profile.id,
          avatar: profile.photos[0]?.value,
          emailVerified: true, // Google emails are verified
        })

        done(null, user)
      } catch (error) {
        done(error, null)
      }
    },
  ),
)

// GitHub Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.API_URL}/auth/github/callback`,
      scope: ["user:email"],
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        // Get primary email from GitHub
        const primaryEmail = profile.emails[0].value

        // Check if user already exists
        let user = await User.findOne({ email: primaryEmail })

        if (user) {
          // Update user's GitHub-specific info
          user.githubId = profile.id
          user.name = user.name || profile.displayName
          user.avatar = user.avatar || profile.photos[0]?.value
          await user.save()
          return done(null, user)
        }

        // Create new user
        user = await User.create({
          email: primaryEmail,
          name: profile.displayName,
          githubId: profile.id,
          avatar: profile.photos[0]?.value,
          emailVerified: true, // GitHub emails are verified
        })

        done(null, user)
      } catch (error) {
        done(error, null)
      }
    },
  ),
)

module.exports = passport

