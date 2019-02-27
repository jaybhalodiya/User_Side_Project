var express = require('express')
var passport = require('passport');

var router = express.Router()

var Cont = require('../models/ContactUs.models.js')
var Nw = require('../models/NewsletterSubscription.models.js')
var Prod = require('../models/Peoduct.models.js')

var AddTo = require('../models/AddToCart.models.js')
var UserLogin = require('../models/user.js')
var Custom = require('../models/CustomeOrder.models.js')

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

/* GET Login Register page. */
router.get('/LoginReg', function(req, res, next) {
    console.log("-------------------", req.flash('signupMessage'));

    res.render('LoginReg')
})






/* GET CheckOut start  page. */
router.get('/CheckoutStart', function(req, res, next) {
    res.render('CheckoutStart')
})

/* GET Checkout Started  page. */
router.get('/CheckoutStarted', function(req, res, next) {
    res.render('CheckoutStarted')
})

/* GET Shipping Address  page. */
router.get('/ShippingAddress', function(req, res, next) {
    res.render('ShippingAddress')
})

/* GET Shipping Method  page. */
router.get('/ShippingMethod', function(req, res, next) {
    res.render('ShippingMethod')
})

/* GET About Us  page. */
router.get('/AboutUs', function(req, res, next) {
    res.render('AboutUs')
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

router.post('/CustomeOrder', function(req, res, next) {
    const pro = new Custom({
        id: 0,
        Your_Name: req.body.Your_Name,
        Phone_Number: req.body.Phone_Number,
        Email_ID: req.body.Email_ID,
        City: req.body.City,
        Image: req.body.Image,
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






router.get('/ComboWear', function(req, res, next) {
    Prod.find({
            Category_Name: 'Combo Wear'
        },
        function(err, data) {
            console.log(data)
            res.render('ComboWear', {
                ComboWear: data
            })
        }
    )
})



/**cart show data ready */

router.get('/Cart', function(req, res, next) {
    AddTo.find({
            user_id: req.session.passport.user
        },
        function(err, data) {
            console.log(data)
            res.render('Cart', {
                Cart: data
            })
        }
    )
})




router.get('/Saree', function(req, res, next) {
    Prod.find({
            Category_Name: 'Saree'
        },
        function(err, data) {
            console.log(data)
            res.render('Saree', {
                Saree: data
            })
        }
    )
})



router.get('/DesignerBlouse', function(req, res, next) {
    Prod.find({
            Category_Name: 'Designer Blouse'
        },
        function(err, data) {
            console.log(data)
            res.render('DesignerBlouse', {
                DesignerBlouse: data
            })
        }
    )
})






router.get('/PalazzoKurti', function(req, res, next) {
    Prod.find({
            Category_Name: 'Kurti(Palazzo Kurti)'
        },
        function(err, data) {
            console.log(data)
            res.render('PalazzoKurti', {
                PalazzoKurti: data
            })
        }
    )
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

router.get('/BridalLehengaCholi', function(req, res, next) {
    Prod.find({
            Category_Name: 'Lehenga Choli(Bridal Lehenga Choli)'
        },
        function(err, data) {
            console.log(data)
            res.render('BridalLehengaCholi', {
                BridalLehengaCholi: data
            })
        }
    )
})

router.get('/Gown', function(req, res, next) {
    Prod.find({
            Category_Name: 'Gown'
        },
        function(err, data) {
            console.log(data)
            res.render('Gown', {
                Gown: data
            })
        }
    )
})

router.get('/DesignerKurti', function(req, res, next) {
    Prod.find({
            Category_Name: 'Kurti(Designer Kurti)'
        },
        function(err, data) {
            console.log(data)
            res.render('DesignerKurti', {
                DesignerKurti: data
            })
        }
    )
})

router.get('/ChexChaniyaCholi', function(req, res, next) {
    Prod.find({
            Category_Name: 'Chex Print Chaniya Choli'
        },
        function(err, data) {
            console.log(data)
            res.render('ChexChaniyaCholi', {
                ChexChaniyaCholi: data
            })
        }
    )
})

router.get('/Saree', function(req, res, next) {
    Prod.find({
            Category_Name: 'Chex Print Chaniya Choli'
        },
        function(err, data) {
            console.log(data)
            res.render('ChexChaniyaCholi', {
                ChexChaniyaCholi: data
            })
        }
    )
})

router.get('/Home', function(req, res, next) {
    console.log("-------", req.session);
    // let isLogin = false;
    Prod.find({}, function(err, data) {
        if (req.session.passport) {
            // isLogin=true
            // req.session.passport.user
            UserLogin.findById(req.session.passport.user, function(err, user) {
                res.render('Home', {
                    Home: data,
                    userdata: user,
                    isLogin: true
                })
            })

        } else {
            res.render('Home', {
                Home: data,
                isLogin: false
            })
        }
        console.log(data)

    }).limit(10)
})


//userdata.UserName
router.get('/ShowFullDetails/:id', function(req, res) {
    console.log(req.params.id)
    Prod.findById(req.params.id, function(err, user) {
        if (err) {
            console.log(err)
        } else {
            console.log(user)

            res.render('Product', {
                Product: user
            })
            res.end()
        }
    })
})

router.post('/ShowFullDetails/:id', function(req, res) {
    Prod.findById(req.params.id, req.body, function(err) {
        if (err) {
            res.redirect('ShowFullDetails/' + req.params.id)
        } else {
            res.redirect('/Cart')
        }
    })
})











router.post('/Cart', function(req, res, next) {
    console.log("-------", req.session);
    let product = Prod.findById(req.body.id, function(err, data) {
        console.log(data);
        const st = new AddTo({
            id: 0,
            Product_Name: data.Product_Name,
            QTY: 1,
            Price: data.Price,
            Image: data.Image,
            user_id: req.session.passport.user

        });
        st.save().then(() => {
            console.log("insert success");
            res.redirect('/Cart');

        }).catch(() => {
            console.log("error");
        });
    })

});


router.get('/deletesCart/:id', function(req, res) {
    AddTo.findByIdAndRemove(req.params.id, function(err, project) {
        if (err) {
            res.redirect('/Cart');
        } else {
            res.redirect('/Cart');
        }
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/Home',
    failureRedirect: '/LoginReg',
    failureFlash: true,
}));

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/Home',
    failureRedirect: '/LoginReg',
    failureFlash: true,
}));



module.exports = router