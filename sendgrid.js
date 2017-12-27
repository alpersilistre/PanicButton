const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  from: 'panic@button.com',
	subject: 'Test mail from Panic Button',
	text: 'Test mail from Panic Button project. This mail send with sendgrid API.',
	html: '<strong>Test mail from Panic Button project. This mail send with sendgrid API.</strong>'
};

function sendMail(to) {
	msg.to = 'alper_silistre@hotmail.com';
	console.log('api_key', process.env.SENDGRID_API_KEY);
	sgMail.send(msg);
}

module.exports = {
  sendMail  
};