import axios from 'axios';
import { auth } from '../firebase/firebaseConfig';

const user = auth.currentUser;
const idToken = await user.getIdToken();

// Send token to your server
await axios.post('http://localhost:3000/verify-token', { idToken });
