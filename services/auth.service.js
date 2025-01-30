const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { config } = require('../config/config');
const UserService = require('./user.service');
const service = new UserService();

class AuthService {
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.notFound('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.badRequest('Invalid password');
    }
    delete user.dataValues.password;
    delete user.dataValues.recoveryToken;

    return user;
  }

  singToken(user) {
    const payload = {
      sub: user.id,
      rol: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });
    return { token, user };
  }

  async sendRecovey(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.notFound('User not found');
    }
    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwtSecretRecovery, {
      expiresIn: '15min',
    });
    const link = `${config.frontUrl}/recovery-password/${token}`;
    await service.update(user.id, { recoveryToken: token });
    const mail = {
      from: config.email,
      to: `${user.email}`,
      subject: 'Password recovery',
      html: `<h1>Click on the following link to recover your password</h1>
      <a href="${link}">Recovery password</a>`,
    };
    const rta = await this.sendEmail(mail);
    return rta;
  }

  async sendEmail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true,
      port: 465,
      auth: {
        user: config.email,
        pass: config.password,
      },
    });
    await transporter.sendMail(infoMail);

    return { message: 'Email sent' };
  }

  async changePassword(token, newPassword) {
    const payload = jwt.verify(token, config.jwtSecretRecovery);
    console.log(payload);
    const user = await service.findOne(payload.sub);
    if (!user) {
      throw boom.notFound('User not found');
    }
    const hash = await bcrypt.hash(newPassword, 10);
    console.log(hash);
    await service.update(user.id, { recoveryToken: null, password: hash });
    return { message: 'Password changed' };
  }
}

module.exports = AuthService;
