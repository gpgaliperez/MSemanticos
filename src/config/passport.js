const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("./database");
const { cifrarClave, compararClaves } = require("./encryptPassword");

passport.use(
  "local.signup", new LocalStrategy(
    {
      usernameField: "cue",
      passwordField: "clave",
      passReqToCallback: true,
    },
    async (req, cue, clave, done) => {
      
      console.log("body: " + req);
      try {
        const resultado = await pool.query(
          "INSERT INTO institutos SET ?",
          req.body
        ); 
        
        exports.cueActual = cue;
        console.log("desde passport register:" +exports.cueActual);
  
        return done(null, req.body);

      } catch (err) {
        throw err;
      }
    }
  )
);

passport.use( "local.signin", new LocalStrategy(
    {
      // by default, local strategy uses username and password, we will override with email
      usernameField: "cue",
      passwordField: "clave",
      passReqToCallback: true, // allows us to pass back the entire request to the callback
    },
    async (req, cue, clave, done) => {
      try {
        const institutos = await pool.query("SELECT * FROM institutos WHERE cue = ?",[cue]);
        console.log("institutos: " + institutos);

        if (institutos.length > 0) {
          const institutoUno = institutos[0];
          

          if (clave == institutoUno.clave) {
            //TODO CUE CAMBIAR
            exports.cueActual = cue;
            console.log("desde passport:" +exports.cueActual);
            done(null, institutoUno);
            
          } else {
            done(null, false);
          }
        } else {
          done(null, false);
        }
      } catch (error) {
        throw error;
      }
    }
  )
);

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.

passport.serializeUser((user, done) => {
  console.log("Desde serializeUser " + " cue: " + user.cue);
  done(null, user.cue);
  //The result of the serializeUser method is attached to the session as req.session.passport.user = {}.
});

passport.deserializeUser(async (cueID, done) => {
  try {
    const institutos = await pool.query(
      "SELECT * FROM institutos WHERE cue = ?",
      [cueID]
    );
    done(null, institutos[0]);
    //user object attaches to the request as req.user
  } catch (error) {
    throw error;
  }
});
