const { send } = require('process');
const qrcode = require('qrcode-terminal');

const { Client, LocalAuth } = require('whatsapp-web.js');

async function sendMessages(phoneNumbers, msg) {
  try {
    const client = new Client({
      authStrategy: new LocalAuth(),
    });

    client.on('qr', (qr) => {
      qrcode.generate(qr, { small: true });
    });

    await client.initialize();

    const promises = phoneNumbers.map((phoneNumber) => {
      return client.sendMessage(`${phoneNumber}@c.us`, msg);
    });

    await Promise.all(promises);
  } catch (e) {
    console.log('error', e);
  }
}

// export the function to be used in main.js
// module.exports = { sendMessages };




    const fs = require('fs');
    var nivel;
    var color;
    var color_anterior = ''
    
    fs.readFile('river_level.txt', 'utf8', (err, data) => {
  if (err){
    console.error(err);  
  }
  nivel = parseFloat(data);
  console.log(nivel);
  }); 


  let msg_alert
    
    if ((nivel >= 4.5) && (nivel <= 5)) {
    color = "amarillo"
    msg_alert = "ALERTA AMARILLA: El nivel del agua llego a " + nivel + " metros. Esta es una alerta temprana, se recomienda que habitantes mas proximos a la ribera puedan empezar a tomar acciones"; }
  
    else if ((nivel > 5.5) && (nivel <= 6)) {
    msg_alert = "ALERTA NARANJA: El nivel del agua llego a " + nivel + " metros. A partir de este punto se considera pasado el nivel critico de inundacion, zonas ribereñas deben ser evacuadas hasta bajar la alerta."; 
    color = "naranja"
    }
    else if (nivel > 6) {
    color = "rojo"
    msg_alert = "ALERTA ROJA: El nivel del agua llego a " + nivel + " metros. Las zonas ribereñas deben estar ya evacuadas hasta bajar la alerta"; 
    }
    else {
    color = "verde"
    msg_alert = "Los niveles del rio estan normales";
    }

  
    if (color != color_anterior) {
      sendMessages(['595982973551','595992239943','595986903085','595994256673','595994619724','595982363068'], msg_alert).then(res => {
        console.log(res)
      })
    }
     
     console.log(color, color_anterior)
    
    color_anterior = color