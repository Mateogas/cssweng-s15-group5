function requireRole(...allowedRoles) {
  return (req, res, next) => {
    const user = req.session?.user;
    if (!user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    if (!allowedRoles.map(r => r.toLowerCase()).includes(user.role.toLowerCase())) {
      return res.status(403).json({ message: "Forbidden: Insufficient role" });
    }
    next();
  };
}

export default { requireRole };