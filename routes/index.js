var express = require('express')
var passport = require('passport')

var router = express.Router()

var Cont = require('../models/ContactUs.models.js')
var Nw = require('../models/NewsletterSubscription.models.js')
var Prod = require('../models/Peoduct.models.js')

var AddTo = require('../models/AddToCart.models.js')
var UserLogin = require('../models/user.js')
var Custom = require('../models/CustomeOrder.models.js')
var Typwrk = require('../models/TypesOfWork.models.js')
var Siz = require('../models/Size.models.js')
var cty = require('../models/City.models.js')
var Ara = require('../models/Area.models.js')
var Fed = require('../models/Feedback.models.js')
var multer = require('multer')
var Sals = require('../models/Sales.models.js')

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
    console.log('-------------------', req.flash('signupMessage'))

    res.render('LoginReg')
})

/* GET CheckOut start  page. */
router.get('/CheckoutStart', function(req, res, next) {
    AddTo.find({
            user_id: req.session.passport.user
        },
        function(err, data) {
            console.log(data)
            let total = 0
            for (let index = 0; index < data.length; index++) {
                const element = data[index]
                total = total + element.Price
            }
            res.render('CheckoutStart', {
                total: total
            })
        }
    )
})

// ------------------------

/* GET Checkout Started  page. */
router.get('/CheckoutStarted', function(req, res, next) {
    res.render('CheckoutStarted')
})

// ----------------------
router.get('/ViewOrder', isLoggedIn, function(req, res, next) {
    console.log('------8888888888', req.session.passport)
    Sals.find({
        "user_id": req.session.passport.user
    }, function(err, data) {
        console.log("888888888888888888888888888888", data);
        if (err) {
            console.log(err)
        } else {
            Custom.find({
                "user_id": req.session.passport.user
            }, function(err, cust) {
                if (err) {
                    console.log(err)
                } else {
                    res.render('ViewOrder', {
                        ViewOrder: data,
                        cust: cust
                    });
                    console.log(data);
                }
            });
        }
    });
});



/* GET Shipping Address  page. */
router.get('/ShippingAddress', function(req, res, next) {
    res.render('ShippingAddress')
})

/* GET Shipping Method  page. */
router.get('/ShippingMethod', function(req, res, next) {
    res.render('ShippingMethod')
})

router.get('/Feedback', isLoggedIn, function(req, res, next) {
    res.render('Feedback')
})

router.post('/Feedback', function(req, res, next) {
    const st = new Fed({
        id: 0,
        UserName: req.body.UserName,
        EmailID: req.body.EmailID,
        Date: req.body.Date,
        Message: req.body.Message
    })
    st.save()
        .then(() => {
            console.log('insert success')
            res.redirect('/Home')
        })
        .catch(() => {
            console.log('error')
        })
})

/* GET About Us  page. */
router.get('/AboutUs', function(req, res, next) {
    res.render('AboutUs')
})

/* GET Product  page. */
router.get('/Product', function(req, res, next) {
    res.render('Product')
})

router.get('/getarea', function(req, res, next) {
    Ara.find({
            City_Name: req.query.city_name
        },
        function(err, data) {
            res.json({
                area: data
            })
        }
    )
})

/* GET Customize Order  page. */
router.get('/CustomOrder', isLoggedIn, function(req, res, next) {
    Typwrk.find(function(err, users) {
        if (err) {
            console.log(err)
        } else {
            Siz.find(function(err, anuser) {
                if (err) {
                    console.log(err)
                } else {
                    cty.find(function(err, cuser) {
                        if (err) {
                            console.log(err)
                        } else {
                            Ara.find(function(err, auser) {
                                if (err) {
                                    console.log(err)
                                } else {
                                    res.render('CustomOrder', {
                                        users: users,
                                        anuser: anuser,
                                        cuser: cuser,
                                        auser: auser
                                    })
                                    console.log(users)
                                }
                            })
                        }
                    })
                }
            })
        }
    })
})

/** form router */
router.get('/form', function(req, res, next) {
        res.render('form')
    })
    /** insert record */
