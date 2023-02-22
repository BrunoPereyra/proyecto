const mercadopago = require('mercadopago');
const User = require("../models/users")
const { TOKEN_ACCESS } = require("../config")

mercadopago.configure({
  access_token: TOKEN_ACCESS.ACCESS_TOKEN_PRUEBA_SUBSCRIPTION
});


const SubscriptionCreate = async (req, res) => {
  const { idUser } = req
  const user = await User.findById(idUser)
  const monto = 400
  const preference = {
    items: [
      {
        title: 'Suscripción mensual',
        description: 'Suscripción mensual a nuestro servicio',
        quantity: 1,
        currency_id: 'ARS',
        unit_price: monto
      }
    ],
    payer: {
      name: user.fullName,
      email: user.Email
    },
    back_urls: {
      success: "http://localhost:3000/SubscriptioStatus",
      failure: "http://localhost:3000/SubscriptioStatus",
      pending: "http://localhost:3000/SubscriptioStatus"
    },
    auto_return: 'approved',
    payment_methods: {
      excluded_payment_methods: [
        { id: 'amex' }
      ],
      excluded_payment_types: [
        { id: 'atm' }
      ],
      installments: 1
    },
    date_of_expiration: new Date(Date.now() + 3600000).toISOString(),

  };


  mercadopago.preferences.create(preference)
    .then(response => {
      res.json({
        res: response.body.init_point
      });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error al generar la preferencia');
    });
}
module.exports = SubscriptionCreate;