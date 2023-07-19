import { useState } from "react";
import { Button } from "~/components/ui/button";



export default function Home() {

  const [loading, setLoading] = useState(false)
  return (
    <>
      <h1>Henlo</h1>
      <Button loading={loading} onClick={() => setLoading(!loading)}>This is a button!</Button>
    </>
  );
}
