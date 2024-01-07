//import UserProvider from "./context/UserProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AccountProvider from "./context/AccountProvider";
import { lazy, Suspense } from 'react';
import Loader from './components/loader/Loader';
const Messenger = lazy(() => import('./components/Messenger'));
function App() {
  const clientId = '621666616448-gmc4tml7bn6i5ngtb53rr5tm7km64qjl.apps.googleusercontent.com';
  return (
    <GoogleOAuthProvider clientId={clientId}>
       <AccountProvider> 
          <Suspense fallback={<Loader />}> 
            <Messenger />
          </Suspense> 
        </AccountProvider>
    </GoogleOAuthProvider>
  );
}
export default App;
