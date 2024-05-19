import Certificate from '../models/certificate.model.js';

// Create a new certificate
export const createCertificate = async (req, res) => {
  const certificate = new Certificate(req.body);
  await certificate.save();
  res.status(201).json(certificate);
};

// Get all certificates
export const getAllCertificates = async (req, res) => {
  const certificates = await Certificate.find().populate('course').populate('user');
  res.json(certificates);
};

// Get a single certificate by id
export const getCertificateById = async (req, res) => {
  const certificate = await Certificate.findById(req.params.id).populate('course').populate('user');
  if (!certificate) {
    return res.status(404).json({ message: 'Certificate not found' });
  }
  res.json(certificate);
};

// Update a certificate by id
export const updateCertificateById = async (req, res) => {
  const certificate = await Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!certificate) {
    return res.status(404).json({ message: 'Certificate not found' });
  }
  res.json(certificate);
};

// Delete a certificate by id
export const deleteCertificateById = async (req, res) => {
  const certificate = await Certificate.findByIdAndDelete(req.params.id);
  if (!certificate) {
    return res.status(404).json({ message: 'Certificate not found' });
  }
  res.json({ message: 'Certificate deleted' });
};
