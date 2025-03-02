import CustomCursor from "./components/interactibles/customCursor";
import { MainPage } from "./pages";

export default function Home() {
  return (
    <div style={{position: 'relative'}}>
      <CustomCursor />
      <MainPage />
    </div>
  );
}
