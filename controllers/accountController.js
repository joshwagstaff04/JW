const utilities = require("../utilities/")
const accountModel = require("../models/account-model")
const bcrypt = require("bcryptjs")

const accountCont = {}

/* ***************************
 *  Build login view
 * ************************** */
accountCont.buildLogin = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/login", {
    title: "Login",
    nav,
  })
}

/* ***************************
 *  Build registration view
 * ************************** */
accountCont.buildRegister = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/register", {
    title: "Register",
    nav,
    errors: null,
  })
}

/* ***************************
 *  Process registration
 * ************************** */
accountCont.registerAccount = async function (req, res) {
  let nav = await utilities.getNav()
  const { account_firstname, account_lastname, account_email, account_password } = req.body

  // Hash the password before storing
  let hashedPassword
  try {
    hashedPassword = await bcrypt.hashSync(account_password, 10)
  } catch (error) {
    req.flash("notice", 'Sorry, there was an error processing the registration.')
    res.status(500).render("account/register", {
      title: "Registration",
      nav,
      errors: null,
    })
  }

  const regResult = await accountModel.registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    hashedPassword
  )

  if (regResult.rowCount) {
    req.flash(
      "notice",
      `Congratulations ${account_firstname}, you are registered! Please log in.`
    )
    res.status(201).render("account/login", {
      title: "Login",
      nav,
    })
  } else {
    req.flash("notice", "Sorry, registration failed. Please try again.")
    res.status(501).render("account/register", {
      title: "Register",
      nav,
      errors: null,
    })
  }
}

module.exports = accountCont
