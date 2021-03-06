'use strict';

const PropertyEnlistmentService = require('../services/PropertyEnlistmentService');
const log = require('../../server/logger');
/*
	Create Enlistment Function Requires the enlistment body.
*/
module.exports = {
  async createEnlistment(req, res) {
    const enlistment = await PropertyEnlistmentService.createEnlistment(req.body);

    log.info(`Enlistment created`);

    res.status(201).json(enlistment);
  },
/*
	Review Enlistment Function Requires the enlistment Id and the approve value {true}.
*/
  async approveEnlistment(req, res) {
    await PropertyEnlistmentService.approveEnlistment(req.params.id);

    log.info(`Enlistment with id: ${req.params.id} approved`);

    res.status(200).send();
  },
/*
	Review Enlistment Function Requires the enlistment Id and the approve value {false}.
*/
  async rejectEnlistment(req, res) {
    await PropertyEnlistmentService.rejectEnlistment(req.params.id);

    log.info(`Enlistment with id: ${req.params.id} rejected`);

    res.status(200).send();
  },
/*
    Find Enlistment Function based on its Ge oLocation.
*/
  async findInArea(req, res) {
    if (!req.query.latitude || !req.query.longitude) {
      throw new Error('Latitude and longitude are required');
    }

    const enlistments = await PropertyEnlistmentService.findInArea(
      parseFloat(req.query.latitude), parseFloat(req.query.longitude), parseFloat(req.query.distance)) || [];

    res.json(enlistments);
  }
};
