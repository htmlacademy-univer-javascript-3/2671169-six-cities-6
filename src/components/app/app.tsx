import MainPage from '../../pages/main/main';
import { AppProps } from '../../types/place-card';

export default function App({ places }: AppProps) {
  return (
    <MainPage places={places}/>
  );
}
