import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

export default function Home() {
  return (
    <div className="flex h-screen justify-center  items-center">
      <Button> default Button</Button>
      <Button variant="outline" size="icon" >
        <Camera />
      </Button>
    </div>
  );
}
