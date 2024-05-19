import express from 'express';
import * as certificateController from '../controllers/certificate.controller.js';

const router = express.Router();

// Create a new certificate
router.post('/', certificateController.createCertificate);

// Get all certificates
router.get('/', certificateController.getAllCertificates);

// Get a single certificate by id
router.get('/:id', certificateController.getCertificateById);

// Update a certificate by id
router.put('/:id', certificateController.updateCertificateById);

// Delete a certificate by id
router.delete('/:id', certificateController.deleteCertificateById);

export default router;
