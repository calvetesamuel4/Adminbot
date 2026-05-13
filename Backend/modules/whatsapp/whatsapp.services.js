import axios from "axios";

export const sendWhatsappMessage = async (
  phone,
  message
) => {

  try {

    console.log("==========");
    console.log("ENVIANDO TEMPLATE");
    console.log("PHONE:", phone);
    console.log("MESSAGE:", message);
    console.log("PHONE_ID:", process.env.PHONE_ID);
    console.log("==========");

    const { data } = await axios.post(

      `https://graph.facebook.com/v25.0/${process.env.PHONE_ID}/messages`,

      {

        messaging_product: "whatsapp",

        to: phone,

        type: "template",

        template: {

          name: "hello_world",

          language: {
            code: "en_US",
          },

        },

      },

      {

        headers: {

          Authorization:
          `Bearer ${process.env.ACCESS_TOKEN}`,

          "Content-Type":
          "application/json",

        },

      }
    );

    console.log("==========");
    console.log("RESPUESTA META:");
    console.log(data);
    console.log("==========");

    return data;

  } catch (error) {

    console.log("==========");
    console.error("ERROR META:");

    console.error(
      error.response?.data ||
      error.message
    );

    console.log("==========");
  }
};