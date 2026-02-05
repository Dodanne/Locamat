export const isSuperAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "SUPER-ADMIN") {
    return res.status(403).json({ message: "Accès réservé au SUPER-ADMIN" });
  }
  next();
};
