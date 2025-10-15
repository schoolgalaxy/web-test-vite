import { defineAuth, secret } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
// export const auth = defineAuth({
//   loginWith: {
//     email: true,
//   },
// });

export const auth = defineAuth({
  loginWith: {
    email: {
      // can be used in conjunction with a customized welcome email as well
      verificationEmailStyle: "CODE",
      verificationEmailSubject: "Welcome to learning WonderScope!",
      verificationEmailBody: (createCode) => `Use this code to confirm your account: ${createCode()}`,
      userInvitation: {
        emailSubject: "Welcome to learning WonderScope!",
        emailBody: (user, code) =>
          `We're happy to have you! You can now login with username ${user()} and temporary password ${code()}`,
      },
    },
    externalProviders: {
      google: {
        clientId: secret("GOOGLE_CLIENT_ID"),
        clientSecret: secret("GOOGLE_CLIENT_SECRET"),
        scopes: ["aws.cognito.signin.user.admin", "email", "phone", "profile", "openid"],
      },
      callbackUrls: [process.env.WEB_CALLBACK_URL || "https://testgalaxy.org/"],
      logoutUrls: [process.env.WEB_LOGOUT_URL || "https://testgalaxy.org/"],
    },
  },
  senders: {
    email: {
      // configure using the email registered and verified in Amazon SES
      fromEmail: "schoolgalaxy40@gmail.com",
    },
  },
})
