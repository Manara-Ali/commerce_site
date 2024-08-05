// IMPORT UTIL
const util = require("util");

// IMPORT CRYPTO
const crypto = require("crypto");

const bcrypt = require("bcryptjs");

// IMPORT JWT
const jwt = require("jsonwebtoken");

// IMPORT USER MODEL
const User = require("../models/userModel");

// IMPORT CATCH ASYNC
const catchAsyncFn = require("../utils/catchAsyncFn");

// IMPORT APPLICATION ERROR
const ApplicationError = require("../utils/applicationError");

// IMPORT FUNCTION TO CREATE TOKEN
const createAndSendToken = require("../utils/createAndSendToken");

// IMPORT FUNCTION TO SEND EMAIL
const sendEmail = require("../utils/sendEmail");

const emailMessages = require("../utils/emailMessages");

exports.signup = catchAsyncFn(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const browseURL = `${req.protocol}://${req.get("host")}/`;

  const message = emailMessages.signupMessage(browseURL);

//   const message = `
//     <!DOCTYPE html><html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head>
//   <title> Welcome to Silver Spoon </title>
//   <!--[if !mso]><!-- -->
//   <meta http-equiv="X-UA-Compatible" content="IE=edge" />
//   <!--<![endif]-->
//   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
//   <meta name="viewport" content="width=device-width, initial-scale=1" />
//   <style type="text/css">
//     #outlook a {
//       padding: 0;
//     }

//     body {
//       margin: 0;
//       padding: 0;
//       -webkit-text-size-adjust: 100%;
//       -ms-text-size-adjust: 100%;
//     }

//     table,
//     td {
//       border-collapse: collapse;
//       mso-table-lspace: 0pt;
//       mso-table-rspace: 0pt;
//     }

//     img {
//       border: 0;
//       height: auto;
//       line-height: 100%;
//       outline: none;
//       text-decoration: none;
//       -ms-interpolation-mode: bicubic;
//     }

//     p {
//       display: block;
//       margin: 13px 0;
//     }
//   </style>
//   <!--[if mso]>
//         <xml>
//         <o:OfficeDocumentSettings>
//           <o:AllowPNG/>
//           <o:PixelsPerInch>96</o:PixelsPerInch>
//         </o:OfficeDocumentSettings>
//         </xml>
//         <![endif]-->
//   <!--[if lte mso 11]>
//         <style type="text/css">
//           .mj-outlook-group-fix { width:100% !important; }
//         </style>
//         <![endif]-->
//   <!--[if !mso]><!-->
//   <link href="https://fonts.googleapis.com/css2?family=Quattrocento:wght@400;700&amp;display=swap" rel="stylesheet" type="text/css" />
//   <style type="text/css">
//     @import url(https://fonts.googleapis.com/css2?family=Quattrocento:wght@400;700&amp;display=swap);
//   </style>
//   <!--<![endif]-->
//   <style type="text/css">
//     @media only screen and (min-width:480px) {
//       .mj-column-per-100 {
//         width: 100% !important;
//         max-width: 100%;
//       }
//     }
//   </style>
//   <style type="text/css">
//     @media only screen and (max-width:480px) {
//       table.mj-full-width-mobile {
//         width: 100% !important;
//       }

//       td.mj-full-width-mobile {
//         width: auto !important;
//       }
//     }
//   </style>
//   <style type="text/css">
//     a,
//     span,
//     td,
//     th {
//       -webkit-font-smoothing: antialiased !important;
//       -moz-osx-font-smoothing: grayscale !important;
//     }
//   </style>
// </head>

// <body style="background-color:#d7456b;">
//   <div style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;"> Preview - Welcome to Silver Spoon</div>
//   <div style="background-color:#d7456b;">
//     <!--[if mso | IE]>
//       <table
//          align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
//       >
//         <tr>
//           <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
//       <![endif]-->
//     <div style="margin:0px auto;max-width:600px;">
//       <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
//         <tbody>
//           <tr>
//             <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;text-align:center;">
//               <!--[if mso | IE]>
//                   <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
//         <tr>
      
//         </tr>
      
//                   </table>
//                 <![endif]-->
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//     <!--[if mso | IE]>
//           </td>
//         </tr>
//       </table>
      
//       <table
//          align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
//       >
//         <tr>
//           <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
//       <![endif]-->
//     <div style="margin:0px auto;max-width:600px;">
//       <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
//         <tbody>
//           <tr>
//             <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
//               <!--[if mso | IE]>
//                   <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
//             <tr>
//               <td
//                  class="" width="600px"
//               >
          
//       <table
//          align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
//       >
//         <tr>
//           <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
//       <![endif]-->
//               <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;border-radius:8px 8px 0 0;max-width:600px;">
//                 <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;border-radius:8px 8px 0 0;">
//                   <tbody>
//                     <tr>
//                       <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;text-align:center;">
//                         <!--[if mso | IE]>
//                   <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
//         <tr>
      
//             <td
//                class="" style="vertical-align:middle;width:600px;"
//             >
//           <![endif]-->
//                         <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;">
//                           <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:middle;" width="100%">
//                             <tbody><tr>
//                               <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
//                                 <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
//                                   <tbody>
//                                     <tr>
//                                       <td style="width:150px;">
//                                         <img alt="Logo" height="auto" src="https://firebasestorage.googleapis.com/v0/b/silver-spoon-21910.appspot.com/o/silver-spoon-logo.png?alt=media&token=13c0ddb7-8b5f-4ce9-82e6-7cd297332a77" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:14px;" width="150" />
//                                       </td>
//                                     </tr>
//                                   </tbody>
//                                 </table>
//                               </td>
//                             </tr>
//                             <tr>
//                               <td style="font-size:0px;padding:10px 25px;word-break:break-word;">
//                                 <p style="border-top: solid 4px #f9f9f9; font-size: 1px; margin: 0px auto; width: 100%;">
//                                 </p>
//                                 <!--[if mso | IE]>
//         <table
//            align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 4px #f9f9f9;font-size:1px;margin:0px auto;width:550px;" role="presentation" width="550px"
//         >
//           <tr>
//             <td style="height:0;line-height:0;">
//               &nbsp;
//             </td>
//           </tr>
//         </table>
//       <![endif]-->
//                               </td>
//                             </tr>
//                           </tbody></table>
//                         </div>
//                         <!--[if mso | IE]>
//             </td>
          
//         </tr>
      
//                   </table>
//                 <![endif]-->
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//               <!--[if mso | IE]>
//           </td>
//         </tr>
//       </table>
      
//               </td>
//             </tr>
          
//             <tr>
//               <td
//                  class="" width="600px"
//               >
          
//       <table
//          align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
//       >
//         <tr>
//           <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
//       <![endif]-->
//               <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;border-radius:0 0 8px 8px;max-width:600px;">
//                 <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;border-radius:0 0 8px 8px;">
//                   <tbody>
//                     <tr>
//                       <td style="direction:ltr;font-size:0px;padding:20px 0;padding-top:0px;text-align:center;">
//                         <!--[if mso | IE]>
//                   <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
//         <tr>
      
//             <td
//                class="" style="vertical-align:top;width:600px;"
//             >
//           <![endif]-->
//                         <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
//                           <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
//                             <tbody><tr>
//                               <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
//                                 <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
//                                   <tbody>
//                                     <tr>
//                                       <td style="width:150px;">
//                                       </td>
//                                     </tr>
//                                   </tbody>
//                                 </table>
//                               </td>
//                             </tr>
//                             <tr>
//                               <td align="right" style="font-size:0px;padding:10px 25px;word-break:break-word;">
//                                 <div style="font-family:Quattrocento;font-size:14px;font-weight:400;line-height:24px;text-align:right;color:#000000;"><a href="#" style="color: #428dfc; text-decoration: none; font-weight: bold;"></a></div>
//                               </td>
//                             </tr>
//                             <tr>
//                               <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
//                                 <div style="font-family:Quattrocento;font-size:18px;font-weight:400;line-height:24px;text-align:left;color:#000000;">
//                                   <h1 style="margin: 0; font-size: 32px; line-height: 40px; font-weight: 700;">Welcome to the Silver Spoon Family</h1>
//                                 </div>
//                               </td>
//                             </tr>
//                             <tr>
//                               <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
//                                 <div style="font-family:Quattrocento;font-size:18px;font-weight:400;line-height:24px;text-align:left;color:#000000;">
//                                   <p style="margin: 0;">Hi ${
//                                     user.name.split(" ")[0]
//                                   },</p>
//                                 </div>
//                               </td>
//                             </tr>
//                             <tr>
//                               <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
//                                 <div style="font-family:Quattrocento;font-size:18px;font-weight:400;line-height:24px;text-align:left;color:#000000;">
//                                   <p style="margin: 0;"> Welcome to the Silver Spoon family! We are glad you chose to join us for your catering needs and quick bites. Feel free to contact us if you have any questions regarding our services.</p>
//                                   <p>Best Regards, ${user.name}!</p>
//                                 </div>
//                               </td>
//                             </tr>
//                             <tr>
//                               <td align="center" vertical-align="middle" style="font-size:0px;padding:10px 25px;word-break:break-word;">
//                                 <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
//                                   <tbody><tr>
//                                     <td align="center" bgcolor="#428dfc" role="presentation" style="border:none;border-radius:3px;cursor:auto;mso-padding-alt:10px 25px;background:#428dfc;" valign="middle">
//                                       <a href=${browseURL} style="display: inline-block; background: #66ba30; color: #000; font-family: Quattrocento; font-size: 14px; font-weight: bold; line-height: 30px; margin: 0; text-decoration: none; text-transform: uppercase; padding: 10px 25px; mso-padding-alt: 0px; border-radius: 3px;" target="_blank"> Browse Silver Spoon</a>
//                                     </td>
//                                   </tr>
//                                 </tbody></table>
//                               </td>
//                             </tr>
//                             <tr>
//                               <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
//                                 <div style="font-family:Quattrocento;font-size:16px;font-weight:400;line-height:24px;text-align:center;color:#000;">Didn't requested the password reset? Please disregard this email<a href="#" style="color: #428dfc; text-decoration: none; font-weight: bold;"></a></div>
//                               </td>
//                             </tr>
//                           </tbody></table>
//                         </div>
//                         <!--[if mso | IE]>
//             </td>
          
//         </tr>
      
//                   </table>
//                 <![endif]-->
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//               <!--[if mso | IE]>
//           </td>
//         </tr>
//       </table>
      
//               </td>
//             </tr>
          
//             <tr>
//               <td
//                  class="" width="600px"
//               >
          
//       <table
//          align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
//       >
//         <tr>
//           <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
//       <![endif]-->
//               <div style="margin:0px auto;max-width:600px;">
//                 <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
//                   <tbody>
//                     <tr>
//                       <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
//                         <!--[if mso | IE]>
//                   <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
//         <tr>
      
//             <td
//                class="" style="vertical-align:top;width:600px;"
//             >
//           <![endif]-->
//                         <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
//                           <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
//                             <tbody><tr>
//                               <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
//                                 <div style="font-family:Quattrocento;font-size:16px;font-weight:400;line-height:24px;text-align:center;color:#000;"><a class="footer-link" href="#" style="text-decoration: none; color: #000; font-weight: 400;">Support</a>   |   <a class="footer-link" href="#" style="text-decoration: none; color: #000; font-weight: 400;">Forums</a>   |  <a class="footer-link" href="#" style="text-decoration: none; color: #000; font-weight: 400;">Contact</a>   |  <a class="footer-link" href="#" style="text-decoration: none; color: #000; font-weight: 400;">Log In</a></div>
//                               </td>
//                             </tr>
//                             <tr>
//                               <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
//                                 <div style="font-family:Quattrocento;font-size:16px;font-weight:400;line-height:24px;text-align:center;color:#333333;">123 Main St., Dallas, GA 30132<br /> © 2024 ColdFusion Technology.</div>
//                               </td>
//                             </tr>
//                             <tr>
//                               <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
//                                 <!--[if mso | IE]>
//       <table
//          align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
//       >
//         <tr>
      
//               <td>
//             <![endif]-->
//                                 <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
//                                   <tbody><tr>
//                                     <td style="padding:4px;">
//                                       <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:24px;">
//                                         <tbody><tr>
//                                           <td style="font-size:0;height:24px;vertical-align:middle;width:24px;">
//                                             <a href="#" target="_blank" style="color: #428dfc; text-decoration: none; font-weight: bold;">
//                                               <img alt="twitter-logo" height="24" src="https://codedmails.com/images/social/black/twitter-logo-transparent-black.png" style="border-radius:3px;display:block;" width="24" />
//                                             </a>
//                                           </td>
//                                         </tr>
//                                       </tbody></table>
//                                     </td>
//                                   </tr>
//                                 </tbody></table>
//                                 <!--[if mso | IE]>
//               </td>
            
//               <td>
//             <![endif]-->
//                                 <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
//                                   <tbody><tr>
//                                     <td style="padding:4px;">
//                                       <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:24px;">
//                                         <tbody><tr>
//                                           <td style="font-size:0;height:24px;vertical-align:middle;width:24px;">
//                                             <a href="#" target="_blank" style="color: #428dfc; text-decoration: none; font-weight: bold;">
//                                               <img alt="facebook-logo" height="24" src="https://codedmails.com/images/social/black/facebook-logo-transparent-black.png" style="border-radius:3px;display:block;" width="24" />
//                                             </a>
//                                           </td>
//                                         </tr>
//                                       </tbody></table>
//                                     </td>
//                                   </tr>
//                                 </tbody></table>
//                                 <!--[if mso | IE]>
//               </td>
            
//               <td>
//             <![endif]-->
//                                 <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
//                                   <tbody><tr>
//                                     <td style="padding:4px;">
//                                       <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:24px;">
//                                         <tbody><tr>
//                                           <td style="font-size:0;height:24px;vertical-align:middle;width:24px;">
//                                             <a href="#" target="_blank" style="color: #428dfc; text-decoration: none; font-weight: bold;">
//                                               <img alt="instagram-logo" height="24" src="https://codedmails.com/images/social/black/instagram-logo-transparent-black.png" style="border-radius:3px;display:block;" width="24" />
//                                             </a>
//                                           </td>
//                                         </tr>
//                                       </tbody></table>
//                                     </td>
//                                   </tr>
//                                 </tbody></table>
//                                 <!--[if mso | IE]>
//               </td>
            
//               <td>
//             <![endif]-->
//                                 <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
//                                   <tbody><tr>
//                                     <td style="padding:4px;">
//                                       <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:24px;">
//                                         <tbody><tr>
//                                           <td style="font-size:0;height:24px;vertical-align:middle;width:24px;">
//                                             <a href="#" target="_blank" style="color: #428dfc; text-decoration: none; font-weight: bold;">
//                                               <img alt="dribbble-logo" height="24" src="https://codedmails.com/images/social/black/linkedin-logo-transparent-black.png" style="border-radius:3px;display:block;" width="24" />
//                                             </a>
//                                           </td>
//                                         </tr>
//                                       </tbody></table>
//                                     </td>
//                                   </tr>
//                                 </tbody></table>
//                                 <!--[if mso | IE]>
//               </td>
            
//           </tr>
//         </table>
//       <![endif]-->
//                               </td>
//                             </tr>
//                             <tr>
//                               <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
//                                 <div style="font-family:Quattrocento;font-size:16px;font-weight:400;line-height:24px;text-align:center;color:#000;">Update your <a class="footer-link" href="https://google.com" style="text-decoration: none; color: #000; font-weight: 400;">email preferences</a> to choose the types of emails you receive, or you can <a class="footer-link" href="https://google.com" style="text-decoration: none; color: #000; font-weight: 400;"> unsubscribe </a>from all future emails.</div>
//                               </td>
//                             </tr>
//                           </tbody></table>
//                         </div>
//                         <!--[if mso | IE]>
//             </td>
          
//         </tr>
      
//                   </table>
//                 <![endif]-->
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//               <!--[if mso | IE]>
//           </td>
//         </tr>
//       </table>
      
//               </td>
//             </tr>
          
//             <tr>
//               <td
//                  class="" width="600px"
//               >
          
//       <table
//          align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
//       >
//         <tr>
//           <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
//       <![endif]-->
//               <div style="margin:0px auto;max-width:600px;">
//                 <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
//                   <tbody>
//                     <tr>
//                       <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
//                         <!--[if mso | IE]>
//                   <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
//         <tr>
      
//             <td
//                class="" style="vertical-align:top;width:600px;"
//             >
//           <![endif]-->
//                         <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
//                           <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
//                             <tbody><tr>
//                               <td style="font-size:0px;word-break:break-word;">
//                                 <!--[if mso | IE]>
    
//         <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td height="1" style="vertical-align:top;height:1px;">
      
//     <![endif]-->
//                                 <div style="height:1px;">   </div>
//                                 <!--[if mso | IE]>
    
//         </td></tr></table>
      
//     <![endif]-->
//                               </td>
//                             </tr>
//                           </tbody></table>
//                         </div>
//                         <!--[if mso | IE]>
//             </td>
          
//         </tr>
      
//                   </table>
//                 <![endif]-->
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//               <!--[if mso | IE]>
//           </td>
//         </tr>
//       </table>
      
//               </td>
//             </tr>
          
//                   </table>
//                 <![endif]-->
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//     <!--[if mso | IE]>
//           </td>
//         </tr>
//       </table>
//       <![endif]-->
//   </div>


// </body></html>  
//   `;

  try {
    await sendEmail(
      "Welcome To Silver Spoon",
      message,
      user.email,
      process.env.EMAIL_USER,
      process.env.EMAIL_USER
    );
  } catch (error) {
    const applicationError = new ApplicationError(
      "An error occured while sending your password reset token. Try again later!",
      500
    );

    return next(applicationError);
  }

  // Remove password from response
  // user.email = undefined;
  // user.role = undefined;
  user.password = undefined;
  user.createdAt = undefined;
  user.__v = undefined;

  // Send response
  createAndSendToken(res, 201, user);
});

