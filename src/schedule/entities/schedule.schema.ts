const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    screening: {
      type: String,
      required: true,
    },
    availableSeats: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
