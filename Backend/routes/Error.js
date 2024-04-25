module.exports.HandleError = (error, res) => {
    if (error.code === 11000) {
      res.status(500).json({
        error_message: "Email is already registered. Please choose a different email.",
      });
    } else if (error.name === "ValidationError") {
      const errors = {};
      for (let key in error.errors) {
        errors[key] = error.errors[key].message;
      }
      return res.status(400).json({ error_message: errors });
    } else {
      return res.status(500).json({ error_message: "Internal server error" });
    }
  };
  