exports.login = catchAsyncFn(async (req, res, next) => {
  // 1. Retrieve email and password
  const { email, password } = req.body;

  // 2. Verify that both data was provided
  if (!email || !password) {
    // Create a new instance of an application error
    const applicationError = new ApplicationError(
      "Email and password are required. Try again",
      400
    );

    return next(applicationError);
  }

  // 3. Find current user
  const user = await User.findOne({ email, active: true }).select(
    "+email +password"
  );

  // 4. Assuming no user was found with the given email
  if (!user || !(await user.comparePassword(password, user.password))) {
    const applicationError = new ApplicationError(
      "Invalid email or password. Try again."
    );

    return next(applicationError);
  }

  // Remove email and password
  // user.email = undefined;
  user.password = undefined;
  user.active = undefined;
  user.__v = undefined;

  // Send response
  createAndSendToken(res, 200, user);
});

exports.protect = catchAsyncFn(async (req, res, next) => {
  // 1. Retrieve cookie
  let token;

  if (req.headers && req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    const applicationError = new ApplicationError(
      "You are not logged in. Please login and try again",
      401
    );

    return next(applicationError);
  }

  // 2. Use cookie to find user (Verify token)
  const decodedPayload = await util.promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );

  const user = await User.findById(decodedPayload.id).select(
    "+email +role +passwordChangedAt"
  );

  // 3. Verify that the user was not deleted after token was sent
  if (!user) {
    const applicationError = new ApplicationError(
      "This user no longer exist in our application. Try again",
      401
    );

    return next(applicationError);
  }

  // 4. Verify that password was not changed after token was sent
  if (user.wasPasswordChanged(decodedPayload.iat)) {
    const applicationError = new ApplicationError(
      "Your password was recently changed. Please login back in using new password.",
      401
    );

    return next(applicationError);
  }

  // 6. Add user to the request object
  req.user = user;

  // 7. Call the next middleware in the stack
  next();
});

