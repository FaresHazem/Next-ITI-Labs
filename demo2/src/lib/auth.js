import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "admin" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Simple verification for development
        if (credentials?.username === "admin" && credentials?.password === "admin") {
          return {
            id: "1",
            name: "Admin User",
            email: "admin@example.com",
            role: "admin"
          };
        }
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET || "super-secret-development-key-nextauth",
  pages: {
    signIn: "/auth/signin",
  }
};
