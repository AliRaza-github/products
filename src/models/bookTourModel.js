const mongoose = require('mongoose');
const moment = require('moment'); // For date manipulation


const bookTourSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    profession: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                // Match phone number with spaces as '+92 XXX XXX XXXX'
                const regex = /^\+92 \d{3} \d{3} \d{4}$/;
                return regex.test(value);
            },
            message: props => `${props.value} is not a valid phone number! It should be formatted as '+92 XXX XXX XXXX'.`
        }
    },
    date: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                // Check if the date matches the format 'DD-MM-YYYY HH:mm A'
                const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4} (0[1-9]|1[0-9]|2[0-3]):[0-5][0-9] (AM|PM)$/;
                return regex.test(value);
            },
            message: props => `${props.value} is not a valid date! It should be in the format 'DD-MM-YYYY HH:mm AM/PM'.`
        }
    },
    status: {
        type: String, // Field to store the status
        default: 'Upcoming' // Default value
    }
});

// Middleware to update the status field before saving
bookTourSchema.pre('save', function(next) {
    const now = moment();
    const tourDate = moment(this.date, 'DD-MM-YYYY HH:mm A');

    if (tourDate.isSame(now, 'day')) {
        if (now.isSameOrAfter(tourDate, 'minute')) {
            this.status = 'Today';
        } else {
            this.status = 'Upcoming';
        }
    } else if (tourDate.isAfter(now)) {
        this.status = 'Upcoming';
    } else {
        this.status = 'Ended';
    }

    next();
});

// Ensure virtual fields are serialized
bookTourSchema.set('toObject', { virtuals: true });
bookTourSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('BookTour', bookTourSchema);
