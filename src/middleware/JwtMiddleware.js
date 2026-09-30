import jwt from 'jsonwebtoken';
import { User} from "../models/index.js";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decoded.user_id).lean();
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }
    
    decoded.name = user.name

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token', code: "TOKEN_EXPIRED" });
  }
};

const checkPermission = (permissionString) => {
  return async (req, res, next) => {
    try {
      const user = req.user;
      if (!user) return res.status(401).json({ message: "Unauthorized" });

      // const userRole = await Roles.findById(user.role_id).lean();
      // if (!userRole) return res.status(403).json({ message: "Role not found" });

      const allowed = true;

      if (!allowed)
        return res.status(403).json({ message: "Permission denied" });

      next();
    } catch (err) {
      console.error("Error at checkPermission: ", err);
      return res.status(500).json({ message: "Server error" });
    }
  };
}

export { authMiddleware, checkPermission };
