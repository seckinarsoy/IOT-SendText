# IOT-SendText
Sending text messages using lambda with AWS IOT button

![alt text](https://raw.githubusercontent.com/deskaran/aws-iot-button-checkin/master/IoT-Button-SMS-Architecture.png "IOT button to send text")

### Instructions

1. Buy IOT button from Amazon
2. Create an AWS developer account
3. Download IOT developer app on your mobile phone and complete setup
4. Choose a lambda function to invoke when button is pressed (Or use default lambda function that was created when you completed the setup on your app)
5. Update lambda role to get admin access in IAM in AWS console
6. Click single or double or long to send the event to lambda from button
7. Update config file to change phone number, button serial number and update lambda function to handle the event if you need additional functionality
8. Sample event will look like this:

```
{
    "serialNumber": "GXXXXXXXXXXXXXXXXX",
    "batteryVoltage": "xxmV",
    "clickType": "SINGLE" | "DOUBLE" | "LONG"
}
```
