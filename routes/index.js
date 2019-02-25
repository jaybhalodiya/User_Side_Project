var express = require('express')
var router = express.Router()

var Cont = require('../models/ContactUs.models.js')
var Nw = require('../models/NewsletterSubscription.models.js')
var Prod = require('../models/Peoduct.models.js')

var multer = require('multer')
var storage = multer.diskStorage({
    destination: './public/images/upload',
    filename: function(req, file, callback) {
        console.log('here')

        callback(null, Date.now() + file.originalname)
    }
})
var upload = multer({
    storage
})

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    })
})

/* GET home page. */
router.get('/Home', function(req, res, next) {
        res.render('Home')
    })
    /* GET Login Register page. */
router.get('/LoginReg', function(req, res, next) {
    res.render('LoginReg')
})

/* GET Designer Kurti  page. */
router.get('/DesignerKurti', function(req, res, next) {
    res.render('DesignerKurti')
})

/* GET Kids Wear page. */

/* GET Saree page. */
router.get('/Saree', function(req, res, next) {
    res.render('Saree')
})

/* GET Gown page. */
router.get('/Gown', function(req, res, next) {
    res.render('Gown')
})

/* GET BridalLehengaCholi page. */
router.get('/BridalLehengaCholi', function(req, res, next) {
    res.render('BridalLehengaCholi')
})

/* GET Combo wear page. */
router.get('/ComboWear', function(req, res, next) {
    res.render('ComboWear')
})

/* GET Palazzo Kurti  page. */
router.get('/PalazzoKurti', function(req, res, next) {
    res.render('PalazzoKurti')
})

/* GET Designer Chex print Chaniyacholi  page. */
router.get('/ChexChaniyaCholi', function(req, res, next) {
    res.render('ChexChaniyaCholi')
})

/* GET Designer Blouse  page. */
router.get('/DesignerBlouse', function(req, res, next) {
    res.render('DesignerBlouse')
})

/* GET About Us  page. */
router.get('/AboutUs', function(req, res, next) {
    res.render('AboutUs')
})

/* GET Cart  page. */
router.get('/Cart', function(req, res, next) {
    res.render('Cart')
})

/* GET Product  page. */
router.get('/Product', function(req, res, next) {
    res.render('Product')
})

/** form router */
router.get('/form', function(req, res, next) {
        res.render('form')
    })
    /** insert record */
router.post('/ContactUs', function(req, res, next) {
    const pro = new Cont({
        id: 0,
        Your_Name: req.body.Your_Name,
        Email_ID: req.body.Email_ID,
        Subject: req.body.Subject,
        Your_Message: req.body.Your_Message
    })
    pro
        .save()
        .then(() => {
            console.log('Insert Success')

            res.redirect('/Home')
        })
        .catch(() => {
            console.log('Error')
        })
})

router.post('/NewsletterSubscription', function(req, res, next) {
    const pro = new Nw({
        id: 0,

        Email_ID: req.body.Email_ID
    })
    pro
        .save()
        .then(() => {
            console.log('Insert Success')

            res.redirect('/Home')
        })
        .catch(() => {
            console.log('Error')
        })
})

router.post('/Product', upload.any(), function(req, res, next) {
    console.log('files', req.files[0].filename)
    const pro = new Prod({
        id: 0,
        Product_Name: req.body.Product_Name,
        Price: req.body.Price,
        Description: req.body.Description,
        QTY: req.body.QTY,
        Category_Name: req.body.Category_Name,
        Brand_Name: req.body.Brand_Name,
        Size: req.body.Size,
        Color_Name: req.body.Color_Name,
        Offer: req.body.Offer,
        Image: req.files[0].filename
    })
    pro
        .save()
        .then(() => {
            console.log('insert success')
            res.redirect('/Product')
        })
        .catch(() => {
            console.log('error')
        })
})

/** show all records */
router.get('/KidsWear', function(req, res, next) {
    Prod.find({
            Category_Name: 'Kids Wear'
        },
        function(err, data) {
            console.log(data)
            res.render('KidsWear', {
                KidsWear: data
            })
        }
    )
})

router.get('/DeLehengaCholi', function(req, res, next) {
    Prod.find({
            Category_Name: 'Lehenga Choli(Designer LehengaCholi)'
        },
        function(err, data) {
            console.log(data)
            res.render('DeLehengaCholi', {
                DeLehengaCholi: data
            })
        }
    )
})

module.exports = router