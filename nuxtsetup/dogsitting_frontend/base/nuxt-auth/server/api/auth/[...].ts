import ZitadelProvider from "next-auth/providers/zitadel";
import CredentialsProvider from "next-auth/providers/credentials";
import { NuxtAuthHandler } from "#auth";
import { Issuer } from "openid-client";
import { type JWT } from "next-auth/jwt";

export default NuxtAuthHandler({
	pages: {
		signIn: "/auth/login"
	},
	// TODO: SET A STRONG SECRET, SEE https://sidebase.io/nuxt-auth/configuration/nuxt-auth-handler#secret
	secret: process.env.NEXTAUTH_SECRET || "my-auth-secret",
	callbacks: {
		async session({ session, token }) {
			if (token.provider === "credentials") {
				session.user = {
					id: "",
					email: "",
					image: "",
					name: token.user,
					loginName: token.user,
					orgName: "h2pro"
				};
				session.accessToken ??= token?.accessToken;
			} else {
				session.user = {
					id: token.user?.id,
					email: token.user?.email,
					image: token.user?.image,
					name: token.user?.name,
					loginName: token.user?.loginName,
					orgName: token.user?.organization.name
				};
				session.clientId = process.env.ZITADEL_CLIENT_ID;
				session.accessToken ??= token?.accessToken;
				session.error = token.error;
			}

			return session;
		},
		async jwt({ token, user, account }) {
			if (account && account.provider === "zitadel") {
				token.user ??= user;
				token.accessToken ??= account?.access_token;
				token.refreshToken ??= account?.refresh_token;
				token.expiresAt ??= (account?.expires_at ?? 0) * 1000;
				token.error = undefined;
				if (Date.now() < (token.expiresAt as number)) {
					return token;
				}
				return refreshAccessToken(token);
			} else {
				token.accessToken ??= user?.token;
				token.user ??= "CONNECTED AS ?";
				token.provider = "credentials";
				return token;
			}
		}
	},
	// TODO: ADD YOUR OWN AUTHENTICATION PROVIDER HERE, READ THE DOCS FOR MORE: https://sidebase.io/nuxt-auth
	providers: [
		//@ts-ignore
		ZitadelProvider.default({
			issuer: useRuntimeConfig().zitadel.issuerUrl,
			clientId: useRuntimeConfig().zitadel.clientId,
			clientSecret: useRuntimeConfig().zitadel.clientSecret,
			authorization: {
				params: {
					scope: useRuntimeConfig().zitadel.scope
				}
			},
			async profile(profile) {
				return {
					id: profile.sub,
					name: profile.name,
					firstName: profile.given_name,
					lastName: profile.family_name,
					email: profile.email,
					loginName: profile.preferred_username,
					image: profile.picture,
					organization: {
						id: profile["urn:zitadel:iam:user:resourceowner:id"],
						name: profile["urn:zitadel:iam:user:resourceowner:name"],
						primaryDomain: profile["urn:zitadel:iam:user:resourceowner:primary_domain"]
					}
				};
			}
		}),
		CredentialsProvider.default({
			name: "Credentials",
			credentials: {
				username: { label: "Username", type: "text" },
				password: { label: "Password", type: "password" }
			},
			async authorize(credentials, req) {
				// Add logic here to look up the user from the credentials supplied
				var loginError = "";
				try {
					const baseUrl = process.env.NUXT_API_URL;
					const response = await $fetch(`${baseUrl}/api/login_check`, {
						method: "POST",
						body: {
							username: credentials.username,
							password: credentials.password
						}
					});

					const user = response;
					if (user) {
						return user;
					} else {
						return null;
					}
				} catch (err) {
					loginError = "An error occurred during login.";
					console.error(err);
				}
			}
		})
	]
});

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token: JWT): Promise<JWT> {
	try {
		const issuer = await Issuer.discover(useRuntimeConfig().zitadel.issuerUrl);
		const client = new issuer.Client({
			client_id: useRuntimeConfig().zitadel.clientId,
			client_secret: useRuntimeConfig().zitadel.clientSecret,
			token_endpoint_auth_method: "client_secret_basic"
		});

		const { refresh_token, access_token, expires_at } = await client.refresh(
			token.refreshToken as string
		);

		return {
			...token,
			accessToken: access_token,
			expiresAt: (expires_at ?? 0) * 1000,
			refreshToken: refresh_token // Fall back to old refresh token
		};
	} catch (error) {
		console.error("Error during refreshAccessToken", error);

		return {
			...token,
			error: "RefreshAccessTokenError"
		};
	}
}
