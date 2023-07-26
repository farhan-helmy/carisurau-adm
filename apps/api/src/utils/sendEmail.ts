import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

export const sendEmail = async () => {
    const client = new SESv2Client({
        region: "ap-southeast-1",
        credentials: {
            accessKeyId: "",
            secretAccessKey: "",
        },
    });
    const input = { // SendEmailRequest
      FromEmailAddress: "farhan@carisurau.com",
      Destination: { // Destination
        ToAddresses: [ // EmailAddressList
          "farhan@carisurau.com",
        ],
      },
      Content: {
        Simple: { 
          Subject: {
            Data: "test", 
          },
          Body: {
            Text: {
              Data: "test",
            },
            Html: {
              Data: "test",
            },
          },
        },
      },
    };
    
    
    const command = new SendEmailCommand(input);
    const response = await client.send(command);

    return response
}