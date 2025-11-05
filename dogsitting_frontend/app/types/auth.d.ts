declare module "#auth-utils" {
  interface User {
    id: string;
    email: string;
    emailVerified: boolean;
    firstName: string;
    lastName: string;
    nickname?: string;
    initials: string;
    organization: {
      id: string;
      name: string;
      domain: string;
    };
    tenants: Array<{
      id: string;
      name: string;
      domain: string;
    }>;
    currentTenantId?: string;
    createdAt?: string;
    updatedAt?: string;
  }

  interface UserSession {
    user: User;
    tokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
    loggedInAt: string;
  }

  interface SecureSessionData {
    // Add any secure data fields here if needed
    [key: string]: unknown;
  }
}

export {};
