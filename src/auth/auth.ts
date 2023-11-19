export interface RequestForAuthenticatedUser {
  user: { userId: number; username: string };
}

import type { User } from "@prisma/client";
export interface RequestForUnauthenticatedGuest {
  user: User;
}

export interface JWTValidationPayload {
  username: string;
  sub: number;
}