exports.checkAuth = catchAsyncFn(async (req, res, next) => {
  // 1. Retrieve cookie
  let token;

  if (req.headers && req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.status(401).json({
      status: "fail",
      isAuthenticated: false,
      data: null,
    });
  }

  // 2. Use cookie to find user (Verify token)
  const decodedPayload = await util.promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );

  const user = await User.findById(decodedPayload.id).select(
    "+email +passwordChangedAt"
  );

  // 3. Verify that the user was not deleted after token was sent
  if (!user) {
    return res.status(401).json({
      status: "fail",
      isAuthenticated: false,
      data: null,
    });
  }

  // 4. Verify that password was not changed after token was sent
  if (user.wasPasswordChanged(decodedPayload.iat)) {
    return res.status(401).json({
      status: "fail",
      isAuthenticated: false,
      data: null,
    });
  }

  return res.status(200).json({
    status: "success",
    isAuthenticated: true,
    data: {
      user,
    },
  });
});

exports.restrictTo = (...args) => {
  return (req, res, next) => {
    if (!args.includes(req.user.role)) {
      const applicationError = new ApplicationError(
        "Your are not allowed to access / perform actions on this resource",
        403
      );

      return next(applicationError);
    }

    next();
  };
};

exports.checkDisplayAuth = catchAsyncFn(async (req, res, next) => {
  // 1. Retrieve cookie
  let token;

  if (req.headers && req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next();
  }

  // 2. Use cookie to find user (Verify token)
  const decodedPayload = await util.promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );

  const user = await User.findById(decodedPayload.id).select("+role");

  if (!user) {
    return next();
  }

  req.user = user;

  next();
});

