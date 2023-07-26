import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

export const sendEmail = async () => {
    const client = new SESv2Client({
        region: "ap-southeast-1",
        credentials: {
            accessKeyId: "AKIASY5CT7NOGYFBLV7E",
            secretAccessKey: "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",
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