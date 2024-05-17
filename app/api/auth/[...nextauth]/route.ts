import NextAuth from 'next-auth';
// Importez `authOptions` depuis son nouveau fichier
import { authOptions } from './authOptions';

// Créez le gestionnaire en utilisant `NextAuth` avec `authOptions`
const handler = NextAuth(authOptions);

// Exportez le gestionnaire pour les méthodes GET et POST
export { handler as GET, handler as POST };