exports.displayTo = (...args) => {
  return (req, res, next) => {
    // console.log(req?.user?.role);
    // console.log(req.user);
    if (!args.includes(req?.user?.role)) {
      // console.log("Herere");
      req.showMeals = {
        secretMeal: {
          $ne: true,
        },
      };
      return next();
    } else {
      // console.log("Therere");
      req.showMeals = {};
      next();
    }
  };
};

exports.forgotPassword = catchAsyncFn(async (req, res, next) => {
  // 1. Retrieve email from user
  const { email } = req.body;

  if (!email) {
    const applicationError = new ApplicationError(
      "Email is required to reset password. Try again.",
      400
    );

    return next(applicationError);
  }

  // 2. Find user thru the provided email
  const user = await User.findOne({ email }).select("+email");

  if (!user) {
    const applicationError = new ApplicationError(
      "No user was found with the provided email. Try again.",
      404
    );

    return next(applicationError);
  }

  // 3. Generate new password token
  const resetToken = user.generateResetToken();

  await user.save({ validateBeforeSave: false });

  // 4. Send new password token via email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/reset/password/${resetToken}`;

  const message = `
    <!DOCTYPE html><html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head>
  <title> Welcome to Silver Spoon </title>
  <!--[if !mso]><!-- -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <!--<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style type="text/css">
    #outlook a {
      padding: 0;
    }

    body {
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    table,
    td {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }

    p {
      display: block;
      margin: 13px 0;
    }
  </style>
  <!--[if mso]>
        <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
  <!--[if lte mso 11]>
        <style type="text/css">
          .mj-outlook-group-fix { width:100% !important; }
        </style>
        <![endif]-->
  <!--[if !mso]><!-->
  <link href="https://fonts.googleapis.com/css2?family=Quattrocento:wght@400;700&amp;display=swap" rel="stylesheet" type="text/css" />
  <style type="text/css">
    @import url(https://fonts.googleapis.com/css2?family=Quattrocento:wght@400;700&amp;display=swap);
  </style>
  <!--<![endif]-->
  <style type="text/css">
    @media only screen and (min-width:480px) {
      .mj-column-per-100 {
        width: 100% !important;
        max-width: 100%;
      }
    }
  </style>
  <style type="text/css">
    @media only screen and (max-width:480px) {
      table.mj-full-width-mobile {
        width: 100% !important;
      }

      td.mj-full-width-mobile {
        width: auto !important;
      }
    }
  </style>
  <style type="text/css">
    a,
    span,
    td,
    th {
      -webkit-font-smoothing: antialiased !important;
      -moz-osx-font-smoothing: grayscale !important;
    }
  </style>
</head>

<body style="background-color:#d7456b;">
  <div style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;"> Preview - Welcome to Silver Spoon</div>
  <div style="background-color:#d7456b;">
    <!--[if mso | IE]>
      <table
         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
      >
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
    <div style="margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;text-align:center;">
              <!--[if mso | IE]>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
        <tr>
      
        </tr>
      
                  </table>
                <![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]>
          </td>
        </tr>
      </table>
      
      <table
         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
      >
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
    <div style="margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
              <!--[if mso | IE]>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
            <tr>
              <td
                 class="" width="600px"
              >
          
      <table
         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
      >
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
              <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;border-radius:8px 8px 0 0;max-width:600px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;border-radius:8px 8px 0 0;">
                  <tbody>
                    <tr>
                      <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;text-align:center;">
                        <!--[if mso | IE]>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
        <tr>
      
            <td
               class="" style="vertical-align:middle;width:600px;"
            >
          <![endif]-->
                        <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:middle;" width="100%">
                            <tbody><tr>
                              <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                  <tbody>
                                    <tr>
                                      <td style="width:150px;">
                                        <img alt="Logo" height="auto" src="https://firebasestorage.googleapis.com/v0/b/silver-spoon-21910.appspot.com/o/silver-spoon-logo.png?alt=media&token=e1fed8dd-2ee6-472e-9241-0fd91a42dce4" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:14px;" width="150" />
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                <p style="border-top: solid 4px #f9f9f9; font-size: 1px; margin: 0px auto; width: 100%;">
                                </p>
                                <!--[if mso | IE]>
        <table
           align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 4px #f9f9f9;font-size:1px;margin:0px auto;width:550px;" role="presentation" width="550px"
        >
          <tr>
            <td style="height:0;line-height:0;">
              &nbsp;
            </td>
          </tr>
        </table>
      <![endif]-->
                              </td>
                            </tr>
                          </tbody></table>
                        </div>
                        <!--[if mso | IE]>
            </td>
          
        </tr>
      
                  </table>
                <![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]>
          </td>
        </tr>
      </table>
      
              </td>
            </tr>
          
            <tr>
              <td
                 class="" width="600px"
              >
          
      <table
         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
      >
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
              <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;border-radius:0 0 8px 8px;max-width:600px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;border-radius:0 0 8px 8px;">
                  <tbody>
                    <tr>
                      <td style="direction:ltr;font-size:0px;padding:20px 0;padding-top:0px;text-align:center;">
                        <!--[if mso | IE]>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
        <tr>
      
            <td
               class="" style="vertical-align:top;width:600px;"
            >
          <![endif]-->
                        <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                            <tbody><tr>
                              <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                  <tbody>
                                    <tr>
                                      <td style="width:150px;">
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td align="right" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                <div style="font-family:Quattrocento;font-size:14px;font-weight:400;line-height:24px;text-align:right;color:#000000;"><a href="#" style="color: #428dfc; text-decoration: none; font-weight: bold;"></a></div>
                              </td>
                            </tr>
                            <tr>
                              <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                <div style="font-family:Quattrocento;font-size:18px;font-weight:400;line-height:24px;text-align:left;color:#000000;">
                                  <h1 style="margin: 0; font-size: 32px; line-height: 40px; font-weight: 700;">Reset Password</h1>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                <div style="font-family:Quattrocento;font-size:18px;font-weight:400;line-height:24px;text-align:left;color:#000000;">
                                  <p style="margin: 0;">Hi ${
                                    user.name.split(" ")[0]
                                  },</p>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                <div style="font-family:Quattrocento;font-size:18px;font-weight:400;line-height:24px;text-align:left;color:#000000;">
                                  <p style="margin: 0;"> We’ve received a request to reset the password for your Silver Spoon account associated with ${
                                    user.email
                                  }. No changes have been made to your account yet. You can reset your password by clicking the link below: </p>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td align="center" vertical-align="middle" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                                  <tbody><tr>
                                    <td align="center" bgcolor="#428dfc" role="presentation" style="border:none;border-radius:3px;cursor:auto;mso-padding-alt:10px 25px;background:#428dfc;" valign="middle">
                                      <a href=${resetURL} style="display: inline-block; background: #66ba30; color: #000; font-family: Quattrocento; font-size: 14px; font-weight: bold; line-height: 30px; margin: 0; text-decoration: none; text-transform: uppercase; padding: 10px 25px; mso-padding-alt: 0px; border-radius: 3px;" target="_blank"> Reset my password </a>
                                    </td>
                                  </tr>
                                </tbody></table>
                              </td>
                            </tr>
                            <tr>
                              <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                <div style="font-family:Quattrocento;font-size:16px;font-weight:400;line-height:24px;text-align:center;color:#000;">Didn't requested the password reset? Please disregard this email<a href="#" style="color: #428dfc; text-decoration: none; font-weight: bold;"></a></div>
                              </td>
                            </tr>
                          </tbody></table>
                        </div>
                        <!--[if mso | IE]>
            </td>
          
        </tr>
      
                  </table>
                <![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]>
          </td>
        </tr>
      </table>
      
              </td>
            </tr>
          
            <tr>
              <td
                 class="" width="600px"
              >
          
      <table
         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
      >
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
              <div style="margin:0px auto;max-width:600px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                  <tbody>
                    <tr>
                      <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                        <!--[if mso | IE]>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
        <tr>
      
            <td
               class="" style="vertical-align:top;width:600px;"
            >
          <![endif]-->
                        <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                            <tbody><tr>
                              <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                <div style="font-family:Quattrocento;font-size:16px;font-weight:400;line-height:24px;text-align:center;color:#000;"><a class="footer-link" href="#" style="text-decoration: none; color: #000; font-weight: 400;">Support</a>   |   <a class="footer-link" href="#" style="text-decoration: none; color: #000; font-weight: 400;">Forums</a>   |  <a class="footer-link" href="#" style="text-decoration: none; color: #000; font-weight: 400;">Contact</a>   |  <a class="footer-link" href="#" style="text-decoration: none; color: #000; font-weight: 400;">Log In</a></div>
                              </td>
                            </tr>
                            <tr>
                              <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                <div style="font-family:Quattrocento;font-size:16px;font-weight:400;line-height:24px;text-align:center;color:#333333;">123 Main St., Dallas, GA 30132<br /> © 2024 ColdFusion Technology.</div>
                              </td>
                            </tr>
                            <tr>
                              <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                <!--[if mso | IE]>
      <table
         align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
      >
        <tr>
      
              <td>
            <![endif]-->
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                                  <tbody><tr>
                                    <td style="padding:4px;">
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:24px;">
                                        <tbody><tr>
                                          <td style="font-size:0;height:24px;vertical-align:middle;width:24px;">
                                            <a href="#" target="_blank" style="color: #428dfc; text-decoration: none; font-weight: bold;">
                                              <img alt="twitter-logo" height="24" src="https://codedmails.com/images/social/black/twitter-logo-transparent-black.png" style="border-radius:3px;display:block;" width="24" />
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody></table>
                                    </td>
                                  </tr>
                                </tbody></table>
                                <!--[if mso | IE]>
              </td>
            
              <td>
            <![endif]-->
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                                  <tbody><tr>
                                    <td style="padding:4px;">
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:24px;">
                                        <tbody><tr>
                                          <td style="font-size:0;height:24px;vertical-align:middle;width:24px;">
                                            <a href="#" target="_blank" style="color: #428dfc; text-decoration: none; font-weight: bold;">
                                              <img alt="facebook-logo" height="24" src="https://codedmails.com/images/social/black/facebook-logo-transparent-black.png" style="border-radius:3px;display:block;" width="24" />
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody></table>
                                    </td>
                                  </tr>
                                </tbody></table>
                                <!--[if mso | IE]>
              </td>
            
              <td>
            <![endif]-->
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                                  <tbody><tr>
                                    <td style="padding:4px;">
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:24px;">
                                        <tbody><tr>
                                          <td style="font-size:0;height:24px;vertical-align:middle;width:24px;">
                                            <a href="#" target="_blank" style="color: #428dfc; text-decoration: none; font-weight: bold;">
                                              <img alt="instagram-logo" height="24" src="https://codedmails.com/images/social/black/instagram-logo-transparent-black.png" style="border-radius:3px;display:block;" width="24" />
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody></table>
                                    </td>
                                  </tr>
                                </tbody></table>
                                <!--[if mso | IE]>
              </td>
            
              <td>
            <![endif]-->
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                                  <tbody><tr>
                                    <td style="padding:4px;">
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:24px;">
                                        <tbody><tr>
                                          <td style="font-size:0;height:24px;vertical-align:middle;width:24px;">
                                            <a href="#" target="_blank" style="color: #428dfc; text-decoration: none; font-weight: bold;">
                                              <img alt="dribbble-logo" height="24" src="https://codedmails.com/images/social/black/linkedin-logo-transparent-black.png" style="border-radius:3px;display:block;" width="24" />
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody></table>
                                    </td>
                                  </tr>
                                </tbody></table>
                                <!--[if mso | IE]>
              </td>
            
          </tr>
        </table>
      <![endif]-->
                              </td>
                            </tr>
                            <tr>
                              <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                <div style="font-family:Quattrocento;font-size:16px;font-weight:400;line-height:24px;text-align:center;color:#000;">Update your <a class="footer-link" href="https://google.com" style="text-decoration: none; color: #000; font-weight: 400;">email preferences</a> to choose the types of emails you receive, or you can <a class="footer-link" href="https://google.com" style="text-decoration: none; color: #000; font-weight: 400;"> unsubscribe </a>from all future emails.</div>
                              </td>
                            </tr>
                          </tbody></table>
                        </div>
                        <!--[if mso | IE]>
            </td>
          
        </tr>
      
                  </table>
                <![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]>
          </td>
        </tr>
      </table>
      
              </td>
            </tr>
          
            <tr>
              <td
                 class="" width="600px"
              >
          
      <table
         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
      >
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
              <div style="margin:0px auto;max-width:600px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                  <tbody>
                    <tr>
                      <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                        <!--[if mso | IE]>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
        <tr>
      
            <td
               class="" style="vertical-align:top;width:600px;"
            >
          <![endif]-->
                        <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                            <tbody><tr>
                              <td style="font-size:0px;word-break:break-word;">
                                <!--[if mso | IE]>
    
        <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td height="1" style="vertical-align:top;height:1px;">
      
    <![endif]-->
                                <div style="height:1px;">   </div>
                                <!--[if mso | IE]>
    
        </td></tr></table>
      
    <![endif]-->
                              </td>
                            </tr>
                          </tbody></table>
                        </div>
                        <!--[if mso | IE]>
            </td>
          
        </tr>
      
                  </table>
                <![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]>
          </td>
        </tr>
      </table>
      
              </td>
            </tr>
          
                  </table>
                <![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]>
          </td>
        </tr>
      </table>
      <![endif]-->
  </div>


</body></html>  
  `;

  try {
    await sendEmail(
      "Forgot password? (Token valid for 10 minutes)",
      message,
      user.email,
      process.env.EMAIL_USER,
      process.env.EMAIL_USER
    );

    res.status(200).json({
      status: "success",
      data: {
        message:
          "A password reset token was successfully sent to your email on file",
      },
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpirationDate = undefined;
    user.save({ validateBeforeSave: true });

    const applicationError = new ApplicationError(
      "An error occured while sending your password reset token. Try again later!",
      500
    );

    return next(applicationError);
  }

  // 5. Send response
});

exports.resetPassword = catchAsyncFn(async (req, res, next) => {
  const { password, passwordConfirm } = req.body;

  if (!password || !passwordConfirm) {
    const applicationError = new ApplicationError(
      "Both password and confirm password fields are required to reset your password. Try again",
      400
    );

    return next(applicationError);
  }

  const resetToken = req.params.resetToken;

  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetTokenExpiresIn: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    const applicationError = new ApplicationError(
      "Invalid or expired token. Try again",
      400
    );

    return next(applicationError);
  }

  // 4. Update password
  user.password = password;
  user.passwordConfirm = passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpiresIn = undefined;

  await user.save();

  user.password = undefined;
  user.passwordChangedAt = undefined;

  const message = "Congratulations! Your password reset was successful.";

  createAndSendToken(res, 200, user, message);
});

// Update current user password
exports.updatePassword = catchAsyncFn(async (req, res, next) => {
  // 1. Retrieve current password and new password
  const { currentPassword, newPassword, newPasswordConfirm } = req.body;

  if (!currentPassword || !newPassword || !newPasswordConfirm) {
    const applicationError = new ApplicationError(
      "All fields are required to update your password. Try again!",
      401
    );

    return next(applicationError);
  }

  // 2. Find the current user
  const user = await User.findById(req.user._id).select("+password");

  if (!(await user.comparePassword(currentPassword, user.password))) {
    const applicationError = new ApplicationError(
      "Your password does not match the one we have on file. Try again.",
      401
    );

    return next(applicationError);
  }

  // Updat password
  user.password = newPassword;
  user.passwordConfirm = newPasswordConfirm;

  await user.save();

  user.password = undefined;
  user.active = undefined;
  user.passwordChangedAt = undefined;
  user.__v = undefined;

  createAndSendToken(res, 200, user);
});

exports.googleAuth = catchAsyncFn(async (req, res, next) => {
  const { name, email, photo } = req.body;

  const user = await User.findOne({ email }).select("+email");

  if (user) {
    createAndSendToken(res, 200, user);
  } else {
    // 3. IF USER DOES NOT EXIST
    const generatePassword = crypto.randomBytes(8).toString("hex");

    const password = await bcrypt.hash(generatePassword, 14);

    const passwordConfirm = password;

    const user = await User.create({
      name:
        name.split(" ")[0]?.[0]?.toUpperCase() + name.split(" ")[0].slice(1),
      email,
      photo,
      password,
      passwordConfirm,
    });

    user.password = undefined;

    const browseURL = `${req.protocol}://${req.get("host")}/`;

    const message = `
    <!DOCTYPE html><html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head>
  <title> Welcome to Silver Spoon </title>
  <!--[if !mso]><!-- -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <!--<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style type="text/css">
    #outlook a {
      padding: 0;
    }

    body {
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    table,
    td {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }

    p {
      display: block;
      margin: 13px 0;
    }
  </style>
  <!--[if mso]>
        <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
  <!--[if lte mso 11]>
        <style type="text/css">
          .mj-outlook-group-fix { width:100% !important; }
        </style>
        <![endif]-->
  <!--[if !mso]><!-->
  <link href="https://fonts.googleapis.com/css2?family=Quattrocento:wght@400;700&amp;display=swap" rel="stylesheet" type="text/css" />
  <style type="text/css">
    @import url(https://fonts.googleapis.com/css2?family=Quattrocento:wght@400;700&amp;display=swap);
  </style>
  <!--<![endif]-->
  <style type="text/css">
    @media only screen and (min-width:480px) {
      .mj-column-per-100 {
        width: 100% !important;
        max-width: 100%;
      }
    }
  </style>
  <style type="text/css">
    @media only screen and (max-width:480px) {
      table.mj-full-width-mobile {
        width: 100% !important;
      }

      td.mj-full-width-mobile {
        width: auto !important;
      }
    }
  </style>
  <style type="text/css">
    a,
    span,
    td,
    th {
      -webkit-font-smoothing: antialiased !important;
      -moz-osx-font-smoothing: grayscale !important;
    }
  </style>
</head>

<body style="background-color:#d7456b;">
  <div style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;"> Preview - Welcome to Silver Spoon</div>
  <div style="background-color:#d7456b;">
    <!--[if mso | IE]>
      <table
         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
      >
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
    <div style="margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;text-align:center;">
              <!--[if mso | IE]>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
        <tr>
      
        </tr>
      
                  </table>
                <![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]>
          </td>
        </tr>
      </table>
      
      <table
         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
      >
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
    <div style="margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
              <!--[if mso | IE]>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
            <tr>
              <td
                 class="" width="600px"
              >
          
      <table
         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
      >
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
              <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;border-radius:8px 8px 0 0;max-width:600px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;border-radius:8px 8px 0 0;">
                  <tbody>
                    <tr>
                      <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;text-align:center;">
                        <!--[if mso | IE]>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
        <tr>
      
            <td
               class="" style="vertical-align:middle;width:600px;"
            >
          <![endif]-->
                        <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:middle;" width="100%">
                            <tbody><tr>
                              <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                  <tbody>
                                    <tr>
                                      <td style="width:150px;">
                                        <img alt="Logo" height="auto" src="https://firebasestorage.googleapis.com/v0/b/silver-spoon-21910.appspot.com/o/silver-spoon-logo.png?alt=media&token=e1fed8dd-2ee6-472e-9241-0fd91a42dce4" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:14px;" width="150" />
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                <p style="border-top: solid 4px #f9f9f9; font-size: 1px; margin: 0px auto; width: 100%;">
                                </p>
                                <!--[if mso | IE]>
        <table
           align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 4px #f9f9f9;font-size:1px;margin:0px auto;width:550px;" role="presentation" width="550px"
        >
          <tr>
            <td style="height:0;line-height:0;">
              &nbsp;
            </td>
          </tr>
        </table>
      <![endif]-->
                              </td>
                            </tr>
                          </tbody></table>
                        </div>
                        <!--[if mso | IE]>
            </td>
          
        </tr>
      
                  </table>
                <![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]>
          </td>
        </tr>
      </table>
      
              </td>
            </tr>
          
            <tr>
              <td
                 class="" width="600px"
              >
          
      <table
         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
      >
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
              <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;border-radius:0 0 8px 8px;max-width:600px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;border-radius:0 0 8px 8px;">
                  <tbody>
                    <tr>
                      <td style="direction:ltr;font-size:0px;padding:20px 0;padding-top:0px;text-align:center;">
                        <!--[if mso | IE]>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
        <tr>
      
            <td
               class="" style="vertical-align:top;width:600px;"
            >
          <![endif]-->
                        <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                            <tbody><tr>
                              <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                  <tbody>
                                    <tr>
                                      <td style="width:150px;">
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td align="right" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                <div style="font-family:Quattrocento;font-size:14px;font-weight:400;line-height:24px;text-align:right;color:#000000;"><a href="#" style="color: #428dfc; text-decoration: none; font-weight: bold;"></a></div>
                              </td>
                            </tr>
                            <tr>
                              <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                <div style="font-family:Quattrocento;font-size:18px;font-weight:400;line-height:24px;text-align:left;color:#000000;">
                                  <h1 style="margin: 0; font-size: 32px; line-height: 40px; font-weight: 700;">Welcome to the Silver Spoon Family</h1>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                <div style="font-family:Quattrocento;font-size:18px;font-weight:400;line-height:24px;text-align:left;color:#000000;">
                                  <p style="margin: 0;">Hi ${
                                    user.name.split(" ")[0]
                                  },</p>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                <div style="font-family:Quattrocento;font-size:18px;font-weight:400;line-height:24px;text-align:left;color:#000000;">
                                  <p style="margin: 0;"> Welcome to the Silver Spoon family! We are glad you chose to join us for your catering needs and quick bits. Feel free to contact us if you have any questions regarding our services.</p>
                                  <p>Best Regards, ${user.name}!</p>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td align="center" vertical-align="middle" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                                  <tbody><tr>
                                    <td align="center" bgcolor="#428dfc" role="presentation" style="border:none;border-radius:3px;cursor:auto;mso-padding-alt:10px 25px;background:#428dfc;" valign="middle">
                                      <a href=${browseURL} style="display: inline-block; background: #66ba30; color: #000; font-family: Quattrocento; font-size: 14px; font-weight: bold; line-height: 30px; margin: 0; text-decoration: none; text-transform: uppercase; padding: 10px 25px; mso-padding-alt: 0px; border-radius: 3px;" target="_blank"> Browse Silver Spoon</a>
                                    </td>
                                  </tr>
                                </tbody></table>
                              </td>
                            </tr>
                            <tr>
                              <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                <div style="font-family:Quattrocento;font-size:16px;font-weight:400;line-height:24px;text-align:center;color:#000;">Didn't requested the password reset? Please disregard this email<a href="#" style="color: #428dfc; text-decoration: none; font-weight: bold;"></a></div>
                              </td>
                            </tr>
                          </tbody></table>
                        </div>
                        <!--[if mso | IE]>
            </td>
          
        </tr>
      
                  </table>
                <![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]>
          </td>
        </tr>
      </table>
      
              </td>
            </tr>
          
            <tr>
              <td
                 class="" width="600px"
              >
          
      <table
         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
      >
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
              <div style="margin:0px auto;max-width:600px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                  <tbody>
                    <tr>
                      <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                        <!--[if mso | IE]>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
        <tr>
      
            <td
               class="" style="vertical-align:top;width:600px;"
            >
          <![endif]-->
                        <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                            <tbody><tr>
                              <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                <div style="font-family:Quattrocento;font-size:16px;font-weight:400;line-height:24px;text-align:center;color:#000;"><a class="footer-link" href="#" style="text-decoration: none; color: #000; font-weight: 400;">Support</a>   |   <a class="footer-link" href="#" style="text-decoration: none; color: #000; font-weight: 400;">Forums</a>   |  <a class="footer-link" href="#" style="text-decoration: none; color: #000; font-weight: 400;">Contact</a>   |  <a class="footer-link" href="#" style="text-decoration: none; color: #000; font-weight: 400;">Log In</a></div>
                              </td>
                            </tr>
                            <tr>
                              <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                <div style="font-family:Quattrocento;font-size:16px;font-weight:400;line-height:24px;text-align:center;color:#333333;">123 Main St., Dallas, GA 30132<br /> © 2024 ColdFusion Technology.</div>
                              </td>
                            </tr>
                            <tr>
                              <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                <!--[if mso | IE]>
      <table
         align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
      >
        <tr>
      
              <td>
            <![endif]-->
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                                  <tbody><tr>
                                    <td style="padding:4px;">
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:24px;">
                                        <tbody><tr>
                                          <td style="font-size:0;height:24px;vertical-align:middle;width:24px;">
                                            <a href="#" target="_blank" style="color: #428dfc; text-decoration: none; font-weight: bold;">
                                              <img alt="twitter-logo" height="24" src="https://codedmails.com/images/social/black/twitter-logo-transparent-black.png" style="border-radius:3px;display:block;" width="24" />
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody></table>
                                    </td>
                                  </tr>
                                </tbody></table>
                                <!--[if mso | IE]>
              </td>
            
              <td>
            <![endif]-->
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                                  <tbody><tr>
                                    <td style="padding:4px;">
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:24px;">
                                        <tbody><tr>
                                          <td style="font-size:0;height:24px;vertical-align:middle;width:24px;">
                                            <a href="#" target="_blank" style="color: #428dfc; text-decoration: none; font-weight: bold;">
                                              <img alt="facebook-logo" height="24" src="https://codedmails.com/images/social/black/facebook-logo-transparent-black.png" style="border-radius:3px;display:block;" width="24" />
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody></table>
                                    </td>
                                  </tr>
                                </tbody></table>
                                <!--[if mso | IE]>
              </td>
            
              <td>
            <![endif]-->
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                                  <tbody><tr>
                                    <td style="padding:4px;">
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:24px;">
                                        <tbody><tr>
                                          <td style="font-size:0;height:24px;vertical-align:middle;width:24px;">
                                            <a href="#" target="_blank" style="color: #428dfc; text-decoration: none; font-weight: bold;">
                                              <img alt="instagram-logo" height="24" src="https://codedmails.com/images/social/black/instagram-logo-transparent-black.png" style="border-radius:3px;display:block;" width="24" />
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody></table>
                                    </td>
                                  </tr>
                                </tbody></table>
                                <!--[if mso | IE]>
              </td>
            
              <td>
            <![endif]-->
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                                  <tbody><tr>
                                    <td style="padding:4px;">
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:24px;">
                                        <tbody><tr>
                                          <td style="font-size:0;height:24px;vertical-align:middle;width:24px;">
                                            <a href="#" target="_blank" style="color: #428dfc; text-decoration: none; font-weight: bold;">
                                              <img alt="dribbble-logo" height="24" src="https://codedmails.com/images/social/black/linkedin-logo-transparent-black.png" style="border-radius:3px;display:block;" width="24" />
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody></table>
                                    </td>
                                  </tr>
                                </tbody></table>
                                <!--[if mso | IE]>
              </td>
            
          </tr>
        </table>
      <![endif]-->
                              </td>
                            </tr>
                            <tr>
                              <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                <div style="font-family:Quattrocento;font-size:16px;font-weight:400;line-height:24px;text-align:center;color:#000;">Update your <a class="footer-link" href="https://google.com" style="text-decoration: none; color: #000; font-weight: 400;">email preferences</a> to choose the types of emails you receive, or you can <a class="footer-link" href="https://google.com" style="text-decoration: none; color: #000; font-weight: 400;"> unsubscribe </a>from all future emails.</div>
                              </td>
                            </tr>
                          </tbody></table>
                        </div>
                        <!--[if mso | IE]>
            </td>
          
        </tr>
      
                  </table>
                <![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]>
          </td>
        </tr>
      </table>
      
              </td>
            </tr>
          
            <tr>
              <td
                 class="" width="600px"
              >
          
      <table
         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
      >
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
              <div style="margin:0px auto;max-width:600px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                  <tbody>
                    <tr>
                      <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                        <!--[if mso | IE]>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
        <tr>
      
            <td
               class="" style="vertical-align:top;width:600px;"
            >
          <![endif]-->
                        <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                            <tbody><tr>
                              <td style="font-size:0px;word-break:break-word;">
                                <!--[if mso | IE]>
    
        <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td height="1" style="vertical-align:top;height:1px;">
      
    <![endif]-->
                                <div style="height:1px;">   </div>
                                <!--[if mso | IE]>
    
        </td></tr></table>
      
    <![endif]-->
                              </td>
                            </tr>
                          </tbody></table>
                        </div>
                        <!--[if mso | IE]>
            </td>
          
        </tr>
      
                  </table>
                <![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]>
          </td>
        </tr>
      </table>
      
              </td>
            </tr>
          
                  </table>
                <![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]>
          </td>
        </tr>
      </table>
      <![endif]-->
  </div>


</body></html>  
  `;

    try {
      await sendEmail(
        "Welcome To Silver Spoon",
        message,
        user.email,
        process.env.EMAIL_USER,
        process.env.EMAIL_USER
      );
    } catch (error) {
      const applicationError = new ApplicationError(
        "An error occured while sending your password reset token. Try again later!",
        500
      );

      return next(applicationError);
    }

    createAndSendToken(res, 201, user);
  }
});

exports.logout = (req, res, next) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(Date.now() - 1000),
    });

    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

exports.compareId = function (Model, asyncFn) {
  return (req, res, next) => {
    req.Model = Model;
    return asyncFn(req, res, next).catch((error) => next(error));
  };
};