router.post('/ContactUs', isLoggedIn, function(req, res, next) {
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

router.post('/CustomOrder', isLoggedIn, upload.any(), function(req, res, next) {
    const pro = new Custom({
        id: 0,
        UserName: req.body.UserName,
        Measurements: req.body.Measurements,
        EmailID: req.body.EmailID,
        Phone: req.body.Phone,
        Message: req.body.Message,
        Image: req.body.Image,
        Work_Name: req.body.Work_Name,
        Size: req.body.Size,
        City_Name: req.body.City_Name,
        Area_Name: req.body.Area_Name,
        user_id: req.session.passport.user,
        status: 'Pendding'
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
            Prod.find({
                Category_Name: 'Combo Wear'
            }).count(function(err, comcout) {
                console.log('--', comcout)
                res.render('ComboWear', {
                    ComboWear: data,
                    comcout: comcout
                })
            })
        }
    )
})

/** cart show data ready */

router.get('/Cart', isLoggedIn, function(req, res, next) {
    AddTo.find({
            user_id: req.session.passport.user
        },
        function(err, data) {
            console.log(data)
            let total = 0
            for (let index = 0; index < data.length; index++) {
                const element = data[index]
                total = total + element.total
            }
            res.render('Cart', {
                Cart: data,
                total: total
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
            Prod.find({
                Category_Name: 'Saree'
            }).count(function(err, sareeCount) {
                console.log('----------', sareeCount)

                res.render('Saree', {
                    Saree: data,
                    sareeCount: sareeCount
                })
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
            Prod.find({
                Category_Name: 'Designer Blouse'
            }).count(function(err, designerBlousecount) {
                console.log(
                    '--------------------------------------',
                    designerBlousecount
                )
                res.render('DesignerBlouse', {
                    DesignerBlouse: data,
                    designerBlousecount: designerBlousecount
                })
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
            Prod.find({
                Category_Name: 'Kurti(Palazzo Kurti)'
            }).count(function(err, kurpazcount) {
                console.log('--', kurpazcount)

                res.render('PalazzoKurti', {
                    PalazzoKurti: data,
                    kurpazcount: kurpazcount
                })
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
            Prod.find({
                Category_Name: 'Kids Wear'
            }).count(function(err, kidscount) {
                console.log('---', kidscount)

                res.render('KidsWear', {
                    KidsWear: data,
                    kidscount: kidscount
                })
            })
        }
    )
})

router.get('/DeLehengaCholi', function(req, res, next) {
    Prod.find({
            Category_Name: 'Lehenga Choli(Designer LehengaCholi)'
        },
        function(err, data) {
            Prod.find({
                Category_Name: 'Lehenga Choli(Designer LehengaCholi)'
            }).count(function(err, lehengacount) {
                console.log('---', lehengacount)
                console.log(data)
                res.render('DeLehengaCholi', {
                    DeLehengaCholi: data,
                    lehengacount: lehengacount
                })
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
            Prod.find({
                Category_Name: 'Lehenga Choli(Bridal Lehenga Choli)'
            }).count(function(err, bridalcount) {
                console.log('--', bridalcount)

                res.render('BridalLehengaCholi', {
                    BridalLehengaCholi: data,
                    bridalcount: bridalcount
                })
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
            Prod.find({
                Category_Name: 'Gown'
            }).count(function(err, gowncout) {
                console.log('--', gowncout)
                res.render('Gown', {
                    Gown: data,
                    gowncout: gowncout
                })
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
            Prod.find({
                Category_Name: 'Kurti(Designer Kurti)'
            }).count(function(err, kruticount) {
                console.log('------', kruticount)
                res.render('DesignerKurti', {
                    DesignerKurti: data,
                    kruticount: kruticount
                })
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
            Prod.find({
                Category_Name: 'Chex Print Chaniya Choli'
            }).count(function(err, chexcount) {
                console.log('--', chexcount)

                res.render('ChexChaniyaCholi', {
                    ChexChaniyaCholi: data,
                    chexcount: chexcount
                })
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
    console.log('-------', req.session, res.locals)
        // let isLogin = false;

    Prod.find({}, function(err, data) {
        if (req.session.passport) {
            // isLogin=true
            // req.session.passport.user
            UserLogin.findById(req.session.passport.user, function(err, user) {
                console.log('-----------------------------------------------', user)

                res.render('Home', {
                    Home: data,
                    userdata: user
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

// userdata.UserName
router.get('/ShowFullDetails/:id', isLoggedIn, function(req, res) {
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

// router.post('/carts')
// controller
router.post('/ship', function(req, res) {
    console.log('---')
    let insertArray = []
    AddTo.find({
            user_id: req.session.passport.user
        },
        function(err, data) {
            data.forEach(function(element) {
                console.log('-----')
                insertArray.push({
                    Product: element.Product_Name,
                    QTY: element.QTY,
                    Price: element.Price,
                    Image: element.Image,
                    total: element.total,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    phone: req.body.phone,
                    street_address: req.body.street_address,
                    city: req.body.city,
                    zip: req.body.zip,
                    country: req.body.country,
                    state: req.body.state,
                    status: 'Pendding',
                    user_id: req.session.passport.user
                })
            })
            Sals.collection.insertMany(insertArray, function(err, data) {
                console.log('-----')
                AddTo.deleteMany({
                        user_id: req.session.passport.user
                    },
                    function(err, result) {
                        res.redirect('/ViewOrder')
                    }
                )
            })
        }
    )
})

router.post('/Cart', function(req, res, next) {
    console.log('-------', req.session)
    let product = Prod.findById(req.body.id, function(err, data) {
        console.log(data)
        AddTo.find({
            user_id: req.session.passport.user,
            product_id: data._id
        }, function(err, cart) {
            if (cart.length > 0) {
                AddTo.findByIdAndUpdate(cart[0]._id, {
                    QTY: cart[0].QTY + 1,
                    total: cart[0].Price * (cart[0].QTY + 1)
                }, function(err, result) {
                    res.redirect('/Cart');
                })
            } else {
                const st = new AddTo({
                    id: 0,
                    Product_Name: data.Product_Name,
                    QTY: 1,
                    Price: data.Price,
                    Image: data.Image,
                    user_id: req.session.passport.user,
                    total: data.Price,
                    product_id: data._id
                })
                st.save()
                    .then(() => {
                        console.log('insert success')
                        res.redirect('/Cart')
                    })
                    .catch(() => {
                        console.log('error')
                    })
            }
        })

    })
})

router.get('/deletesCart/:id', function(req, res) {
    AddTo.findByIdAndRemove(req.params.id, function(err, project) {
        if (err) {
            res.redirect('/Cart')
        } else {
            res.redirect('/Cart')
        }
    })
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next()
    res.redirect('/LoginReg')
}

router.post(
    '/signup',
    passport.authenticate('local-signup', {
        successRedirect: '/Home',
        failureRedirect: '/LoginReg',
        failureFlash: true
    })
)

router.post(
    '/login',
    passport.authenticate('local-login', {
        successRedirect: '/Home',
        failureRedirect: '/LoginReg',
        failureFlash: true
    })
)
router.get('/logout', function(req, res) {
    req.logout()
    res.redirect('/Home')
})
module.exports = router