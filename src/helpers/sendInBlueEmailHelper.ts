import { configData } from 'src/config/appConfig.';
import * as Sib from 'sib-api-v3-sdk';//SIB LIKE VARIABLE ASSIGN TO THIS PACKAGE 'sib-api-v3-sdk'
import { EmailDto } from '../application/dto/email-dto';

export async function sendEmails(emailDto: EmailDto) {
    try {
        const client = Sib.ApiClient.instance
        const apiKey = client.authentications['api-key']
        apiKey.apiKey = configData.sendInBlue

        const tranEmailApi = new Sib.TransactionalEmailsApi()
        const sender = {
            email: configData.sibEmail
        } 
        const receivers = [
            {
                email: emailDto.email
            },
        ]
        await tranEmailApi.sendTransacEmail({
            to: receivers,
            subject: 'Application Submitted Successfully',
            textContent: 'Your Application has submitted successfully',
            sender: sender,
        })
        console.log('Email sent successfully')
        } catch (error) {
            console.error('Error sending email:', error)
        }
    }