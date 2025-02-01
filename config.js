const { Sequelize } = require('sequelize');
const fs = require('fs');

if (fs.existsSync('config.env')) {
  require('dotenv').config({
      path: './config.env'
  });
};

const toBool = (x) => (x && (x.toLowerCase() === 'true' || x.toLowerCase() === 'on')) || false;
const DATABASE_URL = process.env.DATABASE_URL === undefined ? "./database.db" : process.env.DATABASE_URL

module.exports = {
  //__________________________________________________________________________________________________________________________________________
 // For Enabling Commands Like AUTO_STATUS_VIEW Type true For Disabling Type false  
//____________________________________________________________________________________________________________________________________________  
  from twilio.rest import Client
from flask import Flask, request, jsonify
import random

app = Flask(GRUBYKAROLBOT)

# Twoje dane uwierzytelniające Twilio
account_sid = 'TWÓJ_ACCOUNT_SID'
auth_token = 'TWÓJ_AUTH_TOKEN'
client = Client(account_sid, auth_token)

@app.route('/sms', methods=['POST'])
def sms_reply():
    incoming_msg = request.form['Body'].strip().lower()
    from_number = request.form['From']

    response_msg = ""

    if "zagrajmy" in incoming_msg:
        # Symulacja "hazardu", gracz zawsze przegrywa
        response_msg = "Rzucam kostką... Wynik: 6! Niestety, przegrałeś. Spróbujesz ponownie?"
    else:
        response_msg = "Wpisz 'Zagrajmy', aby rozpocząć grę!"

    client.messages.create(
        body=response_msg,
        from_='TWÓJ_NUMER_TWILIO',
        to=from_number
    )

    return jsonify({"message": "Wiadomość wysłana!"})

if __name__ == '__main__':
    app.run()
