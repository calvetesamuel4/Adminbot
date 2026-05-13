import { sendWhatsappMessage } from "./whatsapp.services.js";


export const sendMessage = async (req, res) => {

  const { phone, message } = req.body;

  try {
    const data = await sendWhatsappMessage(phone, message);

    res.status(200).json({
      ok: true,
      message: "Mensaje enviado ",
      data:data,
    });

  }
  catch(error) {


    res.status(500).json({
      ok: false,
      text: "error en el servidor",
      err: error
    });
  }

}