const cors = require("cors");

const whitelist = ["http://localhost:5173", "https://dwpllc.vercel.app"]; // whitelist here

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

module.exports = cors(corsOptions);
