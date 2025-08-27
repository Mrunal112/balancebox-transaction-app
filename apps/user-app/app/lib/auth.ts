import db from "@balancebox/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";

export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            email: { label: "Email", type: "email", placeholder: "john@example.com" },
            name: { label: "Name", type: "text", placeholder: "John Doe" },
            phone: { label: "Phone number", type: "text", placeholder: "1231231231" },
            password: { label: "Password", type: "password" },
            isSignup: { type: "hidden" } // To differentiate between login and signup
          },
          async authorize(credentials: any) {
            const isSignupMode = credentials.isSignup === 'true';
            
            if (isSignupMode) {
              // Signup logic
              if (!credentials.email || !credentials.name || !credentials.phone || !credentials.password) {
                throw new Error("All fields are required for signup");
              }

              const hashedPassword = await bcrypt.hash(credentials.password, 10);
              
              // Check if user already exists
              const existingUser = await db.user.findFirst({
                where: {
                  OR: [
                    { email: credentials.email },
                    { number: credentials.phone }
                  ]
                }
              });

              if (existingUser) {
                throw new Error("User already exists with this email or phone number");
              }

              try {
                const result = await db.$transaction(async (prisma) => {
                  // Create the user
                  const user = await prisma.user.create({
                    data: {
                      email: credentials.email,
                      name: credentials.name,
                      number: credentials.phone,
                      password: hashedPassword
                    }
                  });

                  // Create the initial balance record
                  await prisma.balance.create({
                    data: {
                      userId: user.id,
                      amount: 0,
                      locked: 0
                    }
                  });

                  return user;
                });
              
                return {
                  id: result.id.toString(),
                  name: result.name,
                  email: result.email
                }
              } catch(e) {
                console.error(e);
                throw new Error("Failed to create account");
              }
            } else {
              // Login logic
              if (!credentials.phone && !credentials.email) {
                throw new Error("Email or phone number is required");
              }
              if (!credentials.password) {
                throw new Error("Password is required");
              }

              const existingUser = await db.user.findFirst({
                where: {
                  OR: [
                    { email: credentials.email || "" },
                    { number: credentials.phone || "" }
                  ]
                }
              });

              if (!existingUser) {
                throw new Error("No account found with this email or phone number");
              }

              const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
              if (!passwordValidation) {
                throw new Error("Invalid password");
              }

              return {
                id: existingUser.id.toString(),
                name: existingUser.name,
                email: existingUser.email || existingUser.number
              }
            }
          },
        })
    ],
    pages: {
      signIn: '/auth/signin',
      signUp: '/auth/signup',
    },
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        // TODO: can u fix the type here? Using any is bad
        async session({ token, session }: any) {
            session.user.id = token.sub

            return session
        }
    }
  }
  