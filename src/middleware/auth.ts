// import { auth } from "firebase-admin";
// import { NextApiRequest, NextApiResponse } from "next";
// import { adminAuth } from "@/firebaseAdmin";

// export interface AuthenticatedRequest extends NextApiRequest {
//   user?: auth.DecodedIdToken;
// }

// export async function authMiddleware(
//   req: AuthenticatedRequest,
//   res: NextApiResponse,
//   next: () => Promise<void>
// ) {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader?.startsWith("Bearer ")) {
//       return res.status(401).json({
//         status: 401,
//         code: "unauthorized",
//         name: "Unauthorized",
//         message: "User authentication failed",
//         error: "Invalid token",
//       });
//     }

//     const token = authHeader.split("Bearer ")[1];
//     const decodedToken = await adminAuth.verifyIdToken(token);
//     req.user = decodedToken;
//     await next();
//   } catch (error) {
//     console.error("authMiddleware error:", error);
//     return res.status(401).json({ error: "Invalid token" });
//   }
// }
