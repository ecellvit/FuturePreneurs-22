import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const GOOGLE_AUTHORIZATION_URL =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({
    prompt: "consent",
    access_type: "offline",
    response_type: "code",
  });

const getTokenFromYourAPIServer = async (user, account) => {
  let tokenFromBackend;
  await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/auth/googleAuth`, {
    method: "POST",
    body: JSON.stringify({
      "token": account.id_token,
      "email": user.email,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(data => data.json()).then(data => {
    console.log(data)
    tokenFromBackend = data.accessToken;
  })
  return tokenFromBackend;
}

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        GOOGLE_AUTHORIZATION_URL,
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  jwt: {
    encryption: true,
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        return {
          idToken: account.id_token,
          accessToken: account.access_token,
          accessTokenExpires: account.expires_at * 1000,
          refreshToken: account.refresh_token,
          // accessTokenFromBackend: await getTokenFromYourAPIServer(user, account),
          user,
        };
      }

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }
      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.accessTokenBackend = token.accessTokenFromBackend;
      session.error = token.error;
      session.idToken = token.idToken;

      // if (token.accessTokenFromBackend) {
      //   return session;
      // }
      // return null;
      return session;
    },

    async signIn({ user, account }) {
      return true
    },
  },
  secret: process.env.SECRET,
});

async function refreshAccessToken(token) {
  try {
    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      });

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      idToken: refreshedTokens.id_token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}