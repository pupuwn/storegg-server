const mongoose = require('mongoose');

let bankSchema = mongoose.Schema({
    name : {
        type: String,
        require: [true, 'Nama pemilik Rekening Bank harus diisi !']
    },
    bankName : {
        type: String,
        require: [true, 'Nama Bank harus diisi !']
    },
    noRekening : {
        type: String,
        require: [true, 'Nomor Rekening Bank harus diisi !']
    }
}, { timestamp: true })

module.exports = mongoose.model('Bank', bankSchema);