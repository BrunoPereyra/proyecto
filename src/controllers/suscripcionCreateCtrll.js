const mercadopago = require('mercadopago');
const User = require("../models/users")

mercadopago.configure({
  access_token: 'TU_ACCESS_TOKEN'
});

const suscripcionCreate = async (req, res) => {
  const { idUser } = req
  const user = await User.find(idUser)
  const monto = 400

  // Crea un objeto de preferencia con los datos necesarios
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
      nameUser: user.nameUser,
      fullName: user.fullName,
      email: user.Email
    },
    back_urls: {
      success: 'https://ejemplo.com/exito',
      failure: 'https://ejemplo.com/error',
      pending: 'https://ejemplo.com/pendiente'
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
  };

  mercadopago.preferences.create(preference)
    .then(response => {
      res.redirect(response.body.init_point);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error al generar la preferencia');
    });
}
module.exports = suscripcionCreate